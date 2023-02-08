import { k as useListing, L as onClickOutside } from '../server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
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
  __name: "ListingFiltersRating",
  __ssrInlineRender: true,
  props: {
    filter: null
  },
  emits: ["select-value"],
  setup(__props, { emit: emits }) {
    const { getCurrentFilters } = useListing({
      listingType: "productSearchListing"
    });
    const isHoverActive = ref(false);
    const hoveredIndex = ref(0);
    const displayedScore = computed(
      () => {
        var _a;
        return isHoverActive.value ? hoveredIndex.value : ((_a = getCurrentFilters.value) == null ? void 0 : _a.rating) || 0;
      }
    );
    const isOpen = ref(false);
    const dropdownElement = ref(null);
    onClickOutside(dropdownElement, () => isOpen.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "dropdownElement",
        ref: dropdownElement,
        class: "relative"
      }, _attrs))}><button type="button" class="border-2 border-gray-300 px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500 rounded"><span class="font-medium text-gray-900">${ssrInterpolate(__props.filter.label)}</span><span class="ml-6 flex items-center"><div class="${ssrRenderClass([[!unref(isOpen) ? "i-carbon-chevron-down" : "i-carbon-chevron-up"], "h-5 w-5"])}"></div></span></button><div class="${ssrRenderClass([
        `absolute bg-white mt-1 border-2 rounded border-gray-300 p-3 z-1000`,
        { hidden: !unref(isOpen) }
      ])}"><div class="flex"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<div class="${ssrRenderClass([{
          "i-carbon-star-filled": unref(displayedScore) >= i,
          "i-carbon-star": unref(displayedScore) < i
        }, "h-6 w-6 c-yellow-500"])}"></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/listing-filters/ListingFiltersRating.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ListingFiltersRating-e4e641c9.mjs.map
