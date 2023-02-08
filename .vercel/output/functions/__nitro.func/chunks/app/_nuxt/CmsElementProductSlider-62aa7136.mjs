import { defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { r as useCmsElementConfig } from '../server.mjs';
import { _ as _sfc_main$2 } from './SwProductCard-5c66eb8b.mjs';
import { _ as _sfc_main$1 } from './SwSlider-ec4d3269.mjs';
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
  __name: "CmsElementProductSlider",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig(props.content);
    const productSlider = ref();
    const slidesToShow = ref();
    const products = computed(() => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = props.content) == null ? void 0 : _a.data) == null ? void 0 : _b.products) != null ? _a2 : [];
    });
    const config = computed(() => ({
      minHeight: {
        value: "300px",
        source: "static"
      },
      verticalAlign: {
        source: "static",
        value: getConfigValue("verticalAlign") || ""
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
        value: getConfigValue("navigation") ? "outside" : "",
        source: "static"
      }
    }));
    const autoplay = computed(() => getConfigValue("rotate"));
    const title = computed(() => getConfigValue("title"));
    const border = computed(() => getConfigValue("border"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "productSlider",
        ref: productSlider,
        class: "cms-element-product-slider"
      }, _attrs))}>`);
      if (unref(title)) {
        _push(`<h3 class="mb-5 text-lg font-bold text-gray-700">${ssrInterpolate(unref(title))}</h3>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass({ "py-5 border border-gray-300": unref(border) })}">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        config: unref(config),
        gap: "1.25rem",
        slidesToShow: unref(slidesToShow),
        slidesToScroll: 1,
        autoplay: unref(autoplay)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(products), (product) => {
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: "h-full",
                key: product.id,
                product,
                layoutType: unref(getConfigValue)("boxLayout"),
                displayMode: unref(getConfigValue)("displayMode")
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (product) => {
                return openBlock(), createBlock(_sfc_main$2, {
                  class: "h-full",
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementProductSlider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementProductSlider-62aa7136.mjs.map
