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
  __name: "CmsBlockCenterText",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getSlotContent } = useCmsBlock(props.content);
    const slotLeftContent = getSlotContent("left");
    const slotRightContent = getSlotContent("right");
    const slotCenterContent = getSlotContent("center");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericElement = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-block-center-text grid md:grid-cols-3 gap-10 content-center" }, _attrs))} data-v-a6c38b3d>`);
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(slotLeftContent) }, null, _parent));
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(slotCenterContent) }, null, _parent));
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(slotRightContent) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/block/CmsBlockCenterText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CmsBlockCenterText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a6c38b3d"]]);

export { CmsBlockCenterText as default };
//# sourceMappingURL=CmsBlockCenterText-838d5d85.mjs.map
