<script>
import { reactive } from 'vue';
// import { useField } from 'vee-validate';
// import { required, email, min, max } from '@vee-validate/rules';
// import { localize } from '@vee-validate/i18n';

// import * as rules from "@vee-validate/rules";
// Object.keys(rules).forEach((rule) => {
//   defineRule(rule, rules[rule]);
// });

// configure({
//   generateMessage: localize('zh_TW'),
// });

// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);
// defineRule('max', max);

export default {
  name: 'Form',
  props: {
    // id: {
    //   type: String,
    //   default: '',
    // },
  },
  emits: ['createOrder'],
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

    // function validate(value) {
    //   if (!value) {
    //     return 'This field is required';
    //   }

    //   if (value.length < 3) {
    //     return 'Must contain more than 3 characters';
    //   }

    //   return true;
    // }

    // // const { value, errorMessage } = useField("fieldName", validate);
    // const { value: email, errorMessage } = useField('email', 'required|email');

    const createOrder = async () => {
      emit('createOrder', form);
    };

    return {
      form,
      // email,
      // errorMessage,
      createOrder,
    };
  },
};
</script>

<template>
  <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <VField
        id="email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['email'] }"
        placeholder="請輸入 Email"
        rules="required"
        v-model="form.user.email"
      ></VField>
      <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
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
  </VForm>
</template>

<style lang="scss" scoped></style>
