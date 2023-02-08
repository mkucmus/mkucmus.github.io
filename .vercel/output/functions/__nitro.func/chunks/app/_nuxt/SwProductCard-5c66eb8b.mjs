import { _ as __nuxt_component_0 } from './client-only-67b331e0.mjs';
import { p as useNotifications, q as useAddToCart, Q as useProductWishlist, R as getProductFromPrice, S as getProductThumbnailUrl, T as getProductName, P as getProductUrl, i as getTranslatedProperty, m as useProductPrice } from '../server.mjs';
import { useSSRContext, defineComponent, toRefs, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { RouterLink } from 'vue-router';
import _sfc_main$2 from './SharedPrice-64255154.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SwListingProductPrice",
  __ssrInlineRender: true,
  props: {
    product: null
  },
  setup(__props) {
    const props = __props;
    const { product } = toRefs(props);
    const { unitPrice, displayFromVariants, displayFrom } = useProductPrice(product);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SharedPrice = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(product).id
      }, _attrs))}>`);
      if (unref(displayFromVariants)) {
        _push(ssrRenderComponent(_component_SharedPrice, {
          class: "text-xs text-gray-900 basis-2/6 justify-end",
          value: unref(displayFromVariants)
        }, {
          beforePrice: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(displayFromVariants)) {
                _push2(`<span${_scopeId}>variants from</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(displayFromVariants) ? (openBlock(), createBlock("span", { key: 0 }, "variants from")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_SharedPrice, {
        class: "text-sm text-gray-900 basis-2/6 justify-end",
        value: unref(unitPrice)
      }, {
        beforePrice: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayFrom) || unref(displayFromVariants)) {
              _push2(`<span${_scopeId}>from</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(displayFrom) || unref(displayFromVariants) ? (openBlock(), createBlock("span", { key: 0 }, "from")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwListingProductPrice.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SwProductCard",
  __ssrInlineRender: true,
  props: {
    product: null,
    layoutType: { default: "standard" },
    isProductListing: { type: Boolean, default: false },
    displayMode: { default: "standard" }
  },
  setup(__props) {
    const props = __props;
    useNotifications();
    const { product } = toRefs(props);
    useAddToCart(product);
    useProductWishlist(product);
    const fromPrice = getProductFromPrice(props.product);
    const ratingAverage = computed(
      () => props.product.ratingAverage ? Math.round(props.product.ratingAverage) : 0
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_client_only = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "sw-product-card group relative flex flex-col justify-between",
        "data-testid": "product-box"
      }, _attrs))}><div class="${ssrRenderClass([
        "w-full rounded-md overflow-hidden hover:opacity-75",
        __props.layoutType === "image" ? "h-80" : "h-60"
      ])}"><img${ssrRenderAttr("src", unref(getProductThumbnailUrl)(unref(product)))}${ssrRenderAttr("alt", unref(getProductName)({ product: unref(product) }) || "")} class="${ssrRenderClass({
        "w-full h-full": true,
        "object-cover": __props.displayMode === "cover" || __props.displayMode === "standard" && __props.layoutType === "image",
        "object-contain": __props.displayMode === "contain",
        "object-scale-down": __props.displayMode === "standard" && __props.layoutType !== "image"
      })}" data-testid="product-box-img"></div><button aria-label="Add to wishlist" type="button" class="absolute top-2 right-2" data-testid="product-box-toggle-wishlist-button">`);
      _push(ssrRenderComponent(_component_client_only, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-7 w-7 i-carbon-favorite"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "h-7 w-7 i-carbon-favorite" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><div class="mt-4 flex flex-col justify-between flex-1"><div><h3 class="text-base font-bold text-gray-700">`);
      _push(ssrRenderComponent(unref(RouterLink), {
        class: "line-clamp-2 h-12",
        to: unref(getProductUrl)(unref(product)),
        "data-testid": "product-box-product-name-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getProductName)({ product: unref(product) }))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(getProductName)({ product: unref(product) })), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3>`);
      if (__props.layoutType === "standard") {
        _push(`<div class="line-clamp-4 mt-2 text-sm text-gray-500 h-20 overflow-hidden" data-testid="product-box-product-description">${unref(getTranslatedProperty)(unref(product), "description")}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-2 flex gap-2 flex-wrap"><!--[-->`);
      ssrRenderList((_a = unref(product)) == null ? void 0 : _a.options, (option) => {
        _push(`<span class="bg-gray-400 text-sm text-white rounded py-1 px-2" data-testid="product-box-product-options">${ssrInterpolate(option.group.name)}: ${ssrInterpolate(option.name)}</span>`);
      });
      _push(`<!--]--></div></div><div class="flex flex-col mt-3 justify-between">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        product: unref(product),
        class: "ml-auto",
        "data-testid": "product-box-product-price"
      }, null, _parent));
      if (!__props.isProductListing) {
        _push(`<div class="sw-product-rating inline-flex" data-testid="product-box-product-rating"><!--[-->`);
        ssrRenderList(unref(ratingAverage), (value) => {
          _push(`<div class="w-5 h-5 i-carbon-star-filled"></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(5 - unref(ratingAverage), (value) => {
          _push(`<div class="w-5 h-5 i-carbon-star"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-3">`);
      if (!unref(fromPrice)) {
        _push(`<button type="button" class="mt-3 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-testid="add-to-cart-button"> Add to cart </button>`);
      } else {
        _push(ssrRenderComponent(unref(RouterLink), {
          to: unref(getProductUrl)(unref(product))
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="mt-3 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-testid="product-box-product-show-details"${_scopeId}> Details </button>`);
            } else {
              return [
                createVNode("button", {
                  class: "mt-3 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
                  "data-testid": "product-box-product-show-details"
                }, " Details ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SwProductCard-5c66eb8b.mjs.map
