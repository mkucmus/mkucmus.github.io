import _sfc_main$1 from './AccountRecoverPassword-380a525c.mjs';
import { b as useBreadcrumbs, _ as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, mergeProps, withCtx, createTextVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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

const _sfc_main = {
  name: "RecoverPassword"
};
useBreadcrumbs([
  {
    name: "Account Overview",
    path: "/account"
  },
  {
    name: "Recover password",
    path: "/account/recover"
  }
]);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AccountRecoverPassword = _sfc_main$1;
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "recover-wrapper" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AccountRecoverPassword, null, {
    action: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="text-center space-y-2"${_scopeId}><p class="py-2 px-4 text-lg text-brand-primary"${_scopeId}> Don&#39;t have an account yet? </p>`);
        _push2(ssrRenderComponent(_component_nuxt_link, {
          to: "/register",
          class: "text-sm font-medium px-4 text-gray-600 focus:outline-none underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Register today! `);
            } else {
              return [
                createTextVNode(" Register today! ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_nuxt_link, {
          to: "/login",
          class: "flex justify-center align-center text-sm font-medium text-gray-600 py-2 px-4 focus:outline-none underline"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` or try to log in again. `);
            } else {
              return [
                createTextVNode(" or try to log in again. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "text-center space-y-2" }, [
            createVNode("p", { class: "py-2 px-4 text-lg text-brand-primary" }, " Don't have an account yet? "),
            createVNode(_component_nuxt_link, {
              to: "/register",
              class: "text-sm font-medium px-4 text-gray-600 focus:outline-none underline"
            }, {
              default: withCtx(() => [
                createTextVNode(" Register today! ")
              ]),
              _: 1
            }),
            createVNode(_component_nuxt_link, {
              to: "/login",
              class: "flex justify-center align-center text-sm font-medium text-gray-600 py-2 px-4 focus:outline-none underline"
            }, {
              default: withCtx(() => [
                createTextVNode(" or try to log in again. ")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/recover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const recover = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { recover as default };
//# sourceMappingURL=recover-34db9b78.mjs.map
