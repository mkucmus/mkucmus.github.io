import { y as useAddress } from '../server.mjs';
import { defineComponent, inject, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "AccountAddressForm",
  __ssrInlineRender: true,
  props: {
    address: { default: void 0 },
    countries: null,
    salutations: null,
    title: { default: "Account address" }
  },
  emits: ["success", "close"],
  setup(__props, { emit: emits }) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const props = __props;
    useAddress();
    inject("modal");
    const formData = reactive({
      countryId: (_a2 = (_a = props.address) == null ? void 0 : _a.countryId) != null ? _a2 : "",
      salutationId: (_b2 = (_b = props.address) == null ? void 0 : _b.salutationId) != null ? _b2 : "",
      firstName: (_c2 = (_c = props.address) == null ? void 0 : _c.firstName) != null ? _c2 : "",
      lastName: (_d2 = (_d = props.address) == null ? void 0 : _d.lastName) != null ? _d2 : "",
      zipcode: (_e2 = (_e = props.address) == null ? void 0 : _e.zipcode) != null ? _e2 : "",
      city: (_f2 = (_f = props.address) == null ? void 0 : _f.city) != null ? _f2 : "",
      street: (_g2 = (_g = props.address) == null ? void 0 : _g.street) != null ? _g2 : "",
      id: (_h2 = (_h = props.address) == null ? void 0 : _h.id) != null ? _h2 : ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-5 md:mt-0 md:col-span-2" }, _attrs))}><div class="shadow overflow-hidden sm:rounded-md"><form id="account-address" name="account-address" method="post"><div class="px-4 py-5 bg-white sm:p-6"><h3 class="text-2xl border-b pb-3">${ssrInterpolate(props.title)}</h3><div class="grid grid-cols-6 gap-6 mt-8"><div class="col-span-6 sm:col-span-6"><label for="country" class="block mb-2 text-sm font-medium text-gray-500"> Salutation </label><select id="salutation" required name="salutation" autocomplete="salutation-name" class="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-light focus:border-brand-light sm:text-sm"><!--[-->`);
      ssrRenderList(props.salutations, (salutation) => {
        _push(`<option${ssrRenderAttr("value", salutation.id)}>${ssrInterpolate(salutation.displayName)}</option>`);
      });
      _push(`<!--]--></select></div><div class="col-span-6 sm:col-span-3"><label for="first-name" class="block mb-2 text-sm font-medium text-gray-500"> First name </label><input id="first-name"${ssrRenderAttr("value", unref(formData).firstName)} type="text" required name="first-name" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"></div><div class="col-span-6 sm:col-span-3"><label for="last-name" class="block mb-2 text-sm font-medium text-gray-500"> Last name </label><input id="last-name"${ssrRenderAttr("value", unref(formData).lastName)} type="text" required name="last-name" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"></div><div class="col-span-6 sm:col-span-6"><label for="country" class="block mb-2 text-sm font-medium text-gray-500"> Country </label><select id="country" required name="country" autocomplete="country-name" class="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-light focus:border-brand-light sm:text-sm"><!--[-->`);
      ssrRenderList(props.countries, (country) => {
        _push(`<option${ssrRenderAttr("value", country.id)}>${ssrInterpolate(country.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="col-span-6"><label for="street-address" class="block mb-2 text-sm font-medium text-gray-500"> Street address </label><input id="street-address"${ssrRenderAttr("value", unref(formData).street)} type="text" required name="street-address" autocomplete="street-address" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"></div><div class="col-span-6 sm:col-span-6 lg:col-span-4"><label for="city" class="block mb-2 text-sm font-medium text-gray-500"> City </label><input id="city"${ssrRenderAttr("value", unref(formData).city)} type="text" required name="city" autocomplete="address-level2" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"></div><div class="col-span-6 sm:col-span-3 lg:col-span-2"><label for="postal-code" class="block mb-2 text-sm font-medium text-gray-500"> ZIP / Postal code </label><input id="postal-code"${ssrRenderAttr("value", unref(formData).zipcode)} type="text" required name="postal-code" autocomplete="postal-code" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"></div></div></div><div class="px-4 py-3 bg-gray-50 text-right sm:px-6"><button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light"> Save </button></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountAddressForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountAddressForm-3476f6bd.mjs.map
