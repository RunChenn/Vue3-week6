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

import * as yup from 'yup';

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
    // VForm: Form,
    // VField: Field,
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

    const form1Object = yup.object({
      name: yup.string().nullable().required(),
      email: yup.string().nullable().required().email(),
    });

    // form validation intialize
    // const { handleSubmit } = useForm({
    //   validationSchema: form1Object,
    // });

    const { errors } = useForm({
      validationSchema: form1Object,
    });
    const { value: email } = useField('email');

    // const nameField = reactive(
    //   useField('name', undefined, { initialValue: null })
    // );
    // const emailField = reactive(
    //   useField('email', undefined, { initialValue: null })
    // );

    // const { errorMessage, value } = useField('emailField', yup.string().nullable().required().email());
    // const emailField = useField(
    //   'emailField',
    //   yup.string().nullable().required().email()
    // );

    // const submitForm = handleSubmit(async (values) => {
    //   console.log(values);
    // });

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
      // emailField,
      // nameField,
      email,
      errors,
      createOrder,
    };
  },
};
</script>

<template>
  <form ref="form" class="col-md-6" @submit.prevent="createOrder">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        class="form-control"
        placeholder="請輸入 Email"
        rules="required|email"
        v-model="email"
      />
      <p>
        {{ errors.email }}
      </p>
      <!-- :class="{ 'is-invalid': errors['email'] }" -->
      <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label>
      <input
        id="name"
        name="姓名"
        type="text"
        class="form-control"
        placeholder="請輸入姓名"
        rules="required"
        v-model="user.name"
      />
      <!-- :class="{ 'is-invalid': errors['姓名'] }" -->

      <error-message name="姓名" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話</label>
      <input
        id="tel"
        name="電話"
        type="text"
        class="form-control"
        placeholder="請輸入電話"
        rules="required|min:8|max:10"
        v-model="user.tel"
      />
      <!-- :class="{ 'is-invalid': errors['電話'] }" -->

      <error-message name="電話" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label>
      <input
        id="address"
        name="地址"
        type="text"
        class="form-control"
        placeholder="請輸入地址"
        rules="required"
        v-model="user.address"
      />
      <!-- :class="{ 'is-invalid': errors['地址'] }" -->

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
  </form>
</template>

<style lang="scss" scoped>
form {
  text-align: left;
  label {
    text-align: left;
  }
}
</style>
