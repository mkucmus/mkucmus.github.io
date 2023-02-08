import { K as useNavigation, i as getTranslatedProperty } from '../server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-7a0b579f.mjs';
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
import '../../paths.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { navigationElements } = useNavigation({ type: "footer-navigation" });
    const gridColumns = computed(
      () => navigationElements.value ? Object.keys(navigationElements.value).length + 2 : 2
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "px-4 sm:px-6" }, _attrs))}><menu class="border-t-2 border-gray-100 flex justify-center"><div class="${ssrRenderClass([`grid grid-cols-2 md:grid-cols-${unref(gridColumns)}`, "py-10 w-full max-w-screen-xl"])}"><div class="hidden md:block">`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sr-only"${_scopeId}>Shopware</span><img class="h-15 w-auto sm:h-15"${ssrRenderAttr("src", _imports_0)} alt="Logo"${_scopeId}>`);
          } else {
            return [
              createVNode("span", { class: "sr-only" }, "Shopware"),
              createVNode("img", {
                class: "h-15 w-auto sm:h-15",
                src: _imports_0,
                alt: "Logo"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(unref(navigationElements), (navigationElement) => {
        _push(`<div><h4 class="mb-5">${ssrInterpolate(unref(getTranslatedProperty)(navigationElement, "name"))}</h4>`);
        if (navigationElement.childCount > 0) {
          _push(`<ul class="list-none p-0 mb-5"><!--[-->`);
          ssrRenderList(navigationElement.children, (navigationChild) => {
            var _a;
            _push(`<li class="pb-3 md:pb-1">`);
            _push(ssrRenderComponent(unref(RouterLink), {
              to: "/" + ((_a = navigationChild.seoUrls[0]) == null ? void 0 : _a.seoPathInfo),
              class: "text-base font-normal text-gray-500 hover:text-gray-900"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(getTranslatedProperty)(navigationChild, "name"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(getTranslatedProperty)(navigationChild, "name")), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><div class="hidden md:block"><ul class="list-none"><li class="pb-1"><a href="mailto:info@shopware.com" class="text-base font-medium text-gray-500 hover:text-gray-900">info@shopware.com</a></li><li class="pb-1"><a href="tel:0080074676260" class="text-base font-medium text-gray-500 hover:text-gray-900"> Worldwide: 00 800 746 7626 0 </a></li></ul></div></div></menu></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutFooter-c273670c.mjs.map
