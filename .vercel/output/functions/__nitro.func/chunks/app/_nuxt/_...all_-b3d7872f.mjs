import { b as useBreadcrumbs, a0 as useNavigationSearch, e as useRoute, a as useAsyncData, j as useNavigationContext } from '../server.mjs';
import { defineComponent, withAsyncContext, useSSRContext, h, resolveComponent } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
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
import 'cookie-es';
import 'ohash';
import 'axios';
import 'query-string';
import 'defu';
import '../../nitro/config.mjs';

const __default__ = {
  name: "PageResolver"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { clearBreadcrumbs } = useBreadcrumbs();
    const NOT_FOUND_COMPONENT = "errors/RoutingNotFound";
    const { resolvePath } = useNavigationSearch();
    const route = useRoute();
    const { data: seoResult } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "cmsResponse" + route.path,
      async () => {
        const seoUrl = await resolvePath(route.path);
        return seoUrl;
      },
      "$DYe1DJTSKq"
    )), __temp = await __temp, __restore(), __temp);
    onBeforeRouteLeave(() => {
      clearBreadcrumbs();
    });
    const { routeName, foreignKey } = useNavigationContext(
      seoResult
    );
    function render() {
      const componentName = routeName.value;
      if (!componentName)
        return h("div", h(resolveComponent(pascalCase(NOT_FOUND_COMPONENT))));
      const componentNameToResolve = pascalCase(componentName);
      const cmsPageView = routeName && resolveComponent(componentNameToResolve);
      if (cmsPageView) {
        if (cmsPageView === componentNameToResolve)
          return h("div", {}, "Problem resolving component: " + componentName);
        return h("div", h(cmsPageView, { navigationId: foreignKey.value }));
      }
      return h("div", {}, "Loading...");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(render, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...all].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...all_-b3d7872f.mjs.map
