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
  __name: "CmsBlockImageTextCover",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getSlotContent } = useCmsBlock(props.content);
    const leftContent = getSlotContent("left");
    const rightContent = getSlotContent("right");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericElement = _sfc_main$1;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "grid md:grid-cols-2 gap-10" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CmsGenericElement, {
        content: unref(leftContent),
        class: "cms-block-image-text-cover__image"
      }, null, _parent));
      _push(ssrRenderComponent(_component_CmsGenericElement, {
        content: unref(rightContent),
        class: "cms-block-image-text-cover__text"
      }, null, _parent));
      _push(`</article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/block/CmsBlockImageTextCover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsBlockImageTextCover-7f1bd53e.mjs.map
