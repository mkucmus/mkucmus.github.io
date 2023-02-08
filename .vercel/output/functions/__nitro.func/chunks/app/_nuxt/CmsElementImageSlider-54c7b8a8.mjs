import _sfc_main$2 from './CmsElementImage-ad2cdd3c.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './SwSlider-ec4d3269.mjs';
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
  __name: "CmsElementImageSlider",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const items = computed(() => props.content.data.sliderItems);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsElementImage = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-element-image-slider" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        config: props.content.config
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(items), (image) => {
              _push2(ssrRenderComponent(_component_CmsElementImage, {
                key: image.media.url,
                content: { data: image, config: props.content.config }
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(items), (image) => {
                return openBlock(), createBlock(_component_CmsElementImage, {
                  key: image.media.url,
                  content: { data: image, config: props.content.config }
                }, null, 8, ["content"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementImageSlider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementImageSlider-54c7b8a8.mjs.map
