<script>
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';

// import Pagination from '../components/Pagination.vue';

import ProdsTable from '../components/ProdsTable.vue';
import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import ProdModal from '../components/ProdModal.vue';

export default {
  components: { ProdModal, ProdsTable, Carts, Form, ProdModal },
  setup() {
    const products = ref([]);
    const cart = ref({});

    const loadingStatus = reactive({
      loadingItem: '',
    });

    // 載入所有商品
    const getProducts = async () => {
      try {
        const prodsData = await api.products.getProductsAll();

        products.value = prodsData.products;

        console.log(products.value);
      } catch (err) {
        alert(err.message);
      }
    };

    // 取得 購物車商品
    const getCart = async () => {
      try {
        const res = await api.cart.getCart();

        console.log(res);

        cart.value = res.data;
        console.log(cart.value);
      } catch (err) {
        alert(err.message);
      }
    };

    // 移除 購物車特定商品
    const removeCartItem = async (id) => {
      console.log(id);
      try {
        const res = await api.cart.removeCartItem(id);

        loadingStatus.loadingItem = id;

        alert(res.message);
        loadingStatus.loadingItem = '';
        getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    // 清空 購物車
    const removeCartAll = async () => {
      try {
        const res = await api.cart.removeCartAll();

        alert(res.message);
        getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    // 更新 購物車
    const updateCart = async (data) => {
      try {
        loadingStatus.loadingItem = data.id;

        const cart = {
          product_id: data.product_id,
          qty: data.qty,
        };

        const res = await api.cart.updateCart({ data: cart });

        alert(res.message);
        loadingStatus.loadingItem = '';
        getCart();
      } catch (err) {
        loadingStatus.loadingItem = '';
        alert(err.message);
      }
    };

    onMounted(() => {
      getProducts();
      getCart();
    });

    return {
      products,
      cart,
      loadingStatus,
      removeCartItem,
      removeCartAll,
      updateCart,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-4">
      <!-- 產品列表 -->
      <ProdsTable v-model:products="products" />

      <!-- 購物車列表 -->
      <Carts
        v-model:cart="cart"
        v-model:loadingStatus="loadingStatus"
        @remove-cart-item="removeCartItem"
        @remove-cart-all="removeCartAll"
        @update-cart="updateCart"
      />
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
