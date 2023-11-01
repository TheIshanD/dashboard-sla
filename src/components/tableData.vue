<script setup>
import TableHeader from "./TableHeader.vue";
defineProps({
  productData: Object,
});
</script>

<template>
  <table>
    <TableHeader />
    <tbody>
      <template v-for="(data, status, index) in productData.data">
        <!-- status -->
        <tr>
          <td class="width1" :rowspan="calstatusRowspan(data)">
            {{ status }}
          </td>
        </tr>

        <template v-for="cores in Object.keys(data)">
          <!-- cores -->
          <tr>
            <td class="width1" :rowspan="Object.keys(data[cores]).length + 1">
              {{ cores }}
            </td>
          </tr>

          <tr v-for="(productInfo, k) in data[cores]">
            <!-- product -->
            <td class="productColumn">{{ productInfo.Product }}</td>

            <!-- Lithography -->
            <td>{{ productInfo.Lithography }}</td>

            <!-- Threads -->
            <td>
              <div class="innerCells">
                <input
                  :value="productInfo.Threads"
                  :disabled="true"
                  type="text"
                />
              </div>
            </td>

            <!-- Base Freq -->
            <td>
              <div class="innerCells">
                <input
                  :value="productInfo.Base_Freq"
                  :disabled="true"
                  type="text"
                />
              </div>
            </td>

            <!-- Max Turbo Freq -->
            <td>
              <div class="innerCells">
                <input
                  :value="productInfo.Max_Turbo_Freq"
                  type="text"
                  :disabled="true"
                />
              </div>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  methods: {
    calstatusRowspan(data) {
      let sum = Object.keys(data).length + 1;
      for (const cores in data) {
        sum += Object.keys(data[cores]).length;
      }
      return sum;
    },
  },
};
</script>
