<script>
import { ref, onMounted } from 'vue';
import api from '../api/index.js';

import { Modal } from 'bootstrap';

export default {
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{}}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{}}</span>
              <p>商品描述：{{}}</p>
              <p>商品內容：{{}}</p>
              <div class="h5">{{}} 元</div>
              <div class="h6">原價 {{}} 元</div>
              <div class="h5">現在只要 {{}} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" />
                  <button type="button" class="btn btn-primary">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-group > .btn:not(:last-child):not(.dropdown-toggle),
.btn-group > .btn-group:not(:last-child) > .btn,
.btn-group > .btn:nth-child(n + 3),
.btn-group > :not(.btn-check) + .btn,
.btn-group > .btn-group:not(:first-child) > .btn {
  // border-top-right-radius: 0.25rem;
  // border-bottom-right-radius: 0.25rem;
  border-radius: 0.25rem;
  margin-right: 10px;
  min-width: 45px;
}
</style>
