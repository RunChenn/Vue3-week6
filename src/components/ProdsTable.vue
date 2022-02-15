<script>
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';

import ProdModal from '../components/ProdModal.vue';
// import Pagination from '../components/Pagination.vue';

export default {
  // components: { ProdModal, DelModal, Pagination },
  components: { ProdModal },
  setup() {
    let products = ref([]);
    let product = ref({});

    let prodInfo = ref({});

    let isNew = ref(false);

    let tempProduct = ref({ imagesUrl: [], id: '' });

    const loadingStatus = reactive({
      loadingItem: '',
    });

    // let pagination = ref({});

    const prodsDetail = (item) => {
      prodInfo.value = item;
    };

    // 載入所有商品
    const getProducts = async () => {
      try {
        const prodsData = await api.products.getProductsAll();

        products.value = prodsData.products;

        console.log(products.value);
        // pagination.value = prodsData.pagination;
      } catch (err) {
        alert(err.message);
      }
    };

    // 載入單一商品
    const getProduct = async (id) => {
      loadingStatus.loadingItem = id;

      try {
        const prodsData = await api.products.getProduct(id);

        loadingStatus.loadingItem = '';

        product.value = prodsData.product;

        console.log(product.value);
        // pagination.value = prodsData.pagination;
      } catch (err) {
        alert(err.message);
      }
    };

    onMounted(async () => {
      try {
        // 檢查權限
        await api.auth.checkAuth();
        getProducts();
      } catch (err) {
        alert(err.message);
      }
    });

    const openModal = (id) => {
      getProduct(id);
    };

    // 新增圖片
    const createImages = () => {
      tempProduct.value.imagesUrl = [];
      tempProduct.value.imagesUrl.push('');
    };

    return {
      products,
      product,
      loadingStatus,

      prodsDetail,
      prodInfo,
      tempProduct,
      isNew,
      openModal,
      createImages,
      getProducts,
    };
  },
};
</script>

<template>
  <div class="prodsTable">
    <div class="row">
      <!-- <div class="text-end mb-1"> -->
      <!-- <button
            type="button"
            class="btn btn-success"
            @click="openModal('new')"
            data-bs-toggle="modal"
            data-bs-target="#productModal"
          >
            建立新的產品
          </button> -->
      <!-- </div> -->
      <div class="col-12 col-sm-12">
        <h5>產品列表</h5>
        <hr />
        <table class="table table-hover">
          <thead>
            <tr>
              <!-- <th scope="col">分類</th> -->
              <th>圖片</th>
              <th scope="col" class="text-start">產品名稱</th>
              <th scope="col">價格</th>
              <!-- <th scope="col">售價</th> -->
              <!-- <th scope="col">是否啟用</th> -->
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <!-- <td>{{ item.category }}</td> -->
              <td style="width: 200px">
                <div
                  style="
                    height: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </td>
              <td class="text-start">{{ item.title }}</td>
              <!-- <td>{{ item.origin_price }}</td> -->
              <!-- <td>{{ item.price }}</td> -->
              <td>
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} 元
                </div>
                <del class="h6" v-if="item.price"
                  >原價 {{ item.origin_price }} 元</del
                >
                <div class="h5" v-if="item.price">
                  現在只要 {{ item.price }} 元
                </div>
              </td>

              <!-- <td>
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
                </td> -->
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2 mb-md-1"
                  data-bs-target="#productModal"
                  data-bs-toggle="modal"
                  @click="openModal(item.id)"
                  :disabled="
                    loadingStatus.loadingItem === item.id || !item.is_enabled
                  "
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm me-2 mb-md-1"
                  data-bs-target="#delProductModal"
                  data-bs-toggle="modal"
                  @click="addToCart(item.id)"
                  :disabled="
                    loadingStatus.loadingItem === item.id || !item.is_enabled
                  "
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></i>
                  加到購物車
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <Pagination v-model:pages="pagination" @update-pages="getProducts" /> -->
      </div>
    </div>
    <!-- Modal -->
    <ProdModal v-model:product="product" @update="getProducts" />
  </div>
</template>

<style lang="scss" scoped>
.prodsTable {
  height: 340px;
  max-height: 340px;
  overflow: auto;
  table {
    vertical-align: middle;
    max-height: 300px;
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
}
</style>
