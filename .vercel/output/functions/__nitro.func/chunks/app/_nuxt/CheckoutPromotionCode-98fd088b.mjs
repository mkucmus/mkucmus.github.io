import { J as useCart } from '../server.mjs';
import { defineComponent, computed, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "CheckoutPromotionCode",
  __ssrInlineRender: true,
  setup(__props) {
    const { appliedPromotionCodes, addPromotionCode, removeItem } = useCart();
    const showPromotionCodes = computed(
      () => appliedPromotionCodes.value.length > 0
    );
    const promoCode = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-4"><input${ssrRenderAttr("value", unref(promoCode))} type="text" name="promoCode" placeholder="Enter promo code" class="border rounded-md py-2 px-4 border-solid border-1 border-cyan-600 w-full"></div>`);
      if (unref(showPromotionCodes)) {
        _push(`<div><div>Applied promo codes:</div><ul role="list" class="text-sm pl-0"><!--[-->`);
        ssrRenderList(unref(appliedPromotionCodes), (appliedPromotionCode) => {
          _push(`<li class="flex justify-between text-gray-600 border-b py-4"><span>${ssrInterpolate(appliedPromotionCode.label)}</span><button class="text-brand-dark" type="button"> Remove </button></li>`);
        });
        _push(`<!--]--></ul></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/checkout/CheckoutPromotionCode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CheckoutPromotionCode-98fd088b.mjs.map
