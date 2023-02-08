import { p as useNotifications, y as useAddress, z as useUser, A as useSessionContext } from '../server.mjs';
import { defineComponent, inject, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "AccountAddressCard",
  __ssrInlineRender: true,
  props: {
    address: null,
    countries: null,
    salutations: null,
    canSetDefault: { type: Boolean, default: true },
    canEdit: { type: Boolean, default: true },
    canDelete: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    useNotifications();
    useAddress();
    const { defaultBillingAddressId, defaultShippingAddressId } = useUser();
    useSessionContext();
    inject("modal");
    const canBeDeleted = computed(
      () => props.canDelete && defaultShippingAddressId.value !== props.address.id && defaultBillingAddressId.value !== props.address.id
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-span-6 lg:col-span-3 max-w-md" }, _attrs))}><div class="flex items-center mb-2"><h5 class="text-xl leading-none text-gray-900 mr-2">${ssrInterpolate(`${__props.address.firstName} ${__props.address.lastName}`)}</h5>`);
      if (__props.canEdit) {
        _push(`<div class="cursor-pointer i-carbon-edit text-xl inline-block"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(canBeDeleted)) {
        _push(`<div class="i-carbon-delete text-xl inline-block cursor-pointer ml-2"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flow-root"><span class="block">${ssrInterpolate(__props.address.street)}</span><span class="block">${ssrInterpolate(__props.address.zipcode)}</span><span class="block">${ssrInterpolate(__props.address.city)}</span></div>`);
      if (__props.canSetDefault) {
        _push(`<div>`);
        if (unref(defaultShippingAddressId) !== __props.address.id) {
          _push(`<a role="button" tabindex="0" class="block text-sm mt-4 font-medium text-blue-600 hover:underline"> Set as default shipping address </a>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(defaultBillingAddressId) !== __props.address.id) {
          _push(`<a role="button" tabindex="0" class="block text-sm mt-2 font-medium text-blue-600 hover:underline"> Set as default billing address </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountAddressCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccountAddressCard-3e3f1e4a.mjs.map
