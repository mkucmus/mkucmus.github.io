import _sfc_main$1 from './SharedModal-a1e47874.mjs';
import _sfc_main$2 from './LayoutCheckoutHeader-6607128f.mjs';
import _sfc_main$3 from './LayoutNotifications-227b01b5.mjs';
import _sfc_main$4 from './CheckoutSideCart-513d3b83.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import './AccountMenu-c02e58c5.mjs';
import '../server.mjs';
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
import './logo-7a0b579f.mjs';
import '../../paths.mjs';
import './LayoutNotification-859b2f42.mjs';
import './CheckoutCartItem-360d615a.mjs';
import './SharedPrice-64255154.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SharedModal = _sfc_main$1;
  const _component_LayoutCheckoutHeader = _sfc_main$2;
  const _component_LayoutNotifications = _sfc_main$3;
  const _component_CheckoutSideCart = _sfc_main$4;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_SharedModal, null, null, _parent));
  _push(ssrRenderComponent(_component_LayoutCheckoutHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_LayoutNotifications, null, null, _parent));
  _push(`<div class="max-w-screen-xl mx-auto">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
  _push(ssrRenderComponent(_component_CheckoutSideCart, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checkout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { checkout as default };
//# sourceMappingURL=checkout-3a3170db.mjs.map
