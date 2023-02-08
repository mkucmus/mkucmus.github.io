import _sfc_main$1 from './SharedPrice-64255154.mjs';
import { defineComponent, toRefs, unref, useSSRContext } from 'vue';
import { m as useProductPrice, n as usePrice } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "ProductPrice",
  __ssrInlineRender: true,
  props: {
    product: null
  },
  setup(__props) {
    const props = __props;
    const { product } = toRefs(props);
    const { unitPrice, price, tierPrices, isListPrice } = useProductPrice(product);
    const { getFormattedPrice } = usePrice();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_SharedPrice = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(tierPrices).length) {
        _push(`<div>`);
        if (unref(isListPrice)) {
          _push(ssrRenderComponent(_component_SharedPrice, {
            class: "text-1xl text-gray-900 basis-2/6 justify-end line-through",
            value: (_b = (_a = unref(price)) == null ? void 0 : _a.listPrice) == null ? void 0 : _b.price
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(unitPrice)) {
          _push(ssrRenderComponent(_component_SharedPrice, {
            class: ["text-3xl text-gray-900 basis-2/6 justify-end", {
              "text-red": unref(isListPrice)
            }],
            value: unref(unitPrice)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div><table class="border-collapse table-auto w-full text-sm mb-8"><thead><tr><th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-600 dark:text-slate-200 text-left"> Amount </th><th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 dark:text-slate-200 text-left"> Price </th></tr></thead><tbody class="bg-white dark:bg-slate-800"><!--[-->`);
        ssrRenderList(unref(tierPrices), (tierPrice, index) => {
          _push(`<tr><td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 font-medium text-slate-500 dark:text-slate-400">`);
          if (index < unref(tierPrices).length - 1) {
            _push(`<span>To</span>`);
          } else {
            _push(`<span>From</span>`);
          }
          _push(` ${ssrInterpolate(tierPrice.quantity)}</td><td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 font-medium text-current-500 dark:text-slate-400">${ssrInterpolate(unref(getFormattedPrice)(tierPrice.unitPrice))}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductPrice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductPrice-594e1885.mjs.map
