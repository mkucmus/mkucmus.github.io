import __nuxt_component_0 from './AccountOrderSummary-34dd30fd.mjs';
import _sfc_main$1 from './AccountOrderDetails-85994dde.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { A as useSessionContext } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
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
  name: "AccountOrder"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    order: null
  },
  setup(__props) {
    const props = __props;
    const isExpand = ref(false);
    const toggleView = () => isExpand.value = !isExpand.value;
    const { currency } = useSessionContext();
    const orderDate = computed(
      () => {
        var _a;
        return new Date((_a = props == null ? void 0 : props.order) == null ? void 0 : _a.orderDate).toLocaleDateString(
          "en-US"
        );
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountOrderSummary = __nuxt_component_0;
      const _component_AccountOrderDetails = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-gray-200 mb-8 rounded" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AccountOrderSummary, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="col-span-2"${_scopeId}>${ssrInterpolate(__props.order.orderNumber)}</div><div${_scopeId}>${ssrInterpolate(__props.order.amountTotal)} ${ssrInterpolate((_a = unref(currency)) == null ? void 0 : _a.symbol)}</div><div${_scopeId}>${ssrInterpolate(unref(orderDate))}</div><div class="justify-self-end text-brand-dark cursor-pointer"${ssrRenderAttr("aria-expanded", unref(isExpand))}${_scopeId}> View </div>`);
          } else {
            return [
              createVNode("div", { class: "col-span-2" }, toDisplayString(__props.order.orderNumber), 1),
              createVNode("div", null, toDisplayString(__props.order.amountTotal) + " " + toDisplayString((_b = unref(currency)) == null ? void 0 : _b.symbol), 1),
              createVNode("div", null, toDisplayString(unref(orderDate)), 1),
              createVNode("div", {
                class: "justify-self-end text-brand-dark cursor-pointer",
                "aria-expanded": unref(isExpand),
                onClick: toggleView
              }, " View ", 8, ["aria-expanded"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isExpand)) {
        _push(ssrRenderComponent(_component_AccountOrderDetails, {
          "order-id": __props.order.id
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountOrder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountOrder-a2811e81.mjs.map
