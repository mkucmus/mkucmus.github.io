import { useSSRContext, defineComponent, getCurrentInstance, computed, mergeProps, unref, h } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { r as useCmsElementConfig } from '../server.mjs';
import { decodeHTML } from 'entities';
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

var htmlVoidElements = ["area", "base", "basefont", "bgsound", "br", "col", "command", "embed", "frame", "hr", "image", "img", "input", "isindex", "keygen", "link", "menuitem", "meta", "nextid", "param", "source", "track", "wbr"];
var attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
var parseTag = function parseTag2(tag) {
  var res = {
    type: "tag",
    name: "",
    voidElement: false,
    attrs: {},
    children: []
  };
  var tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
  if (tagMatch) {
    res.name = tagMatch[1];
    res.voidElement = htmlVoidElements.includes(tagMatch[1]) || tag.charAt(tag.length - 2) === "/";
    if (res.name.startsWith("!--")) {
      var endIndex = tag.indexOf("-->");
      return {
        type: "comment",
        comment: endIndex !== -1 ? tag.slice(4, endIndex) : ""
      };
    }
  }
  var reg = new RegExp(attrRE);
  var result = null;
  for (; ; ) {
    result = reg.exec(tag);
    if (result === null) {
      break;
    }
    if (!result[0].trim()) {
      continue;
    }
    if (result[1]) {
      var attr = result[1].trim();
      var arr = [attr, ""];
      if (attr.indexOf("=") > -1) {
        arr = attr.split("=");
      }
      res.attrs[arr[0]] = arr[1];
      reg.lastIndex--;
    } else if (result[2]) {
      res.attrs[result[2]] = result[3].trim().substring(1, result[3].length - 1);
    }
  }
  return res;
};
var tagRE = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g;
var whitespaceRE = /^\s*$/;
var empty = /* @__PURE__ */ Object.create(null);
var parse = function parse2(html, options) {
  if (options === void 0) {
    options = {};
  }
  options || (options = {});
  options.components || (options.components = empty);
  var result = [];
  var arr = [];
  var current;
  var level = -1;
  var inComponent = false;
  if (html.indexOf("<") !== 0) {
    var end = html.indexOf("<");
    result.push({
      type: "text",
      content: end === -1 ? html : html.substring(0, end)
    });
  }
  html.replace(tagRE, function(tag, index) {
    if (inComponent) {
      if (tag !== "</" + current.name + ">") {
        return "";
      } else {
        inComponent = false;
      }
    }
    var isOpen = tag.charAt(1) !== "/";
    var isComment = tag.startsWith("<!--");
    var start = index + tag.length;
    var nextChar = html.charAt(start);
    var parent;
    if (isComment) {
      var comment = parseTag(tag);
      if (level < 0) {
        result.push(comment);
        return result;
      }
      parent = arr[level];
      if (parent && parent.children && Array.isArray(parent.children)) {
        parent.children.push(comment);
      }
      return result;
    }
    if (isOpen) {
      level++;
      current = parseTag(tag);
      if (current.type === "tag" && current.name && options.components && options.components[current.name]) {
        current.type = "component";
        inComponent = true;
      }
      if (!current.voidElement && !inComponent && nextChar && nextChar !== "<" && Array.isArray(current.children)) {
        current.children.push({
          type: "text",
          content: html.slice(start, html.indexOf("<", start))
        });
      }
      if (level === 0) {
        result.push(current);
      }
      parent = arr[level - 1];
      if (parent && parent.children) {
        parent.children.push(current);
      }
      arr[level] = current;
    }
    if (!isOpen || current.voidElement) {
      if (level > -1 && (current.voidElement || current.name === tag.slice(2, -1))) {
        level--;
        current = level === -1 ? result : arr[level];
      }
      if (!inComponent && nextChar !== "<" && nextChar) {
        parent = level === -1 ? result : arr[level].children;
        var _end = html.indexOf("<", start);
        var content = html.slice(start, _end === -1 ? void 0 : _end);
        if (whitespaceRE.test(content)) {
          content = " ";
        }
        if (_end > -1 && level + parent.length >= 0 || content !== " ") {
          if (parent && Array.isArray(parent)) {
            parent.push({
              type: "text",
              content
            });
          }
        }
      }
    }
  });
  return result;
};

