import { x as useCategory, K as useNavigation, Y as getCategoryUrl, i as getTranslatedProperty } from '../server.mjs';
import { useSSRContext, defineComponent, computed, unref, mergeProps, resolveComponent, withCtx, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { RouterLink } from 'vue-router';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'cookie-es';
import 'ohash';
import 'scule';
import 'axios';
import 'query-string';
import 'defu';
import '../../nitro/config.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SwCategoryNavigation",
  __ssrInlineRender: true,
  props: {
    activeCategory: null,
    elements: null,
    level: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    function getHighlightCategory(navigationElement) {
      var _a, _b;
      return (((_a = props.activeCategory) == null ? void 0 : _a.path) || "").includes(navigationElement.id) || navigationElement.id === ((_b = props.activeCategory) == null ? void 0 : _b.id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_SwCategoryNavigation = resolveComponent("SwCategoryNavigation", true);
      if ((_a = props.elements) == null ? void 0 : _a.length) {
        _push(`<ul${ssrRenderAttrs(mergeProps({ class: "list-none m-0 px-5 space-y-2" }, _attrs))}><!--[-->`);
        ssrRenderList(props.elements, (navigationElement, index) => {
          var _a2;
          _push(`<li class="${ssrRenderClass({
            "border-b border-gray-200": props.level === 0
          })}">`);
          _push(ssrRenderComponent(unref(RouterLink), {
            to: unref(getCategoryUrl)(navigationElement),
            class: ["flex items-center py-2 px-5 text-base rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700", [
              getHighlightCategory(navigationElement) ? "font-bold" : "font-normal",
              navigationElement.id === ((_a2 = props.activeCategory) == null ? void 0 : _a2.id) ? "text-indigo-600" : "text-gray-900"
            ]]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(unref(getTranslatedProperty)(navigationElement, "name"))}</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(unref(getTranslatedProperty)(navigationElement, "name")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (navigationElement.children) {
            _push(ssrRenderComponent(_component_SwCategoryNavigation, {
              elements: navigationElement.children,
              activeCategory: props.activeCategory,
              level: props.level + 1
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/SwCategoryNavigation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementCategoryNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const { category: activeCategory } = useCategory();
    const { loadNavigationElements, navigationElements } = useNavigation();
    const navigations = computed(() => {
      const navigation = JSON.parse(
        JSON.stringify(navigationElements.value)
      );
      return navigation == null ? void 0 : navigation.map((navigationElement) => {
        var _a;
        navigationElement.children = ((_a = activeCategory.value) == null ? void 0 : _a.id) === navigationElement.id ? navigationElement.children : [];
        return navigationElement;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(navigations) && unref(navigations).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "cms-element-category-navigation max-w-screen-xl mx-auto" }, _attrs))}>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          level: 0,
          elements: unref(navigations),
          activeCategory: unref(activeCategory)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementCategoryNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CmsElementCategoryNavigation-b02f987a.mjs.map
