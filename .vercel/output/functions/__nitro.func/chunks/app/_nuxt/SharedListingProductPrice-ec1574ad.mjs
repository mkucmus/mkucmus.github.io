import _sfc_main$1 from './SharedPrice-64255154.mjs';
import { defineComponent, toRefs, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { m as useProductPrice } from '../server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SharedListingProductPrice",
  __ssrInlineRender: true,
  props: {
    product: null
  },
  setup(__props) {
    const props = __props;
    const { product } = toRefs(props);
    const { unitPrice, displayFromVariants, displayFrom } = useProductPrice(product);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SharedPrice = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(product).id
      }, _attrs))}>`);
      if (unref(displayFromVariants)) {
        _push(ssrRenderComponent(_component_SharedPrice, {
          class: "text-xs text-gray-900 basis-2/6 justify-end",
          value: unref(displayFromVariants)
        }, {
          beforePrice: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(displayFromVariants)) {
                _push2(`<span${_scopeId}>variants from</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(displayFromVariants) ? (openBlock(), createBlock("span", { key: 0 }, "variants from")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_SharedPrice, {
        class: "text-sm text-gray-900 basis-2/6 justify-end",
        value: unref(unitPrice)
      }, {
        beforePrice: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayFrom)) {
              _push2(`<span${_scopeId}>from</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(displayFrom) ? (openBlock(), createBlock("span", { key: 0 }, "from")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SharedListingProductPrice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SharedListingProductPrice-ec1574ad.mjs.map
