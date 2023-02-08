import { h as useShopwareContext } from '../server.mjs';
import { defineComponent, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
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
  __name: "AccountResetPasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    useShopwareContext();
    const state = reactive({
      password: {
        newPassword: "",
        newPasswordConfirm: ""
      },
      error: ""
    });
    const rules = computed(() => ({
      password: {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Reset password </h2></div><form class="mt-8 space-y-6">`);
      if (unref(state).error) {
        _push(`<div class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref(state).error)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="-space-y-px"><div><label for="new-password" class="sr-only">New Password</label><input id="new-password"${ssrRenderAttr("value", unref(state).password.newPassword)} name="new-password" type="password" autocomplete="new-password" required class="appearance-none rounded-none shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="New Password">`);
      if (unref($v).password.newPassword.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).password.newPassword.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="confirm-password" class="sr-only">Repeat Password</label><input id="confirm-password"${ssrRenderAttr("value", unref(state).password.newPasswordConfirm)} name="confirm-password" type="password" autocomplete="repeat-password" required class="appearance-none rounded-none shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Repeat Password">`);
      if (unref($v).password.newPasswordConfirm.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).password.newPasswordConfirm.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><button class="group relative w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary" type="submit"><span class="absolute left-0 inset-y-0 flex items-center pl-3"><div class="w-5 h-5 i-carbon-locked"></div></span> Set new password </button>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
      _push(`</div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountResetPasswordForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountResetPasswordForm-aed7363f.mjs.map
