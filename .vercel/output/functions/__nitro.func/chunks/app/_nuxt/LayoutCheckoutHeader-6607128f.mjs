import _sfc_main$1 from './AccountMenu-c02e58c5.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-7a0b579f.mjs';
import { RouterLink } from 'vue-router';
import '../server.mjs';
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
  __name: "LayoutCheckoutHeader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountMenu = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-white" }, _attrs))}><div class="mx-auto px-4 sm:px-6"><div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"><div class="flex justify-start lg:w-0 lg:flex-1 space-x-4 md:space-x-0">`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sr-only"${_scopeId}>Shopware</span><img class="h-8 w-auto sm:h-10"${ssrRenderAttr("src", _imports_0)} alt="Logo"${_scopeId}>`);
          } else {
            return [
              createVNode("span", { class: "sr-only" }, "Shopware"),
              createVNode("img", {
                class: "h-8 w-auto sm:h-10",
                src: _imports_0,
                alt: "Logo"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AccountMenu, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutCheckoutHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutCheckoutHeader-6607128f.mjs.map
