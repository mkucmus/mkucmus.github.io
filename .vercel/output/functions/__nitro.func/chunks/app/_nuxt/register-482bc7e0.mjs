import { a2 as useSalutations, a1 as useCountries, z as useUser, p as useNotifications, f as useRouter, b as useBreadcrumbs } from '../server.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useVuelidate } from '../../index.esm.mjs';
import { required, minLength, email } from '@vuelidate/validators';
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
  name: "RegisterPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const { getSalutations } = useSalutations();
    const { getCountries } = useCountries();
    useUser();
    useNotifications();
    useRouter();
    const loading = ref();
    const state = reactive({
      salutationId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      billingAddress: {
        street: "",
        zipcode: "",
        city: "",
        countryId: ""
      }
    });
    const rules = computed(() => ({
      salutationId: {
        required
      },
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      billingAddress: {
        street: {
          required,
          minLength: minLength(3)
        },
        zipcode: {
          required
        },
        city: {
          required
        },
        countryId: {
          required
        }
      }
    }));
    const $v = useVuelidate(rules, state);
    useBreadcrumbs([
      {
        name: "Register",
        path: "/register"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-screen-xl mx-auto px-6 sm:px-4" }, _attrs))}><form class="w-full relative" data-testid="registration-form"><h3 class="block border-b-1 mb-5 pb-2 font-bold">I am new here.</h3><div class="grid grid-cols-12 gap-5 mb-10"><div class="col-span-12"><label for="salutation">Salutation *</label><select id="salutation" name="salutation"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="${ssrRenderClass([[
        unref($v).salutationId.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" data-testid="registration-salutation-select"><option disabled selected value="">Choose salutation...</option><!--[-->`);
      ssrRenderList(unref(getSalutations), (salutation) => {
        _push(`<option${ssrRenderAttr("value", salutation.id)}>${ssrInterpolate(salutation.displayName)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref($v).salutationId.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).salutationId.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-12 md:col-span-4"><label for="first-name">First name *</label><input id="first-name"${ssrRenderAttr("value", unref(state).firstName)} name="first-name" type="text" autocomplete="first-name" class="${ssrRenderClass([[
        unref($v).firstName.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter first name..."${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-first-name-input">`);
      if (unref($v).firstName.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).firstName.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-12 md:col-span-4"><label for="last-name">Last name *</label><input id="last-name"${ssrRenderAttr("value", unref(state).lastName)} name="last-name" type="text" autocomplete="last-name" class="${ssrRenderClass([[
        unref($v).lastName.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter last name..."${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-last-name-input">`);
      if (unref($v).lastName.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).lastName.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-12 md:col-span-6"><label for="email-address">Email address *</label><input id="email-address"${ssrRenderAttr("value", unref(state).email)} name="email" type="email" autocomplete="email" class="${ssrRenderClass([[
        unref($v).email.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter email address..."${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-email-input">`);
      if (unref($v).email.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).email.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-12 md:col-span-4"><label for="password">Password *</label><input id="password"${ssrRenderAttr("value", unref(state).password)} name="password" type="password" autocomplete="password" class="${ssrRenderClass([[
        unref($v).password.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter password..."${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-password-input">`);
      if (unref($v).password.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).password.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><h3 class="block border-b-1 mb-5 pb-2 font-bold">Your address</h3><div class="grid grid-cols-12 gap-5 mb-10"><div class="col-span-12 md:col-span-4"><label for="street">Street *</label><input id="Street"${ssrRenderAttr("value", unref(state).billingAddress.street)} name="Street" type="text" autocomplete="Street" class="${ssrRenderClass([[
        unref($v).billingAddress.street.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter street..."${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-street-input">`);
      if (unref($v).billingAddress.street.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).billingAddress.street.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-12 md:col-span-4"><label for="zipcode">Zipcode *</label><input id="zipcode"${ssrRenderAttr("value", unref(state).billingAddress.zipcode)} name="zipcode" type="text" autocomplete="zipcode" class="${ssrRenderClass([[
        unref($v).billingAddress.zipcode.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter zip code..."${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-zipcode-input">`);
      if (unref($v).billingAddress.zipcode.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).billingAddress.zipcode.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-12 md:col-span-4"><label for="city">City *</label><input id="city"${ssrRenderAttr("value", unref(state).billingAddress.city)} name="city" type="text" autocomplete="city" class="${ssrRenderClass([[
        unref($v).billingAddress.city.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter city..."${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-city-input">`);
      if (unref($v).billingAddress.city.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).billingAddress.city.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-12 md:col-span-4"><label for="country">Country *</label><select id="country" name="country" class="${ssrRenderClass([[
        unref($v).billingAddress.countryId.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
      ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-country-select"><option disabled selected value="">Choose country...</option><!--[-->`);
      ssrRenderList(unref(getCountries), (country) => {
        _push(`<option${ssrRenderAttr("value", country.id)}>${ssrInterpolate(country.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref($v).salutationId.$error) {
        _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).salutationId.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-5 text-right"><button class="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-75 w-full md:w-auto" type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-testid="registration-submit-button"> Submit </button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-482bc7e0.mjs.map
