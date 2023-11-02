<script setup>
import TableData from "./TableData.vue";
import HideBar from "./HideBar.vue";
import SearchBar from "./SearchBar.vue";
</script>

<template>
  <div>
    <!-- Hide By status Bar -->
    <div class="rowFlex">
      <HideBar
        :product-data="productDataBystatus"
        :parent-data="this"
        @clearedAll="hideShowALLstatus"
      />

      <SearchBar :parent-filter-data="this.filterData" />

      <div class="colFlex">
        <p>
          Showing products {{ startDataIndex }}-{{ endDataIndex }} out of
          {{ totalProducts }}
        </p>
        <div class="rowFlex">
          <button @click="prevPage">previous</button>
          <button @click="nextPage">next</button>
        </div>
      </div>
    </div>
    <!-- Main Table Design -->
    <TableData :product-data="productDataBystatus" />
    <!-- End of Table Design -->s
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
        let productName = element.Product;
        let status = element.Status;
        let cores = element.Cores;
        let litho = element.Lithography;
        let threads = element.Threads;
        let base = element.Base_Freq;
        let turbo = element.Max_Turbo_Freq;

        // push status to set
        statusSet.add(status);

        if (!productName.includes(this.filterData.searchString)) return;
        if (this.filterData.minCores > cores) return;
        if (this.filterData.maxCores < cores) return;

        if (this.filterData.minLitho > litho) return;
        if (this.filterData.maxLitho < litho) return;

        if (this.filterData.minThreads > threads) return;
        if (this.filterData.maxThreads < threads) return;

        if (this.filterData.minBase > base) return;
        if (this.filterData.maxBase < base) return;

        if (this.filterData.minTurbo > turbo) return;
        if (this.filterData.maxTurbo < turbo) return;

        if (this.hidestatus.includes(status)) return; // Hide by status
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
            // console.log(rowNumber + " " + this.startDataIndex)
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
  },
};
</script>
