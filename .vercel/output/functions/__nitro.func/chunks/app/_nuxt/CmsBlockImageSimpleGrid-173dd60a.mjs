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
  __name: "CmsBlockImageSimpleGrid",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getSlotContent } = useCmsBlock(props.content);
    const leftTopContent = getSlotContent("left-top");
    const leftBottomContent = getSlotContent("left-bottom");
    const rightContent = getSlotContent("right");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericElement = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid md:grid-cols-2 gap-10" }, _attrs))}><div class="grid gap-10">`);
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(leftTopContent) }, null, _parent));
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(leftBottomContent) }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CmsGenericElement, { content: unref(rightContent) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/block/CmsBlockImageSimpleGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsBlockImageSimpleGrid-173dd60a.mjs.map
