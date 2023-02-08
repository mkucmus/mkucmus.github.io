import { B as useCustomerPassword, z as useUser } from '../server.mjs';
import { defineComponent, computed, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useVuelidate } from '../../index.esm.mjs';
import { required, minLength, sameAs } from '@vuelidate/validators';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'cookie-es';
import 'ohash';
import 'scule';
import 'axios';
import 'query-string';
import 'defu';
import '../../nitro/config.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountChangePassword",
  __ssrInlineRender: true,
  emits: ["success"],
  setup(__props, { emit: emits }) {
    var _a;
    const { updatePassword, errors } = useCustomerPassword();
    const { user, refreshUser } = useUser();
    const userErrorMessages = computed(
      () => {
        var _a2;
        return (_a2 = errors.updatePassword) == null ? void 0 : _a2.map(({ detail }) => detail).toString();
      }
    );
    const isSuccess = ref(false);
    const state = reactive({
      password: {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
      },
      email: (_a = user.value) == null ? void 0 : _a.email
    });
    const rules = computed(() => ({
      password: {
        currentPassword: {
          required,
          minLength: minLength(8)
        },
        newPassword: {
          required,
          minLength: minLength(8)
        },
        newPasswordConfirm: {
          required,
          newPasswordConfirm: sameAs(state.password.newPassword)
        }
      }
    }));
    const $v = useVuelidate(rules, state);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      if (unref(isSuccess)) {
        _push(`<div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert"><span class="font-medium">Your password has been updated.</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-sm text-gray-500"><div> If you want to change the password to access your account, enter the following information: </div>`);
      if (unref(state).email) {
        _push(`<div> Your current email address is <span class="text-gray-900">${ssrInterpolate(unref(state).email)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><form class="mt-8 space-y-6">`);
      if (unref(userErrorMessages).length) {
        _push(`<div class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref(userErrorMessages))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-4 space-y-4 lg:mt-5 md:space-y-5"><div><label for="current-password" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Curent password</label><input id="current-password"${ssrRenderAttr("value", unref(state).password.currentPassword)} name="curent-password" type="password" autocomplete="current-password" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022">`);
      if (unref($v).password.currentPassword.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).password.currentPassword.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="new-password" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">New password</label><input id="new-password"${ssrRenderAttr("value", unref(state).password.newPassword)} name="new-password" type="password" autocomplete="new-password" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022">`);
      if (unref($v).password.newPassword.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).password.newPassword.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Repeat password</label><input id="confirm-password"${ssrRenderAttr("value", unref(state).password.newPasswordConfirm)} name="confirm-password" type="password" autocomplete="repeat-password" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022">`);
      if (unref($v).password.newPasswordConfirm.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).password.newPasswordConfirm.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><button class="group relative w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary" type="submit"> Change password </button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountChangePassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountChangePassword-1f58f74b.mjs.map
