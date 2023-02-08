import _sfc_main$1 from './ProductGallery-cc8d13fa.mjs';
import _sfc_main$2 from './ProductPrice-594e1885.mjs';
import _sfc_main$3 from './ProductUnits-4d5fe604.mjs';
import _sfc_main$4 from './ProductVariantConfigurator-d5903323.mjs';
import _sfc_main$5 from './ProductAddToCart-87a1cf12.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { e as useRoute, f as useRouter, h as useShopwareContext, i as getTranslatedProperty } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import './CmsElementImageGallery-ee4b5e55.mjs';
import './CmsElementImage-ad2cdd3c.mjs';
import './SwSlider-ec4d3269.mjs';
import './SharedPrice-64255154.mjs';
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
  __name: "ProductStatic",
  __ssrInlineRender: true,
  props: {
    product: null
  },
  setup(__props) {
    const props = __props;
    const reviews = ref([]);
    const route = useRoute();
    const router = useRouter();
    useShopwareContext();
    const productName = computed(
      () => getTranslatedProperty(props.product, "name")
    );
    const manufacturerName = computed(
      () => getTranslatedProperty(props.product.manufacturer, "name")
    );
    const description = computed(
      () => getTranslatedProperty(props.product, "description")
    );
    const properties = computed(() => {
      var _a;
      return ((_a = props.product) == null ? void 0 : _a.properties) || [];
    });
    const handleVariantChange = (val) => {
      var _a;
      const path = (_a = val.seoUrls) == null ? void 0 : _a[0].seoPathInfo;
      if (path && route.path !== `/${path}`) {
        router.push(`/${path}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_ProductGallery = _sfc_main$1;
      const _component_ProductPrice = _sfc_main$2;
      const _component_ProductUnits = _sfc_main$3;
      const _component_ProductVariantConfigurator = _sfc_main$4;
      const _component_ProductAddToCart = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row gap-10" }, _attrs))}><div class="product-gallery w-full lg:w-3/5 overflow-hidden">`);
      _push(ssrRenderComponent(_component_ProductGallery, { product: __props.product }, null, _parent));
      _push(`</div><div class="product-description flex-1"><div class="max-w-2xl mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pb-24 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto] lg:gap-x-8"><div class="lg:col-span-2 lg:pr-8 static-container"><div class="container mx-auto pt-8 flex flex-row"><h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl basis-4/6">${unref(productName)}</h1><div class="basis-2/6 text-right">${ssrInterpolate(unref(manufacturerName))}</div></div></div><div class="mt-4 lg:mt-0 lg:row-span-3"><h2 class="sr-only">Product information</h2><div class="product-variants mt-10">`);
      _push(ssrRenderComponent(_component_ProductPrice, { product: __props.product }, null, _parent));
      _push(ssrRenderComponent(_component_ProductUnits, {
        product: __props.product,
        class: "text-sm"
      }, null, _parent));
      _push(ssrRenderComponent(_component_ProductVariantConfigurator, { onChange: handleVariantChange }, null, _parent));
      _push(ssrRenderComponent(_component_ProductAddToCart, { product: __props.product }, null, _parent));
      _push(`</div></div><div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:pr-8"><div class="container mx-auto mb-8">`);
      if (unref(description)) {
        _push(`<div><h3 class="text-sm font-medium text-gray-900">Description</h3><div class="mt-4 space-y-6"><div class="text-base text-gray-900">${unref(description)}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_a = unref(properties)) == null ? void 0 : _a.length) {
        _push(`<div class="mt-10"><h3 class="text-sm font-medium text-gray-900">Properties</h3><div class="mt-4"><ul role="list" class="pl-4 list-disc text-sm space-y-2"><!--[-->`);
        ssrRenderList(unref(properties), (property) => {
          _push(`<li class="text-gray-400"><span class="text-gray-600">${ssrInterpolate(unref(getTranslatedProperty)(property, "name"))}</span></li>`);
        });
        _push(`<!--]--></ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b = unref(reviews)) == null ? void 0 : _b.length) {
        _push(`<div class="mt-10"><h3 class="text-sm font-medium text-gray-900">Reviews</h3>`);
        if ((_c = unref(reviews)) == null ? void 0 : _c.length) {
          _push(`<div class="mt-4"><ul role="list" class="pl-4 list-disc text-sm space-y-2"><!--[-->`);
          ssrRenderList(unref(reviews), (review) => {
            _push(`<li class="text-gray-400"><span class="text-gray-600">${ssrInterpolate(review.content)}</span></li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductStatic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductStatic-fe6dbe76.mjs.map
