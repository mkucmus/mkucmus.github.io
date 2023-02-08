import { useSSRContext, defineComponent, mergeProps, ref, reactive, computed, provide, withCtx, unref, createVNode, toDisplayString, withDirectives, vShow } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './client-only-67b331e0.mjs';
import { x as useCategory, e as useRoute, f as useRouter, k as useListing, L as onClickOutside, i as getTranslatedProperty } from '../server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SwProductListingFilters",
  __ssrInlineRender: true,
  props: {
    content: null,
    listingType: null
  },
  setup(__props) {
    const { category } = useCategory();
    const route = useRoute();
    const router = useRouter();
    const isSortMenuOpen = ref(false);
    const {
      getCurrentSortingOrder,
      changeCurrentSortingOrder,
      getSortingOrders,
      getInitialFilters,
      search,
      getCurrentFilters,
      filtersToQuery
    } = useListing({ listingType: "categoryListing" });
    const sidebarSelectedFilters = reactive({
      manufacturer: /* @__PURE__ */ new Set(),
      properties: /* @__PURE__ */ new Set(),
      "min-price": void 0,
      "max-price": void 0,
      rating: void 0,
      "shipping-free": void 0
    });
    computed(() => ({
      manufacturer: [...sidebarSelectedFilters.manufacturer],
      properties: [...sidebarSelectedFilters.properties],
      "min-price": sidebarSelectedFilters["min-price"],
      "max-price": sidebarSelectedFilters["max-price"],
      order: getCurrentSortingOrder.value,
      "shipping-free": sidebarSelectedFilters["shipping-free"],
      rating: sidebarSelectedFilters["rating"]
    }));
    for (const param in route.query) {
      if (sidebarSelectedFilters.hasOwnProperty(param)) {
        if (sidebarSelectedFilters[param] && typeof sidebarSelectedFilters[param] === "object") {
          route.query[param].split("|").forEach((element) => {
            sidebarSelectedFilters[param].add(element);
          });
        } else {
          sidebarSelectedFilters[param] = route.query[param];
        }
      }
    }
    computed({
      get: () => getCurrentSortingOrder.value || "",
      set: async (order) => {
        await router.push({
          query: {
            ...route.query,
            order
          }
        });
        changeCurrentSortingOrder(route.query);
      }
    });
    const selectedOptionIds = computed(() => [
      ...sidebarSelectedFilters.properties,
      ...sidebarSelectedFilters.manufacturer
    ]);
    provide("selectedOptionIds", selectedOptionIds);
    const dropdownElement = ref(null);
    onClickOutside(dropdownElement, () => isSortMenuOpen.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white"${_scopeId}><main class="mx-auto"${_scopeId}><div class="relative flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200"${_scopeId}><div${_scopeId}><h1 class="text-4xl font-extrabold tracking-tight text-gray-900"${_scopeId}>${ssrInterpolate(unref(getTranslatedProperty)(unref(category), "name"))}</h1></div><div class="text-sm font-medium text-gray-700 hover:text-gray-900"${_scopeId}> Sort </div><div class="i-carbon-chevron-down h-5 w-5 ml-1"${_scopeId}></div></div><div class="flex flex-wrap" style="${ssrRenderStyle(!unref(getInitialFilters).length ? null : { display: "none" })}"${_scopeId}><div class="flex pl-2 flex-wrap"${_scopeId}><div class="py-3 mb-2 mr-4 max-w-sm animate-pulse"${_scopeId}><div class="border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded"${_scopeId}></div></div><div class="py-3 max-w-sm animate-pulse"${_scopeId}><div class="border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-25 h-12 text-gray-400 hover:text-gray-500 rounded"${_scopeId}></div></div><div class="py-3 ml-4 mb-2 max-w-sm animate-pulse"${_scopeId}><div class="border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-25 h-12 text-gray-400 hover:text-gray-500 rounded"${_scopeId}></div></div><div class="py-3 mb-2 max-w-sm animate-pulse"${_scopeId}><div class="border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded"${_scopeId}></div></div><div class="py-3 mb-2 max-w-sm animate-pulse"${_scopeId}><div class="border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded"${_scopeId}></div></div><div class="py-3 mb-2 max-w-sm animate-pulse"${_scopeId}><div class="border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded"${_scopeId}></div></div></div></div></main></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white" }, [
                createVNode("main", { class: "mx-auto" }, [
                  createVNode("div", { class: "relative flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-4xl font-extrabold tracking-tight text-gray-900" }, toDisplayString(unref(getTranslatedProperty)(unref(category), "name")), 1)
                    ]),
                    createVNode("div", { class: "text-sm font-medium text-gray-700 hover:text-gray-900" }, " Sort "),
                    createVNode("div", { class: "i-carbon-chevron-down h-5 w-5 ml-1" })
                  ]),
                  withDirectives(createVNode("div", { class: "flex flex-wrap" }, [
                    createVNode("div", { class: "flex pl-2 flex-wrap" }, [
                      createVNode("div", { class: "py-3 mb-2 mr-4 max-w-sm animate-pulse" }, [
                        createVNode("div", { class: "border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded" })
                      ]),
                      createVNode("div", { class: "py-3 max-w-sm animate-pulse" }, [
                        createVNode("div", { class: "border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-25 h-12 text-gray-400 hover:text-gray-500 rounded" })
                      ]),
                      createVNode("div", { class: "py-3 ml-4 mb-2 max-w-sm animate-pulse" }, [
                        createVNode("div", { class: "border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-25 h-12 text-gray-400 hover:text-gray-500 rounded" })
                      ]),
                      createVNode("div", { class: "py-3 mb-2 max-w-sm animate-pulse" }, [
                        createVNode("div", { class: "border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded" })
                      ]),
                      createVNode("div", { class: "py-3 mb-2 max-w-sm animate-pulse" }, [
                        createVNode("div", { class: "border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded" })
                      ]),
                      createVNode("div", { class: "py-3 mb-2 max-w-sm animate-pulse" }, [
                        createVNode("div", { class: "border-1 bg-gray-200 dark:bg-gray-700px-2 py-3 w-42 h-12 text-gray-400 hover:text-gray-500 rounded" })
                      ])
                    ])
                  ], 512), [
                    [vShow, !unref(getInitialFilters).length]
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwProductListingFilters.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementSidebarFilter",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-screen-xl mx-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, { content: __props.content }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementSidebarFilter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementSidebarFilter-5f7c0a43.mjs.map
