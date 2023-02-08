import _sfc_main$1 from './AccountLoginForm-0c3ad2b5.mjs';
import { f as useRouter, z as useUser, b as useBreadcrumbs, _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import './logo-7a0b579f.mjs';
import '../../paths.mjs';
import 'ufo';
import '../../nitro/config.mjs';
import 'destr';
import 'scule';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'cookie-es';
import 'ohash';
import 'axios';
import 'query-string';
import 'defu';

const __default__ = {
  name: "LoginPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const { push } = useRouter();
    useUser();
    const navigateTo = (path = "/") => push(path);
    useBreadcrumbs([
      {
        name: "Login",
        path: "/login"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountLoginForm = _sfc_main$1;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-wrapper" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AccountLoginForm, {
        onSuccess: ($event) => navigateTo("/")
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/register",
              class: "w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign up `);
                } else {
                  return [
                    createTextVNode(" Sign up ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_nuxt_link, {
                to: "/register",
                class: "w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Sign up ")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-end"${_scopeId}><div class="text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/account/recover",
              class: "font-medium text-indigo-600 hover:text-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Forgot your password? `);
                } else {
                  return [
                    createTextVNode(" Forgot your password? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-end" }, [
                createVNode("div", { class: "text-sm" }, [
                  createVNode(_component_nuxt_link, {
                    to: "/account/recover",
                    class: "font-medium text-indigo-600 hover:text-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Forgot your password? ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-cd3fe1a0.mjs.map
