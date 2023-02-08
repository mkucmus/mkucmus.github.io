import { b as useBreadcrumbs, _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
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
  __name: "LayoutBreadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    const { breadcrumbs } = useBreadcrumbs();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "container mx-auto flex mt-8 mb-8",
        "aria-label": "Breadcrumb"
      }, _attrs))}><ol class="inline-flex items-center space-x-1 md:space-x-3"><li class="inline-flex items-center">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-5 h-5 i-carbon-home mr-2"${_scopeId}></div> Home `);
          } else {
            return [
              createVNode("div", { class: "w-5 h-5 i-carbon-home mr-2" }),
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-5 h-5 i-carbon-chevron-right"></div></li><!--[-->`);
      ssrRenderList(unref(breadcrumbs), (breadcrumb, index) => {
        _push(`<li class="inline-flex items-center">`);
        if (breadcrumb.path) {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: breadcrumb.path,
            class: "inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(breadcrumb.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(breadcrumb.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white">${ssrInterpolate(breadcrumb.name)}</span>`);
        }
        if (index < unref(breadcrumbs).length - 1) {
          _push(`<div class="w-5 h-5 i-carbon-chevron-right"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ol></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutBreadcrumbs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutBreadcrumbs-577021a8.mjs.map
