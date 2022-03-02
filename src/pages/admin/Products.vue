<script>
import Pagination from '../..//components/Pagination.vue';
import api from '../../api/index.js';

import { ref, onMounted } from 'vue';

export default {
  components: {
    Pagination,
  },
  name: 'admin-Products',
  props: ['token'],
  setup() {
    let products = ref([]);

    let pagination = ref({});

    onMounted(async () => {
      try {
        // 檢查權限
        await api.auth.checkAuth();
        getData();
      } catch (err) {
        alert(err.message);
      }
    });

    // 載入所有商品
    const getData = async (page = 1) => {
      try {
        const prodsData = await api.products.getProducts(page);

        products.value = prodsData.products;
        pagination.value = prodsData.pagination;
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      products,
      pagination,
      getData,
    };
  },
};
</script>

<template>
  <div>
    這裡是 後台 產品列表
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">
            {{ item.origin_price }}
          </td>
          <td class="text-end">
            {{ item.price }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination> -->
    <Pagination v-model:pages="pagination" @update-pages="getData" />
  </div>
</template>
