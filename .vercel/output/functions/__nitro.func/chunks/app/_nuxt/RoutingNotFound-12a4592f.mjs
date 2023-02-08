import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { RouterLink } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RoutingNotFound",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container mx-auto text-center my-20" }, _attrs))}><h1 class="text-4xl font-bold mb-3">Page not found</h1><p class="text-sm mb-3"> We are sorry, the page you&#39;re looking for could not be found. It may no longer exist or may have been moved. </p>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        class: "inline-flex justify-center items-center py-2 px-4 text-base font-medium text-center text-white bg-brand-primary rounded-lg hover:bg-gray-400",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Back to homepage `);
          } else {
            return [
              createTextVNode(" Back to homepage ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/errors/RoutingNotFound.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=RoutingNotFound-12a4592f.mjs.map
