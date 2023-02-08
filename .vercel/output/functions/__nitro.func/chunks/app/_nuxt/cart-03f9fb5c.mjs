import _sfc_main$1 from './CheckoutCartItem-360d615a.mjs';
import _sfc_main$2 from './SharedPrice-64255154.mjs';
import _sfc_main$3 from './CheckoutPromotionCode-98fd088b.mjs';
import { J as useCart } from '../server.mjs';
import { defineComponent, computed, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { RouterLink } from 'vue-router';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'cookie-es';
import 'ohash';
import 'scule';
import 'axios';
import 'query-string';
import 'defu';
import '../../nitro/config.mjs';

const __default__ = {
  name: "CartPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const { cartItems, subtotal, totalPrice, shippingTotal } = useCart();
    const hasItems = computed(() => cartItems.value.length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CheckoutCartItem = _sfc_main$1;
      const _component_SharedPrice = _sfc_main$2;
      const _component_CheckoutPromotionCode = _sfc_main$3;
      if (unref(hasItems)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "m-10" }, _attrs))}><h1 class="mb-3 text-2xl font-medium text-gray-900">Shopping cart</h1><div class="my-10 md:grid md:grid-cols-3 md:gap-8"><ul role="list" class="divide-y pl-0 divide-gray-200 md:col-span-2 border-t"><!--[-->`);
        ssrRenderList(unref(cartItems), (cartItem) => {
          _push(`<li class="flex py-6">`);
          _push(ssrRenderComponent(_component_CheckoutCartItem, { "cart-item": cartItem }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul><aside class="md:col-span-1 pb-4 px-4 bg-gray-50 rounded dark:bg-gray-800"><h2 class="text-xl font-medium text-gray-900">Order summary</h2><div class="flex py-4 border-b justify-between text-sm text-gray-500"><p>Subtotal</p>`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: unref(subtotal),
          class: "text-gray-900 font-medium",
          "data-testid": "cart-subtotal"
        }, null, _parent));
        _push(`</div><div class="flex py-4 border-b justify-between text-sm text-gray-500"><p>Shipping estimate</p>`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: unref(shippingTotal),
          class: "text-gray-900 font-medium",
          "data-testid": "cart-subtotal"
        }, null, _parent));
        _push(`</div><div class="flex py-4 mb-8 justify-between text-gray-900 font-medium"><p>Order total</p>`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: unref(totalPrice),
          "data-testid": "cart-subtotal"
        }, null, _parent));
        _push(`</div><div class="pb-4 mb-8 justify-between text-gray-900 font-medium">`);
        _push(ssrRenderComponent(_component_CheckoutPromotionCode, null, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(unref(RouterLink), {
          class: "flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white shadow-sm bg-brand-primary hover:bg-brand-dark",
          to: "/checkout",
          "data-testid": "cart-checkout-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Checkout `);
            } else {
              return [
                createTextVNode(" Checkout ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</aside></div></div>`);
      } else {
        _push(`<h1${ssrRenderAttrs(mergeProps({ class: "m-10 text-center text-2xl font-medium text-gray-900" }, _attrs))}> Your cart is empty! </h1>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-03f9fb5c.mjs.map
