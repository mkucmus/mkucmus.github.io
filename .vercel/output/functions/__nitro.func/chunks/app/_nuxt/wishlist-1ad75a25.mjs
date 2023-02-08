import _sfc_main$1 from './ProductCard-dd6a11cf.mjs';
import { C as useWishlist, h as useShopwareContext, b as useBreadcrumbs, a8 as getProducts, _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import './SharedListingProductPrice-ec1574ad.mjs';
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

const __default__ = {
  name: "WishlistPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const { items } = useWishlist();
    const { apiInstance } = useShopwareContext();
    const products = ref([]);
    const isLoading = ref(false);
    useBreadcrumbs([
      {
        name: "Wishlist",
        path: "/wishlist"
      }
    ]);
    const loadProductsByItemIds = async (itemIds) => {
      isLoading.value = true;
      try {
        const result = await getProducts(
          {
            ids: itemIds || items.value
          },
          apiInstance
        );
        if (result) {
          products.value = result.elements;
        }
      } catch (error) {
        console.error(
          "[wishlist][loadProductsByItemIds]",
          error.messages
        );
      }
      isLoading.value = false;
    };
    watch(
      items,
      (items2, oldItems) => {
        if (items2.length !== (oldItems == null ? void 0 : oldItems.length)) {
          products.value = products.value.filter(({ id }) => items2.includes(id));
        }
        if (!items2.length) {
          return;
        }
        loadProductsByItemIds(items2);
      },
      {
        immediate: true
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$1;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "wishlist-page",
        "data-testid": "wishlist-wrapper"
      }, _attrs))}><div class="max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">`);
      if (unref(products).length) {
        _push(`<div><h1 class="my-3 text-3xl font-extrabold">Wishlist</h1><div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"><!--[-->`);
        ssrRenderList(unref(products), (product) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: product.id,
            product
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="flex flex-col items-center col mx-auto" data-testid="wishlist-empty"><div class="w-48 h-48 i-carbon-favorite"></div><h1 class="my-3 text-3xl font-extrabold">Wishlist is empty</h1><p class="my-4">No products were added to the Wishlist.</p>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/",
          class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary",
          "date-testid": "wishlist-empty-continue-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue Shopping `);
            } else {
              return [
                createTextVNode(" Continue Shopping ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wishlist-1ad75a25.mjs.map
