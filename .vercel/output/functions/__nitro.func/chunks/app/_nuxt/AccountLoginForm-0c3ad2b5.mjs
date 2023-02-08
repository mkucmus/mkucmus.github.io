import { z as useUser, C as useWishlist, p as useNotifications, _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-7a0b579f.mjs';
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
import '../../paths.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountLoginForm",
  __ssrInlineRender: true,
  emits: ["success", "close"],
  setup(__props, { emit: emits }) {
    const { isLoggedIn, login } = useUser();
    useWishlist();
    useNotifications();
    const loginErrors = ref([]);
    const formData = ref({
      username: "",
      password: "",
      remember: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}>`);
      if (!unref(isLoggedIn)) {
        _push(`<div class="max-w-md w-full space-y-8"><div><img class="mx-auto h-12 w-auto"${ssrRenderAttr("src", _imports_0)} alt="Logo"><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Sign in to your account </h2></div><form class="mt-8 space-y-6"><input${ssrRenderAttr("value", unref(formData).remember)} type="hidden" name="remember" data-testid="login-remember-input"><div class="rounded-md shadow-sm -space-y-px"><div><label for="email-address" class="sr-only">Email address</label><input id="email-address"${ssrRenderAttr("value", unref(formData).username)} name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" data-testid="login-email-input"></div><div><label for="password" class="sr-only">Password</label><input id="password"${ssrRenderAttr("value", unref(formData).password)} name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" data-testid="login-password-input"></div></div>`);
        ssrRenderSlot(_ctx.$slots, "default", { data: unref(formData) }, null, _push, _parent);
        ssrRenderSlot(_ctx.$slots, "error", {}, () => {
          if (unref(loginErrors).length) {
            _push(`<div class="flex items-center justify-between" data-testid="login-errors-container"><div class="flex items-center"><div class="login-errors text-red-600 focus:ring-indigo-500 border-gray-300 rounded">${ssrInterpolate(unref(loginErrors))}</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`<div><button class="group relative w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="submit" data-testid="login-submit-button"><span class="absolute left-0 inset-y-0 flex items-center pl-3"><div class="w-5 h-5 i-carbon-locked"></div></span> Sign in </button>`);
        ssrRenderSlot(_ctx.$slots, "action", {}, () => {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: "/register",
            class: "w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            "data-testid": "login-sign-up-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Sign up `);
              } else {
                return [
                  createTextVNode(" Sign up ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }, _push, _parent);
        _push(`</div></form></div>`);
      } else {
        _push(`<div><h2>you are logged in</h2><button>close</button></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountLoginForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountLoginForm-0c3ad2b5.mjs.map
