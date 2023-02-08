import _sfc_main$1 from './CmsGenericElement-986d3475.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import '../server.mjs';
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
  __name: "CmsBlockProductSlider",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericElement = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-block-product-slider" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.content.slots, (slot) => {
        _push(ssrRenderComponent(_component_CmsGenericElement, {
          key: slot.id,
          content: slot
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/block/CmsBlockProductSlider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsBlockProductSlider-b31d55b4.mjs.map
