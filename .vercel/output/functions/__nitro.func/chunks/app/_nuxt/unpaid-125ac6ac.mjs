import { useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  name: "CheckoutSuccessUnpaidPage"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_RouterLink = resolveComponent("RouterLink");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto w-1/2 mb-24 mt-24 text-center" }, _attrs))}><h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Your order <span class="underline underline-offset-3 decoration-8 decoration-red-400 dark:decoration-red-600">is not paid</span></h1><p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"> Unfortunately, your order couldn&#39;t be paid.<br>You can try to pay it again or contact us. </p><div class="mt-12 text-center">`);
  _push(ssrRenderComponent(_component_RouterLink, {
    to: `/checkout/success/${_ctx.$route.params.id}`,
    class: "inline-flex justify-center items-center py-2 px-4 text-base font-medium text-center text-white bg-brand-primary rounded-lg hover:bg-gray-400 focus:ring-4 focus:ring-brand-primary dark:focus:ring-brand-primary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Check the order details <div class="i-carbon-undo ml-2"${_scopeId}></div>`);
      } else {
        return [
          createTextVNode(" Check the order details "),
          createVNode("div", { class: "i-carbon-undo ml-2" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/success/[id]/unpaid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const unpaid = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { unpaid as default };
//# sourceMappingURL=unpaid-125ac6ac.mjs.map
