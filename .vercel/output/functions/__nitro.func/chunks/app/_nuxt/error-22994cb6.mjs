import { b as buildAssetsURL } from '../../paths.mjs';
import { _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import 'ufo';
import '../../nitro/config.mjs';
import 'destr';
import 'scule';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'cookie-es';
import 'ohash';
import 'axios';
import 'query-string';
import 'defu';

const _imports_0 = "" + buildAssetsURL("error-background.176145e9.png");
const __default__ = {
  name: "ErrorPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    errorCode: { default: 404 },
    errorMessage: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const errorMessageMap = {
      404: "We can't find what you are looking for. Are you lost?",
      408: "The API is taking to long to respond",
      500: "Oops, something went terribly wrong",
      502: "Server couldn't complete your request. Please try again in few seconds.",
      503: "Server is really busy right now"
    };
    const errorMessage = props.errorMessage || errorMessageMap[props.errorCode];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-5 py-3 md:py-20 md:px-32 lg:px-24 lg:py-24 items-center flex justify-center flex-col-reverse lg:flex-row" }, _attrs))}><div class="flex flex-col items-center justify-center my-8"><div class="max-w-md text-center"><h1 class="mb-8 font-extrabold text-9xl"><span class="sr-only">Error</span>${ssrInterpolate(__props.errorCode)}</h1><p class="text-xl md:text-3xl font-semibold mt-4 mb-8">${ssrInterpolate(unref(errorMessage))}</p>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "w-full lg:w-auto justify-center py-3 px-8 border shadow-sm text-sm font-medium rounded-md text-white bg-brand-light hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Go back home `);
          } else {
            return [
              createTextVNode(" Go back home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center justify-center"><img class="w-full h-full max-w-md max-h-md"${ssrRenderAttr("src", _imports_0)} alt="Error"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=error-22994cb6.mjs.map
