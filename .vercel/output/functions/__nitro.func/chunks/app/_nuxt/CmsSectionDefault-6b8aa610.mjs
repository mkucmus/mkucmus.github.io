import _sfc_main$1 from './CmsGenericBlock-06d8d9d8.mjs';
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
  __name: "CmsSectionDefault",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericBlock = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-section-default" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.content.blocks, (cmsBlock) => {
        _push(ssrRenderComponent(_component_CmsGenericBlock, {
          class: "overflow-auto",
          key: cmsBlock.id,
          content: cmsBlock
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/section/CmsSectionDefault.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsSectionDefault-6b8aa610.mjs.map
