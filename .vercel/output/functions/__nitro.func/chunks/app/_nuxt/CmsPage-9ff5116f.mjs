import { j as useNavigationContext, k as useListing, l as getCmsLayoutConfiguration } from '../server.mjs';
import { defineComponent, computed, useSSRContext, resolveComponent, h } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { pascalCase } from 'scule';
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
import 'axios';
import 'query-string';
import 'defu';
import '../../nitro/config.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsPage",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { routeName } = useNavigationContext();
    if (routeName.value === "frontend.navigation.page") {
      useListing();
    }
    const cmsSections = computed(() => {
      var _a;
      return ((_a = props.content) == null ? void 0 : _a.sections) || [];
    });
    const DynamicRender = () => {
      const componentsMap = cmsSections.value.map((section) => {
        return {
          component: resolveComponent(`CmsSection${pascalCase(section.type)}`),
          section
        };
      });
      return componentsMap.map((componentObject) => {
        const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(
          componentObject.section
        );
        if (typeof componentObject.component === "string")
          return h("div", {}, "There is no " + componentObject.component);
        return h(componentObject.component, {
          content: componentObject.section,
          class: {
            [cssClasses != null ? cssClasses : ""]: true,
            "max-w-screen-xl mx-auto": (layoutStyles == null ? void 0 : layoutStyles.sizingMode) === "boxed"
          },
          style: {
            backgroundColor: layoutStyles == null ? void 0 : layoutStyles.backgroundColor,
            backgroundImage: layoutStyles == null ? void 0 : layoutStyles.backgroundImage,
            backgroundSize: layoutStyles == null ? void 0 : layoutStyles.backgroundSize
          }
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(DynamicRender, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/CmsPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsPage-9ff5116f.mjs.map
