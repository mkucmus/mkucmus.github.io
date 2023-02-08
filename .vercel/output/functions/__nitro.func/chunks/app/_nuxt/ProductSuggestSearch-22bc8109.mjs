import _sfc_main$1 from './SharedPrice-64255154.mjs';
import _sfc_main$2 from './ProductUnits-4d5fe604.mjs';
import { defineComponent, toRefs, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { m as useProductPrice, E as getMainImageUrl, i as getTranslatedProperty } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "ProductSuggestSearch",
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
      const _component_ProductUnits = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-3 h-14 text-sm flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition duration-300 bg-white" }, _attrs))}><div class="rounded-md border-1 border-gray-200 overflow-hidden flex-none"><img data-testid="layout-search-suggest-image"${ssrRenderAttr("src", unref(getMainImageUrl)(unref(product)))} class="h-8 w-8 object-cover" alt="Product image"></div><div class="flex items-center justify-between overflow-hidden gap-5 grow"><div data-testid="layout-search-suggest-name" class="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">${ssrInterpolate(unref(getTranslatedProperty)(unref(product), "name"))}</div><div class="flex-none text-right">`);
      if (unref(unitPrice)) {
        _push(ssrRenderComponent(_component_SharedPrice, {
          "data-testid": "layout-search-suggest-price",
          class: "justify-end",
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
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ProductUnits, {
        "data-testid": "layout-search-suggest-units",
        product: unref(product),
        "show-content": false,
        class: "text-3"
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductSuggestSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductSuggestSearch-22bc8109.mjs.map
