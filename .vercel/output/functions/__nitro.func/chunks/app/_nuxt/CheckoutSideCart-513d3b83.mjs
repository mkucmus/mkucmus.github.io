import _sfc_main$1 from './CheckoutCartItem-360d615a.mjs';
import _sfc_main$2 from './SharedPrice-64255154.mjs';
import { J as useCart, _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, inject, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CheckoutSideCart",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = inject("isSidebarOpen");
    const { cartItems, totalPrice, isEmpty } = useCart();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CheckoutCartItem = _sfc_main$1;
      const _component_SharedPrice = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      if (unref(isOpen)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden">`);
        if (unref(isOpen)) {
          _push(`<div class="absolute inset-0 bg-gray-500 bg-opacity-60 transition-opacity" aria-hidden="true"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">`);
        if (unref(isOpen)) {
          _push(`<div class="pointer-events-auto w-screen max-w-md"><div class="flex h-full flex-col bg-white shadow-xl"><div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6"><div class="flex items-start justify-between"><h2 id="slide-over-title" class="text-lg font-medium text-gray-900 py-0"> Shopping cart </h2><div class="ml-3 flex h-7 items-center"><button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500"><span class="sr-only">Close panel</span><div class="w-6 h-6 i-carbon-close"></div></button></div></div><div class="mt-8"><div class="flow-root">`);
          if (!unref(isEmpty)) {
            _push(`<ul role="list" class="-my-6 px-0 divide-y divide-gray-200"><!--[-->`);
            ssrRenderList(unref(cartItems), (cartItem) => {
              _push(`<li class="flex py-6">`);
              _push(ssrRenderComponent(_component_CheckoutCartItem, { "cart-item": cartItem }, null, _parent));
              _push(`</li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<div class="text-2xl text-center"> Your shopping cart is empty </div>`);
          }
          _push(`</div></div></div><div class="border-t border-gray-200 py-6 px-4 sm:px-6"><div class="flex justify-between text-base font-medium text-gray-900"><p>Subtotal</p>`);
          _push(ssrRenderComponent(_component_SharedPrice, {
            value: unref(totalPrice),
            "data-testid": "cart-subtotal"
          }, null, _parent));
          _push(`</div><p class="mt-0.5 text-sm text-gray-500"> Shipping and taxes calculated at checkout. </p><div class="mt-6">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: ["flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm bg-brand-primary hover:bg-brand-dark", { "bg-gray": unref(isEmpty), "hover:bg-gray": unref(isEmpty) }],
            to: unref(isEmpty) ? "" : "/checkout",
            "data-testid": "cart-checkout-link",
            onClick: ($event) => isOpen.value = !unref(isEmpty) ? false : true
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
          _push(ssrRenderComponent(unref(RouterLink), {
            class: "flex items-center justify-center py-3 text-sm font-medium text-brand-dark",
            to: "/checkout/cart",
            "data-testid": "cart-checkout-shopping-cart",
            onClick: ($event) => isOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Go to shopping cart `);
              } else {
                return [
                  createTextVNode(" Go to shopping cart ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="mt-6 flex justify-center text-center text-sm text-brand-dark"><p> or <button type="button" class="font-medium" data-testid="cart-continue-button"> Continue Shopping<span aria-hidden="true"> \u2192</span></button></p></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/checkout/CheckoutSideCart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CheckoutSideCart-513d3b83.mjs.map
