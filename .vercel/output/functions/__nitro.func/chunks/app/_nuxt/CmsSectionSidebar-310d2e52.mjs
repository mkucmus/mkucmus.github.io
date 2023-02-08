import _sfc_main$1 from './CmsGenericBlock-06d8d9d8.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { $ as useCmsSection } from '../server.mjs';
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
  __name: "CmsSectionSidebar",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getPositionContent } = useCmsSection(props.content);
    const sidebarBlocks = getPositionContent("sidebar");
    const mainBlocks = getPositionContent("main");
    const mobileBehavior = computed(() => props.content.mobileBehavior);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsGenericBlock = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-section-sidebar grid md:grid-cols-4" }, _attrs))}><div class="${ssrRenderClass({
        block: unref(mobileBehavior) !== "hidden",
        "hidden md:block": unref(mobileBehavior) === "hidden"
      })}"><!--[-->`);
      ssrRenderList(unref(sidebarBlocks), (cmsBlock) => {
        _push(ssrRenderComponent(_component_CmsGenericBlock, {
          class: "overflow-auto",
          key: cmsBlock.id,
          content: cmsBlock
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="md:col-span-3"><!--[-->`);
      ssrRenderList(unref(mainBlocks), (cmsBlock) => {
        _push(ssrRenderComponent(_component_CmsGenericBlock, {
          class: "overflow-auto",
          key: cmsBlock.id,
          content: cmsBlock
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/section/CmsSectionSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsSectionSidebar-310d2e52.mjs.map
