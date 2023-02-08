import { r as useCmsElementConfig } from '../server.mjs';
import { defineComponent, computed, defineAsyncComponent, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderVNode } from 'vue/server-renderer';
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
  __name: "CmsElementForm",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig(props.content);
    const FormComponent = computed(() => {
      switch (getConfigValue("type")) {
        case "newsletter":
          return defineAsyncComponent(
            () => import('./SwNewsletterForm-58eda8c2.mjs')
          );
        case "contact":
        default:
          return defineAsyncComponent(() => import('./SwContactForm-09861cbe.mjs'));
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-element-form" }, _attrs))}>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(FormComponent)), { content: __props.content }, null), _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementForm-f37d7633.mjs.map
