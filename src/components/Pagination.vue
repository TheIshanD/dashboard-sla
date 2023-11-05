<script setup>
defineProps({
  startDataIndex: Number,
  endDataIndex: Number,
  totalProducts: Number,
  pageIndex: Number,
});
</script>

<template>
  <div class="pagination-box">
    <!-- the products text -->
    <p>
      Showing products
      <span>{{ startDataIndex }}-{{ endDataIndex }}</span>
      out of
      <span>{{ totalProducts }}</span>
    </p>
    <!-- the pagination buttons -->
    <div class="row-flex">
      <button
        @click="$emit('previousPage')"
        class="pagination-buttons button"
        :disabled="pageIndex <= 0"
      >
        <font-awesome-icon icon="arrow-left" /> Previous Page
      </button>
      <button
        @click="$emit('nextPage')"
        class="pagination-buttons button"
        :disabled="pageIndex >= Math.floor((totalProducts - 1) / 100)"
      >
        Next Page <font-awesome-icon icon="arrow-right" />
      </button>
    </div>
  </div>
</template>
