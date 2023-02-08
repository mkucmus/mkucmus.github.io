import { a5 as useCheckout, z as useUser, p as useNotifications, b as useBreadcrumbs } from '../server.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
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

const __default__ = {
  name: "AccountPayments"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  emits: ["success"],
  setup(__props, { emit: emits }) {
    const {
      paymentMethods,
      getPaymentMethods,
      selectedPaymentMethod,
      setPaymentMethod
    } = useCheckout();
    useUser();
    useNotifications();
    useBreadcrumbs([
      {
        name: "Account Overview",
        path: "/account"
      },
      {
        name: "Payment",
        path: "/account/payment"
      }
    ]);
    const isLoading = ref(true);
    const formData = reactive({
      paymentMethod: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto my-8" }, _attrs))}><fieldset class="mt-6"><legend class="contents text-2xl font-medium text-gray-900"><h1 class="border-b pb-3">Payment method</h1></legend><p class="text-sm text-gray-500 mt-3"> Select your default payment method: </p><form class="mt-4 space-y-6">`);
      if (unref(isLoading)) {
        _push(`<div class="w-60 h-24"><div class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"><div class="w-4 bg-gray-300 h-4 rounded-full"></div><div class="flex flex-col space-y-3"><div class="w-36 bg-gray-300 h-6 rounded-md"></div><div class="w-24 bg-gray-300 h-6 rounded-md"></div></div></div></div>`);
      } else {
        _push(`<div class="mt-4 space-y-4"><!--[-->`);
        ssrRenderList(unref(paymentMethods), (paymentMethod) => {
          var _a;
          _push(`<div class="flex items-center"><input${ssrRenderAttr("id", paymentMethod.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(formData).paymentMethod, paymentMethod.id)) ? " checked" : ""}${ssrRenderAttr("value", paymentMethod.id)}${ssrIncludeBooleanAttr(((_a = unref(selectedPaymentMethod)) == null ? void 0 : _a.id) === paymentMethod.id) ? " checked" : ""} name="payment-method" type="radio" class="focus:ring-brand-light h-4 w-4 text-brand-primary border-gray-300"><label${ssrRenderAttr("for", paymentMethod.id)} class="ml-3 block text-sm font-medium text-gray-700">${ssrInterpolate(paymentMethod.name)}</label></div>`);
        });
        _push(`<!--]--><button class="group relative justify-center py-2 px-4 my-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-light" type="submit"> Save </button></div>`);
      }
      _push(`</form></fieldset></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/payment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=payment-326b0507.mjs.map
