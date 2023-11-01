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

      <h1>&lt; 1-100 out of 12352 &gt;</h1>
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
    };
  },
  mounted() {
    this.UIData = data;
  },
  computed: {
    productDataBystatus() {
      let tmp = {};
      let data = this.UIData;
      let statusSet = new Set();

      data.forEach((element) => {
        let status = element.Status;
        let cores = element.Cores;

        // push status to set
        statusSet.add(status);

        if (this.hidestatus.includes(status)) return; // Hide by status
        if (!tmp[status]) tmp[status] = {};
        if (!tmp[status][cores]) tmp[status][cores] = [];

        tmp[status][cores].push(element);
      });

      // sort status in order
      const strings = new Set(statusSet);
      const sortedStringsArray = [...strings].sort();
      statusSet = new Set(sortedStringsArray);

      return {
        status: [...statusSet],
        data: tmp,
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
  },
};
</script>
