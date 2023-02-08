import _sfc_main$1 from './ListingFilters-5763e5a2.mjs';
import _sfc_main$2 from './ProductCard-dd6a11cf.mjs';
import _sfc_main$3 from './SharedPagination-78e532a6.mjs';
import { e as useRoute, f as useRouter, k as useListing, b as useBreadcrumbs, a as useAsyncData } from '../server.mjs';
import { defineComponent, withAsyncContext, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
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
import './SharedListingProductPrice-ec1574ad.mjs';
import './SharedPrice-64255154.mjs';

const __default__ = {
  name: "SearchResultPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const {
      search,
      getElements: products,
      getTotalPagesCount,
      getCurrentPage,
      changeCurrentPage,
      loading,
      setInitialListing,
      getCurrentListing
    } = useListing({
      listingType: "productSearchListing"
    });
    useBreadcrumbs([
      {
        name: "Search",
        path: "/search"
      }
    ]);
    const { data: productSearch } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "productSearch",
      async () => {
        await search(route.query);
        return getCurrentListing.value;
      },
      {
        watch: [route]
      }
    )), __temp = await __temp, __restore(), __temp);
    const changePage = async (page) => {
      await router.push({
        query: {
          ...route.query,
          p: page
        }
      });
      changeCurrentPage(route.query);
    };
    setInitialListing(productSearch.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsLoadingCircle = resolveComponent("IconsLoadingCircle");
      const _component_ListingFilters = _sfc_main$1;
      const _component_ProductCard = _sfc_main$2;
      const _component_SharedPagination = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "container mb-8 mx-4 md:mx-auto",
        "data-testid": "search-results-container"
      }, _attrs))}>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_IconsLoadingCircle, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="mb-8 text-3xl font-extrabold text-center">`);
      if (unref(products).length) {
        _push(`<span>Search Result</span>`);
      } else {
        _push(`<span>No products found</span>`);
      }
      _push(`</h1>`);
      _push(ssrRenderComponent(_component_ListingFilters, { class: "mb-4" }, null, _parent));
      _push(`<hr><div class="grid grid-cols-1 mt-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"><!--[-->`);
      ssrRenderList(unref(products), (product) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_SharedPagination, {
        total: unref(getTotalPagesCount),
        current: Number(unref(getCurrentPage)),
        class: "mt-10",
        onChangePage: changePage
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-8276f3e3.mjs.map
