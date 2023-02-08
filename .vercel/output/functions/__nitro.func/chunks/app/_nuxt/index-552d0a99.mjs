import _sfc_main$1 from './AccountAddressCard-3e3f1e4a.mjs';
import _sfc_main$2 from './CheckoutCartItem-360d615a.mjs';
import _sfc_main$3 from './SharedPrice-64255154.mjs';
import { f as useRouter, a1 as useCountries, a2 as useSalutations, a5 as useCheckout, z as useUser, A as useSessionContext, J as useCart, y as useAddress, _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, inject, reactive, computed, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from 'vue/server-renderer';
import { u as useVuelidate } from '../../index.esm.mjs';
import { required, minLength, email, requiredIf } from '@vuelidate/validators';
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
  name: "CheckoutPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { getCountries } = useCountries();
    const { getSalutations } = useSalutations();
    const {
      paymentMethods,
      shippingMethods,
      getPaymentMethods,
      getShippingMethods,
      createOrder
    } = useCheckout();
    const { register, logout, isLoggedIn, isGuestSession, user } = useUser();
    const {
      refreshSessionContext,
      selectedShippingMethod: shippingMethod,
      selectedPaymentMethod: paymentMethod,
      setShippingMethod,
      setPaymentMethod,
      activeShippingAddress,
      setActiveShippingAddress,
      activeBillingAddress,
      setActiveBillingAddress
    } = useSessionContext();
    const { cart, cartItems, subtotal, totalPrice, shippingTotal } = useCart();
    const { customerAddresses, loadCustomerAddresses } = useAddress();
    inject("modal");
    const isLoading = reactive({});
    const selectedShippingMethod = computed({
      get() {
        var _a;
        return ((_a = shippingMethod.value) == null ? void 0 : _a.id) || "";
      },
      async set(shippingMethodId) {
        isLoading[shippingMethodId] = true;
        await setShippingMethod({ id: shippingMethodId });
        isLoading[shippingMethodId] = false;
      }
    });
    const selectedPaymentMethod = computed({
      get() {
        var _a;
        return ((_a = paymentMethod.value) == null ? void 0 : _a.id) || "";
      },
      async set(paymentMethodId) {
        isLoading[paymentMethodId] = true;
        await setPaymentMethod({ id: paymentMethodId });
        isLoading[paymentMethodId] = false;
      }
    });
    const selectedShippingAddress = computed({
      get() {
        var _a;
        return ((_a = activeShippingAddress.value) == null ? void 0 : _a.id) || "";
      },
      async set(shippingAddressId) {
        isLoading[`shipping-${shippingAddressId}`] = true;
        await setActiveShippingAddress({ id: shippingAddressId });
        if (shippingAddressId === selectedBillingAddress.value)
          state.customShipping = false;
        isLoading[`shipping-${shippingAddressId}`] = false;
      }
    });
    const selectedBillingAddress = computed({
      get() {
        var _a;
        return ((_a = activeBillingAddress.value) == null ? void 0 : _a.id) || "";
      },
      async set(billingAddressId) {
        isLoading[`billing-${billingAddressId}`] = true;
        await setActiveBillingAddress({ id: billingAddressId });
        if (billingAddressId === selectedShippingAddress.value)
          state.customShipping = false;
        isLoading[`billing-${billingAddressId}`] = false;
      }
    });
    const isCartLoading = computed(() => {
      return !cart.value;
    });
    const isCheckoutAvailable = computed(() => {
      return cartItems.value.length > 0;
    });
    const isUserSession = computed(() => isLoggedIn.value || isGuestSession.value);
    const state = reactive({
      salutationId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      guest: false,
      billingAddress: {
        street: "",
        zipcode: "",
        city: "",
        countryId: ""
      },
      customShipping: false
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
        required: requiredIf(() => {
          return !state.guest;
        }),
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
    const registerErrors = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_AccountAddressCard = _sfc_main$1;
      const _component_CheckoutCartItem = _sfc_main$2;
      const _component_SharedPrice = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "m-10" }, _attrs))}>`);
      if (unref(isCheckoutAvailable) || unref(isCartLoading)) {
        _push(`<div class="${ssrRenderClass([{
          "opacity-20": unref(isCartLoading)
        }, "checkout-inner"])}"><div class="md:grid md:grid-cols-2 md:gap-6"><div class="md:col-span-1"><div class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6 mb-8"><div><h3 class="text-lg font-medium text-gray-900 m-0"> Personal Information </h3><div class="text-sm text-gray-600"> Use a permanent address where you can receive mail. </div></div>`);
        if (!unref(isUserSession)) {
          _push(`<form id="checkout-billing-address" class="grid gap-8" name="checkout-billing-address" method="post">`);
          if (unref(registerErrors).length) {
            _push(`<div class="bg-red-200 border-l-4 border-red-500 text-red-700 p-4" role="alert"><p class="font-bold">Error!!!</p><ul><!--[-->`);
            ssrRenderList(unref(registerErrors), (error) => {
              _push(`<li>${ssrInterpolate(error.detail)}</li>`);
            });
            _push(`<!--]--></ul></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-sm"> Register or <a href="#" class="whitespace-nowrap font-medium text-brand-primary hover:text-brand-dark" data-testid="checkout-sign-in-link"> Sign in </a><p class="text-gray-500">In order to place an order.</p></div><div class="grid grid-cols-6 gap-6"><div class="col-span-6"><label for="salutation" class="block text-sm font-medium text-gray-700">Salutation</label><select id="salutation" required name="salutation" autocomplete="salutation-name" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-salutation-select"><option disabled selected value=""> Choose salutation... </option><!--[-->`);
          ssrRenderList(unref(getSalutations), (salutation) => {
            _push(`<option${ssrRenderAttr("value", salutation.id)}>${ssrInterpolate(salutation.displayName)}</option>`);
          });
          _push(`<!--]--></select>`);
          if (unref($v).salutationId.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).salutationId.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6 sm:col-span-3"><label for="first-name" class="block text-sm font-medium text-gray-700">First name</label><input id="first-name"${ssrRenderAttr("value", unref(state).firstName)} type="text" required name="first-name" placeholder="Enter first name..." class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-first-name-input">`);
          if (unref($v).firstName.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).firstName.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6 sm:col-span-3"><label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label><input id="last-name"${ssrRenderAttr("value", unref(state).lastName)} type="text" required name="last-name" placeholder="Enter last name..." class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-last-name-input">`);
          if (unref($v).lastName.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).lastName.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6"><div class="flex items-center"><input id="create-account"${ssrIncludeBooleanAttr(Array.isArray(unref(state).guest) ? ssrLooseContain(unref(state).guest, null) : unref(state).guest) ? " checked" : ""} type="checkbox" data-testid="checkout-create-account-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"><label for="create-account" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Do not create a customer account.</label></div></div><div class="col-span-6 sm:col-span-3"><label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label><input id="email-address"${ssrRenderAttr("value", unref(state).email)} type="email" required name="email-address" placeholder="Enter email address..." autocomplete="off" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-email-input">`);
          if (unref($v).email.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).email.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6 sm:col-span-3">`);
          if (!unref(state).guest) {
            _push(`<div><label for="password" class="block text-sm font-medium text-gray-700">Password</label><input id="password"${ssrRenderAttr("value", unref(state).password)} autocomplete="off" type="password" name="password" placeholder="Enter password..." class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light">`);
            if (unref($v).password.$error) {
              _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).password.$errors[0].$message)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6"><label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label><input id="street-address"${ssrRenderAttr("value", unref(state).billingAddress.street)} type="text" required name="street-address" placeholder="Enter street..." autocomplete="street-address" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-street-address-input">`);
          if (unref($v).billingAddress.street.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).billingAddress.street.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6 sm:col-span-3"><label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label><input id="postal-code"${ssrRenderAttr("value", unref(state).billingAddress.zipcode)} type="text" required name="postal-code" placeholder="Enter zip code..." autocomplete="postal-code" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-zip-code-input">`);
          if (unref($v).billingAddress.zipcode.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).billingAddress.zipcode.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6 sm:col-span-3"><label for="city" class="block text-sm font-medium text-gray-700">City</label><input id="city"${ssrRenderAttr("value", unref(state).billingAddress.city)} type="text" required name="city" placeholder="Enter city..." autocomplete="address-level2" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-city-input">`);
          if (unref($v).billingAddress.city.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).billingAddress.city.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="col-span-6"><label for="country" class="block text-sm font-medium text-gray-700">Country</label><select id="country" required name="country" autocomplete="country-name" class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light" data-testid="checkout-pi-country-input"><option disabled selected value=""> Choose country... </option><!--[-->`);
          ssrRenderList(unref(getCountries), (country) => {
            _push(`<option${ssrRenderAttr("value", country.id)}>${ssrInterpolate(country.name)}</option>`);
          });
          _push(`<!--]--></select>`);
          if (unref($v).billingAddress.countryId.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).billingAddress.countryId.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><button type="submit" class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary" data-testid="checkout-pi-submit-button"> Save </button></form>`);
        } else {
          _push(`<div> You are logged-in as ${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.firstName)} `);
          if (unref(isGuestSession)) {
            _push(`<span class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">guest</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`! You can log out <a href="#" class="text-brand-primary hover:text-brand-dark" data-testid="checkout-logout">here</a>. </div>`);
        }
        _push(`</div><fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6 mb-8"><legend class="pt-5"><h3 class="text-lg font-medium text-gray-900 m-0"> Shipping method </h3><div class="text-sm text-gray-600">Select a payment method.</div></legend>`);
        if (unref(isLoading)["shippingMethods"]) {
          _push(`<div class="w-60 h-24"><div class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"><div class="w-4 bg-gray-300 h-4 mt-1 rounded-full"></div><div class="flex flex-col space-y-3"><div class="w-36 bg-gray-300 h-6 rounded-md"></div><div class="w-24 bg-gray-300 h-6 rounded-md"></div></div></div></div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(shippingMethods), (singleShippingMethod) => {
            _push(`<div class="flex items-center"><input${ssrRenderAttr("id", singleShippingMethod.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedShippingMethod), singleShippingMethod.id)) ? " checked" : ""}${ssrRenderAttr("value", singleShippingMethod.id)} name="shipping-method" type="radio" class="focus:ring-brand-primary h-4 w-4 border-gray-300"${ssrRenderAttr("data-testid", `checkout-shipping-method-${singleShippingMethod.id}`)}><label${ssrRenderAttr("for", singleShippingMethod.id)} class="${ssrRenderClass([{ "animate-pulse": unref(isLoading)[singleShippingMethod.id] }, "ml-2 block text-sm font-medium text-gray-700"])}">${ssrInterpolate(singleShippingMethod.name)}</label></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</fieldset><fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6"><legend class="pt-5"><h3 class="text-lg font-medium text-gray-900 m-0"> Payment method </h3><div class="text-sm text-gray-600">Select a payment method</div></legend>`);
        if (unref(isLoading)["paymentMethods"]) {
          _push(`<div class="w-60 h-24"><div class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"><div class="w-4 bg-gray-300 h-4 mt-1 rounded-full"></div><div class="flex flex-col space-y-3"><div class="w-36 bg-gray-300 h-6 rounded-md"></div><div class="w-24 bg-gray-300 h-6 rounded-md"></div></div></div></div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(paymentMethods), (singlePaymentMethod) => {
            _push(`<div class="flex items-center"><input${ssrRenderAttr("id", singlePaymentMethod.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedPaymentMethod), singlePaymentMethod.id)) ? " checked" : ""}${ssrRenderAttr("value", singlePaymentMethod.id)} name="payment-method" type="radio" class="focus:ring-brand-primary h-4 w-4 border-gray-300"${ssrRenderAttr("data-testid", `checkout-payment-method-${singlePaymentMethod.id}`)}><label${ssrRenderAttr("for", singlePaymentMethod.id)} class="${ssrRenderClass([{ "animate-pulse": unref(isLoading)[singlePaymentMethod.id] }, "ml-2 block text-sm font-medium text-gray-700"])}">${ssrInterpolate(singlePaymentMethod.name)}</label></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</fieldset>`);
        if (unref(isLoggedIn)) {
          _push(`<fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6"><legend class="pt-5"><h3 class="text-lg font-medium text-gray-900 m-0"> Billing Address </h3><div class="text-sm text-gray-600">Select a billing address</div></legend>`);
          if (unref(isLoading)["paymentMethods"]) {
            _push(`<div class="w-60 h-24"><div class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"><div class="w-4 bg-gray-300 h-4 mt-1 rounded-full"></div><div class="flex flex-col space-y-3"><div class="w-36 bg-gray-300 h-6 rounded-md"></div><div class="w-24 bg-gray-300 h-6 rounded-md"></div></div></div></div>`);
          } else {
            _push(`<!--[-->`);
            ssrRenderList(unref(customerAddresses), (address) => {
              _push(`<div class="flex mb-3"><input${ssrRenderAttr("id", `billing-${address.id}`)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedBillingAddress), address.id)) ? " checked" : ""}${ssrRenderAttr("value", address.id)} name="billing-address" type="radio" class="focus:ring-brand-primary h-4 w-4 border-gray-300"${ssrRenderAttr("data-testid", `checkout-billing-address-${address.id}`)}><label${ssrRenderAttr("for", `billing-${address.id}`)} class="${ssrRenderClass([{ "animate-pulse": unref(isLoading)[`billing-${address.id}`] }, "ml-2 field-label"])}">`);
              _push(ssrRenderComponent(_component_AccountAddressCard, {
                key: address.id,
                address,
                countries: unref(getCountries),
                salutations: unref(getSalutations),
                "can-set-default": false
              }, null, _parent));
              _push(`</label></div>`);
            });
            _push(`<!--]-->`);
          }
          _push(`<button type="button" class="flex font-medium text-brand-dark"> Add new billing address </button><label for="customShipping" class="field-label"><input id="customShipping"${ssrIncludeBooleanAttr(Array.isArray(unref(state).customShipping) ? ssrLooseContain(unref(state).customShipping, null) : unref(state).customShipping) ? " checked" : ""} name="privacy" type="checkbox" class="mt-1 focus:ring-indigo-500 h-4 w-4 border text-indigo-600 rounded"> Different shipping address </label>`);
          if (unref(state).customShipping) {
            _push(`<div><!--[-->`);
            ssrRenderList(unref(customerAddresses), (address) => {
              _push(`<div class="flex mb-3"><input${ssrRenderAttr("id", `shipping-${address.id}`)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedShippingAddress), address.id)) ? " checked" : ""}${ssrRenderAttr("value", address.id)} name="shipping-address" type="radio" class="focus:ring-brand-primary h-4 w-4 border-gray-300"${ssrRenderAttr("data-testid", `checkout-shipping-address-${address.id}`)}><label${ssrRenderAttr("for", `shipping-${address.id}`)} class="${ssrRenderClass([{
                "animate-pulse": unref(isLoading)[`shipping-${address.id}`]
              }, "ml-2 field-label"])}">`);
              _push(ssrRenderComponent(_component_AccountAddressCard, {
                key: address.id,
                address,
                countries: unref(getCountries),
                salutations: unref(getSalutations),
                "can-set-default": false
              }, null, _parent));
              _push(`</label></div>`);
            });
            _push(`<!--]--><button type="button" class="flex font-medium text-brand-dark"> Add new shipping address </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</fieldset>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mt-5 md:mt-0 md:col-span-1"><div class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6"><div><h3 class="text-lg font-medium text-gray-900 m-0"> Order summary </h3><p class="text-sm text-gray-600">Order details and totals.</p></div><ul role="list" class="-my-4 divide-y divide-gray-200 pl-0"><!--[-->`);
        ssrRenderList(unref(cartItems), (cartItem) => {
          _push(`<li class="flex py-6">`);
          _push(ssrRenderComponent(_component_CheckoutCartItem, { "cart-item": cartItem }, null, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul><div class="flex justify-between text-sm text-gray-500"><p>Subtotal</p>`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: unref(subtotal),
          class: "text-gray-900 font-medium",
          "data-testid": "cart-subtotal"
        }, null, _parent));
        _push(`</div><div class="flex pb-4 border-b justify-between text-sm text-gray-500"><p>Shipping estimate</p>`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: unref(shippingTotal),
          class: "text-gray-900 font-medium",
          "data-testid": "cart-subtotal"
        }, null, _parent));
        _push(`</div><div class="flex justify-between text-gray-900 font-medium"><p>Order total</p>`);
        _push(ssrRenderComponent(_component_SharedPrice, {
          value: unref(totalPrice),
          "data-testid": "cart-subtotal"
        }, null, _parent));
        _push(`</div><div class="mt-4"><div class="text-right">`);
        if (!unref(isUserSession)) {
          _push(`<span class="text-sm text-gray-600">You must be logged-in before submitting an order.</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(!unref(isUserSession)) ? " disabled" : ""} type="button" class="${ssrRenderClass([{
          grayscale: !unref(isUserSession),
          "opacity-50 cursor-not-allowed hover:bg-brand-primary": !unref(isUserSession),
          "animate-pulse": unref(isLoading)["placeOrder"]
        }, "w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"])}" data-testid="checkout-place-order-button"> Place the order </button></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="text-center"><h1 class="m-10 text-2xl font-medium text-gray-900"> Your cart is empty! </h1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "inline-flex justify-center py-2 px-4 my-8 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-light",
          to: "/",
          "data-testid": "checkout-go-home-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go to home page `);
            } else {
              return [
                createTextVNode(" Go to home page ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-552d0a99.mjs.map
