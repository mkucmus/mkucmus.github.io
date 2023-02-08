import _sfc_main$1 from './CmsElementImage-ad2cdd3c.mjs';
import CmsElementText from './CmsElementText-2b33c86c.mjs';
import { V as useCmsBlock } from '../server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import 'entities';
import './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsBlockImageTextGallery",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getSlotContent } = useCmsBlock(props.content);
    const leftTextContent = getSlotContent("left-text");
    const rightTextContent = getSlotContent("right-text");
    const centerTextContent = getSlotContent("center-text");
    const leftImageContent = getSlotContent("left-image");
    const rightImageContent = getSlotContent("right-image");
    const centerImageContent = getSlotContent("center-image");
    function onImageClick(slotContent) {
      var _a, _b;
      if ((_a = slotContent.data) == null ? void 0 : _a.url) {
        if ((_b = slotContent.data) == null ? void 0 : _b.newTab) {
          window.open(slotContent.data.url);
        } else {
          window.location.href = slotContent.data.url;
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_CmsElementImage = _sfc_main$1;
      const _component_CmsElementText = CmsElementText;
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: "cms-block-image-text-gallery",
        style: { backgroundColor: __props.content.backgroundColor || "" }
      }, _attrs))}><div class="cms-block-image-text-gallery__container"><div class="cms-block-image-text-gallery__container__column">`);
      _push(ssrRenderComponent(_component_CmsElementImage, {
        content: unref(leftImageContent),
        style: { cursor: ((_a = unref(leftImageContent).data) == null ? void 0 : _a.url) && "pointer" },
        onClick: ($event) => onImageClick(unref(leftImageContent))
      }, null, _parent));
      _push(ssrRenderComponent(_component_CmsElementText, {
        content: unref(leftTextContent),
        class: "cms-block-imag)e-text-gallery__container__column--text"
      }, null, _parent));
      _push(`</div><div class="cms-block-image-text-gallery__container__column">`);
      _push(ssrRenderComponent(_component_CmsElementImage, {
        content: unref(centerImageContent),
        style: { cursor: ((_b = unref(centerImageContent).data) == null ? void 0 : _b.url) && "pointer" },
        onClick: ($event) => onImageClick(unref(centerImageContent))
      }, null, _parent));
      _push(ssrRenderComponent(_component_CmsElementText, {
        content: unref(centerTextContent),
        class: "cms-block-image-text-gallery__container__column--text"
      }, null, _parent));
      _push(`</div><div class="cms-block-image-text-gallery__container__column">`);
      _push(ssrRenderComponent(_component_CmsElementImage, {
        content: unref(rightImageContent),
        style: { cursor: ((_c = unref(rightImageContent).data) == null ? void 0 : _c.url) && "pointer" },
        onClick: ($event) => onImageClick(unref(rightImageContent))
      }, null, _parent));
      _push(ssrRenderComponent(_component_CmsElementText, {
        content: unref(rightTextContent),
        class: "cms-block-image-text-gallery__container__column--text"
      }, null, _parent));
      _push(`</div></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/block/CmsBlockImageTextGallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsBlockImageTextGallery-8d48a716.mjs.map
