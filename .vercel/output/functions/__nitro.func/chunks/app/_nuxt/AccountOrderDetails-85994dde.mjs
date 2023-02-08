import _sfc_main$1 from './AccountOrderLineItem-c66c1477.mjs';
import { D as useOrderDetails } from '../server.mjs';
import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
  name: "AccountOrderDetails"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    orderId: null
  },
  setup(__props) {
    const props = __props;
    const {
      loadOrderDetails,
      personalDetails,
      billingAddress,
      shippingAddress,
      order
    } = useOrderDetails(props.orderId);
    const lineItems = computed(() => {
      var _a;
      return ((_a = order.value) == null ? void 0 : _a.lineItems) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountOrderLineItem = _sfc_main$1;
      if (unref(lineItems).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-2 py-4" }, _attrs))}><div class="grid grid-cols-5 gap-y-10 gap-x-6 pb-4 text-gray-400"><div class="col-span-2">Product</div><div>Quantity</div><div>Price</div><div class="justify-self-end text-primary-dark">Subtotal</div></div><!--[-->`);
        ssrRenderList(unref(lineItems), (lineItem) => {
          _push(ssrRenderComponent(_component_AccountOrderLineItem, {
            key: lineItem.identifier,
            "line-item": lineItem
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountOrderDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountOrderDetails-85994dde.mjs.map
