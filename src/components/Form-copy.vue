<script>
import { ref, reactive, toRefs, watch } from 'vue';
import {
  useField,
  defineRule,
  configure,
  useForm,
  Form,
  Field,
  ErrorMessage,
  useResetForm,
} from 'vee-validate';
import { required, email, min, max } from '@vee-validate/rules';
import { localize, loadLocaleFromURL } from '@vee-validate/i18n';

// import * as rules from "@vee-validate/rules";
// Object.keys(rules).forEach((rule) => {
//   defineRule(rule, rules[rule]);
// });
loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
);

configure({
  generateMessage: localize('zh_TW'),
});

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

export default {
  name: 'Form',
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  props: {
    cart: {
      type: Object,
      default: () => ({}),
    },
    isResetForm: {
      type: Boolean,
      default: false,
    },
    //   form: {
    //     type: Object,
    //     default: () => ({
    //       user: {
    //         type: Object,
    //         default: () => ({
    //           name: '',
    //           email: '',
    //           tel: '',
    //           address: '',
    //         }),
    //       },
    //     }),
    //   },
  },
  emits: ['createOrder'],
  setup(props, { emit }) {
    // const form = ref(null);

    let data = reactive({
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    });

    console.log(useForm());

    // const { handleSubmit } = useForm();
    const form = useForm();

    // const initData = JSON.parse(JSON.stringify(data));

    // console.log(form);

    // watch(
    //   () => props.isResetForm,
    //   (newVal) => {
    //     console.log(newVal);
    //     if (newVal) {
    //       data = initData;

    //       // Object.assign(data, initData);

    //       console.log(data);
    //     }
    //   }
    // );

    // const resetForm = useResetForm();

    // const createOrder = handleSubmit((values, { resetForm }) => {
    const createOrder = () => {
      // emit('createOrder', props.form);

      console.log(props.cart);

      if (props.cart.carts.length === 0) return alert('購物車內無資料');

      // console.log(values);

      emit('createOrder', data);

      // console.log(resetForm);

      form.resetForm();

      // emit('resetForm', form);
      // console.log(form);
      // form.resetForm();
      // });
    };

    return {
      ...toRefs(data),
      form,
      // email,
      // errorMessage,
      createOrder,
    };
  },
};
</script>

<template>
  <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <v-field
        id="email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['email'] }"
        placeholder="請輸入 Email"
        rules="required|email"
        v-model="user.email"
      ></v-field>
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
        v-model="user.name"
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
        rules="required|min:8|max:10"
        v-model="user.tel"
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
        v-model="user.address"
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
        v-model="message"
      ></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-danger">送出訂單</button>
    </div>
  </v-form>
</template>

<style lang="scss" scoped>
form {
  text-align: left;
  label {
    text-align: left;
  }
}
</style>
