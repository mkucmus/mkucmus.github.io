import _sfc_main$1 from './SharedPrice-64255154.mjs';
import { defineComponent, toRefs, ref, watch, unref, useSSRContext } from 'vue';
import { G as useCartItem, H as syncRefs, E as getMainImageUrl, I as useDebounceFn } from '../server.mjs';
import { ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "CheckoutCartItem",
  __ssrInlineRender: true,
  props: {
    cartItem: null,
    maxQty: { default: 100 }
  },
  setup(__props) {
    const props = __props;
    const { cartItem } = toRefs(props);
    const isLoading = ref(false);
    const {
      itemOptions,
      removeItem,
      itemRegularPrice,
      itemQuantity,
      isPromotion,
      itemStock,
      changeItemQuantity
    } = useCartItem(cartItem);
    const quantity = ref();
    syncRefs(itemQuantity, quantity);
    const updateQuantity = async (quantity2) => {
      if (quantity2 === itemQuantity.value)
        return;
      isLoading.value = true;
      await changeItemQuantity(Number(quantity2));
      isLoading.value = false;
    };
    const debounceUpdate = useDebounceFn(updateQuantity, 800);
    watch(quantity, () => debounceUpdate(quantity.value));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_SharedPrice = _sfc_main$1;
      _push(`<!--[-->`);
      if (!unref(isPromotion)) {
        _push(`<div class="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"><img${ssrRenderAttr("src", unref(getMainImageUrl)(unref(cartItem)))} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center" data-testid="cart-product-image"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-1 flex-col"><div><div class="flex flex-col lg:flex-row justify-between text-base font-medium text-gray-900"><h3 class="text-base" data-testid="cart-product-name">${ssrInterpolate(unref(cartItem).label)}</h3>`);
      if (unref(itemRegularPrice)) {
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: unref(itemRegularPrice),
          "data-testid": "cart-product-price"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(itemOptions)) {
        _push(`<p class="mt-1 text-sm text-gray-500" data-testid="cart-product-options"><!--[-->`);
        ssrRenderList(unref(itemOptions), (option) => {
          _push(`<span class="mr-2">${ssrInterpolate(option.group)}: ${ssrInterpolate(option.option)}</span>`);
        });
        _push(`<!--]--></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!unref(isPromotion)) {
        _push(`<div class="flex flex-1 items-end justify-between text-sm"><input${ssrRenderAttr("value", unref(quantity))} type="number"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${ssrRenderAttr("min", ((_a = unref(cartItem).quantityInformation) == null ? void 0 : _a.minPurchase) || 1)}${ssrRenderAttr("max", ((_b = unref(cartItem).quantityInformation) == null ? void 0 : _b.maxPurchase) || __props.maxQty)}${ssrRenderAttr("step", ((_c = unref(cartItem).quantityInformation) == null ? void 0 : _c.purchaseSteps) || 1)} data-testid="cart-product-qty-select" name="quantity" class="w-18 mt-1 inline-block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"><div class="flex">`);
        if (!unref(isPromotion)) {
          _push(`<button type="button"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="${ssrRenderClass([{ "text-gray-500": unref(isLoading) }, "font-medium text-brand-dark"])}" data-testid="product-remove-button"> Remove </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/checkout/CheckoutCartItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CheckoutCartItem-360d615a.mjs.map
