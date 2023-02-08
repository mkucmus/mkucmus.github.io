import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { M as useProductSearchSuggest, b as useBreadcrumbs } from '../server.mjs';
import { ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

const __default__ = {
  name: "ShopwareTeamPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([
      "https://ca.slack-edge.com/T04UKLWGP-UC04NDP6U-cd3e568af126-512",
      "https://ca.slack-edge.com/T04UKLWGP-U019L64GA0N-20cbf24d0fef-512",
      "https://ca.slack-edge.com/T04UKLWGP-UBKPK8MA7-05b74f81ebb0-512",
      "https://ca.slack-edge.com/T04UKLWGP-U018NPJ1DGV-59461971434c-512",
      "https://ca.slack-edge.com/T04UKLWGP-U2CBTH44U-3e217ae809fa-512",
      "https://ca.slack-edge.com/T04UKLWGP-U017HES3HNV-d939ac432cf7-512",
      "https://ca.slack-edge.com/T04UKLWGP-U02N63ET3B2-e8cb6a2b28cc-512",
      "https://ca.slack-edge.com/T04UKLWGP-U01QUP9TR24-1a968e0cdf8a-512",
      "https://ca.slack-edge.com/T04UKLWGP-U01J0D112S0-660da47c5a10-512",
      "https://ca.slack-edge.com/T04UKLWGP-U02132D5JKS-206e488a36a8-512",
      "https://ca.slack-edge.com/T04UKLWGP-U01HACL0RQ9-8d9dfcecfc64-512"
    ]);
    const { search, searchTerm, getTotal, getProducts } = useProductSearchSuggest();
    useBreadcrumbs([
      {
        name: "Shopware",
        path: "/shopware"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex justify-center"><img class="md:w-11/12" src="https://gitlab.shopware.com/product/engineering/platform-group/pwa/frontends/-/raw/main/.readme/shopware-frontends-logo.png" alt="logo"></div><div class="mx-10 mt-10 flex flex-wrap justify-center"><!--[-->`);
      ssrRenderList(unref(images), (image) => {
        _push(`<div class="max-w-30 rounded-full overflow-hidden m-3"><img${ssrRenderAttr("src", image)} alt="Cms image"></div>`);
      });
      _push(`<!--]--><div class="rounded-lg shadow-lg m-10 p-10 flex flex-col"><input${ssrRenderAttr("value", unref(searchTerm))} placeholder="Search a product ..." class="rounded-md p-5 shadow-md mb-5"><button class="rounded-md bg-brand-primary p-3 mb-5 text-white"> Search </button><div class="text-center mb-3">Items found ${ssrInterpolate(unref(getTotal))}</div><div class="text-center"><!--[-->`);
      ssrRenderList(unref(getProducts), (product) => {
        _push(`<div>${ssrInterpolate(product.translated.name)}</div>`);
      });
      _push(`<!--]--></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shopware.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=shopware-8d2678a3.mjs.map
