import _sfc_main$1 from './SharedModal-a1e47874.mjs';
import _sfc_main$2 from './LayoutHeader-e6e18db9.mjs';
import _sfc_main$3 from './LayoutNotifications-227b01b5.mjs';
import _sfc_main$4 from './LayoutBreadcrumbs-577021a8.mjs';
import _sfc_main$5 from './CheckoutSideCart-513d3b83.mjs';
import _sfc_main$6 from './LayoutFooter-c273670c.mjs';
import { K as useNavigation, a as useAsyncData } from '../server.mjs';
import { defineComponent, provide, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
import 'vue-router';
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

const __default__ = {
  name: "DefaultLayout"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const { loadNavigationElements } = useNavigation();
    const { data } = useAsyncData("mainNavigation", () => {
      return loadNavigationElements({ depth: 2 });
    });
    provide("swNavigation-main-navigation", data);
    const { loadNavigationElements: loadFooterNavigationElements } = useNavigation({
      type: "footer-navigation"
    });
    const { data: footerData } = useAsyncData("mainFooterNavigation", () => {
      return loadFooterNavigationElements({ depth: 2 });
    });
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
      _push(`<div class="mx-auto">`);
      _push(ssrRenderComponent(_component_LayoutBreadcrumbs, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CheckoutSideCart, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-10d190f5.mjs.map
