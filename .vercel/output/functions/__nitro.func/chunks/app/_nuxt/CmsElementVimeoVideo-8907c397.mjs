import { r as useCmsElementConfig } from '../server.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "CmsElementVimeoVideo",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig(props.content);
    const vimeoConfigMapping = {
      byLine: "byline",
      color: "color",
      doNotTrack: "dnt",
      loop: "loop",
      mute: "mute",
      title: "title",
      portrait: "portrait",
      controls: "controls",
      videoID: "videoID",
      autoplay: "autoplay",
      previewMedia: "previewMedia",
      needsConfirmation: "needsConfirmation"
    };
    const videoUrl = ref(
      `https://player.vimeo.com/video/${getConfigValue("videoID")}?`
    );
    const convertAttr = function(value, configKey) {
      if (configKey == "color")
        return value ? `${vimeoConfigMapping[configKey]}=${value}&`.replace("#", "") : "";
      return value ? `${vimeoConfigMapping[configKey]}=${value}&` : "";
    };
    for (const key in props.content.config) {
      if (vimeoConfigMapping.hasOwnProperty(key)) {
        videoUrl.value += convertAttr(
          props.content.config[key].value,
          key
        );
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-element-vimeo-video" }, _attrs))}><iframe class="w-full inset-0 aspect-video"${ssrRenderAttr("src", videoUrl.value.replace(/ /g, ""))}>
    </iframe></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementVimeoVideo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementVimeoVideo-8907c397.mjs.map
