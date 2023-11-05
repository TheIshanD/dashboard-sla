<script setup>
defineProps({
  productData: Object,
  allCheck: Boolean,
  hideStatus: Array,
});
</script>

<template>
  <!-- Hide By status Bar -->
  <div class="hide-bar large-text">
    <label>Hide: </label>
    <div class="checkbox">
      <!-- All status -->
      <div class="row-flex">
        <div>
          <input
            :id="productData.status"
            type="checkbox"
            class="styled hide-all-checkbox"
            :value="productData.status"
            @click="$emit('clearedAll')"
          />
          <label :for="productData.status">All statuses</label>
        </div>
      </div>

      <!-- Dynamic status -->
      <div
        v-for="status in productData.status"
        :key="`${status}`"
        class="row-flex"
      >
        <div>
          <input
            :id="`${status}`"
            type="checkbox"
            class="styled specific-checkbox"
            :value="status"
            @click="toggleParticularStatus(status)"
          />
          <label :for="`${status}`">
            {{ status }}
          </label>
        </div>

        <!-- add the squares that indicate the color of the status -->
        <div class="legend-square" :class="calcClassColor(status)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hideStatus'],
  methods: {
    // find the class to be given to a row, given the status
    calcClassColor(status) {
      if (status == "Launched") {
        return "launched-bg";
      } else if (status == "Launched (with IPU)") {
        return "launched-ipu-bg";
      } else if (status == "Announced") {
        return "announced-bg";
      } else if (status == "Discontinued") {
        return "disontinued-bg";
      } else {
        return "redActual";
      }
    },
    // toggle the current status
    toggleParticularStatus(status) {
      if (this.hideStatus.includes(status)) {
        this.hideStatus.splice(this.hideStatus.indexOf(status), 1)
        document.querySelector(".styled").checked = false;
      } else {
        this.hideStatus.push(status);
      }
    }
  },
};
</script>
