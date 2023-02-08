import { ref, getCurrentInstance, onServerPrefetch, inject, version, defineAsyncComponent, watch, computed, reactive, unref, provide, resolveComponent, defineComponent, h, Suspense, nextTick, Transition, useSSRContext, shallowRef, isReadonly, effectScope, withAsyncContext, withCtx, createVNode, createApp, toRef, isRef, customRef, getCurrentScope, onScopeDispose, onErrorCaptured, markRaw } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { hasProtocol, isEqual, parseURL, joinURL } from 'ufo';
import { createError as createError$1, sendRedirect, appendHeader } from 'h3';
import { useHead as useHead$1, createHead as createHead$1 } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { renderSSRHead } from '@unhead/ssr';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { parse, serialize } from 'cookie-es';
import { isEqual as isEqual$1 } from 'ohash';
import { pascalCase } from 'scule';
import axios from 'axios';
import queryString from 'query-string';
import { ssrRenderComponent, ssrRenderSuspense } from 'vue/server-renderer';
import { defu } from 'defu';
import { u as useRuntimeConfig$1 } from '../nitro/config.mjs';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop === "public") {
        return target.public;
      }
      return target[prop] ?? target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const getDefault = () => null;
function useAsyncData(...args) {
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? ((_a = options.default) == null ? void 0 : _a.call(options)) ?? null),
      pending: ref(!hasCachedData()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(((_a2 = options.default) == null ? void 0 : _a2.call(options)) ?? null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function setResponseStatus(code, message) {
  const event = useRequestEvent();
  if (event) {
    event.node.res.statusCode = code;
    if (message) {
      event.node.res.statusMessage = message;
    }
  }
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      if (isProcessingMiddleware() && !isExternal) {
        setResponseStatus((options == null ? void 0 : options.redirectCode) || 302);
        return to;
      }
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    use(plugin) {
      unhead.use(plugin);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead$1(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
version.startsWith("2.");
function useHead(input, options) {
  return useNuxtApp()._useHead(input, options);
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref(cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual$1(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
function isObject$1(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject$1(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject$1(value) && isObject$1(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const inlineConfig = {};
defuFn(inlineConfig);
const components = {
  FrontendDetailPage: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/frontend-detail-page" */
    './_nuxt/FrontendDetailPage-682646b6.mjs'
  ).then((c) => c.default || c)),
  FrontendLandingPage: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/frontend-landing-page" */
    './_nuxt/FrontendLandingPage-c1843961.mjs'
  ).then((c) => c.default || c)),
  FrontendNavigationPage: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/frontend-navigation-page" */
    './_nuxt/FrontendNavigationPage-53e4bb9b.mjs'
  ).then((c) => c.default || c)),
  AccountAddressCard: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-address-card" */
    './_nuxt/AccountAddressCard-3e3f1e4a.mjs'
  ).then((c) => c.default || c)),
  AccountAddressForm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-address-form" */
    './_nuxt/AccountAddressForm-3476f6bd.mjs'
  ).then((c) => c.default || c)),
  AccountChangePassword: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-change-password" */
    './_nuxt/AccountChangePassword-1f58f74b.mjs'
  ).then((c) => c.default || c)),
  AccountLoginForm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-login-form" */
    './_nuxt/AccountLoginForm-0c3ad2b5.mjs'
  ).then((c) => c.default || c)),
  AccountMenu: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-menu" */
    './_nuxt/AccountMenu-c02e58c5.mjs'
  ).then((c) => c.default || c)),
  AccountOrder: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-order" */
    './_nuxt/AccountOrder-a2811e81.mjs'
  ).then((c) => c.default || c)),
  AccountOrderDetails: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-order-details" */
    './_nuxt/AccountOrderDetails-85994dde.mjs'
  ).then((c) => c.default || c)),
  AccountOrderItem: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-order-item" */
    './_nuxt/AccountOrderItem-66121fef.mjs'
  ).then((c) => c.default || c)),
  AccountOrderLineItem: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-order-line-item" */
    './_nuxt/AccountOrderLineItem-c66c1477.mjs'
  ).then((c) => c.default || c)),
  AccountOrderSummary: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-order-summary" */
    './_nuxt/AccountOrderSummary-34dd30fd.mjs'
  ).then((c) => c.default || c)),
  AccountPersonalData: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-personal-data" */
    './_nuxt/AccountPersonalData-1d614788.mjs'
  ).then((c) => c.default || c)),
  AccountRecoverPassword: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-recover-password" */
    './_nuxt/AccountRecoverPassword-380a525c.mjs'
  ).then((c) => c.default || c)),
  AccountResetPasswordForm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/account-reset-password-form" */
    './_nuxt/AccountResetPasswordForm-aed7363f.mjs'
  ).then((c) => c.default || c)),
  CheckoutCartItem: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/checkout-cart-item" */
    './_nuxt/CheckoutCartItem-360d615a.mjs'
  ).then((c) => c.default || c)),
  CheckoutPromotionCode: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/checkout-promotion-code" */
    './_nuxt/CheckoutPromotionCode-98fd088b.mjs'
  ).then((c) => c.default || c)),
  CheckoutSideCart: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/checkout-side-cart" */
    './_nuxt/CheckoutSideCart-513d3b83.mjs'
  ).then((c) => c.default || c)),
  ErrorsRoutingNotFound: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/errors-routing-not-found" */
    './_nuxt/RoutingNotFound-12a4592f.mjs'
  ).then((c) => c.default || c)),
  LayoutBreadcrumbs: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-breadcrumbs" */
    './_nuxt/LayoutBreadcrumbs-577021a8.mjs'
  ).then((c) => c.default || c)),
  LayoutCheckoutHeader: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-checkout-header" */
    './_nuxt/LayoutCheckoutHeader-6607128f.mjs'
  ).then((c) => c.default || c)),
  LayoutFooter: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-footer" */
    './_nuxt/LayoutFooter-c273670c.mjs'
  ).then((c) => c.default || c)),
  LayoutHeader: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-header" */
    './_nuxt/LayoutHeader-e6e18db9.mjs'
  ).then((c) => c.default || c)),
  LayoutNotification: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-notification" */
    './_nuxt/LayoutNotification-859b2f42.mjs'
  ).then((c) => c.default || c)),
  LayoutNotifications: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-notifications" */
    './_nuxt/LayoutNotifications-227b01b5.mjs'
  ).then((c) => c.default || c)),
  LayoutSideMenu: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-side-menu" */
    './_nuxt/LayoutSideMenu-b0d05e82.mjs'
  ).then((c) => c.default || c)),
  LayoutStoreSearch: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-store-search" */
    './_nuxt/LayoutStoreSearch-696c4fb1.mjs'
  ).then((c) => c.default || c)),
  LayoutTopNavigation: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-top-navigation" */
    './_nuxt/LayoutTopNavigation-b7017cc6.mjs'
  ).then((c) => c.default || c)),
  ListingFilters: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/listing-filters" */
    './_nuxt/ListingFilters-5763e5a2.mjs'
  ).then((c) => c.default || c)),
  ListingFiltersManufacturer: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/listing-filters-manufacturer" */
    './_nuxt/ListingFiltersManufacturer-d9b68bb4.mjs'
  ).then((c) => c.default || c)),
  ListingFiltersPrice: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/listing-filters-price" */
    './_nuxt/ListingFiltersPrice-292b843c.mjs'
  ).then((c) => c.default || c)),
  ListingFiltersProperties: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/listing-filters-properties" */
    './_nuxt/ListingFiltersProperties-0addf6c6.mjs'
  ).then((c) => c.default || c)),
  ListingFiltersRating: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/listing-filters-rating" */
    './_nuxt/ListingFiltersRating-e4e641c9.mjs'
  ).then((c) => c.default || c)),
  ListingFiltersShippingFree: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/listing-filters-shipping-free" */
    './_nuxt/ListingFiltersShippingFree-1db15f3d.mjs'
  ).then((c) => c.default || c)),
  ProductAddToCart: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-add-to-cart" */
    './_nuxt/ProductAddToCart-87a1cf12.mjs'
  ).then((c) => c.default || c)),
  ProductCard: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-card" */
    './_nuxt/ProductCard-dd6a11cf.mjs'
  ).then((c) => c.default || c)),
  ProductGallery: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-gallery" */
    './_nuxt/ProductGallery-cc8d13fa.mjs'
  ).then((c) => c.default || c)),
  ProductPrice: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-price" */
    './_nuxt/ProductPrice-594e1885.mjs'
  ).then((c) => c.default || c)),
  ProductStatic: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-static" */
    './_nuxt/ProductStatic-fe6dbe76.mjs'
  ).then((c) => c.default || c)),
  ProductSuggestSearch: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-suggest-search" */
    './_nuxt/ProductSuggestSearch-22bc8109.mjs'
  ).then((c) => c.default || c)),
  ProductUnits: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-units" */
    './_nuxt/ProductUnits-4d5fe604.mjs'
  ).then((c) => c.default || c)),
  ProductVariantConfigurator: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/product-variant-configurator" */
    './_nuxt/ProductVariantConfigurator-d5903323.mjs'
  ).then((c) => c.default || c)),
  SharedListingProductPrice: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/shared-listing-product-price" */
    './_nuxt/SharedListingProductPrice-ec1574ad.mjs'
  ).then((c) => c.default || c)),
  SharedModal: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/shared-modal" */
    './_nuxt/SharedModal-a1e47874.mjs'
  ).then((c) => c.default || c)),
  SharedPagination: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/shared-pagination" */
    './_nuxt/SharedPagination-78e532a6.mjs'
  ).then((c) => c.default || c)),
  SharedPrice: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/shared-price" */
    './_nuxt/SharedPrice-64255154.mjs'
  ).then((c) => c.default || c)),
  CmsGenericBlock: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-generic-block" */
    './_nuxt/CmsGenericBlock-06d8d9d8.mjs'
  ).then((c) => c.default || c)),
  CmsGenericElement: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-generic-element" */
    './_nuxt/CmsGenericElement-986d3475.mjs'
  ).then((c) => c.default || c)),
  CmsNoComponent: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-no-component" */
    './_nuxt/CmsNoComponent-54248365.mjs'
  ).then((c) => c.default || c)),
  CmsPage: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-page" */
    './_nuxt/CmsPage-9ff5116f.mjs'
  ).then((c) => c.default || c)),
  CmsBlockCategoryNavigation: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-category-navigation" */
    './_nuxt/CmsBlockCategoryNavigation-44e3bc9e.mjs'
  ).then((c) => c.default || c)),
  CmsBlockCenterText: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-center-text" */
    './_nuxt/CmsBlockCenterText-838d5d85.mjs'
  ).then((c) => c.default || c)),
  CmsBlockCrossSelling: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-cross-selling" */
    './_nuxt/CmsBlockCrossSelling-64fc4303.mjs'
  ).then((c) => c.default || c)),
  CmsBlockCustomForm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-custom-form" */
    './_nuxt/CmsBlockCustomForm-5f0edd66.mjs'
  ).then((c) => c.default || c)),
  CmsBlockDefault: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-default" */
    './_nuxt/CmsBlockDefault-908191e2.mjs'
  ).then((c) => c.default || c)),
  CmsBlockForm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-form" */
    './_nuxt/CmsBlockForm-131d5351.mjs'
  ).then((c) => c.default || c)),
  CmsBlockGalleryBuybox: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-gallery-buybox" */
    './_nuxt/CmsBlockGalleryBuybox-8c2ce3e2.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImage: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image" */
    './_nuxt/CmsBlockImage-c1cbdca9.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageBubbleRow: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-bubble-row" */
    './_nuxt/CmsBlockImageBubbleRow-735f706a.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageCover: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-cover" */
    './_nuxt/CmsBlockImageCover-ecac6cee.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageFourColumn: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-four-column" */
    './_nuxt/CmsBlockImageFourColumn-b529ca9c.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageGallery: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-gallery" */
    './_nuxt/CmsBlockImageGallery-2dbb6d35.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageHighlightRow: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-highlight-row" */
    './_nuxt/CmsBlockImageHighlightRow-5759337f.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageSimpleGrid: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-simple-grid" */
    './_nuxt/CmsBlockImageSimpleGrid-173dd60a.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageSlider: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-slider" */
    './_nuxt/CmsBlockImageSlider-80bba2a3.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageText: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-text" */
    './_nuxt/CmsBlockImageText-1e47aaa2.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageTextBubble: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-text-bubble" */
    './_nuxt/CmsBlockImageTextBubble-9ac82a69.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageTextCover: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-text-cover" */
    './_nuxt/CmsBlockImageTextCover-7f1bd53e.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageTextGallery: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-text-gallery" */
    './_nuxt/CmsBlockImageTextGallery-8d48a716.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageTextRow: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-text-row" */
    './_nuxt/CmsBlockImageTextRow-9b270626.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageThreeColumn: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-three-column" */
    './_nuxt/CmsBlockImageThreeColumn-d46bb47a.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageThreeCover: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-three-cover" */
    './_nuxt/CmsBlockImageThreeCover-b3620ba2.mjs'
  ).then((c) => c.default || c)),
  CmsBlockImageTwoColumn: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-image-two-column" */
    './_nuxt/CmsBlockImageTwoColumn-d58aab15.mjs'
  ).then((c) => c.default || c)),
  CmsBlockProductDescriptionReviews: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-product-description-reviews" */
    './_nuxt/CmsBlockProductDescriptionReviews-5749af44.mjs'
  ).then((c) => c.default || c)),
  CmsBlockProductHeading: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-product-heading" */
    './_nuxt/CmsBlockProductHeading-f7de6f80.mjs'
  ).then((c) => c.default || c)),
  CmsBlockProductListing: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-product-listing" */
    './_nuxt/CmsBlockProductListing-d3938fcf.mjs'
  ).then((c) => c.default || c)),
  CmsBlockProductSlider: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-product-slider" */
    './_nuxt/CmsBlockProductSlider-b31d55b4.mjs'
  ).then((c) => c.default || c)),
  CmsBlockProductThreeColumn: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-product-three-column" */
    './_nuxt/CmsBlockProductThreeColumn-a2fac200.mjs'
  ).then((c) => c.default || c)),
  CmsBlockSidebarFilter: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-sidebar-filter" */
    './_nuxt/CmsBlockSidebarFilter-bcf8b377.mjs'
  ).then((c) => c.default || c)),
  CmsBlockText: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-text" */
    './_nuxt/CmsBlockText-f4d5a942.mjs'
  ).then((c) => c.default || c)),
  CmsBlockTextHero: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-text-hero" */
    './_nuxt/CmsBlockTextHero-c3395282.mjs'
  ).then((c) => c.default || c)),
  CmsBlockTextOnImage: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-text-on-image" */
    './_nuxt/CmsBlockTextOnImage-82d622ad.mjs'
  ).then((c) => c.default || c)),
  CmsBlockTextTeaser: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-text-teaser" */
    './_nuxt/CmsBlockTextTeaser-419c731c.mjs'
  ).then((c) => c.default || c)),
  CmsBlockTextTeaserSection: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-text-teaser-section" */
    './_nuxt/CmsBlockTextTeaserSection-1300ac28.mjs'
  ).then((c) => c.default || c)),
  CmsBlockTextThreeColumn: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-text-three-column" */
    './_nuxt/CmsBlockTextThreeColumn-f64e759f.mjs'
  ).then((c) => c.default || c)),
  CmsBlockTextTwoColumn: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-text-two-column" */
    './_nuxt/CmsBlockTextTwoColumn-eaf27d67.mjs'
  ).then((c) => c.default || c)),
  CmsBlockVimeoVideo: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-vimeo-video" */
    './_nuxt/CmsBlockVimeoVideo-036226a8.mjs'
  ).then((c) => c.default || c)),
  CmsBlockYoutubeVideo: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-block-youtube-video" */
    './_nuxt/CmsBlockYoutubeVideo-36f5266e.mjs'
  ).then((c) => c.default || c)),
  CmsElementBuyBox: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-buy-box" */
    './_nuxt/CmsElementBuyBox-89f808d8.mjs'
  ).then((c) => c.default || c)),
  CmsElementCategoryNavigation: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-category-navigation" */
    './_nuxt/CmsElementCategoryNavigation-b02f987a.mjs'
  ).then((c) => c.default || c)),
  CmsElementCrossSelling: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-cross-selling" */
    './_nuxt/CmsElementCrossSelling-97a5f95f.mjs'
  ).then((c) => c.default || c)),
  CmsElementCustomForm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-custom-form" */
    './_nuxt/CmsElementCustomForm-be3d6f0e.mjs'
  ).then((c) => c.default || c)),
  CmsElementForm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-form" */
    './_nuxt/CmsElementForm-f37d7633.mjs'
  ).then((c) => c.default || c)),
  CmsElementImage: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-image" */
    './_nuxt/CmsElementImage-ad2cdd3c.mjs'
  ).then((c) => c.default || c)),
  CmsElementImageGallery: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-image-gallery" */
    './_nuxt/CmsElementImageGallery-ee4b5e55.mjs'
  ).then((c) => c.default || c)),
  CmsElementImageSlider: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-image-slider" */
    './_nuxt/CmsElementImageSlider-54c7b8a8.mjs'
  ).then((c) => c.default || c)),
  CmsElementManufacturerLogo: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-manufacturer-logo" */
    './_nuxt/CmsElementManufacturerLogo-015aefe8.mjs'
  ).then((c) => c.default || c)),
  CmsElementProductBox: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-product-box" */
    './_nuxt/CmsElementProductBox-b74a8f86.mjs'
  ).then((c) => c.default || c)),
  CmsElementProductDescriptionReviews: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-product-description-reviews" */
    './_nuxt/CmsElementProductDescriptionReviews-698f28e8.mjs'
  ).then((c) => c.default || c)),
  CmsElementProductListing: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-product-listing" */
    './_nuxt/CmsElementProductListing-581d2d34.mjs'
  ).then((c) => c.default || c)),
  CmsElementProductName: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-product-name" */
    './_nuxt/CmsElementProductName-f2dd35b2.mjs'
  ).then((c) => c.default || c)),
  CmsElementProductSlider: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-product-slider" */
    './_nuxt/CmsElementProductSlider-62aa7136.mjs'
  ).then((c) => c.default || c)),
  CmsElementSidebarFilter: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-sidebar-filter" */
    './_nuxt/CmsElementSidebarFilter-5f7c0a43.mjs'
  ).then((c) => c.default || c)),
  CmsElementText: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-text" */
    './_nuxt/CmsElementText-2b33c86c.mjs'
  ).then((c) => c.default || c)),
  CmsElementVimeoVideo: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-vimeo-video" */
    './_nuxt/CmsElementVimeoVideo-8907c397.mjs'
  ).then((c) => c.default || c)),
  CmsElementYoutubeVideo: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-element-youtube-video" */
    './_nuxt/CmsElementYoutubeVideo-44242080.mjs'
  ).then((c) => c.default || c)),
  CmsSectionDefault: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-section-default" */
    './_nuxt/CmsSectionDefault-6b8aa610.mjs'
  ).then((c) => c.default || c)),
  CmsSectionSidebar: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/cms-section-sidebar" */
    './_nuxt/CmsSectionSidebar-310d2e52.mjs'
  ).then((c) => c.default || c)),
  UnoIcon: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/uno-icon" */
    './_nuxt/UnoIcon-05ef77f9.mjs'
  ).then((c) => c.default || c))
};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const ______node_modules__pnpm_nuxt_643_1_1_ndavlr5gomle5zzyx7eljktc5u_node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_0bvRhFlywu = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead$1;
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const __nuxt_page_meta$i = {};
const __nuxt_page_meta$h = {
  layout: "account"
};
const __nuxt_page_meta$g = {
  layout: "account"
};
const __nuxt_page_meta$f = {
  layout: "account"
};
const __nuxt_page_meta$e = {
  layout: "account"
};
const __nuxt_page_meta$d = {
  layout: "account"
};
const __nuxt_page_meta$c = {};
const __nuxt_page_meta$b = { layout: "checkout" };
const __nuxt_page_meta$a = {
  layout: "checkout"
};
const __nuxt_page_meta$9 = {};
const __nuxt_page_meta$8 = {};
const __nuxt_page_meta$7 = {};
const __nuxt_page_meta$6 = {};
const __nuxt_page_meta$5 = {};
const __nuxt_page_meta$4 = {};
const __nuxt_page_meta$3 = {};
const __nuxt_page_meta$2 = {};
const __nuxt_page_meta$1 = {};
const __nuxt_page_meta = {};
const _routes = [
  {
    name: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.name) ?? "all",
    path: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.path) ?? "/:all(.*)*",
    children: [],
    meta: __nuxt_page_meta$i,
    alias: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.alias) || [],
    redirect: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.redirect) || void 0,
    component: () => import('./_nuxt/_...all_-b3d7872f.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.name) ?? "account-address",
    path: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.path) ?? "/account/address",
    children: [],
    meta: __nuxt_page_meta$h,
    alias: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.alias) || [],
    redirect: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.redirect) || void 0,
    component: () => import('./_nuxt/address-632fddb6.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.name) ?? "account",
    path: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.path) ?? "/account",
    children: [],
    meta: __nuxt_page_meta$g,
    alias: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.alias) || [],
    redirect: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.redirect) || void 0,
    component: () => import('./_nuxt/index-35759180.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.name) ?? "account-order",
    path: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.path) ?? "/account/order",
    children: [],
    meta: __nuxt_page_meta$f,
    alias: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.alias) || [],
    redirect: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.redirect) || void 0,
    component: () => import('./_nuxt/order-f6b60ca1.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.name) ?? "account-payment",
    path: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.path) ?? "/account/payment",
    children: [],
    meta: __nuxt_page_meta$e,
    alias: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.alias) || [],
    redirect: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.redirect) || void 0,
    component: () => import('./_nuxt/payment-326b0507.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.name) ?? "account-profile",
    path: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.path) ?? "/account/profile",
    children: [],
    meta: __nuxt_page_meta$d,
    alias: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.alias) || [],
    redirect: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.redirect) || void 0,
    component: () => import('./_nuxt/profile-e88bf441.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.name) ?? "account-recover",
    path: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.path) ?? "/account/recover",
    children: [],
    meta: __nuxt_page_meta$c,
    alias: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.alias) || [],
    redirect: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.redirect) || void 0,
    component: () => import('./_nuxt/recover-34db9b78.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.name) ?? "checkout-cart",
    path: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.path) ?? "/checkout/cart",
    children: [],
    meta: __nuxt_page_meta$b,
    alias: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.alias) || [],
    redirect: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.redirect) || void 0,
    component: () => import('./_nuxt/cart-03f9fb5c.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.name) ?? "checkout",
    path: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.path) ?? "/checkout",
    children: [],
    meta: __nuxt_page_meta$a,
    alias: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.alias) || [],
    redirect: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.redirect) || void 0,
    component: () => import('./_nuxt/index-552d0a99.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.name) ?? "checkout-success-id",
    path: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.path) ?? "/checkout/success/:id",
    children: [],
    meta: __nuxt_page_meta$9,
    alias: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.alias) || [],
    redirect: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.redirect) || void 0,
    component: () => import('./_nuxt/index-fda202b5.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.name) ?? "checkout-success-id-paid",
    path: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.path) ?? "/checkout/success/:id/paid",
    children: [],
    meta: __nuxt_page_meta$8,
    alias: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.alias) || [],
    redirect: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.redirect) || void 0,
    component: () => import('./_nuxt/paid-d8f184ad.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.name) ?? "checkout-success-id-unpaid",
    path: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.path) ?? "/checkout/success/:id/unpaid",
    children: [],
    meta: __nuxt_page_meta$7,
    alias: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.alias) || [],
    redirect: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.redirect) || void 0,
    component: () => import('./_nuxt/unpaid-125ac6ac.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.name) ?? "error",
    path: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.path) ?? "/error",
    children: [],
    meta: __nuxt_page_meta$6,
    alias: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.alias) || [],
    redirect: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.redirect) || void 0,
    component: () => import('./_nuxt/error-22994cb6.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.name) ?? "login",
    path: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.path) ?? "/login",
    children: [],
    meta: __nuxt_page_meta$5,
    alias: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.alias) || [],
    redirect: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.redirect) || void 0,
    component: () => import('./_nuxt/login-cd3fe1a0.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.name) ?? "register",
    path: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.path) ?? "/register",
    children: [],
    meta: __nuxt_page_meta$4,
    alias: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.alias) || [],
    redirect: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect) || void 0,
    component: () => import('./_nuxt/register-482bc7e0.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) ?? "reset-password",
    path: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) ?? "/reset-password",
    children: [],
    meta: __nuxt_page_meta$3,
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect) || void 0,
    component: () => import('./_nuxt/reset-password-8ffffc96.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) ?? "search",
    path: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) ?? "/search",
    children: [],
    meta: __nuxt_page_meta$2,
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./_nuxt/search-8276f3e3.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) ?? "shopware",
    path: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) ?? "/shopware",
    children: [],
    meta: __nuxt_page_meta$1,
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/shopware-8d2678a3.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) ?? "wishlist",
    path: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) ?? "/wishlist",
    children: [],
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/wishlist-1ad75a25.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {
  linkExactActiveClass: "text-brand-primary"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  return result;
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const ______node_modules__pnpm_nuxt_643_1_1_ndavlr5gomle5zzyx7eljktc5u_node_modules_nuxt_dist_pages_runtime_plugins_router_mjs_yA6J8f6Ors = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
  const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a2, _b2, _c, _d;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    [__temp, __restore] = executeAsync(() => callWithNuxt(nuxtApp, showError, [error2])), await __temp, __restore();
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
      to.meta.layout = initialLayout.value;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a2 = namedMiddleware[entry2]) == null ? void 0 : _a2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          await callWithNuxt(nuxtApp, showError, [error2]);
          return false;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      await callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        const event = await callWithNuxt(nuxtApp, useRequestEvent);
        const options = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
        await callWithNuxt(nuxtApp, navigateTo, [currentURL, options]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      await callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const isApiError = (statusCode) => {
  if (statusCode != 408 && statusCode.toString().startsWith("4") || statusCode == 500) {
    return true;
  }
  return false;
};
const extractApiErrorStatusCode = (error) => {
  return error.response && error.response.status || guessTheStatusCodeFromTheMessage(error.message);
};
const guessTheStatusCodeFromTheMessage = (message) => {
  if (typeof message === "string" && message.startsWith("timeout of")) {
    return 408;
  }
  if (typeof message === "string" && message.startsWith("Network Error")) {
    return 0;
  }
  return 500;
};
const extractApiErrorMessage = (error) => {
  var _a, _b;
  return ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors) || [];
};
const extractNotApiErrorMessage = (error) => [
  {
    detail: error.message,
    status: "",
    code: "",
    title: "",
    meta: {},
    source: {}
  }
];
async function errorInterceptor(error) {
  const statusCode = extractApiErrorStatusCode(error);
  const clientApiError = {
    messages: isApiError(statusCode) ? extractApiErrorMessage(error) : extractNotApiErrorMessage(error),
    statusCode
  };
  return Promise.reject(clientApiError);
}
function extractContextToken(response) {
  return response.data["sw-context-token"] || response.data["contextToken"] || response.headers["sw-context-token"];
}
function createResponseInterceptor(update) {
  return function(response) {
    const contextToken = extractContextToken(response);
    contextToken && update({ contextToken }, response.config);
    return response;
  };
}
const defaultConfig = {
  endpoint: "https://pwa-demo-api.shopware.com/prev/",
  accessToken: "SWSC40-LJTNO6COUEN7CJMXKLA",
  contextToken: "",
  languageId: "",
  defaultPaginationLimit: 10,
  timeout: 1e4
};
const ARRAY_FORMAT = "separator";
const ARRAY_FORMAT_SEPARATOR = "|";
const SKIP_NULL = true;
const SORT = false;
const getQueryString = (params) => typeof params === "string" ? params : queryString.stringify(params, {
  arrayFormat: ARRAY_FORMAT,
  arrayFormatSeparator: ARRAY_FORMAT_SEPARATOR,
  skipNull: SKIP_NULL,
  sort: SORT
});
function _createInstance(initialConfig = {}) {
  const callbackMethods = [];
  let clientConfig = {};
  const apiService = axios.create();
  function reloadConfiguration() {
    apiService.defaults.baseURL = clientConfig.endpoint;
    if (clientConfig.timeout) {
      apiService.defaults.timeout = typeof clientConfig.timeout === "number" && clientConfig.timeout || typeof clientConfig.timeout === "string" && parseInt(clientConfig.timeout) || 0;
    }
    apiService.defaults.headers.common["sw-include-seo-urls"] = "true";
    apiService.defaults.headers.common["sw-access-key"] = clientConfig.accessToken;
    apiService.defaults.paramsSerializer = getQueryString;
    if (clientConfig.contextToken) {
      apiService.defaults.headers.common["sw-context-token"] = clientConfig.contextToken;
    } else {
      delete apiService.defaults.headers.common["sw-context-token"];
    }
    if (clientConfig.languageId) {
      apiService.defaults.headers.common["sw-language-id"] = clientConfig.languageId;
    } else {
      delete apiService.defaults.headers.common["sw-language-id"];
    }
  }
  function onConfigChange(fn) {
    callbackMethods.push(fn);
  }
  const setup = function(config = {}) {
    clientConfig = Object.assign(clientConfig, defaultConfig, config);
    reloadConfiguration();
  };
  setup(initialConfig);
  const update = function(config, responseConfig) {
    clientConfig = Object.assign(clientConfig, config);
    callbackMethods.forEach((fn) => fn({ config: clientConfig }));
    reloadConfiguration();
  };
  const invoke = {
    post: apiService.post,
    put: apiService.put,
    get: apiService.get,
    patch: apiService.patch,
    delete: apiService.delete
  };
  apiService.interceptors.response.use(
    createResponseInterceptor(update),
    errorInterceptor
  );
  return {
    onConfigChange,
    config: clientConfig,
    setup,
    update,
    invoke,
    defaults: apiService.defaults,
    _axiosInstance: apiService
  };
}
function createInstance(initialConfig = {}) {
  const {
    onConfigChange,
    config,
    setup,
    update,
    invoke,
    defaults,
    _axiosInstance
  } = _createInstance(initialConfig);
  return {
    onConfigChange,
    config,
    setup,
    update: (config2 = {}) => {
      update(config2);
    },
    invoke,
    defaults,
    _axiosInstance
  };
}
const defaultInstance = createInstance();
const getCategoryDetailsEndpoint = (categoryId) => `/store-api/category/${categoryId}`;
const getLandingPageDetailsEndpoint = (landingPageId) => `/store-api/landing-page/${landingPageId}`;
const getProductListingEndpoint = (categoryId) => `/store-api/product-listing/${categoryId}`;
const getProductEndpoint = () => `/store-api/product`;
const getProductDetailsEndpoint = (productId) => `/store-api/product/${productId}`;
const getProductReviewsEndpoint = (productId) => `/store-api/product/${productId}/reviews`;
const getSearchEndpoint = () => `/store-api/search`;
const getCustomerAddAddressEndpoint = () => `/store-api/account/address`;
const getCustomerAddressEndpoint = (addressId) => addressId ? `/store-api/account/address/${addressId}` : "/store-api/account/list-address";
const getCustomerDefaultAddressEndpoint = (type, addressId) => `/store-api/account/address/default-${type}/${addressId}`;
const getCustomerDefaultBillingAddressEndpoint = (addressId) => getCustomerDefaultAddressEndpoint("billing", addressId);
const getCustomerDefaultShippingAddressEndpoint = (addressId) => getCustomerDefaultAddressEndpoint("shipping", addressId);
const getCustomerEndpoint = () => `/store-api/account/customer`;
const getCustomerRegisterEndpoint = () => `/store-api/account/register`;
const getCustomerDetailsUpdateEndpoint = () => `/store-api/account/change-profile`;
const getCustomerLoginEndpoint = () => `/store-api/account/login`;
const getCustomerLogoutEndpoint = () => `/store-api/account/logout`;
const getCustomerOrderEndpoint = () => `/store-api/order`;
const getCustomerUpdateEmailEndpoint = () => `/store-api/account/change-email`;
const getCustomerUpdatePasswordEndpoint = () => `/store-api/account/change-password`;
const getCustomerResetPasswordEndpoint = () => `/store-api/account/recovery-password`;
const getCustomerUpdatePaymentMethodEndpoint = (paymentMethodId) => `/store-api/account/change-payment-method/${paymentMethodId}`;
const getCheckoutCartEndpoint = () => `/store-api/checkout/cart`;
const getCheckoutCartLineItemEndpoint = () => `/store-api/checkout/cart/line-item`;
const getCheckoutOrderEndpoint = () => `/store-api/checkout/order`;
const getCancelOrderEndpoint = () => `/store-api/order/state/cancel`;
const getChangeOrderPaymentMethodEndpoint = () => `/store-api/order/payment`;
const getContextEndpoint = () => `/store-api/context`;
const getContextCountryEndpoint = () => `/store-api/country`;
const getContextPaymentMethodEndpoint = () => `/store-api/payment-method`;
const getContextShippingMethodEndpoint = () => `/store-api/shipping-method`;
const getContextSalutationEndpoint = () => `/store-api/salutation`;
const getNewsletterRecipientEndpoint = () => `/store-api/account/newsletter-recipient`;
const getSeoUrlEndpoint = () => "/store-api/seo-url";
const getStoreNavigationEndpoint = (requestActiveId, requestRootId) => `/store-api/navigation/${requestActiveId}/${requestRootId}`;
const handlePaymentEndpoint = () => `/store-api/handle-payment`;
const getStoreNewsletterSubscribeEndpoint = () => `/store-api/newsletter/subscribe`;
const getStoreNewsletterUnsubscribeEndpoint = () => `/store-api/newsletter/unsubscribe`;
const getGetWishlistProductsEndpoint = () => `/store-api/customer/wishlist`;
const getAddWishlistProductEndpoint = (productId) => `/store-api/customer/wishlist/add/${productId}`;
const getRemoveWishlistProductEndpoint = (productId) => `/store-api/customer/wishlist/delete/${productId}`;
const getMergeWishlistProductsEndpoint = () => `/store-api/customer/wishlist/merge`;
async function getProducts(criteria, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(`${getProductEndpoint()}`, {
    ...criteria || {}
  });
  return resp.data;
}
async function getCategoryProducts(categoryId, criteria, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    `${getProductListingEndpoint(categoryId)}`,
    criteria
  );
  return resp.data;
}
async function getProduct(productId, params = null, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getProductDetailsEndpoint(productId),
    params
  );
  return resp.data;
}
async function addProductReview(productId, productReviewData, contextInstance = defaultInstance) {
  await contextInstance.invoke.post(
    `${getProductDetailsEndpoint(productId)}/review`,
    productReviewData
  );
}
async function getProductReviews(productId, criteria, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(`${getProductReviewsEndpoint(productId)}`, {
    ...criteria || {}
  });
  return resp.data;
}
async function register(params, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getCustomerRegisterEndpoint(),
    params
  );
  return resp.data;
}
async function login({ username, password } = {}, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(getCustomerLoginEndpoint(), {
    username,
    password
  });
  const contextToken = resp.data["sw-context-token"] || resp.data["contextToken"];
  return { contextToken };
}
async function logout(contextInstance = defaultInstance) {
  await contextInstance.invoke.post(getCustomerLogoutEndpoint());
}
async function getCustomer(parameters = {}, contextInstance = defaultInstance) {
  try {
    const resp = await contextInstance.invoke.post(
      getCustomerEndpoint(),
      parameters
    );
    return resp.data;
  } catch (e) {
    const err = e;
    if (err.statusCode === 403)
      return null;
    throw new Error("Unexpected getCustomerResponse. " + err);
  }
}
async function getCustomerAddresses(parameters = {}, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(getCustomerAddressEndpoint(), parameters);
  return resp.data;
}
async function getCustomerOrders(parameters = {}, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getCustomerOrderEndpoint(),
    parameters
  );
  return resp.data.orders;
}
async function createCustomerAddress(params, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getCustomerAddAddressEndpoint(),
    params
  );
  return resp.data;
}
async function updateCustomerAddress(params, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.patch(
    getCustomerAddressEndpoint(params.id),
    params
  );
  return resp.data;
}
async function deleteCustomerAddress(addressId, contextInstance = defaultInstance) {
  await contextInstance.invoke.delete(getCustomerAddressEndpoint(addressId));
}
async function setDefaultCustomerBillingAddress(addressId, contextInstance = defaultInstance) {
  const response = await contextInstance.invoke.patch(
    getCustomerDefaultBillingAddressEndpoint(addressId)
  );
  return response.data;
}
async function setDefaultCustomerShippingAddress(addressId, contextInstance = defaultInstance) {
  const response = await contextInstance.invoke.patch(
    getCustomerDefaultShippingAddressEndpoint(addressId)
  );
  return response.data;
}
async function updateEmail(params, contextInstance = defaultInstance) {
  await contextInstance.invoke.post(getCustomerUpdateEmailEndpoint(), params);
}
async function updatePassword(params, contextInstance = defaultInstance) {
  await contextInstance.invoke.post(
    getCustomerUpdatePasswordEndpoint(),
    params
  );
}
async function resetPassword(params, contextInstance = defaultInstance) {
  if (params && !params.storefrontUrl) {
    params.storefrontUrl = contextInstance.config.endpoint;
  }
  await contextInstance.invoke.post(getCustomerResetPasswordEndpoint(), params);
}
async function updateProfile(params, contextInstance = defaultInstance) {
  await contextInstance.invoke.post(getCustomerDetailsUpdateEndpoint(), params);
}
async function setDefaultCustomerPaymentMethod(paymentMethodId, contextInstance = defaultInstance) {
  const response = await contextInstance.invoke.post(
    getCustomerUpdatePaymentMethodEndpoint(paymentMethodId)
  );
  return response.data;
}
async function isNewsletterSubscriber(contextInstance = defaultInstance) {
  const response = await contextInstance.invoke.post(
    getNewsletterRecipientEndpoint()
  );
  return response.data;
}
async function updateContext(params, contextInstance) {
  const resp = await contextInstance.invoke.patch(getContextEndpoint(), params);
  const contextToken = extractContextToken(resp);
  return { contextToken };
}
async function getSessionContext(contextInstance = defaultInstance) {
  const { data } = await contextInstance.invoke.get(getContextEndpoint());
  return data;
}
function setCurrentShippingAddress(shippingAddressId, contextInstance = defaultInstance) {
  return updateContext({ shippingAddressId }, contextInstance);
}
function setCurrentBillingAddress(billingAddressId, contextInstance = defaultInstance) {
  return updateContext({ billingAddressId }, contextInstance);
}
async function setCurrentCurrency(newCurrencyID, contextInstance = defaultInstance) {
  const params = { currencyId: newCurrencyID };
  const resp = await updateContext(params, contextInstance);
  return resp;
}
async function setCurrentLanguage(newLanguageId, contextInstance = defaultInstance) {
  const params = { languageId: newLanguageId };
  const resp = await updateContext(params, contextInstance);
  return resp;
}
async function getAvailableCountries(contextInstance = defaultInstance) {
  const { data } = await contextInstance.invoke.get(getContextCountryEndpoint());
  return data;
}
async function getAvailableSalutations(contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.get(getContextSalutationEndpoint());
  return resp.data;
}
async function getAvailablePaymentMethods(contextInstance = defaultInstance, params = {}) {
  const resp = await contextInstance.invoke.get(getContextPaymentMethodEndpoint(), {
    params
  });
  return resp.data;
}
async function setCurrentPaymentMethod(newPaymentMethodId, contextInstance = defaultInstance) {
  const params = { paymentMethodId: newPaymentMethodId };
  const resp = await updateContext(params, contextInstance);
  return resp;
}
async function getAvailableShippingMethods(contextInstance = defaultInstance, params = {}) {
  const resp = await contextInstance.invoke.get(getContextShippingMethodEndpoint(), {
    params
  });
  return resp.data;
}
async function setCurrentShippingMethod(newShippingMethodId, contextInstance = defaultInstance) {
  const params = { shippingMethodId: newShippingMethodId };
  const resp = await updateContext(params, contextInstance);
  return resp;
}
async function getUserCountry(countryId, contextInstance = defaultInstance) {
  var _a;
  const { data } = await contextInstance.invoke.get(
    getContextCountryEndpoint(),
    {
      params: {
        "filter[id]": countryId
      }
    }
  );
  return (_a = data == null ? void 0 : data.elements) == null ? void 0 : _a[0];
}
async function getUserSalutation(salutationId, contextInstance = defaultInstance) {
  var _a;
  const { data } = await contextInstance.invoke.get(
    getContextSalutationEndpoint(),
    {
      params: {
        "filter[id]": salutationId
      }
    }
  );
  return (_a = data == null ? void 0 : data.elements) == null ? void 0 : _a[0];
}
async function getCart(contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.get(getCheckoutCartEndpoint());
  return resp.data;
}
async function addProductToCart(productId, quantity, contextInstance = defaultInstance) {
  const qty = quantity || 1;
  const item = {
    quantity: qty,
    type: "product",
    referencedId: productId,
    id: productId
  };
  const resp = await contextInstance.invoke.post(
    getCheckoutCartLineItemEndpoint(),
    {
      items: [item]
    }
  );
  return resp.data;
}
async function changeCartItemQuantity(itemId, newQuantity = 1, contextInstance = defaultInstance) {
  const params = {
    items: [
      {
        id: itemId,
        quantity: parseInt(newQuantity.toString(), 10)
      }
    ]
  };
  const resp = await contextInstance.invoke.patch(
    getCheckoutCartLineItemEndpoint(),
    params
  );
  return resp.data;
}
async function removeCartItem(itemId, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.delete(
    `${getCheckoutCartLineItemEndpoint()}?ids[]=${itemId}`
  );
  return resp.data;
}
async function addPromotionCode(promotionCode, contextInstance = defaultInstance) {
  const item = {
    type: "promotion",
    referencedId: promotionCode
  };
  const resp = await contextInstance.invoke.post(
    getCheckoutCartLineItemEndpoint(),
    {
      items: [item]
    }
  );
  return resp.data;
}
async function getStoreNavigation({
  requestActiveId,
  requestRootId,
  depth,
  buildTree,
  searchCriteria
}, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getStoreNavigationEndpoint(requestActiveId, requestRootId),
    {
      ...searchCriteria || {},
      ...{
        depth,
        buildTree
      }
    }
  );
  return resp.data;
}
function invokePost({
  address,
  payload
}, contextInstance = defaultInstance) {
  return contextInstance.invoke.post(address, payload);
}
async function getLandingPage(landingPageId, params, contextInstance = defaultInstance) {
  const endpoint = getLandingPageDetailsEndpoint(landingPageId);
  const response = await contextInstance.invoke.post(endpoint, params);
  return response == null ? void 0 : response.data;
}
async function getSeoUrl(params, contextInstance = defaultInstance) {
  const seoUrlResponse = await invokePost(
    {
      address: getSeoUrlEndpoint(),
      payload: params
    },
    contextInstance
  );
  return seoUrlResponse.data;
}
async function createOrder(params, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getCheckoutOrderEndpoint(),
    params
  );
  return resp.data;
}
async function handlePayment(params, contextInstance = defaultInstance) {
  if (!(params == null ? void 0 : params.orderId)) {
    throw new Error("handlePayment method requires orderId");
  }
  if (navigator == null ? void 0 : navigator.userAgent.includes("WebKit")) {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(
        "sw-context-token",
        contextInstance.config.contextToken
      );
    }
  }
  const resp = await contextInstance.invoke.get(handlePaymentEndpoint(), {
    params
  });
  return resp.data;
}
async function getOrderDetails(orderId, params, contextInstance = defaultInstance) {
  var _a, _b, _c;
  const resp = await contextInstance.invoke.post(
    getCustomerOrderEndpoint(),
    Object.assign({}, params, {
      filter: [
        {
          type: "equals",
          field: "id",
          value: orderId
        }
      ]
    })
  );
  return (_c = (_b = (_a = resp.data) == null ? void 0 : _a.orders) == null ? void 0 : _b.elements) == null ? void 0 : _c[0];
}
async function cancelOrder(orderId, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(getCancelOrderEndpoint(), {
    orderId
  });
  return resp.data;
}
async function changeOrderPaymentMethod(orderId, paymentMethodId, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getChangeOrderPaymentMethodEndpoint(),
    {
      orderId,
      paymentMethodId
    }
  );
  return resp.data;
}
async function searchProducts(criteria, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    `${getSearchEndpoint()}?search=${encodeURIComponent(
      (criteria == null ? void 0 : criteria.query) || ""
    )}`,
    criteria
  );
  return resp.data;
}
async function newsletterSubscribe(params, contextInstance = defaultInstance) {
  await contextInstance.invoke.post(
    getStoreNewsletterSubscribeEndpoint(),
    Object.assign({}, { option: "subscribe" }, params)
  );
}
async function newsletterUnsubscribe(params, contextInstance = defaultInstance) {
  await contextInstance.invoke.post(
    getStoreNewsletterUnsubscribeEndpoint(),
    params
  );
}
async function addWishlistProduct(productId, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getAddWishlistProductEndpoint(productId)
  );
  return resp.data;
}
async function getWishlistProducts(criteria, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getGetWishlistProductsEndpoint(),
    criteria
  );
  return resp.data;
}
async function removeWishlistProduct(productId, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.delete(
    getRemoveWishlistProductEndpoint(productId)
  );
  return resp.data;
}
async function mergeWishlistProducts(productIds, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.post(
    getMergeWishlistProductsEndpoint(),
    { productIds }
  );
  return resp.data;
}
defaultInstance.config;
defaultInstance.setup;
defaultInstance.update;
defaultInstance.onConfigChange;
function isProduct$1(object) {
  return (object == null ? void 0 : object.apiAlias) === "product" || (object == null ? void 0 : object.type) === "product";
}
function getMainImageUrl(product) {
  var _a, _b, _c;
  return isProduct$1(product) ? ((_b = (_a = product == null ? void 0 : product.cover) == null ? void 0 : _a.media) == null ? void 0 : _b.url) || ((_c = product == null ? void 0 : product.cover) == null ? void 0 : _c.url) || "" : "";
}
function getTranslatedProperty(element, property) {
  var _a;
  return ((_a = element == null ? void 0 : element.translated) == null ? void 0 : _a[property]) || (element == null ? void 0 : element[property]) || "";
}
function getProductName({ product } = {}) {
  if (!product) {
    return null;
  }
  return getTranslatedProperty(product, "name");
}
function getProductTierPrices(product) {
  var _a;
  if (!product || !((_a = product.calculatedPrices) == null ? void 0 : _a.length)) {
    return [];
  }
  const size = product.calculatedPrices.length;
  return product.calculatedPrices.map(({ unitPrice, quantity }, index) => ({
    label: index === size - 1 ? `from ${quantity}` : `to ${quantity}`,
    quantity,
    unitPrice
  }));
}
function getProductUrl(product) {
  var _a, _b;
  if (!product)
    return "/";
  const seoUrl = (_b = (_a = product.seoUrls) == null ? void 0 : _a[0]) == null ? void 0 : _b.seoPathInfo;
  return seoUrl ? `/${seoUrl}` : `/detail/${product.id}`;
}
function getProductThumbnailUrl(product) {
  var _a, _b, _c, _d, _e;
  const coverImageUrlFallback = ((_b = (_a = product == null ? void 0 : product.cover) == null ? void 0 : _a.media) == null ? void 0 : _b.url) || "";
  const thumbnailImage = ((_e = (_d = (_c = product == null ? void 0 : product.cover) == null ? void 0 : _c.media) == null ? void 0 : _d.thumbnails) == null ? void 0 : _e.length) && product.cover.media.thumbnails.reduce(function(res, thumb) {
    return thumb.width < res.width ? thumb : res;
  }) || null;
  return (thumbnailImage == null ? void 0 : thumbnailImage.url) || coverImageUrlFallback;
}
function getProductCalculatedListingPrice(product) {
  var _a, _b, _c;
  return ((_b = (_a = product == null ? void 0 : product.calculatedPrice) == null ? void 0 : _a.listPrice) == null ? void 0 : _b.price) || ((_c = product == null ? void 0 : product.calculatedPrice) == null ? void 0 : _c.unitPrice);
}
function getProductRealPrice(product) {
  var _a;
  if (!product) {
    return;
  }
  const real = product.calculatedPrice;
  if (((_a = product.calculatedPrices) == null ? void 0 : _a.length) > 1) {
    return product.calculatedPrices[product.calculatedPrices.length - 1];
  }
  return real;
}
function getProductFromPrice(product) {
  var _a;
  if (!product) {
    return;
  }
  const realPrice = getProductRealPrice(product);
  const displayFromPriceLabel = ((_a = product.calculatedPrices) == null ? void 0 : _a.length) > 0;
  if (displayFromPriceLabel)
    return realPrice == null ? void 0 : realPrice.unitPrice;
}
const getCategoryUrl = (category) => {
  var _a, _b;
  if (!category)
    return "/";
  switch (category.type) {
    case "link":
      return getTranslatedProperty(category, "externalLink") || "/";
    case "folder":
      return "/";
    default:
      return ((_b = (_a = category.seoUrls) == null ? void 0 : _a[0]) == null ? void 0 : _b.seoPathInfo) ? `/${category.seoUrls[0].seoPathInfo}` : category.id ? `/navigation/${category.id}` : "/";
  }
};
function getCategoryBreadcrumbs(category, options) {
  var _a;
  const breadcrumbs = ((_a = category == null ? void 0 : category.translated) == null ? void 0 : _a.breadcrumb) || (category == null ? void 0 : category.breadcrumb) || [];
  const startIndex = (options == null ? void 0 : options.startIndex) || 0;
  if (breadcrumbs.length <= startIndex)
    return [];
  return breadcrumbs.slice(startIndex).map((element) => {
    return {
      name: element
    };
  });
}
function isCmsSlot(content) {
  return content.apiAlias === "cms_slot";
}
function isCmsBlock(content) {
  return content.apiAlias === "cms_block";
}
function isCmsSection(content) {
  return content.apiAlias === "cms_section";
}
function getCmsLayoutConfiguration(content) {
  if (!content || isCmsSlot(content)) {
    return {
      cssClasses: null,
      layoutStyles: {}
    };
  }
  return {
    cssClasses: content.cssClass,
    layoutStyles: {
      backgroundColor: content.backgroundColor,
      backgroundImage: content.backgroundMedia ? `url("${content.backgroundMedia.url}")` : null,
      backgroundSize: isCmsSection(content) ? content.backgroundMediaMode : null,
      sizingMode: isCmsSection(content) ? content.sizingMode : null,
      marginBottom: isCmsBlock(content) ? content.marginBottom : null,
      marginLeft: isCmsBlock(content) ? content.marginLeft : null,
      marginRight: isCmsBlock(content) ? content.marginRight : null,
      marginTop: isCmsBlock(content) ? content.marginTop : null
    }
  };
}
function isProduct(entity) {
  return entity.apiAlias === "product";
}
const getFilter = (code, aggregation) => {
  return {
    label: getTranslatedProperty(aggregation, "name") || code,
    code,
    ...aggregation
  };
};
function isEntitiesAggregation(aggregation) {
  return aggregation.entities !== void 0;
}
function getListingFilters(aggregations) {
  if (!aggregations) {
    return [];
  }
  const transformedFilters = [];
  for (const [aggregationName, aggregation] of Object.entries(aggregations)) {
    if (aggregationName === "properties" && isEntitiesAggregation(aggregation)) {
      for (const filterEntity of aggregation.entities) {
        transformedFilters.push(getFilter(aggregationName, filterEntity));
      }
    } else if (!["properties", "options"].includes(aggregationName)) {
      transformedFilters.push(getFilter(aggregationName, aggregation));
    }
  }
  return transformedFilters;
}
const isDef = (val) => typeof val !== "undefined";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const noop = () => {
};
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke) => {
    const duration = resolveUnref(ms);
    const maxDuration = resolveUnref(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function identity(arg) {
  return arg;
}
function computedWithControl(source, fn) {
  let v = void 0;
  let track;
  let trigger;
  const dirty = ref(true);
  const update = () => {
    dirty.value = true;
    trigger();
  };
  watch(source, update, { flush: "sync" });
  const get = isFunction(fn) ? fn : fn.get;
  const set = isFunction(fn) ? void 0 : fn.set;
  const result = customRef((_track, _trigger) => {
    track = _track;
    trigger = _trigger;
    return {
      get() {
        if (dirty.value) {
          v = get();
          dirty.value = false;
        }
        track();
        return v;
      },
      set(v2) {
        set == null ? void 0 : set(v2);
      }
    };
  });
  if (Object.isExtensible(result))
    result.trigger = update;
  return result;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!state) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function syncRefs(source, targets, options = {}) {
  const {
    flush = "sync",
    deep = false,
    immediate = true
  } = options;
  if (!Array.isArray(targets))
    targets = [targets];
  return watch(source, (newValue) => targets.forEach((target) => target.value = newValue), { flush, deep, immediate });
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a = options, {
    eventFilter = bypassFilter
  } = _a, watchOptions = __objRest$5(_a, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
var __defProp$4 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
var __objRest$3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$4.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$4.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchDebounced(source, cb, options = {}) {
  const _a = options, {
    debounce = 0,
    maxWait = void 0
  } = _a, watchOptions = __objRest$3(_a, [
    "debounce",
    "maxWait"
  ]);
  return watchWithFilter(source, cb, __spreadProps$4(__spreadValues$4({}, watchOptions), {
    eventFilter: debounceFilter(debounce, { maxWait })
  }));
}
function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register2 = (el, event, listener) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events.flatMap((event) => {
      return listeners.map((listener) => register2(el, event, listener));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  let shouldListen = true;
  let fallback;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    window2.clearTimeout(fallback);
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      if (el)
        shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e);
    }, { passive: true }),
    useEventListener(window2, "pointerup", (e) => {
      if (e.button === 0) {
        const path = e.composedPath();
        e.composedPath = () => path;
        fallback = window2.setTimeout(() => listener(e), 50);
      }
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      var _a;
      const el = unrefElement(target);
      if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
        handler(event);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
function useActiveElement(options = {}) {
  var _a;
  const { window: window2 = defaultWindow } = options;
  const document2 = (_a = options.document) != null ? _a : window2 == null ? void 0 : window2.document;
  const activeElement = computedWithControl(() => null, () => document2 == null ? void 0 : document2.activeElement);
  if (window2) {
    useEventListener(window2, "blur", (event) => {
      if (event.relatedTarget !== null)
        return;
      activeElement.trigger();
    }, true);
    useEventListener(window2, "focus", activeElement.trigger, true);
  }
  return activeElement;
}
function useSupported(callback, sync = false) {
  const isSupported = ref();
  const update = () => isSupported.value = Boolean(callback());
  update();
  tryOnMounted(update, sync);
  return isSupported;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function setSSRHandler(key, fn) {
  handlers[key] = fn;
}
var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
var __hasOwnProp$f = Object.prototype.hasOwnProperty;
var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$f.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$f)
    for (var prop of __getOwnPropSymbols$f(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$f.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a = options, { window: window2 = defaultWindow } = _a, observerOptions = __objRest$2(_a, ["window"]);
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported.value && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed(() => {
    var _a, _b;
    return (_b = (_a = unrefElement(target)) == null ? void 0 : _a.namespaceURI) == null ? void 0 : _b.includes("svg");
  });
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  useResizeObserver(target, ([entry2]) => {
    const boxSize = box === "border-box" ? entry2.borderBoxSize : box === "content-box" ? entry2.contentBoxSize : entry2.devicePixelContentBoxSize;
    if (window2 && isSVG.value) {
      const $elem = unrefElement(target);
      if ($elem) {
        const styles = window2.getComputedStyle($elem);
        width.value = parseFloat(styles.width);
        height.value = parseFloat(styles.height);
      }
    } else {
      if (boxSize) {
        const formatBoxSize = Array.isArray(boxSize) ? boxSize : [boxSize];
        width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
        height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
      } else {
        width.value = entry2.contentRect.width;
        height.value = entry2.contentRect.height;
      }
    }
  }, options);
  watch(() => unrefElement(target), (ele) => {
    width.value = ele ? initialSize.width : 0;
    height.value = ele ? initialSize.height : 0;
  });
  return {
    width,
    height
  };
}
function useFocus(target, options = {}) {
  const { initialValue = false } = options;
  const activeElement = useActiveElement(options);
  const targetElement = computed(() => unrefElement(target));
  const focused = computed({
    get() {
      return isDef(activeElement.value) && isDef(targetElement.value) && activeElement.value === targetElement.value;
    },
    set(value) {
      var _a, _b;
      if (!value && focused.value)
        (_a = targetElement.value) == null ? void 0 : _a.blur();
      if (value && !focused.value)
        (_b = targetElement.value) == null ? void 0 : _b.focus();
    }
  });
  watch(targetElement, () => {
    focused.value = initialValue;
  }, { immediate: true, flush: "post" });
  return { focused };
}
const DefaultMagicKeysAliasMap = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function useMagicKeys(options = {}) {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop
  } = options;
  const current = reactive(/* @__PURE__ */ new Set());
  const obj = {
    toJSON() {
      return {};
    },
    current
  };
  const refs = useReactive ? reactive(obj) : obj;
  const metaDeps = /* @__PURE__ */ new Set();
  const usedKeys = /* @__PURE__ */ new Set();
  function setRefs(key, value) {
    if (key in refs) {
      if (useReactive)
        refs[key] = value;
      else
        refs[key].value = value;
    }
  }
  function reset() {
    current.clear();
    for (const key of usedKeys)
      setRefs(key, false);
  }
  function updateRefs(e, value) {
    var _a, _b;
    const key = (_a = e.key) == null ? void 0 : _a.toLowerCase();
    const code = (_b = e.code) == null ? void 0 : _b.toLowerCase();
    const values = [code, key].filter(Boolean);
    if (key) {
      if (value)
        current.add(key);
      else
        current.delete(key);
    }
    for (const key2 of values) {
      usedKeys.add(key2);
      setRefs(key2, value);
    }
    if (key === "meta" && !value) {
      metaDeps.forEach((key2) => {
        current.delete(key2);
        setRefs(key2, false);
      });
      metaDeps.clear();
    } else if (typeof e.getModifierState === "function" && e.getModifierState("Meta") && value) {
      [...current, ...values].forEach((key2) => metaDeps.add(key2));
    }
  }
  useEventListener(target, "keydown", (e) => {
    updateRefs(e, true);
    return onEventFired(e);
  }, { passive });
  useEventListener(target, "keyup", (e) => {
    updateRefs(e, false);
    return onEventFired(e);
  }, { passive });
  useEventListener("blur", reset, { passive: true });
  useEventListener("focus", reset, { passive: true });
  const proxy = new Proxy(refs, {
    get(target2, prop, rec) {
      if (typeof prop !== "string")
        return Reflect.get(target2, prop, rec);
      prop = prop.toLowerCase();
      if (prop in aliasMap)
        prop = aliasMap[prop];
      if (!(prop in refs)) {
        if (/[+_-]/.test(prop)) {
          const keys = prop.split(/[+_-]/g).map((i) => i.trim());
          refs[prop] = computed(() => keys.every((key) => unref(proxy[key])));
        } else {
          refs[prop] = ref(false);
        }
      }
      const r = Reflect.get(target2, prop, rec);
      return useReactive ? unref(r) : r;
    }
  });
  return proxy;
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
function useCmsElementImage(element) {
  const { getConfigValue } = useCmsElementConfig(element);
  const containerStyle = computed(() => ({
    minHeight: getConfigValue("minHeight")
  }));
  const anchorAttrs = computed(() => ({
    href: getConfigValue("url"),
    target: getConfigValue("newTab") ? "_blank" : "_self"
  }));
  const imageLink = computed(() => {
    var _a, _b;
    return {
      newTab: (_a = element.data) == null ? void 0 : _a.newTab,
      url: (_b = element.data) == null ? void 0 : _b.url
    };
  });
  const imageContainerAttrs = computed(() => {
    const attr = {};
    if (imageLink.value.url) {
      attr.href = imageLink.value.url;
    }
    if (imageLink.value.newTab) {
      attr.target = "blank";
      attr.rel = "noopener noreferrer";
    }
    return attr;
  });
  const srcset = "";
  const imageAttrs = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
      src: (_b = (_a = element.data) == null ? void 0 : _a.media) == null ? void 0 : _b.url,
      alt: (_d = (_c = element.data) == null ? void 0 : _c.media) == null ? void 0 : _d.fileName,
      srcset: ((_g = (_f = (_e = element.data) == null ? void 0 : _e.media) == null ? void 0 : _f.thumbnails) == null ? void 0 : _g.reduce(
        (previousValue, currentValue, currentIndex) => `${previousValue}${currentIndex != 0 ? "," : ""} ${currentValue.url} ${currentValue.width}w`,
        srcset
      )) || ""
    };
  });
  const displayMode = computed(
    () => getConfigValue("displayMode") || "initial"
  );
  return {
    containerStyle,
    anchorAttrs,
    imageAttrs,
    imageContainerAttrs,
    imageLink,
    displayMode
  };
}
function useCmsElementConfig(element) {
  const getConfigValue = (key) => {
    var _a;
    return (_a = element.config[key]) == null ? void 0 : _a.value;
  };
  return {
    getConfigValue
  };
}
function useShopwareContext() {
  const shopwareContext = inject("shopware", null);
  if (!shopwareContext)
    throw new Error("Shopware context is not available.");
  return {
    apiInstance: shopwareContext.apiInstance
  };
}
function _useContext(injectionName, params) {
  const isNewContext = !!(params == null ? void 0 : params.context);
  const _context = isNewContext ? ref(unref(params == null ? void 0 : params.context)) : inject(injectionName, ref());
  provide(injectionName, _context);
  if (!!(params == null ? void 0 : params.replace)) {
    _context.value = unref(params.replace);
  }
  return _context;
}
function useCategory(category) {
  const _category = _useContext("category", { context: category });
  if (!_category.value) {
    throw new Error("Category context is not provided.");
  }
  return {
    category: computed(() => _category.value)
  };
}
const cmsAssociations = {
  associations: {
    media: {},
    cmsPage: {
      associations: {
        sections: {
          associations: {
            blocks: {
              associations: {
                slots: {
                  associations: {
                    block: {
                      associations: {
                        slots: {
                          associations: {}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
function useCategorySearch() {
  const { apiInstance } = useShopwareContext();
  async function search(categoryId, options) {
    const associations = (options == null ? void 0 : options.withCmsAssociations) ? cmsAssociations : {};
    const result = await invokePost(
      {
        address: getCategoryDetailsEndpoint(categoryId),
        payload: { associations, ...options == null ? void 0 : options.query }
      },
      apiInstance
    );
    return result.data;
  }
  return {
    search
  };
}
function useProductConfigurator() {
  var _a, _b;
  const { apiInstance } = useShopwareContext();
  const { configurator, product } = useProduct();
  if (!product.value) {
    throw new Error(
      "Product configurator cannot be used without the product context."
    );
  }
  const selected = ref({});
  const isLoadingOptions = ref(!!((_a = product.value.options) == null ? void 0 : _a.length));
  const parentProductId = computed(() => {
    var _a2;
    return (_a2 = product.value) == null ? void 0 : _a2.parentId;
  });
  const getOptionGroups = computed(() => {
    return configurator.value || [];
  });
  const findGroupCodeForOption = (optionId) => {
    const group = getOptionGroups.value.find((optionGroup) => {
      var _a2;
      const optionFound = (_a2 = optionGroup.options) == null ? void 0 : _a2.find(
        (option) => option.id === optionId
      );
      return !!optionFound;
    });
    return getTranslatedProperty(group, "name");
  };
  (_b = product.value.optionIds) == null ? void 0 : _b.forEach((optionId) => {
    const optionGroupCode = findGroupCodeForOption(optionId);
    if (optionGroupCode) {
      selected.value[optionGroupCode] = optionId;
    }
  });
  const findVariantForSelectedOptions = async (options) => {
    var _a2, _b2;
    const filter = [
      {
        type: "equals",
        field: "parentId",
        value: parentProductId.value
      },
      ...Object.values(options || selected.value).map((id) => ({
        type: "equals",
        field: "optionIds",
        value: id
      }))
    ];
    try {
      if (apiInstance) {
        apiInstance.defaults.headers.common["sw-include-seo-urls"] = "true";
      }
      const response = await invokePost(
        {
          address: getProductEndpoint(),
          payload: {
            limit: 1,
            filter,
            includes: {
              product: ["id", "translated", "productNumber", "seoUrls"],
              seo_url: ["seoPathInfo"]
            },
            associations: {
              seoUrls: {}
            }
          }
        },
        apiInstance
      );
      return (_b2 = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.elements) == null ? void 0 : _b2[0];
    } catch (e) {
      console.error("SwProductDetails:findVariantForSelectedOptions", e);
    }
  };
  const handleChange = async (group, option, onChangeHandled) => {
    selected.value = Object.assign({}, selected.value, {
      [group]: option
    });
    if (typeof onChangeHandled === "function") {
      await onChangeHandled();
    }
  };
  return {
    handleChange,
    findVariantForSelectedOptions,
    isLoadingOptions,
    getOptionGroups,
    getSelectedOptions: selected
  };
}
function useProductReviews(product) {
  const { apiInstance } = useShopwareContext();
  const productReviews = ref([]);
  const loadProductReviews = async (parameters = {}) => {
    const fetchedReviews = await getProductReviews(
      product.value.id,
      void 0,
      apiInstance
    );
    productReviews.value = fetchedReviews.elements ?? [];
  };
  const addReview = async (data) => {
    await addProductReview(product.value.id, data, apiInstance);
  };
  return {
    productReviews: computed(() => productReviews.value),
    loadProductReviews,
    addReview
  };
}
function useCmsBlock(content) {
  function getSlotContent(slotName) {
    return content.slots.find((slot) => slot.slot === slotName);
  }
  return {
    block: content,
    getSlotContent
  };
}
function useCmsSection(content) {
  function getPositionContent(position) {
    return content.blocks.filter(
      (block) => block.sectionPosition === position
    );
  }
  return {
    section: content,
    getPositionContent
  };
}
function useNavigation(params) {
  const type = (params == null ? void 0 : params.type) || "main-navigation";
  const { apiInstance } = useShopwareContext();
  const sharedElements = inject(
    `swNavigation-${type}`,
    ref([])
  );
  provide(`swNavigation-${type}`, sharedElements);
  const navigationElements = computed(() => sharedElements.value);
  async function loadNavigationElements({ depth }) {
    try {
      const navigationResponse = await getStoreNavigation(
        {
          requestActiveId: type,
          requestRootId: type,
          searchCriteria: {},
          depth
        },
        apiInstance
      );
      sharedElements.value = navigationResponse || [];
      return sharedElements.value;
    } catch (e) {
      sharedElements.value = [];
      console.error("[useNavigation][loadNavigationElements]", e);
      return [];
    }
  }
  return {
    navigationElements,
    loadNavigationElements
  };
}
function useCartFunction() {
  const { apiInstance } = useShopwareContext();
  const _storeCart = _useContext("swCart");
  async function refreshCart() {
    const result = await getCart(apiInstance);
    _storeCart.value = result;
    return result;
  }
  async function addProduct(params) {
    const addToCartResult = await addProductToCart(
      params.id,
      params.quantity,
      apiInstance
    );
    _storeCart.value = addToCartResult;
    return addToCartResult;
  }
  async function removeItem(lineItem) {
    const result = await removeCartItem(lineItem.id, apiInstance);
    _storeCart.value = result;
  }
  async function changeProductQuantity(params) {
    const result = await changeCartItemQuantity(
      params.id,
      params.quantity,
      apiInstance
    );
    _storeCart.value = result;
  }
  async function submitPromotionCode(promotionCode) {
    if (promotionCode) {
      const result = await addPromotionCode(promotionCode, apiInstance);
      _storeCart.value = result;
    }
  }
  async function getProductItemsSeoUrlsData() {
    if (!cartItems.value.length) {
      return [];
    }
    const result = await getProducts(
      {
        ids: cartItems.value.map(({ referencedId }) => referencedId).filter(String)
      },
      apiInstance
    );
    return (result == null ? void 0 : result.elements) || [];
  }
  const appliedPromotionCodes = computed(() => {
    return cartItems.value.filter(
      (cartItem) => cartItem.type === "promotion"
    );
  });
  const cart = computed(() => _storeCart.value);
  const cartItems = computed(() => {
    return cart.value ? cart.value.lineItems || [] : [];
  });
  const count = computed(() => {
    return cartItems.value.reduce(
      (accumulator, lineItem) => lineItem.type === "product" ? lineItem.quantity + accumulator : accumulator,
      0
    );
  });
  const isEmpty = computed(() => count.value <= 0);
  const totalPrice = computed(() => {
    const cartPrice = cart.value && cart.value.price && cart.value.price.totalPrice;
    return cartPrice || 0;
  });
  const shippingTotal = computed(() => {
    var _a, _b, _c, _d;
    const shippingTotal2 = (_d = (_c = (_b = (_a = cart.value) == null ? void 0 : _a.deliveries) == null ? void 0 : _b[0]) == null ? void 0 : _c.shippingCosts) == null ? void 0 : _d.totalPrice;
    return shippingTotal2 || 0;
  });
  const subtotal = computed(() => {
    var _a, _b;
    const cartPrice = (_b = (_a = cart.value) == null ? void 0 : _a.price) == null ? void 0 : _b.positionPrice;
    return cartPrice || 0;
  });
  const cartErrors = computed(
    () => {
      var _a;
      return ((_a = cart.value) == null ? void 0 : _a.errors) && Object.values(cart.value.errors) || [];
    }
  );
  return {
    addProduct,
    addPromotionCode: submitPromotionCode,
    appliedPromotionCodes,
    cart,
    cartItems,
    changeProductQuantity,
    count,
    refreshCart,
    removeItem,
    totalPrice,
    shippingTotal,
    subtotal,
    cartErrors,
    getProductItemsSeoUrlsData,
    isEmpty
  };
}
const useCart = createSharedComposable(useCartFunction);
function useCartItem(cartItem) {
  if (!cartItem) {
    throw new Error("[useCartItem] mandatory cartItem argument is missing.");
  }
  const { apiInstance } = useShopwareContext();
  const { refreshCart, changeProductQuantity } = useCart();
  const itemQuantity = computed(() => cartItem.value.quantity);
  const itemImageThumbnailUrl = computed(() => getMainImageUrl(cartItem.value));
  const itemRegularPrice = computed(() => {
    var _a;
    return (_a = cartItem.value.price) == null ? void 0 : _a.unitPrice;
  });
  const itemSpecialPrice = computed(
    () => {
      var _a;
      return ((_a = cartItem.value.price) == null ? void 0 : _a.listPrice) && cartItem.value.price.unitPrice;
    }
  );
  const itemOptions = computed(
    () => {
      var _a;
      return cartItem.value.type === "product" && ((_a = cartItem.value.payload) == null ? void 0 : _a.options) || [];
    }
  );
  const itemStock = computed(() => {
    var _a;
    return (_a = cartItem.value.deliveryInformation) == null ? void 0 : _a.stock;
  });
  const itemType = computed(() => cartItem.value.type);
  const isProduct2 = computed(() => cartItem.value.type === "product");
  const isPromotion = computed(() => cartItem.value.type === "promotion");
  async function removeItem() {
    await removeCartItem(cartItem.value.id, apiInstance);
    await refreshCart();
  }
  async function changeItemQuantity(quantity) {
    await changeProductQuantity({
      id: cartItem.value.id,
      quantity
    });
  }
  async function getProductItemSeoUrlData() {
    if (!cartItem.value.referencedId) {
      return;
    }
    try {
      const result = await getProduct(
        cartItem.value.referencedId,
        {},
        apiInstance
      );
      return result.product;
    } catch (error) {
      console.error(
        "[useCart][getProductItemsSeoUrlsData]",
        error.messages
      );
    }
    return;
  }
  return {
    changeItemQuantity,
    removeItem,
    getProductItemSeoUrlData,
    itemRegularPrice,
    itemSpecialPrice,
    itemOptions,
    itemStock,
    itemQuantity,
    itemType,
    itemImageThumbnailUrl,
    isProduct: isProduct2,
    isPromotion
  };
}
function useUser() {
  const { apiInstance } = useShopwareContext();
  const { userFromContext, refreshSessionContext } = useSessionContext();
  const _user = _useContext("customer");
  syncRefs(userFromContext, _user, {
    immediate: true
  });
  const { getStorefrontUrl } = useInternationalization();
  const { refreshCart } = useCart();
  const userDefaultPaymentMethod = computed(
    () => {
      var _a, _b;
      return ((_b = (_a = user.value) == null ? void 0 : _a.defaultPaymentMethod) == null ? void 0 : _b.translated) || null;
    }
  );
  const userDefaultBillingAddress = computed(
    () => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.defaultBillingAddress) || null;
    }
  );
  const userDefaultShippingAddress = computed(
    () => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.defaultShippingAddress) || null;
    }
  );
  const country = ref(null);
  const salutation = ref(null);
  const user = computed(() => _user.value);
  async function login$1({
    username,
    password
  } = {}) {
    await login({ username, password }, apiInstance);
    await refreshSessionContext();
    refreshCart();
  }
  async function register$1(params) {
    const customer = await register(
      { ...params, storefrontUrl: getStorefrontUrl() },
      apiInstance
    );
    _user.value = customer;
    await refreshSessionContext();
    return customer;
  }
  async function logout$1() {
    await logout(apiInstance);
    await refreshSessionContext();
    refreshCart();
  }
  async function refreshUser(params = {}) {
    try {
      const user2 = await getCustomer(
        Object.assign(
          {},
          params
        ),
        apiInstance
      );
      _user.value = user2;
    } catch (e) {
      _user.value = void 0;
      console.error("[useUser][refreshUser]", e);
    }
  }
  async function loadCountry(userId) {
    country.value = await getUserCountry(userId, apiInstance);
  }
  async function loadSalutation(salutationId) {
    salutation.value = await getUserSalutation(salutationId, apiInstance);
  }
  async function updatePersonalInfo(personals) {
    await updateProfile(personals, apiInstance);
  }
  async function updateEmail$1(updateEmailData) {
    await updateEmail(updateEmailData, apiInstance);
  }
  async function setDefaultPaymentMethod(paymentMethodId) {
    await setDefaultCustomerPaymentMethod(paymentMethodId, apiInstance);
  }
  const defaultBillingAddressId = computed(
    () => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.defaultBillingAddressId) || null;
    }
  );
  const defaultShippingAddressId = computed(
    () => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.defaultShippingAddressId) || null;
    }
  );
  const isLoggedIn = computed(
    () => {
      var _a;
      return !!((_a = user.value) == null ? void 0 : _a.id) && !!user.value.active && !user.value.guest;
    }
  );
  const isCustomerSession = computed(
    () => {
      var _a;
      return !!((_a = user.value) == null ? void 0 : _a.id) && !user.value.guest;
    }
  );
  const isGuestSession = computed(() => {
    var _a;
    return !!((_a = user.value) == null ? void 0 : _a.guest);
  });
  return {
    login: login$1,
    register: register$1,
    user,
    isLoggedIn,
    isCustomerSession,
    isGuestSession,
    refreshUser,
    logout: logout$1,
    updateEmail: updateEmail$1,
    updatePersonalInfo,
    setDefaultPaymentMethod,
    loadSalutation,
    salutation,
    loadCountry,
    country,
    defaultBillingAddressId,
    defaultShippingAddressId,
    userDefaultPaymentMethod,
    userDefaultBillingAddress,
    userDefaultShippingAddress
  };
}
const currencySymbol = ref("");
const currencyPosition = ref(1);
const decimalPrecision = 2;
function usePrice() {
  function init(params) {
    _setCurrencySymbol(params.currencySymbol);
    _setCurrencyPosition(params.currencyPosition);
  }
  function _setCurrencySymbol(symbol) {
    currencySymbol.value = symbol;
  }
  function _setCurrencyPosition(position) {
    currencyPosition.value = position;
  }
  function getFormattedPrice(value) {
    if (typeof value === "undefined") {
      return "";
    }
    let formattedPrice = [
      (+value).toFixed(decimalPrecision),
      currencySymbol.value
    ];
    if (currencyPosition.value === 0) {
      formattedPrice = formattedPrice.reverse();
    }
    return formattedPrice.join(" ");
  }
  return {
    init,
    getFormattedPrice
  };
}
function useSessionContext(newContext) {
  const { apiInstance } = useShopwareContext();
  const { init } = usePrice();
  const _sessionContext = _useContext("swSessionContext", {
    replace: newContext
  });
  const sessionContext = computed(() => _sessionContext.value);
  const refreshSessionContext = async () => {
    try {
      const context = await getSessionContext(apiInstance);
      _sessionContext.value = context;
      init({
        currencyPosition: context.currency.position,
        currencySymbol: context.currency.symbol
      });
    } catch (e) {
      console.error("[UseSessionContext][refreshSessionContext]", e);
    }
  };
  const selectedShippingMethod = computed(
    () => {
      var _a;
      return ((_a = sessionContext.value) == null ? void 0 : _a.shippingMethod) || null;
    }
  );
  const setShippingMethod = async (shippingMethod = {}) => {
    if (!(shippingMethod == null ? void 0 : shippingMethod.id)) {
      throw new Error(
        "You need to provide shipping method id in order to set shipping method."
      );
    }
    await setCurrentShippingMethod(shippingMethod.id, apiInstance);
    await refreshSessionContext();
  };
  const selectedPaymentMethod = computed(
    () => {
      var _a;
      return ((_a = sessionContext.value) == null ? void 0 : _a.paymentMethod) || null;
    }
  );
  const setPaymentMethod = async (paymentMethod = {}) => {
    if (!(paymentMethod == null ? void 0 : paymentMethod.id)) {
      throw new Error(
        "You need to provide payment method id in order to set payment method."
      );
    }
    await setCurrentPaymentMethod(paymentMethod.id, apiInstance);
    await refreshSessionContext();
  };
  const currency = computed(() => {
    var _a;
    return ((_a = sessionContext.value) == null ? void 0 : _a.currency) || null;
  });
  const setCurrency = async (currency2 = {}) => {
    if (!currency2.id) {
      console.error(
        "You need to provide currency id in order to set currency.",
        currency2
      );
      return;
    }
    await setCurrentCurrency(currency2.id, apiInstance);
    await refreshSessionContext();
  };
  const setLanguage = async (language = {}) => {
    if (!language.id) {
      return;
    }
    await setCurrentLanguage(language.id, apiInstance);
    await refreshSessionContext();
  };
  const activeShippingAddress = computed(
    () => {
      var _a, _b;
      return ((_b = (_a = sessionContext.value) == null ? void 0 : _a.customer) == null ? void 0 : _b.activeShippingAddress) || null;
    }
  );
  const setActiveShippingAddress = async (address) => {
    if (!(address == null ? void 0 : address.id)) {
      throw new Error(
        "You need to provide address id in order to set the address."
      );
    }
    await setCurrentShippingAddress(address.id, apiInstance);
    refreshSessionContext();
  };
  const activeBillingAddress = computed(
    () => {
      var _a, _b;
      return ((_b = (_a = sessionContext.value) == null ? void 0 : _a.customer) == null ? void 0 : _b.activeBillingAddress) || null;
    }
  );
  const setActiveBillingAddress = async (address) => {
    if (!(address == null ? void 0 : address.id)) {
      throw new Error(
        "You need to provide address id in order to set the address."
      );
    }
    await setCurrentBillingAddress(address.id, apiInstance);
    refreshSessionContext();
  };
  const countryId = computed(
    () => {
      var _a, _b;
      return (_b = (_a = sessionContext.value) == null ? void 0 : _a.salesChannel) == null ? void 0 : _b.countryId;
    }
  );
  const taxState = computed(() => {
    var _a, _b;
    return (_b = (_a = sessionContext.value) == null ? void 0 : _a.context) == null ? void 0 : _b.taxState;
  });
  const userFromContext = computed(() => {
    var _a;
    return (_a = sessionContext.value) == null ? void 0 : _a.customer;
  });
  return {
    sessionContext,
    refreshSessionContext,
    selectedShippingMethod,
    setShippingMethod,
    selectedPaymentMethod,
    setPaymentMethod,
    currency,
    setCurrency,
    activeShippingAddress,
    setActiveShippingAddress,
    activeBillingAddress,
    setActiveBillingAddress,
    countryId,
    taxState,
    userFromContext,
    setLanguage
  };
}
function useAddToCart(product) {
  const _product = computed(() => unref(product));
  const { addProduct, cartItems } = useCart();
  const quantity = ref(1);
  async function addToCart() {
    if (!quantity.value)
      quantity.value = 1;
    const addToCartResponse = await addProduct({
      id: _product.value.id,
      quantity: quantity.value
    });
    quantity.value = 1;
    return addToCartResponse;
  }
  const getStock = computed(() => {
    var _a;
    return (_a = _product.value) == null ? void 0 : _a.stock;
  });
  const getAvailableStock = computed(() => {
    var _a;
    return (_a = _product.value) == null ? void 0 : _a.availableStock;
  });
  const isInCart = computed(
    () => cartItems.value.some(
      (item) => {
        var _a;
        return item.referencedId === ((_a = _product.value) == null ? void 0 : _a.id);
      }
    )
  );
  return {
    addToCart,
    quantity,
    getStock,
    getAvailableStock,
    isInCart
  };
}
function useNotifications() {
  const _notifications = inject(
    "swNotifications",
    ref([])
  );
  provide("swNotifications", _notifications);
  function removeOne(notificationId) {
    var _a;
    _notifications.value = ((_a = _notifications.value) == null ? void 0 : _a.filter(({ id }) => id !== notificationId)) || [];
  }
  function removeAll() {
    _notifications.value = [];
  }
  function geterateId() {
    return new Date().getTime();
  }
  async function pushNotification(message, options) {
    const timeout = options.timeout || 2500;
    const persistent = !!options.persistent;
    _notifications.value = _notifications.value || [];
    const messageId = geterateId();
    _notifications.value.push({
      id: messageId,
      type: options.type || "info",
      message
    });
    if (!persistent) {
      setTimeout(() => {
        removeOne(messageId);
      }, timeout);
    }
  }
  return {
    removeOne,
    removeAll,
    pushInfo: (message, options = {}) => pushNotification(message, { ...options, type: "info" }),
    pushSuccess: (message, options = {}) => pushNotification(message, { ...options, type: "success" }),
    pushWarning: (message, options = {}) => pushNotification(message, { ...options, type: "warning" }),
    pushError: (message, options = {}) => pushNotification(message, { ...options, type: "danger" }),
    notifications: computed(() => _notifications.value || [])
  };
}
function useLandingSearch() {
  const { apiInstance } = useShopwareContext();
  const search = async (navigationId, options) => {
    const associations = (options == null ? void 0 : options.withCmsAssociations) && cmsAssociations;
    const result = await getLandingPage(
      navigationId,
      associations || {},
      apiInstance
    );
    return result;
  };
  return {
    search
  };
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function merge(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (source === void 0) {
    return target;
  }
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return merge(target, ...sources);
}
function useListing(params) {
  var _a;
  const listingType = (params == null ? void 0 : params.listingType) || "categoryListing";
  const { apiInstance } = useShopwareContext();
  let searchMethod;
  if (listingType === "productSearchListing") {
    searchMethod = async (searchCriteria) => {
      return searchProducts(searchCriteria, apiInstance);
    };
  } else {
    const { category } = useCategory();
    const resourceId = ((_a = category.value) == null ? void 0 : _a.id) || (params == null ? void 0 : params.categoryId);
    searchMethod = async (searchCriteria) => {
      if (!resourceId) {
        throw new Error(
          "[useListing][search] Search category id does not exist."
        );
      }
      return getCategoryProducts(resourceId, searchCriteria, apiInstance);
    };
  }
  return createListingComposable({
    listingKey: listingType,
    searchMethod,
    searchDefaults: (params == null ? void 0 : params.defaultSearchCriteria) || {}
  });
}
function createListingComposable({
  searchMethod,
  searchDefaults,
  listingKey
}) {
  const loading = ref(false);
  const loadingMore = ref(false);
  const _storeInitialListing = inject(`useListingInitial-${listingKey}`, ref());
  provide(`useListingInitial-${listingKey}`, _storeInitialListing);
  const _storeAppliedListing = inject(`useListingApplied-${listingKey}`, ref());
  provide(`useListingApplied-${listingKey}`, _storeAppliedListing);
  const getInitialListing = computed(() => _storeInitialListing.value);
  const setInitialListing = async (initialListing) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = initialListing == null ? void 0 : initialListing.currentFilters) == null ? void 0 : _a.manufacturer) == null ? void 0 : _b.length) || ((_d = (_c = initialListing == null ? void 0 : initialListing.currentFilters) == null ? void 0 : _c.properties) == null ? void 0 : _d.length)) {
      loading.value = true;
      const allFiltersResult = await searchMethod({
        query: initialListing.currentFilters.search || void 0
      });
      initialListing = Object.assign({}, initialListing, {
        aggregations: allFiltersResult == null ? void 0 : allFiltersResult.aggregations
      });
    }
    _storeInitialListing.value = initialListing;
    _storeAppliedListing.value = null;
    loading.value = false;
  };
  const initSearch = async (criteria) => {
    loading.value = true;
    try {
      const searchCriteria = merge({}, searchDefaults, criteria);
      const result = await searchMethod(searchCriteria);
      return result;
      await setInitialListing(result);
    } catch (e) {
      throw e;
    } finally {
      loading.value = false;
    }
  };
  async function search(criteria, options) {
    loading.value = true;
    try {
      const searchCriteria = merge({}, searchDefaults, criteria);
      const [result, allFiltersResult] = await Promise.all([
        searchMethod(searchCriteria),
        searchMethod({
          query: searchCriteria.query,
          includes: { product_listing: ["aggregations"] }
        })
      ]);
      _storeAppliedListing.value = Object.assign({}, result, {
        aggregations: Object.assign(
          {},
          result == null ? void 0 : result.aggregations,
          allFiltersResult == null ? void 0 : allFiltersResult.aggregations
        )
      });
    } catch (e) {
      throw e;
    } finally {
      loading.value = false;
    }
  }
  const loadMore = async () => {
    var _a;
    loadingMore.value = true;
    try {
      const query = {
        p: getCurrentPage.value + 1
      };
      const searchCriteria = merge({}, searchDefaults, query);
      const result = await searchMethod(searchCriteria);
      _storeAppliedListing.value = {
        ...getCurrentListing.value,
        page: result.page,
        elements: [
          ...((_a = getCurrentListing.value) == null ? void 0 : _a.elements) || [],
          ...result.elements
        ]
      };
    } catch (e) {
      throw e;
    } finally {
      loadingMore.value = false;
    }
  };
  const getCurrentListing = computed(() => {
    return _storeAppliedListing.value || getInitialListing.value;
  });
  const getElements = computed(() => {
    var _a;
    return ((_a = getCurrentListing.value) == null ? void 0 : _a.elements) || [];
  });
  const getTotal = computed(() => {
    var _a;
    return ((_a = getCurrentListing.value) == null ? void 0 : _a.total) || 0;
  });
  const getLimit = computed(() => {
    var _a;
    return ((_a = getCurrentListing.value) == null ? void 0 : _a.limit) || (searchDefaults == null ? void 0 : searchDefaults.limit) || 10;
  });
  const getTotalPagesCount = computed(
    () => Math.ceil(getTotal.value / getLimit.value)
  );
  const getSortingOrders = computed(() => {
    var _a, _b;
    const oldSortings = Object.values(((_a = getCurrentListing.value) == null ? void 0 : _a.sortings) || {});
    return ((_b = getCurrentListing.value) == null ? void 0 : _b.availableSortings) || oldSortings;
  });
  const getCurrentSortingOrder = computed(
    () => {
      var _a;
      return (_a = getCurrentListing.value) == null ? void 0 : _a.sorting;
    }
  );
  async function changeCurrentSortingOrder(query) {
    await search(query || {});
  }
  const getCurrentPage = computed(() => {
    var _a;
    return ((_a = getCurrentListing.value) == null ? void 0 : _a.page) || 1;
  });
  const changeCurrentPage = async (query) => {
    await search(query || {});
  };
  const getInitialFilters = computed(() => {
    var _a;
    return getListingFilters((_a = getInitialListing.value) == null ? void 0 : _a.aggregations);
  });
  const getAvailableFilters = computed(() => {
    var _a, _b;
    return getListingFilters(
      ((_a = _storeAppliedListing.value) == null ? void 0 : _a.aggregations) || ((_b = getCurrentListing.value) == null ? void 0 : _b.aggregations)
    );
  });
  const getCurrentFilters = computed(() => {
    var _a;
    const currentFiltersResult = {};
    const currentFilters = {
      ...(_a = getCurrentListing.value) == null ? void 0 : _a.currentFilters
    };
    Object.keys(currentFilters).forEach((objectKey) => {
      if (!currentFilters[objectKey])
        return;
      if (objectKey === "navigationId")
        return;
      if (objectKey === "price") {
        if (currentFilters[objectKey].min)
          currentFiltersResult["min-price"] = currentFilters[objectKey].min;
        if (currentFilters[objectKey].max)
          currentFiltersResult["max-price"] = currentFilters[objectKey].max;
        return;
      }
      if (objectKey === "p")
        return;
      currentFiltersResult[objectKey] = currentFilters[objectKey];
    });
    return currentFiltersResult;
  });
  const setCurrentFilters = (filter) => {
    const appliedFilters = Object.assign({}, getCurrentFilters.value, filter, {
      query: getCurrentFilters.value.search
    });
    _storeAppliedListing.value.currentFilters = appliedFilters;
    return search(appliedFilters);
  };
  const resetFilters = () => {
    const defaultFilters = Object.assign(
      {
        manufacturer: [],
        properties: [],
        price: { min: 0, max: 0 },
        search: getCurrentFilters.value.search
      },
      searchDefaults
    );
    _storeAppliedListing.value.currentFilters = defaultFilters;
    return search({ query: getCurrentFilters.value.search });
  };
  const filtersToQuery = (filters) => {
    let queryObject = {};
    for (const filter in filters) {
      if (filters[filter]) {
        if (Array.isArray(filters[filter]) && filters[filter].length) {
          queryObject[filter] = filters[filter].join("|");
        } else if (!Array.isArray(filters[filter])) {
          queryObject[filter] = filters[filter];
        }
      }
    }
    return queryObject;
  };
  return {
    getInitialListing,
    setInitialListing,
    initSearch,
    search,
    getCurrentListing,
    getElements,
    getSortingOrders,
    getCurrentSortingOrder,
    changeCurrentSortingOrder,
    getCurrentPage,
    changeCurrentPage,
    getTotal,
    getTotalPagesCount,
    getLimit,
    getInitialFilters,
    getAvailableFilters,
    getCurrentFilters,
    setCurrentFilters,
    loading: computed(() => loading.value),
    loadMore,
    loadingMore: computed(() => loadingMore.value),
    resetFilters,
    filtersToQuery
  };
}
function useProduct(product, configurator) {
  const _product = _useContext("product", { context: product });
  if (!_product.value) {
    throw new Error("Product context is not provided");
  }
  const _configurator = _useContext("configurator", {
    context: product && configurator
  });
  function changeVariant(variant) {
    _product.value = Object.assign({}, _product.value, variant);
  }
  return {
    product: computed(() => _product.value),
    configurator: computed(() => _configurator.value),
    changeVariant
  };
}
function useProductSearch() {
  const { apiInstance } = useShopwareContext();
  const search = async (productId, options) => {
    const associations = (options == null ? void 0 : options.withCmsAssociations) && cmsAssociations;
    const result = await getProduct(productId, associations, apiInstance);
    return result;
  };
  return {
    search
  };
}
function useCheckout() {
  const { apiInstance } = useShopwareContext();
  const { refreshCart } = useCart();
  const {
    sessionContext,
    selectedPaymentMethod,
    selectedShippingMethod,
    setShippingMethod,
    setPaymentMethod
  } = useSessionContext();
  const storeShippingMethods = inject("swShippingMethods", ref());
  provide("swShippingMethods", storeShippingMethods);
  const storePaymentMethods = inject("swPaymentMethods", ref());
  provide("swPaymentMethods", storePaymentMethods);
  const shippingMethods = computed(() => storeShippingMethods.value || []);
  const paymentMethods = computed(() => storePaymentMethods.value || []);
  async function getShippingMethods({ forceReload } = { forceReload: false }) {
    if (shippingMethods.value.length && !forceReload)
      return shippingMethods;
    const response = await getAvailableShippingMethods(apiInstance, {
      onlyAvailable: true
    });
    storeShippingMethods.value = (response == null ? void 0 : response.elements) || [];
    return shippingMethods;
  }
  async function getPaymentMethods({ forceReload } = { forceReload: false }) {
    if (paymentMethods.value.length && !forceReload)
      return paymentMethods;
    const response = await getAvailablePaymentMethods(apiInstance, {
      onlyAvailable: true
    });
    storePaymentMethods.value = (response == null ? void 0 : response.elements) || [];
    return paymentMethods;
  }
  async function createOrder$1(params) {
    try {
      const order = await createOrder(params, apiInstance);
      return order;
    } catch (e) {
      const err = e;
      throw err;
    } finally {
      refreshCart();
    }
  }
  const shippingAddress = computed(
    () => {
      var _a, _b;
      return (_b = (_a = sessionContext.value) == null ? void 0 : _a.shippingLocation) == null ? void 0 : _b.address;
    }
  );
  const billingAddress = computed(
    () => {
      var _a, _b;
      return (_b = (_a = sessionContext.value) == null ? void 0 : _a.customer) == null ? void 0 : _b.activeBillingAddress;
    }
  );
  return {
    getPaymentMethods,
    paymentMethods,
    getShippingMethods,
    shippingMethods,
    createOrder: createOrder$1,
    shippingAddress,
    billingAddress,
    selectedShippingMethod,
    setShippingMethod,
    selectedPaymentMethod,
    setPaymentMethod
  };
}
function useSalutations() {
  const { apiInstance } = useShopwareContext();
  const _salutations = inject("swSalutations", ref());
  provide("swSalutations", _salutations);
  const error = ref(null);
  const fetchSalutations = async () => {
    try {
      const { elements } = await getAvailableSalutations(apiInstance);
      _salutations.value = elements;
    } catch (e) {
      const err = e;
      error.value = err.messages;
    }
  };
  const mountedCallback = async () => {
    if (!_salutations.value) {
      await fetchSalutations();
    }
  };
  const getSalutations = computed(() => {
    return _salutations.value || [];
  });
  return {
    mountedCallback,
    fetchSalutations,
    getSalutations
  };
}
function useCountries() {
  const { apiInstance } = useShopwareContext();
  const _sharedCountried = inject("swCountries", ref());
  provide("swCountries", _sharedCountried);
  async function fetchCountries() {
    const { elements } = await getAvailableCountries(apiInstance);
    _sharedCountried.value = elements;
  }
  const getCountries = computed(() => {
    return _sharedCountried.value ?? [];
  });
  const mountedCallback = async () => {
    if (!_sharedCountried.value) {
      await fetchCountries();
    }
  };
  return {
    mountedCallback,
    fetchCountries,
    getCountries
  };
}
const orderAssociations = {
  associations: {
    lineItems: {
      associations: {
        cover: {}
      }
    },
    addresses: {},
    deliveries: {
      associations: {
        shippingMethod: {}
      }
    },
    transactions: {
      associations: {
        paymentMethod: {}
      },
      sort: "-createdAt"
    }
  }
};
function useOrderDetails(orderId) {
  const { apiInstance } = useShopwareContext();
  const _sharedOrder = inject("swOrderDetails", ref());
  provide("swOrderDetails", _sharedOrder);
  const paymentMethod = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.transactions) == null ? void 0 : _b[0]) == null ? void 0 : _c.paymentMethod;
    }
  );
  const shippingMethod = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.deliveries) == null ? void 0 : _b[0]) == null ? void 0 : _c.shippingMethod;
    }
  );
  const paymentUrl = ref();
  const personalDetails = computed(() => {
    var _a, _b, _c, _d, _e, _f;
    return {
      email: (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.orderCustomer) == null ? void 0 : _b.email,
      firstName: (_d = (_c = _sharedOrder.value) == null ? void 0 : _c.orderCustomer) == null ? void 0 : _d.firstName,
      lastName: (_f = (_e = _sharedOrder.value) == null ? void 0 : _e.orderCustomer) == null ? void 0 : _f.lastName
    };
  });
  const billingAddress = computed(
    () => {
      var _a, _b;
      return (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.addresses) == null ? void 0 : _b.find(
        ({ id }) => id === _sharedOrder.value.billingAddressId
      );
    }
  );
  const shippingAddress = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.deliveries) == null ? void 0 : _b[0]) == null ? void 0 : _c.shippingOrderAddress;
    }
  );
  const shippingCosts = computed(() => {
    var _a;
    return (_a = _sharedOrder.value) == null ? void 0 : _a.shippingTotal;
  });
  const subtotal = computed(() => {
    var _a, _b;
    return (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.price) == null ? void 0 : _b.positionPrice;
  });
  const total = computed(() => {
    var _a, _b;
    return (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.price) == null ? void 0 : _b.totalPrice;
  });
  const status = computed(() => {
    var _a, _b;
    return (_b = (_a = _sharedOrder.value) == null ? void 0 : _a.stateMachineState) == null ? void 0 : _b.name;
  });
  async function loadOrderDetails() {
    const orderDetailsResponse = await getOrderDetails(
      orderId,
      orderAssociations,
      apiInstance
    );
    _sharedOrder.value = orderDetailsResponse ?? null;
  }
  async function handlePayment$1(finishUrl, errorUrl, paymentDetails) {
    const resp = await handlePayment(
      {
        orderId,
        finishUrl,
        errorUrl,
        paymentDetails
      },
      apiInstance
    );
    paymentUrl.value = resp == null ? void 0 : resp.redirectUrl;
  }
  async function cancel() {
    await cancelOrder(orderId, apiInstance);
    await loadOrderDetails();
  }
  async function changePaymentMethod(paymentMethodId) {
    await changeOrderPaymentMethod(orderId, paymentMethodId, apiInstance);
    await loadOrderDetails();
  }
  return {
    order: computed(() => _sharedOrder.value),
    status,
    total,
    subtotal,
    shippingCosts,
    shippingAddress,
    billingAddress,
    personalDetails,
    paymentUrl,
    shippingMethod,
    paymentMethod,
    loadOrderDetails,
    handlePayment: handlePayment$1,
    cancel,
    changePaymentMethod
  };
}
function useOrderPayment(order) {
  const { apiInstance } = useShopwareContext();
  const activeTransaction = computed(
    () => {
      var _a, _b;
      return (_b = (_a = order.value) == null ? void 0 : _a.transactions) == null ? void 0 : _b.find((t) => {
        var _a2;
        return ((_a2 = t.paymentMethod) == null ? void 0 : _a2.active) === true;
      });
    }
  );
  const paymentMethod = computed(() => {
    var _a;
    return (_a = activeTransaction.value) == null ? void 0 : _a.paymentMethod;
  });
  const paymentUrl = ref();
  const state = computed(() => {
    var _a;
    return (_a = activeTransaction.value) == null ? void 0 : _a.stateMachineState;
  });
  const isAsynchronous = computed(
    () => {
      var _a, _b, _c, _d;
      return ((_b = (_a = activeTransaction.value) == null ? void 0 : _a.paymentMethod) == null ? void 0 : _b.asynchronous) && ((_d = (_c = activeTransaction.value) == null ? void 0 : _c.paymentMethod) == null ? void 0 : _d.afterOrderEnabled);
    }
  );
  async function handlePayment$1(finishUrl, errorUrl, paymentDetails) {
    var _a;
    if (!order.value) {
      return;
    }
    const resp = await handlePayment(
      {
        orderId: (_a = order.value) == null ? void 0 : _a.id,
        finishUrl,
        errorUrl,
        paymentDetails
      },
      apiInstance
    );
    paymentUrl.value = resp == null ? void 0 : resp.redirectUrl;
    return resp;
  }
  async function changePaymentMethod(paymentMethodId) {
    var _a;
    if (!order.value) {
      return;
    }
    changeOrderPaymentMethod((_a = order.value) == null ? void 0 : _a.id, paymentMethodId, apiInstance);
  }
  return {
    isAsynchronous,
    activeTransaction,
    state,
    paymentUrl,
    paymentMethod,
    handlePayment: handlePayment$1,
    changePaymentMethod
  };
}
const _wishlistItems$1 = ref([]);
function useLocalWishlist() {
  const updateStorage = () => {
    localStorage.setItem(
      "sw-wishlist-items",
      JSON.stringify(_wishlistItems$1.value)
    );
  };
  const getFromStorage = () => {
  };
  async function removeFromWishlist(id) {
    var _a;
    _wishlistItems$1.value = (_a = _wishlistItems$1.value) == null ? void 0 : _a.filter(
      (itemId) => itemId != id
    );
    updateStorage();
  }
  async function addToWishlist(id) {
    if (!_wishlistItems$1.value.includes(id)) {
      _wishlistItems$1.value.push(id);
      updateStorage();
    }
  }
  async function clearWishlist() {
    _wishlistItems$1.value = [];
    updateStorage();
  }
  function getWishlistProducts2() {
    const currentWishlist = getFromStorage();
    if (Array.isArray(currentWishlist) && currentWishlist.length) {
      _wishlistItems$1.value = currentWishlist;
    }
  }
  const items = computed(() => _wishlistItems$1.value);
  const count = computed(() => items.value.length);
  return {
    getWishlistProducts: getWishlistProducts2,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    items,
    count
  };
}
const _wishlistItems = ref([]);
function useSyncWishlist() {
  const { apiInstance } = useShopwareContext();
  async function addToWishlistSync(id) {
    await addWishlistProduct(id, apiInstance);
    getWishlistProducts$1();
  }
  async function removeFromWishlistSync(id) {
    await removeWishlistProduct(id, apiInstance);
    getWishlistProducts$1();
  }
  async function getWishlistProducts$1() {
    const response = await getWishlistProducts(void 0, apiInstance);
    _wishlistItems.value = [
      ...response.products.elements.map((element) => element.id)
    ];
  }
  async function mergeWishlistProducts$1(itemsToMerge) {
    await mergeWishlistProducts(itemsToMerge, apiInstance);
  }
  const items = computed(() => _wishlistItems.value);
  const count = computed(() => items.value.length);
  return {
    getWishlistProducts: getWishlistProducts$1,
    addToWishlistSync,
    removeFromWishlistSync,
    mergeWishlistProducts: mergeWishlistProducts$1,
    items,
    count
  };
}
function useProductSearchSuggest() {
  const searchTerm = ref("");
  const listingComposable = useListing({
    listingType: "productSearchListing"
  });
  const search = async (additionalCriteria = {}) => {
    const searchCriteria = {
      query: searchTerm.value,
      ...additionalCriteria
    };
    return listingComposable.search(searchCriteria, {
      preventRouteChange: true
    });
  };
  return {
    searchTerm,
    loading: listingComposable.loading,
    search,
    loadMore: listingComposable.loadMore,
    getProducts: listingComposable.getElements,
    getTotal: listingComposable.getTotal
  };
}
function useCustomerPassword() {
  const { apiInstance } = useShopwareContext();
  const errors = reactive({
    resetPassword: [],
    updatePassword: []
  });
  async function updatePassword$1(updatePasswordData) {
    try {
      errors.updatePassword = [];
      await updatePassword(updatePasswordData, apiInstance);
    } catch (e) {
      errors.updatePassword = e.messages;
      return false;
    }
    return true;
  }
  async function resetPassword$1(resetPasswordData) {
    try {
      await resetPassword(resetPasswordData, apiInstance);
    } catch (e) {
      errors.resetPassword = e.messages;
      return false;
    }
    return true;
  }
  return {
    updatePassword: updatePassword$1,
    resetPassword: resetPassword$1,
    errors
  };
}
function useCustomerOrders() {
  const { apiInstance } = useShopwareContext();
  const orders = ref([]);
  const loadOrders = async (parameters = {}) => {
    const fetchedOrders = await getCustomerOrders(parameters, apiInstance);
    orders.value = fetchedOrders == null ? void 0 : fetchedOrders.elements;
  };
  const changeCurrentPage = async (pageNumber) => await loadOrders({ page: +pageNumber });
  return {
    orders,
    changeCurrentPage,
    loadOrders
  };
}
function createShopwareContext(app, options) {
  const scope = effectScope(true);
  const state = scope.run(() => {
    return reactive({
      interceptors: {}
    });
  });
  const shopwarePlugin = markRaw({
    install(app2, options2) {
      shopwarePlugin._a = app2;
      app2.config.globalProperties.$shopware = shopwarePlugin;
      app2.provide("shopware", shopwarePlugin);
      if ((options2 == null ? void 0 : options2.enableDevtools) && false)
        ;
    },
    _a: app,
    _e: scope,
    apiInstance: options.apiInstance,
    state
  });
  if ((options == null ? void 0 : options.enableDevtools) && false)
    ;
  return shopwarePlugin;
}
function useAddress() {
  const { apiInstance } = useShopwareContext();
  const { isLoggedIn, isGuestSession } = useUser();
  const _storeCustomerAddresses = inject(
    "swCustomerAddresses",
    ref([])
  );
  provide("swCustomerAddresses", _storeCustomerAddresses);
  watch(isLoggedIn, () => {
    _storeCustomerAddresses.value = [];
    loadCustomerAddresses();
  });
  async function loadCustomerAddresses(parameters = {}) {
    const { elements } = await getCustomerAddresses(parameters, apiInstance);
    _storeCustomerAddresses.value = elements;
  }
  async function createCustomerAddress$1(customerAddress) {
    const result = await createCustomerAddress(customerAddress, apiInstance);
    await loadCustomerAddresses();
    return result;
  }
  async function updateCustomerAddress$1(customerAddress) {
    const result = await updateCustomerAddress(customerAddress, apiInstance);
    await loadCustomerAddresses();
    return result;
  }
  async function deleteCustomerAddress$1(addressId) {
    const result = deleteCustomerAddress(addressId, apiInstance);
    await loadCustomerAddresses();
    return result;
  }
  async function setDefaultCustomerBillingAddress$1(addressId) {
    return await setDefaultCustomerBillingAddress(addressId, apiInstance);
  }
  async function setDefaultCustomerShippingAddress$1(addressId) {
    return await setDefaultCustomerShippingAddress(addressId, apiInstance);
  }
  return {
    customerAddresses: computed(() => _storeCustomerAddresses.value || []),
    loadCustomerAddresses,
    createCustomerAddress: createCustomerAddress$1,
    updateCustomerAddress: updateCustomerAddress$1,
    deleteCustomerAddress: deleteCustomerAddress$1,
    setDefaultCustomerBillingAddress: setDefaultCustomerBillingAddress$1,
    setDefaultCustomerShippingAddress: setDefaultCustomerShippingAddress$1
  };
}
function useProductPrice(product) {
  const _cheapest = computed(
    () => {
      var _a;
      return (_a = product.value) == null ? void 0 : _a.calculatedCheapestPrice;
    }
  );
  const _real = computed(
    () => {
      var _a, _b, _c, _d;
      return ((_b = (_a = product.value) == null ? void 0 : _a.calculatedPrices) == null ? void 0 : _b.length) > 0 ? (_c = product.value) == null ? void 0 : _c.calculatedPrices[0] : (_d = product.value) == null ? void 0 : _d.calculatedPrice;
    }
  );
  const referencePrice = computed(
    () => {
      var _a;
      return (_a = _real == null ? void 0 : _real.value) == null ? void 0 : _a.referencePrice;
    }
  );
  const _displayParent = computed(
    () => {
      var _a, _b, _c;
      return ((_b = (_a = product.value) == null ? void 0 : _a.variantListingConfig) == null ? void 0 : _b.displayParent) && ((_c = product.value) == null ? void 0 : _c.parentId) === null;
    }
  );
  const displayFrom = computed(
    () => {
      var _a, _b;
      return ((_b = (_a = product.value) == null ? void 0 : _a.calculatedPrices) == null ? void 0 : _b.length) > 1 || !!(_displayParent.value && displayFromVariants.value);
    }
  );
  const displayFromVariants = computed(
    () => {
      var _a, _b, _c, _d, _e, _f, _g;
      return !!product.value.parentId && ((_b = (_a = product.value) == null ? void 0 : _a.cheapestPrice) == null ? void 0 : _b.hasRange) && !!((_d = (_c = product.value) == null ? void 0 : _c.cheapestPrice) == null ? void 0 : _d.parentId) && ((_e = _real == null ? void 0 : _real.value) == null ? void 0 : _e.unitPrice) !== ((_f = _cheapest == null ? void 0 : _cheapest.value) == null ? void 0 : _f.unitPrice) && ((_g = _cheapest == null ? void 0 : _cheapest.value) == null ? void 0 : _g.unitPrice);
    }
  );
  const _price = computed(() => {
    var _a;
    if (displayFrom.value && getProductTierPrices(product.value).length > 1) {
      const lowest = (_a = product.value) == null ? void 0 : _a.calculatedPrices.reduce(
        (previous, current) => {
          return current.unitPrice < previous.unitPrice ? current : previous;
        }
      );
      return lowest || _cheapest.value;
    }
    return _real.value;
  });
  const unitPrice = computed(
    () => {
      var _a;
      return (_a = _price.value) == null ? void 0 : _a.unitPrice;
    }
  );
  const totalPrice = computed(
    () => {
      var _a;
      return (_a = _price.value) == null ? void 0 : _a.totalPrice;
    }
  );
  const price = computed(
    () => _price.value
  );
  const isListPrice = computed(
    () => {
      var _a, _b;
      return !!((_b = (_a = _price.value) == null ? void 0 : _a.listPrice) == null ? void 0 : _b.percentage);
    }
  );
  const tierPrices = computed(() => getProductTierPrices(product.value));
  return {
    price,
    totalPrice,
    unitPrice,
    displayFromVariants,
    displayFrom,
    tierPrices,
    referencePrice,
    isListPrice
  };
}
function useInternationalization() {
  const { apiInstance } = useShopwareContext();
  function getStorefrontUrl() {
    const apiIntanceUrl = apiInstance.config.endpoint ? apiInstance.config.endpoint.slice(0, -1) : void 0;
    return apiIntanceUrl ?? window.location.origin ?? "";
  }
  return {
    getStorefrontUrl
  };
}
function useNewsletter() {
  const { apiInstance } = useShopwareContext();
  const { getStorefrontUrl } = useInternationalization();
  async function newsletterSubscribe$1(params) {
    return await newsletterSubscribe(
      {
        ...params,
        storefrontUrl: getStorefrontUrl()
      },
      apiInstance
    );
  }
  async function newsletterUnsubscribe$1(email) {
    return await newsletterUnsubscribe(
      {
        email
      },
      apiInstance
    );
  }
  async function isNewsletterSubscriber$1() {
    const response = await isNewsletterSubscriber(apiInstance);
    return response.status !== "optOut";
  }
  return {
    newsletterSubscribe: newsletterSubscribe$1,
    newsletterUnsubscribe: newsletterUnsubscribe$1,
    isNewsletterSubscriber: isNewsletterSubscriber$1
  };
}
function useNavigationContext(context) {
  const _context = _useContext("navigation", { context });
  const routeName = computed(() => {
    var _a;
    return (_a = _context.value) == null ? void 0 : _a.routeName;
  });
  const foreignKey = computed(() => {
    var _a;
    return ((_a = _context.value) == null ? void 0 : _a.foreignKey) || "";
  });
  return {
    navigationContext: computed(() => _context.value),
    routeName,
    foreignKey
  };
}
function useNavigationSearch() {
  const { apiInstance } = useShopwareContext();
  const { sessionContext } = useSessionContext();
  async function resolvePath(path) {
    var _a, _b, _c;
    if (path === "/") {
      const categoryId = (_b = (_a = sessionContext.value) == null ? void 0 : _a.salesChannel) == null ? void 0 : _b.navigationCategoryId;
      return {
        routeName: "frontend.navigation.page",
        foreignKey: categoryId
      };
    }
    const isTechnicalUrl = path.startsWith("/navigation/") || path.startsWith("/detail/") || path.startsWith("/landingPage/");
    const normalizedPath = isTechnicalUrl ? path : path.substring(1);
    const seoResult = await getSeoUrl(
      {
        filter: [
          {
            type: "equals",
            field: isTechnicalUrl ? "pathInfo" : "seoPathInfo",
            value: normalizedPath
          }
        ]
      },
      apiInstance
    );
    return (_c = seoResult.elements) == null ? void 0 : _c[0];
  }
  return {
    resolvePath
  };
}
function useWishlist() {
  const { isLoggedIn, isGuestSession } = useUser();
  const canSyncWishlist = computed(
    () => isLoggedIn.value && !isGuestSession.value
  );
  const {
    getWishlistProducts: getWishlistProductsLocal,
    items: itemsLocal,
    clearWishlist: clearWishlistLocal
  } = useLocalWishlist();
  const {
    getWishlistProducts: getWishlistProductsSync,
    items: itemsSync,
    mergeWishlistProducts: mergeWishlistProductsSync
  } = useSyncWishlist();
  const getWishlistProducts2 = async () => {
    if (canSyncWishlist.value) {
      await getWishlistProductsSync();
    } else {
      await getWishlistProductsLocal();
    }
  };
  const clearWishlist = () => {
    clearWishlistLocal();
  };
  const mergeWishlistProducts2 = async () => {
    var _a;
    if ((_a = itemsLocal.value) == null ? void 0 : _a.length) {
      await mergeWishlistProductsSync(itemsLocal.value);
      clearWishlist();
    }
    getWishlistProductsSync();
  };
  const items = computed(
    () => canSyncWishlist.value ? itemsSync.value : itemsLocal.value
  );
  const count = computed(() => items.value.length);
  return {
    mergeWishlistProducts: mergeWishlistProducts2,
    getWishlistProducts: getWishlistProducts2,
    clearWishlist,
    items,
    count
  };
}
function useProductWishlist(product) {
  const { isLoggedIn } = useUser();
  const {
    addToWishlist: addItem,
    removeFromWishlist: removeItem,
    items
  } = useLocalWishlist();
  const {
    addToWishlistSync: addItemSync,
    removeFromWishlistSync: removeItemSync,
    items: itemsSync
  } = useSyncWishlist();
  async function removeFromWishlist() {
    if (isLoggedIn.value) {
      await removeItemSync(product.value.id);
    } else {
      await removeItem(product.value.id);
    }
  }
  async function addToWishlist() {
    if (isLoggedIn.value) {
      await addItemSync(product.value.id);
    } else {
      await addItem(product.value.id);
    }
  }
  const isInWishlist = computed(
    () => {
      var _a, _b;
      return isLoggedIn.value ? (_a = itemsSync.value) == null ? void 0 : _a.includes(product.value.id) : (_b = items.value) == null ? void 0 : _b.includes(product.value.id);
    }
  );
  return {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
}
function useBreadcrumbs(newBreadcrumbs) {
  const _breadcrumbs = _useContext("swBreadcrumb", {
    replace: newBreadcrumbs
  });
  const clearBreadcrumbs = () => {
    _breadcrumbs.value = [];
  };
  return {
    clearBreadcrumbs,
    breadcrumbs: computed(() => _breadcrumbs.value)
  };
}
function resolveCmsComponent(content) {
  const componentName = content.type;
  const type = content.apiAlias === "cms_block" ? "Block" : content.apiAlias === "cms_section" ? "Section" : "Element";
  const componentNameToResolve = pascalCase(`Cms-${type}-${componentName}`);
  try {
    const resolvedComponent = resolveComponent(componentNameToResolve);
    return {
      componentName,
      isResolved: resolvedComponent !== componentName,
      resolvedComponent: typeof resolvedComponent !== "string" ? resolvedComponent : void 0
    };
  } catch (e) {
    return {
      componentName,
      resolvedComponent: void 0,
      resolved: false,
      error: e.message
    };
  }
}
function getDefaultApiParams() {
  return {};
}
const ShopwarePlugin = {
  install(app, options) {
    const contextToken = useCookie("sw-context-token", {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "Lax",
      path: "/"
    });
    const languageId = useCookie("sw-language-id", {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "Lax",
      path: "/"
    });
    const instance = createInstance({
      endpoint: "https://demo-frontends.shopware.store/",
      accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
      timeout: "10000",
      auth: {
        username: "",
        password: ""
      },
      contextToken: contextToken.value,
      languageId: languageId.value
    });
    instance.onConfigChange(({ config }) => {
      try {
        contextToken.value = config.contextToken;
        languageId.value = config.languageId;
      } catch (e) {
      }
    });
    const shopwareContext = createShopwareContext(app, {
      apiInstance: instance,
      enableDevtools: true,
      shopwareDefaults: options.apiDefaults
    });
    app.provide("shopware", shopwareContext);
    const sessionContextData = ref();
    app.provide("swSessionContext", sessionContextData);
    useState("swSessionContext", () => sessionContextData);
  }
};
const _nuxt_runtime_shopware_plugin_mjs_txRT4f0fRY = defineNuxtPlugin(async (nuxtApp) => {
  const newConfig = getDefaultApiParams();
  nuxtApp.vueApp.use(ShopwarePlugin, {
    apiDefaults: newConfig
  });
});
const _nuxt_unocss_mjs_MzCDxu9LMj = defineNuxtPlugin(() => {
});
setSSRHandler("getDefaultStorage", () => {
  const cookieMap = /* @__PURE__ */ new Map();
  const get = (key) => {
    if (!cookieMap.get(key))
      cookieMap.set(key, useCookie(key, { maxAge: 2147483646 }));
    return cookieMap.get(key);
  };
  return {
    getItem: (key) => get(key).value,
    setItem: (key, value) => get(key).value = value,
    removeItem: (key) => get(key).value = void 0
  };
});
{
  setSSRHandler("updateHTMLAttrs", (selector, attr, value) => {
    if (selector === "html") {
      useHead({
        htmlAttrs: {
          [attr]: value
        }
      });
    } else if (selector === "body") {
      useHead({
        bodyAttrs: {
          [attr]: value
        }
      });
    } else {
      throw new Error(`Unsupported meta selector "${selector}" in SSR`);
    }
  });
}
const ______node_modules__pnpm__64vueuse_43nuxt_649_12_0_nuxt_643_1_1_43vue_643_2_47_node_modules__64vueuse_nuxt_ssr_plugin_mjs_cH6VWBS1e9 = defineNuxtPlugin(() => {
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  ______node_modules__pnpm_nuxt_643_1_1_ndavlr5gomle5zzyx7eljktc5u_node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_0bvRhFlywu,
  ______node_modules__pnpm_nuxt_643_1_1_ndavlr5gomle5zzyx7eljktc5u_node_modules_nuxt_dist_pages_runtime_plugins_router_mjs_yA6J8f6Ors,
  _nuxt_runtime_shopware_plugin_mjs_txRT4f0fRY,
  _nuxt_unocss_mjs_MzCDxu9LMj,
  ______node_modules__pnpm__64vueuse_43nuxt_649_12_0_nuxt_643_1_1_43vue_643_2_47_node_modules__64vueuse_nuxt_ssr_plugin_mjs_cH6VWBS1e9
];
const Fragment = defineComponent({
  name: "FragmentWrapper",
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const layouts = {
  account: () => import('./_nuxt/account-7673d592.mjs').then((m) => m.default || m),
  checkout: () => import('./_nuxt/checkout-3a3170db.mjs').then((m) => m.default || m),
  default: () => import('./_nuxt/default-10d190f5.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, context.attrs, context.slots);
    };
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && {
          key: layout.value,
          name: layout.value,
          ...{},
          ...context.attrs
        }, context.slots).default()
      }).default();
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = defineComponent({
  name: "RouteProvider",
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useBreadcrumbs();
    useHead({
      title: "Shopware Demo store",
      meta: [{ name: "description", content: "Shopware Demo store" }],
      htmlAttrs: {
        lang: "en"
      }
    });
    useSessionContext();
    const { apiInstance } = useShopwareContext();
    const { data: sessionContextData } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "sessionContext",
      async () => {
        return await getSessionContext(apiInstance);
      }
    )), __temp = await __temp, __restore(), __temp);
    useSessionContext(sessionContextData.value);
    useWishlist();
    useCart();
    useNotifications();
    useAddress();
    const isSidebarOpen = ref(false);
    provide("isSidebarOpen", isSidebarOpen);
    const modalContent = ref("");
    const modalProps = ref({});
    const modalHandler = {
      open: (component, props) => {
        modalContent.value = component;
        modalProps.value = props;
      },
      close: () => {
        modalContent.value = "";
        modalProps.value = {};
      }
    };
    provide("modal", { modalContent, modalProps, ...modalHandler });
    const isSideMenuOpened = ref(false);
    provide("isSideMenuOpened", isSideMenuOpened);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component-8abc88fc.mjs').then((r) => r.default || r));
    const IslandRendererer = defineAsyncComponent(() => import('./_nuxt/island-renderer-2c6fff4f.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRendererer), { context: unref(islandContext) }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/nuxt@3.1.1_ndavlr5gomle5zzyx7eljktc5u/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { useCmsSection as $, useSessionContext as A, useCustomerPassword as B, useWishlist as C, useOrderDetails as D, getMainImageUrl as E, isProduct as F, useCartItem as G, syncRefs as H, useDebounceFn as I, useCart as J, useNavigation as K, onClickOutside as L, useProductSearchSuggest as M, useFocus as N, useMagicKeys as O, getProductUrl as P, useProductWishlist as Q, getProductFromPrice as R, getProductThumbnailUrl as S, getProductName as T, resolveCmsComponent as U, useCmsBlock as V, getProductTierPrices as W, getProductCalculatedListingPrice as X, getCategoryUrl as Y, useProductReviews as Z, __nuxt_component_0$1 as _, useAsyncData as a, useNavigationSearch as a0, useCountries as a1, useSalutations as a2, useNewsletter as a3, useCustomerOrders as a4, useCheckout as a5, useOrderPayment as a6, watchDebounced as a7, getProducts as a8, useHead as a9, useBreadcrumbs as b, createError as c, useProduct as d, entry$1 as default, useRoute as e, useRouter as f, getCategoryBreadcrumbs as g, useShopwareContext as h, getTranslatedProperty as i, useNavigationContext as j, useListing as k, getCmsLayoutConfiguration as l, useProductPrice as m, usePrice as n, useProductConfigurator as o, useNotifications as p, useAddToCart as q, useCmsElementConfig as r, useCmsElementImage as s, useElementSize as t, useProductSearch as u, useLandingSearch as v, useCategorySearch as w, useCategory as x, useAddress as y, useUser as z };
//# sourceMappingURL=server.mjs.map
