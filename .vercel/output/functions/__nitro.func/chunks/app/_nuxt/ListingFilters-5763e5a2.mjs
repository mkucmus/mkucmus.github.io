import { k as useListing } from '../server.mjs';
import { defineComponent, ref, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderVNode, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "ListingFilters",
  __ssrInlineRender: true,
  setup(__props) {
    const { getAvailableFilters, setCurrentFilters, resetFilters } = useListing({
      listingType: "productSearchListing"
    });
    const mapComponent = (code) => {
      const components = {
        manufacturer: "ListingFiltersManufacturer",
        properties: "ListingFiltersProperties",
        price: "ListingFiltersPrice",
        rating: "ListingFiltersRating",
        "shipping-free": "ListingFiltersShippingFree"
      };
      return components[code];
    };
    const dirty = ref(false);
    const updateFilter = (filter) => {
      setCurrentFilters({ [filter.code]: filter.value });
      dirty.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap gap-5" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(getAvailableFilters), (filter) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(mapComponent(filter.code)), {
          key: filter.code,
          filter,
          onSelectValue: updateFilter
        }, null), _parent);
      });
      _push(`<!--]--><button style="${ssrRenderStyle(unref(dirty) ? null : { display: "none" })}" class="justify-center py-2 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" type="button"> Reset filters </button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/listing-filters/ListingFilters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ListingFilters-5763e5a2.mjs.map
