import { useSSRContext, defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList } from 'vue';
import { r as useCmsElementConfig, t as useElementSize } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './SwProductCard-5c66eb8b.mjs';
import { _ as _sfc_main$1 } from './SwSlider-ec4d3269.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
import './client-only-67b331e0.mjs';
import './SharedPrice-64255154.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementCrossSelling",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig(props.content);
    const currentTabIndex = ref(0);
    const crossSellContainer = ref();
    const config = computed(() => ({
      minHeight: {
        value: "300px",
        source: "static"
      },
      displayMode: {
        value: "contain",
        source: "static"
      },
      navigationDots: {
        value: "",
        source: "static"
      },
      navigationArrows: {
        value: "outside",
        source: "static"
      }
    }));
    const crossSellCollections = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = props.content) == null ? void 0 : _a.data) == null ? void 0 : _b.crossSellings) == null ? void 0 : _c.filter(
        (collection) => {
          var _a2;
          return !!((_a2 = collection == null ? void 0 : collection.products) == null ? void 0 : _a2.length);
        }
      )) || [];
    });
    const { width } = useElementSize(crossSellContainer);
    const slidesToShow = computed(() => {
      const minWidth = +getConfigValue("elMinWidth").replace(/\D+/g, "");
      return Math.floor(width.value / (minWidth * 1.2));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "crossSellContainer",
        ref: crossSellContainer,
        class: "cms-element-cross-selling"
      }, _attrs))} data-v-43254ef2><div class="flex gap-10 mb-5" data-v-43254ef2><!--[-->`);
      ssrRenderList(unref(crossSellCollections), (collection, index) => {
        _push(`<a class="${ssrRenderClass([{
          "border-b-3 border-brand-primary text-brand-primary": unref(currentTabIndex) === index
        }, "transition text-lg font-bold text-gray-700 cursor-pointer"])}" data-v-43254ef2>${ssrInterpolate(collection.crossSelling.name)}</a>`);
      });
      _push(`<!--]--></div>`);
      if (unref(crossSellCollections).length) {
        _push(ssrRenderComponent(_sfc_main$1, {
          config: unref(config),
          gap: "1.25rem",
          slidesToShow: unref(slidesToShow),
          slidesToScroll: 1,
          autoplay: false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(crossSellCollections)[unref(currentTabIndex)].products, (product) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  class: "h-[600px]",
                  key: product.id,
                  product,
                  layoutType: unref(getConfigValue)("boxLayout"),
                  displayMode: unref(getConfigValue)("displayMode")
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(crossSellCollections)[unref(currentTabIndex)].products, (product) => {
                  return openBlock(), createBlock(_sfc_main$2, {
                    class: "h-[600px]",
                    key: product.id,
                    product,
                    layoutType: unref(getConfigValue)("boxLayout"),
                    displayMode: unref(getConfigValue)("displayMode")
                  }, null, 8, ["product", "layoutType", "displayMode"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementCrossSelling.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CmsElementCrossSelling = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43254ef2"]]);

export { CmsElementCrossSelling as default };
//# sourceMappingURL=CmsElementCrossSelling-97a5f95f.mjs.map
