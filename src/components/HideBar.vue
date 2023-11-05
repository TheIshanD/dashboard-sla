<script setup>
defineProps({
  productData: Object,
  parentData: Object,
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
            class="styled"
            :value="productData.status"
            @click="$emit('clearedAll')"
            v-model="parentData.allCheck"
          />
          <label :for="productData.status">All statuses</label>
        </div>

      </div>

      <!-- Dynamic status -->
      <div v-for="status in productData.status" :key="`${status}`" class="row-flex">
        <div>
          <input
          :id="`${status}`"
          type="checkbox"
          class="styled"
          :value="status"
          v-model="parentData.hidestatus"
        />
        <label :for="`${status}`">
          {{ status }}
        </label>
        </div>

        <div class="legend-square" :class="calcClassColor(status)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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
    }
  },
};
</script>
