import _sfc_main$1 from './CmsElementImageGallery-ee4b5e55.mjs';
import { defineComponent, ref, watch, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import './CmsElementImage-ad2cdd3c.mjs';
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
import './SwSlider-ec4d3269.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductGallery",
  __ssrInlineRender: true,
  props: {
    product: null
  },
  setup(__props) {
    const props = __props;
    const content = ref();
    watch(
      () => props.product,
      (value) => {
        const media = value.media;
        content.value = {
          config: {
            minHeight: {
              value: "300px",
              source: "static"
            },
            navigationArrows: {
              value: "inside",
              source: "static"
            }
          },
          data: {
            sliderItems: media
          }
        };
      },
      {
        immediate: true
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsElementImageGallery = _sfc_main$1;
      if (unref(content)) {
        _push(ssrRenderComponent(_component_CmsElementImageGallery, mergeProps({ content: unref(content) }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductGallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductGallery-cc8d13fa.mjs.map
