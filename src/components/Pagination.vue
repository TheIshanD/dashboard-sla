<script setup>
defineProps({
  parentData: Object,
});
</script>

<template>
  <div class="pagination-box">
    <p>
      Showing products <span>{{ parentData.startDataIndex }}-{{ parentData.endDataIndex }}</span> out
      of
      <span>{{ parentData.totalProducts }}</span>
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
</template>

<script>
export default {
  props: ["parentData"],
  data: function () {
    return {};
  },
  methods: {
    nextPage() {
      if (this.parentData.pageIndex * 100 + 101 <= this.parentData.totalProducts) {
        this.parentData.pageIndex++;
      }
    },
    prevPage() {
      if (this.parentData.pageIndex > 0) {
        this.parentData.pageIndex--;
      }
    },
  },
};
</script>
