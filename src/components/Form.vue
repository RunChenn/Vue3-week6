<script>
import { reactive } from 'vue';
import api from '../api/index.js';

export default {
  props: {
    // id: {
    //   type: String,
    //   default: '',
    // },
  },
  setup(props, { emit }) {
    const form = reactive({
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    });

    return {
      form,
    };
  },
};
</script>

<template>
  <v-form
    ref="form"
    class="col-md-6"
    v-slot="{ errors }"
    @submit="$emit('create-order', form)"
  >
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <v-field
        id="email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['email'] }"
        placeholder="請輸入 Email"
        v-model="form.user.email"
      ></v-field>
      <error-message name="email" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label>
      <v-field
        id="name"
        name="姓名"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['姓名'] }"
        placeholder="請輸入姓名"
        rules="required"
        v-model="form.user.name"
      ></v-field>
      <error-message name="姓名" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話</label>
      <v-field
        id="tel"
        name="電話"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['電話'] }"
        placeholder="請輸入電話"
        v-model="form.user.tel"
      ></v-field>
      <error-message name="電話" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label>
      <v-field
        id="address"
        name="地址"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['地址'] }"
        placeholder="請輸入地址"
        rules="required"
        v-model="form.user.address"
      ></v-field>
      <error-message name="地址" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <textarea
        id="message"
        class="form-control"
        cols="30"
        rows="10"
        v-model="form.message"
      ></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-danger">送出訂單</button>
    </div>
  </v-form>
</template>

<style lang="scss" scoped></style>
