import _sfc_main$2 from './CmsElementImage-ad2cdd3c.mjs';
import { r as useCmsElementConfig } from '../server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementImageGallery",
  __ssrInlineRender: true,
  props: {
    content: null,
    slidesToShow: { default: 5 },
    slidesToScroll: { default: 4 }
  },
  setup(__props) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig(props.content);
    const speed = ref(300);
    const currentIndex = ref(0);
    const currentThumb = ref(0);
    const imageSlider = ref();
    ref();
    const isLoading = ref(true);
    const imageThumbsTrackStyle = ref({});
    ref();
    const imageThumbsStyle = ref({});
    const mediaGallery = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = props.content.data) == null ? void 0 : _a.sliderItems) != null ? _a2 : [];
    });
    const galleryPosition = computed(
      () => {
        var _a;
        return (_a = getConfigValue("galleryPosition")) != null ? _a : "left";
      }
    );
    const scrollPx = ref(0);
    function handleChangeSlide(e) {
      currentIndex.value = e;
      if (currentIndex.value > currentThumb.value + props.slidesToShow - 1) {
        move("next", currentIndex.value);
        return;
      }
      if (currentIndex.value < currentThumb.value) {
        move("previous", currentIndex.value);
        return;
      }
    }
    function move(type, specificIndex) {
      let step;
      const index = typeof specificIndex !== "number" ? parseInt(specificIndex) : specificIndex;
      if (index >= 0) {
        if (type === "next") {
          step = index + props.slidesToScroll < mediaGallery.value.length ? index : mediaGallery.value.length - props.slidesToShow;
        } else {
          step = index - props.slidesToScroll > 0 ? index - props.slidesToScroll : 0;
        }
      } else {
        if (type === "next") {
          step = currentThumb.value + props.slidesToShow - 1 + props.slidesToScroll < mediaGallery.value.length ? currentThumb.value + props.slidesToScroll : mediaGallery.value.length - props.slidesToShow;
        } else {
          step = currentThumb.value - props.slidesToScroll > 0 ? currentThumb.value - props.slidesToScroll : 0;
        }
      }
      currentThumb.value = step;
      let xAxis = 0;
      let yAxis = 0;
      if (galleryPosition.value === "left") {
        yAxis = scrollPx.value * currentThumb.value;
      } else {
        xAxis = scrollPx.value * currentThumb.value;
      }
      imageThumbsTrackStyle.value = {
        ...imageThumbsTrackStyle.value,
        transform: `translate3d(-${xAxis}px, -${yAxis}px, 0px)`,
        transition: `transform ${speed.value}ms ease 0s`
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CmsElementImage = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: {
          "opacity-0": unref(isLoading),
          "flex gap-10": true,
          "flex-col-reverse": unref(galleryPosition) === "underneath"
        }
      }, _attrs))}><div class="${ssrRenderClass({
        "basis-20 relative flex flex-col items-center": unref(galleryPosition) === "left",
        "flex relative w-full": unref(galleryPosition) === "underneath"
      })}">`);
      if (unref(mediaGallery).length > __props.slidesToShow) {
        _push(`<button${ssrIncludeBooleanAttr(unref(currentThumb) <= 0) ? " disabled" : ""} class="disabled:opacity-10 p-1"><div class="${ssrRenderClass([{
          "i-carbon-chevron-up": unref(galleryPosition) === "left",
          "i-carbon-chevron-left": unref(galleryPosition) !== "left"
        }, "h-7 w-7"])}"></div></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="overflow-hidden -my-2.5" style="${ssrRenderStyle(unref(imageThumbsStyle))}"><div class="${ssrRenderClass({
        flex: true,
        "flex-col": unref(galleryPosition) === "left"
      })}" style="${ssrRenderStyle(unref(imageThumbsTrackStyle))}"><!--[-->`);
      ssrRenderList(unref(mediaGallery), (image, i) => {
        _push(`<div class="${ssrRenderClass({
          "py-2.5": unref(galleryPosition) === "left",
          "flex-1 px-2.5": unref(galleryPosition) === "underneath"
        })}"><div class="${ssrRenderClass([{
          border: i !== unref(currentIndex),
          "border-indigo-500 border-3": i === unref(currentIndex)
        }, "h-20 overflow-hidden cursor-pointer p-1 border-gray-200 rounded transition duration-150 ease-in-out"])}"><img${ssrRenderAttr("src", image.media.url)} class="w-full h-full object-center object-cover" alt="Product image"></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(mediaGallery).length > __props.slidesToShow) {
        _push(`<button${ssrIncludeBooleanAttr(unref(currentThumb) + __props.slidesToShow >= unref(mediaGallery).length) ? " disabled" : ""} class="disabled:opacity-10 p-1"><div class="${ssrRenderClass([{
          "i-carbon-chevron-down": unref(galleryPosition) === "left",
          "i-carbon-chevron-right": unref(galleryPosition) !== "left"
        }, "h-7 w-7"])}"></div></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex-1 overflow-hidden">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "imageSlider",
        ref: imageSlider,
        config: props.content.config,
        onChangeSlide: handleChangeSlide
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(mediaGallery), (image) => {
              _push2(ssrRenderComponent(_component_CmsElementImage, {
                key: image.media.url,
                content: { data: image, config: props.content.config }
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(mediaGallery), (image) => {
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementImageGallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementImageGallery-ee4b5e55.mjs.map
