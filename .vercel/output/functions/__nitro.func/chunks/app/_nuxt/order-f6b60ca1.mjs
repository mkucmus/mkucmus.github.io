import _sfc_main$1 from './AccountOrder-a2811e81.mjs';
import { a4 as useCustomerOrders, b as useBreadcrumbs, a as useAsyncData } from '../server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import './AccountOrderSummary-34dd30fd.mjs';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import './AccountOrderDetails-85994dde.mjs';
import './AccountOrderLineItem-c66c1477.mjs';
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
import 'vue-router';
import 'cookie-es';
import 'ohash';
import 'scule';
import 'axios';
import 'query-string';
import 'defu';
import '../../nitro/config.mjs';

const __default__ = {
  name: "OrderHistory"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { orders, loadOrders } = useCustomerOrders();
    useBreadcrumbs([
      {
        name: "Account Overview",
        path: "/account"
      },
      {
        name: "Order",
        path: "/account/order"
      }
    ]);
    [__temp, __restore] = withAsyncContext(() => useAsyncData("getOrders", () => {
      return loadOrders();
    })), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountOrder = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto my-8" }, _attrs))}><h1 class="border-b pb-3 text-2xl font-medium text-gray-900 mb-8"> Order history </h1><!--[-->`);
      ssrRenderList(unref(orders), (order) => {
        _push(ssrRenderComponent(_component_AccountOrder, {
          key: order.id,
          order
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/order.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=order-f6b60ca1.mjs.map
