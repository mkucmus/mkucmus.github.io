import { defineComponent, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { F as isProduct, E as getMainImageUrl } from '../server.mjs';
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
  __name: "AccountOrderItem",
  __ssrInlineRender: true,
  props: {
    orderItem: null
  },
  setup(__props) {
    const props = __props;
    const isPromotion = computed(() => isProduct(props.orderItem.payload));
    const itemRegularPrice = computed(() => {
      var _a;
      return (_a = props.orderItem) == null ? void 0 : _a.unitPrice;
    });
    const itemQuantity = computed(() => {
      var _a;
      return (_a = props.orderItem) == null ? void 0 : _a.quantity;
    });
    const productOptions = computed(
      () => isProduct(props.orderItem.payload) ? props.orderItem.payload.options : []
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (!unref(isPromotion)) {
        _push(`<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"><img${ssrRenderAttr("src", unref(getMainImageUrl)(__props.orderItem))} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="ml-4 flex flex-1 flex-col"><div><div class="flex justify-between text-base font-medium text-gray-900"><h3>${ssrInterpolate(__props.orderItem.label)}</h3><p class="ml-4">${ssrInterpolate(unref(itemRegularPrice))} EUR</p></div><p class="mt-1 text-sm text-gray-500"><!--[-->`);
      ssrRenderList(unref(productOptions), (option) => {
        _push(`<span class="mr-2">${ssrInterpolate(option.group)}: ${ssrInterpolate(option.option)}</span>`);
      });
      _push(`<!--]--></p></div><div class="flex flex-1 items-end justify-between text-sm"><p class="text-gray-500">Qty ${ssrInterpolate(unref(itemQuantity))}</p></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountOrderItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountOrderItem-66121fef.mjs.map
