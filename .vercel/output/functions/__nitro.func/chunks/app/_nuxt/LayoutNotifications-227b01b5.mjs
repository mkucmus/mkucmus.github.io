import _sfc_main$1 from './LayoutNotification-859b2f42.mjs';
import { p as useNotifications } from '../server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "LayoutNotifications",
  __ssrInlineRender: true,
  setup(__props) {
    const { notifications, removeOne } = useNotifications();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutNotification = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-testid": "notification-container",
        class: "fixed right-5 bottom-10 sm:top-20 z-50 max-h-fit"
      }, _attrs))}><!--[-->`);
      ssrRenderList(unref(notifications), (notification) => {
        _push(ssrRenderComponent(_component_LayoutNotification, {
          key: notification.id,
          notification,
          "onClick:close": ($event) => unref(removeOne)(notification.id)
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutNotifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutNotifications-227b01b5.mjs.map
