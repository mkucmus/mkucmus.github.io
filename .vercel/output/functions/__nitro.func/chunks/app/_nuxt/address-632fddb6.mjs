import _sfc_main$1 from './AccountAddressCard-3e3f1e4a.mjs';
import { defineComponent, ref, inject, mergeProps, unref, useSSRContext } from 'vue';
import { a1 as useCountries, a2 as useSalutations, y as useAddress, b as useBreadcrumbs } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
  name: "AccountAddressPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const loadingData = ref(true);
    inject("modal");
    const { getCountries } = useCountries();
    const { getSalutations } = useSalutations();
    const { customerAddresses, loadCustomerAddresses } = useAddress();
    useBreadcrumbs([
      {
        name: "Account Overview",
        path: "/account"
      },
      {
        name: "Address",
        path: "/account/address"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountAddressCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto my-8" }, _attrs))}><div class="contents text-2xl font-medium text-gray-900"><h1 class="border-b pb-3">Addresses</h1></div><p class="text-sm text-gray-500 mt-3"> View your current default addresses or add new ones. </p><div class="grid grid-cols-6 gap-12 mt-8">`);
      if (unref(loadingData)) {
        _push(`<div class="col-span-6 lg:col-span-3 max-w-md"><div class="flex mb-2 space-x-2"><div class="w-36 bg-gray-300 h-6 rounded-md"></div><div class="w-6 bg-gray-300 h-6 rounded-md"></div></div><div class="w-36 bg-gray-300 h-4 rounded-md mb-2"></div><div class="w-36 bg-gray-300 h-4 rounded-md mb-2"></div><div class="w-36 bg-gray-300 h-4 rounded-md"></div></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(customerAddresses), (address) => {
          _push(ssrRenderComponent(_component_AccountAddressCard, {
            key: address.id,
            "can-delete": true,
            address,
            countries: unref(getCountries),
            salutations: unref(getSalutations)
          }, null, _parent));
        });
        _push(`<!--]-->`);
      }
      _push(`</div><button class="group relative justify-center py-2 px-4 my-8 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-light" type="submit"> Add new address </button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/address.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=address-632fddb6.mjs.map
