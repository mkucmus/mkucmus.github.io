import _sfc_main$1 from './CmsGenericElement-986d3475.mjs';
import { V as useCmsBlock } from '../server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "CmsBlockImageTextBubble",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getSlotContent } = useCmsBlock(props.content);
    const leftText = getSlotContent("left-text");
    const leftImage = getSlotContent("left-image");
    const centerText = getSlotContent("center-text");
    const centerImage = getSlotContent("center-image");
    const rightText = getSlotContent("right-text");
    const rightImage = getSlotContent("right-image");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericElement = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-block-image-text-bubble grid grid-cols-3 auto-cols-max" }, _attrs))}><div class="cms-element-column p-4"><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_CmsGenericElement, {
        content: unref(leftImage),
        class: "object-center rounded-full",
        style: { "height": "calc(100vw / 3 - 64px)", "width": "calc(100vw / 3 - 64px)" }
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(leftText) }, null, _parent));
      _push(`</div><div class="cms-element-column p-4"><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_CmsGenericElement, {
        content: unref(centerImage),
        class: "object-center rounded-full",
        style: { "height": "calc(100vw / 3 - 64px)", "width": "calc(100vw / 3 - 64px)" }
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(centerText) }, null, _parent));
      _push(`</div><div class="cms-element-column p-4"><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_CmsGenericElement, {
        content: unref(rightImage),
        class: "object-center rounded-full",
        style: { "height": "calc(100vw / 3 - 64px)", "width": "calc(100vw / 3 - 64px)" }
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(rightText) }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/block/CmsBlockImageTextBubble.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsBlockImageTextBubble-9ac82a69.mjs.map
