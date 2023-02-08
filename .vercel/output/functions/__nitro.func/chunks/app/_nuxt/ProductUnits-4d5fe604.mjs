import _sfc_main$1 from './SharedPrice-64255154.mjs';
import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import '../server.mjs';
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
  __name: "ProductUnits",
  __ssrInlineRender: true,
  props: {
    product: null,
    showContent: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const purchaseUnit = computed(() => {
      var _a;
      return (_a = props.product) == null ? void 0 : _a.purchaseUnit;
    });
    const unitName = computed(() => {
      var _a, _b, _c;
      return (_c = (_b = (_a = props.product) == null ? void 0 : _a.unit) == null ? void 0 : _b.translated) == null ? void 0 : _c.name;
    });
    const referencePrice = computed(
      () => {
        var _a, _b, _c;
        return (_c = (_b = (_a = props.product) == null ? void 0 : _a.calculatedPrice) == null ? void 0 : _b.referencePrice) == null ? void 0 : _c.price;
      }
    );
    const referenceUnit = computed(
      () => {
        var _a, _b, _c;
        return (_c = (_b = (_a = props.product) == null ? void 0 : _a.calculatedPrice) == null ? void 0 : _b.referencePrice) == null ? void 0 : _c.referenceUnit;
      }
    );
    const referenceUnitName = computed(
      () => {
        var _a, _b, _c;
        return (_c = (_b = (_a = props.product) == null ? void 0 : _a.calculatedPrice) == null ? void 0 : _b.referencePrice) == null ? void 0 : _c.unitName;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SharedPrice = _sfc_main$1;
      if (unref(purchaseUnit)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex text-gray-500 justify-end gap-1" }, _attrs))}>`);
        if (props.showContent) {
          _push(`<!--[--> Content: ${ssrInterpolate(unref(purchaseUnit))} ${ssrInterpolate(unref(unitName))}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (unref(referencePrice)) {
          _push(`<!--[--> ( `);
          _push(ssrRenderComponent(_component_SharedPrice, { value: unref(referencePrice) }, null, _parent));
          _push(` / ${ssrInterpolate(unref(referenceUnit))} ${ssrInterpolate(unref(referenceUnitName))} ) <!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductUnits.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductUnits-4d5fe604.mjs.map
