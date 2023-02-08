import _sfc_main$1 from './SharedPrice-64255154.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { E as getMainImageUrl } from '../server.mjs';
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
  name: "AccountOrderLineItem"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    lineItem: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SharedPrice = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-5 gap-y-10 gap-x-6 py-4 border-t border-gray-200 text-gray-400 items-center" }, _attrs))}><div class="flex items-center col-span-2 text-gray-900">`);
      if (__props.lineItem.type == "product") {
        _push(`<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md mr-2"><img${ssrRenderAttr("src", unref(getMainImageUrl)(__props.lineItem))}${ssrRenderAttr("alt", __props.lineItem.label)} class="h-full w-full object-cover object-center"></div>`);
      } else {
        _push(`<div class="w-24"></div>`);
      }
      _push(` ${ssrInterpolate(__props.lineItem.label)}</div><div>${ssrInterpolate(__props.lineItem.quantity)}</div>`);
      if (__props.lineItem.unitPrice) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: __props.lineItem.unitPrice,
          class: "text-gray-600 font-normal",
          "data-testid": "order-item-unitprice"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.lineItem.totalPrice) {
        _push(`<div class="justify-self-end">`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: __props.lineItem.totalPrice,
          class: "text-gray-600 font-normal",
          "data-testid": "order-item-totalprice"
        }, null, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountOrderLineItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountOrderLineItem-c66c1477.mjs.map
