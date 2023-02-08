import { n as usePrice } from '../server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "SharedPrice",
  __ssrInlineRender: true,
  props: {
    value: null
  },
  setup(__props) {
    const props = __props;
    const { getFormattedPrice } = usePrice();
    const getPrice = computed(() => getFormattedPrice(props.value));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({ class: "flex gap-1" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "beforePrice", {}, null, _push, _parent);
      _push(`<span>${ssrInterpolate(unref(getPrice))}</span>`);
      ssrRenderSlot(_ctx.$slots, "afterPrice", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SharedPrice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SharedPrice-64255154.mjs.map
