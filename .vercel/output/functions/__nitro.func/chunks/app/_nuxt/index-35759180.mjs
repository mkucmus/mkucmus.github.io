import _sfc_main$1 from './AccountAddressCard-3e3f1e4a.mjs';
import { defineComponent, ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { a1 as useCountries, a2 as useSalutations, z as useUser, a3 as useNewsletter, p as useNotifications, b as useBreadcrumbs } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from 'vue/server-renderer';
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
  name: "AccountPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const newsletter = ref(false);
    const { getCountries } = useCountries();
    const { getSalutations } = useSalutations();
    const {
      user,
      loadSalutation,
      userDefaultPaymentMethod,
      userDefaultBillingAddress,
      userDefaultShippingAddress
    } = useUser();
    const { isNewsletterSubscriber, newsletterSubscribe } = useNewsletter();
    useNotifications();
    useBreadcrumbs([
      {
        name: "Account Overview",
        path: "/account"
      }
    ]);
    newsletter.value = ([__temp, __restore] = withAsyncContext(() => isNewsletterSubscriber()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_AccountAddressCard = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="container mx-auto my-6"><h1 class="text-2xl mb-10">Account Overview</h1></div><section class="flex gap-10 mb-10"><div class="w-1/2 flex flex-col"><h3 class="border-b pb-3 font-bold mb-3">Your profile</h3><p>${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.firstName)} ${ssrInterpolate((_b = unref(user)) == null ? void 0 : _b.lastName)}</p><p>${ssrInterpolate((_c = unref(user)) == null ? void 0 : _c.email)}</p><div class="mt-5"><button class="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary mt-auto" data-testid="my-account-change-profile-button"> Change </button></div></div><div class="w-1/2 flex flex-col"><h3 class="border-b pb-3 font-bold mb-3">Payment Method</h3><p class="font-medium">${ssrInterpolate((_d = unref(userDefaultPaymentMethod)) == null ? void 0 : _d.name)}</p><p>${ssrInterpolate((_e = unref(userDefaultPaymentMethod)) == null ? void 0 : _e.description)}</p><div class="mt-5"><button class="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary mt-auto" data-testid="my-account-change-payment-method-button"> Change </button></div></div></section><section class="mb-10"><h3 class="border-b pb-3 font-bold mb-5">Newsletter setting</h3><div class="flex"><input id="newsletter-checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(newsletter)) ? ssrLooseContain(unref(newsletter), null) : unref(newsletter)) ? " checked" : ""} name="newsletter-checkbox" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"><label for="newsletter-checkbox" class="pl-5 text-base mt--1"> Yes, I would like to subscribe to the free Demostore newsletter. (I may unsubscribe at any time.) </label></div></section><section class="flex gap-10 mb-10"><div class="w-1/2 flex flex-col"><h3 class="border-b pb-3 font-bold mb-3">Default billing address</h3>`);
      if ((_f = unref(userDefaultBillingAddress)) == null ? void 0 : _f.id) {
        _push(ssrRenderComponent(_component_AccountAddressCard, {
          key: unref(userDefaultBillingAddress).id,
          address: unref(userDefaultBillingAddress),
          countries: unref(getCountries),
          salutations: unref(getSalutations),
          "can-set-default": false,
          "can-edit": false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-5"><button class="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary mt-auto" data-testid="my-account-change-default-billing-address-button"> Change </button></div></div><div class="w-1/2 flex flex-col"><h3 class="border-b pb-3 font-bold mb-3">Default shipping address</h3>`);
      if ((_g = unref(userDefaultShippingAddress)) == null ? void 0 : _g.id) {
        _push(ssrRenderComponent(_component_AccountAddressCard, {
          key: unref(userDefaultShippingAddress).id,
          address: unref(userDefaultShippingAddress),
          countries: unref(getCountries),
          salutations: unref(getSalutations),
          "can-set-default": false,
          "can-edit": false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-5"><button class="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary mt-auto" data-testid="my-account-change-default-shipping-address-button"> Change </button></div></div></section></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-35759180.mjs.map
