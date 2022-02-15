<script>
import { ref, onMounted } from 'vue';
import api from '../api/index.js';

// import Pagination from '../components/Pagination.vue';

import ProdsTable from '../components/ProdsTable.vue';
import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import ProdModal from '../components/ProdModal.vue';

export default {
  components: { ProdModal, ProdsTable, Carts, Form, ProdModal },
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-4">
      <!-- 產品列表 -->
      <ProdsTable />

      <!-- 購物車列表 -->
      <Carts />
    </div>
    <div class="my-5 row justify-content-center">
      <!-- 表單 -->
      <!-- <Form /> -->
    </div>
    <!-- Modal -->
    <!-- <ProdModal /> -->
  </div>
</template>

<style lang="scss" scoped>
table {
  vertical-align: middle;
}
img {
  max-width: 100%;

  object-fit: contain;
}

.primary-image {
  height: 300px;
}

.form-check-label span.checked {
  color: #198754;
}

.images {
  height: 150px;
}
.form-check-input:checked {
  border-color: #198754;
  background-color: #198754;
}
</style>
