import { _ as __nuxt_component_0 } from './client-only-67b331e0.mjs';
import { K as useNavigation, L as onClickOutside, i as getTranslatedProperty } from '../server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { RouterLink } from 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutTopNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const { navigationElements } = useNavigation();
    const currentMenuPosition = ref(null);
    const menuHtmlElement = ref(null);
    onClickOutside(menuHtmlElement, () => currentMenuPosition.value = null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "hidden lg:flex space-x-4 items-center lg:w-1/2" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(navigationElements), (navigationElement) => {
        var _a, _b;
        _push(`<div class="relative">`);
        _push(ssrRenderComponent(unref(RouterLink), {
          to: "/" + ((_b = (_a = navigationElement.seoUrls) == null ? void 0 : _a[0]) == null ? void 0 : _b.seoPathInfo),
          class: "text-base font-medium text-gray-500 hover:text-gray-900"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(getTranslatedProperty)(navigationElement, "name"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(getTranslatedProperty)(navigationElement, "name")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_client_only, null, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutTopNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutTopNavigation-b7017cc6.mjs.map
