<script setup>
import TableData from "./TableData.vue";
import HideBar from "./HideBar.vue";
import SearchBar from "./SearchBar.vue";
import Pagination from "./Pagination.vue";
</script>

<template>
  <div>
    <!-- the header of the page -->
    <div class="header-row-flex">
      <SearchBar :parent-filter-data="filterData" />
      <div class="right-header-box">
        <Pagination
          :start-data-index="startDataIndex"
          :end-data-index="endDataIndex"
          :total-products="totalProducts"
          :pageIndex="pageIndex"
          @previousPage="prevPage"
          @nextPage="nextPage"
        />

        <HideBar
          :product-data="productDataByStatus"
          :all-check="allCheck"
          :hide-status="hideStatus"
          @clearedAll="hideShowAllStatus"
        />
      </div>
    </div>

    <TableData :product-data="productDataByStatus" />
  </div>
</template>

<script>
import data from "../assets/data.json";
export default {
  data: function () {
    return {
      hideStatus: [],
      UIData: [],
      allCheck: false,
      totalProducts: data.length,
      pageIndex: 0,
      filterData: {
        searchString: "",
        minCores: 0,
        maxCores: 1000,
        minLitho: 0,
        maxLitho: 1000,
        minThreads: 0,
        maxThreads: 1000,
        minBase: 0,
        maxBase: 1000,
        minTurbo: 0,
        maxTurbo: 1000,
      },
    };
  },
  mounted() {
    this.UIData = data;
  },
  computed: {
    // compute the starting index (1-indexed for display)
    startDataIndex() {
      return Math.min(this.pageIndex * 100 + 1, this.totalProducts);
    },
    // compute the ending index (1-indexed for display)
    endDataIndex() {
      return Math.min(this.pageIndex * 100 + 100, this.totalProducts);
    },
    // compute the products, given requirements of user
    productDataByStatus() {
      const oldTotalProducts = this.totalProducts;
      this.totalProducts = 0;
      let tmp = {};
      let data = this.UIData;
      let statusSet = new Set();

      data.forEach((element, index) => {
        let status = element.Status;
        let cores = element.Cores;

        // push status to set
        statusSet.add(status);

        // filter out any products not specified by the filter
        if (!this.matchesFilter(this.filterData, this.hideStatus, element))
          return;

        this.totalProducts++;

        if (!tmp[status]) tmp[status] = {};
        if (!tmp[status][cores]) tmp[status][cores] = [];

        tmp[status][cores].push(element);
      });

      // sort status in order
      const strings = new Set(statusSet);
      const sortedStringsArray = [...strings].sort().reverse();
      statusSet = new Set(sortedStringsArray);

      // if the number of products changed, then some filtering factor must have changed
      // reset the pageIndex back to 0
      if (oldTotalProducts != this.totalProducts) {
        this.pageIndex = 0;
      }

      // now we must rearrange the products so that they can maintain a sorted order by status AND
      // so that we can deterministically use pagination to show certain indicies
      // (filter out those indicies not being shown)
      let answer = {};
      let rowNumber = 0;
      statusSet.forEach((status) => {
        for (const cores in tmp[status]) {
          tmp[status][cores].forEach((product, index) => {
            rowNumber++;
            if (rowNumber < this.startDataIndex) return;
            if (rowNumber > this.endDataIndex) return;

            if (!answer[status]) answer[status] = [];
            if (!answer[status][cores]) answer[status][cores] = [];

            answer[status][cores].push(product);
          });
        }
      });

      return {
        status: [...statusSet],
        data: answer,
      };
    },
  },
  methods: {
    // hide everything or unhide eeverything
    hideShowAllStatus() {
      // if its not checked, then unhide everything
      if (!document.querySelector(".styled").checked) {
        this.hideStatus = [];

        const checkboxes = document.querySelectorAll(".specific-checkbox");
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        })
      }

      // otherwise hide everything
      if (document.querySelector(".styled").checked) {
        this.hideStatus = this.productDataByStatus.status;

        const checkboxes = document.querySelectorAll(".specific-checkbox");
        checkboxes.forEach((checkbox) => {
          checkbox.checked = true;
        })
      }

      this.allCheck = !this.allCheck;
    },
    // check if the filter is filtering out an element or not
    matchesFilter(filterData, hideStatus, element) {
      if (
        !element.Product.toLowerCase().includes(
          filterData.searchString.toLowerCase()
        )
      )
        return false;
      if (filterData.minCores > element.Cores) return false;
      if (filterData.maxCores < element.Cores) return false;

      if (filterData.minLitho > element.Lithography) return false;
      if (filterData.maxLitho < element.Lithography) return false;

      if (filterData.minThreads > element.Threads) return false;
      if (filterData.maxThreads < element.Threads) return false;

      if (filterData.minBase > element.Base_Freq) return false;
      if (filterData.maxBase < element.Base_Freq) return false;

      if (filterData.minTurbo > element.Max_Turbo_Freq) return false;
      if (filterData.maxTurbo < element.Max_Turbo_Freq) return false;

      if (hideStatus.includes(element.Status)) return false;

      return true;
    },
    // go to the next page if it is valid
    nextPage() {
      if (
        this.pageIndex * 100 + 101 <=
        this.totalProducts
      ) {
        this.pageIndex++;
      }
    },
    // go to the previous page if it is valid
    prevPage() {
      if (this.pageIndex > 0) {
        this.pageIndex--;
      }
    },
  },
};
</script>
