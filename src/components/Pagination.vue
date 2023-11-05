<script setup>
defineProps({
  parentData: Object,
});
</script>

<template>
  <div class="pagination-box">
    <!-- the products text -->
    <p>
      Showing products
      <span>{{ parentData.startDataIndex }}-{{ parentData.endDataIndex }}</span>
      out of
      <span>{{ parentData.totalProducts }}</span>
    </p>
    <!-- the pagination buttons -->
    <div class="row-flex">
      <button @click="prevPage" class="pagination-buttons button">
        <font-awesome-icon icon="arrow-left" /> Previous Page
      </button>
      <button @click="nextPage" class="pagination-buttons button">
        Next Page <font-awesome-icon icon="arrow-right" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["parentData"],
  methods: {
    // go to the next page if it is valid
    nextPage() {
      if (
        this.parentData.pageIndex * 100 + 101 <=
        this.parentData.totalProducts
      ) {
        this.parentData.pageIndex++;
      }
    },
    // go to the previous page if it is valid
    prevPage() {
      if (this.parentData.pageIndex > 0) {
        this.parentData.pageIndex--;
      }
    },
  },
};
</script>
