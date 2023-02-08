import { defineComponent, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderAttrs } from 'vue/server-renderer';
import { s as useCmsElementImage } from '../server.mjs';
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
  __name: "CmsElementImage",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const {
      containerStyle,
      displayMode,
      imageContainerAttrs,
      imageAttrs,
      imageLink
    } = useCmsElementImage(props.content);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(imageLink).url ? "a" : "div"), mergeProps({
        class: "cms-element-image relative",
        style: unref(containerStyle)
      }, unref(imageContainerAttrs), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttrs(mergeProps({
              class: {
                "h-full w-full": true,
                "absolute inset-0": ["cover", "stretch"].includes(unref(displayMode)),
                "object-cover": unref(displayMode) === "cover"
              }
            }, unref(imageAttrs), { alt: "Image link" }))}${_scopeId}>`);
          } else {
            return [
              createVNode("img", mergeProps({
                class: {
                  "h-full w-full": true,
                  "absolute inset-0": ["cover", "stretch"].includes(unref(displayMode)),
                  "object-cover": unref(displayMode) === "cover"
                }
              }, unref(imageAttrs), { alt: "Image link" }), null, 16)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementImage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementImage-ad2cdd3c.mjs.map
