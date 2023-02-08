import { defineComponent, ref, computed, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { a2 as useSalutations, r as useCmsElementConfig, a3 as useNewsletter } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { u as useVuelidate } from '../../index.esm.mjs';
import { required, email } from '@vuelidate/validators';
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
  __name: "SwNewsletterForm",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const loading = ref();
    const formSent = ref(false);
    ref([]);
    const subscriptionOptions = [
      {
        label: "Subscribe to newsletter",
        value: "subscribe"
      },
      {
        label: "Unsubscribe to newsletter",
        value: "unsubscribe"
      }
    ];
    const { getSalutations } = useSalutations();
    const { getConfigValue } = useCmsElementConfig(props.content);
    useNewsletter();
    const getFormTitle = computed(() => getConfigValue("title"));
    const state = reactive({
      option: subscriptionOptions[0].value,
      salutationId: "",
      firstName: "",
      lastName: "",
      email: "",
      checkbox: false
    });
    const rules = computed(() => {
      let temp = {
        email: {
          required,
          email
        },
        checkbox: {
          required,
          isTrue: (value) => value === true
        }
      };
      if (state.option === "subscribe") {
        temp = {
          ...temp,
          firstName: {
            required,
            minLength: 3
          },
          lastName: {
            required,
            minLength: 3
          },
          salutationId: {
            required
          }
        };
      }
      return temp;
    });
    const $v = useVuelidate(rules, state);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "w-full relative" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center z-10 bg-white/50"><div class="h-15 w-15 i-carbon-progress-bar-round animate-spin c-gray-500"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 class="pb-3 mb-10 border-b border-gray-300">${ssrInterpolate(unref(getFormTitle) ? unref(getFormTitle) : unref(state).option === "subscribe" ? "Subscribe to newsletter" : "Unsubscribe to newsletter")}</h3>`);
      if (!unref(formSent)) {
        _push(`<!--[--><div class="grid grid-cols-12 gap-5"><div class="col-span-12"><label for="option">Action *</label><select id="option" name="option" class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"><!--[-->`);
        ssrRenderList(subscriptionOptions, (subscription) => {
          _push(`<option${ssrRenderAttr("value", subscription.value)}>${ssrInterpolate(subscription.label)}</option>`);
        });
        _push(`<!--]--></select></div><div class="col-span-12"><label for="email-address">Email address *</label><input id="email-address" name="email" type="email" autocomplete="email" class="${ssrRenderClass([[
          unref($v).email.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
        ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}"${ssrRenderAttr("value", unref(state).email)} placeholder="Enter email address...">`);
        if (unref($v).email.$error) {
          _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).email.$errors[0].$message)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(state).option === "subscribe") {
          _push(`<div class="col-span-4"><label for="salutation">Salutation *</label><select id="salutation" name="salutation" class="${ssrRenderClass([[
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
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(state).option === "subscribe") {
          _push(`<div class="col-span-4"><label for="first-name">First name *</label><input id="first-name" name="first-name" type="text" autocomplete="first-name" class="${ssrRenderClass([[
            unref($v).firstName.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
          ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}"${ssrRenderAttr("value", unref(state).firstName)} placeholder="Enter first name...">`);
          if (unref($v).firstName.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).firstName.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(state).option === "subscribe") {
          _push(`<div class="col-span-4"><label for="last-name">Last name *</label><input id="last-name" name="last-name" type="text" autocomplete="last-name"${ssrRenderAttr("value", unref(state).lastName)} class="${ssrRenderClass([[
            unref($v).lastName.$error ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-indigo-500"
          ], "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"])}" placeholder="Enter last name...">`);
          if (unref($v).lastName.$error) {
            _push(`<span class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300">${ssrInterpolate(unref($v).lastName.$errors[0].$message)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="col-span-12"><label>Privacy *</label><div class="flex gap-3 items-start"><input id="privacy" name="privacy" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(state).checkbox) ? ssrLooseContain(unref(state).checkbox, null) : unref(state).checkbox) ? " checked" : ""} class="${ssrRenderClass([[
          unref($v).checkbox.$error ? "border-red-600" : "border-gray-300"
        ], "mt-1 focus:ring-indigo-500 h-4 w-4 border text-indigo-600 rounded"])}"><div><label class="${ssrRenderClass([unref($v).checkbox.$error ? "text-red-600" : ""])}" for="privacy"> I have read the <a class="text-indigo-700">data protection information.</a></label></div></div></div></div><div class="flex justify-end mt-10"><button class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-75" type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}> Submit </button></div><!--]-->`);
      } else {
        _push(`<p class="py-10 text-lg text-center"> Be aware of upcoming sales and events. Receive gifts and special offers! </p>`);
      }
      _push(`</form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwNewsletterForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SwNewsletterForm-58eda8c2.mjs.map
