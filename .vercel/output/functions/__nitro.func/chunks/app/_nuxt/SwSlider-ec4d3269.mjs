import { defineComponent, useSlots, computed, ref, watch, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { r as useCmsElementConfig, t as useElementSize } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrRenderVNode } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SwSlider",
  __ssrInlineRender: true,
  props: {
    config: null,
    slidesToShow: { default: 1 },
    slidesToScroll: { default: 1 },
    gap: { default: "0px" },
    autoplay: { type: Boolean, default: false },
    autoplaySpeed: { default: 3e3 }
  },
  emits: ["changeSlide"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig({
      config: props.config
    });
    const slots = useSlots();
    const childrenRaw = computed(
      () => {
        var _a2;
        var _a;
        return (_a2 = (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)[0].children) != null ? _a2 : [];
      }
    );
    const slidesToScroll = computed(
      () => props.slidesToScroll >= props.slidesToShow ? props.slidesToShow : props.slidesToScroll
    );
    const slidesToShow = computed(
      () => props.slidesToShow >= childrenRaw.value.length ? childrenRaw.value.length : props.slidesToShow
    );
    const children = computed(() => {
      if (childrenRaw.value.length === 0)
        return [];
      return [
        ...childrenRaw.value.slice(-slidesToShow.value),
        ...childrenRaw.value,
        ...childrenRaw.value.slice(0, slidesToShow.value)
      ];
    });
    const imageSlider = ref();
    const imageSliderTrackStyle = ref({});
    const activeSlideIndex = ref(0);
    const speed = ref(300);
    const imageSliderTrack = ref();
    const autoPlayInterval = ref();
    const isReady = ref();
    const isSliding = ref();
    const { width: imageSliderWidth } = useElementSize(imageSlider);
    watch(
      () => props.autoplay,
      (value) => {
        if (value) {
          autoPlayInterval.value = setInterval(() => {
            next();
          }, props.autoplaySpeed);
        } else {
          if (autoPlayInterval.value) {
            clearInterval(autoPlayInterval.value);
          }
        }
      },
      {
        immediate: true
      }
    );
    const imageSliderStyle = computed(() => {
      if (getConfigValue("displayMode") === "cover") {
        return {
          height: getConfigValue("minHeight"),
          margin: `0 -${props.gap}`
        };
      } else {
        return {
          minHeight: getConfigValue("minHeight")
        };
      }
    });
    const verticalAlignValue = computed(
      () => getConfigValue("verticalAlign") || "flex-start"
    );
    const displayModeValue = computed(
      () => getConfigValue("displayMode") || "standard"
    );
    const navigationArrowsValue = computed(
      () => {
        var _a, _b;
        return ((_b = (_a = props.config) == null ? void 0 : _a.navigationArrows) == null ? void 0 : _b.value) || "none";
      }
    );
    const navigationDotsValue = computed(
      () => {
        var _a, _b;
        return ((_b = (_a = props.config) == null ? void 0 : _a.navigationDots) == null ? void 0 : _b.value) || "none";
      }
    );
    function buildImageSliderTrackStyle(transformIndex, moving = false, callback = () => {
    }) {
      var _a, _b;
      let styleObj = {
        transform: `translate3d(-${(transformIndex + slidesToShow.value) * (imageSliderWidth.value / slidesToShow.value)}px, 0px, 0px)`,
        width: `${children.value.length * imageSliderWidth.value}px`
      };
      if ((_a = imageSliderTrackStyle.value) == null ? void 0 : _a.height) {
        styleObj.height = (_b = imageSliderTrackStyle.value) == null ? void 0 : _b.height;
      }
      if (moving) {
        styleObj = {
          ...styleObj,
          transition: `transform ${speed.value}ms ease 0s`
        };
        imageSliderTrackStyle.value = { ...styleObj };
        isSliding.value = true;
        setTimeout(() => {
          delete styleObj.transition;
          imageSliderTrackStyle.value = { ...styleObj };
          isSliding.value = false;
          callback();
        }, speed.value);
      } else {
        imageSliderTrackStyle.value = { ...styleObj };
      }
      setTimeout(() => {
        var _a2, _b2;
        let height = "unset";
        if (displayModeValue.value === "cover") {
          height = "100%";
        } else if (displayModeValue.value === "standard") {
          const childComponent = (_a2 = imageSliderTrack.value) == null ? void 0 : _a2.children[transformIndex + 1];
          height = (childComponent == null ? void 0 : childComponent.children[0].children[0].clientHeight) ? `${childComponent.clientHeight}px` : height = `auto`;
        } else if (displayModeValue.value === "contain") {
          height = `${(_b2 = imageSliderTrack.value) == null ? void 0 : _b2.clientHeight}px`;
        }
        styleObj = {
          ...styleObj,
          height
        };
        imageSliderTrackStyle.value = { ...styleObj };
      });
    }
    function next() {
      if (isSliding.value)
        return;
      activeSlideIndex.value = activeSlideIndex.value + slidesToScroll.value;
      buildImageSliderTrackStyle(activeSlideIndex.value, true, () => {
        if (activeSlideIndex.value === children.value.length - slidesToShow.value * 2) {
          activeSlideIndex.value = 0;
          buildImageSliderTrackStyle(activeSlideIndex.value);
        }
        emit("changeSlide", activeSlideIndex.value);
      });
    }
    function previous() {
      if (isSliding.value)
        return;
      activeSlideIndex.value = activeSlideIndex.value - slidesToScroll.value;
      buildImageSliderTrackStyle(activeSlideIndex.value, true, () => {
        if (activeSlideIndex.value <= 0 - slidesToShow.value) {
          activeSlideIndex.value = children.value.length - slidesToShow.value * 3;
          buildImageSliderTrackStyle(activeSlideIndex.value);
        }
        emit("changeSlide", activeSlideIndex.value);
      });
    }
    function goToSlide(index) {
      if (isSliding.value)
        return;
      if (activeSlideIndex.value === index)
        return;
      activeSlideIndex.value = index;
      buildImageSliderTrackStyle(activeSlideIndex.value, true);
      emit("changeSlide", activeSlideIndex.value);
    }
    expose({
      next,
      previous,
      goToSlide
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: {
          "relative overflow-hidden": true,
          "px-10": unref(navigationArrowsValue) === "outside",
          "pb-15": unref(navigationDotsValue) === "outside",
          "opacity-0": !unref(isReady)
        }
      }, _attrs))}><div class="overflow-hidden" style="${ssrRenderStyle(unref(imageSliderStyle))}"><div class="${ssrRenderClass({
        flex: true,
        "items-center": unref(displayModeValue) === "contain" && unref(verticalAlignValue) === "center",
        "items-start": unref(displayModeValue) === "contain" && unref(verticalAlignValue) === "flex-start",
        "items-end": unref(displayModeValue) === "contain" && unref(verticalAlignValue) === "flex-end"
      })}" style="${ssrRenderStyle(unref(imageSliderTrackStyle))}"><!--[-->`);
      ssrRenderList(unref(children), (child, index) => {
        _push(`<div${ssrRenderAttr("index", index - unref(slidesToShow))} style="${ssrRenderStyle({
          width: unref(imageSliderWidth) ? `${unref(imageSliderWidth) / unref(slidesToShow)}px` : "auto",
          padding: `0 ${__props.gap}`,
          height: unref(displayModeValue) === "standard" ? "min-content" : "100%"
        })}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(child), null, null), _parent);
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="${ssrRenderClass({ hidden: unref(navigationArrowsValue) === "none" })}"><button aria-label="Chevron left" class="${ssrRenderClass({
        "absolute top-1/2 left-0 transform -translate-y-1/2 py-4": true,
        "transition bg-white/20 hover:bg-white/50": unref(navigationArrowsValue) === "inside"
      })}"><div class="w-15 h-15 i-carbon-chevron-left"></div></button><button aria-label="Chevron right" class="${ssrRenderClass({
        "absolute top-1/2 right-0 transform -translate-y-1/2 py-4": true,
        "transition bg-white/20 hover:bg-white/50": unref(navigationArrowsValue) === "inside"
      })}"><div class="w-15 h-15 i-carbon-chevron-right"></div></button></div><div class="${ssrRenderClass({
        "absolute bottom-5 left-1/2 transform -translate-x-1/2 gap-5": true,
        flex: unref(navigationDotsValue) !== "none",
        hidden: unref(navigationDotsValue) === "none"
      })}"><!--[-->`);
      ssrRenderList(unref(childrenRaw), (dot, i) => {
        _push(`<div class="${ssrRenderClass({
          "w-5 h-5 rounded-full cursor-pointer": true,
          "bg-gray-100": i === unref(activeSlideIndex),
          "bg-gray-500/50": i !== unref(activeSlideIndex)
        })}"></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwSlider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SwSlider-ec4d3269.mjs.map
