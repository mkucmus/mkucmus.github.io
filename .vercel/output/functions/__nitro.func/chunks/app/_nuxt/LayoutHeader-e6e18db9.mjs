import _sfc_main$1 from './LayoutSideMenu-b0d05e82.mjs';
import _sfc_main$2 from './LayoutTopNavigation-b7017cc6.mjs';
import _sfc_main$3 from './LayoutStoreSearch-696c4fb1.mjs';
import _sfc_main$4 from './AccountMenu-c02e58c5.mjs';
import { J as useCart, C as useWishlist } from '../server.mjs';
import { defineComponent, inject, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-7a0b579f.mjs';
import { RouterLink } from 'vue-router';
import './client-only-67b331e0.mjs';
import './ProductSuggestSearch-22bc8109.mjs';
import './SharedPrice-64255154.mjs';
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
import './ProductUnits-4d5fe604.mjs';
import '../../paths.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { count } = useCart();
    const { count: wishlistCount } = useWishlist();
    inject("isSidebarOpen");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSideMenu = _sfc_main$1;
      const _component_LayoutTopNavigation = _sfc_main$2;
      const _component_LayoutStoreSearch = _sfc_main$3;
      const _component_AccountMenu = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-white" }, _attrs))}><div class="mx-auto px-4 sm:px-6"><div class="flex justify-between items-center border-b-2 border-gray-100 py-6 space-x-4"><div class="flex justify-start lg:flex-1 space-x-4 w-20 md:w-1/4 grow">`);
      _push(ssrRenderComponent(_component_LayoutSideMenu, null, null, _parent));
      _push(ssrRenderComponent(unref(RouterLink), { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sr-only"${_scopeId}>Shopware</span><img class="h-8 w-auto sm:h-10"${ssrRenderAttr("src", _imports_0)} alt="Logo"${_scopeId}>`);
          } else {
            return [
              createVNode("span", { class: "sr-only" }, "Shopware"),
              createVNode("img", {
                class: "h-8 w-auto sm:h-10",
                src: _imports_0,
                alt: "Logo"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_LayoutTopNavigation, null, null, _parent));
      _push(`<div class="hidden md:block w-full md:w-1/2 lg:w-1/4">`);
      _push(ssrRenderComponent(_component_LayoutStoreSearch, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AccountMenu, null, null, _parent));
      _push(`<div class="flex ml-4 flow-root lg:ml-6"><button class="group -m-2 p-2 flex items-center relative" data-testid="wishlist-button"><div class="w-7 h-7 i-carbon-favorite text-gray-600 hover:text-brand-primary"></div>`);
      if (unref(wishlistCount) > 0) {
        _push(`<span class="text-3 font-sm text-white absolute bg-red-500 rounded-full min-w-5 min-h-5 top-0 right-0 leading-5">${ssrInterpolate(unref(wishlistCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><div class="flex ml-4 flow-root lg:ml-6"><button class="group -m-2 p-2 flex items-center relative" data-testid="cart-button"><div class="w-7 h-7 i-carbon-shopping-bag text-gray-600 hover:text-brand-primary"></div>`);
      if (unref(count) > 0) {
        _push(`<span class="text-3 font-sm text-white absolute bg-blue rounded-full min-w-5 min-h-5 top-0 right-0 leading-5">${ssrInterpolate(unref(count) || "")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="sr-only">items in cart, view bag</span></button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutHeader-e6e18db9.mjs.map
