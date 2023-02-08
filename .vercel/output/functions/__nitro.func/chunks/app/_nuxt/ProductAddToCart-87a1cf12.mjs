import { p as useNotifications, q as useAddToCart } from '../server.mjs';
import { defineComponent, toRefs, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "ProductAddToCart",
  __ssrInlineRender: true,
  props: {
    product: null
  },
  setup(__props) {
    const props = __props;
    useNotifications();
    const { product } = toRefs(props);
    const { addToCart, quantity } = useAddToCart(product);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row mt-10" }, _attrs))}><div class="basis-1/4 relative -top-6"><label for="qty" class="text-sm">Qty:</label><input id="qty"${ssrRenderAttr("value", unref(quantity))} type="number"${ssrRenderAttr("min", unref(product).minPurchase || 1)}${ssrRenderAttr("max", unref(product).calculatedMaxPurchase)}${ssrRenderAttr("step", unref(product).purchaseSteps || 1)} class="border rounded-md py-2 px-4 border-solid border-1 border-cyan-600 w-full" data-testid="product-quantity"></div><div class="basis-3/4 ml-4"><button class="py-2 px-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition ease-in-out hover:bg-gradient-to-l duration-300 cursor-pointer border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-testid="add-to-cart-button"> Add to cart </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductAddToCart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductAddToCart-87a1cf12.mjs.map
