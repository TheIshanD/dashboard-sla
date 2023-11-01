<script setup>
defineProps({
  productData: Object,
  parentData: Object,
});
</script>

<template>
  <!-- Hide By status Bar -->
  <div class="hideBar">
    <label class="hideLabel"> Hide: </label>
    <div class="checkbox">
      <!-- All status -->
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

      <!-- Dynamic status -->
      <div v-for="status in productData.status" :key="`${status}`">
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
    </div>
  </div>
</template>
