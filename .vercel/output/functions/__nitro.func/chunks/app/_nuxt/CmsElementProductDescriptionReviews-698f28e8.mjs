import { useSSRContext, defineComponent, ref, computed, unref, mergeProps, toRefs } from 'vue';
import { d as useProduct, i as getTranslatedProperty, T as getProductName, Z as useProductReviews } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SwProductReviews",
  __ssrInlineRender: true,
  props: {
    product: null,
    reviews: null
  },
  setup(__props) {
    const props = __props;
    const { product, reviews } = toRefs(props);
    const shouldLoadReviews = !(reviews == null ? void 0 : reviews.value);
    const loadingReviews = ref(shouldLoadReviews);
    const { loadProductReviews, productReviews } = useProductReviews(product);
    const reviewsList = computed(
      () => (reviews == null ? void 0 : reviews.value) || productReviews.value || []
    );
    const format = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    const formatDate = (date) => new Date(date).toLocaleDateString("en-us", format);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(loadingReviews)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute inset-0 flex items-center justify-center z-10 bg-white/75" }, _attrs))}><div class="h-15 w-15 i-carbon-progress-bar-round animate-spin c-gray-500"></div></div>`);
      } else if (unref(reviewsList).length) {
        _push(`<div${ssrRenderAttrs(_attrs)}><!--[-->`);
        ssrRenderList(unref(reviews), (review) => {
          _push(`<div><div class="cms-block-product-description-reviews__reviews-time mt-3 text-gray-600 text-sm"><span>${ssrInterpolate(formatDate(review.createdAt))}</span></div><div class="cms-block-product-description-reviews__reviews-rating inline-flex items-center mt-2"><!--[-->`);
          ssrRenderList(review.points, (value) => {
            _push(`<div class="w-5 h-5 i-carbon-star-filled"></div>`);
          });
          _push(`<!--]--><!--[-->`);
          ssrRenderList(5 - (review.points || 0), (value) => {
            _push(`<div class="w-5 h-5 i-carbon-star"></div>`);
          });
          _push(`<!--]--><div class="cms-block-product-description-reviews__reviews-title font-semibold ml-2"><p>${ssrInterpolate(review.title)}</p></div></div><div class="cms-block-product-description-reviews__reviews-content mt-2"><span>${ssrInterpolate(review.content)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}>No comments yet.</div>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwProductReviews.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementProductDescriptionReviews",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    var _a;
    const props = __props;
    const currentTab = ref(1);
    const { product } = useProduct((_a = props.content.data) == null ? void 0 : _a.product);
    const description = computed(
      () => getTranslatedProperty(product.value, "description")
    );
    const reviews = computed(() => {
      var _a2;
      return (_a2 = props.content.data.reviews) == null ? void 0 : _a2.elements;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(product)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-block-product-description-reviews flex flex-wrap" }, _attrs))}><div class="w-full"><ul class="flex flex-wrap text-sm font-medium list-none text-center text-gray-500 border-b border-gray-200 dark:border-gray-500 dark:text-gray-400"><li class="mr-2 text-center"><a class="${ssrRenderClass([[
          unref(currentTab) !== 1 ? "text-gray-500 bg-white" : "text-white bg-gray-500"
        ], "font-bold uppercase px-5 py-3 block leading-normal cursor-pointer"])}"><i class="fas fa-space-shuttle text-base mr-1"></i> Description </a></li><li class="mr-2 text-center"><a class="${ssrRenderClass([[
          unref(currentTab) !== 2 ? "text-gray-500 bg-white" : "text-white bg-gray-500"
        ], "font-bold uppercase px-5 py-3 block leading-normal cursor-pointer"])}"><i class="fas fa-cog text-base mr-1"></i> Reviews </a></li></ul><div class="relative flex flex-col min-w-0 break-words w-full mb-6"><div class="px-4 py-5 flex-auto"><div class="tab-content tab-space"><div class="${ssrRenderClass([
          "cms-block-product-description-reviews__description",
          unref(currentTab) !== 1 ? "hidden" : "block"
        ])}"><p class="text-xl font-bold mt-3">${ssrInterpolate(unref(getProductName)({ product: unref(product) }))}</p><div class="mt-2">${unref(description)}</div></div><div class="${ssrRenderClass([
          "cms-block-product-description-reviews__reviews",
          unref(currentTab) !== 2 ? "hidden" : "block"
        ])}">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          product: unref(product),
          reviews: unref(reviews)
        }, null, _parent));
        _push(`</div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementProductDescriptionReviews.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementProductDescriptionReviews-698f28e8.mjs.map
