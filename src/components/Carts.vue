<script>
import { ref, onMounted } from 'vue';
import api from '../api/index.js';

// import { Modal } from 'bootstrap';

export default {
  props: {
    cart: {
      type: Object,
      default: () => ({}),
    },
    loadingStatus: {
      type: Object,
      default: () => ({
        loadingItem: {
          type: String,
          default: '',
        },
      }),
    },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<template>
  <div class="mt-4">
    <h5>購物車列表</h5>
    <hr />
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="$emit('remove-cart-all')"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="$emit('remove-cart-item', item.id)"
                :disabled="loadingStatus.loadingItem === item.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="loadingStatus.loadingItem === item.id"
                ></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    v-model.number="item.qty"
                    @blur="$emit('update-cart', item)"
                    :disabled="loadingStatus.loadingItem === item.id"
                    min="1"
                    type="number"
                    class="form-control"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success" v-if="cart.final_total !== cart.total"
                >折扣價：</small
              >
              {{ item.final_total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
