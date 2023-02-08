import _sfc_main$3 from './SharedPrice-64255154.mjs';
import { useSSRContext, defineComponent, computed, unref, mergeProps, toRefs, ref } from 'vue';
import { r as useCmsElementConfig, A as useSessionContext, d as useProduct, W as getProductTierPrices, X as getProductCalculatedListingPrice, p as useNotifications, q as useAddToCart, f as useRouter, o as useProductConfigurator } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SwProductAddToCart",
  __ssrInlineRender: true,
  props: {
    product: null
  },
  setup(__props) {
    const props = __props;
    useNotifications();
    const { product } = toRefs(props);
    const { addToCart, quantity } = useAddToCart(product);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row mt-10" }, _attrs))}><div class="basis-1/4 relative -top-6"><label for="qty" class="text-sm">Qty:</label><input id="qty" type="number"${ssrRenderAttr("value", unref(quantity))}${ssrRenderAttr("min", unref(product).minPurchase || 1)}${ssrRenderAttr("max", unref(product).calculatedMaxPurchase)}${ssrRenderAttr("step", unref(product).purchaseSteps || 1)} class="border rounded-md py-2 px-4 border-solid border-1 border-cyan-600 w-full" data-testid="product-quantity"></div><div class="basis-3/4 ml-4"><button class="py-2 px-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition ease-in-out hover:bg-gradient-to-l duration-300 cursor-pointer border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-testid="add-to-cart-button"> Add to cart </button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwProductAddToCart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SwVariantConfigurator",
  __ssrInlineRender: true,
  props: {
    allowRedirect: { type: Boolean, default: false }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    const isLoading = ref();
    useRouter();
    const {
      handleChange,
      getOptionGroups,
      getSelectedOptions,
      findVariantForSelectedOptions
    } = useProductConfigurator();
    computed(
      () => Object.values(unref(getSelectedOptions))
    );
    const isOptionSelected = (optionId) => Object.values(getSelectedOptions.value).includes(optionId);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}>`);
      if (unref(isLoading)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center z-10 bg-white/75"><div class="h-15 w-15 i-carbon-progress-bar-round animate-spin c-gray-500"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(getOptionGroups), (optionGroup) => {
        _push(`<div class="mt-6"><h3 class="text-sm text-gray-900 font-medium">${ssrInterpolate(optionGroup.name)}</h3><fieldset class="mt-4 flex-1"><legend class="sr-only">Choose a ${ssrInterpolate(optionGroup.name)}</legend><div class="flex"><!--[-->`);
        ssrRenderList(optionGroup.options, (option) => {
          _push(`<label data-testid="product-variant" class="${ssrRenderClass([{
            "border-3 border-indigo-600": isOptionSelected(option.id)
          }, "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 bg-white shadow-sm text-gray-900 cursor-pointer"])}"><p data-testid="product-variant-text"${ssrRenderAttr("id", `${option.id}-choice-label`)}>${ssrInterpolate(option.name)}</p></label>`);
        });
        _push(`<!--]--></div></fieldset></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwVariantConfigurator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementBuyBox",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig(props.content);
    const alignment = computed(() => getConfigValue("alignment"));
    const { taxState, currency } = useSessionContext();
    const { product, changeVariant } = useProduct(
      props.content.data.product,
      props.content.data.configuratorSettings || []
    );
    const price = computed(() => {
      var _a;
      if (product.value) {
        const tierPrices = getProductTierPrices(product.value);
        return ((_a = tierPrices == null ? void 0 : tierPrices[0]) == null ? void 0 : _a.unitPrice) || getProductCalculatedListingPrice(product.value);
      } else {
        return null;
      }
    });
    const referencePrice = computed(
      () => {
        var _a, _b;
        return (_b = (_a = product.value) == null ? void 0 : _a.calculatedPrice) == null ? void 0 : _b.referencePrice;
      }
    );
    const productNumber = computed(() => {
      var _a;
      return (_a = product.value) == null ? void 0 : _a.productNumber;
    });
    const purchaseUnit = computed(() => {
      var _a;
      return (_a = product.value) == null ? void 0 : _a.purchaseUnit;
    });
    const unitName = computed(() => {
      var _a, _b;
      return (_b = (_a = product.value) == null ? void 0 : _a.unit) == null ? void 0 : _b.name;
    });
    const availableStock = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = product.value) == null ? void 0 : _a.availableStock) != null ? _a2 : 0;
    });
    const minPurchase = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = product.value) == null ? void 0 : _a.minPurchase) != null ? _a2 : 0;
    });
    const deliveryTime = computed(() => {
      var _a;
      return (_a = product.value) == null ? void 0 : _a.deliveryTime;
    });
    const restockTime = computed(() => {
      var _a;
      return (_a = product.value) == null ? void 0 : _a.restockTime;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_SharedPrice = _sfc_main$3;
      if (unref(product)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: {
            "h-full flex flex-col": true,
            "justify-start": unref(alignment) === "flex-start",
            "justify-end": unref(alignment) === "flex-end",
            "justify-center": unref(alignment) === "center"
          }
        }, _attrs))}><div>`);
        if (unref(price)) {
          _push(ssrRenderComponent(_component_SharedPrice, {
            value: unref(price),
            class: "font-bold text-2xl text-gray-900 text-left"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(purchaseUnit) && unref(unitName)) {
          _push(`<div class="mt-1"><span class="font-light"> Content: </span><span class="font-light">${ssrInterpolate(unref(purchaseUnit))} ${ssrInterpolate(unref(unitName))}</span>`);
          if (unref(referencePrice)) {
            _push(`<span class="font-light">${ssrInterpolate((_a = unref(currency)) == null ? void 0 : _a.symbol)} ${ssrInterpolate((_b = unref(referencePrice)) == null ? void 0 : _b.price)} / / ${ssrInterpolate((_c = unref(referencePrice)) == null ? void 0 : _c.referenceUnit)} ${ssrInterpolate((_d = unref(referencePrice)) == null ? void 0 : _d.unitName)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-indigo-600">`);
        if (unref(taxState) === "gross") {
          _push(`<!--[--> Prices incl. VAT plus shipping costs <!--]-->`);
        } else {
          _push(`<!--[--> Prices excl. VAT plus shipping costs <!--]-->`);
        }
        _push(`</span></div><div class="mt-4">`);
        if (unref(availableStock) >= unref(minPurchase) && unref(deliveryTime)) {
          _push(`<span>Available, delivery time ${ssrInterpolate((_e = unref(deliveryTime)) == null ? void 0 : _e.name)}</span>`);
        } else if (unref(availableStock) < unref(minPurchase) && unref(deliveryTime) && unref(restockTime)) {
          _push(`<span>Available in ${ssrInterpolate(unref(restockTime))} day, delivery time ${ssrInterpolate((_f = unref(deliveryTime)) == null ? void 0 : _f.name)}</span>`);
        } else {
          _push(`<span>No longer available</span>`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          product: unref(product),
          onChange: unref(changeVariant)
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, { product: unref(product) }, null, _parent));
        _push(`<div class="mt-3 product-detail-ordernumber-container"><span class="font-bold text-gray-900"> Product number: </span><span>${ssrInterpolate(unref(productNumber))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementBuyBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementBuyBox-89f808d8.mjs.map
