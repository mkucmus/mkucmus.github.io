import _sfc_main$1 from './AccountResetPasswordForm-aed7363f.mjs';
import { b as useBreadcrumbs, _ as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, mergeProps, withCtx, createTextVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import '../../index.esm.mjs';
import '@vuelidate/validators';
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

const _sfc_main = {
  name: "ResetPassword"
};
useBreadcrumbs([
  {
    name: "Password reset",
    path: "/reset-password"
  }
]);
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AccountResetPasswordForm = _sfc_main$1;
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "reset-password-wrapper" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AccountResetPasswordForm, null, {
    action: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_nuxt_link, {
          to: "/",
          class: "w-full flex justify-center py-2 px-4 border border-brand-primary text-sm font-medium rounded-md text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Return to Homepage `);
            } else {
              return [
                createTextVNode(" Return to Homepage ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_nuxt_link, {
            to: "/",
            class: "w-full flex justify-center py-2 px-4 border border-brand-primary text-sm font-medium rounded-md text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
          }, {
            default: withCtx(() => [
              createTextVNode(" Return to Homepage ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { resetPassword as default };
//# sourceMappingURL=reset-password-8ffffc96.mjs.map
