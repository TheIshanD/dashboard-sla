<script setup>
import TableData from "./TableData.vue";
import HideBar from "./HideBar.vue";
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

      <p>Search Bar</p>

      <div class="rowFlex">
        <button @click="prevPage">previous</button>
        <p>
          Showing products {{ startDataIndex }}-{{ endDataIndex }} out of
          {{ totalProducts }}
        </p>
        <button @click="nextPage">next</button>
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
          tmp[status][cores].forEach((product, index)=>{
            rowNumber++;
            // console.log(rowNumber + " " + this.startDataIndex)
            if (rowNumber < this.startDataIndex) return;;
            if (rowNumber > this.endDataIndex) return;

            if(!answer[status]) answer[status] = [];
            if(!answer[status][cores]) answer[status][cores] = [];

            answer[status][cores].push(product);
          })
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
