import _sfc_main$1 from './ProductSuggestSearch-22bc8109.mjs';
import { M as useProductSearchSuggest, N as useFocus, I as useDebounceFn, O as useMagicKeys, f as useRouter, P as getProductUrl } from '../server.mjs';
import { defineComponent, ref, watch, computed, inject, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { RouterLink } from 'vue-router';
import './SharedPrice-64255154.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'cookie-es';
import 'ohash';
import 'scule';
import 'axios';
import 'query-string';
import 'defu';
import '../../nitro/config.mjs';
import './ProductUnits-4d5fe604.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutStoreSearch",
  __ssrInlineRender: true,
  props: {
    displayTotal: { default: 10 }
  },
  setup(__props) {
    const { searchTerm, search, getProducts, getTotal, loading } = useProductSearchSuggest();
    const active = ref(false);
    const searchContainer = ref(null);
    const searchInput = ref();
    watch(active, (value) => {
      const { focused } = useFocus(searchInput);
      focused.value = value;
    });
    const typingQuery = ref("");
    watch(typingQuery, (value) => {
      if (value.length >= 3) {
        performSuggestSearch(value);
      }
    });
    const performSuggestSearch = useDebounceFn((value) => {
      searchTerm.value = value;
      search();
    }, 300);
    const showSuggest = computed(() => {
      return typingQuery.value.length >= 3 && active.value;
    });
    const { enter } = useMagicKeys({ target: searchInput });
    const { push } = useRouter();
    const isSideMenuOpened = inject("isSideMenuOpened", ref(false));
    watch(enter, (value) => {
      if (!value)
        return;
      isSideMenuOpened.value = false;
      active.value = false;
      push("/search?query=" + typingQuery.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductSuggestSearch = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "searchContainer",
        ref: searchContainer,
        class: ["relative group p-3 rounded-lg transition duration-300 hover:shadow-md", [unref(active) ? "shadow-md" : "shadow-sm"]]
      }, _attrs))}><div class="flex items-center"><div class="sw-search-input i-carbon-search flex-none h-6 w-6 text-gray-400 group-hover:text-brand-primary cursor-pointer"></div><input${ssrRenderAttr("value", unref(typingQuery))} data-testid="layout-search-input" type="text" class="sw-search-input text-gray-400 placeholder:text-gray-400 focus:text-gray-700 p-2 ml-2 grow h-6 transition duration-200 focus:outline-none" placeholder="Search products"></div>`);
      if (unref(showSuggest)) {
        _push(`<div class="absolute border-gray-100 border-t-1 duration-300 left-0 mt-2 overflow-hidden right-0 rounded-b-md shadow-md transition-height w-auto z-1"><!--[-->`);
        ssrRenderList(unref(getProducts).slice(0, __props.displayTotal), (product) => {
          _push(ssrRenderComponent(unref(RouterLink), {
            key: product.id,
            to: unref(getProductUrl)(product),
            "data-testid": "layout-search-suggest-link",
            onClick: ($event) => [active.value = false, isSideMenuOpened.value = false]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_ProductSuggestSearch, { product }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_ProductSuggestSearch, { product }, null, 8, ["product"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><div style="${ssrRenderStyle({ "clip-path": "inset(0% 0% 0% 0%)" })}" class="${ssrRenderClass([[unref(loading) ? ["bg-brand-primary"] : ["bg-gray-100"]], "h-11 text-sm rounded-b-md p-3 text-center transition"])}">`);
        if (unref(loading)) {
          _push(`<div class="w-80 h-40 bg-brand-light blur-2xl fixed animate-spin"></div>`);
        } else {
          _push(`<div>`);
          if (unref(getTotal) > 0) {
            _push(ssrRenderComponent(unref(RouterLink), {
              to: `/search?query=${unref(typingQuery)}`,
              onClick: ($event) => [active.value = false, isSideMenuOpened.value = false]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` See `);
                  if (unref(getTotal) !== 1) {
                    _push2(`<span${_scopeId}>all</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(` ${ssrInterpolate(unref(getTotal))} `);
                  if (unref(getTotal) !== 1) {
                    _push2(`<span${_scopeId}>results</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (unref(getTotal) == 1) {
                    _push2(`<span${_scopeId}>result</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    createTextVNode(" See "),
                    unref(getTotal) !== 1 ? (openBlock(), createBlock("span", { key: 0 }, "all")) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(unref(getTotal)) + " ", 1),
                    unref(getTotal) !== 1 ? (openBlock(), createBlock("span", { key: 1 }, "results")) : createCommentVNode("", true),
                    unref(getTotal) == 1 ? (openBlock(), createBlock("span", { key: 2 }, "result")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<div>No results :(</div>`);
          }
          _push(`</div>`);
        }
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutStoreSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutStoreSearch-696c4fb1.mjs.map
