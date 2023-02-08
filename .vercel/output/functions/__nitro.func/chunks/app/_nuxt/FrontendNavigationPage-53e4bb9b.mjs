import _sfc_main$1 from './CmsPage-9ff5116f.mjs';
import { w as useCategorySearch, e as useRoute, a as useAsyncData, g as getCategoryBreadcrumbs, b as useBreadcrumbs, x as useCategory } from '../server.mjs';
import { defineComponent, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import 'scule';
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
  __name: "FrontendNavigationPage",
  __ssrInlineRender: true,
  props: {
    navigationId: null
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const { search } = useCategorySearch();
    const route = useRoute();
    const { data: categoryResponse } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "cmsNavigation" + props.navigationId,
      async () => {
        const category2 = await search(props.navigationId, {
          withCmsAssociations: true,
          query: {
            ...route.query
          }
        });
        return category2;
      },
      "$JkgoYYpZxy"
    )), __temp = await __temp, __restore(), __temp);
    const breadcrumbs = getCategoryBreadcrumbs(categoryResponse.value, {
      startIndex: 2
    });
    useBreadcrumbs(breadcrumbs);
    const { category } = useCategory(categoryResponse);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_CmsPage = _sfc_main$1;
      if ((_a = unref(category)) == null ? void 0 : _a.cmsPage) {
        _push(ssrRenderComponent(_component_CmsPage, mergeProps({
          content: unref(category).cmsPage
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FrontendNavigationPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FrontendNavigationPage-53e4bb9b.mjs.map
