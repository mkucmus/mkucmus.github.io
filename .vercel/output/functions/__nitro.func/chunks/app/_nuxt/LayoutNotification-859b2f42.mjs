import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutNotification",
  __ssrInlineRender: true,
  props: {
    notification: null
  },
  emits: ["click:close"],
  setup(__props) {
    const props = __props;
    const colorCssMap = {
      info: "blue",
      success: "green",
      warning: "orange",
      danger: "red"
    };
    const iconsMap = {
      info: "information",
      success: "checkmark",
      warning: "warning-alt",
      danger: "close-outline"
    };
    const themeTypeColor = computed(
      () => colorCssMap[props.notification.type] || "blue"
    );
    const icon = computed(() => iconsMap[props.notification.type] || "information");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: `toast-${__props.notification.id}`,
        "data-testid": `notification-element-${__props.notification.type}`,
        class: "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",
        role: "alert"
      }, _attrs))}><div class="${ssrRenderClass([`text-${unref(themeTypeColor)}-500 bg-${unref(themeTypeColor)}-100 dark:bg-${unref(themeTypeColor)}-800 dark:text-${unref(themeTypeColor)}-200`, "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"])}"><div class="${ssrRenderClass(`w-5 h-5 i-carbon-${unref(icon)}`)}"></div></div><div data-testid="notification-element-message" class="ml-3 text-sm font-normal">${ssrInterpolate(__props.notification.message)}</div><button data-testid="notification-element-button" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"${ssrRenderAttr("data-dismiss-target", `toast-${__props.notification.id}`)} aria-label="Close"><span class="sr-only">Close</span><div class="w-5 h-5 i-carbon-close"></div></button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutNotification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LayoutNotification-859b2f42.mjs.map
