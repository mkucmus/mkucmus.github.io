import _sfc_main$1 from './CmsPage-9ff5116f.mjs';
import { v as useLandingSearch, a as useAsyncData } from '../server.mjs';
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
  __name: "FrontendLandingPage",
  __ssrInlineRender: true,
  props: {
    navigationId: null
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const { search } = useLandingSearch();
    const { data: landingResponse } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "cmsLanding" + props.navigationId,
      async () => {
        const landingPage = await search(props.navigationId, {
          withCmsAssociations: true
        });
        return landingPage;
      },
      "$n4jN7JHXuJ"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_CmsPage = _sfc_main$1;
      if ((_a = unref(landingResponse)) == null ? void 0 : _a.cmsPage) {
        _push(ssrRenderComponent(_component_CmsPage, mergeProps({
          content: unref(landingResponse).cmsPage
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FrontendLandingPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FrontendLandingPage-c1843961.mjs.map
