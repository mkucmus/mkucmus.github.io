import { _ as __nuxt_component_0 } from './client-only-67b331e0.mjs';
import { K as useNavigation, L as onClickOutside } from '../server.mjs';
import { defineComponent, inject, ref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "LayoutSideMenu",
  __ssrInlineRender: true,
  setup(__props) {
    useNavigation();
    const isSideMenuOpened = inject("isSideMenuOpened", ref(false));
    ref([]);
    const sideMenuElement = ref(null);
    onClickOutside(sideMenuElement, () => isSideMenuOpened.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0;
      _push(`<!--[--><button class="lg:hidden" aria-label="menu"><div class="i-carbon-menu text-xl"></div></button>`);
      _push(ssrRenderComponent(_component_client_only, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutSideMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutSideMenu-b0d05e82.mjs.map
