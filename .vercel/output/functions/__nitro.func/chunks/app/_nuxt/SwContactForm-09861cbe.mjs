import { defineComponent, ref, computed, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { a2 as useSalutations, j as useNavigationContext, h as useShopwareContext, r as useCmsElementConfig } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { u as useVuelidate } from '../../index.esm.mjs';
import { required, email, minLength } from '@vuelidate/validators';
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
  __name: "SwContactForm",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const loading = ref();
    const formSent = ref(false);
    ref([]);
    const { getSalutations } = useSalutations();
    useNavigationContext();
    useShopwareContext();
    const { getConfigValue } = useCmsElementConfig(props.content);
    const getConfirmationText = computed(
      () => {
        var _a;
        return (_a = getConfigValue("confirmationText")) != null ? _a : "We have received your contact request and will process it as soon as possible.";
      }
    );
    const getFormTitle = computed(() => getConfigValue("title") || "Contact");
    const state = reactive({
      salutationId: "",
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      comment: "",
      phone: "",
      checkbox: false
    });
    const rules = computed(() => ({
      email: {
        required,
        email
      },
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      salutationId: {
        required
      },
      phone: {
        required,
        minLength: minLength(3)
      },
      subject: {
        required,
        minLength: minLength(3)
      },
      comment: {
        required,
        minLength: minLength(10)
      },
      checkbox: {
        required,
        isTrue: (value) => value === true
      }
    }));
    const $v = useVuelidate(rules, state);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "w-full relative" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center z-10 bg-white/50"><div class="h-15 w-15 i-carbon-progress-bar-round animate-spin c-gray-500"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 class="pb-3 mb-10 border-b border-gray-300">${ssrInterpolate(unref(getFormTitle))}</h3>`);
      if (!unref(formSent)) {
        _push(`<!--[--><div class="grid grid-cols-12 gap-5"><div class="col-span-4"><label for="salutation">Salutation *</label><select id="salutation" name="salutation" class="${ssrRenderClass([[
          unref($v).salutationId.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}"><option disabled selected value="">Enter salutation...</option><!--[-->`);
        ssrRenderList(unref(getSalutations), (salutation) => {
          _push(`<option${ssrRenderAttr("value", salutation.id)}>${ssrInterpolate(salutation.displayName)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref($v).salutationId.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).salutationId.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-span-4"><label for="first-name">First name *</label><input id="first-name" name="first-name" type="text" autocomplete="first-name" class="${ssrRenderClass([[
          unref($v).firstName.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}"${ssrRenderAttr("value", unref(state).firstName)} placeholder="Enter first name...">`);
        if (unref($v).firstName.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).firstName.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-span-4"><label for="last-name">Last name *</label><input id="last-name" name="last-name" type="text" autocomplete="last-name"${ssrRenderAttr("value", unref(state).lastName)} class="${ssrRenderClass([[
          unref($v).lastName.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter last name...">`);
        if (unref($v).lastName.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).lastName.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-span-6"><label for="email-address">Email address *</label><input id="email-address" name="email" type="email" autocomplete="email" class="${ssrRenderClass([[
          unref($v).email.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}"${ssrRenderAttr("value", unref(state).email)} placeholder="Enter email address...">`);
        if (unref($v).email.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).email.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-span-6"><label for="phone">Phone *</label><input id="phone" name="phone" type="text" autocomplete="phone"${ssrRenderAttr("value", unref(state).phone)} class="${ssrRenderClass([[
          unref($v).phone.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter phone number...">`);
        if (unref($v).phone.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).phone.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-span-12"><label for="subject">Subject *</label><input id="subject" name="subject" type="text" autocomplete="subject"${ssrRenderAttr("value", unref(state).subject)} class="${ssrRenderClass([[
          unref($v).subject.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter subject...">`);
        if (unref($v).subject.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).subject.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-span-12"><label for="comment">Comment *</label><textarea id="comment" name="comment" type="text" autocomplete="comment" class="${ssrRenderClass([[
          unref($v).comment.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter comment..." rows="5">${ssrInterpolate(unref(state).comment)}</textarea>`);
        if (unref($v).comment.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).comment.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="col-span-12"><label>Privacy *</label><div class="flex gap-3 items-start"><input id="privacy" name="privacy" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(state).checkbox) ? ssrLooseContain(unref(state).checkbox, null) : unref(state).checkbox) ? " checked" : ""} class="${ssrRenderClass([[
          unref($v).checkbox.$error ? "border-red-600" : "border-gray-300"
        ], "mt-1 focus:ring-indigo-500 h-4 w-4 border text-indigo-600 rounded"])}"><div><label class="${ssrRenderClass([unref($v).checkbox.$error ? "text-red-600" : ""])}" for="privacy"> I have read the <a class="text-indigo-700">data protection information.</a></label></div></div></div></div><div class="flex justify-end mt-10"><button class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-75" type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}> Submit </button></div><!--]-->`);
      } else {
        _push(`<p class="py-10 text-lg text-center">${ssrInterpolate(unref(getConfirmationText))}</p>`);
      }
      _push(`</form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwContactForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SwContactForm-09861cbe.mjs.map
