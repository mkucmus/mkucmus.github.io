import { B as useCustomerPassword, h as useShopwareContext } from '../server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "AccountRecoverPassword",
  __ssrInlineRender: true,
  emits: ["success"],
  setup(__props, { emit: emits }) {
    const { resetPassword, errors } = useCustomerPassword();
    const { apiInstance } = useShopwareContext();
    const isSuccess = ref(false);
    const formData = ref({
      email: "",
      storefrontUrl: apiInstance.config.endpoint
    });
    const recoverPasswordErrors = computed(
      () => {
        var _a;
        return (_a = errors.resetPassword) == null ? void 0 : _a.map(({ detail }) => detail).toString();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Reset password </h2></div>`);
      if (!unref(isSuccess)) {
        _push(`<form class="space-y-6"><div class="rounded-md shadow-sm -space-y-px"><div><label for="email-address" class="sr-only">Email address</label><input id="email-address"${ssrRenderAttr("value", unref(formData).email)} name="email" type="email" autocomplete="email" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Email address"></div></div>`);
        ssrRenderSlot(_ctx.$slots, "error", {}, () => {
          if (unref(recoverPasswordErrors).length) {
            _push(`<div class="flex items-center justify-between"><div class="flex items-center"><div class="send-email-errors text-red-600 border-gray-300 rounded">${ssrInterpolate(unref(recoverPasswordErrors))}</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`<div><button class="group relative w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-light" type="submit"> Resend password </button></div></form>`);
      } else {
        _push(`<p class="text-center text-gray-900"> You should receive a link in a few moments. Please open that link to reset your password. </p>`);
      }
      ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountRecoverPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountRecoverPassword-380a525c.mjs.map
