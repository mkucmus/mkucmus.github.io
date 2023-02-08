import { defineComponent, reactive, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { L as onClickOutside, I as useDebounceFn } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "ListingFiltersPrice",
  __ssrInlineRender: true,
  props: {
    filter: null
  },
  emits: ["select-value"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const prices = reactive({
      min: ((_a = props.filter) == null ? void 0 : _a.min) || 0,
      max: ((_b = props.filter) == null ? void 0 : _b.max) || 0
    });
    const isOpen = ref(false);
    const dropdownElement = ref(null);
    onClickOutside(dropdownElement, () => isOpen.value = false);
    function onMinPriceChange(newPrice, oldPrice) {
      if (newPrice == oldPrice)
        return;
      emits("select-value", {
        code: "min-price",
        value: newPrice
      });
    }
    const debounceMinPriceUpdate = useDebounceFn(onMinPriceChange, 1e3);
    watch(() => prices.min, debounceMinPriceUpdate);
    function onMaxPriceChange(newPrice, oldPrice) {
      if (newPrice == oldPrice)
        return;
      emits("select-value", {
        code: "max-price",
        value: newPrice
      });
    }
    const debounceMaxPriceUpdate = useDebounceFn(onMaxPriceChange, 1e3);
    watch(() => prices.max, debounceMaxPriceUpdate);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "dropdownElement",
        ref: dropdownElement,
        class: "relative"
      }, _attrs))}><button type="button" class="border-2 border-gray-300 px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500 rounded"><span class="font-medium text-gray-900">${ssrInterpolate(__props.filter.label)}</span><span class="ml-6 flex items-center"><div class="${ssrRenderClass([[!unref(isOpen) ? "i-carbon-chevron-down" : "i-carbon-chevron-up"], "h-5 w-5"])}"></div></span></button><div class="${ssrRenderClass([
        `absolute bg-white mt-1 border-2 rounded border-gray-300 p-3 z-1000`,
        { hidden: !unref(isOpen) }
      ])}"><div class="flex gap-4 text-sm text-gray-500"><div class="w-36"><div>Min</div><input id="min-price"${ssrRenderAttr("value", unref(prices).min)} type="number" name="min-price" class="pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full border border-gray-300 rounded"${ssrRenderAttr("placeholder", (_a2 = unref(prices).min) == null ? void 0 : _a2.toString())}></div><div class="w-36"><div>Max</div><input id="max-price"${ssrRenderAttr("value", unref(prices).max)} type="number" name="max-price" class="pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full border border-gray-300 rounded"${ssrRenderAttr("placeholder", (_b2 = unref(prices).max) == null ? void 0 : _b2.toString())}></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/listing-filters/ListingFiltersPrice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ListingFiltersPrice-292b843c.mjs.map
