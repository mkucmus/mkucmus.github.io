import { z as useUser } from '../server.mjs';
import { defineComponent, ref, inject, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "AccountMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoggedIn, logout, user, refreshUser } = useUser();
    const isAccountMenuOpen = ref(false);
    inject("modal");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-end md:w-auto" }, _attrs))}><div class="my-account-area"><div style="${ssrRenderStyle(!unref(isLoggedIn) ? null : { display: "none" })}"><button class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900" data-testid="header-sign-in-link"> Sign in </button></div>`);
      if (unref(isLoggedIn)) {
        _push(`<div><div class="absolute inset-y-2 right-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"><button type="button" class="text-sm text-gray-700 focus:outline-none" data-testid="account-menu-hello-button"> Hello, ${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.firstName)}! </button><div class="ml-3 relative"><div><button id="user-menu-button" type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true"><span class="sr-only">Open user menu</span></button></div><div class="${ssrRenderClass([[unref(isAccountMenuOpen) ? "block" : "hidden"], "origin-top-right absolute right-0 top-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"])}" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1"><button id="user-menu-item-1" data-testid="header-my-account-link" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" tabindex="-1"> My Account </button><button id="user-menu-item-2" data-testid="header-sing-out-link" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" tabindex="-2"> Sign out </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountMenu-c02e58c5.mjs.map
