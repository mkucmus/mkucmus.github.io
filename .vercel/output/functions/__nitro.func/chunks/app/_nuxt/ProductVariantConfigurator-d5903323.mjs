import { defineComponent, ref, computed, unref, mergeProps, useSSRContext } from 'vue';
import { f as useRouter, o as useProductConfigurator } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "ProductVariantConfigurator",
  __ssrInlineRender: true,
  props: {
    allowRedirect: { type: Boolean, default: false }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    const isLoading = ref();
    useRouter();
    const {
      handleChange,
      getOptionGroups,
      getSelectedOptions,
      findVariantForSelectedOptions
    } = useProductConfigurator();
    computed(
      () => Object.values(unref(getSelectedOptions))
    );
    const isOptionSelected = (optionId) => Object.values(getSelectedOptions.value).includes(optionId);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex relative" }, _attrs))}>`);
      if (unref(isLoading)) {
        _push(`<div class="absolute inset-0 flex items-center justify-end z-10 bg-white/75"><div class="h-15 w-15 i-carbon-progress-bar-round animate-spin c-gray-500"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(getOptionGroups), (optionGroup) => {
        _push(`<div class="mt-6"><h3 class="text-sm text-gray-900 font-medium">${ssrInterpolate(optionGroup.name)}</h3><fieldset class="mt-4 flex-1"><legend class="sr-only">Choose a ${ssrInterpolate(optionGroup.name)}</legend><div class="flex"><!--[-->`);
        ssrRenderList(optionGroup.options, (option) => {
          _push(`<label data-testid="product-variant" class="${ssrRenderClass([{
            "border-3 border-indigo-600": isOptionSelected(option.id)
          }, "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 bg-white shadow-sm text-gray-900 cursor-pointer"])}"><p${ssrRenderAttr("id", `${option.id}-choice-label`)} data-testid="product-variant-text">${ssrInterpolate(option.name)}</p></label>`);
        });
        _push(`<!--]--></div></fieldset></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductVariantConfigurator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductVariantConfigurator-d5903323.mjs.map
