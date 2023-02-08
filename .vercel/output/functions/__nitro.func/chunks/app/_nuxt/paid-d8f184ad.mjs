import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  name: "CheckoutSuccessPaidPage"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto w-1/2 mb-24 mt-24 text-center" }, _attrs))}><h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Your order <span class="underline underline-offset-3 decoration-8 decoration-green-400 dark:decoration-green-600">has been paid</span></h1><p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"> You can now check the status of the order in your account. Thank you! </p><div class="mt-12 text-center"><a href="/" class="inline-flex justify-center items-center py-2 px-4 text-base font-medium text-center text-white bg-brand-primary rounded-lg hover:bg-gray-400 focus:ring-4 focus:ring-brand-primary dark:focus:ring-brand-primary"> Back to homepage <div class="i-carbon-undo ml-2"></div></a></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/success/[id]/paid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const paid = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { paid as default };
//# sourceMappingURL=paid-d8f184ad.mjs.map
