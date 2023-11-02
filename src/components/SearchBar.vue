<script setup>
defineProps({
  parentFilterData: Object,
});
</script>

<template>
  <div class="colFlex">
    <label for="product-filter"
      >Search for products (product name contains string)</label
    >
    <input id="product-filter" placeholder="" />

    <div class="rowFlex">
      <div class="colFlex">
        <label for="min-cores-filter">Minimum Cores?</label>
        <input
          id="min-cores-filter"
          placeholder="0"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>

      <div class="colFlex">
        <label for="max-cores-filter">Maximum Cores?</label>
        <input
          id="max-cores-filter"
          placeholder="Infinity"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>
    </div>

    <div class="rowFlex">
      <div class="colFlex">
        <label for="min-litho-filter">Minimum Lithography?</label>
        <input
          id="min-litho-filter"
          placeholder="0"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>

      <div class="colFlex">
        <label for="max-litho-filter">Maximum Lithography?</label>
        <input
          id="max-litho-filter"
          placeholder="Infinity"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>
    </div>

    <div class="rowFlex">
      <div class="colFlex">
        <label for="min-threads-filter">Minimum Threads?</label>
        <input
          id="min-threads-filter"
          placeholder="0"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>

      <div class="colFlex">
        <label for="max-threads-filter">Maximum Threads?</label>
        <input
          id="max-threads-filter"
          placeholder="Infinity"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>
    </div>

    <div class="rowFlex">
      <div class="colFlex">
        <label for="min-base-filter">Minimum Base Freq.?</label>
        <input
          id="min-base-filter"
          placeholder="0"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>

      <div class="colFlex">
        <label for="max-base-filter">Maximum Base Freq.?</label>
        <input
          id="max-base-filter"
          placeholder="Infinity"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>
    </div>

    <div class="rowFlex">
      <div class="colFlex">
        <label for="min-turbo-filter">Minimum Turbo Freq.?</label>
        <input
          id="min-turbo-filter"
          placeholder="0"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>

      <div class="colFlex">
        <label for="max-turbo-filter">Maximum Turbo Freq.?</label>
        <input
          id="max-turbo-filter"
          placeholder="Infinity"
          type="number"
          oninput="validity.valid||(value='');"
        />
      </div>
    </div>

    <button @click="applyFilter">Filter</button>
  </div>
</template>

<script>
export default {
  props: ["parentFilterData"],
  data: function () {
    return {};
  },
  computed: {},
  methods: {
    applyFilter() {
      this.parentFilterData.searchString = document.querySelector("#product-filter").value;
      this.parentFilterData.minCores = document.querySelector("#min-cores-filter").value == "" ? 0 : parseInt(document.querySelector("#min-cores-filter").value);
      this.parentFilterData.maxCores = document.querySelector("#max-cores-filter").value == "" ? 1000 : parseInt(document.querySelector("#max-cores-filter").value);
      this.parentFilterData.minLitho = document.querySelector("#min-litho-filter").value == "" ? 0 : parseInt(document.querySelector("#min-litho-filter").value);
      this.parentFilterData.maxLitho = document.querySelector("#max-litho-filter").value == "" ? 1000 : parseInt(document.querySelector("#max-litho-filter").value);
      this.parentFilterData.minThreads = document.querySelector("#min-threads-filter").value == "" ? 0 : parseInt(document.querySelector("#min-threads-filter").value);
      this.parentFilterData.maxThreads = document.querySelector("#max-threads-filter").value == "" ? 1000 : parseInt(document.querySelector("#max-threads-filter").value);
      this.parentFilterData.minBase = document.querySelector("#min-base-filter").value == "" ? 0 : parseInt(document.querySelector("#min-base-filter").value);
      this.parentFilterData.maxBase = document.querySelector("#max-base-filter").value == "" ? 1000 : parseInt(document.querySelector("#max-base-filter").value);
      this.parentFilterData.minTurbo = document.querySelector("#min-turbo-filter").value == "" ? 0 : parseInt(document.querySelector("#min-turbo-filter").value);
      this.parentFilterData.maxTurbo = document.querySelector("#max-turbo-filter").value == "" ? 1000 : parseInt(document.querySelector("#max-turbo-filter").value);
    },
  },
};
</script>
