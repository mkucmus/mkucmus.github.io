import _sfc_main$1 from './CmsGenericElement-986d3475.mjs';
import { V as useCmsBlock } from '../server.mjs';
import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
  __name: "CmsBlockImageHighlightRow",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getSlotContent } = useCmsBlock(props.content);
    const leftContent = getSlotContent("left");
    const rightContent = getSlotContent("right");
    const centerContent = getSlotContent("center");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericElement = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-block-image-highlight-row grid md:grid-cols-3 gap-10" }, _attrs))} data-v-4f0ff540>`);
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(leftContent) }, null, _parent));
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(centerContent) }, null, _parent));
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(rightContent) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/block/CmsBlockImageHighlightRow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CmsBlockImageHighlightRow = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4f0ff540"]]);

export { CmsBlockImageHighlightRow as default };
//# sourceMappingURL=CmsBlockImageHighlightRow-5759337f.mjs.map
