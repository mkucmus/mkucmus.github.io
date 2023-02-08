import { _ as __nuxt_component_0 } from './client-only-67b331e0.mjs';
import { e as useRoute, f as useRouter, z as useUser, D as useOrderDetails, a6 as useOrderPayment, a7 as watchDebounced } from '../server.mjs';
import { useSSRContext, defineComponent, ref, withCtx, createVNode } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
  name: "CheckoutSuccessPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const { params } = useRoute();
    const router = useRouter();
    const orderId = params.id;
    const { isLoggedIn, isGuestSession } = useUser();
    if (!isLoggedIn.value && !isGuestSession.value) {
      router.push("/");
    }
    const {
      loadOrderDetails,
      shippingAddress,
      billingAddress,
      shippingMethod,
      order,
      subtotal,
      total,
      shippingCosts
    } = useOrderDetails(orderId);
    const { paymentUrl, handlePayment, isAsynchronous, state, paymentMethod } = useOrderPayment(order);
    watchDebounced(
      paymentUrl,
      (paymentUrl2) => {
        if (typeof paymentUrl2 !== "string") {
          return;
        }
        try {
          new URL(paymentUrl2);
          window.location.href = paymentUrl2;
        } catch (error) {
          console.error("err, redirect", error);
        }
      },
      { debounce: 5e3 }
    );
    ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div role="status" class="animate-pulse max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-5xl lg:px-8" data-v-3dd70aaa${_scopeId}><div class="space-y-1" data-v-3dd70aaa${_scopeId}><div class="text-gray-400" data-v-3dd70aaa${_scopeId}><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" data-v-3dd70aaa${_scopeId}></div></div></div><div data-v-3dd70aaa${_scopeId}><div class="pt-8" data-v-3dd70aaa${_scopeId}><div data-v-3dd70aaa${_scopeId}><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 px-2 py-6" data-v-3dd70aaa${_scopeId}></div><div class="px-2 py-4" data-v-3dd70aaa${_scopeId}><div class="grid grid-cols-5 gap-y-10 pb-4 text-gray-400" data-v-3dd70aaa${_scopeId}><div class="col-span-2 h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" data-v-3dd70aaa${_scopeId}></div><div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" data-v-3dd70aaa${_scopeId}></div><div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4" data-v-3dd70aaa${_scopeId}></div><div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full" data-v-3dd70aaa${_scopeId}></div></div><div class="grid grid-cols-5 gap-y-10 gap-x-6 py-4 border-t border-gray-200 text-gray-400 items-center" data-v-3dd70aaa${_scopeId}><div class="flex items-center col-span-2 text-gray-900" data-v-3dd70aaa${_scopeId}><div class="i-carbon-image bg-gray-200 h-18 w-18 mr-2" data-v-3dd70aaa${_scopeId}></div><div class="h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full" data-v-3dd70aaa${_scopeId}></div></div><div class="h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4" data-v-3dd70aaa${_scopeId}></div><div data-v-3dd70aaa${_scopeId}><div class="flex gap-1 text-gray-600 font-normal" data-testid="order-item-unitprice" data-v-3dd70aaa${_scopeId}><div class="h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4" data-v-3dd70aaa${_scopeId}></div></div></div><div class="h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" data-v-3dd70aaa${_scopeId}></div></div></div></div></div><div class="border-t border-gray-200 flex" data-v-3dd70aaa${_scopeId}><div class="md:w-36" data-v-3dd70aaa${_scopeId}></div><div class="flex-1 flex-col ml-4" data-v-3dd70aaa${_scopeId}><div class="md:flex md:flex-wrap py-6 md:py-10" data-v-3dd70aaa${_scopeId}><div class="w-auto md:w-1/2 w-1/2 pr-4" data-v-3dd70aaa${_scopeId}><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" data-v-3dd70aaa${_scopeId}></div></div><div class="w-auto md:w-1/2" data-v-3dd70aaa${_scopeId}><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" data-v-3dd70aaa${_scopeId}></div></div></div><div class="md:flex md:flex-wrap border-t border-gray-100 md:flex py-6 md:py-10" data-v-3dd70aaa${_scopeId}><div class="w-auto md:w-1/2" data-v-3dd70aaa${_scopeId}><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" data-v-3dd70aaa${_scopeId}></div></div><div class="w-auto md:w-1/2" data-v-3dd70aaa${_scopeId}><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" data-v-3dd70aaa${_scopeId}></div><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" data-v-3dd70aaa${_scopeId}></div></div></div><div class="border-t border-gray-100 py-6 md:py-10 space-y-4" data-v-3dd70aaa${_scopeId}><div class="flex justify-between text-base font-medium" data-v-3dd70aaa${_scopeId}><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-12" data-v-3dd70aaa${_scopeId}></div><div class="flex gap-1 text-gray-600 font-normal" data-testid="order-subtotal" data-v-3dd70aaa${_scopeId}><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-16" data-v-3dd70aaa${_scopeId}></div></div></div><div class="flex justify-between text-base font-medium" data-v-3dd70aaa${_scopeId}><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-12" data-v-3dd70aaa${_scopeId}></div><div class="flex gap-1 text-gray-600 font-normal" data-testid="order-total" data-v-3dd70aaa${_scopeId}><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-20" data-v-3dd70aaa${_scopeId}></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                role: "status",
                class: "animate-pulse max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-5xl lg:px-8"
              }, [
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("div", { class: "text-gray-400" }, [
                    createVNode("div", { class: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" })
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "pt-8" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 px-2 py-6" }),
                      createVNode("div", { class: "px-2 py-4" }, [
                        createVNode("div", { class: "grid grid-cols-5 gap-y-10 pb-4 text-gray-400" }, [
                          createVNode("div", { class: "col-span-2 h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" }),
                          createVNode("div", { class: "h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" }),
                          createVNode("div", { class: "h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4" }),
                          createVNode("div", { class: "h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full" })
                        ]),
                        createVNode("div", { class: "grid grid-cols-5 gap-y-10 gap-x-6 py-4 border-t border-gray-200 text-gray-400 items-center" }, [
                          createVNode("div", { class: "flex items-center col-span-2 text-gray-900" }, [
                            createVNode("div", { class: "i-carbon-image bg-gray-200 h-18 w-18 mr-2" }),
                            createVNode("div", { class: "h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full" })
                          ]),
                          createVNode("div", { class: "h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4" }),
                          createVNode("div", null, [
                            createVNode("div", {
                              class: "flex gap-1 text-gray-600 font-normal",
                              "data-testid": "order-item-unitprice"
                            }, [
                              createVNode("div", { class: "h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4" })
                            ])
                          ]),
                          createVNode("div", { class: "h-4 ml-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2" })
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "border-t border-gray-200 flex" }, [
                    createVNode("div", { class: "md:w-36" }),
                    createVNode("div", { class: "flex-1 flex-col ml-4" }, [
                      createVNode("div", { class: "md:flex md:flex-wrap py-6 md:py-10" }, [
                        createVNode("div", { class: "w-auto md:w-1/2 w-1/2 pr-4" }, [
                          createVNode("div", { class: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" })
                        ]),
                        createVNode("div", { class: "w-auto md:w-1/2" }, [
                          createVNode("div", { class: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" })
                        ])
                      ]),
                      createVNode("div", { class: "md:flex md:flex-wrap border-t border-gray-100 md:flex py-6 md:py-10" }, [
                        createVNode("div", { class: "w-auto md:w-1/2" }, [
                          createVNode("div", { class: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" })
                        ]),
                        createVNode("div", { class: "w-auto md:w-1/2" }, [
                          createVNode("div", { class: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-32" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8" }),
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" })
                        ])
                      ]),
                      createVNode("div", { class: "border-t border-gray-100 py-6 md:py-10 space-y-4" }, [
                        createVNode("div", { class: "flex justify-between text-base font-medium" }, [
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-12" }),
                          createVNode("div", {
                            class: "flex gap-1 text-gray-600 font-normal",
                            "data-testid": "order-subtotal"
                          }, [
                            createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-16" })
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-between text-base font-medium" }, [
                          createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-12" }),
                          createVNode("div", {
                            class: "flex gap-1 text-gray-600 font-normal",
                            "data-testid": "order-total"
                          }, [
                            createVNode("div", { class: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-20" })
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/success/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3dd70aaa"]]);

export { index as default };
//# sourceMappingURL=index-fda202b5.mjs.map
