import { defineComponent, inject, unref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderVNode } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SharedModal",
  __ssrInlineRender: true,
  setup(__props) {
    const { close, modalContent, modalProps } = inject(
      "modal"
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(modalContent).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed z-10 inset-0 overflow-y-auto",
          "aria-labelledby": "modal-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div><span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"> \u200B </span><div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-500 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(modalContent)), mergeProps(unref(modalProps), { onClose: unref(close) }), null), _parent);
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SharedModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SharedModal-a1e47874.mjs.map
