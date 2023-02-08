import _sfc_main$1 from './AccountPersonalData-1d614788.mjs';
import _sfc_main$2 from './AccountChangePassword-1f58f74b.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { b as useBreadcrumbs } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import '../../index.esm.mjs';
import '@vuelidate/validators';
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

const __default__ = {
  name: "ProfilePage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const currentTab = ref(1);
    useBreadcrumbs([
      {
        name: "Account Overview",
        path: "/account"
      },
      {
        name: "My profile",
        path: "/account/profile"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountPersonalData = _sfc_main$1;
      const _component_AccountChangePassword = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto my-8" }, _attrs))}><div class="mb-4 border-b border-gray-200"><ul id="myTab" class="flex flex-wrap -mb-px font-medium md:text-2xl md:space-x-8" data-tabs-toggle="#profileTabContent" role="tablist"><li class="w-1/2 md:w-auto" role="presentation"><a class="${ssrRenderClass([[
        unref(currentTab) !== 1 ? "text-gray-900" : "text-brand-primary border-b-2 border-brand-primary"
      ], "inline-block pb-3 rounded-t-lg hover:text-brand-primary"])}"> Personal data </a></li><li class="w-1/2 md:w-auto" role="presentation"><a class="${ssrRenderClass([[
        unref(currentTab) !== 2 ? "text-gray-900" : "text-brand-primary border-b-2 border-brand-primary"
      ], "inline-block pb-3 rounded-t-lg hover:text-brand-primary"])}"> Change password </a></li></ul></div><div class="relative flex flex-col min-w-0 break-words w-full mb-6"><div class="py-5 flex-auto"><div class="${ssrRenderClass([
        "cms-block-product-description-reviews__description",
        unref(currentTab) !== 1 ? "hidden" : "block"
      ])}">`);
      _push(ssrRenderComponent(_component_AccountPersonalData, null, null, _parent));
      _push(`</div><div class="${ssrRenderClass([
        "cms-block-product-description-reviews__reviews",
        unref(currentTab) !== 2 ? "hidden" : "block"
      ])}">`);
      _push(ssrRenderComponent(_component_AccountChangePassword, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-e88bf441.mjs.map
