import { k as useListing, e as useRoute, f as useRouter } from '../server.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './SwProductCard-5c66eb8b.mjs';
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
import './client-only-67b331e0.mjs';
import './SharedPrice-64255154.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SwPagination",
  __ssrInlineRender: true,
  props: {
    total: null,
    current: null
  },
  emits: ["changePage"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.total > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white justify-center px-4 py-3 flex border-t border-gray-200 sm:px-6" }, _attrs))}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">`);
        if (__props.current - 1 >= 1) {
          _push(`<button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><span class="w-10 h-10 i-carbon-chevron-left text-blue-700"></span><span class="sr-only">Previous</span></button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.current > 2) {
          _push(`<button aria-current="page" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.current - 1 > 2) {
          _push(`<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.current > 1) {
          _push(`<button aria-current="page" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.current - 1)}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button aria-current="page" class="bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.current)}</button>`);
        if (__props.current < __props.total) {
          _push(`<button aria-current="page" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.current + 1)}</button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.total - __props.current > 2) {
          _push(`<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.total - __props.current > 1) {
          _push(`<button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.total)}</button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.total > __props.current + 1) {
          _push(`<button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><span class="sr-only">Next</span><span class="w-10 h-10 i-carbon-chevron-right text-blue-700"></span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</nav></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementProductListing",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const {
      getElements,
      setInitialListing,
      getCurrentPage,
      changeCurrentPage,
      getTotalPagesCount
    } = useListing({ listingType: "categoryListing" });
    const route = useRoute();
    const router = useRouter();
    const changePage = async (page) => {
      await router.push({
        query: {
          ...route.query,
          p: page
        }
      });
      changeCurrentPage(route.query);
    };
    const isProductListing = computed(
      () => {
        var _a2;
        return ((_a2 = props.content) == null ? void 0 : _a2.type) === "product-listing";
      }
    );
    setInitialListing((_b = (_a = props == null ? void 0 : props.content) == null ? void 0 : _a.data) == null ? void 0 : _b.listing);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}><div class="max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">`);
      if (unref(getElements).length) {
        _push(`<div><div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"><!--[-->`);
        ssrRenderList(unref(getElements), (product) => {
          _push(ssrRenderComponent(_sfc_main$2, {
            key: product.id,
            product,
            isProductListing: unref(isProductListing)
          }, null, _parent));
        });
        _push(`<!--]--></div><div class="mt-10">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          total: unref(getTotalPagesCount),
          current: Number(unref(getCurrentPage)),
          onChangePage: changePage
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div><h2 class="mx-auto text-center">No products found \u{1F614}</h2></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementProductListing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementProductListing-581d2d34.mjs.map