function getOptionsFromNode(node) {
  const { style, class: classArs, ...rest } = node.attrs;
  return {
    style,
    attrs: rest,
    class: classArs
  };
}
function _visitAST(ast, callback) {
  function _visit(node, parent, key, index) {
    callback(node, parent, key, index);
    if (Array.isArray(node)) {
      node.forEach((value, index2) => {
        _visit.call(this, value, node, null, index2);
      });
    } else if (isNode(node)) {
      const keys = Object.keys(node);
      for (let i = 0; i < keys.length; i++) {
        const child = node[keys[i]];
        if (Array.isArray(child)) {
          for (let j = 0; j < child.length; j++) {
            _visit.call(this, child[j], node, key, j);
          }
        } else if (isNode(child)) {
          _visit.call(this, child, node, key, void 0);
        }
      }
    }
  }
  _visit.call(this, ast, null, void 0, void 0);
}
function isNode(node) {
  return typeof node === "object" && typeof node.type !== "undefined";
}
function generateAST(html) {
  return parse(html);
}
function rectifyAST(ast, config) {
  const _ast = JSON.parse(JSON.stringify(ast));
  const keys = config.extraComponentsMap ? Object.keys(config.extraComponentsMap) : [];
  _visitAST(_ast, (node, parent, key, s) => {
    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];
      if (config.extraComponentsMap[currentKey].conditions(node)) {
        node.name = currentKey;
      }
    }
  });
  return _ast;
}
function renderer(ast, config, createElement, context) {
  function _render(h2, node, parent, key, index) {
    if (Array.isArray(node)) {
      const nodes = [];
      node.forEach((subnode, index2) => {
        nodes.push(_render.call(this, h2, subnode, node, null, index2, h2));
      });
      return nodes;
    } else if (isNode(node)) {
      if (node.type === "text") {
        return config.textTransformer(node.content);
      }
      if (node.type === "tag") {
        const children = [];
        node.children.forEach((child, index2) => {
          children.push(_render.call(this, h2, child, node, index2));
        });
        if (typeof config.extraComponentsMap[node.name] !== "undefined") {
          return config.extraComponentsMap[node.name].renderer.call(
            this,
            node,
            children,
            h2,
            context
          );
        }
        return h2(node.name, getOptionsFromNode(node), [...children]);
      }
    }
  }
  return createElement(config.container.type, context.data, [
    ..._render.call(this, createElement, ast)
  ]);
}
const defaultConfig = {
  container: {
    type: "div"
  },
  extraComponentsMap: {},
  renderAnyway: false,
  textTransformer: (text) => text
};
function renderHtml(html, config, createElement, context) {
  const mergedConfig = Object.assign(defaultConfig, config);
  const _ast = generateAST(html);
  const _rectifiedAst = rectifyAST(_ast, config);
  return renderer(_rectifiedAst, mergedConfig, createElement, context);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CmsElementText",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  setup(__props) {
    const props = __props;
    const context = getCurrentInstance();
    const { getConfigValue } = useCmsElementConfig(props.content);
    const mappedContent = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.content) == null ? void 0 : _a.data) == null ? void 0 : _b.content) || getConfigValue("content");
    });
    const style = computed(() => ({
      alignItems: getConfigValue("verticalAlign")
    }));
    const hasVerticalAlignment = computed(() => !!style.value.alignItems);
    const CmsTextRender = () => {
      const config = {
        textTransformer: (text) => decodeHTML(text),
        extraComponentsMap: {
          link: {
            conditions(node) {
              var _a, _b;
              return node.type === "tag" && node.name === "a" && !((_b = (_a = node.attrs) == null ? void 0 : _a.class) == null ? void 0 : _b.match(/btn\s?/));
            },
            renderer(node, children, createElement) {
              return createElement(
                "a",
                {
                  class: "underline text-base font-normal text-brand-primary hover:text-gray-900",
                  ...getOptionsFromNode(node).attrs
                },
                [...children]
              );
            }
          },
          button: {
            conditions(node) {
              var _a, _b;
              return node.type === "tag" && node.name === "a" && ((_b = (_a = node.attrs) == null ? void 0 : _a.class) == null ? void 0 : _b.match(/btn\s?/));
            },
            renderer(node, children, createElement) {
              var _a;
              const btnClass = "rounded-md py-2 px-4 border border-transparent text-sm font-medium focus:outline-none disabled:opacity-75";
              const _class = (_a = node == null ? void 0 : node.attrs) == null ? void 0 : _a.class.replace("btn-secondary", `${btnClass} bg-brand-dark text-white`).replace("btn-primary", `${btnClass} bg-brand-primary text-white`);
              return createElement(
                "a",
                {
                  class: _class,
                  ...getOptionsFromNode(node).attrs
                },
                [...children]
              );
            }
          }
        }
      };
      const rawHtml = mappedContent.value || "<div></div>";
      return renderHtml(rawHtml, config, h, context);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: { flex: unref(hasVerticalAlignment), "flex-row": unref(hasVerticalAlignment) },
        style: unref(style)
      }, _attrs))} data-v-9da6ccc4>`);
      _push(ssrRenderComponent(CmsTextRender, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../packages/cms-base/components/public/cms/element/CmsElementText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CmsElementText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9da6ccc4"]]);

export { CmsElementText as default };
//# sourceMappingURL=CmsElementText-2b33c86c.mjs.map
