import { defineComponent, useSSRContext, h } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { U as resolveCmsComponent, l as getCmsLayoutConfiguration } from '../server.mjs';
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
  __name: "CmsGenericBlock",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const DynamicRender = () => {
      const { resolvedComponent, componentName, isResolved } = resolveCmsComponent(
        props.content
      );
      if (resolvedComponent) {
        if (!isResolved)
          return h("div", {}, "Problem resolving component: " + componentName);
        const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(
          props.content
        );
        const containerStyles = {
          backgroundColor: layoutStyles.backgroundColor,
          backgroundImage: layoutStyles.backgroundImage
        };
        layoutStyles.backgroundColor = null;
        layoutStyles.backgroundImage = null;
        return h(
          "div",
          {
            style: containerStyles
          },
          h(resolvedComponent, {
            content: props.content,
            style: layoutStyles,
            class: cssClasses
          })
        );
      }
      return h("div", {}, "Loading...");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(DynamicRender, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/CmsGenericBlock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsGenericBlock-06d8d9d8.mjs.map
