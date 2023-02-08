import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SharedPagination",
  __ssrInlineRender: true,
  props: {
    total: null,
    current: null
  },
  emits: ["changePage"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.total > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white justify-center px-4 py-3 flex border-t border-gray-200 sm:px-6" }, _attrs))}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">`);
        if (__props.current - 1 >= 1) {
          _push(`<button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><span class="sr-only">Previous</span><div class="w-5 h-5 i-carbon-chevron-left"></div></button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.current > 2) {
          _push(`<button aria-current="page" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.current - 1 > 2) {
          _push(`<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.current > 1) {
          _push(`<button aria-current="page" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.current - 1)}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button aria-current="page" class="bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.current)}</button>`);
        if (__props.current < __props.total) {
          _push(`<button aria-current="page" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.current + 1)}</button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.total - __props.current > 2) {
          _push(`<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.total - __props.current > 1) {
          _push(`<button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">${ssrInterpolate(__props.total)}</button>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.total > __props.current + 1) {
          _push(`<button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><span class="sr-only">Next</span><div class="w-5 h-5 i-carbon-chevron-right"></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</nav></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SharedPagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SharedPagination-78e532a6.mjs.map
