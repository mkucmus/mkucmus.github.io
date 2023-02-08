import _sfc_main$1 from './SharedModal-a1e47874.mjs';
import _sfc_main$2 from './LayoutHeader-e6e18db9.mjs';
import _sfc_main$3 from './LayoutNotifications-227b01b5.mjs';
import _sfc_main$4 from './LayoutBreadcrumbs-577021a8.mjs';
import _sfc_main$5 from './CheckoutSideCart-513d3b83.mjs';
import _sfc_main$6 from './LayoutFooter-c273670c.mjs';
import { K as useNavigation, z as useUser, f as useRouter, a as useAsyncData, p as useNotifications } from '../server.mjs';
import { defineComponent, withAsyncContext, provide, unref, withCtx, createVNode, useSSRContext, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { RouterLink } from 'vue-router';
import './LayoutSideMenu-b0d05e82.mjs';
import './client-only-67b331e0.mjs';
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
import './LayoutTopNavigation-b7017cc6.mjs';
import './LayoutStoreSearch-696c4fb1.mjs';
import './ProductSuggestSearch-22bc8109.mjs';
import './SharedPrice-64255154.mjs';
import './ProductUnits-4d5fe604.mjs';
import './AccountMenu-c02e58c5.mjs';
import './logo-7a0b579f.mjs';
import '../../paths.mjs';
import './LayoutNotification-859b2f42.mjs';
import './CheckoutCartItem-360d615a.mjs';

function useAuthGuardRedirection(params) {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const { pushInfo } = useNotifications();
  watch(
    isLoggedIn,
    (isLoggedIn2) => {
      if (!isLoggedIn2) {
        router.push((params == null ? void 0 : params.to) || "/");
        pushInfo(`You're logged out.`);
      }
    },
    {
      immediate: true
    }
  );
}
const __default__ = {
  name: "AccountLayout"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAuthGuardRedirection();
    const { loadNavigationElements } = useNavigation();
    useUser();
    useRouter();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("mainNavigation", () => {
      return loadNavigationElements({ depth: 2 });
    })), __temp = await __temp, __restore(), __temp);
    provide("swNavigation-main-navigation", data);
    const { loadNavigationElements: loadFooterNavigationElements } = useNavigation({
      type: "footer-navigation"
    });
    const { data: footerData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("mainFooterNavigation", () => {
      return loadFooterNavigationElements({ depth: 2 });
    })), __temp = await __temp, __restore(), __temp);
    provide("swNavigation-footer-navigation", footerData);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SharedModal = _sfc_main$1;
      const _component_LayoutHeader = _sfc_main$2;
      const _component_LayoutNotifications = _sfc_main$3;
      const _component_LayoutBreadcrumbs = _sfc_main$4;
      const _component_CheckoutSideCart = _sfc_main$5;
      const _component_LayoutFooter = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_SharedModal, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutNotifications, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutBreadcrumbs, null, null, _parent));
      _push(`<div class="max-w-screen-xl mx-auto min-h-full"><div class="m-10"><div class="account-inner"><div class="md:grid md:grid-cols-3 md:gap-6"><aside class="hidden md:block lg:w-64 md:col-span-" aria-label="Sidebar"><div class="overflow-y-auto py-4 px-3 bg-gray-50 text-base font-normal text-gray-500 rounded"><h1 class="self-center text-xl p-2 mb-2 font-semibold whitespace-nowrap"> My account </h1><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/account",
        class: "flex items-center p-2 rounded-lg hover:text-brand-primary hover:bg-gray-100 is-active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div i-carbon-dashboard text-xl inline-block${_scopeId}></div><span class="ml-3"${_scopeId}>Account Overview</span>`);
          } else {
            return [
              createVNode("div", {
                "i-carbon-dashboard": "",
                "text-xl": "",
                "inline-block": ""
              }),
              createVNode("span", { class: "ml-3" }, "Account Overview")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/account/profile",
        class: "flex items-center p-2 rounded-lg hover:text-brand-primary hover:bg-gray-100 is-active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div i-carbon-user text-xl inline-block${_scopeId}></div><span class="ml-3"${_scopeId}>My profile</span>`);
          } else {
            return [
              createVNode("div", {
                "i-carbon-user": "",
                "text-xl": "",
                "inline-block": ""
              }),
              createVNode("span", { class: "ml-3" }, "My profile")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/account/address",
        class: "flex items-center p-2 rounded-lg hover:text-brand-primary hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div i-carbon-home text-xl inline-block${_scopeId}></div><span class="ml-3"${_scopeId}>My address</span>`);
          } else {
            return [
              createVNode("div", {
                "i-carbon-home": "",
                "text-xl": "",
                "inline-block": ""
              }),
              createVNode("span", { class: "ml-3" }, "My address")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/account/payment",
        class: "flex items-center p-2 rounded-lg hover:text-brand-primary hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div i-carbon-wallet text-xl inline-block${_scopeId}></div><span class="ml-3"${_scopeId}>Payment</span>`);
          } else {
            return [
              createVNode("div", {
                "i-carbon-wallet": "",
                "text-xl": "",
                "inline-block": ""
              }),
              createVNode("span", { class: "ml-3" }, "Payment")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><ul class="pt-4 mt-4 space-y-2 border-t border-gray-200"><li>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/account/order",
        class: "flex items-center p-2 rounded-lg hover:text-brand-primary hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div i-carbon-order-details text-xl inline-block${_scopeId}></div><span class="ml-3"${_scopeId}>Order history</span>`);
          } else {
            return [
              createVNode("div", {
                "i-carbon-order-details": "",
                "text-xl": "",
                "inline-block": ""
              }),
              createVNode("span", { class: "ml-3" }, "Order history")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><button class="flex items-center rounded-lg p-2 hover:text-brand-primary hover:bg-gray-100 w-full"><div i-carbon-logout text-xl inline-block></div><span class="ml-3">Logout</span></button></li></ul></div></aside><main class="md:col-span-2">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div></div></div>`);
      _push(ssrRenderComponent(_component_CheckoutSideCart, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=account-7673d592.mjs.map
