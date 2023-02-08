import _sfc_main$1 from './ProductStatic-fe6dbe76.mjs';
import _sfc_main$2 from './CmsPage-9ff5116f.mjs';
import { u as useProductSearch, a as useAsyncData, g as getCategoryBreadcrumbs, b as useBreadcrumbs, d as useProduct } from '../server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import './ProductGallery-cc8d13fa.mjs';
import './CmsElementImageGallery-ee4b5e55.mjs';
import './CmsElementImage-ad2cdd3c.mjs';
import './SwSlider-ec4d3269.mjs';
import './ProductPrice-594e1885.mjs';
import './SharedPrice-64255154.mjs';
import './ProductUnits-4d5fe604.mjs';
import './ProductVariantConfigurator-d5903323.mjs';
import './ProductAddToCart-87a1cf12.mjs';
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
  __name: "FrontendDetailPage",
  __ssrInlineRender: true,
  props: {
    navigationId: null
  },
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const props = __props;
    const { search } = useProductSearch();
    const { data: productResponse } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "cmsProduct" + props.navigationId,
      async () => {
        const productResponse2 = await search(props.navigationId, {
          withCmsAssociations: true
        });
        return productResponse2;
      },
      "$cYaWBTuNQO"
    )), __temp = await __temp, __restore(), __temp);
    const breadcrumbs = getCategoryBreadcrumbs(
      (_a = productResponse.value) == null ? void 0 : _a.product.seoCategory,
      {
        startIndex: 2
      }
    );
    useBreadcrumbs(breadcrumbs);
    const { product } = useProduct(
      (_b = productResponse.value) == null ? void 0 : _b.product,
      (_c = productResponse.value) == null ? void 0 : _c.configurator
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_ProductStatic = _sfc_main$1;
      const _component_CmsPage = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto bg-white flex flex-col" }, _attrs))}>`);
      if (!((_a2 = unref(product)) == null ? void 0 : _a2.cmsPage)) {
        _push(ssrRenderComponent(_component_ProductStatic, { product: unref(product) }, null, _parent));
      } else if (unref(product).cmsPage) {
        _push(ssrRenderComponent(_component_CmsPage, {
          content: unref(product).cmsPage
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FrontendDetailPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FrontendDetailPage-682646b6.mjs.map
