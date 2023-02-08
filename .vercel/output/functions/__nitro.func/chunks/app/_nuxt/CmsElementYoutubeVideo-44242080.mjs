import { r as useCmsElementConfig } from '../server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
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
  __name: "CmsElementYoutubeVideo",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const { getConfigValue } = useCmsElementConfig(props.content);
    const config = computed(() => ({
      videoID: getConfigValue("videoID"),
      relatedVideos: "rel=0&",
      loop: getConfigValue("loop") ? `loop=1&playlist=${getConfigValue("videoID")}&` : "",
      showControls: getConfigValue("showControls") ? "controls=0&" : "",
      start: parseInt(getConfigValue("start")) !== 0 ? `start=${getConfigValue("start")}&` : "",
      end: parseInt(getConfigValue("end")) !== 0 ? `end=${getConfigValue("end")}&` : "",
      disableKeyboard: "disablekb=1"
    }));
    const videoUrl = `https://www.youtube-nocookie.com/embed/            ${config.value.videoID}?            ${config.value.relatedVideos}            ${config.value.loop}            ${config.value.showControls}            ${config.value.start}            ${config.value.end}            ${config.value.disableKeyboard}`.replace(/ /g, "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-element-youtube-video" }, _attrs))}><iframe class="w-full inset-0 aspect-video"${ssrRenderAttr("src", unref(videoUrl))}> </iframe></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementYoutubeVideo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementYoutubeVideo-44242080.mjs.map
