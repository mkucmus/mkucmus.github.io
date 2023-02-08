import { z as useUser } from '../server.mjs';
import { defineComponent, ref, reactive, computed, toRefs, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useVuelidate } from '../../index.esm.mjs';
import { required, email, sameAs, requiredIf, minLength } from '@vuelidate/validators';
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
  __name: "AccountPersonalData",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, refreshUser, updatePersonalInfo, updateEmail } = useUser();
    const errorMessages = ref([]);
    const isSuccess = ref(false);
    ref(false);
    ref(false);
    const state = reactive({
      firstName: "",
      lastName: "",
      email: "",
      emailConfirmation: "",
      password: "",
      salutationId: "",
      title: ""
    });
    const isEmailChanging = computed(() => {
      var _a;
      return state.email !== ((_a = user.value) == null ? void 0 : _a.email);
    });
    computed(
      () => {
        var _a, _b;
        return state.firstName !== ((_a = user.value) == null ? void 0 : _a.firstName) || state.lastName !== ((_b = user.value) == null ? void 0 : _b.lastName);
      }
    );
    const refs = toRefs(state);
    const emailConfirmationValidationRule = computed(
      () => isEmailChanging.value ? {
        required,
        email,
        sameAsEmail: sameAs(refs.email)
      } : {}
    );
    const rules = computed(() => ({
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        email,
        required
      },
      emailConfirmation: emailConfirmationValidationRule.value,
      password: {
        required: requiredIf(() => {
          return isEmailChanging.value;
        }),
        minLength: minLength(8)
      }
    }));
    const $v = useVuelidate(rules, state);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-sm text-gray-500"><div> Feel free to edit any of your details below so your account is always up to date </div></div><form class="mt-8 space-y-6">`);
      if (unref(isSuccess)) {
        _push(`<div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert"><span class="font-medium">Your information has been updated.</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessages).length) {
        _push(`<div class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref(errorMessages))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-4 space-y-4 lg:mt-5 md:space-y-5"><div><label for="firstname" class="block mb-2 text-sm font-medium text-gray-500"> First name </label><input id="firstname"${ssrRenderAttr("value", unref(state).firstName)} name="firstname" type="text" autocomplete="firstname" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Enter first name...">`);
      if (unref($v).firstName.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).firstName.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="lastname" class="block mb-2 text-sm font-medium text-gray-500"> Last name </label><input id="lastname"${ssrRenderAttr("value", unref(state).lastName)} name="lastname" type="text" autocomplete="lastname" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Enter last name...">`);
      if (unref($v).lastName.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).lastName.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="email" class="block mb-2 text-sm font-medium text-gray-500"> Your email </label><input id="email"${ssrRenderAttr("value", unref(state).email)} name="email" type="email" autocomplete="email" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Enter the email...">`);
      if (unref($v).email.$error) {
        _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).email.$errors[0].$message)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isEmailChanging)) {
        _push(`<div><label for="email-confirm" class="block mb-2 text-sm font-medium text-gray-500"> Confirm e-mail </label><input id="email-confirm"${ssrRenderAttr("value", unref(state).emailConfirmation)} name="email-confirm" type="email" autocomplete="email-confirm" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Enter the email...">`);
        if (unref($v).emailConfirmation.$error) {
          _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).emailConfirmation.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isEmailChanging)) {
        _push(`<div><label for="password" class="block mb-2 text-sm font-medium text-gray-500"> Your password </label><input id="password"${ssrRenderAttr("value", unref(state).password)} name="password" type="password" autocomplete="password" required class="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022">`);
        if (unref($v).password.$error) {
          _push(`<span class="text-red-600 focus:ring-brand-primary border-gray-300 rounded">${ssrInterpolate(unref($v).password.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><button class="group relative w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary" type="submit"> Save changes </button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountPersonalData.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountPersonalData-1d614788.mjs.map
