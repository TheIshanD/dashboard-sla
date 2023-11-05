<script setup>
import TableData from "./TableData.vue";
import HideBar from "./HideBar.vue";
import SearchBar from "./SearchBar.vue";
</script>

<template>
  <div>
    <!-- Hide By status Bar -->
    <div class="header-row-flex ">
      <SearchBar :parent-filter-data="this.filterData" />

      <div class="right-header-box">
        <div class="pagination-box">
          <p>
            Showing products <span>{{ startDataIndex }}-{{ endDataIndex }}</span> out of
            <span>{{ totalProducts }}</span>
          </p>
          <div class="rowFlex">
            <button @click="prevPage" class="pagination-buttons button">
              <font-awesome-icon icon="arrow-left" /> Previous Page
            </button>
            <button @click="nextPage" class="pagination-buttons button">
              Next Page <font-awesome-icon icon="arrow-right" />
            </button>
          </div>
        </div>

        <HideBar
          :product-data="productDataBystatus"
          :parent-data="this"
          @clearedAll="hideShowALLstatus"
        />
      </div>
    </div>
    <!-- Main Table Design -->
    <TableData :product-data="productDataBystatus" />
    <!-- End of Table Design -->
  </div>
</template>

<script>
import data from "../assets/data.json";
export default {
  data: function () {
    return {
      hidestatus: [],
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
    startDataIndex() {
      return Math.min(this.pageIndex * 100 + 1, this.totalProducts);
    },
    endDataIndex() {
      return Math.min(this.pageIndex * 100 + 100, this.totalProducts);
    },
    productDataBystatus() {
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

        if (!this.matchesFilter(this.filterData, this.hidestatus, element))
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

      if (oldTotalProducts != this.totalProducts) {
        this.pageIndex = 0;
      }

      return {
        status: [...statusSet],
        data: answer,
      };
    },
  },
  methods: {
    hideShowALLstatus() {
      if (!document.querySelector(".styled").checked) {
        this.hidestatus = [];
      }

      if (document.querySelector(".styled").checked) {
        this.hidestatus = this.productDataBystatus.status;
      }

      this.allCheck = !this.allCheck;

      if (this.allCheck) {
      } else {
        this.hidestatus = [];
      }
    },
    nextPage() {
      if (this.pageIndex * 100 + 101 <= this.totalProducts) {
        this.pageIndex++;
      }
    },
    prevPage() {
      if (this.pageIndex > 0) {
        this.pageIndex--;
      }
    },
    matchesFilter(filterData, hideStatus, element) {
      if (!element.Product.toLowerCase().includes(filterData.searchString.toLowerCase())) return false;
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

      if (hideStatus.includes(element.Status)) return false; // Hide by status

      return true;
    },
  },
};
</script>
