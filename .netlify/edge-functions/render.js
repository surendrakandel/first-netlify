var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except2, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except2)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc2 = __getOwnPropDesc(from, key2)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function set_current_component(component28) {
  current_component = component28;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component28 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component28.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component28, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component28, name) {
  if (!component28 || !component28.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component28;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css15) => css15.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
var current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/@clerk/shared/dist/chunk-KJVJ4CFF.mjs
var isTestEnvironment, isProductionEnvironment, displayedWarnings, deprecated, deprecatedProperty, deprecatedObjectProperty;
var init_chunk_KJVJ4CFF = __esm({
  "node_modules/@clerk/shared/dist/chunk-KJVJ4CFF.mjs"() {
    isTestEnvironment = () => {
      try {
        return false;
      } catch (err) {
      }
      return false;
    };
    isProductionEnvironment = () => {
      try {
        return false;
      } catch (err) {
      }
      return false;
    };
    displayedWarnings = /* @__PURE__ */ new Set();
    deprecated = (fnName, warning, key2) => {
      const hideWarning = isTestEnvironment() || isProductionEnvironment();
      const messageId = key2 ?? fnName;
      if (displayedWarnings.has(messageId) || hideWarning) {
        return;
      }
      displayedWarnings.add(messageId);
      console.warn(
        `Clerk - DEPRECATION WARNING: "${fnName}" is deprecated and will be removed in the next major release.
${warning}`
      );
    };
    deprecatedProperty = (cls, propName, warning, isStatic = false) => {
      const target = isStatic ? cls : cls.prototype;
      let value = target[propName];
      Object.defineProperty(target, propName, {
        get() {
          deprecated(propName, warning, `${cls.name}:${propName}`);
          return value;
        },
        set(v) {
          value = v;
        }
      });
    };
    deprecatedObjectProperty = (obj, propName, warning, key2) => {
      let value = obj[propName];
      Object.defineProperty(obj, propName, {
        get() {
          deprecated(propName, warning, key2);
          return value;
        },
        set(v) {
          value = v;
        }
      });
    };
  }
});

// node_modules/@clerk/shared/dist/chunk-NDCDZYN6.mjs
var init_chunk_NDCDZYN6 = __esm({
  "node_modules/@clerk/shared/dist/chunk-NDCDZYN6.mjs"() {
  }
});

// node_modules/@clerk/shared/dist/deprecated.mjs
var init_deprecated = __esm({
  "node_modules/@clerk/shared/dist/deprecated.mjs"() {
    init_chunk_KJVJ4CFF();
    init_chunk_NDCDZYN6();
  }
});

// node_modules/@clerk/shared/dist/chunk-CDOO25TU.mjs
function isStaging(frontendApi) {
  return frontendApi.endsWith(".lclstage.dev") || frontendApi.endsWith(".stgstage.dev") || frontendApi.endsWith(".clerkstage.dev") || frontendApi.endsWith(".accountsstage.dev");
}
function addClerkPrefix(str) {
  if (!str) {
    return "";
  }
  let regex;
  if (str.match(/^(clerk\.)+\w*$/)) {
    regex = /(clerk\.)*(?=clerk\.)/;
  } else if (str.match(/\.clerk.accounts/)) {
    return str;
  } else {
    regex = /^(clerk\.)*/gi;
  }
  const stripped = str.replace(regex, "");
  return `clerk.${stripped}`;
}
var getClerkJsMajorVersionOrTag, getScriptUrl;
var init_chunk_CDOO25TU = __esm({
  "node_modules/@clerk/shared/dist/chunk-CDOO25TU.mjs"() {
    getClerkJsMajorVersionOrTag = (frontendApi, pkgVersion) => {
      if (!pkgVersion && isStaging(frontendApi)) {
        return "canary";
      }
      if (!pkgVersion) {
        return "latest";
      }
      return pkgVersion.split(".")[0] || "latest";
    };
    getScriptUrl = (frontendApi, { pkgVersion = "4.65.3", clerkJSVersion }) => {
      const noSchemeFrontendApi = frontendApi.replace(/http(s)?:\/\//, "");
      const major = getClerkJsMajorVersionOrTag(frontendApi, pkgVersion);
      return `https://${noSchemeFrontendApi}/npm/@clerk/clerk-js@${clerkJSVersion || major}/dist/clerk.browser.js`;
    };
  }
});

// node_modules/@clerk/shared/dist/url.mjs
var init_url = __esm({
  "node_modules/@clerk/shared/dist/url.mjs"() {
    init_chunk_CDOO25TU();
    init_chunk_NDCDZYN6();
  }
});

// node_modules/@clerk/shared/dist/chunk-4PW5MDZA.mjs
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
async function callWithRetry(fn, attempt = 1, maxAttempts = MAX_NUMBER_OF_RETRIES) {
  try {
    return await fn();
  } catch (e) {
    if (attempt >= maxAttempts) {
      throw e;
    }
    await wait(2 ** attempt * 100);
    return callWithRetry(fn, attempt + 1, maxAttempts);
  }
}
var MAX_NUMBER_OF_RETRIES;
var init_chunk_4PW5MDZA = __esm({
  "node_modules/@clerk/shared/dist/chunk-4PW5MDZA.mjs"() {
    MAX_NUMBER_OF_RETRIES = 5;
  }
});

// node_modules/@clerk/shared/dist/callWithRetry.mjs
var init_callWithRetry = __esm({
  "node_modules/@clerk/shared/dist/callWithRetry.mjs"() {
    init_chunk_4PW5MDZA();
    init_chunk_NDCDZYN6();
  }
});

// node_modules/@clerk/shared/dist/chunk-TETGTEI2.mjs
var isomorphicAtob;
var init_chunk_TETGTEI2 = __esm({
  "node_modules/@clerk/shared/dist/chunk-TETGTEI2.mjs"() {
    isomorphicAtob = (data) => {
      if (typeof atob !== "undefined" && typeof atob === "function") {
        return atob(data);
      } else if (typeof global !== "undefined" && global.Buffer) {
        return new global.Buffer(data, "base64").toString();
      }
      return data;
    };
  }
});

// node_modules/@clerk/shared/dist/chunk-IAZRYRAH.mjs
function parsePublishableKey(key2) {
  key2 = key2 || "";
  if (!isPublishableKey(key2)) {
    return null;
  }
  const instanceType = key2.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
  let frontendApi = isomorphicAtob(key2.split("_")[2]);
  if (!frontendApi.endsWith("$")) {
    return null;
  }
  frontendApi = frontendApi.slice(0, -1);
  return {
    instanceType,
    frontendApi
  };
}
function isPublishableKey(key2) {
  key2 = key2 || "";
  const hasValidPrefix = key2.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key2.startsWith(PUBLISHABLE_KEY_TEST_PREFIX);
  const hasValidFrontendApiPostfix = isomorphicAtob(key2.split("_")[2] || "").endsWith("$");
  return hasValidPrefix && hasValidFrontendApiPostfix;
}
function createDevOrStagingUrlCache() {
  const DEV_OR_STAGING_SUFFIXES = [
    ".lcl.dev",
    ".stg.dev",
    ".lclstage.dev",
    ".stgstage.dev",
    ".dev.lclclerk.com",
    ".stg.lclclerk.com",
    ".accounts.lclclerk.com",
    "accountsstage.dev",
    "accounts.dev"
  ];
  const devOrStagingUrlCache = /* @__PURE__ */ new Map();
  return {
    isDevOrStagingUrl: (url) => {
      if (!url) {
        return false;
      }
      const hostname = typeof url === "string" ? url : url.hostname;
      let res = devOrStagingUrlCache.get(hostname);
      if (res === void 0) {
        res = DEV_OR_STAGING_SUFFIXES.some((s2) => hostname.endsWith(s2));
        devOrStagingUrlCache.set(hostname, res);
      }
      return res;
    }
  };
}
function isDevelopmentFromApiKey(apiKey) {
  return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
function isProductionFromApiKey(apiKey) {
  return apiKey.startsWith("live_") || apiKey.startsWith("sk_live_");
}
var PUBLISHABLE_KEY_LIVE_PREFIX, PUBLISHABLE_KEY_TEST_PREFIX;
var init_chunk_IAZRYRAH = __esm({
  "node_modules/@clerk/shared/dist/chunk-IAZRYRAH.mjs"() {
    init_chunk_TETGTEI2();
    PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
    PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
  }
});

// node_modules/@clerk/shared/dist/keys.mjs
var init_keys = __esm({
  "node_modules/@clerk/shared/dist/keys.mjs"() {
    init_chunk_IAZRYRAH();
    init_chunk_TETGTEI2();
    init_chunk_NDCDZYN6();
  }
});

// node_modules/@clerk/shared/dist/chunk-5DRMPUGE.mjs
function parseErrors(data = []) {
  return data.length > 0 ? data.map(parseError) : [];
}
function parseError(error2) {
  return {
    code: error2.code,
    message: error2.message,
    longMessage: error2.long_message,
    meta: {
      paramName: error2?.meta?.param_name,
      sessionId: error2?.meta?.session_id,
      emailAddresses: error2?.meta?.email_addresses,
      identifiers: error2?.meta?.identifiers,
      zxcvbn: error2?.meta?.zxcvbn
    }
  };
}
function buildErrorThrower({ packageName, customMessages }) {
  let pkg = packageName;
  const messages = {
    ...DefaultMessages,
    ...customMessages
  };
  function buildMessage(rawMessage, replacements2) {
    if (!replacements2) {
      return `${pkg}: ${rawMessage}`;
    }
    let msg = rawMessage;
    const matches = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
    for (const match of matches) {
      const replacement = (replacements2[match[1]] || "").toString();
      msg = msg.replace(`{{${match[1]}}}`, replacement);
    }
    return `${pkg}: ${msg}`;
  }
  return {
    setPackageName({ packageName: packageName2 }) {
      if (typeof packageName2 === "string") {
        pkg = packageName2;
      }
      return this;
    },
    setMessages({ customMessages: customMessages2 }) {
      Object.assign(messages, customMessages2 || {});
      return this;
    },
    throwInvalidPublishableKeyError(params) {
      throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
    },
    throwInvalidFrontendApiError(params) {
      throw new Error(buildMessage(messages.InvalidFrontendApiErrorMessage, params));
    },
    throwInvalidProxyUrl(params) {
      throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
    },
    throwMissingPublishableKeyError() {
      throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
    }
  };
}
var ClerkAPIResponseError, _MagicLinkErrorCode, MagicLinkErrorCode, DefaultMessages;
var init_chunk_5DRMPUGE = __esm({
  "node_modules/@clerk/shared/dist/chunk-5DRMPUGE.mjs"() {
    init_chunk_KJVJ4CFF();
    ClerkAPIResponseError = class _ClerkAPIResponseError extends Error {
      constructor(message, { data, status, clerkTraceId }) {
        super(message);
        this.toString = () => {
          let message2 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map(
            (e) => JSON.stringify(e)
          )}`;
          if (this.clerkTraceId) {
            message2 += `
Clerk Trace ID: ${this.clerkTraceId}`;
          }
          return message2;
        };
        Object.setPrototypeOf(this, _ClerkAPIResponseError.prototype);
        this.status = status;
        this.message = message;
        this.clerkTraceId = clerkTraceId;
        this.clerkError = true;
        this.errors = parseErrors(data);
      }
    };
    _MagicLinkErrorCode = {
      Expired: "expired",
      Failed: "failed"
    };
    MagicLinkErrorCode = new Proxy(_MagicLinkErrorCode, {
      get(target, prop, receiver) {
        deprecated("MagicLinkErrorCode", "Use `EmailLinkErrorCode` instead.");
        return Reflect.get(target, prop, receiver);
      }
    });
    DefaultMessages = Object.freeze({
      InvalidFrontendApiErrorMessage: `The frontendApi passed to Clerk is invalid. You can get your Frontend API key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
      InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
      InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
      MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`
    });
  }
});

// node_modules/@clerk/shared/dist/error.mjs
var init_error = __esm({
  "node_modules/@clerk/shared/dist/error.mjs"() {
    init_chunk_5DRMPUGE();
    init_chunk_KJVJ4CFF();
    init_chunk_NDCDZYN6();
  }
});

// node_modules/@clerk/backend/dist/runtime/browser/crypto.mjs
var crypto_default;
var init_crypto = __esm({
  "node_modules/@clerk/backend/dist/runtime/browser/crypto.mjs"() {
    crypto_default = crypto;
  }
});

// node_modules/@clerk/backend/dist/runtime/browser/fetch.mjs
var fetch_exports = {};
__export(fetch_exports, {
  RuntimeAbortController: () => RuntimeAbortController,
  RuntimeBlob: () => RuntimeBlob,
  RuntimeFetch: () => RuntimeFetch,
  RuntimeFormData: () => RuntimeFormData,
  RuntimeHeaders: () => RuntimeHeaders,
  RuntimeRequest: () => RuntimeRequest,
  RuntimeResponse: () => RuntimeResponse,
  default: () => fetch_default
});
var fetch_default, RuntimeBlob, RuntimeFormData, RuntimeHeaders, RuntimeRequest, RuntimeResponse, RuntimeAbortController, RuntimeFetch;
var init_fetch = __esm({
  "node_modules/@clerk/backend/dist/runtime/browser/fetch.mjs"() {
    fetch_default = fetch;
    RuntimeBlob = Blob;
    RuntimeFormData = FormData;
    RuntimeHeaders = Headers;
    RuntimeRequest = Request;
    RuntimeResponse = Response;
    RuntimeAbortController = AbortController;
    RuntimeFetch = fetch;
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options2) {
      return options2.clone !== false && options2.isMergeableObject(value) ? deepmerge2(emptyTarget(value), value, options2) : value;
    }
    function defaultArrayMerge(target, source, options2) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options2);
      });
    }
    function getMergeFunction(key2, options2) {
      if (!options2.customMerge) {
        return deepmerge2;
      }
      var customMerge = options2.customMerge(key2);
      return typeof customMerge === "function" ? customMerge : deepmerge2;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key2) {
      return propertyIsOnObject(target, key2) && !(Object.hasOwnProperty.call(target, key2) && Object.propertyIsEnumerable.call(target, key2));
    }
    function mergeObject(target, source, options2) {
      var destination = {};
      if (options2.isMergeableObject(target)) {
        getKeys(target).forEach(function(key2) {
          destination[key2] = cloneUnlessOtherwiseSpecified(target[key2], options2);
        });
      }
      getKeys(source).forEach(function(key2) {
        if (propertyIsUnsafe(target, key2)) {
          return;
        }
        if (propertyIsOnObject(target, key2) && options2.isMergeableObject(source[key2])) {
          destination[key2] = getMergeFunction(key2, options2)(target[key2], source[key2], options2);
        } else {
          destination[key2] = cloneUnlessOtherwiseSpecified(source[key2], options2);
        }
      });
      return destination;
    }
    function deepmerge2(target, source, options2) {
      options2 = options2 || {};
      options2.arrayMerge = options2.arrayMerge || defaultArrayMerge;
      options2.isMergeableObject = options2.isMergeableObject || isMergeableObject;
      options2.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options2);
      } else if (sourceIsArray) {
        return options2.arrayMerge(target, source, options2);
      } else {
        return mergeObject(target, source, options2);
      }
    }
    deepmerge2.all = function deepmergeAll(array2, options2) {
      if (!Array.isArray(array2)) {
        throw new Error("first argument should be an array");
      }
      return array2.reduce(function(prev, next) {
        return deepmerge2(prev, next, options2);
      }, {});
    };
    var deepmerge_1 = deepmerge2;
    module.exports = deepmerge_1;
  }
});

// node_modules/map-obj/index.js
var require_map_obj = __commonJS({
  "node_modules/map-obj/index.js"(exports, module) {
    "use strict";
    var isObject = (value) => typeof value === "object" && value !== null;
    var mapObjectSkip = Symbol("skip");
    var isObjectCustom = (value) => isObject(value) && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);
    var mapObject = (object, mapper, options2, isSeen = /* @__PURE__ */ new WeakMap()) => {
      options2 = {
        deep: false,
        target: {},
        ...options2
      };
      if (isSeen.has(object)) {
        return isSeen.get(object);
      }
      isSeen.set(object, options2.target);
      const { target } = options2;
      delete options2.target;
      const mapArray = (array2) => array2.map((element) => isObjectCustom(element) ? mapObject(element, mapper, options2, isSeen) : element);
      if (Array.isArray(object)) {
        return mapArray(object);
      }
      for (const [key2, value] of Object.entries(object)) {
        const mapResult = mapper(key2, value, object);
        if (mapResult === mapObjectSkip) {
          continue;
        }
        let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
        if (newKey === "__proto__") {
          continue;
        }
        if (options2.deep && shouldRecurse && isObjectCustom(newValue)) {
          newValue = Array.isArray(newValue) ? mapArray(newValue) : mapObject(newValue, mapper, options2, isSeen);
        }
        target[newKey] = newValue;
      }
      return target;
    };
    module.exports = (object, mapper, options2) => {
      if (!isObject(object)) {
        throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
      }
      return mapObject(object, mapper, options2);
    };
    module.exports.mapObjectSkip = mapObjectSkip;
  }
});

// node_modules/tslib/tslib.es6.mjs
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __addDisposableResource: () => __addDisposableResource,
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldIn: () => __classPrivateFieldIn,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __disposeResources: () => __disposeResources,
  __esDecorate: () => __esDecorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __propKey: () => __propKey,
  __read: () => __read,
  __rest: () => __rest,
  __runInitializers: () => __runInitializers,
  __setFunctionName: () => __setFunctionName,
  __spread: () => __spread,
  __spreadArray: () => __spreadArray,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values,
  default: () => tslib_es6_default
});
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s2, e) {
  var t = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
      t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key2, desc2) {
  var c = arguments.length, r = c < 3 ? target : desc2 === null ? desc2 = Object.getOwnPropertyDescriptor(target, key2) : desc2, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key2, desc2);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key2, r) : d(target, key2)) || r;
  return c > 3 && r && Object.defineProperty(target, key2, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key2) {
    decorator(target, key2, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function")
      throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn)
      context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access)
      context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done)
        throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0)
        continue;
      if (result === null || typeof result !== "object")
        throw new TypeError("Object expected");
      if (_ = accept(result.get))
        descriptor.get = _;
      if (_ = accept(result.set))
        descriptor.set = _;
      if (_ = accept(result.init))
        initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field")
        initializers.unshift(_);
      else
        descriptor[key2] = _;
    }
  }
  if (target)
    Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix2) {
  if (typeof name === "symbol")
    name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix2 ? "".concat(prefix2, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __exportStar(m, o) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
      __createBinding(o, m, p);
}
function __values(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error2) {
    e = { error: error2 };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s2 = 0, i = 0, il = arguments.length; i < il; i++)
    s2 += arguments[i].length;
  for (var r = Array(s2), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function")
      throw new TypeError("Object expected.");
    var dispose;
    if (async) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function")
      throw new TypeError("Object not disposable.");
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}
function __disposeResources(env) {
  function fail2(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async)
          return Promise.resolve(result).then(next, function(e) {
            fail2(e);
            return next();
          });
      } catch (e) {
        fail2(e);
      }
    }
    if (env.hasError)
      throw env.error;
  }
  return next();
}
var extendStatics, __assign, __createBinding, __setModuleDefault, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s2, i = 1, n = arguments.length; i < n; i++) {
          s2 = arguments[i];
          for (var p in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p))
              t[p] = s2[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    };
    __setModuleDefault = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    };
    _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
    };
    tslib_es6_default = {
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __metadata,
      __awaiter,
      __generator,
      __createBinding,
      __exportStar,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn,
      __addDisposableResource,
      __disposeResources
    };
  }
});

// node_modules/lower-case/dist/index.js
var require_dist = __commonJS({
  "node_modules/lower-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lowerCase = exports.localeLowerCase = void 0;
    var SUPPORTED_LOCALE = {
      tr: {
        regexp: /\u0130|\u0049|\u0049\u0307/g,
        map: {
          \u0130: "i",
          I: "\u0131",
          I\u0307: "i"
        }
      },
      az: {
        regexp: /\u0130/g,
        map: {
          \u0130: "i",
          I: "\u0131",
          I\u0307: "i"
        }
      },
      lt: {
        regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
        map: {
          I: "i\u0307",
          J: "j\u0307",
          \u012E: "\u012F\u0307",
          \u00CC: "i\u0307\u0300",
          \u00CD: "i\u0307\u0301",
          \u0128: "i\u0307\u0303"
        }
      }
    };
    function localeLowerCase(str, locale) {
      var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
      if (lang)
        return lowerCase(str.replace(lang.regexp, function(m) {
          return lang.map[m];
        }));
      return lowerCase(str);
    }
    exports.localeLowerCase = localeLowerCase;
    function lowerCase(str) {
      return str.toLowerCase();
    }
    exports.lowerCase = lowerCase;
  }
});

// node_modules/no-case/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/no-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noCase = void 0;
    var lower_case_1 = require_dist();
    var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
    var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
    function noCase(input, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      var _a93 = options2.splitRegexp, splitRegexp = _a93 === void 0 ? DEFAULT_SPLIT_REGEXP : _a93, _b7 = options2.stripRegexp, stripRegexp = _b7 === void 0 ? DEFAULT_STRIP_REGEXP : _b7, _c3 = options2.transform, transform = _c3 === void 0 ? lower_case_1.lowerCase : _c3, _d3 = options2.delimiter, delimiter = _d3 === void 0 ? " " : _d3;
      var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
      var start = 0;
      var end = result.length;
      while (result.charAt(start) === "\0")
        start++;
      while (result.charAt(end - 1) === "\0")
        end--;
      return result.slice(start, end).split("\0").map(transform).join(delimiter);
    }
    exports.noCase = noCase;
    function replace(input, re, value) {
      if (re instanceof RegExp)
        return input.replace(re, value);
      return re.reduce(function(input2, re2) {
        return input2.replace(re2, value);
      }, input);
    }
  }
});

// node_modules/dot-case/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/dot-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dotCase = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var no_case_1 = require_dist2();
    function dotCase(input, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return no_case_1.noCase(input, tslib_1.__assign({ delimiter: "." }, options2));
    }
    exports.dotCase = dotCase;
  }
});

// node_modules/snake-case/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/snake-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.snakeCase = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var dot_case_1 = require_dist3();
    function snakeCase(input, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return dot_case_1.dotCase(input, tslib_1.__assign({ delimiter: "_" }, options2));
    }
    exports.snakeCase = snakeCase;
  }
});

// node_modules/snakecase-keys/index.js
var require_snakecase_keys = __commonJS({
  "node_modules/snakecase-keys/index.js"(exports, module) {
    "use strict";
    var map = require_map_obj();
    var { snakeCase } = require_dist4();
    module.exports = function(obj, options2) {
      options2 = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options2);
      return map(obj, function(key2, val) {
        return [
          matches(options2.exclude, key2) ? key2 : snakeCase(key2, options2.parsingOptions),
          val
        ];
      }, options2);
    };
    function matches(patterns, value) {
      return patterns.some(function(pattern2) {
        return typeof pattern2 === "string" ? pattern2 === value : pattern2.test(value);
      });
    }
  }
});

// node_modules/@clerk/backend/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/@clerk/backend/node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse5;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse5(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode2;
      var index28 = 0;
      while (index28 < str.length) {
        var eqIdx = str.indexOf("=", index28);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index28);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index28 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index28, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index28 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode2(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode3) {
      try {
        return decode3(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/@clerk/shared/dist/isomorphicAtob.mjs
var init_isomorphicAtob = __esm({
  "node_modules/@clerk/shared/dist/isomorphicAtob.mjs"() {
    init_chunk_TETGTEI2();
    init_chunk_NDCDZYN6();
  }
});

// node_modules/@clerk/backend/dist/esm/index.js
function joinPaths(...args) {
  return args.filter((p) => p).join(SEPARATOR).replace(MULTIPLE_SEPARATOR_REGEX, SEPARATOR);
}
function assertValidSecretKey(val) {
  if (!val || typeof val !== "string") {
    throw Error(
      "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance."
    );
  }
}
function deserialize(payload) {
  if (Array.isArray(payload)) {
    return payload.map((item) => jsonToObject(item));
  } else if (isPaginated(payload)) {
    return payload.data.map((item) => jsonToObject(item));
  } else {
    return jsonToObject(payload);
  }
}
function isPaginated(payload) {
  return Array.isArray(payload.data) && payload.data !== void 0;
}
function getCount(item) {
  return item.total_count;
}
function jsonToObject(item) {
  if (typeof item !== "string" && "object" in item && "deleted" in item) {
    return DeletedObject.fromJSON(item);
  }
  switch (item.object) {
    case "allowlist_identifier":
      return AllowlistIdentifier.fromJSON(item);
    case "client":
      return Client.fromJSON(item);
    case "email_address":
      return EmailAddress.fromJSON(item);
    case "email":
      return Email.fromJSON(item);
    case "invitation":
      return Invitation.fromJSON(item);
    case "oauth_access_token":
      return OauthAccessToken.fromJSON(item);
    case "organization":
      return Organization.fromJSON(item);
    case "organization_invitation":
      return OrganizationInvitation.fromJSON(item);
    case "organization_membership":
      return OrganizationMembership.fromJSON(item);
    case "phone_number":
      return PhoneNumber.fromJSON(item);
    case "redirect_url":
      return RedirectUrl.fromJSON(item);
    case "sign_in_token":
      return SignInToken.fromJSON(item);
    case "session":
      return Session.fromJSON(item);
    case "sms_message":
      return SMSMessage.fromJSON(item);
    case "token":
      return Token.fromJSON(item);
    case "total_count":
      return getCount(item);
    case "user":
      return User.fromJSON(item);
    default:
      return item;
  }
}
function buildRequest(options2) {
  const request = async (requestOptions) => {
    const {
      apiKey,
      secretKey,
      httpOptions,
      apiUrl = API_URL,
      apiVersion = API_VERSION,
      userAgent = USER_AGENT
    } = options2;
    if (apiKey) {
      deprecated("apiKey", "Use `secretKey` instead.");
    }
    if (httpOptions) {
      deprecated(
        "httpOptions",
        "This option has been deprecated and will be removed with the next major release.\nA RequestInit init object used by the `request` method."
      );
    }
    const { path, method, queryParams, headerParams, bodyParams, formData } = requestOptions;
    const key2 = secretKey || apiKey;
    assertValidSecretKey(key2);
    const url = joinPaths(apiUrl, apiVersion, path);
    const finalUrl = new URL(url);
    if (queryParams) {
      const snakecasedQueryParams = (0, import_snakecase_keys.default)({ ...queryParams });
      for (const [key22, val] of Object.entries(snakecasedQueryParams)) {
        if (val) {
          [val].flat().forEach((v) => finalUrl.searchParams.append(key22, v));
        }
      }
    }
    const headers = {
      Authorization: `Bearer ${key2}`,
      "Clerk-Backend-SDK": userAgent,
      ...headerParams
    };
    let res = void 0;
    try {
      if (formData) {
        res = await runtime_default.fetch(finalUrl.href, {
          ...httpOptions,
          method,
          headers,
          body: formData
        });
      } else {
        headers["Content-Type"] = "application/json";
        const hasBody = method !== "GET" && bodyParams && Object.keys(bodyParams).length > 0;
        const body = hasBody ? { body: JSON.stringify((0, import_snakecase_keys.default)(bodyParams, { deep: false })) } : null;
        res = await runtime_default.fetch(
          finalUrl.href,
          (0, import_deepmerge.default)(httpOptions || {}, {
            method,
            headers,
            ...body
          })
        );
      }
      const isJSONResponse = res?.headers && res.headers?.get(constants.Headers.ContentType) === constants.ContentTypes.Json;
      const data = await (isJSONResponse ? res.json() : res.text());
      if (!res.ok) {
        throw data;
      }
      return {
        data: deserialize(data),
        errors: null
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          data: null,
          errors: [
            {
              code: "unexpected_error",
              message: err.message || "Unexpected error"
            }
          ],
          clerkTraceId: getTraceId(err, res?.headers)
        };
      }
      return {
        data: null,
        errors: parseErrors2(err),
        // TODO: To be removed with withLegacyReturn
        // @ts-expect-error
        status: res?.status,
        statusText: res?.statusText,
        clerkTraceId: getTraceId(err, res?.headers)
      };
    }
  };
  return withLegacyReturn(request);
}
function getTraceId(data, headers) {
  if (data && typeof data === "object" && "clerk_trace_id" in data && typeof data.clerk_trace_id === "string") {
    return data.clerk_trace_id;
  }
  const cfRay = headers?.get("cf-ray");
  return cfRay || "";
}
function parseErrors2(data) {
  if (!!data && typeof data === "object" && "errors" in data) {
    const errors = data.errors;
    return errors.length > 0 ? errors.map(parseError2) : [];
  }
  return [];
}
function parseError2(error2) {
  return {
    code: error2.code,
    message: error2.message,
    longMessage: error2.long_message,
    meta: {
      paramName: error2?.meta?.param_name,
      sessionId: error2?.meta?.session_id
    }
  };
}
function createBackendApiClient(options2) {
  const request = buildRequest(options2);
  return {
    allowlistIdentifiers: new AllowlistIdentifierAPI(request),
    clients: new ClientAPI(request),
    emailAddresses: new EmailAddressAPI(request),
    emails: new EmailAPI(request),
    interstitial: new InterstitialAPI(request),
    invitations: new InvitationAPI(request),
    organizations: new OrganizationAPI(request),
    phoneNumbers: new PhoneNumberAPI(request),
    redirectUrls: new RedirectUrlAPI(request),
    sessions: new SessionAPI(request),
    signInTokens: new SignInTokenAPI(request),
    smsMessages: new SMSMessageAPI(request),
    users: new UserAPI(request),
    domains: new DomainAPI(request)
  };
}
function signedInAuthObject(sessionClaims, options2, debugData) {
  const {
    act: actor,
    sid: sessionId,
    org_id: orgId,
    org_role: orgRole,
    org_slug: orgSlug,
    sub: userId
  } = sessionClaims;
  const { apiKey, secretKey, apiUrl, apiVersion, token, session, user, organization } = options2;
  if (apiKey) {
    deprecated("apiKey", "Use `secretKey` instead.");
  }
  const { sessions } = createBackendApiClient({
    apiKey,
    secretKey,
    apiUrl,
    apiVersion
  });
  const getToken = createGetToken({
    sessionId,
    sessionToken: token,
    fetcher: (...args) => sessions.getToken(...args)
  });
  return {
    actor,
    sessionClaims,
    sessionId,
    session,
    userId,
    user,
    orgId,
    orgRole,
    orgSlug,
    organization,
    getToken,
    experimental__has: createHasAuthorization({ orgId, orgRole, userId }),
    debug: createDebug({ ...options2, ...debugData })
  };
}
function signedOutAuthObject(debugData) {
  if (debugData?.apiKey) {
    deprecated("apiKey", "Use `secretKey` instead.");
  }
  return {
    sessionClaims: null,
    sessionId: null,
    session: null,
    userId: null,
    user: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    organization: null,
    getToken: () => Promise.resolve(null),
    experimental__has: () => false,
    debug: createDebug(debugData)
  };
}
function loadInterstitialFromLocal(options2) {
  if (options2.frontendApi) {
    deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  if (options2.pkgVersion) {
    deprecated("pkgVersion", "Use `clerkJSVersion` instead.");
  }
  options2.frontendApi = parsePublishableKey(options2.publishableKey)?.frontendApi || options2.frontendApi || "";
  const domainOnlyInProd = !isDevOrStagingUrl(options2.frontendApi) ? addClerkPrefix(options2.domain) : "";
  const {
    debugData,
    frontendApi,
    pkgVersion,
    clerkJSUrl,
    clerkJSVersion,
    publishableKey,
    proxyUrl,
    isSatellite = false,
    domain,
    signInUrl
  } = options2;
  return `
    <head>
        <meta charset="UTF-8" />
        <style>
          @media (prefers-color-scheme: dark) {
            body {
              background-color: black;
            }
          }
        </style>
    </head>
    <body>
        <script>
            window.__clerk_frontend_api = '${frontendApi}';
            window.__clerk_debug = ${JSON.stringify(debugData || {})};
            ${proxyUrl ? `window.__clerk_proxy_url = '${proxyUrl}'` : ""}
            ${domain ? `window.__clerk_domain = '${domain}'` : ""}
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite: ${isSatellite},
                        isInterstitial: ${true},
                        signInUrl: ${signInUrl ? `'${signInUrl}'` : void 0}
                    });
                    if(Clerk.loaded){
                      if(window.location.href.indexOf("#") === -1){
                        window.location.href = window.location.href;
                      } else if (window.navigator.userAgent.toLowerCase().includes("firefox/")){
                          formRedirect();
                      } else {
                          window.location.reload();
                      }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                ${publishableKey ? `script.setAttribute('data-clerk-publishable-key', '${publishableKey}');` : `script.setAttribute('data-clerk-frontend-api', '${frontendApi}');`}

                ${domain ? `script.setAttribute('data-clerk-domain', '${domain}');` : ""}
                ${proxyUrl ? `script.setAttribute('data-clerk-proxy-url', '${proxyUrl}')` : ""};
                script.async = true;
                script.src = '${clerkJSUrl || getScriptUrl(proxyUrl || domainOnlyInProd || frontendApi, {
    pkgVersion,
    clerkJSVersion
  })}';
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        <\/script>
    </body>
`;
}
async function loadInterstitialFromBAPI(options2) {
  if (options2.frontendApi) {
    deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  if (options2.pkgVersion) {
    deprecated("pkgVersion", "Use `clerkJSVersion` instead.");
  }
  options2.frontendApi = parsePublishableKey(options2.publishableKey)?.frontendApi || options2.frontendApi || "";
  const url = buildPublicInterstitialUrl(options2);
  const response = await callWithRetry(
    () => runtime_default.fetch(buildPublicInterstitialUrl(options2), {
      method: "GET",
      headers: {
        "Clerk-Backend-SDK": options2.userAgent || USER_AGENT
      }
    })
  );
  if (!response.ok) {
    throw new TokenVerificationError({
      action: "Contact support@clerk.com",
      message: `Error loading Clerk Interstitial from ${url} with code=${response.status}`,
      reason: "interstitial-remote-failed-to-load"
      /* RemoteInterstitialFailedToLoad */
    });
  }
  return response.text();
}
function buildPublicInterstitialUrl(options2) {
  if (options2.frontendApi) {
    deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  options2.frontendApi = parsePublishableKey(options2.publishableKey)?.frontendApi || options2.frontendApi || "";
  const { apiUrl, frontendApi, pkgVersion, clerkJSVersion, publishableKey, proxyUrl, isSatellite, domain, signInUrl } = options2;
  const url = new URL(apiUrl);
  url.pathname = joinPaths(url.pathname, API_VERSION, "/public/interstitial");
  url.searchParams.append("clerk_js_version", clerkJSVersion || getClerkJsMajorVersionOrTag(frontendApi, pkgVersion));
  if (publishableKey) {
    url.searchParams.append("publishable_key", publishableKey);
  } else {
    url.searchParams.append("frontend_api", frontendApi);
  }
  if (proxyUrl) {
    url.searchParams.append("proxy_url", proxyUrl);
  }
  if (isSatellite) {
    url.searchParams.append("is_satellite", "true");
  }
  url.searchParams.append("sign_in_url", signInUrl || "");
  if (!isDevOrStagingUrl(options2.frontendApi)) {
    url.searchParams.append("use_domain_for_script", "true");
  }
  if (domain) {
    url.searchParams.append("domain", domain);
  }
  return url.href;
}
async function signedIn(options2, sessionClaims) {
  const {
    apiKey,
    secretKey,
    apiUrl,
    apiVersion,
    cookieToken,
    frontendApi,
    proxyUrl,
    publishableKey,
    domain,
    isSatellite,
    headerToken,
    loadSession,
    loadUser,
    loadOrganization,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl
  } = options2;
  const { sid: sessionId, org_id: orgId, sub: userId } = sessionClaims;
  const { sessions, users: users2, organizations } = createBackendApiClient({
    apiKey,
    secretKey,
    apiUrl,
    apiVersion
  });
  const [sessionResp, userResp, organizationResp] = await Promise.all([
    loadSession ? sessions.getSession(sessionId) : Promise.resolve(void 0),
    loadUser ? users2.getUser(userId) : Promise.resolve(void 0),
    loadOrganization && orgId ? organizations.getOrganization({ organizationId: orgId }) : Promise.resolve(void 0)
  ]);
  const session = sessionResp;
  const user = userResp;
  const organization = organizationResp;
  const authObject = signedInAuthObject(
    sessionClaims,
    {
      secretKey,
      apiKey,
      apiUrl,
      apiVersion,
      token: cookieToken || headerToken || "",
      session,
      user,
      organization
    },
    {
      ...options2,
      status: "signed-in"
      /* SignedIn */
    }
  );
  return {
    status: "signed-in",
    reason: null,
    message: null,
    frontendApi,
    proxyUrl,
    publishableKey,
    domain,
    isSatellite,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: true,
    isInterstitial: false,
    isUnknown: false,
    toAuth: () => authObject
  };
}
function signedOut(options2, reason, message = "") {
  const {
    frontendApi,
    publishableKey,
    proxyUrl,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl
  } = options2;
  return {
    status: "signed-out",
    reason,
    message,
    frontendApi,
    proxyUrl,
    publishableKey,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: false,
    isInterstitial: false,
    isUnknown: false,
    toAuth: () => signedOutAuthObject({ ...options2, status: "signed-out", reason, message })
  };
}
function interstitial(options2, reason, message = "") {
  const {
    frontendApi,
    publishableKey,
    proxyUrl,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl
  } = options2;
  return {
    status: "interstitial",
    reason,
    message,
    frontendApi,
    publishableKey,
    isSatellite,
    domain,
    proxyUrl,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: false,
    isInterstitial: true,
    isUnknown: false,
    toAuth: () => null
  };
}
function unknownState(options2, reason, message = "") {
  const { frontendApi, publishableKey, isSatellite, domain, signInUrl, signUpUrl, afterSignInUrl, afterSignUpUrl } = options2;
  return {
    status: "unknown",
    reason,
    message,
    frontendApi,
    publishableKey,
    isSatellite,
    domain,
    signInUrl,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    isSignedIn: false,
    isInterstitial: false,
    isUnknown: true,
    toAuth: () => null
  };
}
function checkCrossOrigin({
  originURL,
  host,
  forwardedHost,
  forwardedProto
}) {
  const finalURL = buildOrigin({ forwardedProto, forwardedHost, protocol: originURL.protocol, host });
  return finalURL && new URL(finalURL).origin !== originURL.origin;
}
function parse2(string, encoding, opts = {}) {
  if (!encoding.codes) {
    encoding.codes = {};
    for (let i = 0; i < encoding.chars.length; ++i) {
      encoding.codes[encoding.chars[i]] = i;
    }
  }
  if (!opts.loose && string.length * encoding.bits & 7) {
    throw new SyntaxError("Invalid padding");
  }
  let end = string.length;
  while (string[end - 1] === "=") {
    --end;
    if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
      throw new SyntaxError("Invalid padding");
    }
  }
  const out = new (opts.out ?? Uint8Array)(end * encoding.bits / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = encoding.codes[string[i]];
    if (value === void 0) {
      throw new SyntaxError("Invalid character " + string[i]);
    }
    buffer = buffer << encoding.bits | value;
    bits += encoding.bits;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function stringify(data, encoding, opts = {}) {
  const { pad = true } = opts;
  const mask = (1 << encoding.bits) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | 255 & data[i];
    bits += 8;
    while (bits > encoding.bits) {
      bits -= encoding.bits;
      out += encoding.chars[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += encoding.chars[mask & buffer << encoding.bits - bits];
  }
  if (pad) {
    while (out.length * encoding.bits & 7) {
      out += "=";
    }
  }
  return out;
}
function getCryptoAlgorithm(algorithmName) {
  const hash2 = algToHash[algorithmName];
  const name = jwksAlgToCryptoAlg[algorithmName];
  if (!hash2 || !name) {
    throw new Error(`Unsupported algorithm ${algorithmName}, expected one of ${algs.join(",")}.`);
  }
  return {
    hash: { name: algToHash[algorithmName] },
    name: jwksAlgToCryptoAlg[algorithmName]
  };
}
function pemToBuffer(secret) {
  const trimmed = secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "");
  const decoded = isomorphicAtob(trimmed);
  const buffer = new ArrayBuffer(decoded.length);
  const bufView = new Uint8Array(buffer);
  for (let i = 0, strLen = decoded.length; i < strLen; i++) {
    bufView[i] = decoded.charCodeAt(i);
  }
  return bufView;
}
function importKey(key2, algorithm, keyUsage) {
  if (typeof key2 === "object") {
    return runtime_default.crypto.subtle.importKey("jwk", key2, algorithm, false, [keyUsage]);
  }
  const keyData = pemToBuffer(key2);
  const format = keyUsage === "sign" ? "pkcs8" : "spki";
  return runtime_default.crypto.subtle.importKey(format, keyData, algorithm, false, [keyUsage]);
}
async function hasValidSignature(jwt, key2) {
  const { header, signature, raw } = jwt;
  const encoder3 = new TextEncoder();
  const data = encoder3.encode([raw.header, raw.payload].join("."));
  const algorithm = getCryptoAlgorithm(header.alg);
  const cryptoKey = await importKey(key2, algorithm, "verify");
  return runtime_default.crypto.subtle.verify(algorithm.name, cryptoKey, signature, data);
}
function decodeJwt(token) {
  const tokenParts = (token || "").toString().split(".");
  if (tokenParts.length !== 3) {
    throw new TokenVerificationError({
      reason: "token-invalid",
      message: `Invalid JWT form. A JWT consists of three parts separated by dots.`
    });
  }
  const [rawHeader, rawPayload, rawSignature] = tokenParts;
  const decoder = new TextDecoder();
  const header = JSON.parse(decoder.decode(base64url.parse(rawHeader, { loose: true })));
  const payload = JSON.parse(decoder.decode(base64url.parse(rawPayload, { loose: true })));
  const signature = base64url.parse(rawSignature, { loose: true });
  deprecatedObjectProperty(
    payload,
    "orgs",
    'Add orgs to your session token using the "user.organizations" shortcode in JWT Templates instead.',
    "decodeJwt:orgs"
  );
  return {
    header,
    payload,
    signature,
    raw: {
      header: rawHeader,
      payload: rawPayload,
      signature: rawSignature,
      text: token
    }
  };
}
async function verifyJwt(token, { audience, authorizedParties, clockSkewInSeconds, clockSkewInMs, issuer, key: key2 }) {
  if (clockSkewInSeconds) {
    deprecated("clockSkewInSeconds", "Use `clockSkewInMs` instead.");
  }
  const clockSkew = clockSkewInMs || clockSkewInSeconds || DEFAULT_CLOCK_SKEW_IN_SECONDS;
  const decoded = decodeJwt(token);
  const { header, payload } = decoded;
  const { typ, alg } = header;
  assertHeaderType(typ);
  assertHeaderAlgorithm(alg);
  const { azp, sub, aud, iss, iat, exp, nbf } = payload;
  assertSubClaim(sub);
  assertAudienceClaim([aud], [audience]);
  assertAuthorizedPartiesClaim(azp, authorizedParties);
  assertIssuerClaim(iss, issuer);
  assertExpirationClaim(exp, clockSkew);
  assertActivationClaim(nbf, clockSkew);
  assertIssuedAtClaim(iat, clockSkew);
  let signatureValid;
  try {
    signatureValid = await hasValidSignature(decoded, key2);
  } catch (err) {
    throw new TokenVerificationError({
      action: "Make sure that this is a valid Clerk generate JWT.",
      reason: "token-verification-failed",
      message: `Error verifying JWT signature. ${err}`
    });
  }
  if (!signatureValid) {
    throw new TokenVerificationError({
      reason: "token-invalid-signature",
      message: "JWT signature is invalid."
    });
  }
  return payload;
}
function getFromCache(kid) {
  return cache[kid];
}
function getCacheValues() {
  return Object.values(cache);
}
function setInCache(jwk, jwksCacheTtlInMs = 1e3 * 60 * 60) {
  cache[jwk.kid] = jwk;
  lastUpdatedAt = Date.now();
  if (jwksCacheTtlInMs >= 0) {
    setTimeout(() => {
      if (jwk) {
        delete cache[jwk.kid];
      } else {
        cache = {};
      }
    }, jwksCacheTtlInMs);
  }
}
function loadClerkJWKFromLocal(localKey) {
  if (!getFromCache(LocalJwkKid)) {
    if (!localKey) {
      throw new TokenVerificationError({
        action: "Set the CLERK_JWT_KEY environment variable.",
        message: "Missing local JWK.",
        reason: "jwk-local-missing"
        /* LocalJWKMissing */
      });
    }
    const modulus = localKey.replace(/(\r\n|\n|\r)/gm, "").replace(PEM_HEADER, "").replace(PEM_TRAILER, "").replace(RSA_PREFIX, "").replace(RSA_SUFFIX, "").replace(/\+/g, "-").replace(/\//g, "_");
    setInCache(
      {
        kid: "local",
        kty: "RSA",
        alg: "RS256",
        n: modulus,
        e: "AQAB"
      },
      -1
      // local key never expires in cache
    );
  }
  return getFromCache(LocalJwkKid);
}
async function loadClerkJWKFromRemote({
  apiKey,
  secretKey,
  apiUrl = API_URL,
  apiVersion = API_VERSION,
  issuer,
  kid,
  jwksCacheTtlInMs = 1e3 * 60 * 60,
  // 1 hour,
  skipJwksCache
}) {
  const shouldRefreshCache = !getFromCache(kid) && reachedMaxCacheUpdatedAt();
  if (skipJwksCache || shouldRefreshCache) {
    let fetcher;
    const key2 = secretKey || apiKey;
    if (key2) {
      fetcher = () => fetchJWKSFromBAPI(apiUrl, key2, apiVersion);
    } else if (issuer) {
      fetcher = () => fetchJWKSFromFAPI(issuer);
    } else {
      throw new TokenVerificationError({
        action: "Contact support@clerk.com",
        message: "Failed to load JWKS from Clerk Backend or Frontend API.",
        reason: "jwk-remote-failed-to-load"
        /* RemoteJWKFailedToLoad */
      });
    }
    const { keys } = await callWithRetry(fetcher);
    if (!keys || !keys.length) {
      throw new TokenVerificationError({
        action: "Contact support@clerk.com",
        message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.",
        reason: "jwk-remote-failed-to-load"
        /* RemoteJWKFailedToLoad */
      });
    }
    keys.forEach((key22) => setInCache(key22, jwksCacheTtlInMs));
  }
  const jwk = getFromCache(kid);
  if (!jwk) {
    const cacheValues = getCacheValues();
    const jwkKeys = cacheValues.map((jwk2) => jwk2.kid).join(", ");
    throw new TokenVerificationError({
      action: "Contact support@clerk.com",
      message: `Unable to find a signing key in JWKS that matches the kid='${kid}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT.${jwkKeys ? ` The following kid are available: ${jwkKeys}` : ""}`,
      reason: "jwk-remote-missing"
      /* RemoteJWKMissing */
    });
  }
  return jwk;
}
async function fetchJWKSFromFAPI(issuer) {
  const url = new URL(issuer);
  url.pathname = joinPaths(url.pathname, ".well-known/jwks.json");
  const response = await runtime_default.fetch(url.href);
  if (!response.ok) {
    throw new TokenVerificationError({
      action: "Contact support@clerk.com",
      message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
      reason: "jwk-remote-failed-to-load"
      /* RemoteJWKFailedToLoad */
    });
  }
  return response.json();
}
async function fetchJWKSFromBAPI(apiUrl, key2, apiVersion) {
  if (!key2) {
    throw new TokenVerificationError({
      action: "Set the CLERK_SECRET_KEY or CLERK_API_KEY environment variable.",
      message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.",
      reason: "jwk-remote-failed-to-load"
      /* RemoteJWKFailedToLoad */
    });
  }
  const url = new URL(apiUrl);
  url.pathname = joinPaths(url.pathname, apiVersion, "/jwks");
  const response = await runtime_default.fetch(url.href, {
    headers: {
      Authorization: `Bearer ${key2}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const json2 = await response.json();
    const invalidSecretKeyError = getErrorObjectByCode(
      json2?.errors,
      "clerk_key_invalid"
      /* InvalidSecretKey */
    );
    if (invalidSecretKeyError) {
      const reason = "secret-key-invalid";
      throw new TokenVerificationError({
        action: "Contact support@clerk.com",
        message: invalidSecretKeyError.message,
        reason
      });
    }
    throw new TokenVerificationError({
      action: "Contact support@clerk.com",
      message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
      reason: "jwk-remote-failed-to-load"
      /* RemoteJWKFailedToLoad */
    });
  }
  return response.json();
}
function reachedMaxCacheUpdatedAt() {
  return Date.now() - lastUpdatedAt >= MAX_CACHE_LAST_UPDATED_AT_SECONDS * 1e3;
}
async function verifyToken(token, options2) {
  const {
    apiKey,
    secretKey,
    apiUrl,
    apiVersion,
    audience,
    authorizedParties,
    clockSkewInSeconds,
    clockSkewInMs,
    issuer,
    jwksCacheTtlInMs,
    jwtKey,
    skipJwksCache
  } = options2;
  if (options2.apiKey) {
    deprecated("apiKey", "Use `secretKey` instead.");
  }
  const { header } = decodeJwt(token);
  const { kid } = header;
  let key2;
  if (jwtKey) {
    key2 = loadClerkJWKFromLocal(jwtKey);
  } else if (typeof issuer === "string") {
    key2 = await loadClerkJWKFromRemote({ issuer, kid, jwksCacheTtlInMs, skipJwksCache });
  } else if (apiKey || secretKey) {
    key2 = await loadClerkJWKFromRemote({ apiKey, secretKey, apiUrl, apiVersion, kid, jwksCacheTtlInMs, skipJwksCache });
  } else {
    throw new TokenVerificationError({
      action: "Set the CLERK_JWT_KEY environment variable.",
      message: "Failed to resolve JWK during verification.",
      reason: "jwk-failed-to-resolve"
      /* JWKFailedToResolve */
    });
  }
  return await verifyJwt(token, {
    audience,
    authorizedParties,
    clockSkewInSeconds,
    clockSkewInMs,
    key: key2,
    issuer
  });
}
async function runInterstitialRules(opts, rules) {
  for (const rule of rules) {
    const res = await rule(opts);
    if (res) {
      return res;
    }
  }
  return signedOut(
    opts,
    "unexpected-error"
    /* UnexpectedError */
  );
}
async function verifyRequestState(options2, token) {
  const { isSatellite, proxyUrl } = options2;
  let issuer;
  if (isSatellite) {
    issuer = null;
  } else if (proxyUrl) {
    issuer = proxyUrl;
  } else {
    issuer = (iss) => iss.startsWith("https://clerk.") || iss.includes(".clerk.accounts");
  }
  return verifyToken(token, { ...options2, issuer });
}
function assertSignInUrlExists(signInUrl, key2) {
  if (!signInUrl && isDevelopmentFromApiKey(key2)) {
    throw new Error(`Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite`);
  }
}
function assertProxyUrlOrDomain(proxyUrlOrDomain) {
  if (!proxyUrlOrDomain) {
    throw new Error(`Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl`);
  }
}
function assertSignInUrlFormatAndOrigin(_signInUrl, origin) {
  let signInUrl;
  try {
    signInUrl = new URL(_signInUrl);
  } catch {
    throw new Error(`The signInUrl needs to have a absolute url format.`);
  }
  if (signInUrl.origin === origin) {
    throw new Error(`The signInUrl needs to be on a different origin than your satellite application.`);
  }
}
async function authenticateRequest(options2) {
  const { cookies, headers, searchParams } = buildRequest2(options2?.request);
  if (options2.frontendApi) {
    deprecated("frontendApi", "Use `publishableKey` instead.");
  }
  if (options2.apiKey) {
    deprecated("apiKey", "Use `secretKey` instead.");
  }
  options2 = {
    ...options2,
    ...loadOptionsFromHeaders(options2, headers),
    frontendApi: parsePublishableKey(options2.publishableKey)?.frontendApi || options2.frontendApi,
    apiUrl: options2.apiUrl || API_URL,
    apiVersion: options2.apiVersion || API_VERSION,
    cookieToken: options2.cookieToken || cookies?.(constants.Cookies.Session),
    clientUat: options2.clientUat || cookies?.(constants.Cookies.ClientUat),
    searchParams: options2.searchParams || searchParams || void 0
  };
  assertValidSecretKey(options2.secretKey || options2.apiKey);
  if (options2.isSatellite) {
    assertSignInUrlExists(options2.signInUrl, options2.secretKey || options2.apiKey);
    if (options2.signInUrl && options2.origin) {
      assertSignInUrlFormatAndOrigin(options2.signInUrl, options2.origin);
    }
    assertProxyUrlOrDomain(options2.proxyUrl || options2.domain);
  }
  async function authenticateRequestWithTokenInHeader() {
    try {
      const state = await runInterstitialRules(options2, [hasValidHeaderToken]);
      return state;
    } catch (err) {
      return handleError(err, "header");
    }
  }
  async function authenticateRequestWithTokenInCookie() {
    try {
      const state = await runInterstitialRules(options2, [
        crossOriginRequestWithoutHeader,
        nonBrowserRequestInDevRule,
        isSatelliteAndNeedsSyncing,
        isPrimaryInDevAndRedirectsToSatellite,
        potentialFirstRequestOnProductionEnvironment,
        potentialFirstLoadInDevWhenUATMissing,
        potentialRequestAfterSignInOrOutFromClerkHostedUiInDev,
        hasPositiveClientUatButCookieIsMissing,
        isNormalSignedOutState,
        hasValidCookieToken
      ]);
      return state;
    } catch (err) {
      return handleError(err, "cookie");
    }
  }
  function handleError(err, tokenCarrier) {
    if (err instanceof TokenVerificationError) {
      err.tokenCarrier = tokenCarrier;
      const reasonToReturnInterstitial = [
        "token-expired",
        "token-not-active-yet"
        /* TokenNotActiveYet */
      ].includes(err.reason);
      if (reasonToReturnInterstitial) {
        if (tokenCarrier === "header") {
          return unknownState(options2, err.reason, err.getFullMessage());
        }
        return interstitial(options2, err.reason, err.getFullMessage());
      }
      return signedOut(options2, err.reason, err.getFullMessage());
    }
    return signedOut(options2, "unexpected-error", err.message);
  }
  if (options2.headerToken) {
    return authenticateRequestWithTokenInHeader();
  }
  return authenticateRequestWithTokenInCookie();
}
function createAuthenticateRequest(params) {
  const { apiClient } = params;
  const {
    apiKey: buildtimeApiKey = "",
    secretKey: buildtimeSecretKey = "",
    jwtKey: buildtimeJwtKey = "",
    apiUrl = API_URL,
    apiVersion = API_VERSION,
    frontendApi: buildtimeFrontendApi = "",
    proxyUrl: buildProxyUrl = "",
    publishableKey: buildtimePublishableKey = "",
    isSatellite: buildtimeIsSatellite = false,
    domain: buildtimeDomain = "",
    audience: buildtimeAudience = "",
    userAgent: buildUserAgent
  } = params.options;
  const authenticateRequest2 = ({
    apiKey: runtimeApiKey,
    secretKey: runtimeSecretKey,
    audience: runtimeAudience,
    frontendApi: runtimeFrontendApi,
    proxyUrl: runtimeProxyUrl,
    publishableKey: runtimePublishableKey,
    jwtKey: runtimeJwtKey,
    isSatellite: runtimeIsSatellite,
    domain: runtimeDomain,
    searchParams,
    ...rest
  }) => {
    return authenticateRequest({
      ...rest,
      apiKey: runtimeApiKey || buildtimeApiKey,
      secretKey: runtimeSecretKey || buildtimeSecretKey,
      audience: runtimeAudience || buildtimeAudience,
      apiUrl,
      apiVersion,
      frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
      proxyUrl: runtimeProxyUrl || buildProxyUrl,
      publishableKey: runtimePublishableKey || buildtimePublishableKey,
      isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
      domain: runtimeDomain || buildtimeDomain,
      jwtKey: runtimeJwtKey || buildtimeJwtKey,
      searchParams
    });
  };
  const localInterstitial = ({
    frontendApi: runtimeFrontendApi,
    publishableKey: runtimePublishableKey,
    proxyUrl: runtimeProxyUrl,
    isSatellite: runtimeIsSatellite,
    domain: runtimeDomain,
    ...rest
  }) => loadInterstitialFromLocal({
    ...rest,
    frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
    proxyUrl: runtimeProxyUrl || buildProxyUrl,
    publishableKey: runtimePublishableKey || buildtimePublishableKey,
    isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
    domain: runtimeDomain || buildtimeDomain
  });
  const remotePublicInterstitial = ({
    frontendApi: runtimeFrontendApi,
    publishableKey: runtimePublishableKey,
    proxyUrl: runtimeProxyUrl,
    isSatellite: runtimeIsSatellite,
    domain: runtimeDomain,
    userAgent: runtimeUserAgent,
    ...rest
  }) => {
    return loadInterstitialFromBAPI({
      ...rest,
      apiUrl,
      frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
      publishableKey: runtimePublishableKey || buildtimePublishableKey,
      proxyUrl: runtimeProxyUrl || buildProxyUrl,
      isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
      domain: runtimeDomain || buildtimeDomain,
      userAgent: runtimeUserAgent || buildUserAgent
    });
  };
  const remotePublicInterstitialUrl = buildPublicInterstitialUrl;
  const remotePrivateInterstitial = () => apiClient.interstitial.getInterstitial();
  return {
    authenticateRequest: authenticateRequest2,
    localInterstitial,
    remotePublicInterstitial,
    remotePrivateInterstitial,
    remotePublicInterstitialUrl,
    debugRequestState
  };
}
function Clerk(options2) {
  const opts = { ...options2 };
  const apiClient = createBackendApiClient(opts);
  const requestState = createAuthenticateRequest({ options: opts, apiClient });
  const clerkInstance = {
    ...apiClient,
    ...requestState,
    /**
     * @deprecated This prop has been deprecated and will be removed in the next major release.
     */
    __unstable_options: opts
  };
  deprecatedObjectProperty(
    clerkInstance,
    "__unstable_options",
    "Use `createClerkClient({...})` to create a new clerk instance instead."
  );
  return clerkInstance;
}
var import_deepmerge, import_snakecase_keys, import_cookie, AbstractAPI, SEPARATOR, MULTIPLE_SEPARATOR_REGEX, basePath, AllowlistIdentifierAPI, basePath2, ClientAPI, basePath3, DomainAPI, basePath4, EmailAddressAPI, basePath5, EmailAPI, errorThrower, isDevOrStagingUrl, InterstitialAPI, basePath6, InvitationAPI, RuntimeFetch2, RuntimeAbortController2, RuntimeBlob2, RuntimeFormData2, RuntimeHeaders2, RuntimeRequest2, RuntimeResponse2, globalFetch, runtime, runtime_default, basePath7, OrganizationAPI, basePath8, PhoneNumberAPI, basePath9, RedirectUrlAPI, basePath10, SessionAPI, basePath11, SignInTokenAPI, basePath12, SMSMessageAPI, basePath13, UserAPI, API_URL, API_VERSION, USER_AGENT, MAX_CACHE_LAST_UPDATED_AT_SECONDS, Attributes, Cookies, Headers2, SearchParams, ContentTypes, constants, AllowlistIdentifier, Session, Client, DeletedObject, Email, IdentificationLink, Verification, EmailAddress, ExternalAccount, Invitation, OauthAccessToken, Organization, OrganizationInvitation, OrganizationMembership, OrganizationMembershipPublicUserData, PhoneNumber, RedirectUrl, SignInToken, SMSMessage, Token, Web3Wallet, User, withLegacyReturn, createDebug, createGetToken, createHasAuthorization, TokenVerificationError, getFirstValueFromHeader, buildOrigin, buildRequest2, decode, parseIsomorphicRequestCookies, getHeaderFromIsomorphicRequest, getSearchParamsFromIsomorphicRequest, stripAuthorizationHeader, getErrorObjectByCode, base64url, base64UrlEncoding, algToHash, RSA_ALGORITHM_NAME, jwksAlgToCryptoAlg, algs, isArrayString, assertAudienceClaim, assertHeaderType, assertHeaderAlgorithm, assertSubClaim, assertAuthorizedPartiesClaim, assertIssuerClaim, assertExpirationClaim, assertActivationClaim, assertIssuedAtClaim, DEFAULT_CLOCK_SKEW_IN_SECONDS, cache, lastUpdatedAt, LocalJwkKid, PEM_HEADER, PEM_TRAILER, RSA_PREFIX, RSA_SUFFIX, shouldRedirectToSatelliteUrl, hasJustSynced, VALID_USER_AGENTS, isBrowser, nonBrowserRequestInDevRule, crossOriginRequestWithoutHeader, isPrimaryInDevAndRedirectsToSatellite, potentialFirstLoadInDevWhenUATMissing, potentialRequestAfterSignInOrOutFromClerkHostedUiInDev, potentialFirstRequestOnProductionEnvironment, isNormalSignedOutState, hasPositiveClientUatButCookieIsMissing, hasValidHeaderToken, hasValidCookieToken, isSatelliteAndNeedsSyncing, debugRequestState, loadOptionsFromHeaders;
var init_esm = __esm({
  "node_modules/@clerk/backend/dist/esm/index.js"() {
    init_deprecated();
    init_url();
    init_callWithRetry();
    init_keys();
    init_deprecated();
    init_error();
    init_keys();
    init_deprecated();
    init_crypto();
    init_fetch();
    init_deprecated();
    init_error();
    import_deepmerge = __toESM(require_cjs());
    import_snakecase_keys = __toESM(require_snakecase_keys());
    init_deprecated();
    import_cookie = __toESM(require_cookie());
    init_deprecated();
    init_isomorphicAtob();
    AbstractAPI = class {
      constructor(request) {
        this.request = request;
      }
      requireId(id) {
        if (!id) {
          throw new Error("A valid resource ID is required.");
        }
      }
    };
    SEPARATOR = "/";
    MULTIPLE_SEPARATOR_REGEX = new RegExp(SEPARATOR + "{1,}", "g");
    basePath = "/allowlist_identifiers";
    AllowlistIdentifierAPI = class extends AbstractAPI {
      async getAllowlistIdentifierList() {
        return this.request({
          method: "GET",
          path: basePath
        });
      }
      async createAllowlistIdentifier(params) {
        return this.request({
          method: "POST",
          path: basePath,
          bodyParams: params
        });
      }
      async deleteAllowlistIdentifier(allowlistIdentifierId) {
        this.requireId(allowlistIdentifierId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath, allowlistIdentifierId)
        });
      }
    };
    basePath2 = "/clients";
    ClientAPI = class extends AbstractAPI {
      async getClientList() {
        return this.request({
          method: "GET",
          path: basePath2
        });
      }
      async getClient(clientId) {
        this.requireId(clientId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath2, clientId)
        });
      }
      verifyClient(token) {
        return this.request({
          method: "POST",
          path: joinPaths(basePath2, "verify"),
          bodyParams: { token }
        });
      }
    };
    basePath3 = "/domains";
    DomainAPI = class extends AbstractAPI {
      async deleteDomain(id) {
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath3, id)
        });
      }
    };
    basePath4 = "/email_addresses";
    EmailAddressAPI = class extends AbstractAPI {
      async getEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath4, emailAddressId)
        });
      }
      async createEmailAddress(params) {
        return this.request({
          method: "POST",
          path: basePath4,
          bodyParams: params
        });
      }
      async updateEmailAddress(emailAddressId, params = {}) {
        this.requireId(emailAddressId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath4, emailAddressId),
          bodyParams: params
        });
      }
      async deleteEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath4, emailAddressId)
        });
      }
    };
    basePath5 = "/emails";
    EmailAPI = class extends AbstractAPI {
      async createEmail(params) {
        return this.request({
          method: "POST",
          path: basePath5,
          bodyParams: params
        });
      }
    };
    errorThrower = buildErrorThrower({ packageName: "@clerk/backend" });
    ({ isDevOrStagingUrl } = createDevOrStagingUrlCache());
    InterstitialAPI = class extends AbstractAPI {
      async getInterstitial() {
        deprecated(
          "getInterstitial()",
          'Switch to `Clerk(...).localInterstitial(...)` from `import { Clerk } from "@clerk/backend"`.'
        );
        return this.request({
          path: "internal/interstitial",
          method: "GET",
          headerParams: {
            "Content-Type": "text/html"
          }
        });
      }
    };
    basePath6 = "/invitations";
    InvitationAPI = class extends AbstractAPI {
      async getInvitationList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath6,
          queryParams: params
        });
      }
      async createInvitation(params) {
        return this.request({
          method: "POST",
          path: basePath6,
          bodyParams: params
        });
      }
      async revokeInvitation(invitationId) {
        this.requireId(invitationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath6, invitationId, "revoke")
        });
      }
    };
    ({
      RuntimeFetch: RuntimeFetch2,
      RuntimeAbortController: RuntimeAbortController2,
      RuntimeBlob: RuntimeBlob2,
      RuntimeFormData: RuntimeFormData2,
      RuntimeHeaders: RuntimeHeaders2,
      RuntimeRequest: RuntimeRequest2,
      RuntimeResponse: RuntimeResponse2
    } = fetch_exports);
    globalFetch = RuntimeFetch2.bind(globalThis);
    runtime = {
      crypto: crypto_default,
      fetch: globalFetch,
      AbortController: RuntimeAbortController2,
      Blob: RuntimeBlob2,
      FormData: RuntimeFormData2,
      Headers: RuntimeHeaders2,
      Request: RuntimeRequest2,
      Response: RuntimeResponse2
    };
    runtime_default = runtime;
    basePath7 = "/organizations";
    OrganizationAPI = class extends AbstractAPI {
      async getOrganizationList(params) {
        return this.request({
          method: "GET",
          path: basePath7,
          queryParams: params
        });
      }
      async createOrganization(params) {
        return this.request({
          method: "POST",
          path: basePath7,
          bodyParams: params
        });
      }
      async getOrganization(params) {
        const organizationIdOrSlug = "organizationId" in params ? params.organizationId : params.slug;
        this.requireId(organizationIdOrSlug);
        return this.request({
          method: "GET",
          path: joinPaths(basePath7, organizationIdOrSlug)
        });
      }
      async updateOrganization(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath7, organizationId),
          bodyParams: params
        });
      }
      async updateOrganizationLogo(organizationId, params) {
        this.requireId(organizationId);
        const formData = new runtime_default.FormData();
        formData.append("file", params?.file);
        formData.append("uploader_user_id", params?.uploaderUserId);
        return this.request({
          method: "PUT",
          path: joinPaths(basePath7, organizationId, "logo"),
          formData
        });
      }
      async deleteOrganizationLogo(organizationId) {
        this.requireId(organizationId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath7, organizationId, "logo")
        });
      }
      async updateOrganizationMetadata(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath7, organizationId, "metadata"),
          bodyParams: params
        });
      }
      async deleteOrganization(organizationId) {
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath7, organizationId)
        });
      }
      async getOrganizationMembershipList(params) {
        const { organizationId, limit, offset } = params;
        this.requireId(organizationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath7, organizationId, "memberships"),
          queryParams: { limit, offset }
        });
      }
      async createOrganizationMembership(params) {
        const { organizationId, userId, role } = params;
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath7, organizationId, "memberships"),
          bodyParams: {
            userId,
            role
          }
        });
      }
      async updateOrganizationMembership(params) {
        const { organizationId, userId, role } = params;
        this.requireId(organizationId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath7, organizationId, "memberships", userId),
          bodyParams: {
            role
          }
        });
      }
      async updateOrganizationMembershipMetadata(params) {
        const { organizationId, userId, publicMetadata, privateMetadata } = params;
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath7, organizationId, "memberships", userId, "metadata"),
          bodyParams: {
            publicMetadata,
            privateMetadata
          }
        });
      }
      async deleteOrganizationMembership(params) {
        const { organizationId, userId } = params;
        this.requireId(organizationId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath7, organizationId, "memberships", userId)
        });
      }
      async getOrganizationInvitationList(params) {
        const { organizationId, status, limit, offset } = params;
        this.requireId(organizationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath7, organizationId, "invitations"),
          queryParams: { status, limit, offset }
        });
      }
      /**
       * @deprecated  Use `getOrganizationInvitationList` instead along with the status parameter.
       */
      async getPendingOrganizationInvitationList(params) {
        deprecated("getPendingOrganizationInvitationList", "Use `getOrganizationInvitationList` instead.");
        const { organizationId, limit, offset } = params;
        this.requireId(organizationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath7, organizationId, "invitations", "pending"),
          queryParams: { limit, offset }
        });
      }
      async createOrganizationInvitation(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath7, organizationId, "invitations"),
          bodyParams: { ...bodyParams }
        });
      }
      async getOrganizationInvitation(params) {
        const { organizationId, invitationId } = params;
        this.requireId(organizationId);
        this.requireId(invitationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath7, organizationId, "invitations", invitationId)
        });
      }
      async revokeOrganizationInvitation(params) {
        const { organizationId, invitationId, requestingUserId } = params;
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath7, organizationId, "invitations", invitationId, "revoke"),
          bodyParams: {
            requestingUserId
          }
        });
      }
    };
    basePath8 = "/phone_numbers";
    PhoneNumberAPI = class extends AbstractAPI {
      async getPhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath8, phoneNumberId)
        });
      }
      async createPhoneNumber(params) {
        return this.request({
          method: "POST",
          path: basePath8,
          bodyParams: params
        });
      }
      async updatePhoneNumber(phoneNumberId, params = {}) {
        this.requireId(phoneNumberId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath8, phoneNumberId),
          bodyParams: params
        });
      }
      async deletePhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath8, phoneNumberId)
        });
      }
    };
    basePath9 = "/redirect_urls";
    RedirectUrlAPI = class extends AbstractAPI {
      async getRedirectUrlList() {
        return this.request({
          method: "GET",
          path: basePath9
        });
      }
      async getRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath9, redirectUrlId)
        });
      }
      async createRedirectUrl(params) {
        return this.request({
          method: "POST",
          path: basePath9,
          bodyParams: params
        });
      }
      async deleteRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath9, redirectUrlId)
        });
      }
    };
    basePath10 = "/sessions";
    SessionAPI = class extends AbstractAPI {
      async getSessionList(queryParams) {
        return this.request({
          method: "GET",
          path: basePath10,
          queryParams
        });
      }
      async getSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath10, sessionId)
        });
      }
      async revokeSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath10, sessionId, "revoke")
        });
      }
      async verifySession(sessionId, token) {
        this.requireId(sessionId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath10, sessionId, "verify"),
          bodyParams: { token }
        });
      }
      async getToken(sessionId, template) {
        this.requireId(sessionId);
        return (await this.request({
          method: "POST",
          path: joinPaths(basePath10, sessionId, "tokens", template || "")
        })).jwt;
      }
    };
    basePath11 = "/sign_in_tokens";
    SignInTokenAPI = class extends AbstractAPI {
      async createSignInToken(params) {
        return this.request({
          method: "POST",
          path: basePath11,
          bodyParams: params
        });
      }
      async revokeSignInToken(signInTokenId) {
        this.requireId(signInTokenId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath11, signInTokenId, "revoke")
        });
      }
    };
    basePath12 = "/sms_messages";
    SMSMessageAPI = class extends AbstractAPI {
      /**
       * @deprecated This endpoint is no longer available and the function will be removed in the next major version.
       */
      async createSMSMessage(params) {
        deprecated(
          "SMSMessageAPI.createSMSMessage",
          "This endpoint is no longer available and the function will be removed in the next major version."
        );
        return this.request({
          method: "POST",
          path: basePath12,
          bodyParams: params
        });
      }
    };
    basePath13 = "/users";
    UserAPI = class extends AbstractAPI {
      async getUserList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath13,
          queryParams: params
        });
      }
      async getUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath13, userId)
        });
      }
      async createUser(params) {
        return this.request({
          method: "POST",
          path: basePath13,
          bodyParams: params
        });
      }
      async updateUser(userId, params = {}) {
        this.requireId(userId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath13, userId),
          bodyParams: params
        });
      }
      async updateUserProfileImage(userId, params) {
        this.requireId(userId);
        const formData = new runtime_default.FormData();
        formData.append("file", params?.file);
        return this.request({
          method: "POST",
          path: joinPaths(basePath13, userId, "profile_image"),
          formData
        });
      }
      async updateUserMetadata(userId, params) {
        this.requireId(userId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath13, userId, "metadata"),
          bodyParams: params
        });
      }
      async deleteUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath13, userId)
        });
      }
      async getCount(params = {}) {
        return this.request({
          method: "GET",
          path: joinPaths(basePath13, "count"),
          queryParams: params
        });
      }
      async getUserOauthAccessToken(userId, provider) {
        this.requireId(userId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath13, userId, "oauth_access_tokens", provider)
        });
      }
      async disableUserMFA(userId) {
        this.requireId(userId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath13, userId, "mfa")
        });
      }
      async getOrganizationMembershipList(params) {
        const { userId, limit, offset } = params;
        this.requireId(userId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath13, userId, "organization_memberships"),
          queryParams: { limit, offset }
        });
      }
      async verifyPassword(params) {
        const { userId, password } = params;
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath13, userId, "verify_password"),
          bodyParams: { password }
        });
      }
      async verifyTOTP(params) {
        const { userId, code } = params;
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath13, userId, "verify_totp"),
          bodyParams: { code }
        });
      }
    };
    API_URL = "https://api.clerk.dev";
    API_VERSION = "v1";
    USER_AGENT = `@clerk/backend`;
    MAX_CACHE_LAST_UPDATED_AT_SECONDS = 5 * 60;
    Attributes = {
      AuthStatus: "__clerkAuthStatus",
      AuthReason: "__clerkAuthReason",
      AuthMessage: "__clerkAuthMessage"
    };
    Cookies = {
      Session: "__session",
      ClientUat: "__client_uat"
    };
    Headers2 = {
      AuthStatus: "x-clerk-auth-status",
      AuthReason: "x-clerk-auth-reason",
      AuthMessage: "x-clerk-auth-message",
      EnableDebug: "x-clerk-debug",
      ClerkRedirectTo: "x-clerk-redirect-to",
      CloudFrontForwardedProto: "cloudfront-forwarded-proto",
      Authorization: "authorization",
      ForwardedPort: "x-forwarded-port",
      ForwardedProto: "x-forwarded-proto",
      ForwardedHost: "x-forwarded-host",
      Referrer: "referer",
      UserAgent: "user-agent",
      Origin: "origin",
      Host: "host",
      ContentType: "content-type"
    };
    SearchParams = {
      AuthStatus: Headers2.AuthStatus
    };
    ContentTypes = {
      Json: "application/json"
    };
    constants = {
      Attributes,
      Cookies,
      Headers: Headers2,
      SearchParams,
      ContentTypes
    };
    AllowlistIdentifier = class _AllowlistIdentifier {
      constructor(id, identifier, createdAt, updatedAt, invitationId) {
        this.id = id;
        this.identifier = identifier;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.invitationId = invitationId;
      }
      static fromJSON(data) {
        return new _AllowlistIdentifier(data.id, data.identifier, data.created_at, data.updated_at, data.invitation_id);
      }
    };
    Session = class _Session {
      constructor(id, clientId, userId, status, lastActiveAt, expireAt, abandonAt, createdAt, updatedAt) {
        this.id = id;
        this.clientId = clientId;
        this.userId = userId;
        this.status = status;
        this.lastActiveAt = lastActiveAt;
        this.expireAt = expireAt;
        this.abandonAt = abandonAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _Session(
          data.id,
          data.client_id,
          data.user_id,
          data.status,
          data.last_active_at,
          data.expire_at,
          data.abandon_at,
          data.created_at,
          data.updated_at
        );
      }
    };
    Client = class _Client {
      constructor(id, sessionIds, sessions, signInId, signUpId, lastActiveSessionId, createdAt, updatedAt) {
        this.id = id;
        this.sessionIds = sessionIds;
        this.sessions = sessions;
        this.signInId = signInId;
        this.signUpId = signUpId;
        this.lastActiveSessionId = lastActiveSessionId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _Client(
          data.id,
          data.session_ids,
          data.sessions.map((x) => Session.fromJSON(x)),
          data.sign_in_id,
          data.sign_up_id,
          data.last_active_session_id,
          data.created_at,
          data.updated_at
        );
      }
    };
    DeletedObject = class _DeletedObject {
      constructor(object, id, slug, deleted) {
        this.object = object;
        this.id = id;
        this.slug = slug;
        this.deleted = deleted;
      }
      static fromJSON(data) {
        return new _DeletedObject(data.object, data.id || null, data.slug || null, data.deleted);
      }
    };
    Email = class _Email {
      constructor(id, fromEmailName, emailAddressId, toEmailAddress, subject, body, bodyPlain, status, slug, data, deliveredByClerk) {
        this.id = id;
        this.fromEmailName = fromEmailName;
        this.emailAddressId = emailAddressId;
        this.toEmailAddress = toEmailAddress;
        this.subject = subject;
        this.body = body;
        this.bodyPlain = bodyPlain;
        this.status = status;
        this.slug = slug;
        this.data = data;
        this.deliveredByClerk = deliveredByClerk;
      }
      static fromJSON(data) {
        return new _Email(
          data.id,
          data.from_email_name,
          data.email_address_id,
          data.to_email_address,
          data.subject,
          data.body,
          data.body_plain,
          data.status,
          data.slug,
          data.data,
          data.delivered_by_clerk
        );
      }
    };
    IdentificationLink = class _IdentificationLink {
      constructor(id, type) {
        this.id = id;
        this.type = type;
      }
      static fromJSON(data) {
        return new _IdentificationLink(data.id, data.type);
      }
    };
    Verification = class _Verification {
      constructor(status, strategy, externalVerificationRedirectURL = null, attempts = null, expireAt = null, nonce = null) {
        this.status = status;
        this.strategy = strategy;
        this.externalVerificationRedirectURL = externalVerificationRedirectURL;
        this.attempts = attempts;
        this.expireAt = expireAt;
        this.nonce = nonce;
      }
      static fromJSON(data) {
        return new _Verification(
          data.status,
          data.strategy,
          data.external_verification_redirect_url ? new URL(data.external_verification_redirect_url) : null,
          data.attempts,
          data.expire_at,
          data.nonce
        );
      }
    };
    EmailAddress = class _EmailAddress {
      constructor(id, emailAddress, verification, linkedTo) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.verification = verification;
        this.linkedTo = linkedTo;
      }
      static fromJSON(data) {
        return new _EmailAddress(
          data.id,
          data.email_address,
          data.verification && Verification.fromJSON(data.verification),
          data.linked_to.map((link) => IdentificationLink.fromJSON(link))
        );
      }
    };
    ExternalAccount = class _ExternalAccount {
      constructor(id, provider, identificationId, externalId, approvedScopes, emailAddress, firstName, lastName, picture, imageUrl, username, publicMetadata = {}, label, verification) {
        this.id = id;
        this.provider = provider;
        this.identificationId = identificationId;
        this.externalId = externalId;
        this.approvedScopes = approvedScopes;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
        this.imageUrl = imageUrl;
        this.username = username;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.verification = verification;
      }
      static fromJSON(data) {
        return new _ExternalAccount(
          data.id,
          data.provider,
          data.identification_id,
          data.provider_user_id,
          data.approved_scopes,
          data.email_address,
          data.first_name,
          data.last_name,
          data.avatar_url,
          data.image_url,
          data.username,
          data.public_metadata,
          data.label,
          data.verification && Verification.fromJSON(data.verification)
        );
      }
    };
    deprecatedProperty(ExternalAccount, "picture", "Use `imageUrl` instead.");
    Invitation = class _Invitation {
      constructor(id, emailAddress, publicMetadata, createdAt, updatedAt, status, revoked) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.publicMetadata = publicMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.revoked = revoked;
      }
      static fromJSON(data) {
        return new _Invitation(
          data.id,
          data.email_address,
          data.public_metadata,
          data.created_at,
          data.updated_at,
          data.status,
          data.revoked
        );
      }
    };
    OauthAccessToken = class _OauthAccessToken {
      constructor(provider, token, publicMetadata = {}, label, scopes, tokenSecret) {
        this.provider = provider;
        this.token = token;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.scopes = scopes;
        this.tokenSecret = tokenSecret;
      }
      static fromJSON(data) {
        return new _OauthAccessToken(
          data.provider,
          data.token,
          data.public_metadata,
          data.label,
          data.scopes,
          data.token_secret
        );
      }
    };
    Organization = class _Organization {
      constructor(id, name, slug, logoUrl, imageUrl, hasImage, createdBy, createdAt, updatedAt, publicMetadata = {}, privateMetadata = {}, maxAllowedMemberships, adminDeleteEnabled, members_count) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.logoUrl = logoUrl;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.maxAllowedMemberships = maxAllowedMemberships;
        this.adminDeleteEnabled = adminDeleteEnabled;
        this.members_count = members_count;
      }
      static fromJSON(data) {
        return new _Organization(
          data.id,
          data.name,
          data.slug,
          data.logo_url,
          data.image_url,
          data.has_image,
          data.created_by,
          data.created_at,
          data.updated_at,
          data.public_metadata,
          data.private_metadata,
          data.max_allowed_memberships,
          data.admin_delete_enabled,
          data.members_count
        );
      }
    };
    deprecatedProperty(Organization, "logoUrl", "Use `imageUrl` instead.");
    OrganizationInvitation = class _OrganizationInvitation {
      constructor(id, emailAddress, role, organizationId, createdAt, updatedAt, status, publicMetadata = {}, privateMetadata = {}) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.role = role;
        this.organizationId = organizationId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
      }
      static fromJSON(data) {
        return new _OrganizationInvitation(
          data.id,
          data.email_address,
          data.role,
          data.organization_id,
          data.created_at,
          data.updated_at,
          data.status,
          data.public_metadata,
          data.private_metadata
        );
      }
    };
    OrganizationMembership = class _OrganizationMembership {
      constructor(id, role, publicMetadata = {}, privateMetadata = {}, createdAt, updatedAt, organization, publicUserData) {
        this.id = id;
        this.role = role;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.organization = organization;
        this.publicUserData = publicUserData;
      }
      static fromJSON(data) {
        return new _OrganizationMembership(
          data.id,
          data.role,
          data.public_metadata,
          data.private_metadata,
          data.created_at,
          data.updated_at,
          Organization.fromJSON(data.organization),
          OrganizationMembershipPublicUserData.fromJSON(data.public_user_data)
        );
      }
    };
    OrganizationMembershipPublicUserData = class _OrganizationMembershipPublicUserData {
      constructor(identifier, firstName, lastName, profileImageUrl, imageUrl, hasImage, userId) {
        this.identifier = identifier;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageUrl = profileImageUrl;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.userId = userId;
      }
      static fromJSON(data) {
        return new _OrganizationMembershipPublicUserData(
          data.identifier,
          data.first_name,
          data.last_name,
          data.profile_image_url,
          data.image_url,
          data.has_image,
          data.user_id
        );
      }
    };
    deprecatedProperty(OrganizationMembershipPublicUserData, "profileImageUrl", "Use `imageUrl` instead.");
    PhoneNumber = class _PhoneNumber {
      constructor(id, phoneNumber, reservedForSecondFactor, defaultSecondFactor, verification, linkedTo) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.reservedForSecondFactor = reservedForSecondFactor;
        this.defaultSecondFactor = defaultSecondFactor;
        this.verification = verification;
        this.linkedTo = linkedTo;
      }
      static fromJSON(data) {
        return new _PhoneNumber(
          data.id,
          data.phone_number,
          data.reserved_for_second_factor,
          data.default_second_factor,
          data.verification && Verification.fromJSON(data.verification),
          data.linked_to.map((link) => IdentificationLink.fromJSON(link))
        );
      }
    };
    RedirectUrl = class _RedirectUrl {
      constructor(id, url, createdAt, updatedAt) {
        this.id = id;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _RedirectUrl(data.id, data.url, data.created_at, data.updated_at);
      }
    };
    SignInToken = class _SignInToken {
      constructor(id, userId, token, status, url, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.status = status;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _SignInToken(data.id, data.user_id, data.token, data.status, data.url, data.created_at, data.updated_at);
      }
    };
    SMSMessage = class _SMSMessage {
      constructor(id, fromPhoneNumber, toPhoneNumber, message, status, phoneNumberId, data) {
        this.id = id;
        this.fromPhoneNumber = fromPhoneNumber;
        this.toPhoneNumber = toPhoneNumber;
        this.message = message;
        this.status = status;
        this.phoneNumberId = phoneNumberId;
        this.data = data;
      }
      static fromJSON(data) {
        return new _SMSMessage(
          data.id,
          data.from_phone_number,
          data.to_phone_number,
          data.message,
          data.status,
          data.phone_number_id,
          data.data
        );
      }
    };
    Token = class _Token {
      constructor(jwt) {
        this.jwt = jwt;
      }
      static fromJSON(data) {
        return new _Token(data.jwt);
      }
    };
    Web3Wallet = class _Web3Wallet {
      constructor(id, web3Wallet, verification) {
        this.id = id;
        this.web3Wallet = web3Wallet;
        this.verification = verification;
      }
      static fromJSON(data) {
        return new _Web3Wallet(data.id, data.web3_wallet, data.verification && Verification.fromJSON(data.verification));
      }
    };
    User = class _User {
      constructor(id, passwordEnabled, totpEnabled, backupCodeEnabled, twoFactorEnabled, banned, createdAt, updatedAt, profileImageUrl, imageUrl, hasImage, gender, birthday, primaryEmailAddressId, primaryPhoneNumberId, primaryWeb3WalletId, lastSignInAt, externalId, username, firstName, lastName, publicMetadata = {}, privateMetadata = {}, unsafeMetadata = {}, emailAddresses = [], phoneNumbers = [], web3Wallets = [], externalAccounts = []) {
        this.id = id;
        this.passwordEnabled = passwordEnabled;
        this.totpEnabled = totpEnabled;
        this.backupCodeEnabled = backupCodeEnabled;
        this.twoFactorEnabled = twoFactorEnabled;
        this.banned = banned;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.profileImageUrl = profileImageUrl;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.gender = gender;
        this.birthday = birthday;
        this.primaryEmailAddressId = primaryEmailAddressId;
        this.primaryPhoneNumberId = primaryPhoneNumberId;
        this.primaryWeb3WalletId = primaryWeb3WalletId;
        this.lastSignInAt = lastSignInAt;
        this.externalId = externalId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.unsafeMetadata = unsafeMetadata;
        this.emailAddresses = emailAddresses;
        this.phoneNumbers = phoneNumbers;
        this.web3Wallets = web3Wallets;
        this.externalAccounts = externalAccounts;
      }
      static fromJSON(data) {
        return new _User(
          data.id,
          data.password_enabled,
          data.totp_enabled,
          data.backup_code_enabled,
          data.two_factor_enabled,
          data.banned,
          data.created_at,
          data.updated_at,
          data.profile_image_url,
          data.image_url,
          data.has_image,
          data.gender,
          data.birthday,
          data.primary_email_address_id,
          data.primary_phone_number_id,
          data.primary_web3_wallet_id,
          data.last_sign_in_at,
          data.external_id,
          data.username,
          data.first_name,
          data.last_name,
          data.public_metadata,
          data.private_metadata,
          data.unsafe_metadata,
          (data.email_addresses || []).map((x) => EmailAddress.fromJSON(x)),
          (data.phone_numbers || []).map((x) => PhoneNumber.fromJSON(x)),
          (data.web3_wallets || []).map((x) => Web3Wallet.fromJSON(x)),
          (data.external_accounts || []).map((x) => ExternalAccount.fromJSON(x))
        );
      }
    };
    deprecatedProperty(User, "profileImageUrl", "Use `imageUrl` instead.");
    withLegacyReturn = (cb) => async (...args) => {
      const { data, errors, status, statusText, clerkTraceId } = await cb(...args);
      if (errors === null) {
        return data;
      } else {
        throw new ClerkAPIResponseError(statusText || "", {
          data: errors,
          status: status || "",
          clerkTraceId
        });
      }
    };
    createDebug = (data) => {
      return () => {
        const res = { ...data };
        res.apiKey = (res.apiKey || "").substring(0, 7);
        res.secretKey = (res.secretKey || "").substring(0, 7);
        res.jwtKey = (res.jwtKey || "").substring(0, 7);
        return { ...res };
      };
    };
    createGetToken = (params) => {
      const { fetcher, sessionToken, sessionId } = params || {};
      return async (options2 = {}) => {
        if (!sessionId) {
          return null;
        }
        if (options2.template) {
          return fetcher(sessionId, options2.template);
        }
        return sessionToken;
      };
    };
    createHasAuthorization = ({
      orgId,
      orgRole,
      userId
    }) => (params) => {
      if (!orgId || !userId) {
        return false;
      }
      if (params.role) {
        return orgRole === params.role;
      }
      if (params.some) {
        return !!params.some.find((permObj) => {
          if (permObj.role) {
            return orgRole === permObj.role;
          }
          return false;
        });
      }
      return false;
    };
    TokenVerificationError = class _TokenVerificationError extends Error {
      constructor({
        action,
        message,
        reason
      }) {
        super(message);
        Object.setPrototypeOf(this, _TokenVerificationError.prototype);
        this.reason = reason;
        this.message = message;
        this.action = action;
      }
      getFullMessage() {
        return `${[this.message, this.action].filter((m) => m).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
      }
    };
    getFirstValueFromHeader = (value) => value?.split(",")[0];
    buildOrigin = ({ protocol, forwardedProto, forwardedHost, host }) => {
      const resolvedHost = getFirstValueFromHeader(forwardedHost) ?? host;
      const resolvedProtocol = getFirstValueFromHeader(forwardedProto) ?? protocol?.replace(/[:/]/, "");
      if (!resolvedHost || !resolvedProtocol) {
        return "";
      }
      return `${resolvedProtocol}://${resolvedHost}`;
    };
    buildRequest2 = (req) => {
      if (!req) {
        return {};
      }
      const cookies = parseIsomorphicRequestCookies(req);
      const headers = getHeaderFromIsomorphicRequest(req);
      const searchParams = getSearchParamsFromIsomorphicRequest(req);
      return {
        cookies,
        headers,
        searchParams
      };
    };
    decode = (str) => {
      if (!str) {
        return str;
      }
      return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    };
    parseIsomorphicRequestCookies = (req) => {
      const cookies = req.headers && req.headers?.get("cookie") ? (0, import_cookie.parse)(req.headers.get("cookie")) : {};
      return (key2) => {
        const value = cookies?.[key2];
        if (value === void 0) {
          return void 0;
        }
        return decode(value);
      };
    };
    getHeaderFromIsomorphicRequest = (req) => (key2) => req?.headers?.get(key2) || void 0;
    getSearchParamsFromIsomorphicRequest = (req) => req?.url ? new URL(req.url)?.searchParams : void 0;
    stripAuthorizationHeader = (authValue) => {
      return authValue?.replace("Bearer ", "");
    };
    getErrorObjectByCode = (errors, code) => {
      if (!errors) {
        return null;
      }
      return errors.find((err) => err.code === code);
    };
    base64url = {
      parse(string, opts) {
        return parse2(string, base64UrlEncoding, opts);
      },
      stringify(data, opts) {
        return stringify(data, base64UrlEncoding, opts);
      }
    };
    base64UrlEncoding = {
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bits: 6
    };
    algToHash = {
      RS256: "SHA-256",
      RS384: "SHA-384",
      RS512: "SHA-512"
    };
    RSA_ALGORITHM_NAME = "RSASSA-PKCS1-v1_5";
    jwksAlgToCryptoAlg = {
      RS256: RSA_ALGORITHM_NAME,
      RS384: RSA_ALGORITHM_NAME,
      RS512: RSA_ALGORITHM_NAME
    };
    algs = Object.keys(algToHash);
    isArrayString = (s2) => {
      return Array.isArray(s2) && s2.length > 0 && s2.every((a) => typeof a === "string");
    };
    assertAudienceClaim = (aud, audience) => {
      const audienceList = [audience].flat().filter((a) => !!a);
      const audList = [aud].flat().filter((a) => !!a);
      const shouldVerifyAudience = audienceList.length > 0 && audList.length > 0;
      if (!shouldVerifyAudience) {
        return;
      }
      if (typeof aud === "string") {
        if (!audienceList.includes(aud)) {
          throw new TokenVerificationError({
            action: "Make sure that this is a valid Clerk generate JWT.",
            reason: "token-verification-failed",
            message: `Invalid JWT audience claim (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
              audienceList
            )}".`
          });
        }
      } else if (isArrayString(aud)) {
        if (!aud.some((a) => audienceList.includes(a))) {
          throw new TokenVerificationError({
            action: "Make sure that this is a valid Clerk generate JWT.",
            reason: "token-verification-failed",
            message: `Invalid JWT audience claim array (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
              audienceList
            )}".`
          });
        }
      }
    };
    assertHeaderType = (typ) => {
      if (typeof typ === "undefined") {
        return;
      }
      if (typ !== "JWT") {
        throw new TokenVerificationError({
          action: "Make sure that this is a valid Clerk generate JWT.",
          reason: "token-invalid",
          message: `Invalid JWT type ${JSON.stringify(typ)}. Expected "JWT".`
        });
      }
    };
    assertHeaderAlgorithm = (alg) => {
      if (!algs.includes(alg)) {
        throw new TokenVerificationError({
          action: "Make sure that this is a valid Clerk generate JWT.",
          reason: "token-invalid-algorithm",
          message: `Invalid JWT algorithm ${JSON.stringify(alg)}. Supported: ${algs}.`
        });
      }
    };
    assertSubClaim = (sub) => {
      if (typeof sub !== "string") {
        throw new TokenVerificationError({
          action: "Make sure that this is a valid Clerk generate JWT.",
          reason: "token-verification-failed",
          message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(sub)}.`
        });
      }
    };
    assertAuthorizedPartiesClaim = (azp, authorizedParties) => {
      if (!azp || !authorizedParties || authorizedParties.length === 0) {
        return;
      }
      if (!authorizedParties.includes(azp)) {
        throw new TokenVerificationError({
          reason: "token-invalid-authorized-parties",
          message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(azp)}. Expected "${authorizedParties}".`
        });
      }
    };
    assertIssuerClaim = (iss, issuer) => {
      if (typeof issuer === "function" && !issuer(iss)) {
        throw new TokenVerificationError({
          reason: "token-invalid-issuer",
          message: "Failed JWT issuer resolver. Make sure that the resolver returns a truthy value."
        });
      } else if (typeof issuer === "string" && iss && iss !== issuer) {
        throw new TokenVerificationError({
          reason: "token-invalid-issuer",
          message: `Invalid JWT issuer claim (iss) ${JSON.stringify(iss)}. Expected "${issuer}".`
        });
      }
    };
    assertExpirationClaim = (exp, clockSkewInMs) => {
      if (typeof exp !== "number") {
        throw new TokenVerificationError({
          action: "Make sure that this is a valid Clerk generate JWT.",
          reason: "token-verification-failed",
          message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(exp)}. Expected number.`
        });
      }
      const currentDate = new Date(Date.now());
      const expiryDate = /* @__PURE__ */ new Date(0);
      expiryDate.setUTCSeconds(exp);
      const expired = expiryDate.getTime() <= currentDate.getTime() - clockSkewInMs;
      if (expired) {
        throw new TokenVerificationError({
          reason: "token-expired",
          message: `JWT is expired. Expiry date: ${expiryDate.toUTCString()}, Current date: ${currentDate.toUTCString()}.`
        });
      }
    };
    assertActivationClaim = (nbf, clockSkewInMs) => {
      if (typeof nbf === "undefined") {
        return;
      }
      if (typeof nbf !== "number") {
        throw new TokenVerificationError({
          action: "Make sure that this is a valid Clerk generate JWT.",
          reason: "token-verification-failed",
          message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(nbf)}. Expected number.`
        });
      }
      const currentDate = new Date(Date.now());
      const notBeforeDate = /* @__PURE__ */ new Date(0);
      notBeforeDate.setUTCSeconds(nbf);
      const early = notBeforeDate.getTime() > currentDate.getTime() + clockSkewInMs;
      if (early) {
        throw new TokenVerificationError({
          reason: "token-not-active-yet",
          message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${notBeforeDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
        });
      }
    };
    assertIssuedAtClaim = (iat, clockSkewInMs) => {
      if (typeof iat === "undefined") {
        return;
      }
      if (typeof iat !== "number") {
        throw new TokenVerificationError({
          action: "Make sure that this is a valid Clerk generate JWT.",
          reason: "token-verification-failed",
          message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(iat)}. Expected number.`
        });
      }
      const currentDate = new Date(Date.now());
      const issuedAtDate = /* @__PURE__ */ new Date(0);
      issuedAtDate.setUTCSeconds(iat);
      const postIssued = issuedAtDate.getTime() > currentDate.getTime() + clockSkewInMs;
      if (postIssued) {
        throw new TokenVerificationError({
          reason: "token-not-active-yet",
          message: `JWT issued at date claim (iat) is in the future. Issued at date: ${issuedAtDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
        });
      }
    };
    DEFAULT_CLOCK_SKEW_IN_SECONDS = 5 * 1e3;
    cache = {};
    lastUpdatedAt = 0;
    LocalJwkKid = "local";
    PEM_HEADER = "-----BEGIN PUBLIC KEY-----";
    PEM_TRAILER = "-----END PUBLIC KEY-----";
    RSA_PREFIX = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA";
    RSA_SUFFIX = "IDAQAB";
    shouldRedirectToSatelliteUrl = (qp) => !!qp?.get("__clerk_satellite_url");
    hasJustSynced = (qp) => qp?.get("__clerk_synced") === "true";
    VALID_USER_AGENTS = /^Mozilla\/|(Amazon CloudFront)/;
    isBrowser = (userAgent) => VALID_USER_AGENTS.test(userAgent || "");
    nonBrowserRequestInDevRule = (options2) => {
      const { apiKey, secretKey, userAgent } = options2;
      const key2 = secretKey || apiKey || "";
      if (isDevelopmentFromApiKey(key2) && !isBrowser(userAgent)) {
        return signedOut(
          options2,
          "header-missing-non-browser"
          /* HeaderMissingNonBrowser */
        );
      }
      return void 0;
    };
    crossOriginRequestWithoutHeader = (options2) => {
      const { origin, host, forwardedHost, forwardedProto } = options2;
      const isCrossOrigin = origin && checkCrossOrigin({
        originURL: new URL(origin),
        host,
        forwardedHost,
        forwardedProto
      });
      if (isCrossOrigin) {
        return signedOut(
          options2,
          "header-missing-cors"
          /* HeaderMissingCORS */
        );
      }
      return void 0;
    };
    isPrimaryInDevAndRedirectsToSatellite = (options2) => {
      const { apiKey, secretKey, isSatellite, searchParams } = options2;
      const key2 = secretKey || apiKey || "";
      const isDev = isDevelopmentFromApiKey(key2);
      if (isDev && !isSatellite && shouldRedirectToSatelliteUrl(searchParams)) {
        return interstitial(
          options2,
          "primary-responds-to-syncing"
          /* PrimaryRespondsToSyncing */
        );
      }
      return void 0;
    };
    potentialFirstLoadInDevWhenUATMissing = (options2) => {
      const { apiKey, secretKey, clientUat } = options2;
      const key2 = secretKey || apiKey || "";
      const res = isDevelopmentFromApiKey(key2);
      if (res && !clientUat) {
        return interstitial(
          options2,
          "uat-missing"
          /* CookieUATMissing */
        );
      }
      return void 0;
    };
    potentialRequestAfterSignInOrOutFromClerkHostedUiInDev = (options2) => {
      const { apiKey, secretKey, referrer, host, forwardedHost, forwardedProto } = options2;
      const crossOriginReferrer = referrer && checkCrossOrigin({ originURL: new URL(referrer), host, forwardedHost, forwardedProto });
      const key2 = secretKey || apiKey || "";
      if (isDevelopmentFromApiKey(key2) && crossOriginReferrer) {
        return interstitial(
          options2,
          "cross-origin-referrer"
          /* CrossOriginReferrer */
        );
      }
      return void 0;
    };
    potentialFirstRequestOnProductionEnvironment = (options2) => {
      const { apiKey, secretKey, clientUat, cookieToken } = options2;
      const key2 = secretKey || apiKey || "";
      if (isProductionFromApiKey(key2) && !clientUat && !cookieToken) {
        return signedOut(
          options2,
          "cookie-and-uat-missing"
          /* CookieAndUATMissing */
        );
      }
      return void 0;
    };
    isNormalSignedOutState = (options2) => {
      const { clientUat } = options2;
      if (clientUat === "0") {
        return signedOut(
          options2,
          "standard-signed-out"
          /* StandardSignedOut */
        );
      }
      return void 0;
    };
    hasPositiveClientUatButCookieIsMissing = (options2) => {
      const { clientUat, cookieToken } = options2;
      if (clientUat && Number.parseInt(clientUat) > 0 && !cookieToken) {
        return interstitial(
          options2,
          "cookie-missing"
          /* CookieMissing */
        );
      }
      return void 0;
    };
    hasValidHeaderToken = async (options2) => {
      const { headerToken } = options2;
      const sessionClaims = await verifyRequestState(options2, headerToken);
      return await signedIn(options2, sessionClaims);
    };
    hasValidCookieToken = async (options2) => {
      const { cookieToken, clientUat } = options2;
      const sessionClaims = await verifyRequestState(options2, cookieToken);
      const state = await signedIn(options2, sessionClaims);
      const jwt = state.toAuth().sessionClaims;
      const cookieTokenIsOutdated = jwt.iat < Number.parseInt(clientUat);
      if (!clientUat || cookieTokenIsOutdated) {
        return interstitial(
          options2,
          "cookie-outdated"
          /* CookieOutDated */
        );
      }
      return state;
    };
    isSatelliteAndNeedsSyncing = (options2) => {
      const { clientUat, isSatellite, searchParams, userAgent } = options2;
      const isSignedOut = !clientUat || clientUat === "0";
      if (isSatellite && isSignedOut && !isBrowser(userAgent)) {
        return signedOut(
          options2,
          "satellite-needs-syncing"
          /* SatelliteCookieNeedsSyncing */
        );
      }
      if (isSatellite && isSignedOut && !hasJustSynced(searchParams)) {
        return interstitial(
          options2,
          "satellite-needs-syncing"
          /* SatelliteCookieNeedsSyncing */
        );
      }
      return void 0;
    };
    debugRequestState = (params) => {
      const { frontendApi, isSignedIn, proxyUrl, isInterstitial, reason, message, publishableKey, isSatellite, domain } = params;
      return { frontendApi, isSignedIn, proxyUrl, isInterstitial, reason, message, publishableKey, isSatellite, domain };
    };
    loadOptionsFromHeaders = (options2, headers) => {
      if (!headers) {
        return {};
      }
      return {
        headerToken: stripAuthorizationHeader(options2.headerToken || headers(constants.Headers.Authorization)),
        origin: options2.origin || headers(constants.Headers.Origin),
        host: options2.host || headers(constants.Headers.Host),
        forwardedHost: options2.forwardedHost || headers(constants.Headers.ForwardedHost),
        forwardedPort: options2.forwardedPort || headers(constants.Headers.ForwardedPort),
        forwardedProto: options2.forwardedProto || headers(constants.Headers.CloudFrontForwardedProto) || headers(constants.Headers.ForwardedProto),
        referrer: options2.referrer || headers(constants.Headers.Referrer),
        userAgent: options2.userAgent || headers(constants.Headers.UserAgent)
      };
    };
  }
});

// .svelte-kit/output/server/chunks/private.js
var PRIVATE_AWS_API_KEY, PRIVATE_CLERK_SECRET_KEY;
var init_private = __esm({
  ".svelte-kit/output/server/chunks/private.js"() {
    PRIVATE_AWS_API_KEY = "AKIAXDXXNOPF4352K5ID";
    PRIVATE_CLERK_SECRET_KEY = "sk_test_ATZwvt7tfEdaNDUw3UQF2rEG0fW758Rw7aqRlcnLXZ";
  }
});

// .svelte-kit/output/server/chunks/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
function sequence(...handlers2) {
  const length = handlers2.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers2[i];
      return handle2({
        event: event2,
        resolve: (event3, options2) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options2?.transformPageChunk) {
              html = await options2.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options2?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options2?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
function handleClerk(secretKey, { debug = false, protectedPaths = [], signInUrl = "/sign-in" }) {
  return async ({ event, resolve }) => {
    const sessionToken = event.cookies.get("__session");
    debug && console.log("[Clerk SvelteKit] " + event.url.pathname);
    if (sessionToken) {
      debug && console.log("[Clerk SvelteKit] Found session token in cookies.");
      try {
        const session = await verifySession(secretKey, sessionToken);
        if (session) {
          debug && console.log("[Clerk SvelteKit] Session verified successfully.");
          event.locals.session = session;
        } else {
          debug && console.warn("[Clerk SvelteKit] Session verification returned no session.");
        }
      } catch (error2) {
        debug && console.log("[Clerk SvelteKit] Session verification failed.", error2?.reason ?? error2);
      }
    } else {
      debug && console.log("[Clerk SvelteKit] No session token found in cookies.");
    }
    if (!event.locals.session && protectedPaths.find((path) => typeof path === "string" ? event.url.pathname.startsWith(path) : path(event))) {
      debug && console.log("[Clerk SvelteKit] No session found, redirecting to login screen.");
      const fullSignInUrl = new URL(signInUrl, event.url.origin);
      return Response.redirect(fullSignInUrl.toString() + "?redirectUrl=" + event.url.pathname);
    }
    return resolve(event);
  };
}
var verifySession, handle;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
    init_esm();
    init_private();
    verifySession = async (secretKey, sessionToken) => {
      if (sessionToken) {
        const issuer = (issuer2) => issuer2.startsWith("https://clerk.") || issuer2.includes(".clerk.accounts");
        const claims = await verifyToken(sessionToken, {
          secretKey,
          issuer
        });
        return {
          userId: claims.sub,
          claims
        };
      }
    };
    Clerk({ secretKey: PRIVATE_CLERK_SECRET_KEY, apiKey: PRIVATE_AWS_API_KEY });
    handle = sequence(
      handleClerk(PRIVATE_CLERK_SECRET_KEY, {
        debug: true,
        protectedPaths: ["/admin"],
        signInUrl: "/login"
      })
    );
  }
});

// .svelte-kit/output/server/chunks/_page.server.js
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function redirect(status, location) {
  if (isNaN(status) || status < 300 || status > 308) {
    throw new Error("Invalid status code");
  }
  return new Redirect(status, location.toString());
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function fail(status, data) {
  return new ActionFailure(status, data);
}
var HttpError, Redirect, ActionFailure, encoder;
var init_page_server = __esm({
  ".svelte-kit/output/server/chunks/_page.server.js"() {
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
var escaped, DevalueError, object_proto_names;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      /**
       * @param {string} message
       * @param {string[]} keys
       */
      constructor(message, keys) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
      }
    };
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
      Object.prototype
    ).sort().join("\0");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify3(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify3(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify3(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify3).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify3(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify3(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify3(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify3(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify3(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify3(k)}, ${stringify3(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify3(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var chars, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_constants = __esm({
  "node_modules/devalue/src/constants.js"() {
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
  }
});

// node_modules/devalue/src/parse.js
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_constants();
  }
});

// node_modules/devalue/src/stringify.js
function stringify2(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index29 = p++;
    indexes.set(thing, index29);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index29] = `["${key2}",${flatten(value2)}]`;
        return index29;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index29] = str;
    return index29;
  }
  const index28 = flatten(value);
  if (index28 < 0)
    return `${index28}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_utils();
    init_constants();
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// .svelte-kit/output/server/chunks/index.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update2) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update2);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
var subscriber_queue;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie2 = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse5;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse5(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode2;
      var index28 = 0;
      while (index28 < str.length) {
        var eqIdx = str.indexOf("=", index28);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index28);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index28 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index28, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index28 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode2(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode3) {
      try {
        return decode3(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse5(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse5;
    module.exports.parse = parse5;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/fallbacks/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/layout.svelte.js"() {
    init_ssr();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.79aa421b.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js"];
    stylesheets = [];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/pages/_error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var css, Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_error.svelte.js"() {
    init_ssr();
    css = {
      code: ".container.svelte-b2m06j{margin-top:200px;z-index:1000}.main.svelte-b2m06j{height:100vh;background-image:url('https://assets.codepen.io/1538474/star.svg'),\n      linear-gradient(to bottom, #06033a, #4d007d);background-repeat:no-repeat;background-position:center;background-size:contain;margin:0;display:flex;flex-direction:column;justify-items:center;align-items:center;gap:2rem;background-attachment:fixed;overflow:hidden}.logo-404.svelte-b2m06j{position:absolute;margin-left:auto;margin-right:auto;left:0;right:0}.meteor.svelte-b2m06j{position:absolute;right:2vmin;top:16vmin}.astronaut.svelte-b2m06j{position:absolute;top:18vmin;left:10vmin;height:30vmin;animation:floating 3s infinite ease-in-out}p.svelte-b2m06j,a.svelte-b2m06j{color:white;font-family:'Space Grotesk'}a.svelte-b2m06j{color:#5cb971;text-decoration:none;font-size:1.5rem}",
      map: null
    };
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `<div class="main svelte-b2m06j" data-svelte-h="svelte-mbpcbw"><div class="mars"></div> <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404 svelte-b2m06j" alt="page not found"> <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor svelte-b2m06j" alt="page not found"> <img src="https://assets.codepen.io/1538474/astronaut.svg" class="astronaut svelte-b2m06j" alt="page not found"> <div class="container svelte-b2m06j"><p class="font-bungee svelte-b2m06j">Oh no!!</p> <p class=" svelte-b2m06j">You\u2019re either misspelling the URL <br> or requesting a page that&#39;s no longer here.</p> <div class="text-center"><a class="btn-back svelte-b2m06j" href="/">Back to Home page</a></div></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.8b256e2f.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/paths.a9b79461.js"];
    stylesheets2 = ["_app/immutable/assets/1.026b07ba.css"];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/chunks/Toaster.svelte_svelte_type_style_lang.js
function writableDerived(origins, derive, reflect, initial2) {
  var childDerivedSetter, originValues, blockNextDerive = false;
  var reflectOldValues = reflect.length >= 2;
  var wrappedDerive = (got, set, update3) => {
    childDerivedSetter = set;
    if (reflectOldValues) {
      originValues = got;
    }
    if (!blockNextDerive) {
      let returned = derive(got, set, update3);
      if (derive.length < 2) {
        set(returned);
      } else {
        return returned;
      }
    }
    blockNextDerive = false;
  };
  var childDerived = derived(origins, wrappedDerive, initial2);
  var singleOrigin = !Array.isArray(origins);
  function doReflect(reflecting) {
    var setWith = reflect(reflecting, originValues);
    if (singleOrigin) {
      blockNextDerive = true;
      origins.set(setWith);
    } else {
      setWith.forEach((value, i) => {
        blockNextDerive = true;
        origins[i].set(value);
      });
    }
    blockNextDerive = false;
  }
  var tryingSet = false;
  function update2(fn) {
    var isUpdated, mutatedBySubscriptions, oldValue, newValue;
    if (tryingSet) {
      newValue = fn(get_store_value(childDerived));
      childDerivedSetter(newValue);
      return;
    }
    var unsubscribe = childDerived.subscribe((value) => {
      if (!tryingSet) {
        oldValue = value;
      } else if (!isUpdated) {
        isUpdated = true;
      } else {
        mutatedBySubscriptions = true;
      }
    });
    newValue = fn(oldValue);
    tryingSet = true;
    childDerivedSetter(newValue);
    unsubscribe();
    tryingSet = false;
    if (mutatedBySubscriptions) {
      newValue = get_store_value(childDerived);
    }
    if (isUpdated) {
      doReflect(newValue);
    }
  }
  return {
    subscribe: childDerived.subscribe,
    set(value) {
      update2(() => value);
    },
    update: update2
  };
}
function update(toast2) {
  if (toast2.id) {
    clearFromRemoveQueue(toast2.id);
  }
  toasts.update(($toasts) => $toasts.map((t) => t.id === toast2.id ? { ...t, ...toast2 } : t));
}
function add(toast2) {
  toasts.update(($toasts) => [toast2, ...$toasts].slice(0, TOAST_LIMIT));
}
function upsert(toast2) {
  if (get_store_value(toasts).find((t) => t.id === toast2.id)) {
    update(toast2);
  } else {
    add(toast2);
  }
}
function dismiss(toastId) {
  toasts.update(($toasts) => {
    if (toastId) {
      addToRemoveQueue(toastId);
    } else {
      $toasts.forEach((toast2) => {
        addToRemoveQueue(toast2.id);
      });
    }
    return $toasts.map((t) => t.id === toastId || toastId === void 0 ? { ...t, visible: false } : t);
  });
}
function remove(toastId) {
  toasts.update(($toasts) => {
    if (toastId === void 0) {
      return [];
    }
    return $toasts.filter((t) => t.id !== toastId);
  });
}
function startPause(time) {
  pausedAt.set(time);
}
function endPause(time) {
  let diff;
  pausedAt.update(($pausedAt) => {
    diff = time - ($pausedAt || 0);
    return null;
  });
  toasts.update(($toasts) => $toasts.map((t) => ({
    ...t,
    pauseDuration: t.pauseDuration + diff
  })));
}
function useToasterStore(toastOptions = {}) {
  const mergedToasts = writableDerived(toasts, ($toasts) => $toasts.map((t) => ({
    ...toastOptions,
    ...toastOptions[t.type],
    ...t,
    duration: t.duration || toastOptions[t.type]?.duration || toastOptions?.duration || defaultTimeouts[t.type],
    style: [toastOptions.style, toastOptions[t.type]?.style, t.style].join(";")
  })), ($toasts) => $toasts);
  return {
    toasts: mergedToasts,
    pausedAt
  };
}
var TOAST_LIMIT, toasts, pausedAt, toastTimeouts, addToRemoveQueue, clearFromRemoveQueue, defaultTimeouts, isFunction, resolveValue, genId, prefersReducedMotion, createToast, createHandler, toast;
var init_Toaster_svelte_svelte_type_style_lang = __esm({
  ".svelte-kit/output/server/chunks/Toaster.svelte_svelte_type_style_lang.js"() {
    init_chunks();
    init_ssr();
    TOAST_LIMIT = 20;
    toasts = writable([]);
    pausedAt = writable(null);
    toastTimeouts = /* @__PURE__ */ new Map();
    addToRemoveQueue = (toastId) => {
      if (toastTimeouts.has(toastId)) {
        return;
      }
      const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        remove(toastId);
      }, 1e3);
      toastTimeouts.set(toastId, timeout);
    };
    clearFromRemoveQueue = (toastId) => {
      const timeout = toastTimeouts.get(toastId);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    defaultTimeouts = {
      blank: 4e3,
      error: 4e3,
      success: 2e3,
      loading: Infinity,
      custom: 4e3
    };
    isFunction = (valOrFunction) => typeof valOrFunction === "function";
    resolveValue = (valOrFunction, arg) => isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
    genId = (() => {
      let count = 0;
      return () => {
        count += 1;
        return count.toString();
      };
    })();
    prefersReducedMotion = (() => {
      let shouldReduceMotion;
      return () => {
        if (shouldReduceMotion === void 0 && typeof window !== "undefined") {
          const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
          shouldReduceMotion = !mediaQuery || mediaQuery.matches;
        }
        return shouldReduceMotion;
      };
    })();
    createToast = (message, type = "blank", opts) => ({
      createdAt: Date.now(),
      visible: true,
      type,
      ariaProps: {
        role: "status",
        "aria-live": "polite"
      },
      message,
      pauseDuration: 0,
      ...opts,
      id: opts?.id || genId()
    });
    createHandler = (type) => (message, options2) => {
      const toast2 = createToast(message, type, options2);
      upsert(toast2);
      return toast2.id;
    };
    toast = (message, opts) => createHandler("blank")(message, opts);
    toast.error = createHandler("error");
    toast.success = createHandler("success");
    toast.loading = createHandler("loading");
    toast.custom = createHandler("custom");
    toast.dismiss = (toastId) => {
      dismiss(toastId);
    };
    toast.remove = (toastId) => remove(toastId);
    toast.promise = (promise, msgs, opts) => {
      const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });
      promise.then((p) => {
        toast.success(resolveValue(msgs.success, p), {
          id,
          ...opts,
          ...opts?.success
        });
        return p;
      }).catch((e) => {
        toast.error(resolveValue(msgs.error, e), {
          id,
          ...opts,
          ...opts?.error
        });
      });
      return promise;
    };
  }
});

// .svelte-kit/output/server/chunks/Toaster.js
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
function useToaster(toastOptions) {
  const { toasts: toasts2, pausedAt: pausedAt2 } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt2.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts2.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts: toasts2, handlers };
}
var Close, Hamburger, handlers, css$7, CheckmarkIcon, css$6, ErrorIcon, css$5, LoaderIcon, css$4, ToastIcon, css$3, ToastMessage, css$2, ToastBar, css$1, ToastWrapper, css2, Toaster;
var init_Toaster = __esm({
  ".svelte-kit/output/server/chunks/Toaster.js"() {
    init_ssr();
    init_Toaster_svelte_svelte_type_style_lang();
    Close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#fff"></path></svg>`;
    });
    Hamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="30px" height="30px" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18v1H3zm0 8h18v-1H3zm0 7h18v-1H3z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>`;
    });
    handlers = {
      startPause() {
        startPause(Date.now());
      },
      endPause() {
        endPause(Date.now());
      },
      updateHeight: (toastId, height) => {
        update({ id: toastId, height });
      },
      calculateOffset
    };
    css$7 = {
      code: "div.svelte-11kvm4p{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #61d345);position:relative;transform:rotate(45deg);animation:svelte-11kvm4p-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation-delay:100ms}div.svelte-11kvm4p::after{content:'';box-sizing:border-box;animation:svelte-11kvm4p-checkmarkAnimation 0.2s ease-out forwards;opacity:0;animation-delay:200ms;position:absolute;border-right:2px solid;border-bottom:2px solid;border-color:var(--secondary, #fff);bottom:6px;left:6px;height:10px;width:6px}@keyframes svelte-11kvm4p-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-11kvm4p-checkmarkAnimation{0%{height:0;width:0;opacity:0}40%{height:0;width:6px;opacity:1}100%{opacity:1;height:10px}}",
      map: null
    };
    CheckmarkIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { primary = "#61d345" } = $$props;
      let { secondary = "#fff" } = $$props;
      if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
        $$bindings.primary(primary);
      if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
        $$bindings.secondary(secondary);
      $$result.css.add(css$7);
      return `  <div class="svelte-11kvm4p"${add_styles({
        "--primary": primary,
        "--secondary": secondary
      })}></div>`;
    });
    css$6 = {
      code: "div.svelte-1ee93ns{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #ff4b4b);position:relative;transform:rotate(45deg);animation:svelte-1ee93ns-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation-delay:100ms}div.svelte-1ee93ns::after,div.svelte-1ee93ns::before{content:'';animation:svelte-1ee93ns-firstLineAnimation 0.15s ease-out forwards;animation-delay:150ms;position:absolute;border-radius:3px;opacity:0;background:var(--secondary, #fff);bottom:9px;left:4px;height:2px;width:12px}div.svelte-1ee93ns:before{animation:svelte-1ee93ns-secondLineAnimation 0.15s ease-out forwards;animation-delay:180ms;transform:rotate(90deg)}@keyframes svelte-1ee93ns-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-1ee93ns-firstLineAnimation{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@keyframes svelte-1ee93ns-secondLineAnimation{from{transform:scale(0) rotate(90deg);opacity:0}to{transform:scale(1) rotate(90deg);opacity:1}}",
      map: null
    };
    ErrorIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { primary = "#ff4b4b" } = $$props;
      let { secondary = "#fff" } = $$props;
      if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
        $$bindings.primary(primary);
      if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
        $$bindings.secondary(secondary);
      $$result.css.add(css$6);
      return `  <div class="svelte-1ee93ns"${add_styles({
        "--primary": primary,
        "--secondary": secondary
      })}></div>`;
    });
    css$5 = {
      code: "div.svelte-1j7dflg{width:12px;height:12px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--secondary, #e0e0e0);border-right-color:var(--primary, #616161);animation:svelte-1j7dflg-rotate 1s linear infinite}@keyframes svelte-1j7dflg-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
      map: null
    };
    LoaderIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { primary = "#616161" } = $$props;
      let { secondary = "#e0e0e0" } = $$props;
      if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
        $$bindings.primary(primary);
      if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
        $$bindings.secondary(secondary);
      $$result.css.add(css$5);
      return `  <div class="svelte-1j7dflg"${add_styles({
        "--primary": primary,
        "--secondary": secondary
      })}></div>`;
    });
    css$4 = {
      code: ".indicator.svelte-1kgeier{position:relative;display:flex;justify-content:center;align-items:center;min-width:20px;min-height:20px}.status.svelte-1kgeier{position:absolute}.animated.svelte-1kgeier{position:relative;transform:scale(0.6);opacity:0.4;min-width:20px;animation:svelte-1kgeier-enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards}@keyframes svelte-1kgeier-enter{from{transform:scale(0.6);opacity:0.4}to{transform:scale(1);opacity:1}}",
      map: null
    };
    ToastIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let type;
      let icon;
      let iconTheme;
      let { toast: toast2 } = $$props;
      if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
        $$bindings.toast(toast2);
      $$result.css.add(css$4);
      ({ type, icon, iconTheme } = toast2);
      return `${typeof icon === "string" ? `<div class="animated svelte-1kgeier">${escape(icon)}</div>` : `${typeof icon !== "undefined" ? `${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${type !== "blank" ? `<div class="indicator svelte-1kgeier">${validate_component(LoaderIcon, "LoaderIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})} ${type !== "loading" ? `<div class="status svelte-1kgeier">${type === "error" ? `${validate_component(ErrorIcon, "ErrorIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})}` : `${validate_component(CheckmarkIcon, "CheckmarkIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})}`}</div>` : ``}</div>` : ``}`}`}`;
    });
    css$3 = {
      code: ".message.svelte-1nauejd{display:flex;justify-content:center;margin:4px 10px;color:inherit;flex:1 1 auto;white-space:pre-line}",
      map: null
    };
    ToastMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { toast: toast2 } = $$props;
      if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
        $$bindings.toast(toast2);
      $$result.css.add(css$3);
      return `<div${spread([{ class: "message" }, escape_object(toast2.ariaProps)], { classes: "svelte-1nauejd" })}>${typeof toast2.message === "string" ? `${escape(toast2.message)}` : `${validate_component(toast2.message || missing_component, "svelte:component").$$render($$result, { toast: toast2 }, {}, {})}`} </div>`;
    });
    css$2 = {
      code: "@keyframes svelte-ug60r4-enterAnimation{0%{transform:translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);opacity:0.5}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes svelte-ug60r4-exitAnimation{0%{transform:translate3d(0, 0, -1px) scale(1);opacity:1}100%{transform:translate3d(0, calc(var(--factor) * -150%), -1px) scale(0.6);opacity:0}}@keyframes svelte-ug60r4-fadeInAnimation{0%{opacity:0}100%{opacity:1}}@keyframes svelte-ug60r4-fadeOutAnimation{0%{opacity:1}100%{opacity:0}}.base.svelte-ug60r4{display:flex;align-items:center;background:#fff;color:#363636;line-height:1.3;will-change:transform;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);max-width:350px;pointer-events:auto;padding:8px 10px;border-radius:8px}.transparent.svelte-ug60r4{opacity:0}.enter.svelte-ug60r4{animation:svelte-ug60r4-enterAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.exit.svelte-ug60r4{animation:svelte-ug60r4-exitAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}.fadeIn.svelte-ug60r4{animation:svelte-ug60r4-fadeInAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.fadeOut.svelte-ug60r4{animation:svelte-ug60r4-fadeOutAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}",
      map: null
    };
    ToastBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { toast: toast2 } = $$props;
      let { position = void 0 } = $$props;
      let { style = "" } = $$props;
      let { Component = void 0 } = $$props;
      let factor;
      let animation;
      if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
        $$bindings.toast(toast2);
      if ($$props.position === void 0 && $$bindings.position && position !== void 0)
        $$bindings.position(position);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0)
        $$bindings.style(style);
      if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0)
        $$bindings.Component(Component);
      $$result.css.add(css$2);
      {
        {
          const top = (toast2.position || position || "top-center").includes("top");
          factor = top ? 1 : -1;
          const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
          animation = toast2.visible ? enter : exit;
        }
      }
      return `<div class="${"base " + escape(toast2.height ? animation : "transparent", true) + " " + escape(toast2.className || "", true) + " svelte-ug60r4"}"${add_styles(merge_ssr_styles(escape(style, true) + "; " + escape(toast2.style, true), { "--factor": factor }))}>${Component ? `${validate_component(Component || missing_component, "svelte:component").$$render($$result, {}, {}, {
        message: () => {
          return `${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2, slot: "message" }, {}, {})}`;
        },
        icon: () => {
          return `${validate_component(ToastIcon, "ToastIcon").$$render($$result, { toast: toast2, slot: "icon" }, {}, {})}`;
        }
      })}` : `${slots.default ? slots.default({ ToastIcon, ToastMessage, toast: toast2 }) : ` ${validate_component(ToastIcon, "ToastIcon").$$render($$result, { toast: toast2 }, {}, {})} ${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})} `}`} </div>`;
    });
    css$1 = {
      code: ".wrapper.svelte-v01oml{left:0;right:0;display:flex;position:absolute;transform:translateY(calc(var(--offset, 16px) * var(--factor) * 1px))}.transition.svelte-v01oml{transition:all 230ms cubic-bezier(0.21, 1.02, 0.73, 1)}.active.svelte-v01oml{z-index:9999}.active.svelte-v01oml>*{pointer-events:auto}",
      map: null
    };
    ToastWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let top;
      let bottom;
      let factor;
      let justifyContent;
      let { toast: toast2 } = $$props;
      let { setHeight } = $$props;
      let wrapperEl;
      if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
        $$bindings.toast(toast2);
      if ($$props.setHeight === void 0 && $$bindings.setHeight && setHeight !== void 0)
        $$bindings.setHeight(setHeight);
      $$result.css.add(css$1);
      top = toast2.position?.includes("top") ? 0 : null;
      bottom = toast2.position?.includes("bottom") ? 0 : null;
      factor = toast2.position?.includes("top") ? 1 : -1;
      justifyContent = toast2.position?.includes("center") && "center" || (toast2.position?.includes("right") || toast2.position?.includes("end")) && "flex-end" || null;
      return `<div class="${[
        "wrapper svelte-v01oml",
        (toast2.visible ? "active" : "") + " " + (!prefersReducedMotion() ? "transition" : "")
      ].join(" ").trim()}"${add_styles({
        "--factor": factor,
        "--offset": toast2.offset,
        top,
        bottom,
        "justify-content": justifyContent
      })}${add_attribute("this", wrapperEl, 0)}>${toast2.type === "custom" ? `${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})}` : `${slots.default ? slots.default({ toast: toast2 }) : ` ${validate_component(ToastBar, "ToastBar").$$render($$result, { toast: toast2, position: toast2.position }, {}, {})} `}`} </div>`;
    });
    css2 = {
      code: ".toaster.svelte-1phplh9{--default-offset:16px;position:fixed;z-index:9999;top:var(--default-offset);left:var(--default-offset);right:var(--default-offset);bottom:var(--default-offset);pointer-events:none}",
      map: null
    };
    Toaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $toasts, $$unsubscribe_toasts;
      let { reverseOrder = false } = $$props;
      let { position = "top-center" } = $$props;
      let { toastOptions = void 0 } = $$props;
      let { gutter = 8 } = $$props;
      let { containerStyle = void 0 } = $$props;
      let { containerClassName = void 0 } = $$props;
      const { toasts: toasts2, handlers: handlers2 } = useToaster(toastOptions);
      $$unsubscribe_toasts = subscribe(toasts2, (value) => $toasts = value);
      let _toasts;
      if ($$props.reverseOrder === void 0 && $$bindings.reverseOrder && reverseOrder !== void 0)
        $$bindings.reverseOrder(reverseOrder);
      if ($$props.position === void 0 && $$bindings.position && position !== void 0)
        $$bindings.position(position);
      if ($$props.toastOptions === void 0 && $$bindings.toastOptions && toastOptions !== void 0)
        $$bindings.toastOptions(toastOptions);
      if ($$props.gutter === void 0 && $$bindings.gutter && gutter !== void 0)
        $$bindings.gutter(gutter);
      if ($$props.containerStyle === void 0 && $$bindings.containerStyle && containerStyle !== void 0)
        $$bindings.containerStyle(containerStyle);
      if ($$props.containerClassName === void 0 && $$bindings.containerClassName && containerClassName !== void 0)
        $$bindings.containerClassName(containerClassName);
      $$result.css.add(css2);
      _toasts = $toasts.map((toast2) => ({
        ...toast2,
        position: toast2.position || position,
        offset: handlers2.calculateOffset(toast2, $toasts, {
          reverseOrder,
          gutter,
          defaultPosition: position
        })
      }));
      $$unsubscribe_toasts();
      return `<div class="${"toaster " + escape(containerClassName || "", true) + " svelte-1phplh9"}"${add_attribute("style", containerStyle, 0)} role="alert">${each(_toasts, (toast2) => {
        return `${validate_component(ToastWrapper, "ToastWrapper").$$render(
          $$result,
          {
            toast: toast2,
            setHeight: (height) => handlers2.updateHeight(toast2.id, height)
          },
          {},
          {}
        )}`;
      })} </div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/navigation.js
function client_method(key2) {
  {
    if (key2 === "before_navigate" || key2 === "after_navigate" || key2 === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key2] ?? key2}(...) on the server`);
      };
    }
  }
}
var goto, afterNavigate;
var init_navigation = __esm({
  ".svelte-kit/output/server/chunks/navigation.js"() {
    goto = /* @__PURE__ */ client_method("goto");
    afterNavigate = /* @__PURE__ */ client_method("after_navigate");
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/chunks/Whitelogo.js
var Whitelogo;
var init_Whitelogo = __esm({
  ".svelte-kit/output/server/chunks/Whitelogo.js"() {
    init_ssr();
    Whitelogo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="556" height="188" viewBox="0 0 556 188" fill="" xmlns="http://www.w3.org/2000/svg" class="h-[40px] w-[130px]"><path d="M107.355 49.7018C114.201 49.8895 120.837 47.3497 125.817 42.6567C128.236 40.4151 130.146 37.6766 131.427 34.651C132.719 31.6143 133.348 28.3458 133.282 25.0441C133.359 21.7093 132.73 18.3966 131.449 15.3158C130.157 12.235 128.247 9.46332 125.817 7.17755C120.782 2.56183 114.201 0 107.377 0C100.553 0 93.9602 2.56183 88.9359 7.17755C86.5066 9.46332 84.5852 12.235 83.3043 15.3158C82.0124 18.3966 81.394 21.7093 81.4713 25.0441C81.405 28.3458 82.0345 31.6143 83.3264 34.651C84.6184 37.6876 86.5287 40.4151 88.9359 42.6567C93.905 47.3497 100.53 49.8784 107.355 49.7018Z" fill="#ffffff"></path><path d="M0 117.348H41.9169L17.9218 163.703H80.2891L131.04 65.7686H26.7557L0 117.348Z" fill="#ffffff"></path><path d="M39.3112 122.781L41.608 117.348H104.185L38.4609 124.028" fill="#ffffff" fill-opacity="0.6"></path><path d="M243.986 36.7212C246.582 36.791 249.099 35.8301 250.988 34.0489C251.904 33.1973 252.629 32.162 253.118 31.0108C253.606 29.8595 253.845 28.6182 253.821 27.368C253.85 26.1033 253.613 24.8465 253.125 23.6794C252.637 22.5123 251.909 21.4609 250.988 20.5935C249.08 18.8414 246.584 17.8691 243.993 17.8691C241.403 17.8691 238.906 18.8414 236.998 20.5935C236.077 21.4609 235.349 22.5123 234.861 23.6794C234.373 24.8465 234.136 26.1033 234.166 27.368C234.141 28.6182 234.381 29.8595 234.869 31.0108C235.357 32.162 236.083 33.1973 236.998 34.0489C238.883 35.8281 241.395 36.7889 243.986 36.7212Z" fill="#ffffff"></path><path d="M252.324 42.8139H213.762V36.3067C213.756 35.8988 213.834 35.4941 213.99 35.1172C214.146 34.7404 214.378 34.3995 214.671 34.1154C214.954 33.8213 215.295 33.5889 215.672 33.4325C216.049 33.2762 216.454 33.1993 216.862 33.2068H226.696V19.6445H213.228C208.239 19.6445 204.324 21.0653 201.483 23.907C198.637 26.753 197.207 30.6814 197.207 35.6654V42.8139H188.027V56.3762H197.207V97.6108H213.762V56.3762H235.662V73.9604H252.324V42.8139Z" fill="#ffffff"></path><path d="M252.311 97.611H252.324V85.5586H235.662V85.9461H252.311V97.611Z" fill="#ffffff"></path><path d="M268.453 47.1967C265.611 50.0383 264.186 53.9533 264.177 58.9417V97.6109H280.692V60.0107C280.669 59.5147 280.752 59.0196 280.937 58.5586C281.121 58.0976 281.402 57.6815 281.761 57.3383C282.449 56.6745 283.371 56.3095 284.326 56.3228H296.178V42.9209H280.304C275.218 42.9209 271.267 44.3461 268.453 47.1967Z" fill="#ffffff"></path><path d="M310.796 75.3371C313.875 76.5499 317.161 77.149 320.47 77.1009H330.131C330.803 77.0916 331.466 77.2574 332.055 77.5819C332.605 77.908 333.065 78.3675 333.391 78.9181C333.75 79.4949 333.936 80.1628 333.926 80.8422C333.924 81.4865 333.739 82.117 333.391 82.6594C333.061 83.2072 332.603 83.666 332.055 83.9956C331.464 84.3145 330.802 84.48 330.131 84.4766H303.701V97.6113H332.429C335.593 97.6556 338.709 96.843 341.448 95.2596C344.085 93.7336 346.292 91.5636 347.862 88.9528C349.465 86.3173 350.299 83.2855 350.267 80.2008C350.415 76.7269 349.582 73.2816 347.862 70.2596C346.293 67.7252 343.951 65.7624 341.181 64.661C337.893 63.4124 334.395 62.8134 330.879 62.8972H321.526C321.061 62.9044 320.599 62.8181 320.167 62.6434C319.736 62.4687 319.344 62.2091 319.015 61.8801C318.686 61.5511 318.427 61.1594 318.252 60.7281C318.077 60.2969 317.991 59.8349 317.998 59.3697C317.99 58.928 318.077 58.4896 318.252 58.0841C318.427 57.6785 318.687 57.315 319.014 57.018C319.348 56.6993 319.742 56.4502 320.173 56.285C320.605 56.1199 321.064 56.042 321.526 56.056H345.337V42.8144H318.867C315.786 42.7827 312.754 43.5812 310.088 45.126C307.495 46.6205 305.328 48.7552 303.795 51.3259C302.255 53.9051 301.459 56.8604 301.496 59.8641C301.335 63.3319 302.21 66.7693 304.008 69.7385C305.636 72.2628 308.008 74.2191 310.796 75.3371Z" fill="#ffffff"></path><path d="M379.209 42.8145H362.547V56.3767H379.209V42.8145Z" fill="#ffffff"></path><path d="M394.268 42.8145H379.209V56.3767H394.268V42.8145Z" fill="#ffffff"></path><path d="M362.533 42.8145H353.567V56.3767H362.533V42.8145Z" fill="#ffffff"></path><path d="M379.209 29.4658H362.547V42.8143H379.209V29.4658Z" fill="#ffffff"></path><path d="M362.546 81.5897C362.434 83.7262 362.754 85.8633 363.489 87.8726C364.224 89.8819 365.358 91.7217 366.822 93.2814C369.664 96.1675 373.614 97.6106 378.674 97.6106H394.267V83.7276H382.242C381.834 83.7335 381.429 83.656 381.052 83.4997C380.675 83.3435 380.334 83.1118 380.05 82.819C379.756 82.5359 379.524 82.1952 379.368 81.8181C379.211 81.4411 379.134 81.0358 379.142 80.6277V56.376H362.546V81.5897Z" fill="#ffffff"></path><path d="M216.702 130.962C213.41 129.713 209.907 129.114 206.387 129.198H197.034C196.568 129.205 196.106 129.119 195.675 128.944C195.244 128.769 194.852 128.51 194.523 128.181C194.194 127.852 193.935 127.46 193.76 127.029C193.585 126.597 193.499 126.136 193.506 125.67C193.498 125.229 193.584 124.79 193.759 124.385C193.935 123.979 194.194 123.616 194.522 123.319C194.857 123.001 195.251 122.753 195.682 122.588C196.113 122.423 196.572 122.344 197.034 122.357H220.844V109.115H194.428C191.334 109.087 188.29 109.899 185.623 111.467C183.026 112.956 180.854 115.086 179.316 117.653C177.777 120.238 176.982 123.197 177.017 126.205C176.863 129.672 177.737 133.107 179.53 136.079C181.18 138.595 183.57 140.537 186.371 141.638C189.445 142.851 192.727 143.45 196.031 143.401H205.639C206.311 143.391 206.974 143.557 207.563 143.882C208.113 144.208 208.573 144.668 208.899 145.219C209.261 145.794 209.447 146.463 209.433 147.143C209.432 147.787 209.246 148.418 208.899 148.96C208.574 149.512 208.114 149.971 207.563 150.296C206.974 150.622 206.311 150.788 205.639 150.777H179.262V163.912H207.99C211.159 163.967 214.283 163.153 217.023 161.56C219.652 160.035 221.854 157.87 223.423 155.267C225.027 152.631 225.86 149.599 225.828 146.515C225.976 143.041 225.143 139.596 223.423 136.574C221.845 134.029 219.488 132.061 216.702 130.962Z" fill="#ffffff"></path><path d="M279.716 111.039C275.879 108.802 271.489 107.691 267.049 107.833C264.444 107.838 261.854 108.235 259.366 109.008C256.798 109.796 254.404 111.066 252.311 112.75V97.6108H235.662V85.9326V163.899H252.324V132.726C252.292 130.844 252.792 128.991 253.767 127.381C254.741 125.806 256.102 124.508 257.721 123.609C259.34 122.711 261.162 122.243 263.014 122.25C264.873 122.231 266.701 122.731 268.292 123.693C269.875 124.635 271.198 125.958 272.14 127.541C273.118 129.204 273.617 131.104 273.583 133.033V163.899H290.138V132.392C290.198 128.045 289.285 123.74 287.466 119.792C285.802 116.174 283.106 113.129 279.716 111.039Z" fill="#ffffff"></path><path d="M252.311 85.9463H235.662V97.6112H252.311V85.9463Z" fill="#ffffff"></path><path d="M319.174 109.115H302.512V163.899H319.174V109.115Z" fill="#ffffff"></path><path d="M381.347 116.224C378.773 113.516 375.641 111.4 372.168 110.024C368.232 108.504 364.04 107.76 359.821 107.832C354.428 107.709 349.094 108.979 344.335 111.52C340.021 113.909 336.483 117.484 334.14 121.822C331.618 126.663 330.367 132.066 330.505 137.523V187.082H347.061V157.926H347.381C348.445 159.51 349.806 160.871 351.39 161.935C353.036 163.018 354.839 163.842 356.735 164.38C358.763 164.963 360.864 165.251 362.975 165.235C367.768 165.345 372.498 164.129 376.644 161.721C380.559 159.369 383.757 155.991 385.89 151.953C388.198 147.518 389.356 142.575 389.257 137.576C389.304 133.517 388.616 129.484 387.226 125.671C385.929 122.155 383.929 118.94 381.347 116.224ZM370.778 143.722C369.818 145.77 368.322 147.52 366.449 148.787C364.467 150.081 362.134 150.734 359.768 150.657C357.403 150.721 355.075 150.069 353.087 148.787C351.196 147.54 349.695 145.784 348.758 143.722C347.727 141.44 347.216 138.957 347.261 136.453C347.22 133.937 347.731 131.442 348.758 129.145C349.684 127.058 351.186 125.278 353.087 124.014C355.077 122.738 357.404 122.086 359.768 122.143C362.133 122.072 364.464 122.725 366.449 124.014C368.333 125.296 369.831 127.071 370.778 129.145C371.835 131.434 372.365 133.932 372.328 136.453C372.369 138.963 371.839 141.448 370.778 143.722Z" fill="#ffffff"></path><path d="M446.98 116.224C444.401 113.516 441.264 111.4 437.787 110.024C433.856 108.504 429.668 107.76 425.454 107.833C420.06 107.707 414.726 108.977 409.968 111.521C405.634 113.901 402.076 117.477 399.719 121.823C397.197 126.664 395.946 132.066 396.085 137.523V187.082H412.64V157.926H412.974C414.037 159.51 415.399 160.871 416.982 161.935C418.63 163.017 420.432 163.841 422.327 164.38C424.36 164.962 426.466 165.25 428.581 165.235C433.374 165.345 438.104 164.129 442.25 161.721C446.164 159.373 449.358 155.994 451.483 151.954C453.791 147.518 454.949 142.575 454.85 137.576C454.897 133.518 454.209 129.484 452.819 125.671C451.534 122.158 449.548 118.944 446.98 116.224ZM436.397 143.723C435.441 145.773 433.945 147.524 432.068 148.787C430.107 150.073 427.798 150.726 425.454 150.657C423.089 150.722 420.76 150.07 418.773 148.787C416.876 147.547 415.374 145.789 414.444 143.723C413.413 141.44 412.902 138.958 412.947 136.454C412.906 133.937 413.417 131.443 414.444 129.145C415.365 127.011 416.906 125.203 418.867 123.955C420.827 122.707 423.117 122.076 425.441 122.143C427.784 122.082 430.091 122.734 432.055 124.014C433.943 125.293 435.441 127.068 436.384 129.145C437.441 131.434 437.971 133.932 437.934 136.454C437.979 138.962 437.454 141.447 436.397 143.723Z" fill="#ffffff"></path><path d="M502.365 111.467C497.981 108.915 492.964 107.655 487.894 107.833C483.062 107.781 478.299 108.978 474.065 111.307C469.896 113.623 466.444 117.038 464.084 121.181C461.481 125.88 460.189 131.192 460.342 136.561C460.236 141.589 461.586 146.54 464.23 150.818C466.91 154.987 470.706 158.321 475.187 160.439C480.295 162.837 485.888 164.021 491.529 163.899H507.763V150.23H490.994C488.892 150.261 486.799 149.954 484.794 149.321C483.051 148.779 481.471 147.81 480.198 146.502C478.975 145.183 478.13 143.558 477.753 141.799H513.629C513.808 140.827 513.933 139.845 514.003 138.859C514.11 137.617 514.164 136.534 514.164 135.599C514.263 130.665 513.244 125.773 511.184 121.288C509.254 117.232 506.191 113.822 502.365 111.467ZM477.325 131.51C477.541 130.217 477.876 128.947 478.327 127.715C478.781 126.501 479.451 125.378 480.305 124.402C481.198 123.416 482.291 122.633 483.512 122.103C486.014 121.086 488.792 120.973 491.368 121.783C492.329 122.122 493.23 122.609 494.041 123.226C494.823 123.843 495.519 124.562 496.112 125.364C496.739 126.211 497.193 127.174 497.448 128.196C497.746 129.283 497.961 130.391 498.089 131.51H477.325Z" fill="#ffffff"></path><path d="M539.483 109.263C534.419 109.263 530.477 110.692 527.618 113.538C524.758 116.385 523.355 120.3 523.355 125.284V163.939H539.911V126.312C539.884 125.816 539.966 125.32 540.15 124.858C540.335 124.397 540.618 123.981 540.98 123.64C541.318 123.308 541.719 123.048 542.16 122.873C542.6 122.699 543.071 122.614 543.545 122.625H555.397V109.263H539.483Z" fill="#ffffff"></path></svg>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var css3, DashNav, Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/_layout.svelte.js"() {
    init_ssr();
    init_Toaster();
    init_navigation();
    init_stores();
    init_Whitelogo();
    init_Toaster_svelte_svelte_type_style_lang();
    css3 = {
      code: "@keyframes svelte-j2umxr-slideInFromRight{0%{transform:translateX(0px);opacity:0}100%{transform:translateX(-300px);opacity:1}}.fixed.svelte-j2umxr.svelte-j2umxr{position:fixed}ul.svelte-j2umxr.svelte-j2umxr{min-height:100vh}ul.svelte-j2umxr li.svelte-j2umxr{width:100% !important;display:flex;justify-content:center;opacity:0.8}ul.svelte-j2umxr li a span.svelte-j2umxr{color:white !important;text-align:center;font-family:'bungee' !important;width:100%}li.svelte-j2umxr.svelte-j2umxr:hover{background-color:#008080}.activeText.svelte-j2umxr.svelte-j2umxr{color:#f4be1c !important}",
      map: null
    };
    DashNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let drawer_open = false;
      afterNavigate(() => {
        drawer_open = false;
      });
      $$result.css.add(css3);
      $$unsubscribe_page();
      return `<div class="relative"><header class="fixed top-0 left-0 z-[10000] w-full bg-primary svelte-j2umxr"><nav class="relative mx-auto flex h-[60px] w-full max-w-[80rem] items-center justify-between px-2"><a href="/admin">${validate_component(Whitelogo, "Whitelogo").$$render($$result, {}, {}, {})}</a> <button class="p-2 sm:hidden">${drawer_open ? `${validate_component(Close, "Close").$$render($$result, {}, {}, {})}` : `${validate_component(Hamburger, "Hamburger").$$render($$result, {}, {}, {})}`}</button> ${drawer_open ? `<div class="absolute bg-primary left-0 top-[60px] flex flex-col items-center w-full lg:hidden"><ul class="pt-8 bg-neutral w-full flex flex-col svelte-j2umxr"><li class="py-2 svelte-j2umxr"><a href="/admin" class="flex items-center gap-2"><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-a7pc7t">Home</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/admin/quote" class="flex items-center gap-2" data-sveltekit-reload><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin/quote" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-1666v0l">Quote</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/admin/track" class="flex items-center gap-2"><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin/track" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-19sae9n">Track</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/admin/settings" class="flex items-center gap-2"><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin/settings" ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-ersije">Settings</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/admin/documents" class="flex items-center gap-2"><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin/documents" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-1fbcv4x">Documents</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/admin/claims" class="flex items-center gap-2"><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin/claims" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-duuekx">Claims</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/admin/settings" class="flex items-center gap-2"><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin/settings" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-hjgilg">Customer</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/admin/feedback" class="flex items-center gap-2"><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "/admin/feedback" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-13ngqnx">Feedback</span></a></li> <li class="py-2 svelte-j2umxr"><a href="/logout" class="flex items-center gap-2" data-sveltekit-reload><span class="${[
        "font-bold svelte-j2umxr",
        $page.url.pathname == "logout" ? "activeText" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-1dtnpug">logout</span></a></li></ul></div>` : ``}</nav></header> </div>`;
    });
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      afterNavigate(() => {
        let toggleInput = document.getElementById("toggle-input");
        if (toggleInput?.checked) {
          toggleInput.checked = false;
        }
      });
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-5q1asl_START --><!-- HEAD_svelte-5q1asl_END -->`, ""} ${validate_component(Toaster, "Toaster").$$render($$result, { containerStyle: "margin-top:60px;" }, {}, {})}  <div class="w-full">${validate_component(DashNav, "DashNav").$$render($$result, {}, {}, {})} ${``}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default);
    imports3 = ["_app/immutable/nodes/2.5b15e2e8.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/Toaster.0200bc64.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/stores.7ed2130f.js", "_app/immutable/chunks/Whitelogo.83427055.js", "_app/immutable/chunks/index.fc8250e2.js", "_app/immutable/chunks/Feedback.71be6ba8.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js"];
    stylesheets3 = ["_app/immutable/assets/2.e36e1169.css", "_app/immutable/assets/Toaster.cb20041a.css", "_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/track/_layout.ts.js
var layout_ts_exports = {};
__export(layout_ts_exports, {
  prerender: () => prerender
});
var prerender;
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/track/_layout.ts.js"() {
    prerender = false;
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4,
  universal: () => layout_ts_exports,
  universal_id: () => universal_id
});
var index4, component_cache4, component4, universal_id, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_layout_ts();
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    universal_id = "src/routes/(admin)/admin/track/+layout.ts";
    imports4 = ["_app/immutable/nodes/3.18cf2c56.js", "_app/immutable/nodes/0.79aa421b.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(bol)/_layout.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => Layout3
});
var Layout3;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/(bol)/_layout.svelte.js"() {
    init_ssr();
    Layout3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-1c48p06_START --><script src="https://cdn.tailwindcss.com" data-svelte-h="svelte-1g08bst"><\/script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Oswald&family=Oxygen&family=Space+Mono&family=Trispace&display=swap" rel="stylesheet"><style data-svelte-h="svelte-1bne9iq">* {
      font-family: 'roboto', 'Space Mono', 'Oswald', 'Oxygen', 'sans-serif';
      font-weight: 600;
      font-size: 10px;
      background-color: #fff;
    }
    input[type='checkbox'] {
      height: 20px;
      width: 20px;
    }
    input {
      background-color: white;
      border: 1px solid gray;
    }
    div.notice {
      font-size: 10px;
    }
    label > input[type='checkbox'] {
      margin-right: 5px;
    }

    .note {
      font-size: 10px;
    }
    .mainPrint {
      width: 200mm !important;
      min-height: 287mm !important;
      max-height: 287mm !important;
      max-width: 200mm !important;
    }

    .notices h3 {
      font-size: 8px !important;
      font-weight: 400;
    }
    th {
      height: '40';
      font-size: 10px;
      font-weight: 600;
      text-align: center;
      border-collapse: collapse;
      border-width: 1px;
    }
    td {
      font-family: Roboto;
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      border-collapse: collapse;
      border-width: 1px;
    }
    td.total {
      font-size: 10px;
      font-weight: bold;
      text-align: center;
    }
    h4{
      text-transform: capitalize;
    }</style><!-- HEAD_svelte-1c48p06_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_layout_svelte3(), layout_svelte_exports3))).default);
    imports5 = ["_app/immutable/nodes/4.7bfc5cc5.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(public)/_layout.ts.js
var layout_ts_exports2 = {};
__export(layout_ts_exports2, {
  csr: () => csr,
  prerender: () => prerender2,
  ssr: () => ssr
});
var ssr, csr, prerender2;
var init_layout_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/_layout.ts.js"() {
    ssr = true;
    csr = true;
    prerender2 = true;
  }
});

// .svelte-kit/output/server/chunks/config2.js
function getBackEndUrl() {
  {
    return PUBLIC_BACKEND_DEV_URL;
  }
}
function isEnvDev() {
  return getEnv() == 0;
}
function getEnv() {
  {
    return 0;
  }
}
var PUBLIC_BACKEND_DEV_URL;
var init_config2 = __esm({
  ".svelte-kit/output/server/chunks/config2.js"() {
    PUBLIC_BACKEND_DEV_URL = "http://127.0.0.1:8090";
  }
});

// .svelte-kit/output/server/chunks/basic_store.js
function getNewContact() {
  if (isEnvDev()) {
    return {
      name: "surendra kandel",
      phoneNumber: "7135162836",
      emailAddress: "kandelsuren@gmail.com",
      phoneNumberDisplay: "",
      roles: [],
      prefferedContactMethod: "",
      businessId: "",
      type: ""
    };
  }
  const contact = {
    name: "",
    phoneNumber: "",
    emailAddress: "",
    phoneNumberDisplay: "",
    roles: [],
    prefferedContactMethod: "",
    businessId: "",
    type: ""
  };
  return contact;
}
function getNewAddress() {
  if (isEnvDev()) {
    return {
      addressLine1: "",
      addressLine2: "",
      streetName: "",
      city: "",
      county: "",
      zipCode: "90013",
      state: "",
      stateCode: "",
      extendedZipCode: "",
      country: "",
      countryCode: "",
      freeFormAddress: "",
      localName: "",
      lat: 0,
      long: 0,
      businessId: "",
      type: ""
    };
  } else {
    return {
      addressLine1: "",
      addressLine2: "",
      streetName: "",
      city: "",
      county: "",
      zipCode: "",
      state: "",
      stateCode: "",
      extendedZipCode: "",
      country: "",
      countryCode: "",
      freeFormAddress: "",
      localName: "",
      lat: 0,
      long: 0,
      businessId: "",
      type: ""
    };
  }
}
function getNewBusinessHours() {
  const newHours = {
    start: "",
    end: ""
  };
  return newHours;
}
function getNewLocation() {
  if (isEnvDev()) {
    return {
      id: "",
      companyName: "ramsford",
      address: getNewAddress(),
      contact: getNewContact(),
      businessHours: getNewBusinessHours(),
      businessId: "",
      type: "",
      instructions: "instructions",
      openTime: "",
      closeTime: "",
      appointmentTime: "",
      isAppointmentRequired: false,
      locationType: 1,
      locationServices: [0]
    };
  }
  const loc = {
    id: "",
    companyName: "",
    address: getNewAddress(),
    contact: getNewContact(),
    businessHours: getNewBusinessHours(),
    businessId: "",
    type: "",
    instructions: "",
    openTime: "",
    closeTime: "",
    appointmentTime: "",
    isAppointmentRequired: false,
    locationType: 0,
    locationServices: []
  };
  return loc;
}
function initBasicProvider() {
  let basicStore2 = writable(basicInfo);
  {
    const getBasicStore2 = () => {
      return basicInfo;
    };
    const updateBasicStore2 = (value) => {
      basicInfo = value;
    };
    const resetBasicStore2 = () => {
      basicInfo = {
        token: "",
        business: void 0,
        user: newUser(),
        users: [],
        valid: false,
        clientAddresses: [],
        businessAddress: getNewLocation(),
        defaultPickupLocation: getNewLocation(),
        defaultDeliveryLocation: getNewLocation(),
        bookings: [],
        quotes: [],
        shipments: []
      };
    };
    return { basicStore: basicStore2, updateBasicStore: updateBasicStore2, resetBasicStore: resetBasicStore2, getBasicStore: getBasicStore2 };
  }
}
function newUser() {
  const user = {
    name: "",
    userName: "",
    password: "",
    confirmPassword: "",
    origin: "",
    emailVisibility: false,
    type: "",
    id: "",
    created: "",
    updated: "",
    verified: false,
    avatar: "",
    lastResetSentAt: "",
    lastVerificationSentAt: "",
    passwordHash: "",
    tokenKey: "",
    token: "",
    email: "",
    phoneNumber: "",
    organizationId: "",
    emailConfirmed: false
  };
  return user;
}
var basicInfo, basicStore, updateBasicStore, resetBasicStore, getBasicStore;
var init_basic_store = __esm({
  ".svelte-kit/output/server/chunks/basic_store.js"() {
    init_chunks();
    init_config2();
    basicInfo = {
      token: "",
      business: void 0,
      user: newUser(),
      users: [],
      valid: false,
      clientAddresses: [],
      businessAddress: getNewLocation(),
      defaultPickupLocation: getNewLocation(),
      defaultDeliveryLocation: getNewLocation(),
      bookings: [],
      quotes: [],
      shipments: []
    };
    ({ basicStore, updateBasicStore, resetBasicStore, getBasicStore } = initBasicProvider());
  }
});

// .svelte-kit/output/server/chunks/freight_class.js
function isWeekday(date) {
  const day = date.getDay();
  return day != 6 && day != 0;
}
function getNextPickupDate() {
  let date = /* @__PURE__ */ new Date();
  const currentTime = date.getHours();
  if (currentTime >= 16) {
    date.setDate(date.getDate() + 1);
  }
  while (!isWeekday(date)) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}
function newShipmentInfo() {
  if (isEnvDev()) {
    let pickupDate = getNextPickupDate();
    let year = pickupDate.getFullYear();
    let month = pickupDate.getMonth() + 1;
    let strMonth = month.toString();
    let day = pickupDate.getDate();
    let strDay = day.toString();
    if (month < 10) {
      strMonth = "0" + month;
    }
    if (day < 10) {
      strDay = "0" + day;
    }
    let pickupDateStr = year.toString() + "-" + strMonth + "-" + strDay;
    let business = get_store_value(basicStore);
    return {
      quoteId: "",
      requesterId: "",
      mode: "",
      liablePartyId: "",
      pickupDate: "",
      displayDate: pickupDateStr,
      deliveryDate: "",
      totalItems: 1,
      totalWeight: 800,
      validUntil: "",
      editMode: false,
      businessId: business.business?.businessId || "",
      specialInstruction: "",
      shipperPickupReadyBy: "",
      business: business.business,
      requesterEmail: "",
      shipmentValue: 1,
      shipmentType: "",
      totalLength: 48,
      totalWidth: 40,
      totalHeight: 65,
      pickupReadyTime: "16:00"
    };
  } else {
    const shipmentInfo = {
      quoteId: "",
      requesterId: "",
      mode: "",
      liablePartyId: "",
      pickupDate: "",
      displayDate: "",
      deliveryDate: "",
      totalItems: void 0,
      totalWeight: void 0,
      validUntil: "",
      editMode: false,
      businessId: "",
      specialInstruction: "",
      shipperPickupReadyBy: "",
      business: void 0,
      requesterEmail: "",
      shipmentValue: void 0,
      shipmentType: "",
      totalLength: void 0,
      totalWidth: void 0,
      totalHeight: void 0,
      pickupReadyTime: ""
    };
    return shipmentInfo;
  }
}
function newErrorValue() {
  return {
    shipmentValue: {
      valid: true,
      message: "shipment value must be greater than 0"
    },
    pickupDate: {
      valid: true,
      message: "pickup date is invalid"
    }
  };
}
function initShipmentWorker() {
  const shipmentInfoStore2 = writable(newShipmentInfo());
  const quoteShipmentErrors2 = writable(newErrorValue());
  return {
    shipmentInfoStore: shipmentInfoStore2,
    quoteShipmentErrors: quoteShipmentErrors2
  };
}
function mapToFreightType(freightClassKey) {
  const value = freightClass[freightClassKey];
  const name = "Class " + freightClassKey.slice(5);
  const stringValue = freightClassKey;
  return {
    value,
    name,
    stringValue
  };
}
function getFreightClassString(value) {
  const key2 = Object.keys(freightClass).find((k) => freightClass[k] === value);
  if (key2 && key2 !== "UNRECOGNIZED") {
    const classNumber = key2.replace("class", "");
    return `Class ${classNumber}`;
  }
  return "";
}
var shipmentInfoStore, quoteShipmentErrors, packageType, freightClass, allFreightClass, allFreightClasses;
var init_freight_class = __esm({
  ".svelte-kit/output/server/chunks/freight_class.js"() {
    init_ssr();
    init_config2();
    init_basic_store();
    init_chunks();
    ({ shipmentInfoStore, quoteShipmentErrors } = initShipmentWorker());
    packageType = /* @__PURE__ */ ((packageType2) => {
      packageType2[packageType2["unknownPackageType"] = 0] = "unknownPackageType";
      packageType2[packageType2["pallets48x40"] = 1] = "pallets48x40";
      packageType2[packageType2["pallets48x48"] = 2] = "pallets48x48";
      packageType2[packageType2["bags"] = 3] = "bags";
      packageType2[packageType2["bales"] = 4] = "bales";
      packageType2[packageType2["boxes"] = 5] = "boxes";
      packageType2[packageType2["buckets"] = 6] = "buckets";
      packageType2[packageType2["bundles"] = 7] = "bundles";
      packageType2[packageType2["cans"] = 8] = "cans";
      packageType2[packageType2["cartons"] = 9] = "cartons";
      packageType2[packageType2["cases"] = 10] = "cases";
      packageType2[packageType2["coils"] = 11] = "coils";
      packageType2[packageType2["crates"] = 12] = "crates";
      packageType2[packageType2["cylinders"] = 13] = "cylinders";
      packageType2[packageType2["drums"] = 14] = "drums";
      packageType2[packageType2["pails"] = 15] = "pails";
      packageType2[packageType2["reels"] = 16] = "reels";
      packageType2[packageType2["rolls"] = 17] = "rolls";
      packageType2[packageType2["totes"] = 18] = "totes";
      packageType2[packageType2["tubes"] = 19] = "tubes";
      packageType2[packageType2["units"] = 20] = "units";
      packageType2[packageType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      return packageType2;
    })(packageType || {});
    freightClass = /* @__PURE__ */ ((freightClass2) => {
      freightClass2[freightClass2["unknownFreightClass"] = 0] = "unknownFreightClass";
      freightClass2[freightClass2["class50"] = 1] = "class50";
      freightClass2[freightClass2["class55"] = 2] = "class55";
      freightClass2[freightClass2["class60"] = 3] = "class60";
      freightClass2[freightClass2["class65"] = 4] = "class65";
      freightClass2[freightClass2["class70"] = 5] = "class70";
      freightClass2[freightClass2["class775"] = 6] = "class775";
      freightClass2[freightClass2["class85"] = 7] = "class85";
      freightClass2[freightClass2["class925"] = 8] = "class925";
      freightClass2[freightClass2["class100"] = 9] = "class100";
      freightClass2[freightClass2["class110"] = 10] = "class110";
      freightClass2[freightClass2["class125"] = 11] = "class125";
      freightClass2[freightClass2["class150"] = 12] = "class150";
      freightClass2[freightClass2["class175"] = 13] = "class175";
      freightClass2[freightClass2["class200"] = 14] = "class200";
      freightClass2[freightClass2["class250"] = 15] = "class250";
      freightClass2[freightClass2["class300"] = 16] = "class300";
      freightClass2[freightClass2["class400"] = 17] = "class400";
      freightClass2[freightClass2["class500"] = 18] = "class500";
      freightClass2[freightClass2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      return freightClass2;
    })(freightClass || {});
    allFreightClass = Object.keys(freightClass).filter((key2) => isNaN(Number(key2)));
    allFreightClasses = allFreightClass.map(mapToFreightType);
  }
});

// .svelte-kit/output/server/entries/pages/(public)/_layout.svelte.js
var layout_svelte_exports4 = {};
__export(layout_svelte_exports4, {
  default: () => Layout4
});
var LoginArrow, css$12, Nav, css4, Footer, Layout4;
var init_layout_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/_layout.svelte.js"() {
    init_ssr();
    init_Toaster();
    init_Toaster_svelte_svelte_type_style_lang();
    init_navigation();
    init_Whitelogo();
    init_freight_class();
    LoginArrow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M9.76076555,0 C15.4157386,0 20,4.4771525 20,10 C20,15.5228475 15.4157386,20 9.76076555,20 C6.56885647,20 3.61836948,18.5634688 1.68988581,16.1544725 C1.46202241,15.8698333 1.51356853,15.4586837 1.80501731,15.2361442 C2.09646608,15.0136047 2.51745178,15.0639465 2.74531518,15.3485857 C4.4225344,17.443711 6.98554674,18.6915888 9.76076555,18.6915888 C14.6758356,18.6915888 18.6602871,14.8002319 18.6602871,10 C18.6602871,5.19976806 14.6758356,1.30841121 9.76076555,1.30841121 C7.02601512,1.30841121 4.49642844,2.51988396 2.81675903,4.5633425 C2.58516542,4.84509553 2.16355149,4.89014431 1.87505796,4.66396176 C1.58656443,4.43777922 1.54043793,4.02601608 1.77203154,3.74426305 C3.70333647,1.39466883 6.61544133,0 9.76076555,0 Z M10.3053281,6.86239745 L13.0119569,9.56902627 C13.2735521,9.83062149 13.2785069,10.2497964 13.0230237,10.5052795 L10.3796339,13.1486694 C10.1241507,13.4041526 9.70497582,13.3991978 9.4433806,13.1376026 C9.18178539,12.8760073 9.1768306,12.4568325 9.43231378,12.2013493 L10.98,10.6534046 L0.669856459,10.6542056 C0.299904952,10.6542056 7.72715225e-14,10.3613078 7.72715225e-14,10 C7.72715225e-14,9.63869222 0.299904952,9.34579439 0.669856459,9.34579439 L10.938,9.34540456 L9.38014161,7.78758389 C9.11854639,7.52598867 9.11359161,7.1068138 9.36907479,6.85133062 C9.62455797,6.59584744 10.0437328,6.60080223 10.3053281,6.86239745 Z"></path></svg>`;
    });
    css$12 = {
      code: "a.svelte-ljdnrs.svelte-ljdnrs{min-width:150px;padding:10px 10px;color:white;--tw-text-opacity:1}header.svelte-ljdnrs.svelte-ljdnrs{z-index:1000;transition:background-image 2s ease-in-out;font-weight:400;width:100% !important;position:fixed;top:0;left:0}li.svelte-ljdnrs a.svelte-ljdnrs{font-family:'bungee'}",
      map: null
    };
    Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let nav_items = [
        {
          href: "/login",
          text: "Log in",
          title: "login to first shipper to get shipping quote"
        },
        {
          href: "/track",
          text: "Track A Shipment",
          title: "track your shipments here"
        },
        {
          href: "/admin/quote",
          text: "Get New Quote",
          title: "get shipping quote"
        },
        {
          href: "/contact",
          text: "Contact Us",
          title: "contact us"
        },
        {
          href: "/freight-glossary",
          text: "Freight glossary",
          title: "Freight glossary"
        },
        {
          href: "/calculate-freight-class",
          text: "Calculate Freight Class",
          title: "Calculate Freight Class"
        },
        {
          href: "/guides",
          text: "Developers",
          title: "developers"
        }
      ];
      let drawer_open = false;
      afterNavigate(() => {
        drawer_open = false;
      });
      $$result.css.add(css$12);
      return `<div class="relative"><header class="z-[10000] bg-neutral relative svelte-ljdnrs"><div class="main-nav z-[10000] mx-auto flex h-[70px] w-full max-w-[80rem] items-center justify-between rounded-lg p-2"><a href="/" class="flex items-center svelte-ljdnrs">${validate_component(Whitelogo, "Whitelogo").$$render($$result, {}, {}, {})}</a> <ul class="hidden w-[500px] items-center justify-around lg:flex flex-row" data-svelte-h="svelte-1n74wtw"><li class=" svelte-ljdnrs"><a href="/track" class="font-bold svelte-ljdnrs">Track Shipment</a></li> <li class=" svelte-ljdnrs"><a href="/admin/quote" class="svelte-ljdnrs">New Quote</a></li> <li class=" svelte-ljdnrs"><a href="/contact" class="svelte-ljdnrs">Contact</a></li> <li class=" svelte-ljdnrs"><a href="/guides" class="svelte-ljdnrs">Developers</a></li></ul> <button class="p-2 lg:hidden">${drawer_open ? `${validate_component(Close, "Close").$$render($$result, {}, {}, {})}` : `${validate_component(Hamburger, "Hamburger").$$render($$result, {}, {}, {})}`}</button> <div class="hidden lg:block"><a href="/login" style="border-radius:0;min-width:175px;margin-right:-1px;" class="bg-primary ownBtn login font-mono font-semibold flex justify-center items-center svelte-ljdnrs">Login
          ${validate_component(LoginArrow, "LoginArrow").$$render($$result, {}, {}, {})}</a></div> ${drawer_open ? `<div class="absolute bg-primary left-0 top-[60px] flex items-center justify-center lg:hidden"><nav class="drawerNav top-[60px] right-0 flex flex-col gap-2 rounded-sm px-4 py-6 h-[100vh] min-w-[100vw] z-10000">${each(nav_items, (nav, index28) => {
        return `<a${add_attribute("href", nav.href, 0)}${add_attribute("title", nav.title, 0)} class="${[
          "flex w-full items-center justify-center py-2 hover:bg-neutral font-bungee svelte-ljdnrs",
          index28 == 0 ? "mt-3" : ""
        ].join(" ").trim()}">${escape(nav.text)} </a>`;
      })}</nav></div>` : ``}</div></header> </div>`;
    });
    css4 = {
      code: "div.svelte-1phv9d0,a.svelte-1phv9d0,p.svelte-1phv9d0,h3.svelte-1phv9d0{color:white;font-family:'Space Grotesk'}footer.svelte-1phv9d0{background-color:#382f2d;color:#fff}",
      map: null
    };
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css4);
      return `<footer class="svelte-1phv9d0" data-svelte-h="svelte-107bxk0"><nav class="mx-auto flex max-w-[1028px] flex-col pt-10"><div class="flex flex-col py-20 px-4 lg:flex-row lg:justify-between svelte-1phv9d0"><div class="flex flex-col gap-4 py-4 svelte-1phv9d0"><div class="site_logo pb-5 svelte-1phv9d0"><a href="/" class="svelte-1phv9d0"><img src="/images/logo/new_logo_white.svg" alt="new company logo" width="200px" height="150px"></a></div> <ul class="flex flex-col"><li class="flex h-[60px] items-center"><div class="w-[30px] self-start svelte-1phv9d0"><img src="/images/icons/location_white.svg" alt="firstshipper address" width="16" height="22"></div> <div class="flex flex-col gap-2 svelte-1phv9d0"><span>Los Angeles</span> <span>CA, USA</span></div></li> <li class="flex h-[60px] items-center"><div class="w-[30px] svelte-1phv9d0"><img src="/images/icons/phone.svg" alt="firstshippper phone number" width="16" height="22"></div> <a class="hover:text-[#5CB971] svelte-1phv9d0" href="tel:+16307284099">630-728-4099</a></li></ul></div> <div class="flex flex-col justify-between px-2 py-4 sm:flex-row lg:w-[60%] lg:justify-around svelte-1phv9d0"><div class="flex flex-col gap-1 svelte-1phv9d0"><h3 class="pt-3 svelte-1phv9d0">Company</h3> <ul class="ml-2 flex w-full flex-col gap-2 md:ml-0"><li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/about">About Us</a></li> <li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/careers">Careers</a></li> <li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/contact">Contact</a></li></ul></div> <div class="flex flex-col gap-1 svelte-1phv9d0"><h3 class="pt-3 svelte-1phv9d0">Resources</h3> <ul class="ml-2 flex w-full flex-col gap-2 md:ml-0"><li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/blog">Blog</a></li> <li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/freight-glossary">Freight glossary</a></li> <li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/calculate-freight-class">Calculate Freight Class</a></li></ul></div> <div class="flex flex-col gap-1 svelte-1phv9d0"><h3 class="pt-3 svelte-1phv9d0">Social</h3> <ul class="ml-2 flex w-full flex-col gap-2 md:ml-0"><li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/">Facebook</a></li> <li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/">Twitter</a></li> <li class="w-full"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/">Linkedin</a></li></ul></div></div></div> <div class="flex flex-col items-center justify-between p-4 py-4 lg:flex-row svelte-1phv9d0"><div class="flex w-full flex-col items-center justify-center sm:flex-row md:items-start lg:justify-start svelte-1phv9d0"><p class="copyright_text mb-2 tracking-wide svelte-1phv9d0">Copyright \xA9 2022 FirstShipper<span class="hidden sm:inline">, <span class="pl-1">All Rights Reserved.</span></span></p> <p class="sm:hidden svelte-1phv9d0">All Rights Reserved.</p></div> <ul class="flex justify-center py-3 lg:w-[30%] lg:justify-end"><li class="min-w-[120px] tracking-wider"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/privacy">Privacy Policy</a></li> <li class="secondary-text mx-4 font-extrabold">|</li> <li class="min-w-[120px] tracking-wider"><a class="w-full hover:text-[#5CB971] svelte-1phv9d0" href="/privacy">Terms Of Use</a></li></ul></div></nav> </footer>`;
    });
    Layout4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      afterNavigate(() => {
        let toggleInput = document.getElementById("toggle-input");
        if (toggleInput?.checked) {
          toggleInput.checked = false;
        }
      });
      return `${$$result.head += `<!-- HEAD_svelte-1ocwwbd_START --><script type="text/javascript" id="zsiqchat" data-svelte-h="svelte-mct2og">var $zoho = $zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
      widgetcode: 'aec79fcb5537d247e907d1723cabd32568605f7af0a27823b94b8639002f7378',
      values: {},
      ready: function () {}
    };
    var d = document;
    s = d.createElement('script');
    s.type = 'text/javascript';
    s.id = 'zsiqscript';
    s.defer = true;
    s.src = 'https://salesiq.zoho.com/widget';
    t = d.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);<\/script><!-- HEAD_svelte-1ocwwbd_END -->`, ""} ${validate_component(Toaster, "Toaster").$$render($$result, { containerStyle: "margin-top:60px;" }, {}, {})} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <div class="overflow-x-hidden">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6,
  universal: () => layout_ts_exports2,
  universal_id: () => universal_id2
});
var index6, component_cache6, component6, universal_id2, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_layout_ts2();
    index6 = 5;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_layout_svelte4(), layout_svelte_exports4))).default);
    universal_id2 = "src/routes/(public)/+layout.ts";
    imports6 = ["_app/immutable/nodes/5.f3d38647.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/Toaster.0200bc64.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/Whitelogo.83427055.js", "_app/immutable/chunks/index.fc8250e2.js", "_app/immutable/chunks/quote_utils.8ad4c718.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/delivery_store.5fe89634.js", "_app/immutable/chunks/commodity_store.3c0148c0.js"];
    stylesheets6 = ["_app/immutable/assets/5.02f5c1e2.css", "_app/immutable/assets/Toaster.cb20041a.css", "_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/chunks/config.js
var backendUrl;
var init_config = __esm({
  ".svelte-kit/output/server/chunks/config.js"() {
    init_config2();
    backendUrl = getBackEndUrl();
  }
});

// .svelte-kit/output/server/chunks/get_basic_info.js
async function getBasicInfo(fetch2) {
  let data = {
    token: "",
    business: void 0,
    user: void 0,
    users: [],
    valid: false,
    clientAddresses: [],
    businessAddress: void 0,
    defaultPickupLocation: void 0,
    defaultDeliveryLocation: void 0,
    bookings: [],
    quotes: [],
    shipments: []
  };
  const url = backendUrl + "/business/get_basic_info";
  try {
    const res = await fetch2(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    data = await res.json();
    if (data.users != void 0) {
      let user = data?.business?.adminUser;
      if (user != void 0) {
        data.users = [user];
      }
    }
  } catch (error2) {
    console.log("Error in getBasicInfo", error2);
  }
  return data;
}
var init_get_basic_info = __esm({
  ".svelte-kit/output/server/chunks/get_basic_info.js"() {
    init_config();
  }
});

// .svelte-kit/output/server/chunks/index2.js
var clerkClient;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_private();
    init_esm();
    clerkClient = Clerk({ secretKey: PRIVATE_CLERK_SECRET_KEY });
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  load: () => load
});
async function CreateUser(fetch2, email, businessId, name, userId) {
  try {
    const res = await fetch2(backendUrl + "/user", {
      method: "POST",
      body: JSON.stringify({
        email,
        businessId,
        name,
        userId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.status !== 201 && res.status !== 409) {
      throw new Error("Signup failed");
    } else if (res.status == 409) {
      throw new Error("User already exists");
    }
    return res;
  } catch (error2) {
    throw error2;
  }
}
async function getBusinessCount() {
  try {
    const res = await fetch(`${backendUrl}/business/business_count`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });
    const data = await res.text();
    return data;
  } catch (error2) {
    throw error2;
  }
}
var load;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/_page.server.ts.js"() {
    init_config();
    init_get_basic_info();
    init_index2();
    load = async function load2({ fetch: fetch2, cookies, locals }) {
      if (!cookies.get("first-auth")) {
        let user = await clerkClient.users.getUser(locals?.session?.userId || "");
        console.log("user is", user);
        let businssCount = await getBusinessCount();
        let fullName = "";
        if (user.firstName != "" && user.lastName != "") {
          fullName = user.firstName + " " + user.lastName;
        } else {
          fullName = user.firstName ? user.firstName : "";
        }
        await CreateUser(fetch2, user.emailAddresses[0].emailAddress, businssCount, fullName, user.id);
        await clerkClient.users.updateUserMetadata(locals?.session?.userId || "", {
          publicMetadata: {
            businessId: businssCount,
            email: user.emailAddresses[0].emailAddress,
            accountOpened: true
          }
        });
        let firstsUser = {
          user: {
            businessId: businssCount,
            email: user.emailAddresses[0].emailAddress
          }
        };
        let stringCookie = JSON.stringify(firstsUser);
        cookies.set("first-auth", stringCookie, {
          httpOnly: false,
          secure: false,
          sameSite: "lax",
          expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365),
          path: "/"
        });
      }
      let basicInfo2 = await getBasicInfo(fetch2);
      if (basicInfo2.business?.businessId == "" || !basicInfo2.business?.businessId) {
        throw "Business not found";
      }
      return basicInfo2;
    };
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var css5, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/_page.svelte.js"() {
    init_ssr();
    init_basic_store();
    init_Toaster_svelte_svelte_type_style_lang();
    css5 = {
      code: "a.svelte-1lwf4a:hover{opacity:0.8}a.svelte-1lwf4a{color:white}",
      map: null
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let businessId;
      let allowBusinessToBook;
      let preventBusinessToBook;
      let $basicStore, $$unsubscribe_basicStore;
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => $basicStore = value);
      let { data } = $$props;
      console.log("admin datga is", data);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css5);
      businessId = "";
      allowBusinessToBook = false;
      preventBusinessToBook = false;
      $$unsubscribe_basicStore();
      return `<div class="p-2 min-h-[100vh] self-start"><div class="flex flex-col py-4 mt-4 max-w-[610px] mr-2 bg-whitebg text-gray-900"><h2 class="pl-4 mt-3 text-md font-bold">Account: ${escape($basicStore?.business?.businessId)}</h2> <h2 class="pl-4 mb-3 text-md font-bold">Company Name: ${escape($basicStore?.business?.businessName ? $basicStore?.business?.businessName : "N/A")}</h2></div> ${$basicStore?.user?.email == "kandelsuren@gmail.com" ? `<div class="flex p-4 flex-col gap-4 md:flex-row w-full"><div class="w-1/2 max-w-[200px]"><button class="ownBtn bg-primary w-full" data-svelte-h="svelte-19p2tmx">Allow Booking</button> ${allowBusinessToBook ? `<div class="flex flex-col"><label class="py-4" for="destinationZip" data-svelte-h="svelte-a8ufo3">Allow Business to Book</label> <input type="text" id="businessId" name="businessId" placeholder="Business Id" class="input max-w-[300px]"${add_attribute("value", businessId, 0)}> <button class="ownBtn my-4 max-w-[200px] rounded-md bg-primary px-4 py-4" data-svelte-h="svelte-noywyn">AllowBooking</button></div>` : ``}</div> <div class="w-1/2 max-w-[200px]"><button class="bg-error ownBtn w-full" data-svelte-h="svelte-lrpxa8">Prevent Booking</button> ${preventBusinessToBook ? `<div class="flex flex-col"><label class="py-4" for="destinationZip" data-svelte-h="svelte-jzjizy">Prevent Business to Book</label> <input type="text" id="businessId" name="businessId" placeholder="Business Id" class="input max-w-[300px]"${add_attribute("value", businessId, 0)}> <button class="ownBtn my-4 max-w-[200px] rounded-md bg-primary px-4 py-4" data-svelte-h="svelte-jmt2bq">Prevent Booking</button></div>` : ``}</div></div>` : ``} <div class="flex md:max-w-[610px] flex-wrap gap-3 mt-8 bg-whitebg p-12" data-svelte-h="svelte-hdwbyc"><div class="flex flex-col gap-5 sm:flex-row w-full items-center justify-center rounded-md"><a href="/admin/quote" class="ownBtn w-full sm:w-1/2 bg-primary rounded-md py-4 px-4 text-center svelte-1lwf4a">Get Quote</a> <a href="/admin/shipments" class="ownBtn w-full sm:w-1/2 rounded-md bg-primary py-4 px-4 text-center svelte-1lwf4a">Shipments</a></div> <div class="flex flex-col gap-5 sm:flex-row w-full items-center justify-center rounded-md"><a href="/admin/track" class="ownBtn w-full sm:w-1/2 rounded-md bg-primary py-4 px-4 text-center svelte-1lwf4a">Track A Shipment</a> <a href="/admin/shipments" class="ownBtn w-full sm:w-1/2 rounded-md bg-primary py-4 px-4 text-center svelte-1lwf4a">Download Bol</a></div></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  server: () => page_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, server_id, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_page_server_ts();
    index7 = 6;
    component7 = async () => component_cache7 ?? (component_cache7 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    server_id = "src/routes/(admin)/admin/+page.server.ts";
    imports7 = ["_app/immutable/nodes/6.d27b5724.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/config.1c7577db.js", "_app/immutable/chunks/index.fc8250e2.js"];
    stylesheets7 = ["_app/immutable/assets/6.9514d948.css", "_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/bol/_slug_/_page.ts.js
var page_ts_exports = {};
__export(page_ts_exports, {
  load: () => load3,
  prerender: () => prerender3,
  ssr: () => ssr2
});
async function load3(args) {
}
var prerender3, ssr2;
var init_page_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/bol/_slug_/_page.ts.js"() {
    init_page_server();
    prerender3 = false;
    ssr2 = true;
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/bol/_slug_/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  load: () => load4
});
function load4({ setHeaders }) {
  setHeaders({
    "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
    "Pragma": "no-cache",
    "Expires": "0"
  });
}
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/bol/_slug_/_page.server.ts.js"() {
  }
});

// .svelte-kit/output/server/chunks/Circle3.js
var css6, Circle3;
var init_Circle3 = __esm({
  ".svelte-kit/output/server/chunks/Circle3.js"() {
    init_ssr();
    css6 = {
      code: ".wrapper.svelte-7wj78d{width:var(--size);height:var(--size);display:flex;justify-content:center;align-items:center;line-height:0;box-sizing:border-box}.inner.svelte-7wj78d{transform:scale(calc(var(--floatSize) / 52))}.ball-container.svelte-7wj78d{animation:svelte-7wj78d-ballTwo var(--duration) infinite;width:44px;height:44px;flex-shrink:0;position:relative}.single-ball.svelte-7wj78d{width:44px;height:44px;position:absolute}.ball.svelte-7wj78d{width:20px;height:20px;border-radius:50%;position:absolute;animation:svelte-7wj78d-ballOne var(--duration) infinite ease}.pause-animation.svelte-7wj78d{animation-play-state:paused}.ball-top-left.svelte-7wj78d{background-color:var(--ballTopLeftColor);top:0;left:0}.ball-top-right.svelte-7wj78d{background-color:var(--ballTopRightColor);top:0;left:24px}.ball-bottom-left.svelte-7wj78d{background-color:var(--ballBottomLeftColor);top:24px;left:0}.ball-bottom-right.svelte-7wj78d{background-color:var(--ballBottomRightColor);top:24px;left:24px}@keyframes svelte-7wj78d-ballOne{0%{position:absolute}50%{top:12px;left:12px;position:absolute;opacity:0.5}100%{position:absolute}}@keyframes svelte-7wj78d-ballTwo{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(360deg) scale(1.3)}100%{transform:rotate(720deg) scale(1)}}",
      map: null
    };
    Circle3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = "60" } = $$props;
      let { unit = "px" } = $$props;
      let { pause = false } = $$props;
      let { ballTopLeft = "#FF3E00" } = $$props;
      let { ballTopRight = "#F8B334" } = $$props;
      let { ballBottomLeft = "#40B3FF" } = $$props;
      let { ballBottomRight = "#676778" } = $$props;
      let { duration = "1.5s" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
        $$bindings.unit(unit);
      if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
        $$bindings.pause(pause);
      if ($$props.ballTopLeft === void 0 && $$bindings.ballTopLeft && ballTopLeft !== void 0)
        $$bindings.ballTopLeft(ballTopLeft);
      if ($$props.ballTopRight === void 0 && $$bindings.ballTopRight && ballTopRight !== void 0)
        $$bindings.ballTopRight(ballTopRight);
      if ($$props.ballBottomLeft === void 0 && $$bindings.ballBottomLeft && ballBottomLeft !== void 0)
        $$bindings.ballBottomLeft(ballBottomLeft);
      if ($$props.ballBottomRight === void 0 && $$bindings.ballBottomRight && ballBottomRight !== void 0)
        $$bindings.ballBottomRight(ballBottomRight);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      $$result.css.add(css6);
      return `<div class="wrapper svelte-7wj78d" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --floatSize: " + escape(size, true) + "; --ballTopLeftColor: " + escape(ballTopLeft, true) + "; --ballTopRightColor: " + escape(ballTopRight, true) + "; --ballBottomLeftColor: " + escape(ballBottomLeft, true) + "; --ballBottomRightColor: " + escape(ballBottomRight, true) + "; --duration: " + escape(duration, true) + ";"}"><div class="inner svelte-7wj78d"><div class="${["ball-container svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}"><div class="single-ball svelte-7wj78d"><div class="${["ball ball-top-left svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}" data-svelte-h="svelte-srzctx">\xA0</div></div> <div class="contener_mixte"><div class="${["ball ball-top-right svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}" data-svelte-h="svelte-6iyjws">\xA0</div></div> <div class="contener_mixte"><div class="${["ball ball-bottom-left svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}" data-svelte-h="svelte-9h2qed">\xA0</div></div> <div class="contener_mixte"><div class="${["ball ball-bottom-right svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}" data-svelte-h="svelte-yk0z5u">\xA0</div></div></div></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/Loading.js
var Loading;
var init_Loading = __esm({
  ".svelte-kit/output/server/chunks/Loading.js"() {
    init_ssr();
    init_Circle3();
    Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let loaded;
      let { loadingText = "Loading" } = $$props;
      if ($$props.loadingText === void 0 && $$bindings.loadingText && loadingText !== void 0)
        $$bindings.loadingText(loadingText);
      loaded = false;
      return `${loaded ? ` <div class="flex h-full w-full flex-col items-center justify-center">${validate_component(missing_component, "svelte:component").$$render(
        $$result,
        {
          src: "/loading.json",
          autoplay: true,
          loop: true,
          controls: false,
          renderer: "svg",
          background: "transparent",
          height: 200,
          width: 200
        },
        {},
        {}
      )} <div class="flex flex-col items-center justify-center">${validate_component(Circle3, "Circle3").$$render($$result, { size: "60", unit: "px", duration: "1s" }, {}, {})} <h3 class="sm: mt-3 text-center">${escape(loadingText)}</h3></div></div>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/bol/_slug_/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/bol/_slug_/_page.svelte.js"() {
    init_ssr();
    init_stores();
    init_Toaster_svelte_svelte_type_style_lang();
    init_Loading();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => value);
      let { data } = $$props;
      atob(data.pdfBase64);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$unsubscribe_page();
      return `<div class="p-2 min-h-[100vh] max-w-[1100px]">${`${validate_component(Loading, "Loading").$$render($$result, { loadingText: "Generating BOL" }, {}, {})}`}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  server: () => page_server_ts_exports2,
  server_id: () => server_id2,
  stylesheets: () => stylesheets8,
  universal: () => page_ts_exports,
  universal_id: () => universal_id3
});
var index8, component_cache8, component8, universal_id3, server_id2, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_page_ts();
    init_page_server_ts2();
    index8 = 7;
    component8 = async () => component_cache8 ?? (component_cache8 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    universal_id3 = "src/routes/(admin)/admin/bol/[slug]/+page.ts";
    server_id2 = "src/routes/(admin)/admin/bol/[slug]/+page.server.ts";
    imports8 = ["_app/immutable/nodes/7.1d3ada45.js", "_app/immutable/chunks/control.f5b05b5f.js", "_app/immutable/chunks/config.1c7577db.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/stores.7ed2130f.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/Loading.5545733f.js", "_app/immutable/chunks/preload-helper.a4192956.js", "_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang.36b7f7b6.js"];
    stylesheets8 = ["_app/immutable/assets/Toaster.3a6d0da3.css", "_app/immutable/assets/ArrowUp.baf5064f.css", "_app/immutable/assets/index.798bbb7e.css"];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/booking/_slug_/_page.server.ts.js
var page_server_ts_exports3 = {};
__export(page_server_ts_exports3, {
  load: () => load5
});
function load5({ setHeaders }) {
  setHeaders({
    "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
    "Pragma": "no-cache",
    "Expires": "0"
  });
}
var init_page_server_ts3 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/booking/_slug_/_page.server.ts.js"() {
  }
});

// .svelte-kit/output/server/chunks/delivery_store.js
function initPickupLocationWorker() {
  let pickupStore2 = writable(getNewLocation());
  const quotePickupErrorsStore2 = writable({
    pickupZipCode: {
      valid: true,
      message: "pickup zip code is invalid"
    },
    pickupLocationServices: {
      valid: true,
      message: "please choose LiftGate Pickup or Location with Loading Dock"
    }
  });
  return {
    pickupStore: pickupStore2,
    quotePickupErrorsStore: quotePickupErrorsStore2
  };
}
function getLocationTypes() {
  const locationObject = [
    {
      locationType: 0,
      name: "Please select a location type",
      value: "unknownLocationType"
    },
    {
      locationType: 1,
      name: "Business with Loading Dock or Forklift",
      value: "businessWithLoadingDockOrForkLift"
    },
    {
      locationType: 2,
      name: "Business without Loading Dock or Forklift",
      value: "businessWithOutLoadingDockOrForkLift"
    },
    {
      locationType: 3,
      name: "Residential",
      value: "residential"
    },
    {
      locationType: 4,
      name: "Tradeshow",
      value: "tradeshow"
    },
    {
      locationType: 5,
      name: "Self Storage",
      value: "selfStorage"
    },
    {
      locationType: 6,
      name: "Airport",
      value: "airport"
    },
    {
      locationType: 7,
      name: "Church",
      value: "church"
    },
    {
      locationType: 8,
      name: "Hospital",
      value: "hospital"
    },
    {
      locationType: 9,
      name: "School",
      value: "school"
    },
    {
      locationType: 10,
      name: "Government",
      value: "government"
    },
    {
      locationType: 11,
      name: "Fair or Amusement Park",
      value: "fairOrAmusementPark"
    },
    {
      locationType: 12,
      name: "Construction Site",
      value: "constructionSite"
    },
    {
      locationType: 13,
      name: "Farm or Ranch",
      value: "farmOrRanch"
    },
    {
      locationType: 14,
      name: "Military Installation",
      value: "militaryInstallation"
    },
    {
      locationType: 15,
      name: "Prison",
      value: "prison"
    },
    {
      locationType: 16,
      name: "Hotel or Motel",
      value: "hotelOrMotel"
    },
    {
      locationType: 17,
      name: "Campground",
      value: "campground"
    },
    {
      locationType: 18,
      name: "Grocery Warehouse",
      value: "groceryWarehouse"
    },
    {
      locationType: 19,
      name: "Country Club",
      value: "countryClub"
    },
    {
      locationType: 20,
      name: "Mine Site",
      value: "mineSite"
    },
    {
      locationType: 21,
      name: "Native American Reservation",
      value: "nativeAmericanReservation"
    },
    {
      locationType: 22,
      name: "Nursing Home",
      value: "nursingHome"
    },
    {
      locationType: 23,
      name: "Pier",
      value: "pier"
    },
    {
      locationType: 24,
      name: "Resort",
      value: "resort"
    }
  ];
  return locationObject;
}
function localStorageDeliveryLocation() {
  {
    return getNewLocation();
  }
}
function initDeliveryLocationWorker() {
  const deliveryStore2 = writable(getNewLocation());
  const quoteDeliveryErrorsStore2 = writable({
    deliveryZipCode: {
      valid: true,
      message: "delivery zip code is invalid"
    },
    deliveryLocationServices: {
      valid: true,
      message: "please choose LiftGate Pickup or Location with Loading Dock"
    }
  });
  function resetDeliveryLocation2() {
    deliveryStore2.set(getNewLocation());
  }
  function editDeliveryLocation2() {
    deliveryStore2.set(localStorageDeliveryLocation());
  }
  function validateDeliveryLocation2() {
    return false;
  }
  function updateDeliveryLocation2(location) {
    deliveryStore2.set(location);
  }
  return {
    deliveryStore: deliveryStore2,
    resetDeliveryLocation: resetDeliveryLocation2,
    editDeliveryLocation: editDeliveryLocation2,
    validateDeliveryLocation: validateDeliveryLocation2,
    updateDeliveryLocation: updateDeliveryLocation2,
    quoteDeliveryErrorsStore: quoteDeliveryErrorsStore2
  };
}
var pickupStore, quotePickupErrorsStore, deliveryStore, resetDeliveryLocation, editDeliveryLocation, validateDeliveryLocation, updateDeliveryLocation, quoteDeliveryErrorsStore;
var init_delivery_store = __esm({
  ".svelte-kit/output/server/chunks/delivery_store.js"() {
    init_basic_store();
    init_chunks();
    ({ pickupStore, quotePickupErrorsStore } = initPickupLocationWorker());
    ({
      deliveryStore,
      resetDeliveryLocation,
      editDeliveryLocation,
      validateDeliveryLocation,
      updateDeliveryLocation,
      quoteDeliveryErrorsStore
    } = initDeliveryLocationWorker());
  }
});

// .svelte-kit/output/server/chunks/package_type.js
function mapToPackageType(packageType2) {
  let value;
  let name;
  switch (packageType2) {
    case "unknownPackageType":
      value = 0;
      name = "Unknown Package Type";
      break;
    case "pallets48x40":
      value = 1;
      name = "Pallets 48x40";
      break;
    case "pallets48x48":
      value = 2;
      name = "Pallets 48x48";
      break;
    case "bags":
      value = 3;
      name = "Bags";
      break;
    case "bales":
      value = 4;
      name = "Bales";
      break;
    case "boxes":
      value = 5;
      name = "Boxes";
      break;
    case "buckets":
      value = 6;
      name = "Buckets";
      break;
    case "bundles":
      value = 7;
      name = "Bundles";
      break;
    case "cans":
      value = 8;
      name = "Cans";
      break;
    case "cartons":
      value = 9;
      name = "Cartons";
      break;
    case "cases":
      value = 10;
      name = "Cases";
      break;
    case "coils":
      value = 11;
      name = "Coils";
      break;
    case "crates":
      value = 12;
      name = "Crates";
      break;
    case "cylinders":
      value = 13;
      name = "Cylinders";
      break;
    case "drums":
      value = 14;
      name = "Drums";
      break;
    case "pails":
      value = 15;
      name = "Pails";
      break;
    case "reels":
      value = 16;
      name = "Reels";
      break;
    case "rolls":
      value = 17;
      name = "Rolls";
      break;
    case "totes":
      value = 18;
      name = "Totes";
      break;
    case "tubes":
      value = 19;
      name = "Tubes";
      break;
    case "units":
      value = 20;
      name = "Units";
      break;
    case "UNRECOGNIZED":
    default:
      value = -1;
      name = "Unrecognized";
      break;
  }
  return {
    value,
    name,
    stringValue: packageType2
  };
}
var pickupPromptStore, Prompt, packageTypes, allPackageTypes;
var init_package_type = __esm({
  ".svelte-kit/output/server/chunks/package_type.js"() {
    init_chunks();
    init_freight_class();
    init_Toaster_svelte_svelte_type_style_lang();
    init_ssr();
    pickupPromptStore = writable(false);
    Prompt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"> <div class="fixed inset-0 0 bg-opacity-75 transition-opacity"></div> <div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"> <div class="relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"><div data-svelte-h="svelte-q39foo"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"> <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg></div> <div class="mt-3 text-center sm:mt-5"><h3 class="leading-6" id="modal-title">Pickup Confirmation</h3> <div class="mt-2"><p class="">Pickup after 4pm is not guaranteed. However, We will try best to pickup today.</p></div></div></div> <div class="mt-5 sm:mt-6"><button type="button" class="sm: inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-xl font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" style="background-color: rgb(79 70 229 / var(--tw-bg-opacity))" data-svelte-h="svelte-1hlz1jp">ok</button></div></div></div></div></div>`;
    });
    packageTypes = Object.keys(packageType).filter((key2) => isNaN(Number(key2)));
    allPackageTypes = packageTypes.map(mapToPackageType);
  }
});

// .svelte-kit/output/server/chunks/QuoteInfo.svelte_svelte_type_style_lang.js
function initRatesStore() {
  const bid_store2 = writable({
    bids: [],
    choosen_bid: void 0
  });
  function addChoosenBid2(bid) {
    bid_store2.update((value) => {
      value.choosen_bid = bid;
      return value;
    });
  }
  return { bid_store: bid_store2, addChoosenBid: addChoosenBid2 };
}
var bid_store, addChoosenBid;
var init_QuoteInfo_svelte_svelte_type_style_lang = __esm({
  ".svelte-kit/output/server/chunks/QuoteInfo.svelte_svelte_type_style_lang.js"() {
    init_chunks();
    ({ bid_store, addChoosenBid } = initRatesStore());
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/booking/_slug_/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var css7, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/booking/_slug_/_page.svelte.js"() {
    init_ssr();
    init_Toaster_svelte_svelte_type_style_lang();
    init_stores();
    init_delivery_store();
    init_package_type();
    init_Loading();
    init_QuoteInfo_svelte_svelte_type_style_lang();
    init_basic_store();
    init_freight_class();
    css7 = {
      code: "button.svelte-1top819:hover{opacity:0.8;cursor:pointer}",
      map: null
    };
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_deliveryStore;
      let $$unsubscribe_basicStore;
      let $$unsubscribe_pickupStore;
      let $$unsubscribe_shipmentInfoStore;
      let $$unsubscribe_bid_store;
      let $$unsubscribe_page;
      let $pickupPromptStore, $$unsubscribe_pickupPromptStore;
      $$unsubscribe_deliveryStore = subscribe(deliveryStore, (value) => value);
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => value);
      $$unsubscribe_pickupStore = subscribe(pickupStore, (value) => value);
      $$unsubscribe_shipmentInfoStore = subscribe(shipmentInfoStore, (value) => value);
      $$unsubscribe_bid_store = subscribe(bid_store, (value) => value);
      $$unsubscribe_page = subscribe(page, (value) => value);
      $$unsubscribe_pickupPromptStore = subscribe(pickupPromptStore, (value) => $pickupPromptStore = value);
      $$result.css.add(css7);
      $$unsubscribe_deliveryStore();
      $$unsubscribe_basicStore();
      $$unsubscribe_pickupStore();
      $$unsubscribe_shipmentInfoStore();
      $$unsubscribe_bid_store();
      $$unsubscribe_page();
      $$unsubscribe_pickupPromptStore();
      return `${$pickupPromptStore ? `${validate_component(Prompt, "Prompt").$$render($$result, {}, {}, {})}` : ``} <div class="p-2 min-h-[100vh] md:pl-4 text-black mt-4 max-w-[1100px]">${`<div class="fixed flex min-h-[calc(100vh-160px)] w-full flex-col items-center justify-center duration-300 lg:w-[calc(100vw-160px)]">${validate_component(Loading, "Loading").$$render($$result, { loadingText: "Hold on. Booking Load" }, {}, {})}</div>`} </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  server: () => page_server_ts_exports3,
  server_id: () => server_id3,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, server_id3, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_page_server_ts3();
    index9 = 8;
    component9 = async () => component_cache9 ?? (component_cache9 = (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default);
    server_id3 = "src/routes/(admin)/admin/booking/[slug]/+page.server.ts";
    imports9 = ["_app/immutable/nodes/8.a2e5ab5b.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/QuoteDeliveryZip.17192e40.js", "_app/immutable/chunks/delivery_store.5fe89634.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/stores.7ed2130f.js", "_app/immutable/chunks/index.fc8250e2.js", "_app/immutable/chunks/package_type.21e31deb.js", "_app/immutable/chunks/quote_utils.8ad4c718.js", "_app/immutable/chunks/commodity_store.3c0148c0.js", "_app/immutable/chunks/Loading.5545733f.js", "_app/immutable/chunks/preload-helper.a4192956.js", "_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang.36b7f7b6.js", "_app/immutable/chunks/config.1c7577db.js", "_app/immutable/chunks/bid_store.bd82296e.js", "_app/immutable/chunks/QuoteInfo.90cb9628.js"];
    stylesheets9 = ["_app/immutable/assets/8.3394f77f.css", "_app/immutable/assets/Toaster.3a6d0da3.css", "_app/immutable/assets/ArrowUp.baf5064f.css", "_app/immutable/assets/index.798bbb7e.css", "_app/immutable/assets/QuoteInfo.216cdf32.css"];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/claims/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/claims/_page.svelte.js"() {
    init_ssr();
    init_Toaster_svelte_svelte_type_style_lang();
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let tracked;
      let shipmentNo;
      tracked = false;
      shipmentNo = "";
      return `<div class="p-2 min-h-[100vh] text-black max-w-[1100px]"><h1 class="font-bold py-2" data-svelte-h="svelte-1dqncsp">Submit a Claim</h1> <div class="sm:p-12 shadow-md self-start w-full bg-whitebg font-mono"><div class="flex flex-col gap-2" data-svelte-h="svelte-x9s0se"><p class="mt-2">Disclaimers</p> <div class="flex flex-col gap-2"><div class="flex w-full items-center gap-2"><p>This form allows the presentation of a cargo claim.</p></div> <div class="flex w-full items-center gap-2"><p>To get updates about previously filled claims, Please email us.</p></div> <a class="text-blue-600 text-2xl" href="mailto:cargoclaims@firstshipper.com">claims@firstshipper.com</a></div></div> <div class="flex flex-col gap-2 mt-8"><p data-svelte-h="svelte-1i2w5ta">Search for an Order to start the Claim. This is required!</p> <div class="flex w-full flex-col gap-3 items-center"><label for="orderSearchText" class="self-start" data-svelte-h="svelte-1w648sc">Find Shipment</label> <input id="orderSearchText" placeholder="Find order" type="text" aria-label="find order" style="background-color: #ffffff;" class="btn max-w-[300px] font-mono self-start w-full"${add_attribute("value", shipmentNo, 0)}></div> <button style="color:#fff;" type="submit" ${shipmentNo.length < 4 ? "disabled" : ""} class="ownBtn bg-neutral my-3 h-[70px] w-[300px] mt-6 items-center">Search
        <i class="fas fa-search ml-4"></i></button></div> <div class="flex flex-col mt-3">${tracked ? `<p data-svelte-h="svelte-14ywr5">Not Found</p>` : ``}</div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  fonts: () => fonts10,
  imports: () => imports10,
  index: () => index10,
  stylesheets: () => stylesheets10
});
var index10, component_cache10, component10, imports10, stylesheets10, fonts10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    index10 = 9;
    component10 = async () => component_cache10 ?? (component_cache10 = (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default);
    imports10 = ["_app/immutable/nodes/9.9daa30fc.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/index.ba125b59.js"];
    stylesheets10 = ["_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/documents/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/documents/_page.svelte.js"() {
    init_ssr();
    init_basic_store();
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_basicStore;
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => value);
      let data = { shipments: [] };
      $$unsubscribe_basicStore();
      return `<div class="p-2 min-h-[100vh] text-black max-w-[1100px]"><h3 class="flex w-full flex-col py-2 text-black" data-svelte-h="svelte-1mbg98y">Documents</h3> <div class="py-8 sm:px-6 bg-whitebg"><div class="rounded-lg px-5 py-8 shadow-md"><div class="flex flex-col border border-gray-500"><ul class="w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 md:flex md:w-full md:flex-row md:justify-start" data-svelte-h="svelte-1wgwocx"><li class="w-full md:w-[50px]">S.N</li> <li class="w-full md:w-[100px]">Shipment ID</li> <li class="w-full md:w-1/5">Origin</li> <li class="w-full md:w-1/5">Destination</li> <li class="w-full md:w-1/5">Pickup Date</li> <li class="w-full md:w-1/5">Download BOL</li></ul> ${data?.shipments?.length > 0 ? `<div class="hidden flex-col md:flex">${each(data?.shipments, (shipment, index28) => {
        return `<div class="flex w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 font-mono md:w-full md:flex-row md:justify-start"><h3 class="w-full md:w-1/6">${escape(index28 + 1)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.shipmentInfo?.quoteId)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.pickup?.address?.zipCode)}, ${escape(shipment?.quoteRequest?.pickup?.address?.city)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.delivery?.address?.zipCode)}, ${escape(shipment?.quoteRequest?.delivery?.address?.city)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.shipmentInfo?.pickupDate.split("T")[0])}</h3>  <a target="_blank" class="w-full underline underline-offset-2 md:w-1/6"${add_attribute("href", shipment?.bookingInfo?.bolUrl, 0)}>Download BOL</a> </div>`;
      })}</div>` : ``}</div> ${data?.shipments?.length > 0 ? `<div class="mt-6 flex w-full flex-col gap-4 font-mono font-semibold md:hidden">${each(data?.shipments, (shipment, index28) => {
        return `<div class="flex w-full max-w-[400px] rounded-xl bg-purple-100 px-6 py-8"><div class="flex w-1/2 flex-col" data-svelte-h="svelte-1z01n6x"><h3 class="">S.N</h3> <h3 class="">Shipment ID</h3> <h3 class="">Origin</h3> <h3 class="">Destination</h3> <h3 class="">Pickup Date</h3> <h3 class="">Download BOL</h3></div> <div class="flex w-1/2 flex-col"><h3 class="">${escape(index28 + 1)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.shipmentInfo?.quoteId)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.pickup?.address?.city)}, ${escape(shipment?.quoteRequest?.pickup?.address?.zipCode)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.delivery?.address?.city)}, ${escape(shipment?.quoteRequest?.delivery?.address?.zipCode)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.shipmentInfo?.pickupDate.split("T")[0])}</h3>  <a target="_blank" class="underline underline-offset-2"${add_attribute("href", shipment?.bookingInfo?.bolUrl, 0)}>Download BOL</a></div> </div>`;
      })}</div>` : ``}</div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  fonts: () => fonts11,
  imports: () => imports11,
  index: () => index11,
  stylesheets: () => stylesheets11
});
var index11, component_cache11, component11, imports11, stylesheets11, fonts11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    index11 = 10;
    component11 = async () => component_cache11 ?? (component_cache11 = (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default);
    imports11 = ["_app/immutable/nodes/10.164f938e.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js"];
    stylesheets11 = [];
    fonts11 = [];
  }
});

// .svelte-kit/output/server/chunks/Feedback.js
var Feedback;
var init_Feedback = __esm({
  ".svelte-kit/output/server/chunks/Feedback.js"() {
    init_ssr();
    Feedback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="100%" height="100%" viewBox="0 0 26 26" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 10.5625H16.25" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.75 13.8125H16.25" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.2039 19.8961L13.7008 22.4047C13.6272 22.5244 13.5241 22.6233 13.4014 22.6919C13.2787 22.7604 13.1405 22.7964 13 22.7964C12.8595 22.7964 12.7213 22.7604 12.5986 22.6919C12.4759 22.6233 12.3728 22.5244 12.2992 22.4047L10.7961 19.8961C10.7254 19.7757 10.6245 19.6758 10.5034 19.6063C10.3823 19.5369 10.2451 19.5002 10.1055 19.5H4.0625C3.84701 19.5 3.64035 19.4144 3.48798 19.262C3.3356 19.1097 3.25 18.903 3.25 18.6875V5.6875C3.25 5.47201 3.3356 5.26535 3.48798 5.11298C3.64035 4.9606 3.84701 4.875 4.0625 4.875H21.9375C22.153 4.875 22.3597 4.9606 22.512 5.11298C22.6644 5.26535 22.75 5.47201 22.75 5.6875V18.6875C22.75 18.903 22.6644 19.1097 22.512 19.262C22.3597 19.4144 22.153 19.5 21.9375 19.5H15.8945C15.7549 19.5002 15.6177 19.5369 15.4966 19.6063C15.3755 19.6758 15.2746 19.7757 15.2039 19.8961V19.8961Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/feedback/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/feedback/_page.svelte.js"() {
    init_ssr();
    init_Feedback();
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="p-2 min-h-[100vh] text-black max-w-[1100px]"><h3 class="py-2 font-mono font-semibold" data-svelte-h="svelte-1fll4h1">Got a Feedback, or just want to say hello?</h3> <div class="sm:p-12 flex flex-col gap-3 bg-whitebg max-w-[900px]"><div class="flex gap-3 items-center"><div class="h-12 w-12">${validate_component(Feedback, "Feedback").$$render($$result, {}, {}, {})}</div> <h3 class="pt-2 font-bold text-xl" data-svelte-h="svelte-40kjlq">FeedBack</h3></div> <p class="mt-2 text-xl font-bold" data-svelte-h="svelte-1boiz4y">Please write to us.</p> <form class="flex flex-col gap-3" data-svelte-h="svelte-1oybrrg"><div class="flex flex-col sm:flex-row"><div class="w-full sm:mr-3 sm:w-1/2"><label class="pb-3" for="name">Your Name</label> <input type="text" id="name" placeholder="What should We call you?" class="w-full p-3"></div> <div class="w-full pt-8 sm:ml-3 sm:w-1/2 sm:pt-0"><label class="pb-3" for="email">Email Address</label> <input type="email" id="email" placeholder="Drop that email here\u2026" class="w-full p-3"></div></div> <div class="w-full pt-8 sm:pt-10"><label class="pb-3" for="message">Comments</label> <textarea id="message" placeholder="Tell us how can we improve?" class="h-[200px] w-full p-3 bg-white"></textarea></div> <button class="bg-neutral ownBtn mt-4 max-w-[300px] rounded-md font-bungee" style="color:#fff;">Send FeedBack</button></form></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  component: () => component12,
  fonts: () => fonts12,
  imports: () => imports12,
  index: () => index12,
  stylesheets: () => stylesheets12
});
var index12, component_cache12, component12, imports12, stylesheets12, fonts12;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    index12 = 11;
    component12 = async () => component_cache12 ?? (component_cache12 = (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default);
    imports12 = ["_app/immutable/nodes/11.bcd0065e.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/Feedback.71be6ba8.js"];
    stylesheets12 = [];
    fonts12 = [];
  }
});

// .svelte-kit/output/server/chunks/invoice_store.js
function createInvoiceItems() {
  const invoiceItems2 = writable([]);
  return invoiceItems2;
}
var invoiceItems;
var init_invoice_store = __esm({
  ".svelte-kit/output/server/chunks/invoice_store.js"() {
    init_chunks();
    invoiceItems = createInvoiceItems();
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/invoice/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page7
});
var Page7;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/invoice/_page.svelte.js"() {
    init_ssr();
    init_invoice_store();
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let selectedItem;
      let fixedPrice;
      let $invoiceItems, $$unsubscribe_invoiceItems;
      $$unsubscribe_invoiceItems = subscribe(invoiceItems, (value) => $invoiceItems = value);
      function handleClickOutside(event) {
        selectedItem.new = false;
      }
      selectedItem = {
        new: false,
        item: {
          title: "",
          tags: [],
          captions: "",
          description: "",
          price: "",
          location: "",
          image: "",
          packageType: "",
          productType: "",
          picesPerBox: "0",
          discount: "0",
          netPrice: "0",
          objectID: ""
        }
      };
      fixedPrice = false;
      $$unsubscribe_invoiceItems();
      return `<div class="p-2 min-h-[100vh] max-w-[1100px]"><div class="fixed top-[5px] right-[20px] z-100" style="z-index:10000"><button class="hover:bg-gray-300 font-bold px-4 rounded h-[55px] py-2"><img src="/images/icons/invoice.svg" alt="invoice" class="w-6 h-6"> <span>${escape($invoiceItems.length.toString())}</span></button></div> <div class="${"flex flex-col justify-center items-center use:clickOutside on:click_outside=" + escape(handleClickOutside, true)}"><div class="${[
        "mt-10 flex flex-col items-center",
        selectedItem.new == false ? "min-h-[300px]" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-1c4pj6r"><div id="autocomplete" class="h-full w-[350px]"></div></div> <h3 data-svelte-h="svelte-f8er3d">New Item</h3> <div class="relative flex flex-col">${selectedItem.new ? `  <div class="${[
        "inset-0 bg-gray-300 bg-opacity-75 transition-opacity",
        selectedItem.new ? "fixed" : ""
      ].join(" ").trim()}"></div> <div class="relative w-[500px] h-[600px] rounded-md"><div class="absolute top-0 left-0 px-6 flex flex-col justify-between gap-3 w-full py-8"><div class="flex justify-center items-center"><h3 class="font-semibold w-1/3 text-center" data-svelte-h="svelte-1hwmffc">Item Name:</h3> <input type="text" class="input w-2/3" style="background-color: #f3f3f3 !important"${add_attribute("value", selectedItem.item.title, 0)}></div> <div class="flex justify-center items-center"><h3 class="font-semibold w-1/3 text-center" data-svelte-h="svelte-9sc1ll">Item Description:</h3> <input type="text" class="input w-2/3" style="background-color: #f3f3f3 !important"${add_attribute("value", selectedItem.item.description, 0)}></div> <div class="flex justify-center items-center"><h3 class="font-semibold w-1/3 text-center" data-svelte-h="svelte-khdjkc">Qty Type:</h3> <select class="select w-2/3"><option value="pcs" data-svelte-h="svelte-119yied">Pieces</option><option value="box" data-svelte-h="svelte-swjv9g">Box</option><option value="ctn" data-svelte-h="svelte-a78e64">Carton</option><option value="lgs" data-svelte-h="svelte-17w86nt">LBs</option></select></div> <div class="flex justify-center items-center"><h3 class="font-semibold w-1/3 text-center" data-svelte-h="svelte-14y71tq">Qty:</h3> <input type="number" class="input w-2/3" style="background-color: #f3f3f3 !important"${add_attribute("value", selectedItem.item.picesPerBox, 0)}></div> <div class="flex justify-center items-center"><h3 class="font-semibold w-1/3 text-center" data-svelte-h="svelte-wpm029">Price:</h3> <div class="flex gap-2 w-2/3"><input type="number" class="input w-2/3" style="background-color: #f3f3f3 !important"${add_attribute("value", selectedItem.item.price, 0)}> <label class="label w-1/3" for="priceFixed"><input type="checkbox" id="priceFixed" name="priceFixed" class="checkbox"${add_attribute("checked", fixedPrice, 1)}> <span class="font-semibold" data-svelte-h="svelte-bies79">Fixed Price</span></label></div></div> <div class="flex justify-center items-center"><h3 class="font-semibold w-1/3 text-center" data-svelte-h="svelte-19qbuuz">Discount:</h3> <input type="number" class="input w-2/3" style="background-color: #f3f3f3 !important"${add_attribute("value", selectedItem.item.discount, 0)}></div> <div class="flex justify-center items-center"><h3 class="font-semibold w-1/3 text-center" data-svelte-h="svelte-jdf6c">Total:</h3> <input type="number" class="input w-2/3" style="background-color: #f3f3f3 !important"${add_attribute("value", selectedItem.item.netPrice, 0)}></div> <div class="mt-4 flex flex-col justify-center items-center gap-5 w-full"><button class="btn btn-primary w-[300px]" style="color:white" data-svelte-h="svelte-13wq9c3">Add to Bill</button> <button class="btn w-[300px]" style="color:white;background-color: red" data-svelte-h="svelte-1nrx3wx">Cancel</button></div></div></div>` : ``}</div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  component: () => component13,
  fonts: () => fonts13,
  imports: () => imports13,
  index: () => index13,
  stylesheets: () => stylesheets13
});
var index13, component_cache13, component13, imports13, stylesheets13, fonts13;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    index13 = 12;
    component13 = async () => component_cache13 ?? (component_cache13 = (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default);
    imports13 = ["_app/immutable/nodes/12.0f986997.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/invoice_store.304e6090.js", "_app/immutable/chunks/index.ba125b59.js"];
    stylesheets13 = [];
    fonts13 = [];
  }
});

// .svelte-kit/output/server/chunks/Logo.js
var Logo;
var init_Logo = __esm({
  ".svelte-kit/output/server/chunks/Logo.js"() {
    init_ssr();
    Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg width="556" height="188" viewBox="0 0 556 188" fill="" xmlns="http://www.w3.org/2000/svg" class="h-[40px] w-[130px]"><path d="M107.355 49.7018C114.201 49.8895 120.837 47.3497 125.817 42.6567C128.236 40.4151 130.146 37.6766 131.427 34.651C132.719 31.6143 133.348 28.3458 133.282 25.0441C133.359 21.7093 132.73 18.3966 131.449 15.3158C130.157 12.235 128.247 9.46332 125.817 7.17755C120.782 2.56183 114.201 0 107.377 0C100.553 0 93.9602 2.56183 88.9359 7.17755C86.5066 9.46332 84.5852 12.235 83.3043 15.3158C82.0124 18.3966 81.394 21.7093 81.4713 25.0441C81.405 28.3458 82.0345 31.6143 83.3264 34.651C84.6184 37.6876 86.5287 40.4151 88.9359 42.6567C93.905 47.3497 100.53 49.8784 107.355 49.7018Z" fill="#1B2752"></path><path d="M0 117.348H41.9169L17.9218 163.703H80.2891L131.04 65.7686H26.7557L0 117.348Z" fill="#1B2752"></path><path d="M39.3112 122.781L41.608 117.348H104.185L38.4609 124.028" fill="#1B2752" fill-opacity="0.6"></path><path d="M243.986 36.7212C246.582 36.791 249.099 35.8301 250.988 34.0489C251.904 33.1973 252.629 32.162 253.118 31.0108C253.606 29.8595 253.845 28.6182 253.821 27.368C253.85 26.1033 253.613 24.8465 253.125 23.6794C252.637 22.5123 251.909 21.4609 250.988 20.5935C249.08 18.8414 246.584 17.8691 243.993 17.8691C241.403 17.8691 238.906 18.8414 236.998 20.5935C236.077 21.4609 235.349 22.5123 234.861 23.6794C234.373 24.8465 234.136 26.1033 234.166 27.368C234.141 28.6182 234.381 29.8595 234.869 31.0108C235.357 32.162 236.083 33.1973 236.998 34.0489C238.883 35.8281 241.395 36.7889 243.986 36.7212Z" fill="#1B2752"></path><path d="M252.324 42.8139H213.762V36.3067C213.756 35.8988 213.834 35.4941 213.99 35.1172C214.146 34.7404 214.378 34.3995 214.671 34.1154C214.954 33.8213 215.295 33.5889 215.672 33.4325C216.049 33.2762 216.454 33.1993 216.862 33.2068H226.696V19.6445H213.228C208.239 19.6445 204.324 21.0653 201.483 23.907C198.637 26.753 197.207 30.6814 197.207 35.6654V42.8139H188.027V56.3762H197.207V97.6108H213.762V56.3762H235.662V73.9604H252.324V42.8139Z" fill="#1B2752"></path><path d="M252.311 97.611H252.324V85.5586H235.662V85.9461H252.311V97.611Z" fill="#1B2752"></path><path d="M268.453 47.1967C265.611 50.0383 264.186 53.9533 264.177 58.9417V97.6109H280.692V60.0107C280.669 59.5147 280.752 59.0196 280.937 58.5586C281.121 58.0976 281.402 57.6815 281.761 57.3383C282.449 56.6745 283.371 56.3095 284.326 56.3228H296.178V42.9209H280.304C275.218 42.9209 271.267 44.3461 268.453 47.1967Z" fill="#1B2752"></path><path d="M310.796 75.3371C313.875 76.5499 317.161 77.149 320.47 77.1009H330.131C330.803 77.0916 331.466 77.2574 332.055 77.5819C332.605 77.908 333.065 78.3675 333.391 78.9181C333.75 79.4949 333.936 80.1628 333.926 80.8422C333.924 81.4865 333.739 82.117 333.391 82.6594C333.061 83.2072 332.603 83.666 332.055 83.9956C331.464 84.3145 330.802 84.48 330.131 84.4766H303.701V97.6113H332.429C335.593 97.6556 338.709 96.843 341.448 95.2596C344.085 93.7336 346.292 91.5636 347.862 88.9528C349.465 86.3173 350.299 83.2855 350.267 80.2008C350.415 76.7269 349.582 73.2816 347.862 70.2596C346.293 67.7252 343.951 65.7624 341.181 64.661C337.893 63.4124 334.395 62.8134 330.879 62.8972H321.526C321.061 62.9044 320.599 62.8181 320.167 62.6434C319.736 62.4687 319.344 62.2091 319.015 61.8801C318.686 61.5511 318.427 61.1594 318.252 60.7281C318.077 60.2969 317.991 59.8349 317.998 59.3697C317.99 58.928 318.077 58.4896 318.252 58.0841C318.427 57.6785 318.687 57.315 319.014 57.018C319.348 56.6993 319.742 56.4502 320.173 56.285C320.605 56.1199 321.064 56.042 321.526 56.056H345.337V42.8144H318.867C315.786 42.7827 312.754 43.5812 310.088 45.126C307.495 46.6205 305.328 48.7552 303.795 51.3259C302.255 53.9051 301.459 56.8604 301.496 59.8641C301.335 63.3319 302.21 66.7693 304.008 69.7385C305.636 72.2628 308.008 74.2191 310.796 75.3371Z" fill="#1B2752"></path><path d="M379.209 42.8145H362.547V56.3767H379.209V42.8145Z" fill="#1B2752"></path><path d="M394.268 42.8145H379.209V56.3767H394.268V42.8145Z" fill="#1B2752"></path><path d="M362.533 42.8145H353.567V56.3767H362.533V42.8145Z" fill="#1B2752"></path><path d="M379.209 29.4658H362.547V42.8143H379.209V29.4658Z" fill="#1B2752"></path><path d="M362.546 81.5897C362.434 83.7262 362.754 85.8633 363.489 87.8726C364.224 89.8819 365.358 91.7217 366.822 93.2814C369.664 96.1675 373.614 97.6106 378.674 97.6106H394.267V83.7276H382.242C381.834 83.7335 381.429 83.656 381.052 83.4997C380.675 83.3435 380.334 83.1118 380.05 82.819C379.756 82.5359 379.524 82.1952 379.368 81.8181C379.211 81.4411 379.134 81.0358 379.142 80.6277V56.376H362.546V81.5897Z" fill="#1B2752"></path><path d="M216.702 130.962C213.41 129.713 209.907 129.114 206.387 129.198H197.034C196.568 129.205 196.106 129.119 195.675 128.944C195.244 128.769 194.852 128.51 194.523 128.181C194.194 127.852 193.935 127.46 193.76 127.029C193.585 126.597 193.499 126.136 193.506 125.67C193.498 125.229 193.584 124.79 193.759 124.385C193.935 123.979 194.194 123.616 194.522 123.319C194.857 123.001 195.251 122.753 195.682 122.588C196.113 122.423 196.572 122.344 197.034 122.357H220.844V109.115H194.428C191.334 109.087 188.29 109.899 185.623 111.467C183.026 112.956 180.854 115.086 179.316 117.653C177.777 120.238 176.982 123.197 177.017 126.205C176.863 129.672 177.737 133.107 179.53 136.079C181.18 138.595 183.57 140.537 186.371 141.638C189.445 142.851 192.727 143.45 196.031 143.401H205.639C206.311 143.391 206.974 143.557 207.563 143.882C208.113 144.208 208.573 144.668 208.899 145.219C209.261 145.794 209.447 146.463 209.433 147.143C209.432 147.787 209.246 148.418 208.899 148.96C208.574 149.512 208.114 149.971 207.563 150.296C206.974 150.622 206.311 150.788 205.639 150.777H179.262V163.912H207.99C211.159 163.967 214.283 163.153 217.023 161.56C219.652 160.035 221.854 157.87 223.423 155.267C225.027 152.631 225.86 149.599 225.828 146.515C225.976 143.041 225.143 139.596 223.423 136.574C221.845 134.029 219.488 132.061 216.702 130.962Z" fill="#1B2752"></path><path d="M279.716 111.039C275.879 108.802 271.489 107.691 267.049 107.833C264.444 107.838 261.854 108.235 259.366 109.008C256.798 109.796 254.404 111.066 252.311 112.75V97.6108H235.662V85.9326V163.899H252.324V132.726C252.292 130.844 252.792 128.991 253.767 127.381C254.741 125.806 256.102 124.508 257.721 123.609C259.34 122.711 261.162 122.243 263.014 122.25C264.873 122.231 266.701 122.731 268.292 123.693C269.875 124.635 271.198 125.958 272.14 127.541C273.118 129.204 273.617 131.104 273.583 133.033V163.899H290.138V132.392C290.198 128.045 289.285 123.74 287.466 119.792C285.802 116.174 283.106 113.129 279.716 111.039Z" fill="#1B2752"></path><path d="M252.311 85.9463H235.662V97.6112H252.311V85.9463Z" fill="#1B2752"></path><path d="M319.174 109.115H302.512V163.899H319.174V109.115Z" fill="#1B2752"></path><path d="M381.347 116.224C378.773 113.516 375.641 111.4 372.168 110.024C368.232 108.504 364.04 107.76 359.821 107.832C354.428 107.709 349.094 108.979 344.335 111.52C340.021 113.909 336.483 117.484 334.14 121.822C331.618 126.663 330.367 132.066 330.505 137.523V187.082H347.061V157.926H347.381C348.445 159.51 349.806 160.871 351.39 161.935C353.036 163.018 354.839 163.842 356.735 164.38C358.763 164.963 360.864 165.251 362.975 165.235C367.768 165.345 372.498 164.129 376.644 161.721C380.559 159.369 383.757 155.991 385.89 151.953C388.198 147.518 389.356 142.575 389.257 137.576C389.304 133.517 388.616 129.484 387.226 125.671C385.929 122.155 383.929 118.94 381.347 116.224ZM370.778 143.722C369.818 145.77 368.322 147.52 366.449 148.787C364.467 150.081 362.134 150.734 359.768 150.657C357.403 150.721 355.075 150.069 353.087 148.787C351.196 147.54 349.695 145.784 348.758 143.722C347.727 141.44 347.216 138.957 347.261 136.453C347.22 133.937 347.731 131.442 348.758 129.145C349.684 127.058 351.186 125.278 353.087 124.014C355.077 122.738 357.404 122.086 359.768 122.143C362.133 122.072 364.464 122.725 366.449 124.014C368.333 125.296 369.831 127.071 370.778 129.145C371.835 131.434 372.365 133.932 372.328 136.453C372.369 138.963 371.839 141.448 370.778 143.722Z" fill="#1B2752"></path><path d="M446.98 116.224C444.401 113.516 441.264 111.4 437.787 110.024C433.856 108.504 429.668 107.76 425.454 107.833C420.06 107.707 414.726 108.977 409.968 111.521C405.634 113.901 402.076 117.477 399.719 121.823C397.197 126.664 395.946 132.066 396.085 137.523V187.082H412.64V157.926H412.974C414.037 159.51 415.399 160.871 416.982 161.935C418.63 163.017 420.432 163.841 422.327 164.38C424.36 164.962 426.466 165.25 428.581 165.235C433.374 165.345 438.104 164.129 442.25 161.721C446.164 159.373 449.358 155.994 451.483 151.954C453.791 147.518 454.949 142.575 454.85 137.576C454.897 133.518 454.209 129.484 452.819 125.671C451.534 122.158 449.548 118.944 446.98 116.224ZM436.397 143.723C435.441 145.773 433.945 147.524 432.068 148.787C430.107 150.073 427.798 150.726 425.454 150.657C423.089 150.722 420.76 150.07 418.773 148.787C416.876 147.547 415.374 145.789 414.444 143.723C413.413 141.44 412.902 138.958 412.947 136.454C412.906 133.937 413.417 131.443 414.444 129.145C415.365 127.011 416.906 125.203 418.867 123.955C420.827 122.707 423.117 122.076 425.441 122.143C427.784 122.082 430.091 122.734 432.055 124.014C433.943 125.293 435.441 127.068 436.384 129.145C437.441 131.434 437.971 133.932 437.934 136.454C437.979 138.962 437.454 141.447 436.397 143.723Z" fill="#1B2752"></path><path d="M502.365 111.467C497.981 108.915 492.964 107.655 487.894 107.833C483.062 107.781 478.299 108.978 474.065 111.307C469.896 113.623 466.444 117.038 464.084 121.181C461.481 125.88 460.189 131.192 460.342 136.561C460.236 141.589 461.586 146.54 464.23 150.818C466.91 154.987 470.706 158.321 475.187 160.439C480.295 162.837 485.888 164.021 491.529 163.899H507.763V150.23H490.994C488.892 150.261 486.799 149.954 484.794 149.321C483.051 148.779 481.471 147.81 480.198 146.502C478.975 145.183 478.13 143.558 477.753 141.799H513.629C513.808 140.827 513.933 139.845 514.003 138.859C514.11 137.617 514.164 136.534 514.164 135.599C514.263 130.665 513.244 125.773 511.184 121.288C509.254 117.232 506.191 113.822 502.365 111.467ZM477.325 131.51C477.541 130.217 477.876 128.947 478.327 127.715C478.781 126.501 479.451 125.378 480.305 124.402C481.198 123.416 482.291 122.633 483.512 122.103C486.014 121.086 488.792 120.973 491.368 121.783C492.329 122.122 493.23 122.609 494.041 123.226C494.823 123.843 495.519 124.562 496.112 125.364C496.739 126.211 497.193 127.174 497.448 128.196C497.746 129.283 497.961 130.391 498.089 131.51H477.325Z" fill="#1B2752"></path><path d="M539.483 109.263C534.419 109.263 530.477 110.692 527.618 113.538C524.758 116.385 523.355 120.3 523.355 125.284V163.939H539.911V126.312C539.884 125.816 539.966 125.32 540.15 124.858C540.335 124.397 540.618 123.981 540.98 123.64C541.318 123.308 541.719 123.048 542.16 122.873C542.6 122.699 543.071 122.614 543.545 122.625H555.397V109.263H539.483Z" fill="#1B2752"></path></svg>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/invoice/_slug_/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => Page8
});
var Page8;
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/invoice/_slug_/_page.svelte.js"() {
    init_ssr();
    init_Logo();
    init_invoice_store();
    Page8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $invoiceItems, $$unsubscribe_invoiceItems;
      $$unsubscribe_invoiceItems = subscribe(invoiceItems, (value) => $invoiceItems = value);
      let { data } = $$props;
      console.log("invoiceItems are", $invoiceItems);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$unsubscribe_invoiceItems();
      return `<div class="p-2 min-h-[100vh]"><div class="flex max-w-[900px] flex-col px-6 py-12 ml-8" id="bol"><div class="mb-2 flex justify-between"><div class="w-1/2">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div> <div class="flex h-full w-1/2 flex-col place-items-end self-end" data-svelte-h="svelte-vg6jik"><h3 class="text-2xl font-bold" style="font-size:30px;">Invoice</h3> <h3 class="font-bold" style="font-size:20px">Invoice #12365</h3></div></div> <div class="flex w-full flex-col" style="margin-top:15px;"><div class="flex w-1/2 flex-col gap-1"><a class="block"${add_attribute("href", `tel:${data?.quoteRequest?.pickup?.contact?.phoneNumber}`, 0)}><span class="personName" style="text-transform:capitalize">${escape(data?.quoteRequest?.pickup?.contact?.name || "")}</span></a> <h4 class="text-uppercase companyName mb-1 text-[20px] font-bold" style="font-size: 16px">${escape(data?.quoteRequest?.pickup?.companyName)}</h4> <h4 class="">${escape(data?.quoteRequest?.pickup?.address?.addressLine1)}</h4> <h4 class="">${escape(data?.quoteRequest?.pickup?.address?.city)}, ${escape(data?.quoteRequest?.pickup?.address?.state)}, ${escape(data?.quoteRequest?.pickup?.address?.zipCode)}</h4> <a${add_attribute("href", `tel:${data?.quoteRequest?.pickup?.contact?.emailAddress}`, 0)}>Email: ${escape(data?.quoteRequest?.pickup?.contact?.emailAddress)}</a> <a class="block"${add_attribute("href", `tel:${data?.quoteRequest?.pickup?.contact?.phoneNumber}`, 0)}>Phone: ${escape(data?.quoteRequest?.pickup?.contact?.phoneNumber)}</a></div> <h3 class="mt-2 text-2xl font-bold" data-svelte-h="svelte-ax5wlm">Bill To</h3> <div class="flex w-[300px] gap-2 border-b-[1px] border-gray-500"></div> <div class="flex w-full justify-between"><div class="flex w-1/2 flex-col gap-1 py-3"><lable for="billTo" class="font-bold" data-svelte-h="svelte-on7f4h">Name</lable> <input type="text" class="py-1 px-2 max-w-[300px]"${add_attribute("value", data.quoteRequest.delivery.contact.name, 0)}> <div class="mb-1 flex flex-col" style="font-size: 14px;"><lable for="billTo" class="font-bold" data-svelte-h="svelte-snf4n0">Company Name</lable> <input type="text" class="py-1 px-2 max-w-[300px]"${add_attribute("value", data.quoteRequest.delivery.companyName, 0)}></div> <div class="mb-1 flex flex-col" style="font-size: 14px;"><lable for="billTo" class="font-bold" data-svelte-h="svelte-2bx9yz">Steet</lable> <input type="text" class="py-1 px-2 max-w-[300px]"${add_attribute("value", data.quoteRequest.delivery.address.addressLine1, 0)}></div> <div class="flex gap-3 w-[300px]"><div class="mb-1 flex flex-col w-1/2" style="font-size: 14px;"><lable for="billTo" class="font-bold" data-svelte-h="svelte-1yqlyhp">City</lable> <input type="text" class="py-1 px-2 w-full"${add_attribute("value", data.quoteRequest.delivery.address.city, 0)}></div> <div class="mb-1 flex flex-col w-1/2" style="font-size: 14px;"><lable for="billTo" class="font-bold w-full" data-svelte-h="svelte-1fr1dg">State</lable> <input type="text" class="py-1 px-2 w-full"${add_attribute("value", data.quoteRequest.delivery.address.state, 0)}></div></div> <div class="mb-1 flex flex-col" style="font-size: 14px;"><lable for="billTo" class="font-bold" data-svelte-h="svelte-9hz10w">Country</lable> <input type="text" class="py-1 px-2 max-w-[300px]"${add_attribute("value", data.quoteRequest.delivery.address.country, 0)}></div> <div class="mb-1 flex flex-col" style="font-size: 14px;"><lable for="billTo" class="font-bold" data-svelte-h="svelte-i0dj2">Email</lable> <input type="text" class="py-1 px-2 max-w-[300px]"${add_attribute("value", data.quoteRequest.delivery.contact.emailAddress, 0)}></div> <div class="mb-1 flex flex-col" style="font-size: 14px;"><lable for="billTo" class="font-bold" data-svelte-h="svelte-1o08yya">Phone</lable> <input type="text" class="py-1 px-2 max-w-[300px]"${add_attribute("value", data.quoteRequest.delivery.contact.phoneNumber, 0)}></div></div> <div class="flex w-1/2 flex-col place-items-end py-3"><div class="flex flex-col gap-1"><h3 class="text-2xl" data-svelte-h="svelte-fqfczt">Balance Due: $279.396</h3> <h3 class="text-xl" data-svelte-h="svelte-3mf03r">Term: 0</h3> <h3 class="text-xl">Due Date: ${escape((/* @__PURE__ */ new Date()).toLocaleDateString().split("T")[0])}</h3></div></div></div></div> <table class=""><thead class="" style="background-color:blue;!important" data-svelte-h="svelte-1xdflu4"><tr class="" style="background-color:blue;!important"><th class="">SN</th> <th class="">Description</th> <th class="">Quantity</th> <th class="">Unit Price</th> <th class="">Amount</th></tr></thead> <tbody>${each($invoiceItems, (item, index28) => {
        return `<tr><td>${escape(index28)}</td> <td>${escape(item.item.description)}</td> <td>${escape(item.item.picesPerBox)}</td> <td>${escape(item.item.price)}</td> <td>$${escape(item.item.price)}</td> </tr>`;
      })}</tbody> <tfoot data-svelte-h="svelte-qjv47g"><tr><td colspan="4" class="text-right">Subtotal</td> <td></td></tr> <tr><td colspan="4" class="text-right">Discount</td> <td></td></tr> <tr><td colspan="4" class="text-right">Tax</td> <td></td></tr> <tr><td colspan="4" class="text-right">Total</td> <td></td></tr></tfoot></table> <div class="flex flex-col gap-1 pt-4" data-svelte-h="svelte-bx4j71"><h3 class="font-bold">Notes</h3> <div class="flex w-full gap-2 border-b-[1px] border-gray-500"></div> <div class="flex flex-col gap-1"><textarea class="w-full p-3 shadow-sm" rows="1"></textarea></div> <div><h3 class="font-bold">Terms &amp; Conditions</h3> <div class="flex w-full gap-2 border-b-[1px] border-gray-500"></div> <div class="flex flex-col gap-1"><textarea class="w-full p-3 shadow-sm" rows="1"></textarea></div></div> <div><h3 class="font-bold">Payment Instructions</h3> <div class="flex w-full gap-2 border-b-[1px] border-gray-500"></div> <div class="flex flex-col gap-1"><textarea class="w-full p-3 shadow-sm" rows="1"></textarea></div></div> <div><h3 class="pt-5 font-bold">Thank you for your business</h3></div></div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  component: () => component14,
  fonts: () => fonts14,
  imports: () => imports14,
  index: () => index14,
  stylesheets: () => stylesheets14
});
var index14, component_cache14, component14, imports14, stylesheets14, fonts14;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    index14 = 13;
    component14 = async () => component_cache14 ?? (component_cache14 = (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default);
    imports14 = ["_app/immutable/nodes/13.070268f7.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/Logo.02de4488.js", "_app/immutable/chunks/invoice_store.304e6090.js", "_app/immutable/chunks/index.ba125b59.js"];
    stylesheets14 = [];
    fonts14 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/quote/_page.server.ts.js
var page_server_ts_exports4 = {};
__export(page_server_ts_exports4, {
  load: () => load6
});
async function load6({ setHeaders, locals }) {
  const session = locals.session.userId;
  if (!session)
    throw redirect(302, "/login");
  setHeaders({
    "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
    "Pragma": "no-cache",
    "Expires": "0",
    "language": "en"
  });
}
var init_page_server_ts4 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/quote/_page.server.ts.js"() {
    init_page_server();
  }
});

// .svelte-kit/output/server/chunks/QuoteDeliveryZip.js
var QuotePickupZip, QuoteDeliveryZip;
var init_QuoteDeliveryZip = __esm({
  ".svelte-kit/output/server/chunks/QuoteDeliveryZip.js"() {
    init_ssr();
    init_delivery_store();
    QuotePickupZip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $pickupStore, $$unsubscribe_pickupStore;
      let $quotePickupErrorsStore, $$unsubscribe_quotePickupErrorsStore;
      $$unsubscribe_pickupStore = subscribe(pickupStore, (value) => $pickupStore = value);
      $$unsubscribe_quotePickupErrorsStore = subscribe(quotePickupErrorsStore, (value) => $quotePickupErrorsStore = value);
      $$unsubscribe_pickupStore();
      $$unsubscribe_quotePickupErrorsStore();
      return `${$pickupStore?.address ? `<label for="pickupZipCode" class="sr-only" data-svelte-h="svelte-ghm0v7">Pickup Zip Code</label> <input form="quoteForm" id="pickupZipCode" required style="background-color:#ffffff;" class="input w-full" placeholder="pickup zip code" type="text"${add_attribute("value", $pickupStore.address.zipCode, 0)}>` : ``} ${!$quotePickupErrorsStore.pickupZipCode.valid ? `<div class="py-1 text-red-500 error" data-svelte-h="svelte-2ubpi2">pickup zip code is not valid</div>` : ``}`;
    });
    QuoteDeliveryZip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $deliveryStore, $$unsubscribe_deliveryStore;
      let $quoteDeliveryErrorsStore, $$unsubscribe_quoteDeliveryErrorsStore;
      $$unsubscribe_deliveryStore = subscribe(deliveryStore, (value) => $deliveryStore = value);
      $$unsubscribe_quoteDeliveryErrorsStore = subscribe(quoteDeliveryErrorsStore, (value) => $quoteDeliveryErrorsStore = value);
      $$unsubscribe_deliveryStore();
      $$unsubscribe_quoteDeliveryErrorsStore();
      return `${$deliveryStore?.address ? `<label for="deliveryZipCode" class="sr-only" data-svelte-h="svelte-15tmhun">Delivery Zip Code</label> <input form="quoteForm" type="text" required id="deliveryZipCode" style="background-color:#ffffff;" class="input w-full" placeholder="delivery zip code"${add_attribute("value", $deliveryStore.address.zipCode, 0)}>` : ``} ${!$quoteDeliveryErrorsStore.deliveryZipCode.valid ? `<div class="py-1 text-red-500 error" data-svelte-h="svelte-19jm0ni">delivery zip code is not valid</div>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/commodity_store.js
function getNewCommodity(position) {
  if (isEnvDev()) {
    return {
      density: 0,
      length: 48,
      width: 40,
      height: 65,
      weight: 800,
      dimensionDisplay: "",
      packageType: 1,
      quantity: 1,
      freightClass: 5,
      instructions: "",
      index: position,
      description: "novelties",
      dimensionUOM: {
        INCH: true,
        CM: false
      },
      weightUOM: {
        LB: true,
        KG: false
      },
      commodityServices: [0]
    };
  }
  const commodity = {
    density: 0,
    length: void 0,
    width: void 0,
    height: void 0,
    weight: void 0,
    dimensionDisplay: "",
    packageType: 0,
    quantity: void 0,
    freightClass: 0,
    instructions: "",
    index: position,
    description: "",
    dimensionUOM: {
      INCH: true,
      CM: false
    },
    weightUOM: {
      LB: true,
      KG: false
    },
    commodityServices: [0]
  };
  return commodity;
}
function initCommodityWorker() {
  let commodityStore2 = writable([getNewCommodity(0)]);
  return {
    commodityStore: commodityStore2
  };
}
function newItemErrors() {
  const itemErr = {
    description: {
      valid: true,
      message: "shipment description is invalid"
    },
    quantity: {
      valid: true,
      message: "shipment quantity is invalid"
    },
    weight: {
      valid: true,
      message: "weight is invalid"
    },
    length: {
      valid: true,
      message: "length is invalid"
    },
    width: {
      valid: true,
      message: "width is invalid"
    },
    height: {
      valid: true,
      message: "height is invalid"
    },
    packageType: {
      valid: true,
      message: "package type is invalid"
    },
    freightClass: {
      valid: true,
      message: "freight class is invalid"
    },
    weightUOM: {
      valid: true,
      message: "please provide weight in Lbs"
    },
    dimensionUOM: {
      valid: true,
      message: "please provide dimensions in Inches"
    }
  };
  return itemErr;
}
function initItemErrorData() {
  const quoteItemErrors = writable(newItemErrors());
  return quoteItemErrors;
}
var commodityStore;
var init_commodity_store = __esm({
  ".svelte-kit/output/server/chunks/commodity_store.js"() {
    init_config2();
    init_Toaster_svelte_svelte_type_style_lang();
    init_chunks();
    init_freight_class();
    ({ commodityStore } = initCommodityWorker());
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/quote/_page.svelte.js
var page_svelte_exports9 = {};
__export(page_svelte_exports9, {
  default: () => Page9
});
var Pickup, Delivery, css$13, Item, css8, Page9;
var init_page_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/quote/_page.svelte.js"() {
    init_ssr();
    init_Toaster_svelte_svelte_type_style_lang();
    init_QuoteDeliveryZip();
    init_delivery_store();
    init_package_type();
    init_commodity_store();
    init_freight_class();
    init_basic_store();
    Pickup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $pickupStore, $$unsubscribe_pickupStore;
      $$unsubscribe_pickupStore = subscribe(pickupStore, (value) => $pickupStore = value);
      $$unsubscribe_pickupStore();
      return `<div class="py-4 flex flex-col gap-1">${$pickupStore && $pickupStore.address ? `<div class="mb-3 flex flex-col"><label class="pb-1" for="shipper_zipcode" data-svelte-h="svelte-fri6o0"><span>Pickup Zip Code</span></label> ${validate_component(QuotePickupZip, "QuotePickupZip").$$render($$result, {}, {}, {})}</div> <div class="min-w-[300px]"><label class="label" for="locationType" data-svelte-h="svelte-wt96q9">Pickup Location Type *</label> <select class="select" style="width:100%;background-color:#fff;" id="locationType">${each(getLocationTypes(), (locationType, index28) => {
        return `${index28 == 0 ? `<option${add_attribute("value", 0, 0)} selected disabled data-svelte-h="svelte-z960t2">Location type</option>` : `<option${add_attribute("value", locationType.locationType, 0)}${add_attribute("label", locationType.name, 0)}>${escape(locationType.name)}</option>`}`;
      })}</select></div> <div class="flex flex-wrap gap-x-6 mt-3"><label for="hasLoadingDockPickup" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="hasLoadingDockPickup" type="checkbox" name="hasLoadingDockPickup" ${$pickupStore.locationServices.includes(1) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-x3a6r">Has Loading Dock</span></label> <label for="liftgatePickup" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="liftgatePickup" type="checkbox" name="liftgatePickup" ${$pickupStore.locationServices.includes(2) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-ak2pq5">Needs Liftgate</span></label> <label for="insidePickup" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="insidePickup" type="checkbox" name="insidePickup" ${$pickupStore.locationServices.includes(3) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-1qfr7iq">Inside Pickup</span></label> <label for="appointmentPickup" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="appointmentPickup" type="checkbox" name="appointmentPickup" ${$pickupStore.locationServices.includes(4) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-18dk09u">Needs appointment</span></label></div>` : ``}</div>`;
    });
    Delivery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $deliveryStore, $$unsubscribe_deliveryStore;
      $$unsubscribe_deliveryStore = subscribe(deliveryStore, (value) => $deliveryStore = value);
      $$unsubscribe_deliveryStore();
      return `<div class="py-4 flex flex-col gap-1">${$deliveryStore && $deliveryStore?.address ? `<div class="mb-3 flex flex-col"><label class="pb-1" for="shipper_zipcode" data-svelte-h="svelte-1bo60k0"><span>Delivery Zip Code</span></label> ${validate_component(QuoteDeliveryZip, "QuoteDeliveryZip").$$render($$result, {}, {}, {})}</div> <div class="min-w-[300px]"><label class="label" for="locationType" data-svelte-h="svelte-1dlrioh">Delivery Location Type *</label> <select class="select" style="width:100%;background-color:#fff;" id="locationType">${each(getLocationTypes(), (locationType, index28) => {
        return `${index28 == 0 ? `<option${add_attribute("value", 0, 0)} selected disabled data-svelte-h="svelte-1bgi512">Location Type</option>` : `<option${add_attribute("value", locationType.locationType, 0)}${add_attribute("label", locationType.name, 0)}>${escape(locationType.name)}</option>`}`;
      })}</select></div> <div class="flex flex-wrap gap-x-6 mt-3"><label for="hasLoadingDockDelivery" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="hasLoadingDockDelivery" type="checkbox" name="hasLoadingDockDelivery" ${$deliveryStore.locationServices.includes(1) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-x3a6r">Has Loading Dock</span></label> <label for="liftgateDelivery" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="liftgateDelivery" type="checkbox" name="liftgateDelivery" ${$deliveryStore.locationServices.includes(2) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-ak2pq5">Needs Liftgate</span></label> <label for="insideDelivery" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="insideDelivery" type="checkbox" name="insideDelivery" ${$deliveryStore.locationServices.includes(3) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-eszg0u">Inside Delivery</span></label> <label for="needAppointmentDelivery" class="flex w-full items-center py-1 sm:w-auto"><input class="checkbox" style="height: 40px;width: 40px;" id="needAppointmentDelivery" type="checkbox" name="needAppointmentDelivery" ${$deliveryStore.locationServices.includes(4) ? "checked" : ""}> <span class="ml-3" data-svelte-h="svelte-11mw9aa">Needs Appointment</span></label></div>` : ``}</div>`;
    });
    css$13 = {
      code: "button.svelte-1wlk632{color:white !important}span.svelte-1wlk632,label.svelte-1wlk632{color:#1d1d1d;font-weight:700;font-size:16px}",
      map: null
    };
    Item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $commodityStore, $$unsubscribe_commodityStore;
      let $quoteItemErrorsStore, $$unsubscribe_quoteItemErrorsStore;
      $$unsubscribe_commodityStore = subscribe(commodityStore, (value) => $commodityStore = value);
      let { bgColor = "" } = $$props;
      let quoteItemErrorsStore = initItemErrorData();
      $$unsubscribe_quoteItemErrorsStore = subscribe(quoteItemErrorsStore, (value) => $quoteItemErrorsStore = value);
      if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
        $$bindings.bgColor(bgColor);
      $$result.css.add(css$13);
      $$unsubscribe_commodityStore();
      $$unsubscribe_quoteItemErrorsStore();
      return `${$commodityStore ? `${each($commodityStore, (commodity, index28) => {
        return `<div class="${[escape(bgColor, true), index28 != 0 ? "mt-4" : ""].join(" ").trim()}"${add_attribute("id", "item_" + index28, 0)}><div class="flex flex-col my-4"><div class="flex flex-row items-center h-[50px] mb-3"><span class="label font-bold svelte-1wlk632">Item ${escape(index28 + 1)}</span> <span class="ml-10 w-10 h-10 rounded-full svelte-1wlk632" style="background-color: rgba(252, 101, 60, 0.702)"><button type="button" class="h-full w-full svelte-1wlk632" data-svelte-h="svelte-v5qj43"><i class="fa-solid fa-trash-can w-[40px] text-white"></i></button> </span></div> <div class="flex w-full flex-col"><label class="my-1 svelte-1wlk632"${add_attribute("for", "description_" + index28, 0)} data-svelte-h="svelte-1x3a1hm"><span class="svelte-1wlk632">Shipment Description</span></label> <input type="text" required class="input w-full lg:w-[520px]" style="background-color:#ffffff;"${add_attribute("id", "description_" + index28, 0)} name="description" placeholder="what are you shipping?"${add_attribute("value", $commodityStore[index28]["description"], 0)}> ${!$quoteItemErrorsStore.description.valid ? `<span class="py-1 text-red-500 font-semibold svelte-1wlk632">${escape($quoteItemErrorsStore?.description?.message)}</span>` : ``}</div> <div class="flex gap-2 flex-wrap"><div class="mt-2 flex w-full flex-col sm:w-[150px]"><label class="my-1 w-full svelte-1wlk632"${add_attribute("for", "quantity_" + index28, 0)} data-svelte-h="svelte-adtm5j"><span class="svelte-1wlk632">Quantity</span></label> <input required class="input w-full" style="background-color:#ffffff;"${add_attribute("id", "quantity_" + index28, 0)} name="quantity" type="number" min="1" max="20" placeholder="quantity"${add_attribute("value", $commodityStore[index28].quantity, 0)}> ${!$quoteItemErrorsStore?.quantity?.valid ? `<span class="py-1 text-red-500 font-semibold error svelte-1wlk632">${escape($quoteItemErrorsStore?.quantity?.message)}</span>` : ``}</div> <div class="mt-2 flex w-full flex-col sm:w-[250px]"><label class="my-1 w-full svelte-1wlk632"${add_attribute("for", "packageType_" + index28, 0)} data-svelte-h="svelte-b1wp4n"><span class="svelte-1wlk632">Package Type</span></label> <select required form="quoteForm"${add_attribute("id", "packageType_" + index28, 0)} name="packageType" class="select w-full" style="background-color:#ffffff;">${each(allPackageTypes, (packageType2, index29) => {
          return `${index29 === 0 ? `<option${add_attribute("value", packageType2.value, 0)} ${packageType2.value === 0 ? "selected" : ""} ${packageType2.value === 0 ? "disabled" : ""} data-svelte-h="svelte-1i2p3k">Package Type
                  </option>` : `${packageType2.stringValue !== "UNRECOGNIZED" ? `<option${add_attribute("value", packageType2.value, 0)}${add_attribute("label", packageType2.name, 0)}>${escape(packageType2.name)} </option>` : ``}`}`;
        })}</select> ${!$quoteItemErrorsStore?.packageType?.valid ? `<span class="py-1 text-red-500 font-semibold error svelte-1wlk632">${escape($quoteItemErrorsStore?.packageType?.message)} </span>` : ``}</div> <div class="mt-2 flex w-full flex-col sm:w-[150px]"><label class="my-1 svelte-1wlk632"${add_attribute("for", "length_" + index28, 0)} data-svelte-h="svelte-1h9d9v2"><span class="svelte-1wlk632">Length</span></label> <input required${add_attribute("id", "length_" + index28, 0)} name="length" type="number" placeholder="inch" class="input" style="background-color:#ffffff;" autocomplete="on"${add_attribute("value", $commodityStore[index28]["length"], 0)}> ${!$quoteItemErrorsStore?.length?.valid ? `<span class="py-1 text-red-500 font-semibold error svelte-1wlk632">${escape($quoteItemErrorsStore?.length?.message)}</span>` : ``}</div> <div class="mt-2 flex w-full flex-col sm:w-[150px]"><label class="my-1 svelte-1wlk632"${add_attribute("for", "width_" + index28, 0)} data-svelte-h="svelte-13hnkje"><span class="svelte-1wlk632">Width</span></label> <input${add_attribute("id", "width_" + index28, 0)} name="width" type="number" placeholder="inch" required class="input" style="background-color:#ffffff;" autocomplete="on"${add_attribute("value", $commodityStore[index28]["width"], 0)}> ${!$quoteItemErrorsStore?.width?.valid ? `<span class="py-1 text-red-500 font-semibold error svelte-1wlk632">${escape($quoteItemErrorsStore?.width?.message)}</span>` : ``}</div> <div class="mt-2 flex w-full flex-col sm:w-[150px]"><label class="my-1 svelte-1wlk632"${add_attribute("for", "height_" + index28, 0)} data-svelte-h="svelte-1nbtmyu"><span class="svelte-1wlk632">Height</span></label> <input${add_attribute("id", "height_" + index28, 0)} name="height" type="number" placeholder="inch" required class="input" style="background-color:#ffffff;" autocomplete="on"${add_attribute("value", $commodityStore[index28]["height"], 0)}> ${!$quoteItemErrorsStore?.height?.valid ? `<span class="py-1 text-red-500 font-semibold error svelte-1wlk632">${escape($quoteItemErrorsStore?.height?.message)}</span>` : ``}</div> <div class="mt-2 flex w-full flex-col sm:w-[200px]"><label class="my-1 svelte-1wlk632"${add_attribute("for", "weight_" + index28, 0)} data-svelte-h="svelte-13rb6p4"><span class="svelte-1wlk632">Total Weight</span></label> <input type="number" class="input"${add_attribute("id", "weight_" + index28, 0)} name="weight" required style="background-color:#ffffff;" placeholder="total weight lbs"${add_attribute("value", $commodityStore[index28]["weight"], 0)}> ${!$quoteItemErrorsStore?.weight?.valid ? `<span class="py-1 text-red-500 font-semibold error svelte-1wlk632">${escape($quoteItemErrorsStore?.weight?.message)}</span>` : ``}</div> <div class="mt-2 flex w-full flex-col sm:w-[250px]"><label class="my-1 svelte-1wlk632"${add_attribute("for", "freightClass_" + index28, 0)} data-svelte-h="svelte-1jzh584"><span class="svelte-1wlk632">Freight Class</span></label> <select${add_attribute("id", "freightClass_" + index28, 0)} name="freightClass" required style="background-color:#ffffff;" class="select-accent select">${each(allFreightClasses, (freight, index29) => {
          return `${index29 == 0 ? `<option ${"selected"} ${"disabled"}${add_attribute("value", freight.value, 0)} data-svelte-h="svelte-1iii012">freight class
                  </option>` : `${freight.stringValue != "UNRECOGNIZED" ? `<option${add_attribute("value", freight.value, 0)}${add_attribute("label", freight.name, 0)}>${escape(freight.name)} </option>` : ``}`}`;
        })}</select> </div></div> <div class="flex w-full flex-col mt-3"><label class="my-1 svelte-1wlk632"${add_attribute("for", "commodityServices_" + index28, 0)} data-svelte-h="svelte-1bii47k"><span class="svelte-1wlk632">Item Services</span></label> <div class="flex flex-wrap gap-x-8 mt-1"><label${add_attribute("for", "guaranteed_" + index28, 0)} class="flex w-full items-center py-1 sm:w-auto svelte-1wlk632"><input class="checkbox" style="height: 40px;width: 40px;"${add_attribute("id", "guaranteed_" + index28, 0)} type="checkbox"${add_attribute("name", "guaranteed_" + index28, 0)}> <span class="ml-3 min-w-[200px] svelte-1wlk632" data-svelte-h="svelte-16nhknf">Guaranteed Delivery</span></label> <label${add_attribute("for", "hazardous_" + index28, 0)} class="flex w-full items-center py-1 sm:w-auto svelte-1wlk632"><input class="checkbox" style="height: 40px;width: 40px;"${add_attribute("id", "hazardous_" + index28, 0)} type="checkbox"${add_attribute("name", "hazardous_" + index28, 0)}> <span class="ml-3 min-w-[200px] svelte-1wlk632" data-svelte-h="svelte-shsrdo">Hazardous</span></label> <label${add_attribute("for", "stackable_" + index28, 0)} class="flex w-full items-center py-1 sm:w-auto svelte-1wlk632"><input class="checkbox" style="height: 40px;width: 40px;"${add_attribute("id", "stackable_" + index28, 0)} type="checkbox"${add_attribute("name", "stackable" + index28, 0)}> <span class="ml-3 min-w-[200px] svelte-1wlk632" data-svelte-h="svelte-1hbktnd">Stackable</span></label> <label${add_attribute("for", "protectFromFreeze_" + index28, 0)} class="flex w-full items-center py-1 sm:w-auto svelte-1wlk632"><input class="checkbox" style="height: 40px;width: 40px;"${add_attribute("id", "protectFromFreeze_" + index28, 0)} type="checkbox"${add_attribute("name", "protectFromFreeze" + index28, 0)}> <span class="ml-3 min-w-[200px] svelte-1wlk632" data-svelte-h="svelte-9obnv9">Protect From Freeze</span></label> <label${add_attribute("for", "sortAndSegregate_" + index28, 0)} class="flex w-full items-center py-1 sm:w-auto svelte-1wlk632"><input class="checkbox" style="height: 40px;width: 40px;"${add_attribute("id", "sortAndSegregate_" + index28, 0)} type="checkbox"${add_attribute("name", "sortAndSegregate" + index28, 0)}> <span class="ml-3 min-w-[200px] svelte-1wlk632" data-svelte-h="svelte-v7n3wz">Sort And Segregate</span></label> </div></div> <div class="pl-2 sm:pl-0 pr-2 flex flex-col w-full] mt-6"><p class="text-wrap text-lg font-semibold" data-svelte-h="svelte-nli613">If You have different sized packages/pallets please add new items.</p> <button style="color:white;height: 40px;font-size: .8rem;" class="bg-primary ownBtn w-[300px] font-mono hover:opacity-90 mt-3 svelte-1wlk632" data-svelte-h="svelte-1xiuat">Add Item</button> </div></div> </div>`;
      })}` : ``}`;
    });
    css8 = {
      code: "button.svelte-177k6o8{color:white !important}h3.svelte-177k6o8,p.svelte-177k6o8{color:#1d1d1d}",
      map: null
    };
    Page9 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_deliveryStore;
      let $$unsubscribe_pickupStore;
      let $$unsubscribe_commodityStore;
      let $shipmentInfoStore, $$unsubscribe_shipmentInfoStore;
      let $$unsubscribe_basicStore;
      let $pickupPromptStore, $$unsubscribe_pickupPromptStore;
      let $quoteShipmentErrors, $$unsubscribe_quoteShipmentErrors;
      $$unsubscribe_deliveryStore = subscribe(deliveryStore, (value) => value);
      $$unsubscribe_pickupStore = subscribe(pickupStore, (value) => value);
      $$unsubscribe_commodityStore = subscribe(commodityStore, (value) => value);
      $$unsubscribe_shipmentInfoStore = subscribe(shipmentInfoStore, (value) => $shipmentInfoStore = value);
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => value);
      $$unsubscribe_pickupPromptStore = subscribe(pickupPromptStore, (value) => $pickupPromptStore = value);
      $$unsubscribe_quoteShipmentErrors = subscribe(quoteShipmentErrors, (value) => $quoteShipmentErrors = value);
      $$result.css.add(css8);
      $$unsubscribe_deliveryStore();
      $$unsubscribe_pickupStore();
      $$unsubscribe_commodityStore();
      $$unsubscribe_shipmentInfoStore();
      $$unsubscribe_basicStore();
      $$unsubscribe_pickupPromptStore();
      $$unsubscribe_quoteShipmentErrors();
      return `<div class="p-2 min-h-[100vh] md:pl-4 text-black mt-4 max-w-[1100px]">${``} ${$shipmentInfoStore ? `<div class="w-full max-w-[1100px]">${$pickupPromptStore ? `${validate_component(Prompt, "Prompt").$$render($$result, {}, {}, {})}` : ``} <form class="flex w-full flex-col gap-6 mb-12" id="quoteForm"><div class="flex flex-col my-4"><h3 class="pl-2 sm:pl-0 pr-2 text-md dark:text-white svelte-177k6o8" data-svelte-h="svelte-10u28kr">Select Date &amp; Time</h3> <div class="flex flex-col gap-2 w-full py-6 px-2 bg-whitebg"><div class="flex flex-col sm:flex-row w-full gap-2 max-w-[550px]"><div class="flex flex-col w-full min-w-[200px] sm:w-[60%]"><label class="label w-full" for="pickupDate" data-svelte-h="svelte-j0dnjk">Pickup Date</label> <input class="input -mt-1 min-w-[95%]" type="text" name="pickupDate" id="pickupDate" placeholder="Pickup Date.." data-input required${add_attribute("value", $shipmentInfoStore.displayDate, 0)}></div> <div class="flex flex-col w-full min-w-[120px] sm:w-[40%]"><label class="label w-full" for="pickupTime" data-svelte-h="svelte-1kj3tou">Pickup Time</label> <input class="input -mt-1 min-w-[95%]" type="text" name="pickupTime" id="pickupTime" placeholder="Pickup Time.." required${add_attribute("value", $shipmentInfoStore.pickupReadyTime, 0)}></div></div> ${!$quoteShipmentErrors?.pickupDate?.valid ? `<p class="${[
        "error svelte-177k6o8",
        !$quoteShipmentErrors?.pickupDate?.valid ? "block" : ""
      ].join(" ").trim()}">${escape($quoteShipmentErrors?.pickupDate?.message)}</p>` : ``}</div> <div class="grid md:grid-cols-2 gap-4 my-4"><div class="flex flex-col w-full"><h3 class="sm:pl-0 pr-2 text-md svelte-177k6o8" data-svelte-h="svelte-1m4bbnw">Pickup</h3> <div class="w-full py-4 px-3 sm:px-8 flex items-center bg-whitebg">${validate_component(Pickup, "PickupCard").$$render($$result, {}, {}, {})}</div></div> <div class="flex flex-col w-full"><h3 class="sm:pl-0 pr-2 text-md svelte-177k6o8" data-svelte-h="svelte-w5rx3g">Delivery</h3> <div class="w-full py-4 px-3 sm:px-8 flex items-center bg-whitebg">${validate_component(Delivery, "DeliveryCard").$$render($$result, {}, {}, {})}</div></div></div> <div class="flex flex-col"><h3 class="sm:pl-0 pr-2 text-md svelte-177k6o8" data-svelte-h="svelte-1tu0drw">Shipment Details</h3> <div class="bg-whitebg">${validate_component(Item, "Items").$$render($$result, { bgColor: " w-full px-3 py-4 sm:px-8" }, {}, {})}</div></div> <div class="flex flex-col my-4"><h3 class="sm:pl-0 pr-2 text-md svelte-177k6o8" data-svelte-h="svelte-1xqdvsp">Shipment Value</h3> <div class="w-full px-3 py-8 sm:px-8 bg-whitebg"><input type="number" style="background-color:#fff;" id="shipmentValue" placeholder="shipment value" class="input w-full sm:w-[400px]" required${add_attribute("value", $shipmentInfoStore.shipmentValue, 0)}> ${!$quoteShipmentErrors?.shipmentValue?.valid ? `<p class="${[
        "error svelte-177k6o8",
        !$quoteShipmentErrors?.shipmentValue?.valid ? "block" : ""
      ].join(" ").trim()}">${escape($quoteShipmentErrors?.shipmentValue?.message)}</p>` : ``}</div></div> <div class="quote flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-start sm:items-start mt-6"><button type="submit" class="ownBtn bg-neutral h-[80px] w-[70%] sm:max-w-[250px] hover:opacity-90 svelte-177k6o8" data-svelte-h="svelte-11ewypb">Get Quote</button> <button class="ownBtn btn-error h-[80px] w-[70%] sm:max-w-[200px] hover:opacity-90 svelte-177k6o8" data-svelte-h="svelte-ls4h5o">CANCEL</button></div></div></form></div>` : ``} </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  component: () => component15,
  fonts: () => fonts15,
  imports: () => imports15,
  index: () => index15,
  server: () => page_server_ts_exports4,
  server_id: () => server_id4,
  stylesheets: () => stylesheets15
});
var index15, component_cache15, component15, server_id4, imports15, stylesheets15, fonts15;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_page_server_ts4();
    index15 = 14;
    component15 = async () => component_cache15 ?? (component_cache15 = (await Promise.resolve().then(() => (init_page_svelte9(), page_svelte_exports9))).default);
    server_id4 = "src/routes/(admin)/admin/quote/+page.server.ts";
    imports15 = ["_app/immutable/nodes/14.f9936866.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/QuoteDeliveryZip.17192e40.js", "_app/immutable/chunks/delivery_store.5fe89634.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/stores.7ed2130f.js", "_app/immutable/chunks/quote_utils.8ad4c718.js", "_app/immutable/chunks/commodity_store.3c0148c0.js", "_app/immutable/chunks/index.fc8250e2.js", "_app/immutable/chunks/package_type.21e31deb.js", "_app/immutable/chunks/Loading.5545733f.js", "_app/immutable/chunks/preload-helper.a4192956.js", "_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang.36b7f7b6.js", "_app/immutable/chunks/config.1c7577db.js", "_app/immutable/chunks/bid_store.bd82296e.js"];
    stylesheets15 = ["_app/immutable/assets/14.d63c8837.css", "_app/immutable/assets/Toaster.3a6d0da3.css", "_app/immutable/assets/ArrowUp.baf5064f.css", "_app/immutable/assets/index.798bbb7e.css"];
    fonts15 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/quote/rates/_page.server.ts.js
var page_server_ts_exports5 = {};
__export(page_server_ts_exports5, {
  load: () => load7
});
function load7({ setHeaders }) {
  setHeaders({
    "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
    "Pragma": "no-cache",
    "Expires": "0"
  });
}
var init_page_server_ts5 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/quote/rates/_page.server.ts.js"() {
  }
});

// node_modules/pusher-js/dist/web/pusher.js
var require_pusher = __commonJS({
  "node_modules/pusher-js/dist/web/pusher.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["Pusher"] = factory();
      else
        root["Pusher"] = factory();
    })(window, function() {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1)
              value = __webpack_require__(value);
            if (mode & 8)
              return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule)
              return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string")
              for (var key2 in value)
                __webpack_require__.d(ns, key2, function(key3) {
                  return value[key3];
                }.bind(null, key2));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 2);
        }([
          /* 0 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            var __extends2 = this && this.__extends || function() {
              var extendStatics2 = function(d, b) {
                extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                  d2.__proto__ = b2;
                } || function(d2, b2) {
                  for (var p in b2)
                    if (b2.hasOwnProperty(p))
                      d2[p] = b2[p];
                };
                return extendStatics2(d, b);
              };
              return function(d, b) {
                extendStatics2(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
              };
            }();
            Object.defineProperty(exports2, "__esModule", { value: true });
            var INVALID_BYTE = 256;
            var Coder = (
              /** @class */
              function() {
                function Coder2(_paddingCharacter) {
                  if (_paddingCharacter === void 0) {
                    _paddingCharacter = "=";
                  }
                  this._paddingCharacter = _paddingCharacter;
                }
                Coder2.prototype.encodedLength = function(length) {
                  if (!this._paddingCharacter) {
                    return (length * 8 + 5) / 6 | 0;
                  }
                  return (length + 2) / 3 * 4 | 0;
                };
                Coder2.prototype.encode = function(data) {
                  var out = "";
                  var i = 0;
                  for (; i < data.length - 2; i += 3) {
                    var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
                    out += this._encodeByte(c >>> 3 * 6 & 63);
                    out += this._encodeByte(c >>> 2 * 6 & 63);
                    out += this._encodeByte(c >>> 1 * 6 & 63);
                    out += this._encodeByte(c >>> 0 * 6 & 63);
                  }
                  var left = data.length - i;
                  if (left > 0) {
                    var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
                    out += this._encodeByte(c >>> 3 * 6 & 63);
                    out += this._encodeByte(c >>> 2 * 6 & 63);
                    if (left === 2) {
                      out += this._encodeByte(c >>> 1 * 6 & 63);
                    } else {
                      out += this._paddingCharacter || "";
                    }
                    out += this._paddingCharacter || "";
                  }
                  return out;
                };
                Coder2.prototype.maxDecodedLength = function(length) {
                  if (!this._paddingCharacter) {
                    return (length * 6 + 7) / 8 | 0;
                  }
                  return length / 4 * 3 | 0;
                };
                Coder2.prototype.decodedLength = function(s2) {
                  return this.maxDecodedLength(s2.length - this._getPaddingLength(s2));
                };
                Coder2.prototype.decode = function(s2) {
                  if (s2.length === 0) {
                    return new Uint8Array(0);
                  }
                  var paddingLength = this._getPaddingLength(s2);
                  var length = s2.length - paddingLength;
                  var out = new Uint8Array(this.maxDecodedLength(length));
                  var op = 0;
                  var i = 0;
                  var haveBad = 0;
                  var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
                  for (; i < length - 4; i += 4) {
                    v0 = this._decodeChar(s2.charCodeAt(i + 0));
                    v1 = this._decodeChar(s2.charCodeAt(i + 1));
                    v2 = this._decodeChar(s2.charCodeAt(i + 2));
                    v3 = this._decodeChar(s2.charCodeAt(i + 3));
                    out[op++] = v0 << 2 | v1 >>> 4;
                    out[op++] = v1 << 4 | v2 >>> 2;
                    out[op++] = v2 << 6 | v3;
                    haveBad |= v0 & INVALID_BYTE;
                    haveBad |= v1 & INVALID_BYTE;
                    haveBad |= v2 & INVALID_BYTE;
                    haveBad |= v3 & INVALID_BYTE;
                  }
                  if (i < length - 1) {
                    v0 = this._decodeChar(s2.charCodeAt(i));
                    v1 = this._decodeChar(s2.charCodeAt(i + 1));
                    out[op++] = v0 << 2 | v1 >>> 4;
                    haveBad |= v0 & INVALID_BYTE;
                    haveBad |= v1 & INVALID_BYTE;
                  }
                  if (i < length - 2) {
                    v2 = this._decodeChar(s2.charCodeAt(i + 2));
                    out[op++] = v1 << 4 | v2 >>> 2;
                    haveBad |= v2 & INVALID_BYTE;
                  }
                  if (i < length - 3) {
                    v3 = this._decodeChar(s2.charCodeAt(i + 3));
                    out[op++] = v2 << 6 | v3;
                    haveBad |= v3 & INVALID_BYTE;
                  }
                  if (haveBad !== 0) {
                    throw new Error("Base64Coder: incorrect characters for decoding");
                  }
                  return out;
                };
                Coder2.prototype._encodeByte = function(b) {
                  var result = b;
                  result += 65;
                  result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
                  result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
                  result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
                  result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
                  return String.fromCharCode(result);
                };
                Coder2.prototype._decodeChar = function(c) {
                  var result = INVALID_BYTE;
                  result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
                  result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
                  result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
                  result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
                  result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
                  return result;
                };
                Coder2.prototype._getPaddingLength = function(s2) {
                  var paddingLength = 0;
                  if (this._paddingCharacter) {
                    for (var i = s2.length - 1; i >= 0; i--) {
                      if (s2[i] !== this._paddingCharacter) {
                        break;
                      }
                      paddingLength++;
                    }
                    if (s2.length < 4 || paddingLength > 2) {
                      throw new Error("Base64Coder: incorrect padding");
                    }
                  }
                  return paddingLength;
                };
                return Coder2;
              }()
            );
            exports2.Coder = Coder;
            var stdCoder = new Coder();
            function encode2(data) {
              return stdCoder.encode(data);
            }
            exports2.encode = encode2;
            function decode2(s2) {
              return stdCoder.decode(s2);
            }
            exports2.decode = decode2;
            var URLSafeCoder = (
              /** @class */
              function(_super) {
                __extends2(URLSafeCoder2, _super);
                function URLSafeCoder2() {
                  return _super !== null && _super.apply(this, arguments) || this;
                }
                URLSafeCoder2.prototype._encodeByte = function(b) {
                  var result = b;
                  result += 65;
                  result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
                  result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
                  result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
                  result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
                  return String.fromCharCode(result);
                };
                URLSafeCoder2.prototype._decodeChar = function(c) {
                  var result = INVALID_BYTE;
                  result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
                  result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
                  result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
                  result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
                  result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
                  return result;
                };
                return URLSafeCoder2;
              }(Coder)
            );
            exports2.URLSafeCoder = URLSafeCoder;
            var urlSafeCoder = new URLSafeCoder();
            function encodeURLSafe(data) {
              return urlSafeCoder.encode(data);
            }
            exports2.encodeURLSafe = encodeURLSafe;
            function decodeURLSafe(s2) {
              return urlSafeCoder.decode(s2);
            }
            exports2.decodeURLSafe = decodeURLSafe;
            exports2.encodedLength = function(length) {
              return stdCoder.encodedLength(length);
            };
            exports2.maxDecodedLength = function(length) {
              return stdCoder.maxDecodedLength(length);
            };
            exports2.decodedLength = function(s2) {
              return stdCoder.decodedLength(s2);
            };
          },
          /* 1 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", { value: true });
            var INVALID_UTF16 = "utf8: invalid string";
            var INVALID_UTF8 = "utf8: invalid source encoding";
            function encode2(s2) {
              var arr = new Uint8Array(encodedLength(s2));
              var pos = 0;
              for (var i = 0; i < s2.length; i++) {
                var c = s2.charCodeAt(i);
                if (c < 128) {
                  arr[pos++] = c;
                } else if (c < 2048) {
                  arr[pos++] = 192 | c >> 6;
                  arr[pos++] = 128 | c & 63;
                } else if (c < 55296) {
                  arr[pos++] = 224 | c >> 12;
                  arr[pos++] = 128 | c >> 6 & 63;
                  arr[pos++] = 128 | c & 63;
                } else {
                  i++;
                  c = (c & 1023) << 10;
                  c |= s2.charCodeAt(i) & 1023;
                  c += 65536;
                  arr[pos++] = 240 | c >> 18;
                  arr[pos++] = 128 | c >> 12 & 63;
                  arr[pos++] = 128 | c >> 6 & 63;
                  arr[pos++] = 128 | c & 63;
                }
              }
              return arr;
            }
            exports2.encode = encode2;
            function encodedLength(s2) {
              var result = 0;
              for (var i = 0; i < s2.length; i++) {
                var c = s2.charCodeAt(i);
                if (c < 128) {
                  result += 1;
                } else if (c < 2048) {
                  result += 2;
                } else if (c < 55296) {
                  result += 3;
                } else if (c <= 57343) {
                  if (i >= s2.length - 1) {
                    throw new Error(INVALID_UTF16);
                  }
                  i++;
                  result += 4;
                } else {
                  throw new Error(INVALID_UTF16);
                }
              }
              return result;
            }
            exports2.encodedLength = encodedLength;
            function decode2(arr) {
              var chars3 = [];
              for (var i = 0; i < arr.length; i++) {
                var b = arr[i];
                if (b & 128) {
                  var min = void 0;
                  if (b < 224) {
                    if (i >= arr.length) {
                      throw new Error(INVALID_UTF8);
                    }
                    var n1 = arr[++i];
                    if ((n1 & 192) !== 128) {
                      throw new Error(INVALID_UTF8);
                    }
                    b = (b & 31) << 6 | n1 & 63;
                    min = 128;
                  } else if (b < 240) {
                    if (i >= arr.length - 1) {
                      throw new Error(INVALID_UTF8);
                    }
                    var n1 = arr[++i];
                    var n2 = arr[++i];
                    if ((n1 & 192) !== 128 || (n2 & 192) !== 128) {
                      throw new Error(INVALID_UTF8);
                    }
                    b = (b & 15) << 12 | (n1 & 63) << 6 | n2 & 63;
                    min = 2048;
                  } else if (b < 248) {
                    if (i >= arr.length - 2) {
                      throw new Error(INVALID_UTF8);
                    }
                    var n1 = arr[++i];
                    var n2 = arr[++i];
                    var n3 = arr[++i];
                    if ((n1 & 192) !== 128 || (n2 & 192) !== 128 || (n3 & 192) !== 128) {
                      throw new Error(INVALID_UTF8);
                    }
                    b = (b & 15) << 18 | (n1 & 63) << 12 | (n2 & 63) << 6 | n3 & 63;
                    min = 65536;
                  } else {
                    throw new Error(INVALID_UTF8);
                  }
                  if (b < min || b >= 55296 && b <= 57343) {
                    throw new Error(INVALID_UTF8);
                  }
                  if (b >= 65536) {
                    if (b > 1114111) {
                      throw new Error(INVALID_UTF8);
                    }
                    b -= 65536;
                    chars3.push(String.fromCharCode(55296 | b >> 10));
                    b = 56320 | b & 1023;
                  }
                }
                chars3.push(String.fromCharCode(b));
              }
              return chars3.join("");
            }
            exports2.decode = decode2;
          },
          /* 2 */
          /***/
          function(module2, exports2, __webpack_require__) {
            module2.exports = __webpack_require__(3).default;
          },
          /* 3 */
          /***/
          function(module2, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            class ScriptReceiverFactory {
              constructor(prefix3, name) {
                this.lastId = 0;
                this.prefix = prefix3;
                this.name = name;
              }
              create(callback) {
                this.lastId++;
                var number = this.lastId;
                var id = this.prefix + number;
                var name = this.name + "[" + number + "]";
                var called = false;
                var callbackWrapper = function() {
                  if (!called) {
                    callback.apply(null, arguments);
                    called = true;
                  }
                };
                this[number] = callbackWrapper;
                return { number, id, name, callback: callbackWrapper };
              }
              remove(receiver) {
                delete this[receiver.number];
              }
            }
            var ScriptReceivers = new ScriptReceiverFactory("_pusher_script_", "Pusher.ScriptReceivers");
            var Defaults = {
              VERSION: "8.3.0",
              PROTOCOL: 7,
              wsPort: 80,
              wssPort: 443,
              wsPath: "",
              httpHost: "sockjs.pusher.com",
              httpPort: 80,
              httpsPort: 443,
              httpPath: "/pusher",
              stats_host: "stats.pusher.com",
              authEndpoint: "/pusher/auth",
              authTransport: "ajax",
              activityTimeout: 12e4,
              pongTimeout: 3e4,
              unavailableTimeout: 1e4,
              userAuthentication: {
                endpoint: "/pusher/user-auth",
                transport: "ajax"
              },
              channelAuthorization: {
                endpoint: "/pusher/auth",
                transport: "ajax"
              },
              cdn_http: "http://js.pusher.com",
              cdn_https: "https://js.pusher.com",
              dependency_suffix: ""
            };
            var defaults = Defaults;
            class dependency_loader_DependencyLoader {
              constructor(options2) {
                this.options = options2;
                this.receivers = options2.receivers || ScriptReceivers;
                this.loading = {};
              }
              load(name, options2, callback) {
                var self = this;
                if (self.loading[name] && self.loading[name].length > 0) {
                  self.loading[name].push(callback);
                } else {
                  self.loading[name] = [callback];
                  var request = runtime2.createScriptRequest(self.getPath(name, options2));
                  var receiver = self.receivers.create(function(error2) {
                    self.receivers.remove(receiver);
                    if (self.loading[name]) {
                      var callbacks = self.loading[name];
                      delete self.loading[name];
                      var successCallback = function(wasSuccessful) {
                        if (!wasSuccessful) {
                          request.cleanup();
                        }
                      };
                      for (var i = 0; i < callbacks.length; i++) {
                        callbacks[i](error2, successCallback);
                      }
                    }
                  });
                  request.send(receiver);
                }
              }
              getRoot(options2) {
                var cdn;
                var protocol = runtime2.getDocument().location.protocol;
                if (options2 && options2.useTLS || protocol === "https:") {
                  cdn = this.options.cdn_https;
                } else {
                  cdn = this.options.cdn_http;
                }
                return cdn.replace(/\/*$/, "") + "/" + this.options.version;
              }
              getPath(name, options2) {
                return this.getRoot(options2) + "/" + name + this.options.suffix + ".js";
              }
            }
            var DependenciesReceivers = new ScriptReceiverFactory("_pusher_dependencies", "Pusher.DependenciesReceivers");
            var Dependencies = new dependency_loader_DependencyLoader({
              cdn_http: defaults.cdn_http,
              cdn_https: defaults.cdn_https,
              version: defaults.VERSION,
              suffix: defaults.dependency_suffix,
              receivers: DependenciesReceivers
            });
            const urlStore = {
              baseUrl: "https://pusher.com",
              urls: {
                authenticationEndpoint: {
                  path: "/docs/channels/server_api/authenticating_users"
                },
                authorizationEndpoint: {
                  path: "/docs/channels/server_api/authorizing-users/"
                },
                javascriptQuickStart: {
                  path: "/docs/javascript_quick_start"
                },
                triggeringClientEvents: {
                  path: "/docs/client_api_guide/client_events#trigger-events"
                },
                encryptedChannelSupport: {
                  fullUrl: "https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support"
                }
              }
            };
            const buildLogSuffix = function(key2) {
              const urlPrefix = "See:";
              const urlObj = urlStore.urls[key2];
              if (!urlObj)
                return "";
              let url;
              if (urlObj.fullUrl) {
                url = urlObj.fullUrl;
              } else if (urlObj.path) {
                url = urlStore.baseUrl + urlObj.path;
              }
              if (!url)
                return "";
              return `${urlPrefix} ${url}`;
            };
            var url_store = { buildLogSuffix };
            var AuthRequestType;
            (function(AuthRequestType2) {
              AuthRequestType2["UserAuthentication"] = "user-authentication";
              AuthRequestType2["ChannelAuthorization"] = "channel-authorization";
            })(AuthRequestType || (AuthRequestType = {}));
            class BadEventName extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class BadChannelName extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class RequestTimedOut extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class TransportPriorityTooLow extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class TransportClosed extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class UnsupportedFeature extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class UnsupportedTransport extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class UnsupportedStrategy extends Error {
              constructor(msg) {
                super(msg);
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class HTTPAuthError extends Error {
              constructor(status, msg) {
                super(msg);
                this.status = status;
                Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            const ajax = function(context, query, authOptions, authRequestType, callback) {
              const xhr = runtime2.createXHR();
              xhr.open("POST", authOptions.endpoint, true);
              xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              for (var headerName in authOptions.headers) {
                xhr.setRequestHeader(headerName, authOptions.headers[headerName]);
              }
              if (authOptions.headersProvider != null) {
                let dynamicHeaders = authOptions.headersProvider();
                for (var headerName in dynamicHeaders) {
                  xhr.setRequestHeader(headerName, dynamicHeaders[headerName]);
                }
              }
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    let data;
                    let parsed = false;
                    try {
                      data = JSON.parse(xhr.responseText);
                      parsed = true;
                    } catch (e) {
                      callback(new HTTPAuthError(200, `JSON returned from ${authRequestType.toString()} endpoint was invalid, yet status code was 200. Data was: ${xhr.responseText}`), null);
                    }
                    if (parsed) {
                      callback(null, data);
                    }
                  } else {
                    let suffix = "";
                    switch (authRequestType) {
                      case AuthRequestType.UserAuthentication:
                        suffix = url_store.buildLogSuffix("authenticationEndpoint");
                        break;
                      case AuthRequestType.ChannelAuthorization:
                        suffix = `Clients must be authorized to join private or presence channels. ${url_store.buildLogSuffix("authorizationEndpoint")}`;
                        break;
                    }
                    callback(new HTTPAuthError(xhr.status, `Unable to retrieve auth string from ${authRequestType.toString()} endpoint - received status: ${xhr.status} from ${authOptions.endpoint}. ${suffix}`), null);
                  }
                }
              };
              xhr.send(query);
              return xhr;
            };
            var xhr_auth = ajax;
            function encode2(s2) {
              return btoa2(utob(s2));
            }
            var fromCharCode = String.fromCharCode;
            var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var b64tab = {};
            for (var base64_i = 0, l = b64chars.length; base64_i < l; base64_i++) {
              b64tab[b64chars.charAt(base64_i)] = base64_i;
            }
            var cb_utob = function(c) {
              var cc = c.charCodeAt(0);
              return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63);
            };
            var utob = function(u) {
              return u.replace(/[^\x00-\x7F]/g, cb_utob);
            };
            var cb_encode = function(ccc) {
              var padlen = [0, 2, 1][ccc.length % 3];
              var ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0);
              var chars3 = [
                b64chars.charAt(ord >>> 18),
                b64chars.charAt(ord >>> 12 & 63),
                padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63),
                padlen >= 1 ? "=" : b64chars.charAt(ord & 63)
              ];
              return chars3.join("");
            };
            var btoa2 = window.btoa || function(b) {
              return b.replace(/[\s\S]{1,3}/g, cb_encode);
            };
            class Timer {
              constructor(set, clear, delay, callback) {
                this.clear = clear;
                this.timer = set(() => {
                  if (this.timer) {
                    this.timer = callback(this.timer);
                  }
                }, delay);
              }
              isRunning() {
                return this.timer !== null;
              }
              ensureAborted() {
                if (this.timer) {
                  this.clear(this.timer);
                  this.timer = null;
                }
              }
            }
            var abstract_timer = Timer;
            function timers_clearTimeout(timer) {
              window.clearTimeout(timer);
            }
            function timers_clearInterval(timer) {
              window.clearInterval(timer);
            }
            class timers_OneOffTimer extends abstract_timer {
              constructor(delay, callback) {
                super(setTimeout, timers_clearTimeout, delay, function(timer) {
                  callback();
                  return null;
                });
              }
            }
            class timers_PeriodicTimer extends abstract_timer {
              constructor(delay, callback) {
                super(setInterval, timers_clearInterval, delay, function(timer) {
                  callback();
                  return timer;
                });
              }
            }
            var Util = {
              now() {
                if (Date.now) {
                  return Date.now();
                } else {
                  return (/* @__PURE__ */ new Date()).valueOf();
                }
              },
              defer(callback) {
                return new timers_OneOffTimer(0, callback);
              },
              method(name, ...args) {
                var boundArguments = Array.prototype.slice.call(arguments, 1);
                return function(object) {
                  return object[name].apply(object, boundArguments.concat(arguments));
                };
              }
            };
            var util = Util;
            function extend(target, ...sources) {
              for (var i = 0; i < sources.length; i++) {
                var extensions = sources[i];
                for (var property in extensions) {
                  if (extensions[property] && extensions[property].constructor && extensions[property].constructor === Object) {
                    target[property] = extend(target[property] || {}, extensions[property]);
                  } else {
                    target[property] = extensions[property];
                  }
                }
              }
              return target;
            }
            function stringify3() {
              var m = ["Pusher"];
              for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "string") {
                  m.push(arguments[i]);
                } else {
                  m.push(safeJSONStringify(arguments[i]));
                }
              }
              return m.join(" : ");
            }
            function arrayIndexOf(array2, item) {
              var nativeIndexOf = Array.prototype.indexOf;
              if (array2 === null) {
                return -1;
              }
              if (nativeIndexOf && array2.indexOf === nativeIndexOf) {
                return array2.indexOf(item);
              }
              for (var i = 0, l2 = array2.length; i < l2; i++) {
                if (array2[i] === item) {
                  return i;
                }
              }
              return -1;
            }
            function objectApply(object, f) {
              for (var key2 in object) {
                if (Object.prototype.hasOwnProperty.call(object, key2)) {
                  f(object[key2], key2, object);
                }
              }
            }
            function keys(object) {
              var keys2 = [];
              objectApply(object, function(_, key2) {
                keys2.push(key2);
              });
              return keys2;
            }
            function values(object) {
              var values2 = [];
              objectApply(object, function(value) {
                values2.push(value);
              });
              return values2;
            }
            function apply(array2, f, context) {
              for (var i = 0; i < array2.length; i++) {
                f.call(context || window, array2[i], i, array2);
              }
            }
            function map(array2, f) {
              var result = [];
              for (var i = 0; i < array2.length; i++) {
                result.push(f(array2[i], i, array2, result));
              }
              return result;
            }
            function mapObject(object, f) {
              var result = {};
              objectApply(object, function(value, key2) {
                result[key2] = f(value);
              });
              return result;
            }
            function filter(array2, test) {
              test = test || function(value) {
                return !!value;
              };
              var result = [];
              for (var i = 0; i < array2.length; i++) {
                if (test(array2[i], i, array2, result)) {
                  result.push(array2[i]);
                }
              }
              return result;
            }
            function filterObject(object, test) {
              var result = {};
              objectApply(object, function(value, key2) {
                if (test && test(value, key2, object, result) || Boolean(value)) {
                  result[key2] = value;
                }
              });
              return result;
            }
            function flatten(object) {
              var result = [];
              objectApply(object, function(value, key2) {
                result.push([key2, value]);
              });
              return result;
            }
            function any(array2, test) {
              for (var i = 0; i < array2.length; i++) {
                if (test(array2[i], i, array2)) {
                  return true;
                }
              }
              return false;
            }
            function collections_all(array2, test) {
              for (var i = 0; i < array2.length; i++) {
                if (!test(array2[i], i, array2)) {
                  return false;
                }
              }
              return true;
            }
            function encodeParamsObject(data) {
              return mapObject(data, function(value) {
                if (typeof value === "object") {
                  value = safeJSONStringify(value);
                }
                return encodeURIComponent(encode2(value.toString()));
              });
            }
            function buildQueryString(data) {
              var params = filterObject(data, function(value) {
                return value !== void 0;
              });
              var query = map(flatten(encodeParamsObject(params)), util.method("join", "=")).join("&");
              return query;
            }
            function decycleObject(object) {
              var objects = [], paths = [];
              return function derez(value, path) {
                var i, name, nu;
                switch (typeof value) {
                  case "object":
                    if (!value) {
                      return null;
                    }
                    for (i = 0; i < objects.length; i += 1) {
                      if (objects[i] === value) {
                        return { $ref: paths[i] };
                      }
                    }
                    objects.push(value);
                    paths.push(path);
                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                      nu = [];
                      for (i = 0; i < value.length; i += 1) {
                        nu[i] = derez(value[i], path + "[" + i + "]");
                      }
                    } else {
                      nu = {};
                      for (name in value) {
                        if (Object.prototype.hasOwnProperty.call(value, name)) {
                          nu[name] = derez(value[name], path + "[" + JSON.stringify(name) + "]");
                        }
                      }
                    }
                    return nu;
                  case "number":
                  case "string":
                  case "boolean":
                    return value;
                }
              }(object, "$");
            }
            function safeJSONStringify(source) {
              try {
                return JSON.stringify(source);
              } catch (e) {
                return JSON.stringify(decycleObject(source));
              }
            }
            class logger_Logger {
              constructor() {
                this.globalLog = (message) => {
                  if (window.console && window.console.log) {
                    window.console.log(message);
                  }
                };
              }
              debug(...args) {
                this.log(this.globalLog, args);
              }
              warn(...args) {
                this.log(this.globalLogWarn, args);
              }
              error(...args) {
                this.log(this.globalLogError, args);
              }
              globalLogWarn(message) {
                if (window.console && window.console.warn) {
                  window.console.warn(message);
                } else {
                  this.globalLog(message);
                }
              }
              globalLogError(message) {
                if (window.console && window.console.error) {
                  window.console.error(message);
                } else {
                  this.globalLogWarn(message);
                }
              }
              log(defaultLoggingFunction, ...args) {
                var message = stringify3.apply(this, arguments);
                if (core_pusher.log) {
                  core_pusher.log(message);
                } else if (core_pusher.logToConsole) {
                  const log = defaultLoggingFunction.bind(this);
                  log(message);
                }
              }
            }
            var logger = new logger_Logger();
            var jsonp = function(context, query, authOptions, authRequestType, callback) {
              if (authOptions.headers !== void 0 || authOptions.headersProvider != null) {
                logger.warn(`To send headers with the ${authRequestType.toString()} request, you must use AJAX, rather than JSONP.`);
              }
              var callbackName = context.nextAuthCallbackID.toString();
              context.nextAuthCallbackID++;
              var document2 = context.getDocument();
              var script = document2.createElement("script");
              context.auth_callbacks[callbackName] = function(data) {
                callback(null, data);
              };
              var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
              script.src = authOptions.endpoint + "?callback=" + encodeURIComponent(callback_name) + "&" + query;
              var head = document2.getElementsByTagName("head")[0] || document2.documentElement;
              head.insertBefore(script, head.firstChild);
            };
            var jsonp_auth = jsonp;
            class ScriptRequest {
              constructor(src) {
                this.src = src;
              }
              send(receiver) {
                var self = this;
                var errorString = "Error loading " + self.src;
                self.script = document.createElement("script");
                self.script.id = receiver.id;
                self.script.src = self.src;
                self.script.type = "text/javascript";
                self.script.charset = "UTF-8";
                if (self.script.addEventListener) {
                  self.script.onerror = function() {
                    receiver.callback(errorString);
                  };
                  self.script.onload = function() {
                    receiver.callback(null);
                  };
                } else {
                  self.script.onreadystatechange = function() {
                    if (self.script.readyState === "loaded" || self.script.readyState === "complete") {
                      receiver.callback(null);
                    }
                  };
                }
                if (self.script.async === void 0 && document.attachEvent && /opera/i.test(navigator.userAgent)) {
                  self.errorScript = document.createElement("script");
                  self.errorScript.id = receiver.id + "_error";
                  self.errorScript.text = receiver.name + "('" + errorString + "');";
                  self.script.async = self.errorScript.async = false;
                } else {
                  self.script.async = true;
                }
                var head = document.getElementsByTagName("head")[0];
                head.insertBefore(self.script, head.firstChild);
                if (self.errorScript) {
                  head.insertBefore(self.errorScript, self.script.nextSibling);
                }
              }
              cleanup() {
                if (this.script) {
                  this.script.onload = this.script.onerror = null;
                  this.script.onreadystatechange = null;
                }
                if (this.script && this.script.parentNode) {
                  this.script.parentNode.removeChild(this.script);
                }
                if (this.errorScript && this.errorScript.parentNode) {
                  this.errorScript.parentNode.removeChild(this.errorScript);
                }
                this.script = null;
                this.errorScript = null;
              }
            }
            class jsonp_request_JSONPRequest {
              constructor(url, data) {
                this.url = url;
                this.data = data;
              }
              send(receiver) {
                if (this.request) {
                  return;
                }
                var query = buildQueryString(this.data);
                var url = this.url + "/" + receiver.number + "?" + query;
                this.request = runtime2.createScriptRequest(url);
                this.request.send(receiver);
              }
              cleanup() {
                if (this.request) {
                  this.request.cleanup();
                }
              }
            }
            var getAgent = function(sender, useTLS) {
              return function(data, callback) {
                var scheme = "http" + (useTLS ? "s" : "") + "://";
                var url = scheme + (sender.host || sender.options.host) + sender.options.path;
                var request = runtime2.createJSONPRequest(url, data);
                var receiver = runtime2.ScriptReceivers.create(function(error2, result) {
                  ScriptReceivers.remove(receiver);
                  request.cleanup();
                  if (result && result.host) {
                    sender.host = result.host;
                  }
                  if (callback) {
                    callback(error2, result);
                  }
                });
                request.send(receiver);
              };
            };
            var jsonp_timeline_jsonp = {
              name: "jsonp",
              getAgent
            };
            var jsonp_timeline = jsonp_timeline_jsonp;
            function getGenericURL(baseScheme, params, path) {
              var scheme = baseScheme + (params.useTLS ? "s" : "");
              var host = params.useTLS ? params.hostTLS : params.hostNonTLS;
              return scheme + "://" + host + path;
            }
            function getGenericPath(key2, queryString) {
              var path = "/app/" + key2;
              var query = "?protocol=" + defaults.PROTOCOL + "&client=js&version=" + defaults.VERSION + (queryString ? "&" + queryString : "");
              return path + query;
            }
            var ws = {
              getInitial: function(key2, params) {
                var path = (params.httpPath || "") + getGenericPath(key2, "flash=false");
                return getGenericURL("ws", params, path);
              }
            };
            var http = {
              getInitial: function(key2, params) {
                var path = (params.httpPath || "/pusher") + getGenericPath(key2);
                return getGenericURL("http", params, path);
              }
            };
            var sockjs = {
              getInitial: function(key2, params) {
                return getGenericURL("http", params, params.httpPath || "/pusher");
              },
              getPath: function(key2, params) {
                return getGenericPath(key2);
              }
            };
            class callback_registry_CallbackRegistry {
              constructor() {
                this._callbacks = {};
              }
              get(name) {
                return this._callbacks[prefix2(name)];
              }
              add(name, callback, context) {
                var prefixedEventName = prefix2(name);
                this._callbacks[prefixedEventName] = this._callbacks[prefixedEventName] || [];
                this._callbacks[prefixedEventName].push({
                  fn: callback,
                  context
                });
              }
              remove(name, callback, context) {
                if (!name && !callback && !context) {
                  this._callbacks = {};
                  return;
                }
                var names = name ? [prefix2(name)] : keys(this._callbacks);
                if (callback || context) {
                  this.removeCallback(names, callback, context);
                } else {
                  this.removeAllCallbacks(names);
                }
              }
              removeCallback(names, callback, context) {
                apply(names, function(name) {
                  this._callbacks[name] = filter(this._callbacks[name] || [], function(binding) {
                    return callback && callback !== binding.fn || context && context !== binding.context;
                  });
                  if (this._callbacks[name].length === 0) {
                    delete this._callbacks[name];
                  }
                }, this);
              }
              removeAllCallbacks(names) {
                apply(names, function(name) {
                  delete this._callbacks[name];
                }, this);
              }
            }
            function prefix2(name) {
              return "_" + name;
            }
            class dispatcher_Dispatcher {
              constructor(failThrough) {
                this.callbacks = new callback_registry_CallbackRegistry();
                this.global_callbacks = [];
                this.failThrough = failThrough;
              }
              bind(eventName, callback, context) {
                this.callbacks.add(eventName, callback, context);
                return this;
              }
              bind_global(callback) {
                this.global_callbacks.push(callback);
                return this;
              }
              unbind(eventName, callback, context) {
                this.callbacks.remove(eventName, callback, context);
                return this;
              }
              unbind_global(callback) {
                if (!callback) {
                  this.global_callbacks = [];
                  return this;
                }
                this.global_callbacks = filter(this.global_callbacks || [], (c) => c !== callback);
                return this;
              }
              unbind_all() {
                this.unbind();
                this.unbind_global();
                return this;
              }
              emit(eventName, data, metadata) {
                for (var i = 0; i < this.global_callbacks.length; i++) {
                  this.global_callbacks[i](eventName, data);
                }
                var callbacks = this.callbacks.get(eventName);
                var args = [];
                if (metadata) {
                  args.push(data, metadata);
                } else if (data) {
                  args.push(data);
                }
                if (callbacks && callbacks.length > 0) {
                  for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i].fn.apply(callbacks[i].context || window, args);
                  }
                } else if (this.failThrough) {
                  this.failThrough(eventName, data);
                }
                return this;
              }
            }
            class transport_connection_TransportConnection extends dispatcher_Dispatcher {
              constructor(hooks, name, priority, key2, options2) {
                super();
                this.initialize = runtime2.transportConnectionInitializer;
                this.hooks = hooks;
                this.name = name;
                this.priority = priority;
                this.key = key2;
                this.options = options2;
                this.state = "new";
                this.timeline = options2.timeline;
                this.activityTimeout = options2.activityTimeout;
                this.id = this.timeline.generateUniqueID();
              }
              handlesActivityChecks() {
                return Boolean(this.hooks.handlesActivityChecks);
              }
              supportsPing() {
                return Boolean(this.hooks.supportsPing);
              }
              connect() {
                if (this.socket || this.state !== "initialized") {
                  return false;
                }
                var url = this.hooks.urls.getInitial(this.key, this.options);
                try {
                  this.socket = this.hooks.getSocket(url, this.options);
                } catch (e) {
                  util.defer(() => {
                    this.onError(e);
                    this.changeState("closed");
                  });
                  return false;
                }
                this.bindListeners();
                logger.debug("Connecting", { transport: this.name, url });
                this.changeState("connecting");
                return true;
              }
              close() {
                if (this.socket) {
                  this.socket.close();
                  return true;
                } else {
                  return false;
                }
              }
              send(data) {
                if (this.state === "open") {
                  util.defer(() => {
                    if (this.socket) {
                      this.socket.send(data);
                    }
                  });
                  return true;
                } else {
                  return false;
                }
              }
              ping() {
                if (this.state === "open" && this.supportsPing()) {
                  this.socket.ping();
                }
              }
              onOpen() {
                if (this.hooks.beforeOpen) {
                  this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options));
                }
                this.changeState("open");
                this.socket.onopen = void 0;
              }
              onError(error2) {
                this.emit("error", { type: "WebSocketError", error: error2 });
                this.timeline.error(this.buildTimelineMessage({ error: error2.toString() }));
              }
              onClose(closeEvent) {
                if (closeEvent) {
                  this.changeState("closed", {
                    code: closeEvent.code,
                    reason: closeEvent.reason,
                    wasClean: closeEvent.wasClean
                  });
                } else {
                  this.changeState("closed");
                }
                this.unbindListeners();
                this.socket = void 0;
              }
              onMessage(message) {
                this.emit("message", message);
              }
              onActivity() {
                this.emit("activity");
              }
              bindListeners() {
                this.socket.onopen = () => {
                  this.onOpen();
                };
                this.socket.onerror = (error2) => {
                  this.onError(error2);
                };
                this.socket.onclose = (closeEvent) => {
                  this.onClose(closeEvent);
                };
                this.socket.onmessage = (message) => {
                  this.onMessage(message);
                };
                if (this.supportsPing()) {
                  this.socket.onactivity = () => {
                    this.onActivity();
                  };
                }
              }
              unbindListeners() {
                if (this.socket) {
                  this.socket.onopen = void 0;
                  this.socket.onerror = void 0;
                  this.socket.onclose = void 0;
                  this.socket.onmessage = void 0;
                  if (this.supportsPing()) {
                    this.socket.onactivity = void 0;
                  }
                }
              }
              changeState(state2, params) {
                this.state = state2;
                this.timeline.info(this.buildTimelineMessage({
                  state: state2,
                  params
                }));
                this.emit(state2, params);
              }
              buildTimelineMessage(message) {
                return extend({ cid: this.id }, message);
              }
            }
            class transport_Transport {
              constructor(hooks) {
                this.hooks = hooks;
              }
              isSupported(environment) {
                return this.hooks.isSupported(environment);
              }
              createConnection(name, priority, key2, options2) {
                return new transport_connection_TransportConnection(this.hooks, name, priority, key2, options2);
              }
            }
            var WSTransport = new transport_Transport({
              urls: ws,
              handlesActivityChecks: false,
              supportsPing: false,
              isInitialized: function() {
                return Boolean(runtime2.getWebSocketAPI());
              },
              isSupported: function() {
                return Boolean(runtime2.getWebSocketAPI());
              },
              getSocket: function(url) {
                return runtime2.createWebSocket(url);
              }
            });
            var httpConfiguration = {
              urls: http,
              handlesActivityChecks: false,
              supportsPing: true,
              isInitialized: function() {
                return true;
              }
            };
            var streamingConfiguration = extend({
              getSocket: function(url) {
                return runtime2.HTTPFactory.createStreamingSocket(url);
              }
            }, httpConfiguration);
            var pollingConfiguration = extend({
              getSocket: function(url) {
                return runtime2.HTTPFactory.createPollingSocket(url);
              }
            }, httpConfiguration);
            var xhrConfiguration = {
              isSupported: function() {
                return runtime2.isXHRSupported();
              }
            };
            var XHRStreamingTransport = new transport_Transport(extend({}, streamingConfiguration, xhrConfiguration));
            var XHRPollingTransport = new transport_Transport(extend({}, pollingConfiguration, xhrConfiguration));
            var Transports = {
              ws: WSTransport,
              xhr_streaming: XHRStreamingTransport,
              xhr_polling: XHRPollingTransport
            };
            var transports = Transports;
            var SockJSTransport = new transport_Transport({
              file: "sockjs",
              urls: sockjs,
              handlesActivityChecks: true,
              supportsPing: false,
              isSupported: function() {
                return true;
              },
              isInitialized: function() {
                return window.SockJS !== void 0;
              },
              getSocket: function(url, options2) {
                return new window.SockJS(url, null, {
                  js_path: Dependencies.getPath("sockjs", {
                    useTLS: options2.useTLS
                  }),
                  ignore_null_origin: options2.ignoreNullOrigin
                });
              },
              beforeOpen: function(socket, path) {
                socket.send(JSON.stringify({
                  path
                }));
              }
            });
            var xdrConfiguration = {
              isSupported: function(environment) {
                var yes = runtime2.isXDRSupported(environment.useTLS);
                return yes;
              }
            };
            var XDRStreamingTransport = new transport_Transport(extend({}, streamingConfiguration, xdrConfiguration));
            var XDRPollingTransport = new transport_Transport(extend({}, pollingConfiguration, xdrConfiguration));
            transports.xdr_streaming = XDRStreamingTransport;
            transports.xdr_polling = XDRPollingTransport;
            transports.sockjs = SockJSTransport;
            var transports_transports = transports;
            class net_info_NetInfo extends dispatcher_Dispatcher {
              constructor() {
                super();
                var self = this;
                if (window.addEventListener !== void 0) {
                  window.addEventListener("online", function() {
                    self.emit("online");
                  }, false);
                  window.addEventListener("offline", function() {
                    self.emit("offline");
                  }, false);
                }
              }
              isOnline() {
                if (window.navigator.onLine === void 0) {
                  return true;
                } else {
                  return window.navigator.onLine;
                }
              }
            }
            var net_info_Network = new net_info_NetInfo();
            class assistant_to_the_transport_manager_AssistantToTheTransportManager {
              constructor(manager, transport, options2) {
                this.manager = manager;
                this.transport = transport;
                this.minPingDelay = options2.minPingDelay;
                this.maxPingDelay = options2.maxPingDelay;
                this.pingDelay = void 0;
              }
              createConnection(name, priority, key2, options2) {
                options2 = extend({}, options2, {
                  activityTimeout: this.pingDelay
                });
                var connection = this.transport.createConnection(name, priority, key2, options2);
                var openTimestamp = null;
                var onOpen = function() {
                  connection.unbind("open", onOpen);
                  connection.bind("closed", onClosed);
                  openTimestamp = util.now();
                };
                var onClosed = (closeEvent) => {
                  connection.unbind("closed", onClosed);
                  if (closeEvent.code === 1002 || closeEvent.code === 1003) {
                    this.manager.reportDeath();
                  } else if (!closeEvent.wasClean && openTimestamp) {
                    var lifespan = util.now() - openTimestamp;
                    if (lifespan < 2 * this.maxPingDelay) {
                      this.manager.reportDeath();
                      this.pingDelay = Math.max(lifespan / 2, this.minPingDelay);
                    }
                  }
                };
                connection.bind("open", onOpen);
                return connection;
              }
              isSupported(environment) {
                return this.manager.isAlive() && this.transport.isSupported(environment);
              }
            }
            const Protocol = {
              decodeMessage: function(messageEvent) {
                try {
                  var messageData = JSON.parse(messageEvent.data);
                  var pusherEventData = messageData.data;
                  if (typeof pusherEventData === "string") {
                    try {
                      pusherEventData = JSON.parse(messageData.data);
                    } catch (e) {
                    }
                  }
                  var pusherEvent = {
                    event: messageData.event,
                    channel: messageData.channel,
                    data: pusherEventData
                  };
                  if (messageData.user_id) {
                    pusherEvent.user_id = messageData.user_id;
                  }
                  return pusherEvent;
                } catch (e) {
                  throw { type: "MessageParseError", error: e, data: messageEvent.data };
                }
              },
              encodeMessage: function(event) {
                return JSON.stringify(event);
              },
              processHandshake: function(messageEvent) {
                var message = Protocol.decodeMessage(messageEvent);
                if (message.event === "pusher:connection_established") {
                  if (!message.data.activity_timeout) {
                    throw "No activity timeout specified in handshake";
                  }
                  return {
                    action: "connected",
                    id: message.data.socket_id,
                    activityTimeout: message.data.activity_timeout * 1e3
                  };
                } else if (message.event === "pusher:error") {
                  return {
                    action: this.getCloseAction(message.data),
                    error: this.getCloseError(message.data)
                  };
                } else {
                  throw "Invalid handshake";
                }
              },
              getCloseAction: function(closeEvent) {
                if (closeEvent.code < 4e3) {
                  if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
                    return "backoff";
                  } else {
                    return null;
                  }
                } else if (closeEvent.code === 4e3) {
                  return "tls_only";
                } else if (closeEvent.code < 4100) {
                  return "refused";
                } else if (closeEvent.code < 4200) {
                  return "backoff";
                } else if (closeEvent.code < 4300) {
                  return "retry";
                } else {
                  return "refused";
                }
              },
              getCloseError: function(closeEvent) {
                if (closeEvent.code !== 1e3 && closeEvent.code !== 1001) {
                  return {
                    type: "PusherError",
                    data: {
                      code: closeEvent.code,
                      message: closeEvent.reason || closeEvent.message
                    }
                  };
                } else {
                  return null;
                }
              }
            };
            var protocol_protocol = Protocol;
            class connection_Connection extends dispatcher_Dispatcher {
              constructor(id, transport) {
                super();
                this.id = id;
                this.transport = transport;
                this.activityTimeout = transport.activityTimeout;
                this.bindListeners();
              }
              handlesActivityChecks() {
                return this.transport.handlesActivityChecks();
              }
              send(data) {
                return this.transport.send(data);
              }
              send_event(name, data, channel) {
                var event = { event: name, data };
                if (channel) {
                  event.channel = channel;
                }
                logger.debug("Event sent", event);
                return this.send(protocol_protocol.encodeMessage(event));
              }
              ping() {
                if (this.transport.supportsPing()) {
                  this.transport.ping();
                } else {
                  this.send_event("pusher:ping", {});
                }
              }
              close() {
                this.transport.close();
              }
              bindListeners() {
                var listeners = {
                  message: (messageEvent) => {
                    var pusherEvent;
                    try {
                      pusherEvent = protocol_protocol.decodeMessage(messageEvent);
                    } catch (e) {
                      this.emit("error", {
                        type: "MessageParseError",
                        error: e,
                        data: messageEvent.data
                      });
                    }
                    if (pusherEvent !== void 0) {
                      logger.debug("Event recd", pusherEvent);
                      switch (pusherEvent.event) {
                        case "pusher:error":
                          this.emit("error", {
                            type: "PusherError",
                            data: pusherEvent.data
                          });
                          break;
                        case "pusher:ping":
                          this.emit("ping");
                          break;
                        case "pusher:pong":
                          this.emit("pong");
                          break;
                      }
                      this.emit("message", pusherEvent);
                    }
                  },
                  activity: () => {
                    this.emit("activity");
                  },
                  error: (error2) => {
                    this.emit("error", error2);
                  },
                  closed: (closeEvent) => {
                    unbindListeners();
                    if (closeEvent && closeEvent.code) {
                      this.handleCloseEvent(closeEvent);
                    }
                    this.transport = null;
                    this.emit("closed");
                  }
                };
                var unbindListeners = () => {
                  objectApply(listeners, (listener, event) => {
                    this.transport.unbind(event, listener);
                  });
                };
                objectApply(listeners, (listener, event) => {
                  this.transport.bind(event, listener);
                });
              }
              handleCloseEvent(closeEvent) {
                var action = protocol_protocol.getCloseAction(closeEvent);
                var error2 = protocol_protocol.getCloseError(closeEvent);
                if (error2) {
                  this.emit("error", error2);
                }
                if (action) {
                  this.emit(action, { action, error: error2 });
                }
              }
            }
            class handshake_Handshake {
              constructor(transport, callback) {
                this.transport = transport;
                this.callback = callback;
                this.bindListeners();
              }
              close() {
                this.unbindListeners();
                this.transport.close();
              }
              bindListeners() {
                this.onMessage = (m) => {
                  this.unbindListeners();
                  var result;
                  try {
                    result = protocol_protocol.processHandshake(m);
                  } catch (e) {
                    this.finish("error", { error: e });
                    this.transport.close();
                    return;
                  }
                  if (result.action === "connected") {
                    this.finish("connected", {
                      connection: new connection_Connection(result.id, this.transport),
                      activityTimeout: result.activityTimeout
                    });
                  } else {
                    this.finish(result.action, { error: result.error });
                    this.transport.close();
                  }
                };
                this.onClosed = (closeEvent) => {
                  this.unbindListeners();
                  var action = protocol_protocol.getCloseAction(closeEvent) || "backoff";
                  var error2 = protocol_protocol.getCloseError(closeEvent);
                  this.finish(action, { error: error2 });
                };
                this.transport.bind("message", this.onMessage);
                this.transport.bind("closed", this.onClosed);
              }
              unbindListeners() {
                this.transport.unbind("message", this.onMessage);
                this.transport.unbind("closed", this.onClosed);
              }
              finish(action, params) {
                this.callback(extend({ transport: this.transport, action }, params));
              }
            }
            class timeline_sender_TimelineSender {
              constructor(timeline, options2) {
                this.timeline = timeline;
                this.options = options2 || {};
              }
              send(useTLS, callback) {
                if (this.timeline.isEmpty()) {
                  return;
                }
                this.timeline.send(runtime2.TimelineTransport.getAgent(this, useTLS), callback);
              }
            }
            class channel_Channel extends dispatcher_Dispatcher {
              constructor(name, pusher) {
                super(function(event, data) {
                  logger.debug("No callbacks on " + name + " for " + event);
                });
                this.name = name;
                this.pusher = pusher;
                this.subscribed = false;
                this.subscriptionPending = false;
                this.subscriptionCancelled = false;
              }
              authorize(socketId, callback) {
                return callback(null, { auth: "" });
              }
              trigger(event, data) {
                if (event.indexOf("client-") !== 0) {
                  throw new BadEventName("Event '" + event + "' does not start with 'client-'");
                }
                if (!this.subscribed) {
                  var suffix = url_store.buildLogSuffix("triggeringClientEvents");
                  logger.warn(`Client event triggered before channel 'subscription_succeeded' event . ${suffix}`);
                }
                return this.pusher.send_event(event, data, this.name);
              }
              disconnect() {
                this.subscribed = false;
                this.subscriptionPending = false;
              }
              handleEvent(event) {
                var eventName = event.event;
                var data = event.data;
                if (eventName === "pusher_internal:subscription_succeeded") {
                  this.handleSubscriptionSucceededEvent(event);
                } else if (eventName === "pusher_internal:subscription_count") {
                  this.handleSubscriptionCountEvent(event);
                } else if (eventName.indexOf("pusher_internal:") !== 0) {
                  var metadata = {};
                  this.emit(eventName, data, metadata);
                }
              }
              handleSubscriptionSucceededEvent(event) {
                this.subscriptionPending = false;
                this.subscribed = true;
                if (this.subscriptionCancelled) {
                  this.pusher.unsubscribe(this.name);
                } else {
                  this.emit("pusher:subscription_succeeded", event.data);
                }
              }
              handleSubscriptionCountEvent(event) {
                if (event.data.subscription_count) {
                  this.subscriptionCount = event.data.subscription_count;
                }
                this.emit("pusher:subscription_count", event.data);
              }
              subscribe() {
                if (this.subscribed) {
                  return;
                }
                this.subscriptionPending = true;
                this.subscriptionCancelled = false;
                this.authorize(this.pusher.connection.socket_id, (error2, data) => {
                  if (error2) {
                    this.subscriptionPending = false;
                    logger.error(error2.toString());
                    this.emit("pusher:subscription_error", Object.assign({}, {
                      type: "AuthError",
                      error: error2.message
                    }, error2 instanceof HTTPAuthError ? { status: error2.status } : {}));
                  } else {
                    this.pusher.send_event("pusher:subscribe", {
                      auth: data.auth,
                      channel_data: data.channel_data,
                      channel: this.name
                    });
                  }
                });
              }
              unsubscribe() {
                this.subscribed = false;
                this.pusher.send_event("pusher:unsubscribe", {
                  channel: this.name
                });
              }
              cancelSubscription() {
                this.subscriptionCancelled = true;
              }
              reinstateSubscription() {
                this.subscriptionCancelled = false;
              }
            }
            class private_channel_PrivateChannel extends channel_Channel {
              authorize(socketId, callback) {
                return this.pusher.config.channelAuthorizer({
                  channelName: this.name,
                  socketId
                }, callback);
              }
            }
            class members_Members {
              constructor() {
                this.reset();
              }
              get(id) {
                if (Object.prototype.hasOwnProperty.call(this.members, id)) {
                  return {
                    id,
                    info: this.members[id]
                  };
                } else {
                  return null;
                }
              }
              each(callback) {
                objectApply(this.members, (member, id) => {
                  callback(this.get(id));
                });
              }
              setMyID(id) {
                this.myID = id;
              }
              onSubscription(subscriptionData) {
                this.members = subscriptionData.presence.hash;
                this.count = subscriptionData.presence.count;
                this.me = this.get(this.myID);
              }
              addMember(memberData) {
                if (this.get(memberData.user_id) === null) {
                  this.count++;
                }
                this.members[memberData.user_id] = memberData.user_info;
                return this.get(memberData.user_id);
              }
              removeMember(memberData) {
                var member = this.get(memberData.user_id);
                if (member) {
                  delete this.members[memberData.user_id];
                  this.count--;
                }
                return member;
              }
              reset() {
                this.members = {};
                this.count = 0;
                this.myID = null;
                this.me = null;
              }
            }
            var __awaiter2 = function(thisArg, _arguments, P, generator) {
              function adopt(value) {
                return value instanceof P ? value : new P(function(resolve) {
                  resolve(value);
                });
              }
              return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                  try {
                    step(generator.next(value));
                  } catch (e) {
                    reject(e);
                  }
                }
                function rejected(value) {
                  try {
                    step(generator["throw"](value));
                  } catch (e) {
                    reject(e);
                  }
                }
                function step(result) {
                  result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
              });
            };
            class presence_channel_PresenceChannel extends private_channel_PrivateChannel {
              constructor(name, pusher) {
                super(name, pusher);
                this.members = new members_Members();
              }
              authorize(socketId, callback) {
                super.authorize(socketId, (error2, authData) => __awaiter2(this, void 0, void 0, function* () {
                  if (!error2) {
                    authData = authData;
                    if (authData.channel_data != null) {
                      var channelData = JSON.parse(authData.channel_data);
                      this.members.setMyID(channelData.user_id);
                    } else {
                      yield this.pusher.user.signinDonePromise;
                      if (this.pusher.user.user_data != null) {
                        this.members.setMyID(this.pusher.user.user_data.id);
                      } else {
                        let suffix = url_store.buildLogSuffix("authorizationEndpoint");
                        logger.error(`Invalid auth response for channel '${this.name}', expected 'channel_data' field. ${suffix}, or the user should be signed in.`);
                        callback("Invalid auth response");
                        return;
                      }
                    }
                  }
                  callback(error2, authData);
                }));
              }
              handleEvent(event) {
                var eventName = event.event;
                if (eventName.indexOf("pusher_internal:") === 0) {
                  this.handleInternalEvent(event);
                } else {
                  var data = event.data;
                  var metadata = {};
                  if (event.user_id) {
                    metadata.user_id = event.user_id;
                  }
                  this.emit(eventName, data, metadata);
                }
              }
              handleInternalEvent(event) {
                var eventName = event.event;
                var data = event.data;
                switch (eventName) {
                  case "pusher_internal:subscription_succeeded":
                    this.handleSubscriptionSucceededEvent(event);
                    break;
                  case "pusher_internal:subscription_count":
                    this.handleSubscriptionCountEvent(event);
                    break;
                  case "pusher_internal:member_added":
                    var addedMember = this.members.addMember(data);
                    this.emit("pusher:member_added", addedMember);
                    break;
                  case "pusher_internal:member_removed":
                    var removedMember = this.members.removeMember(data);
                    if (removedMember) {
                      this.emit("pusher:member_removed", removedMember);
                    }
                    break;
                }
              }
              handleSubscriptionSucceededEvent(event) {
                this.subscriptionPending = false;
                this.subscribed = true;
                if (this.subscriptionCancelled) {
                  this.pusher.unsubscribe(this.name);
                } else {
                  this.members.onSubscription(event.data);
                  this.emit("pusher:subscription_succeeded", this.members);
                }
              }
              disconnect() {
                this.members.reset();
                super.disconnect();
              }
            }
            var utf8 = __webpack_require__(1);
            var base642 = __webpack_require__(0);
            class encrypted_channel_EncryptedChannel extends private_channel_PrivateChannel {
              constructor(name, pusher, nacl) {
                super(name, pusher);
                this.key = null;
                this.nacl = nacl;
              }
              authorize(socketId, callback) {
                super.authorize(socketId, (error2, authData) => {
                  if (error2) {
                    callback(error2, authData);
                    return;
                  }
                  let sharedSecret = authData["shared_secret"];
                  if (!sharedSecret) {
                    callback(new Error(`No shared_secret key in auth payload for encrypted channel: ${this.name}`), null);
                    return;
                  }
                  this.key = Object(base642["decode"])(sharedSecret);
                  delete authData["shared_secret"];
                  callback(null, authData);
                });
              }
              trigger(event, data) {
                throw new UnsupportedFeature("Client events are not currently supported for encrypted channels");
              }
              handleEvent(event) {
                var eventName = event.event;
                var data = event.data;
                if (eventName.indexOf("pusher_internal:") === 0 || eventName.indexOf("pusher:") === 0) {
                  super.handleEvent(event);
                  return;
                }
                this.handleEncryptedEvent(eventName, data);
              }
              handleEncryptedEvent(event, data) {
                if (!this.key) {
                  logger.debug("Received encrypted event before key has been retrieved from the authEndpoint");
                  return;
                }
                if (!data.ciphertext || !data.nonce) {
                  logger.error("Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " + data);
                  return;
                }
                let cipherText = Object(base642["decode"])(data.ciphertext);
                if (cipherText.length < this.nacl.secretbox.overheadLength) {
                  logger.error(`Expected encrypted event ciphertext length to be ${this.nacl.secretbox.overheadLength}, got: ${cipherText.length}`);
                  return;
                }
                let nonce = Object(base642["decode"])(data.nonce);
                if (nonce.length < this.nacl.secretbox.nonceLength) {
                  logger.error(`Expected encrypted event nonce length to be ${this.nacl.secretbox.nonceLength}, got: ${nonce.length}`);
                  return;
                }
                let bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
                if (bytes === null) {
                  logger.debug("Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...");
                  this.authorize(this.pusher.connection.socket_id, (error2, authData) => {
                    if (error2) {
                      logger.error(`Failed to make a request to the authEndpoint: ${authData}. Unable to fetch new key, so dropping encrypted event`);
                      return;
                    }
                    bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
                    if (bytes === null) {
                      logger.error(`Failed to decrypt event with new key. Dropping encrypted event`);
                      return;
                    }
                    this.emit(event, this.getDataToEmit(bytes));
                    return;
                  });
                  return;
                }
                this.emit(event, this.getDataToEmit(bytes));
              }
              getDataToEmit(bytes) {
                let raw = Object(utf8["decode"])(bytes);
                try {
                  return JSON.parse(raw);
                } catch (_a93) {
                  return raw;
                }
              }
            }
            class connection_manager_ConnectionManager extends dispatcher_Dispatcher {
              constructor(key2, options2) {
                super();
                this.state = "initialized";
                this.connection = null;
                this.key = key2;
                this.options = options2;
                this.timeline = this.options.timeline;
                this.usingTLS = this.options.useTLS;
                this.errorCallbacks = this.buildErrorCallbacks();
                this.connectionCallbacks = this.buildConnectionCallbacks(this.errorCallbacks);
                this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);
                var Network = runtime2.getNetwork();
                Network.bind("online", () => {
                  this.timeline.info({ netinfo: "online" });
                  if (this.state === "connecting" || this.state === "unavailable") {
                    this.retryIn(0);
                  }
                });
                Network.bind("offline", () => {
                  this.timeline.info({ netinfo: "offline" });
                  if (this.connection) {
                    this.sendActivityCheck();
                  }
                });
                this.updateStrategy();
              }
              connect() {
                if (this.connection || this.runner) {
                  return;
                }
                if (!this.strategy.isSupported()) {
                  this.updateState("failed");
                  return;
                }
                this.updateState("connecting");
                this.startConnecting();
                this.setUnavailableTimer();
              }
              send(data) {
                if (this.connection) {
                  return this.connection.send(data);
                } else {
                  return false;
                }
              }
              send_event(name, data, channel) {
                if (this.connection) {
                  return this.connection.send_event(name, data, channel);
                } else {
                  return false;
                }
              }
              disconnect() {
                this.disconnectInternally();
                this.updateState("disconnected");
              }
              isUsingTLS() {
                return this.usingTLS;
              }
              startConnecting() {
                var callback = (error2, handshake) => {
                  if (error2) {
                    this.runner = this.strategy.connect(0, callback);
                  } else {
                    if (handshake.action === "error") {
                      this.emit("error", {
                        type: "HandshakeError",
                        error: handshake.error
                      });
                      this.timeline.error({ handshakeError: handshake.error });
                    } else {
                      this.abortConnecting();
                      this.handshakeCallbacks[handshake.action](handshake);
                    }
                  }
                };
                this.runner = this.strategy.connect(0, callback);
              }
              abortConnecting() {
                if (this.runner) {
                  this.runner.abort();
                  this.runner = null;
                }
              }
              disconnectInternally() {
                this.abortConnecting();
                this.clearRetryTimer();
                this.clearUnavailableTimer();
                if (this.connection) {
                  var connection = this.abandonConnection();
                  connection.close();
                }
              }
              updateStrategy() {
                this.strategy = this.options.getStrategy({
                  key: this.key,
                  timeline: this.timeline,
                  useTLS: this.usingTLS
                });
              }
              retryIn(delay) {
                this.timeline.info({ action: "retry", delay });
                if (delay > 0) {
                  this.emit("connecting_in", Math.round(delay / 1e3));
                }
                this.retryTimer = new timers_OneOffTimer(delay || 0, () => {
                  this.disconnectInternally();
                  this.connect();
                });
              }
              clearRetryTimer() {
                if (this.retryTimer) {
                  this.retryTimer.ensureAborted();
                  this.retryTimer = null;
                }
              }
              setUnavailableTimer() {
                this.unavailableTimer = new timers_OneOffTimer(this.options.unavailableTimeout, () => {
                  this.updateState("unavailable");
                });
              }
              clearUnavailableTimer() {
                if (this.unavailableTimer) {
                  this.unavailableTimer.ensureAborted();
                }
              }
              sendActivityCheck() {
                this.stopActivityCheck();
                this.connection.ping();
                this.activityTimer = new timers_OneOffTimer(this.options.pongTimeout, () => {
                  this.timeline.error({ pong_timed_out: this.options.pongTimeout });
                  this.retryIn(0);
                });
              }
              resetActivityCheck() {
                this.stopActivityCheck();
                if (this.connection && !this.connection.handlesActivityChecks()) {
                  this.activityTimer = new timers_OneOffTimer(this.activityTimeout, () => {
                    this.sendActivityCheck();
                  });
                }
              }
              stopActivityCheck() {
                if (this.activityTimer) {
                  this.activityTimer.ensureAborted();
                }
              }
              buildConnectionCallbacks(errorCallbacks) {
                return extend({}, errorCallbacks, {
                  message: (message) => {
                    this.resetActivityCheck();
                    this.emit("message", message);
                  },
                  ping: () => {
                    this.send_event("pusher:pong", {});
                  },
                  activity: () => {
                    this.resetActivityCheck();
                  },
                  error: (error2) => {
                    this.emit("error", error2);
                  },
                  closed: () => {
                    this.abandonConnection();
                    if (this.shouldRetry()) {
                      this.retryIn(1e3);
                    }
                  }
                });
              }
              buildHandshakeCallbacks(errorCallbacks) {
                return extend({}, errorCallbacks, {
                  connected: (handshake) => {
                    this.activityTimeout = Math.min(this.options.activityTimeout, handshake.activityTimeout, handshake.connection.activityTimeout || Infinity);
                    this.clearUnavailableTimer();
                    this.setConnection(handshake.connection);
                    this.socket_id = this.connection.id;
                    this.updateState("connected", { socket_id: this.socket_id });
                  }
                });
              }
              buildErrorCallbacks() {
                let withErrorEmitted = (callback) => {
                  return (result) => {
                    if (result.error) {
                      this.emit("error", { type: "WebSocketError", error: result.error });
                    }
                    callback(result);
                  };
                };
                return {
                  tls_only: withErrorEmitted(() => {
                    this.usingTLS = true;
                    this.updateStrategy();
                    this.retryIn(0);
                  }),
                  refused: withErrorEmitted(() => {
                    this.disconnect();
                  }),
                  backoff: withErrorEmitted(() => {
                    this.retryIn(1e3);
                  }),
                  retry: withErrorEmitted(() => {
                    this.retryIn(0);
                  })
                };
              }
              setConnection(connection) {
                this.connection = connection;
                for (var event in this.connectionCallbacks) {
                  this.connection.bind(event, this.connectionCallbacks[event]);
                }
                this.resetActivityCheck();
              }
              abandonConnection() {
                if (!this.connection) {
                  return;
                }
                this.stopActivityCheck();
                for (var event in this.connectionCallbacks) {
                  this.connection.unbind(event, this.connectionCallbacks[event]);
                }
                var connection = this.connection;
                this.connection = null;
                return connection;
              }
              updateState(newState, data) {
                var previousState = this.state;
                this.state = newState;
                if (previousState !== newState) {
                  var newStateDescription = newState;
                  if (newStateDescription === "connected") {
                    newStateDescription += " with new socket ID " + data.socket_id;
                  }
                  logger.debug("State changed", previousState + " -> " + newStateDescription);
                  this.timeline.info({ state: newState, params: data });
                  this.emit("state_change", { previous: previousState, current: newState });
                  this.emit(newState, data);
                }
              }
              shouldRetry() {
                return this.state === "connecting" || this.state === "connected";
              }
            }
            class channels_Channels {
              constructor() {
                this.channels = {};
              }
              add(name, pusher) {
                if (!this.channels[name]) {
                  this.channels[name] = createChannel(name, pusher);
                }
                return this.channels[name];
              }
              all() {
                return values(this.channels);
              }
              find(name) {
                return this.channels[name];
              }
              remove(name) {
                var channel = this.channels[name];
                delete this.channels[name];
                return channel;
              }
              disconnect() {
                objectApply(this.channels, function(channel) {
                  channel.disconnect();
                });
              }
            }
            function createChannel(name, pusher) {
              if (name.indexOf("private-encrypted-") === 0) {
                if (pusher.config.nacl) {
                  return factory.createEncryptedChannel(name, pusher, pusher.config.nacl);
                }
                let errMsg = "Tried to subscribe to a private-encrypted- channel but no nacl implementation available";
                let suffix = url_store.buildLogSuffix("encryptedChannelSupport");
                throw new UnsupportedFeature(`${errMsg}. ${suffix}`);
              } else if (name.indexOf("private-") === 0) {
                return factory.createPrivateChannel(name, pusher);
              } else if (name.indexOf("presence-") === 0) {
                return factory.createPresenceChannel(name, pusher);
              } else if (name.indexOf("#") === 0) {
                throw new BadChannelName('Cannot create a channel with name "' + name + '".');
              } else {
                return factory.createChannel(name, pusher);
              }
            }
            var Factory = {
              createChannels() {
                return new channels_Channels();
              },
              createConnectionManager(key2, options2) {
                return new connection_manager_ConnectionManager(key2, options2);
              },
              createChannel(name, pusher) {
                return new channel_Channel(name, pusher);
              },
              createPrivateChannel(name, pusher) {
                return new private_channel_PrivateChannel(name, pusher);
              },
              createPresenceChannel(name, pusher) {
                return new presence_channel_PresenceChannel(name, pusher);
              },
              createEncryptedChannel(name, pusher, nacl) {
                return new encrypted_channel_EncryptedChannel(name, pusher, nacl);
              },
              createTimelineSender(timeline, options2) {
                return new timeline_sender_TimelineSender(timeline, options2);
              },
              createHandshake(transport, callback) {
                return new handshake_Handshake(transport, callback);
              },
              createAssistantToTheTransportManager(manager, transport, options2) {
                return new assistant_to_the_transport_manager_AssistantToTheTransportManager(manager, transport, options2);
              }
            };
            var factory = Factory;
            class transport_manager_TransportManager {
              constructor(options2) {
                this.options = options2 || {};
                this.livesLeft = this.options.lives || Infinity;
              }
              getAssistant(transport) {
                return factory.createAssistantToTheTransportManager(this, transport, {
                  minPingDelay: this.options.minPingDelay,
                  maxPingDelay: this.options.maxPingDelay
                });
              }
              isAlive() {
                return this.livesLeft > 0;
              }
              reportDeath() {
                this.livesLeft -= 1;
              }
            }
            class sequential_strategy_SequentialStrategy {
              constructor(strategies, options2) {
                this.strategies = strategies;
                this.loop = Boolean(options2.loop);
                this.failFast = Boolean(options2.failFast);
                this.timeout = options2.timeout;
                this.timeoutLimit = options2.timeoutLimit;
              }
              isSupported() {
                return any(this.strategies, util.method("isSupported"));
              }
              connect(minPriority, callback) {
                var strategies = this.strategies;
                var current = 0;
                var timeout = this.timeout;
                var runner = null;
                var tryNextStrategy = (error2, handshake) => {
                  if (handshake) {
                    callback(null, handshake);
                  } else {
                    current = current + 1;
                    if (this.loop) {
                      current = current % strategies.length;
                    }
                    if (current < strategies.length) {
                      if (timeout) {
                        timeout = timeout * 2;
                        if (this.timeoutLimit) {
                          timeout = Math.min(timeout, this.timeoutLimit);
                        }
                      }
                      runner = this.tryStrategy(strategies[current], minPriority, { timeout, failFast: this.failFast }, tryNextStrategy);
                    } else {
                      callback(true);
                    }
                  }
                };
                runner = this.tryStrategy(strategies[current], minPriority, { timeout, failFast: this.failFast }, tryNextStrategy);
                return {
                  abort: function() {
                    runner.abort();
                  },
                  forceMinPriority: function(p) {
                    minPriority = p;
                    if (runner) {
                      runner.forceMinPriority(p);
                    }
                  }
                };
              }
              tryStrategy(strategy, minPriority, options2, callback) {
                var timer = null;
                var runner = null;
                if (options2.timeout > 0) {
                  timer = new timers_OneOffTimer(options2.timeout, function() {
                    runner.abort();
                    callback(true);
                  });
                }
                runner = strategy.connect(minPriority, function(error2, handshake) {
                  if (error2 && timer && timer.isRunning() && !options2.failFast) {
                    return;
                  }
                  if (timer) {
                    timer.ensureAborted();
                  }
                  callback(error2, handshake);
                });
                return {
                  abort: function() {
                    if (timer) {
                      timer.ensureAborted();
                    }
                    runner.abort();
                  },
                  forceMinPriority: function(p) {
                    runner.forceMinPriority(p);
                  }
                };
              }
            }
            class best_connected_ever_strategy_BestConnectedEverStrategy {
              constructor(strategies) {
                this.strategies = strategies;
              }
              isSupported() {
                return any(this.strategies, util.method("isSupported"));
              }
              connect(minPriority, callback) {
                return connect(this.strategies, minPriority, function(i, runners) {
                  return function(error2, handshake) {
                    runners[i].error = error2;
                    if (error2) {
                      if (allRunnersFailed(runners)) {
                        callback(true);
                      }
                      return;
                    }
                    apply(runners, function(runner) {
                      runner.forceMinPriority(handshake.transport.priority);
                    });
                    callback(null, handshake);
                  };
                });
              }
            }
            function connect(strategies, minPriority, callbackBuilder) {
              var runners = map(strategies, function(strategy, i, _, rs) {
                return strategy.connect(minPriority, callbackBuilder(i, rs));
              });
              return {
                abort: function() {
                  apply(runners, abortRunner);
                },
                forceMinPriority: function(p) {
                  apply(runners, function(runner) {
                    runner.forceMinPriority(p);
                  });
                }
              };
            }
            function allRunnersFailed(runners) {
              return collections_all(runners, function(runner) {
                return Boolean(runner.error);
              });
            }
            function abortRunner(runner) {
              if (!runner.error && !runner.aborted) {
                runner.abort();
                runner.aborted = true;
              }
            }
            class websocket_prioritized_cached_strategy_WebSocketPrioritizedCachedStrategy {
              constructor(strategy, transports2, options2) {
                this.strategy = strategy;
                this.transports = transports2;
                this.ttl = options2.ttl || 1800 * 1e3;
                this.usingTLS = options2.useTLS;
                this.timeline = options2.timeline;
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(minPriority, callback) {
                var usingTLS = this.usingTLS;
                var info = fetchTransportCache(usingTLS);
                var cacheSkipCount = info && info.cacheSkipCount ? info.cacheSkipCount : 0;
                var strategies = [this.strategy];
                if (info && info.timestamp + this.ttl >= util.now()) {
                  var transport = this.transports[info.transport];
                  if (transport) {
                    if (["ws", "wss"].includes(info.transport) || cacheSkipCount > 3) {
                      this.timeline.info({
                        cached: true,
                        transport: info.transport,
                        latency: info.latency
                      });
                      strategies.push(new sequential_strategy_SequentialStrategy([transport], {
                        timeout: info.latency * 2 + 1e3,
                        failFast: true
                      }));
                    } else {
                      cacheSkipCount++;
                    }
                  }
                }
                var startTimestamp = util.now();
                var runner = strategies.pop().connect(minPriority, function cb(error2, handshake) {
                  if (error2) {
                    flushTransportCache(usingTLS);
                    if (strategies.length > 0) {
                      startTimestamp = util.now();
                      runner = strategies.pop().connect(minPriority, cb);
                    } else {
                      callback(error2);
                    }
                  } else {
                    storeTransportCache(usingTLS, handshake.transport.name, util.now() - startTimestamp, cacheSkipCount);
                    callback(null, handshake);
                  }
                });
                return {
                  abort: function() {
                    runner.abort();
                  },
                  forceMinPriority: function(p) {
                    minPriority = p;
                    if (runner) {
                      runner.forceMinPriority(p);
                    }
                  }
                };
              }
            }
            function getTransportCacheKey(usingTLS) {
              return "pusherTransport" + (usingTLS ? "TLS" : "NonTLS");
            }
            function fetchTransportCache(usingTLS) {
              var storage = runtime2.getLocalStorage();
              if (storage) {
                try {
                  var serializedCache = storage[getTransportCacheKey(usingTLS)];
                  if (serializedCache) {
                    return JSON.parse(serializedCache);
                  }
                } catch (e) {
                  flushTransportCache(usingTLS);
                }
              }
              return null;
            }
            function storeTransportCache(usingTLS, transport, latency, cacheSkipCount) {
              var storage = runtime2.getLocalStorage();
              if (storage) {
                try {
                  storage[getTransportCacheKey(usingTLS)] = safeJSONStringify({
                    timestamp: util.now(),
                    transport,
                    latency,
                    cacheSkipCount
                  });
                } catch (e) {
                }
              }
            }
            function flushTransportCache(usingTLS) {
              var storage = runtime2.getLocalStorage();
              if (storage) {
                try {
                  delete storage[getTransportCacheKey(usingTLS)];
                } catch (e) {
                }
              }
            }
            class delayed_strategy_DelayedStrategy {
              constructor(strategy, { delay: number }) {
                this.strategy = strategy;
                this.options = { delay: number };
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(minPriority, callback) {
                var strategy = this.strategy;
                var runner;
                var timer = new timers_OneOffTimer(this.options.delay, function() {
                  runner = strategy.connect(minPriority, callback);
                });
                return {
                  abort: function() {
                    timer.ensureAborted();
                    if (runner) {
                      runner.abort();
                    }
                  },
                  forceMinPriority: function(p) {
                    minPriority = p;
                    if (runner) {
                      runner.forceMinPriority(p);
                    }
                  }
                };
              }
            }
            class IfStrategy {
              constructor(test, trueBranch, falseBranch) {
                this.test = test;
                this.trueBranch = trueBranch;
                this.falseBranch = falseBranch;
              }
              isSupported() {
                var branch = this.test() ? this.trueBranch : this.falseBranch;
                return branch.isSupported();
              }
              connect(minPriority, callback) {
                var branch = this.test() ? this.trueBranch : this.falseBranch;
                return branch.connect(minPriority, callback);
              }
            }
            class FirstConnectedStrategy {
              constructor(strategy) {
                this.strategy = strategy;
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(minPriority, callback) {
                var runner = this.strategy.connect(minPriority, function(error2, handshake) {
                  if (handshake) {
                    runner.abort();
                  }
                  callback(error2, handshake);
                });
                return runner;
              }
            }
            function testSupportsStrategy(strategy) {
              return function() {
                return strategy.isSupported();
              };
            }
            var getDefaultStrategy = function(config, baseOptions, defineTransport) {
              var definedTransports = {};
              function defineTransportStrategy(name, type, priority, options2, manager) {
                var transport = defineTransport(config, name, type, priority, options2, manager);
                definedTransports[name] = transport;
                return transport;
              }
              var ws_options = Object.assign({}, baseOptions, {
                hostNonTLS: config.wsHost + ":" + config.wsPort,
                hostTLS: config.wsHost + ":" + config.wssPort,
                httpPath: config.wsPath
              });
              var wss_options = Object.assign({}, ws_options, {
                useTLS: true
              });
              var sockjs_options = Object.assign({}, baseOptions, {
                hostNonTLS: config.httpHost + ":" + config.httpPort,
                hostTLS: config.httpHost + ":" + config.httpsPort,
                httpPath: config.httpPath
              });
              var timeouts = {
                loop: true,
                timeout: 15e3,
                timeoutLimit: 6e4
              };
              var ws_manager = new transport_manager_TransportManager({
                minPingDelay: 1e4,
                maxPingDelay: config.activityTimeout
              });
              var streaming_manager = new transport_manager_TransportManager({
                lives: 2,
                minPingDelay: 1e4,
                maxPingDelay: config.activityTimeout
              });
              var ws_transport = defineTransportStrategy("ws", "ws", 3, ws_options, ws_manager);
              var wss_transport = defineTransportStrategy("wss", "ws", 3, wss_options, ws_manager);
              var sockjs_transport = defineTransportStrategy("sockjs", "sockjs", 1, sockjs_options);
              var xhr_streaming_transport = defineTransportStrategy("xhr_streaming", "xhr_streaming", 1, sockjs_options, streaming_manager);
              var xdr_streaming_transport = defineTransportStrategy("xdr_streaming", "xdr_streaming", 1, sockjs_options, streaming_manager);
              var xhr_polling_transport = defineTransportStrategy("xhr_polling", "xhr_polling", 1, sockjs_options);
              var xdr_polling_transport = defineTransportStrategy("xdr_polling", "xdr_polling", 1, sockjs_options);
              var ws_loop = new sequential_strategy_SequentialStrategy([ws_transport], timeouts);
              var wss_loop = new sequential_strategy_SequentialStrategy([wss_transport], timeouts);
              var sockjs_loop = new sequential_strategy_SequentialStrategy([sockjs_transport], timeouts);
              var streaming_loop = new sequential_strategy_SequentialStrategy([
                new IfStrategy(testSupportsStrategy(xhr_streaming_transport), xhr_streaming_transport, xdr_streaming_transport)
              ], timeouts);
              var polling_loop = new sequential_strategy_SequentialStrategy([
                new IfStrategy(testSupportsStrategy(xhr_polling_transport), xhr_polling_transport, xdr_polling_transport)
              ], timeouts);
              var http_loop = new sequential_strategy_SequentialStrategy([
                new IfStrategy(testSupportsStrategy(streaming_loop), new best_connected_ever_strategy_BestConnectedEverStrategy([
                  streaming_loop,
                  new delayed_strategy_DelayedStrategy(polling_loop, { delay: 4e3 })
                ]), polling_loop)
              ], timeouts);
              var http_fallback_loop = new IfStrategy(testSupportsStrategy(http_loop), http_loop, sockjs_loop);
              var wsStrategy;
              if (baseOptions.useTLS) {
                wsStrategy = new best_connected_ever_strategy_BestConnectedEverStrategy([
                  ws_loop,
                  new delayed_strategy_DelayedStrategy(http_fallback_loop, { delay: 2e3 })
                ]);
              } else {
                wsStrategy = new best_connected_ever_strategy_BestConnectedEverStrategy([
                  ws_loop,
                  new delayed_strategy_DelayedStrategy(wss_loop, { delay: 2e3 }),
                  new delayed_strategy_DelayedStrategy(http_fallback_loop, { delay: 5e3 })
                ]);
              }
              return new websocket_prioritized_cached_strategy_WebSocketPrioritizedCachedStrategy(new FirstConnectedStrategy(new IfStrategy(testSupportsStrategy(ws_transport), wsStrategy, http_fallback_loop)), definedTransports, {
                ttl: 18e5,
                timeline: baseOptions.timeline,
                useTLS: baseOptions.useTLS
              });
            };
            var default_strategy = getDefaultStrategy;
            var transport_connection_initializer = function() {
              var self = this;
              self.timeline.info(self.buildTimelineMessage({
                transport: self.name + (self.options.useTLS ? "s" : "")
              }));
              if (self.hooks.isInitialized()) {
                self.changeState("initialized");
              } else if (self.hooks.file) {
                self.changeState("initializing");
                Dependencies.load(self.hooks.file, { useTLS: self.options.useTLS }, function(error2, callback) {
                  if (self.hooks.isInitialized()) {
                    self.changeState("initialized");
                    callback(true);
                  } else {
                    if (error2) {
                      self.onError(error2);
                    }
                    self.onClose();
                    callback(false);
                  }
                });
              } else {
                self.onClose();
              }
            };
            var http_xdomain_request_hooks = {
              getRequest: function(socket) {
                var xdr = new window.XDomainRequest();
                xdr.ontimeout = function() {
                  socket.emit("error", new RequestTimedOut());
                  socket.close();
                };
                xdr.onerror = function(e) {
                  socket.emit("error", e);
                  socket.close();
                };
                xdr.onprogress = function() {
                  if (xdr.responseText && xdr.responseText.length > 0) {
                    socket.onChunk(200, xdr.responseText);
                  }
                };
                xdr.onload = function() {
                  if (xdr.responseText && xdr.responseText.length > 0) {
                    socket.onChunk(200, xdr.responseText);
                  }
                  socket.emit("finished", 200);
                  socket.close();
                };
                return xdr;
              },
              abortRequest: function(xdr) {
                xdr.ontimeout = xdr.onerror = xdr.onprogress = xdr.onload = null;
                xdr.abort();
              }
            };
            var http_xdomain_request = http_xdomain_request_hooks;
            const MAX_BUFFER_LENGTH = 256 * 1024;
            class http_request_HTTPRequest extends dispatcher_Dispatcher {
              constructor(hooks, method, url) {
                super();
                this.hooks = hooks;
                this.method = method;
                this.url = url;
              }
              start(payload) {
                this.position = 0;
                this.xhr = this.hooks.getRequest(this);
                this.unloader = () => {
                  this.close();
                };
                runtime2.addUnloadListener(this.unloader);
                this.xhr.open(this.method, this.url, true);
                if (this.xhr.setRequestHeader) {
                  this.xhr.setRequestHeader("Content-Type", "application/json");
                }
                this.xhr.send(payload);
              }
              close() {
                if (this.unloader) {
                  runtime2.removeUnloadListener(this.unloader);
                  this.unloader = null;
                }
                if (this.xhr) {
                  this.hooks.abortRequest(this.xhr);
                  this.xhr = null;
                }
              }
              onChunk(status, data) {
                while (true) {
                  var chunk = this.advanceBuffer(data);
                  if (chunk) {
                    this.emit("chunk", { status, data: chunk });
                  } else {
                    break;
                  }
                }
                if (this.isBufferTooLong(data)) {
                  this.emit("buffer_too_long");
                }
              }
              advanceBuffer(buffer) {
                var unreadData = buffer.slice(this.position);
                var endOfLinePosition = unreadData.indexOf("\n");
                if (endOfLinePosition !== -1) {
                  this.position += endOfLinePosition + 1;
                  return unreadData.slice(0, endOfLinePosition);
                } else {
                  return null;
                }
              }
              isBufferTooLong(buffer) {
                return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
              }
            }
            var State;
            (function(State2) {
              State2[State2["CONNECTING"] = 0] = "CONNECTING";
              State2[State2["OPEN"] = 1] = "OPEN";
              State2[State2["CLOSED"] = 3] = "CLOSED";
            })(State || (State = {}));
            var state = State;
            var autoIncrement = 1;
            class http_socket_HTTPSocket {
              constructor(hooks, url) {
                this.hooks = hooks;
                this.session = randomNumber(1e3) + "/" + randomString(8);
                this.location = getLocation(url);
                this.readyState = state.CONNECTING;
                this.openStream();
              }
              send(payload) {
                return this.sendRaw(JSON.stringify([payload]));
              }
              ping() {
                this.hooks.sendHeartbeat(this);
              }
              close(code, reason) {
                this.onClose(code, reason, true);
              }
              sendRaw(payload) {
                if (this.readyState === state.OPEN) {
                  try {
                    runtime2.createSocketRequest("POST", getUniqueURL(getSendURL(this.location, this.session))).start(payload);
                    return true;
                  } catch (e) {
                    return false;
                  }
                } else {
                  return false;
                }
              }
              reconnect() {
                this.closeStream();
                this.openStream();
              }
              onClose(code, reason, wasClean) {
                this.closeStream();
                this.readyState = state.CLOSED;
                if (this.onclose) {
                  this.onclose({
                    code,
                    reason,
                    wasClean
                  });
                }
              }
              onChunk(chunk) {
                if (chunk.status !== 200) {
                  return;
                }
                if (this.readyState === state.OPEN) {
                  this.onActivity();
                }
                var payload;
                var type = chunk.data.slice(0, 1);
                switch (type) {
                  case "o":
                    payload = JSON.parse(chunk.data.slice(1) || "{}");
                    this.onOpen(payload);
                    break;
                  case "a":
                    payload = JSON.parse(chunk.data.slice(1) || "[]");
                    for (var i = 0; i < payload.length; i++) {
                      this.onEvent(payload[i]);
                    }
                    break;
                  case "m":
                    payload = JSON.parse(chunk.data.slice(1) || "null");
                    this.onEvent(payload);
                    break;
                  case "h":
                    this.hooks.onHeartbeat(this);
                    break;
                  case "c":
                    payload = JSON.parse(chunk.data.slice(1) || "[]");
                    this.onClose(payload[0], payload[1], true);
                    break;
                }
              }
              onOpen(options2) {
                if (this.readyState === state.CONNECTING) {
                  if (options2 && options2.hostname) {
                    this.location.base = replaceHost(this.location.base, options2.hostname);
                  }
                  this.readyState = state.OPEN;
                  if (this.onopen) {
                    this.onopen();
                  }
                } else {
                  this.onClose(1006, "Server lost session", true);
                }
              }
              onEvent(event) {
                if (this.readyState === state.OPEN && this.onmessage) {
                  this.onmessage({ data: event });
                }
              }
              onActivity() {
                if (this.onactivity) {
                  this.onactivity();
                }
              }
              onError(error2) {
                if (this.onerror) {
                  this.onerror(error2);
                }
              }
              openStream() {
                this.stream = runtime2.createSocketRequest("POST", getUniqueURL(this.hooks.getReceiveURL(this.location, this.session)));
                this.stream.bind("chunk", (chunk) => {
                  this.onChunk(chunk);
                });
                this.stream.bind("finished", (status) => {
                  this.hooks.onFinished(this, status);
                });
                this.stream.bind("buffer_too_long", () => {
                  this.reconnect();
                });
                try {
                  this.stream.start();
                } catch (error2) {
                  util.defer(() => {
                    this.onError(error2);
                    this.onClose(1006, "Could not start streaming", false);
                  });
                }
              }
              closeStream() {
                if (this.stream) {
                  this.stream.unbind_all();
                  this.stream.close();
                  this.stream = null;
                }
              }
            }
            function getLocation(url) {
              var parts = /([^\?]*)\/*(\??.*)/.exec(url);
              return {
                base: parts[1],
                queryString: parts[2]
              };
            }
            function getSendURL(url, session) {
              return url.base + "/" + session + "/xhr_send";
            }
            function getUniqueURL(url) {
              var separator = url.indexOf("?") === -1 ? "?" : "&";
              return url + separator + "t=" + +/* @__PURE__ */ new Date() + "&n=" + autoIncrement++;
            }
            function replaceHost(url, hostname) {
              var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
              return urlParts[1] + hostname + urlParts[3];
            }
            function randomNumber(max) {
              return runtime2.randomInt(max);
            }
            function randomString(length) {
              var result = [];
              for (var i = 0; i < length; i++) {
                result.push(randomNumber(32).toString(32));
              }
              return result.join("");
            }
            var http_socket = http_socket_HTTPSocket;
            var http_streaming_socket_hooks = {
              getReceiveURL: function(url, session) {
                return url.base + "/" + session + "/xhr_streaming" + url.queryString;
              },
              onHeartbeat: function(socket) {
                socket.sendRaw("[]");
              },
              sendHeartbeat: function(socket) {
                socket.sendRaw("[]");
              },
              onFinished: function(socket, status) {
                socket.onClose(1006, "Connection interrupted (" + status + ")", false);
              }
            };
            var http_streaming_socket = http_streaming_socket_hooks;
            var http_polling_socket_hooks = {
              getReceiveURL: function(url, session) {
                return url.base + "/" + session + "/xhr" + url.queryString;
              },
              onHeartbeat: function() {
              },
              sendHeartbeat: function(socket) {
                socket.sendRaw("[]");
              },
              onFinished: function(socket, status) {
                if (status === 200) {
                  socket.reconnect();
                } else {
                  socket.onClose(1006, "Connection interrupted (" + status + ")", false);
                }
              }
            };
            var http_polling_socket = http_polling_socket_hooks;
            var http_xhr_request_hooks = {
              getRequest: function(socket) {
                var Constructor = runtime2.getXHRAPI();
                var xhr = new Constructor();
                xhr.onreadystatechange = xhr.onprogress = function() {
                  switch (xhr.readyState) {
                    case 3:
                      if (xhr.responseText && xhr.responseText.length > 0) {
                        socket.onChunk(xhr.status, xhr.responseText);
                      }
                      break;
                    case 4:
                      if (xhr.responseText && xhr.responseText.length > 0) {
                        socket.onChunk(xhr.status, xhr.responseText);
                      }
                      socket.emit("finished", xhr.status);
                      socket.close();
                      break;
                  }
                };
                return xhr;
              },
              abortRequest: function(xhr) {
                xhr.onreadystatechange = null;
                xhr.abort();
              }
            };
            var http_xhr_request = http_xhr_request_hooks;
            var HTTP = {
              createStreamingSocket(url) {
                return this.createSocket(http_streaming_socket, url);
              },
              createPollingSocket(url) {
                return this.createSocket(http_polling_socket, url);
              },
              createSocket(hooks, url) {
                return new http_socket(hooks, url);
              },
              createXHR(method, url) {
                return this.createRequest(http_xhr_request, method, url);
              },
              createRequest(hooks, method, url) {
                return new http_request_HTTPRequest(hooks, method, url);
              }
            };
            var http_http = HTTP;
            http_http.createXDR = function(method, url) {
              return this.createRequest(http_xdomain_request, method, url);
            };
            var web_http_http = http_http;
            var Runtime = {
              nextAuthCallbackID: 1,
              auth_callbacks: {},
              ScriptReceivers,
              DependenciesReceivers,
              getDefaultStrategy: default_strategy,
              Transports: transports_transports,
              transportConnectionInitializer: transport_connection_initializer,
              HTTPFactory: web_http_http,
              TimelineTransport: jsonp_timeline,
              getXHRAPI() {
                return window.XMLHttpRequest;
              },
              getWebSocketAPI() {
                return window.WebSocket || window.MozWebSocket;
              },
              setup(PusherClass) {
                window.Pusher = PusherClass;
                var initializeOnDocumentBody = () => {
                  this.onDocumentBody(PusherClass.ready);
                };
                if (!window.JSON) {
                  Dependencies.load("json2", {}, initializeOnDocumentBody);
                } else {
                  initializeOnDocumentBody();
                }
              },
              getDocument() {
                return document;
              },
              getProtocol() {
                return this.getDocument().location.protocol;
              },
              getAuthorizers() {
                return { ajax: xhr_auth, jsonp: jsonp_auth };
              },
              onDocumentBody(callback) {
                if (document.body) {
                  callback();
                } else {
                  setTimeout(() => {
                    this.onDocumentBody(callback);
                  }, 0);
                }
              },
              createJSONPRequest(url, data) {
                return new jsonp_request_JSONPRequest(url, data);
              },
              createScriptRequest(src) {
                return new ScriptRequest(src);
              },
              getLocalStorage() {
                try {
                  return window.localStorage;
                } catch (e) {
                  return void 0;
                }
              },
              createXHR() {
                if (this.getXHRAPI()) {
                  return this.createXMLHttpRequest();
                } else {
                  return this.createMicrosoftXHR();
                }
              },
              createXMLHttpRequest() {
                var Constructor = this.getXHRAPI();
                return new Constructor();
              },
              createMicrosoftXHR() {
                return new ActiveXObject("Microsoft.XMLHTTP");
              },
              getNetwork() {
                return net_info_Network;
              },
              createWebSocket(url) {
                var Constructor = this.getWebSocketAPI();
                return new Constructor(url);
              },
              createSocketRequest(method, url) {
                if (this.isXHRSupported()) {
                  return this.HTTPFactory.createXHR(method, url);
                } else if (this.isXDRSupported(url.indexOf("https:") === 0)) {
                  return this.HTTPFactory.createXDR(method, url);
                } else {
                  throw "Cross-origin HTTP requests are not supported";
                }
              },
              isXHRSupported() {
                var Constructor = this.getXHRAPI();
                return Boolean(Constructor) && new Constructor().withCredentials !== void 0;
              },
              isXDRSupported(useTLS) {
                var protocol = useTLS ? "https:" : "http:";
                var documentProtocol = this.getProtocol();
                return Boolean(window["XDomainRequest"]) && documentProtocol === protocol;
              },
              addUnloadListener(listener) {
                if (window.addEventListener !== void 0) {
                  window.addEventListener("unload", listener, false);
                } else if (window.attachEvent !== void 0) {
                  window.attachEvent("onunload", listener);
                }
              },
              removeUnloadListener(listener) {
                if (window.addEventListener !== void 0) {
                  window.removeEventListener("unload", listener, false);
                } else if (window.detachEvent !== void 0) {
                  window.detachEvent("onunload", listener);
                }
              },
              randomInt(max) {
                const random = function() {
                  const crypto2 = window.crypto || window["msCrypto"];
                  const random2 = crypto2.getRandomValues(new Uint32Array(1))[0];
                  return random2 / Math.pow(2, 32);
                };
                return Math.floor(random() * max);
              }
            };
            var runtime2 = Runtime;
            var TimelineLevel;
            (function(TimelineLevel2) {
              TimelineLevel2[TimelineLevel2["ERROR"] = 3] = "ERROR";
              TimelineLevel2[TimelineLevel2["INFO"] = 6] = "INFO";
              TimelineLevel2[TimelineLevel2["DEBUG"] = 7] = "DEBUG";
            })(TimelineLevel || (TimelineLevel = {}));
            var timeline_level = TimelineLevel;
            class timeline_Timeline {
              constructor(key2, session, options2) {
                this.key = key2;
                this.session = session;
                this.events = [];
                this.options = options2 || {};
                this.sent = 0;
                this.uniqueID = 0;
              }
              log(level, event) {
                if (level <= this.options.level) {
                  this.events.push(extend({}, event, { timestamp: util.now() }));
                  if (this.options.limit && this.events.length > this.options.limit) {
                    this.events.shift();
                  }
                }
              }
              error(event) {
                this.log(timeline_level.ERROR, event);
              }
              info(event) {
                this.log(timeline_level.INFO, event);
              }
              debug(event) {
                this.log(timeline_level.DEBUG, event);
              }
              isEmpty() {
                return this.events.length === 0;
              }
              send(sendfn, callback) {
                var data = extend({
                  session: this.session,
                  bundle: this.sent + 1,
                  key: this.key,
                  lib: "js",
                  version: this.options.version,
                  cluster: this.options.cluster,
                  features: this.options.features,
                  timeline: this.events
                }, this.options.params);
                this.events = [];
                sendfn(data, (error2, result) => {
                  if (!error2) {
                    this.sent++;
                  }
                  if (callback) {
                    callback(error2, result);
                  }
                });
                return true;
              }
              generateUniqueID() {
                this.uniqueID++;
                return this.uniqueID;
              }
            }
            class transport_strategy_TransportStrategy {
              constructor(name, priority, transport, options2) {
                this.name = name;
                this.priority = priority;
                this.transport = transport;
                this.options = options2 || {};
              }
              isSupported() {
                return this.transport.isSupported({
                  useTLS: this.options.useTLS
                });
              }
              connect(minPriority, callback) {
                if (!this.isSupported()) {
                  return failAttempt(new UnsupportedStrategy(), callback);
                } else if (this.priority < minPriority) {
                  return failAttempt(new TransportPriorityTooLow(), callback);
                }
                var connected = false;
                var transport = this.transport.createConnection(this.name, this.priority, this.options.key, this.options);
                var handshake = null;
                var onInitialized = function() {
                  transport.unbind("initialized", onInitialized);
                  transport.connect();
                };
                var onOpen = function() {
                  handshake = factory.createHandshake(transport, function(result) {
                    connected = true;
                    unbindListeners();
                    callback(null, result);
                  });
                };
                var onError = function(error2) {
                  unbindListeners();
                  callback(error2);
                };
                var onClosed = function() {
                  unbindListeners();
                  var serializedTransport;
                  serializedTransport = safeJSONStringify(transport);
                  callback(new TransportClosed(serializedTransport));
                };
                var unbindListeners = function() {
                  transport.unbind("initialized", onInitialized);
                  transport.unbind("open", onOpen);
                  transport.unbind("error", onError);
                  transport.unbind("closed", onClosed);
                };
                transport.bind("initialized", onInitialized);
                transport.bind("open", onOpen);
                transport.bind("error", onError);
                transport.bind("closed", onClosed);
                transport.initialize();
                return {
                  abort: () => {
                    if (connected) {
                      return;
                    }
                    unbindListeners();
                    if (handshake) {
                      handshake.close();
                    } else {
                      transport.close();
                    }
                  },
                  forceMinPriority: (p) => {
                    if (connected) {
                      return;
                    }
                    if (this.priority < p) {
                      if (handshake) {
                        handshake.close();
                      } else {
                        transport.close();
                      }
                    }
                  }
                };
              }
            }
            function failAttempt(error2, callback) {
              util.defer(function() {
                callback(error2);
              });
              return {
                abort: function() {
                },
                forceMinPriority: function() {
                }
              };
            }
            const { Transports: strategy_builder_Transports } = runtime2;
            var strategy_builder_defineTransport = function(config, name, type, priority, options2, manager) {
              var transportClass = strategy_builder_Transports[type];
              if (!transportClass) {
                throw new UnsupportedTransport(type);
              }
              var enabled = (!config.enabledTransports || arrayIndexOf(config.enabledTransports, name) !== -1) && (!config.disabledTransports || arrayIndexOf(config.disabledTransports, name) === -1);
              var transport;
              if (enabled) {
                options2 = Object.assign({ ignoreNullOrigin: config.ignoreNullOrigin }, options2);
                transport = new transport_strategy_TransportStrategy(name, priority, manager ? manager.getAssistant(transportClass) : transportClass, options2);
              } else {
                transport = strategy_builder_UnsupportedStrategy;
              }
              return transport;
            };
            var strategy_builder_UnsupportedStrategy = {
              isSupported: function() {
                return false;
              },
              connect: function(_, callback) {
                var deferred = util.defer(function() {
                  callback(new UnsupportedStrategy());
                });
                return {
                  abort: function() {
                    deferred.ensureAborted();
                  },
                  forceMinPriority: function() {
                  }
                };
              }
            };
            function validateOptions(options2) {
              if (options2 == null) {
                throw "You must pass an options object";
              }
              if (options2.cluster == null) {
                throw "Options object must provide a cluster";
              }
              if ("disableStats" in options2) {
                logger.warn("The disableStats option is deprecated in favor of enableStats");
              }
            }
            const composeChannelQuery = (params, authOptions) => {
              var query = "socket_id=" + encodeURIComponent(params.socketId);
              for (var key2 in authOptions.params) {
                query += "&" + encodeURIComponent(key2) + "=" + encodeURIComponent(authOptions.params[key2]);
              }
              if (authOptions.paramsProvider != null) {
                let dynamicParams = authOptions.paramsProvider();
                for (var key2 in dynamicParams) {
                  query += "&" + encodeURIComponent(key2) + "=" + encodeURIComponent(dynamicParams[key2]);
                }
              }
              return query;
            };
            const UserAuthenticator = (authOptions) => {
              if (typeof runtime2.getAuthorizers()[authOptions.transport] === "undefined") {
                throw `'${authOptions.transport}' is not a recognized auth transport`;
              }
              return (params, callback) => {
                const query = composeChannelQuery(params, authOptions);
                runtime2.getAuthorizers()[authOptions.transport](runtime2, query, authOptions, AuthRequestType.UserAuthentication, callback);
              };
            };
            var user_authenticator = UserAuthenticator;
            const channel_authorizer_composeChannelQuery = (params, authOptions) => {
              var query = "socket_id=" + encodeURIComponent(params.socketId);
              query += "&channel_name=" + encodeURIComponent(params.channelName);
              for (var key2 in authOptions.params) {
                query += "&" + encodeURIComponent(key2) + "=" + encodeURIComponent(authOptions.params[key2]);
              }
              if (authOptions.paramsProvider != null) {
                let dynamicParams = authOptions.paramsProvider();
                for (var key2 in dynamicParams) {
                  query += "&" + encodeURIComponent(key2) + "=" + encodeURIComponent(dynamicParams[key2]);
                }
              }
              return query;
            };
            const ChannelAuthorizer = (authOptions) => {
              if (typeof runtime2.getAuthorizers()[authOptions.transport] === "undefined") {
                throw `'${authOptions.transport}' is not a recognized auth transport`;
              }
              return (params, callback) => {
                const query = channel_authorizer_composeChannelQuery(params, authOptions);
                runtime2.getAuthorizers()[authOptions.transport](runtime2, query, authOptions, AuthRequestType.ChannelAuthorization, callback);
              };
            };
            var channel_authorizer = ChannelAuthorizer;
            const ChannelAuthorizerProxy = (pusher, authOptions, channelAuthorizerGenerator) => {
              const deprecatedAuthorizerOptions = {
                authTransport: authOptions.transport,
                authEndpoint: authOptions.endpoint,
                auth: {
                  params: authOptions.params,
                  headers: authOptions.headers
                }
              };
              return (params, callback) => {
                const channel = pusher.channel(params.channelName);
                const channelAuthorizer = channelAuthorizerGenerator(channel, deprecatedAuthorizerOptions);
                channelAuthorizer.authorize(params.socketId, callback);
              };
            };
            function getConfig(opts, pusher) {
              let config = {
                activityTimeout: opts.activityTimeout || defaults.activityTimeout,
                cluster: opts.cluster,
                httpPath: opts.httpPath || defaults.httpPath,
                httpPort: opts.httpPort || defaults.httpPort,
                httpsPort: opts.httpsPort || defaults.httpsPort,
                pongTimeout: opts.pongTimeout || defaults.pongTimeout,
                statsHost: opts.statsHost || defaults.stats_host,
                unavailableTimeout: opts.unavailableTimeout || defaults.unavailableTimeout,
                wsPath: opts.wsPath || defaults.wsPath,
                wsPort: opts.wsPort || defaults.wsPort,
                wssPort: opts.wssPort || defaults.wssPort,
                enableStats: getEnableStatsConfig(opts),
                httpHost: getHttpHost(opts),
                useTLS: shouldUseTLS(opts),
                wsHost: getWebsocketHost(opts),
                userAuthenticator: buildUserAuthenticator(opts),
                channelAuthorizer: buildChannelAuthorizer(opts, pusher)
              };
              if ("disabledTransports" in opts)
                config.disabledTransports = opts.disabledTransports;
              if ("enabledTransports" in opts)
                config.enabledTransports = opts.enabledTransports;
              if ("ignoreNullOrigin" in opts)
                config.ignoreNullOrigin = opts.ignoreNullOrigin;
              if ("timelineParams" in opts)
                config.timelineParams = opts.timelineParams;
              if ("nacl" in opts) {
                config.nacl = opts.nacl;
              }
              return config;
            }
            function getHttpHost(opts) {
              if (opts.httpHost) {
                return opts.httpHost;
              }
              if (opts.cluster) {
                return `sockjs-${opts.cluster}.pusher.com`;
              }
              return defaults.httpHost;
            }
            function getWebsocketHost(opts) {
              if (opts.wsHost) {
                return opts.wsHost;
              }
              return getWebsocketHostFromCluster(opts.cluster);
            }
            function getWebsocketHostFromCluster(cluster) {
              return `ws-${cluster}.pusher.com`;
            }
            function shouldUseTLS(opts) {
              if (runtime2.getProtocol() === "https:") {
                return true;
              } else if (opts.forceTLS === false) {
                return false;
              }
              return true;
            }
            function getEnableStatsConfig(opts) {
              if ("enableStats" in opts) {
                return opts.enableStats;
              }
              if ("disableStats" in opts) {
                return !opts.disableStats;
              }
              return false;
            }
            function buildUserAuthenticator(opts) {
              const userAuthentication = Object.assign(Object.assign({}, defaults.userAuthentication), opts.userAuthentication);
              if ("customHandler" in userAuthentication && userAuthentication["customHandler"] != null) {
                return userAuthentication["customHandler"];
              }
              return user_authenticator(userAuthentication);
            }
            function buildChannelAuth(opts, pusher) {
              let channelAuthorization;
              if ("channelAuthorization" in opts) {
                channelAuthorization = Object.assign(Object.assign({}, defaults.channelAuthorization), opts.channelAuthorization);
              } else {
                channelAuthorization = {
                  transport: opts.authTransport || defaults.authTransport,
                  endpoint: opts.authEndpoint || defaults.authEndpoint
                };
                if ("auth" in opts) {
                  if ("params" in opts.auth)
                    channelAuthorization.params = opts.auth.params;
                  if ("headers" in opts.auth)
                    channelAuthorization.headers = opts.auth.headers;
                }
                if ("authorizer" in opts)
                  channelAuthorization.customHandler = ChannelAuthorizerProxy(pusher, channelAuthorization, opts.authorizer);
              }
              return channelAuthorization;
            }
            function buildChannelAuthorizer(opts, pusher) {
              const channelAuthorization = buildChannelAuth(opts, pusher);
              if ("customHandler" in channelAuthorization && channelAuthorization["customHandler"] != null) {
                return channelAuthorization["customHandler"];
              }
              return channel_authorizer(channelAuthorization);
            }
            class watchlist_WatchlistFacade extends dispatcher_Dispatcher {
              constructor(pusher) {
                super(function(eventName, data) {
                  logger.debug(`No callbacks on watchlist events for ${eventName}`);
                });
                this.pusher = pusher;
                this.bindWatchlistInternalEvent();
              }
              handleEvent(pusherEvent) {
                pusherEvent.data.events.forEach((watchlistEvent) => {
                  this.emit(watchlistEvent.name, watchlistEvent);
                });
              }
              bindWatchlistInternalEvent() {
                this.pusher.connection.bind("message", (pusherEvent) => {
                  var eventName = pusherEvent.event;
                  if (eventName === "pusher_internal:watchlist_events") {
                    this.handleEvent(pusherEvent);
                  }
                });
              }
            }
            function flatPromise() {
              let resolve, reject;
              const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
              });
              return { promise, resolve, reject };
            }
            var flat_promise = flatPromise;
            class user_UserFacade extends dispatcher_Dispatcher {
              constructor(pusher) {
                super(function(eventName, data) {
                  logger.debug("No callbacks on user for " + eventName);
                });
                this.signin_requested = false;
                this.user_data = null;
                this.serverToUserChannel = null;
                this.signinDonePromise = null;
                this._signinDoneResolve = null;
                this._onAuthorize = (err, authData) => {
                  if (err) {
                    logger.warn(`Error during signin: ${err}`);
                    this._cleanup();
                    return;
                  }
                  this.pusher.send_event("pusher:signin", {
                    auth: authData.auth,
                    user_data: authData.user_data
                  });
                };
                this.pusher = pusher;
                this.pusher.connection.bind("state_change", ({ previous, current }) => {
                  if (previous !== "connected" && current === "connected") {
                    this._signin();
                  }
                  if (previous === "connected" && current !== "connected") {
                    this._cleanup();
                    this._newSigninPromiseIfNeeded();
                  }
                });
                this.watchlist = new watchlist_WatchlistFacade(pusher);
                this.pusher.connection.bind("message", (event) => {
                  var eventName = event.event;
                  if (eventName === "pusher:signin_success") {
                    this._onSigninSuccess(event.data);
                  }
                  if (this.serverToUserChannel && this.serverToUserChannel.name === event.channel) {
                    this.serverToUserChannel.handleEvent(event);
                  }
                });
              }
              signin() {
                if (this.signin_requested) {
                  return;
                }
                this.signin_requested = true;
                this._signin();
              }
              _signin() {
                if (!this.signin_requested) {
                  return;
                }
                this._newSigninPromiseIfNeeded();
                if (this.pusher.connection.state !== "connected") {
                  return;
                }
                this.pusher.config.userAuthenticator({
                  socketId: this.pusher.connection.socket_id
                }, this._onAuthorize);
              }
              _onSigninSuccess(data) {
                try {
                  this.user_data = JSON.parse(data.user_data);
                } catch (e) {
                  logger.error(`Failed parsing user data after signin: ${data.user_data}`);
                  this._cleanup();
                  return;
                }
                if (typeof this.user_data.id !== "string" || this.user_data.id === "") {
                  logger.error(`user_data doesn't contain an id. user_data: ${this.user_data}`);
                  this._cleanup();
                  return;
                }
                this._signinDoneResolve();
                this._subscribeChannels();
              }
              _subscribeChannels() {
                const ensure_subscribed = (channel) => {
                  if (channel.subscriptionPending && channel.subscriptionCancelled) {
                    channel.reinstateSubscription();
                  } else if (!channel.subscriptionPending && this.pusher.connection.state === "connected") {
                    channel.subscribe();
                  }
                };
                this.serverToUserChannel = new channel_Channel(`#server-to-user-${this.user_data.id}`, this.pusher);
                this.serverToUserChannel.bind_global((eventName, data) => {
                  if (eventName.indexOf("pusher_internal:") === 0 || eventName.indexOf("pusher:") === 0) {
                    return;
                  }
                  this.emit(eventName, data);
                });
                ensure_subscribed(this.serverToUserChannel);
              }
              _cleanup() {
                this.user_data = null;
                if (this.serverToUserChannel) {
                  this.serverToUserChannel.unbind_all();
                  this.serverToUserChannel.disconnect();
                  this.serverToUserChannel = null;
                }
                if (this.signin_requested) {
                  this._signinDoneResolve();
                }
              }
              _newSigninPromiseIfNeeded() {
                if (!this.signin_requested) {
                  return;
                }
                if (this.signinDonePromise && !this.signinDonePromise.done) {
                  return;
                }
                const { promise, resolve, reject: _ } = flat_promise();
                promise.done = false;
                const setDone = () => {
                  promise.done = true;
                };
                promise.then(setDone).catch(setDone);
                this.signinDonePromise = promise;
                this._signinDoneResolve = resolve;
              }
            }
            class pusher_Pusher {
              static ready() {
                pusher_Pusher.isReady = true;
                for (var i = 0, l2 = pusher_Pusher.instances.length; i < l2; i++) {
                  pusher_Pusher.instances[i].connect();
                }
              }
              static getClientFeatures() {
                return keys(filterObject({ ws: runtime2.Transports.ws }, function(t) {
                  return t.isSupported({});
                }));
              }
              constructor(app_key, options2) {
                checkAppKey(app_key);
                validateOptions(options2);
                this.key = app_key;
                this.config = getConfig(options2, this);
                this.channels = factory.createChannels();
                this.global_emitter = new dispatcher_Dispatcher();
                this.sessionID = runtime2.randomInt(1e9);
                this.timeline = new timeline_Timeline(this.key, this.sessionID, {
                  cluster: this.config.cluster,
                  features: pusher_Pusher.getClientFeatures(),
                  params: this.config.timelineParams || {},
                  limit: 50,
                  level: timeline_level.INFO,
                  version: defaults.VERSION
                });
                if (this.config.enableStats) {
                  this.timelineSender = factory.createTimelineSender(this.timeline, {
                    host: this.config.statsHost,
                    path: "/timeline/v2/" + runtime2.TimelineTransport.name
                  });
                }
                var getStrategy = (options3) => {
                  return runtime2.getDefaultStrategy(this.config, options3, strategy_builder_defineTransport);
                };
                this.connection = factory.createConnectionManager(this.key, {
                  getStrategy,
                  timeline: this.timeline,
                  activityTimeout: this.config.activityTimeout,
                  pongTimeout: this.config.pongTimeout,
                  unavailableTimeout: this.config.unavailableTimeout,
                  useTLS: Boolean(this.config.useTLS)
                });
                this.connection.bind("connected", () => {
                  this.subscribeAll();
                  if (this.timelineSender) {
                    this.timelineSender.send(this.connection.isUsingTLS());
                  }
                });
                this.connection.bind("message", (event) => {
                  var eventName = event.event;
                  var internal = eventName.indexOf("pusher_internal:") === 0;
                  if (event.channel) {
                    var channel = this.channel(event.channel);
                    if (channel) {
                      channel.handleEvent(event);
                    }
                  }
                  if (!internal) {
                    this.global_emitter.emit(event.event, event.data);
                  }
                });
                this.connection.bind("connecting", () => {
                  this.channels.disconnect();
                });
                this.connection.bind("disconnected", () => {
                  this.channels.disconnect();
                });
                this.connection.bind("error", (err) => {
                  logger.warn(err);
                });
                pusher_Pusher.instances.push(this);
                this.timeline.info({ instances: pusher_Pusher.instances.length });
                this.user = new user_UserFacade(this);
                if (pusher_Pusher.isReady) {
                  this.connect();
                }
              }
              channel(name) {
                return this.channels.find(name);
              }
              allChannels() {
                return this.channels.all();
              }
              connect() {
                this.connection.connect();
                if (this.timelineSender) {
                  if (!this.timelineSenderTimer) {
                    var usingTLS = this.connection.isUsingTLS();
                    var timelineSender = this.timelineSender;
                    this.timelineSenderTimer = new timers_PeriodicTimer(6e4, function() {
                      timelineSender.send(usingTLS);
                    });
                  }
                }
              }
              disconnect() {
                this.connection.disconnect();
                if (this.timelineSenderTimer) {
                  this.timelineSenderTimer.ensureAborted();
                  this.timelineSenderTimer = null;
                }
              }
              bind(event_name, callback, context) {
                this.global_emitter.bind(event_name, callback, context);
                return this;
              }
              unbind(event_name, callback, context) {
                this.global_emitter.unbind(event_name, callback, context);
                return this;
              }
              bind_global(callback) {
                this.global_emitter.bind_global(callback);
                return this;
              }
              unbind_global(callback) {
                this.global_emitter.unbind_global(callback);
                return this;
              }
              unbind_all(callback) {
                this.global_emitter.unbind_all();
                return this;
              }
              subscribeAll() {
                var channelName;
                for (channelName in this.channels.channels) {
                  if (this.channels.channels.hasOwnProperty(channelName)) {
                    this.subscribe(channelName);
                  }
                }
              }
              subscribe(channel_name) {
                var channel = this.channels.add(channel_name, this);
                if (channel.subscriptionPending && channel.subscriptionCancelled) {
                  channel.reinstateSubscription();
                } else if (!channel.subscriptionPending && this.connection.state === "connected") {
                  channel.subscribe();
                }
                return channel;
              }
              unsubscribe(channel_name) {
                var channel = this.channels.find(channel_name);
                if (channel && channel.subscriptionPending) {
                  channel.cancelSubscription();
                } else {
                  channel = this.channels.remove(channel_name);
                  if (channel && channel.subscribed) {
                    channel.unsubscribe();
                  }
                }
              }
              send_event(event_name, data, channel) {
                return this.connection.send_event(event_name, data, channel);
              }
              shouldUseTLS() {
                return this.config.useTLS;
              }
              signin() {
                this.user.signin();
              }
            }
            pusher_Pusher.instances = [];
            pusher_Pusher.isReady = false;
            pusher_Pusher.logToConsole = false;
            pusher_Pusher.Runtime = runtime2;
            pusher_Pusher.ScriptReceivers = runtime2.ScriptReceivers;
            pusher_Pusher.DependenciesReceivers = runtime2.DependenciesReceivers;
            pusher_Pusher.auth_callbacks = runtime2.auth_callbacks;
            var core_pusher = __webpack_exports__["default"] = pusher_Pusher;
            function checkAppKey(key2) {
              if (key2 === null || key2 === void 0) {
                throw "You must pass your app key when you instantiate Pusher.";
              }
            }
            runtime2.setup(pusher_Pusher);
          }
          /******/
        ])
      );
    });
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/quote/rates/_page.svelte.js
var page_svelte_exports10 = {};
__export(page_svelte_exports10, {
  default: () => Page10
});
function getLocationName(locationType) {
  const locations = [
    {
      locationType: 0,
      name: "Please select a location type",
      value: "placeholderLocationType"
    },
    {
      locationType: 1,
      name: "Has Loading Dock",
      value: "businessWithLoadingDockOrForkLift"
    },
    {
      locationType: 2,
      name: "Lift Gate Required",
      value: "businessWithOutLoadingDockOrForkLift"
    },
    {
      locationType: 3,
      name: "Residential",
      value: "residential"
    },
    {
      locationType: 4,
      name: "Tradeshow",
      value: "tradeshow"
    },
    {
      locationType: 5,
      name: "Self Storage",
      value: "selfStorage"
    },
    {
      locationType: 6,
      name: "Airport",
      value: "airport"
    },
    {
      locationType: 7,
      name: "Church",
      value: "church"
    },
    {
      locationType: 8,
      name: "Hospital",
      value: "hospital"
    },
    {
      locationType: 9,
      name: "School",
      value: "school"
    },
    {
      locationType: 10,
      name: "Government",
      value: "government"
    },
    {
      locationType: 11,
      name: "Fair or Amusement Park",
      value: "fairOrAmusementPark"
    },
    {
      locationType: 12,
      name: "Construction Site",
      value: "constructionSite"
    },
    {
      locationType: 13,
      name: "Farm or Ranch",
      value: "farmOrRanch"
    },
    {
      locationType: 14,
      name: "Military Installation",
      value: "militaryInstallation"
    },
    {
      locationType: 15,
      name: "Prison",
      value: "prison"
    },
    {
      locationType: 16,
      name: "Hotel or Motel",
      value: "hotelOrMotel"
    },
    {
      locationType: 17,
      name: "Campground",
      value: "campground"
    },
    {
      locationType: 18,
      name: "Grocery Warehouse",
      value: "groceryWarehouse"
    },
    {
      locationType: 19,
      name: "Country Club",
      value: "countryClub"
    },
    {
      locationType: 20,
      name: "Mine Site",
      value: "mineSite"
    },
    {
      locationType: 21,
      name: "Native American Reservation",
      value: "nativeAmericanReservation"
    },
    {
      locationType: 22,
      name: "Nursing Home",
      value: "nursingHome"
    },
    {
      locationType: 23,
      name: "Pier",
      value: "pier"
    },
    {
      locationType: 24,
      name: "Resort",
      value: "resort"
    }
  ];
  const location = locations.find((loc) => loc.locationType === locationType);
  return location ? location.name : void 0;
}
var import_pusher_js, css$14, QuoteInfo, Rate, Sort, css9, Page10;
var init_page_svelte10 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/quote/rates/_page.svelte.js"() {
    init_ssr();
    init_navigation();
    init_Toaster_svelte_svelte_type_style_lang();
    init_basic_store();
    init_freight_class();
    init_QuoteInfo_svelte_svelte_type_style_lang();
    init_Circle3();
    import_pusher_js = __toESM(require_pusher(), 1);
    init_stores();
    init_delivery_store();
    init_commodity_store();
    css$14 = {
      code: 'h3.svelte-3489g5{font-family:"Space Mono", monospace !important;font-size:13px !important}h4.svelte-3489g5{font-family:"bungee", monospace !important;font-size:15px !important;font-weight:bold}p.svelte-3489g5{font-size:16px !important}',
      map: null
    };
    QuoteInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $shipmentInfoStore, $$unsubscribe_shipmentInfoStore;
      let $page, $$unsubscribe_page;
      let $pickupStore, $$unsubscribe_pickupStore;
      let $deliveryStore, $$unsubscribe_deliveryStore;
      let $commodityStore, $$unsubscribe_commodityStore;
      let $bid_store, $$unsubscribe_bid_store;
      $$unsubscribe_shipmentInfoStore = subscribe(shipmentInfoStore, (value) => $shipmentInfoStore = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_pickupStore = subscribe(pickupStore, (value) => $pickupStore = value);
      $$unsubscribe_deliveryStore = subscribe(deliveryStore, (value) => $deliveryStore = value);
      $$unsubscribe_commodityStore = subscribe(commodityStore, (value) => $commodityStore = value);
      $$unsubscribe_bid_store = subscribe(bid_store, (value) => $bid_store = value);
      $$result.css.add(css$14);
      $$unsubscribe_shipmentInfoStore();
      $$unsubscribe_page();
      $$unsubscribe_pickupStore();
      $$unsubscribe_deliveryStore();
      $$unsubscribe_commodityStore();
      $$unsubscribe_bid_store();
      return `${$shipmentInfoStore ? `<div class="w-full max-w-[1050px] lg:max-w-[1100px] shadow-lg bg-neutral rounded-lg" style="display:flex; flex-direction:column;"><div class="breadcrumbs font-bold" style="overflow-x:visible"><ul class="flex ml-3 mt-2 w-full gap-2 "><li class="" data-svelte-h="svelte-13z6b2f"><a href="/admin" class="no-underline text-secondary hover:opacity-80 underline-offset-4">Home</a></li> <li class=""><button data-sveltekit-reload class="flex items-center gap-2 edit-quote-btn text-secondary hover:opacity-80 hover:underline underline-offset-4" data-svelte-h="svelte-y6354q">Quote</button></li> <li>${$page.url.pathname.includes("rates") ? `<div class="flex gap-2 items-center text-secondary hover:opacity-80 underline-offset-1" data-svelte-h="svelte-1ucw4a6">Rates</div>` : `<a href="/admin/quote/rates" data-svelte-h="svelte-1ml2a2j"><div class="w-6 h-6 text-secondary hover:opacity-80 underline-offset-1">Rates</div></a>`}</li> ${$page.url.pathname.includes("booking") ? `<li class="flex items-center gap-2 " data-svelte-h="svelte-7dk8xs">Book</li>` : ``}</ul></div> <div class="mx-4 flex-col gap-3 pt-4 pb-8 sm:px-8 w-full max-w-[600px]"><div class="flex w-full justify-start gap-5 py-2"><div class="w-[[80px]] min-w-[80px]" data-svelte-h="svelte-egoql0"><img src="/images/icons/pallet.svg" width="50" alt="pickup icon" class="self-center"></div> <button class="ownBtn w-[150px] bg-primary" data-svelte-h="svelte-10n7jpv">Edit Quote</button></div> <h2 class="mt-3 w-full py-2 font-bold" data-svelte-h="svelte-miduaw">Shipment Info</h2> <h3 class="mt-3 w-full py-2 font-bold svelte-3489g5">Quote: <span class="ml-3">${escape($shipmentInfoStore.quoteId)}</span></h3> <div class="mt-3 flex w-full justify-start gap-5"><div class="w-1/2"><h4 class="font-bold svelte-3489g5" data-svelte-h="svelte-1a6o7k4">Origin</h4> <p class="py-2 font-bold tracking-wide svelte-3489g5">${escape($pickupStore?.address?.zipCode || "")}, ${escape($pickupStore?.address?.state || "")}</p></div> <div class="w-1/2"><h4 class="font-bold svelte-3489g5" data-svelte-h="svelte-1tyohji">Destination</h4> <p class="py-2 font-bold tracking-wide svelte-3489g5">${escape($deliveryStore?.address?.zipCode || "")}, ${escape($deliveryStore?.address?.state || "")}</p></div></div> <div class="mt-3 flex w-full justify-start gap-5"><div class="w-1/2"><h4 class="font-bold svelte-3489g5" data-svelte-h="svelte-19tvikv">Pickup Location</h4> <p class="py-2 font-bold tracking-wide svelte-3489g5">${escape(getLocationName($pickupStore.locationType))}</p></div> <div class="w-1/2"><h4 class="font-bold svelte-3489g5" data-svelte-h="svelte-1bmec0f">Delivery Location</h4> <p class="py-2 font-bold tracking-wide svelte-3489g5">${escape(getLocationName($deliveryStore?.locationType))}</p></div></div> <div class="flex mt-3 text-xs w-full justify-around" data-svelte-h="svelte-12xdusn"><h3 class="w-[9.5%] text-center svelte-3489g5">Qty</h3> <h3 class="w-[22%] text-center svelte-3489g5">Pack. Typ</h3> <h3 class="w-[22%] text-center svelte-3489g5">Dims</h3> <h3 class="w-[20%] text-center svelte-3489g5">T. Weight</h3> <h3 class="w-[26.5%] text-center svelte-3489g5">Class</h3></div> ${each($commodityStore, (commodity, index28) => {
        return `<div class="flex"><p class="w-[9.5%] py-2 font-mono font-semibold text-center svelte-3489g5">${escape(commodity.quantity)}</p> <p class="w-[22%] py-2 font-mono font-semibold text-center svelte-3489g5">${escape(commodity.packageType == 1 ? "Pallet" : commodity.packageType == 2 ? "Box" : commodity.packageType == 3 ? "Bundle" : commodity.packageType == 4 ? "Crate" : commodity.packageType == 5 ? "Loose" : commodity.packageType == 6 ? "Pieces" : commodity.packageType == 7 ? "Roll" : "Unrecognized")}</p> <p class="w-[23%] py-2 font-mono font-semibold text-center svelte-3489g5">${escape(commodity?.length)}*${escape(commodity?.width)}*${escape(commodity?.height)}</p> <p class="w-[20%] py-2 font-mono font-semibold text-center svelte-3489g5">${escape(commodity.weight)}</p> <p class="w-[25.5%] py-2 font-mono font-semibold text-center svelte-3489g5">${escape(getFreightClassString(commodity.freightClass))}</p> </div>`;
      })} <h3 class="font-bold mt-3 svelte-3489g5">Pickup Date: ${escape($shipmentInfoStore?.displayDate.split(" ")[0])}, Time: ${escape($shipmentInfoStore?.pickupReadyTime)}</h3> ${$bid_store?.choosen_bid?.amount && $bid_store?.choosen_bid?.amount?.netAmount > 0 && $page.url.pathname.includes("booking") ? `<div class="font-bold mt-3">Rate: <span class="text-[#eea47f]">$${escape(parseFloat($bid_store?.choosen_bid?.amount?.netAmount.toString()).toFixed(2))}</span></div>` : ``}</div></div>` : ``}`;
    });
    Rate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { bid } = $$props;
      let { index: index28 } = $$props;
      let { handleRateDetails } = $$props;
      if ($$props.bid === void 0 && $$bindings.bid && bid !== void 0)
        $$bindings.bid(bid);
      if ($$props.index === void 0 && $$bindings.index && index28 !== void 0)
        $$bindings.index(index28);
      if ($$props.handleRateDetails === void 0 && $$bindings.handleRateDetails && handleRateDetails !== void 0)
        $$bindings.handleRateDetails(handleRateDetails);
      return `${bid && bid?.amount?.netAmount && bid?.amount?.netAmount > 0 ? `<div class="flex flex-col justify-between sm:flex-row w-full max-w-[1100px] items-center rounded-lg bg-whitebg p-4 gap-3 sm:px-12"${add_attribute("id", "bid_" + index28, 0)}><figures class="bg-neutral h-[80px] w-[160px] rounded-lg"><img${add_attribute("src", bid.vendorLogo, 0)} class="logo w-full h-full p-2 object-contain" alt="company logo"></figures> <div class="flex flex-col justify-around items-center"><p class="py-2 text-center font-space text-xl font-bold capitalize">${escape(bid.carrier)}</p> <div class="flex flex-col items-center gap-1"><ul class="flex py-1 sm:self-start" data-svelte-h="svelte-trg03i"><li class="active text-[#FFD700]"><i class="fas fa-star"></i></li> <li class="active text-[#FFD700]"><i class="fas fa-star"></i></li> <li class="active text-[#FFD700]"><i class="fas fa-star"></i></li> <li class="active text-[#FFD700]"><i class="fas fa-star"></i></li> <li><i class="fas text-[#FFD700]"></i></li></ul> <p class="py-1 flex gap-2 self-start">Transition Time:<strong>${escape(bid.transitTime)}${escape(parseInt(bid?.transitTime) > 1 ? " Business days" : " Business day")}</strong></p> ${bid.deliveryDate ? `<p class="i py-1 flex gap-2 self-start text-lg font-semibold">Estimated Delivery:
          <strong>${escape(bid.deliveryDate.split("T")[0])}</strong></p>` : ``} <div class="price_text my-1 self-start"><strong class="text-xl">$ ${escape(bid?.amount?.netAmount != void 0 ? parseFloat(bid?.amount?.netAmount.toString()).toFixed(2) : 0)}</strong> <del class="text-orange-300 text-md">${escape(bid?.amount?.fullAmount != void 0 ? parseFloat(bid?.amount?.fullAmount.toString()).toFixed(2) : "")}</del></div></div></div> <button class="ownBtn sm:ml-8 my-2 w-[200px] self-center cursor-pointer bg-primary font-bungee" type="button" data-svelte-h="svelte-165ymjd">Book Now</button></div>` : ``}`;
    });
    Sort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg fill="#ffffff" width="20" height="20" viewBox="0 0 24 24" id="sort" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><line id="secondary" x1="3" y1="12" x2="17" y2="12" style="fill: #ffffff; stroke:#ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><path id="primary" d="M3,7H21M3,17H13" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`;
    });
    css9 = {
      code: ".small.svelte-1jyxu6e{font-size:0.6rem !important}.normal.svelte-1jyxu6e{font-size:0.9rem !important}",
      map: null
    };
    Page10 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let cheapest;
      let isLoading;
      let hasBids;
      let $shipmentInfoStore, $$unsubscribe_shipmentInfoStore;
      let $basicStore, $$unsubscribe_basicStore;
      let $bid_store, $$unsubscribe_bid_store;
      $$unsubscribe_shipmentInfoStore = subscribe(shipmentInfoStore, (value) => $shipmentInfoStore = value);
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => $basicStore = value);
      $$unsubscribe_bid_store = subscribe(bid_store, (value) => $bid_store = value);
      function handleRateDetails(bid) {
        console.log("in rate details and businessStore", $basicStore);
        if (!$basicStore?.business?.phoneNumber?.phoneNumber || !$basicStore?.business?.address?.zipCode) {
          toast.success("please add your business and setup your account details first");
          goto("/admin/settings");
        } else {
          if (bid.split("-")[0] == $shipmentInfoStore.quoteId) {
            return goto(`/admin/booking/${bid}`);
          } else {
            toast.success("invalid request. Please get quote again");
            return goto("/admin/quote");
          }
        }
      }
      $$result.css.add(css9);
      cheapest = true;
      isLoading = false;
      hasBids = false;
      $$unsubscribe_shipmentInfoStore();
      $$unsubscribe_basicStore();
      $$unsubscribe_bid_store();
      return `<div class="p-2 min-h-[100vh] md:p-4 max-w-[1100px]">${validate_component(QuoteInfo, "QuoteInfo").$$render($$result, {}, {}, {})} <div class="flex flex-col sm:flex-row sm:justify-between h-[130px] sm:h-[100px] sm:items-center"><h3 class="py-4" data-svelte-h="svelte-144y5p">Available Rates</h3> <div class="flex gap-3 items-center text-black self-center"><button class="normal ownBtn bg-neutral flex gap-3 items-center shadow-md hover:opacity-80 min-w-[130px] max-w-[190px] svelte-1jyxu6e"><span class="${[
        "svelte-1jyxu6e",
        (cheapest ? "opacity-70" : "") + " " + (cheapest ? "small" : "")
      ].join(" ").trim()}" data-svelte-h="svelte-1ny18g2">Fastest</span> ${validate_component(Sort, "Sort").$$render($$result, {}, {}, {})}</button> <button class="normal ownBtn bg-neutral flex gap-3 items-center shadow-md hover:opacity-70 min-w-[130px] max-w-[190px] svelte-1jyxu6e"><span class="${[
        "svelte-1jyxu6e",
        (!cheapest ? "opacity-60" : "") + " " + (!cheapest ? "small" : "")
      ].join(" ").trim()}" data-svelte-h="svelte-1vzt91m">Cheapest</span> ${validate_component(Sort, "Sort").$$render($$result, {}, {}, {})}</button></div></div> ${isLoading ? `<div class="flex flex-col gap-1 h-[100px] w-[300px] justify-center items-center fixed top-[50%] left-[calc(50%-150px)] bg-whitebg px-12 py-8 rounded-lg shadow-lg" style="z-index:10000;"><div class="mt-2">${validate_component(Circle3, "Circle3").$$render($$result, { size: "20" }, {}, {})}</div> <h3 class="text-neutral text-xs w-[200px] text-center" data-svelte-h="svelte-1efhm6l">GETTING QUOTES</h3></div>` : ``} ${hasBids && $bid_store.bids.length > 0 ? `<div class="flex w-full flex-col gap-8 pb-24 justify-center items-center lg:items-start">${each($bid_store.bids, (bid, index28) => {
        return `${validate_component(Rate, "Rate").$$render($$result, { handleRateDetails, bid, index: index28 }, {}, {})}`;
      })}</div>` : ``} </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  component: () => component16,
  fonts: () => fonts16,
  imports: () => imports16,
  index: () => index16,
  server: () => page_server_ts_exports5,
  server_id: () => server_id5,
  stylesheets: () => stylesheets16
});
var index16, component_cache16, component16, server_id5, imports16, stylesheets16, fonts16;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    init_page_server_ts5();
    index16 = 15;
    component16 = async () => component_cache16 ?? (component_cache16 = (await Promise.resolve().then(() => (init_page_svelte10(), page_svelte_exports10))).default);
    server_id5 = "src/routes/(admin)/admin/quote/rates/+page.server.ts";
    imports16 = ["_app/immutable/nodes/15.cca531ae.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/quote_utils.8ad4c718.js", "_app/immutable/chunks/delivery_store.5fe89634.js", "_app/immutable/chunks/commodity_store.3c0148c0.js", "_app/immutable/chunks/bid_store.bd82296e.js", "_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang.36b7f7b6.js", "_app/immutable/chunks/_commonjsHelpers.725317a4.js", "_app/immutable/chunks/index.fc8250e2.js", "_app/immutable/chunks/QuoteInfo.90cb9628.js", "_app/immutable/chunks/stores.7ed2130f.js"];
    stylesheets16 = ["_app/immutable/assets/15.2bda3e96.css", "_app/immutable/assets/Toaster.3a6d0da3.css", "_app/immutable/assets/ArrowUp.baf5064f.css", "_app/immutable/assets/QuoteInfo.216cdf32.css"];
    fonts16 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/settings/_page.server.ts.js
var page_server_ts_exports6 = {};
var init_page_server_ts6 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/settings/_page.server.ts.js"() {
    init_page_server();
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/settings/_page.svelte.js
var page_svelte_exports11 = {};
__export(page_svelte_exports11, {
  default: () => Page11
});
async function updatePickupAddress(inputData) {
  try {
    const res = await fetch(`${backendUrl}/business/update_pickup_address`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
    });
    const data = await res.json();
    return data;
  } catch (error2) {
    throw error2;
  }
}
async function addBusinessAddress(dataInput) {
  try {
    const res = await fetch(`${backendUrl}/business/address`, {
      body: JSON.stringify(dataInput),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    return data;
  } catch (error2) {
    throw error2;
  }
}
var css$22, AddressInput, Pencil, Icon, DefaultPickupAddress, css$15, User2, phoneNumberType, css10, DisplayAddress, Page11;
var init_page_svelte11 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/settings/_page.svelte.js"() {
    init_ssr();
    init_config();
    init_basic_store();
    init_get_basic_info();
    init_Toaster_svelte_svelte_type_style_lang();
    init_freight_class();
    init_devalue();
    css$22 = {
      code: "input.svelte-196jvbb{background-color:#ffffff}",
      map: null
    };
    AddressInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let streetAddress;
      let { Id = "" } = $$props;
      let { placeholder = "" } = $$props;
      let { Klass = "" } = $$props;
      let { functionToCallAfter } = $$props;
      createEventDispatcher();
      if ($$props.Id === void 0 && $$bindings.Id && Id !== void 0)
        $$bindings.Id(Id);
      if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
        $$bindings.placeholder(placeholder);
      if ($$props.Klass === void 0 && $$bindings.Klass && Klass !== void 0)
        $$bindings.Klass(Klass);
      if ($$props.functionToCallAfter === void 0 && $$bindings.functionToCallAfter && functionToCallAfter !== void 0)
        $$bindings.functionToCallAfter(functionToCallAfter);
      $$result.css.add(css$22);
      streetAddress = "";
      return `<input${add_attribute("id", Id, 0)} class="${escape(Klass, true) + " input max-w-[500px] svelte-196jvbb"}"${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", streetAddress, 0)}>`;
    });
    Pencil = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke-width": "1.5", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "d": "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" }] }, "mini": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "d": "M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" }] }, "solid": { "a": { "viewBox": "0 0 24 24", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "d": "M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" }] } };
    Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let icon;
      let $$restProps = compute_rest_props($$props, ["src", "size", "solid", "mini"]);
      let { src } = $$props;
      let { size = "100%" } = $$props;
      let { solid = false } = $$props;
      let { mini = false } = $$props;
      if (size !== "100%") {
        if (size.slice(-1) != "x" && size.slice(-1) != "m" && size.slice(-1) != "%") {
          try {
            size = parseInt(size) + "px";
          } catch (error2) {
            size = "100%";
          }
        }
      }
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
        $$bindings.solid(solid);
      if ($$props.mini === void 0 && $$bindings.mini && mini !== void 0)
        $$bindings.mini(mini);
      icon = src?.[solid ? "solid" : mini ? "mini" : "default"];
      return `<svg${spread(
        [
          escape_object(icon?.a),
          { xmlns: "http://www.w3.org/2000/svg" },
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          { "aria-hidden": "true" },
          escape_object($$restProps)
        ],
        {}
      )}>${each(icon?.path ?? [], (a) => {
        return `<path${spread([escape_object(a)], {})}></path>`;
      })}</svg>`;
    });
    DefaultPickupAddress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $basicStore, $$unsubscribe_basicStore;
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => $basicStore = value);
      let edit_default_pickup_location_active = false;
      function updateDefaultPickupLocation(data) {
        edit_default_pickup_location_active = false;
        updatePickupAddress(data).then((res) => {
          getBasicInfo().then((res2) => {
            updateBasicStore(res2);
            window.location.reload();
          });
        }).catch((error2) => {
          console.debug(error2);
        });
        edit_default_pickup_location_active = false;
      }
      $$unsubscribe_basicStore();
      return `<div class="mt-2 w-full"><div class="flex min-h-[100px] w-full flex-col gap-2 sm:items-center"><img src="/images/icons/pickup.svg" width="35px" alt="pickup icon" class="self-start"> <div class="flex w-full flex-col justify-start gap-3 pb-3 sm:ml-2">${$basicStore?.business?.needsDefaultPickupAddressUpdate == void 0 || $basicStore?.business?.needsDefaultPickupAddressUpdate == false ? `<div class="flex flex-col gap-1"><p>${escape($basicStore?.business?.defaultPickupAddress?.addressLine1)}</p> <div class="flex gap-2"><p>${escape($basicStore?.business?.defaultPickupAddress?.city)}</p> <p>${escape($basicStore?.business?.defaultPickupAddress?.zipCode)}</p></div> <p>${escape($basicStore?.business?.defaultPickupAddress?.state)}</p></div>` : `${$basicStore?.business?.needsDefaultDeliveryAddressUpdate == void 0 && edit_default_pickup_location_active != true ? `<button class="btn mt-3 max-w-[70px]" title="edit default pickup location" style="background-color: #5CB971; padding:0;">${validate_component(Icon, "Icon").$$render($$result, { src: Pencil, class: "h-6" }, {}, {})}</button>` : `<label class="font-poppins" for="default_pickup_address" data-svelte-h="svelte-pjb12w">Add Pickup Address</label> ${validate_component(AddressInput, "Place").$$render(
        $$result,
        {
          Id: "default_pickup_address",
          Klass: "w-full lg:max-w-[500px] input",
          placeholder: "street address",
          functionToCallAfter: updateDefaultPickupLocation
        },
        {},
        {}
      )}`}`}</div></div> </div>`;
    });
    css$15 = {
      code: "select.svelte-1ao1jwc{background-color:white !important}button.svelte-1ao1jwc{color:white !important}",
      map: null
    };
    User2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $basicStore, $$unsubscribe_basicStore;
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => $basicStore = value);
      get_store_value(basicStore);
      $$result.css.add(css$15);
      $$unsubscribe_basicStore();
      return ` <div class="mb-12">${$basicStore.user?.email && $basicStore.user?.email.length > 0 ? `<div class="mb-4 flex flex-col w-full gap-4"><p class="" id="useremail">${escape($basicStore.user.email)}</p> <div class="min-w-[100px]"><select${add_attribute("id", "userrole_", 0)}${add_attribute("name", "userrole_", 0)} class="select w-[200px] svelte-1ao1jwc" style="opacity: .9;color:#5CB971;font-weight: 600;" value="0" disabled><option value="0" label="Admin" data-svelte-h="svelte-7tb3cf">Admin </option><option value="1" label="Manager" data-svelte-h="svelte-12r19gs">Manager</option></select></div> <div class=""><button class="btn w-[150px] font-bungee svelte-1ao1jwc" title="delete the selected user" style="background-color: rgba(250,32,32,.6);padding:0;color:#fff;" id="deleteUser" data-svelte-h="svelte-147m2gw">delete user</button></div></div>` : ``} </div>`;
    });
    phoneNumberType = /* @__PURE__ */ ((phoneNumberType2) => {
      phoneNumberType2[phoneNumberType2["placeHolderPhoneType"] = 0] = "placeHolderPhoneType";
      phoneNumberType2[phoneNumberType2["home"] = 1] = "home";
      phoneNumberType2[phoneNumberType2["office"] = 2] = "office";
      phoneNumberType2[phoneNumberType2["cellPhone"] = 3] = "cellPhone";
      phoneNumberType2[phoneNumberType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
      return phoneNumberType2;
    })(phoneNumberType || {});
    css10 = {
      code: "button.svelte-mm1tbx{color:white !important}",
      map: null
    };
    DisplayAddress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let newBusinessName;
      let allowBusinessNameUpdate;
      let $basicStore, $$unsubscribe_basicStore;
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => $basicStore = value);
      ({
        phoneNumber: "",
        type: phoneNumberType.office
      });
      async function addAddress(add2) {
        await addBusinessAddress(add2);
        if ($basicStore.business) {
          set_store_value(basicStore, $basicStore.business.address = add2, $basicStore);
          updateBasicStore($basicStore);
        }
        window.location.reload();
      }
      $$result.css.add(css10);
      newBusinessName = "";
      allowBusinessNameUpdate = false;
      $$unsubscribe_basicStore();
      return `<div class="flex flex-col"><div class="flex flex-col py-5 pt-2 lg:flex-row"><div class="flex flex-col gap-3 lg:w-1/2"><div class="mt-2 self-start" data-svelte-h="svelte-1qs651w"><img src="/images/icons/business.svg" alt="user" width="35px"></div> <h3 class="font-bungee">${escape($basicStore?.business?.businessName)}</h3> <form name="changeBusinessNameForm" class="w-full flex flex-col gap-4" method="post" action="?/changeBusinessName"><input type="hidden" name="businessId"${add_attribute("value", $basicStore.business?.businessId, 0)}> ${allowBusinessNameUpdate ? `<input type="text" class="input w-[300px]" id="businessName" name="businessName" placeholder="business name"${add_attribute("value", newBusinessName, 0)}> <button type="button" class="btn mt-1 max-w-[300px] svelte-mm1tbx" title="edit default pickup location" style="background-color: #5CB971; padding:0;color:white;" data-svelte-h="svelte-wsvlwb">Change Business Name</button>` : ``} ${!allowBusinessNameUpdate ? `<button type="button" class="btn mt-1 max-w-[300px] svelte-mm1tbx" title="edit default pickup location" style="background-color: #5CB971; padding:0;color:white;" data-svelte-h="svelte-3p611e">Update Name</button>` : ``}</form> <div class="flex w-full flex-col gap-2">${$basicStore.business?.needsAddressUpdate ? `<label class="" for="address" data-svelte-h="svelte-v69xgx">Add your address</label> ${validate_component(AddressInput, "Place").$$render(
        $$result,
        {
          Id: "address",
          Klass: "w-full lg:max-w-[500px]",
          placeholder: "add business address",
          functionToCallAfter: addAddress
        },
        {},
        {}
      )}` : `<div class="flex flex-col gap-2"><p>${escape($basicStore.business?.address?.addressLine1 || "")}</p> <p>${escape($basicStore.business?.address?.city || "")}</p> <p>${escape($basicStore.business?.address?.state || "")}${escape($basicStore.business?.address?.state == "" ? "" : ",")} ${escape($basicStore.business?.address?.zipCode || "")}</p></div>`} <button class="btn mt-1 max-w-[300px] svelte-mm1tbx" title="edit default pickup location" style="background-color: #5CB971; padding:0;color:white;" data-svelte-h="svelte-1c1ze0">update address</button></div></div> <div class="mt-2 flex w-full flex-col gap-3 md:w-1/2 md:min-w-[300px]"><div class="flex flex-col gap-2"><div class="flex w-full flex-col"><img src="/images/icons/phone_black.svg" alt="user" width="25px" height="25px"> ${`<div>${escape($basicStore.business?.phoneNumber?.phoneNumber)}</div>`}  ${`<button class="btn mt-1 max-w-[300px] px-8 svelte-mm1tbx" title="edit default pickup location" style="background-color: #5CB971; padding:0;color:white;" data-svelte-h="svelte-164gmzn">update phone number</button>`} ${``}</div> <div class="flex" data-svelte-h="svelte-czbg93"><img src="/images/icons/binding.svg" alt="user" width="25px" height="25px"></div></div> <div class="flex flex-col justify-between gap-2 py-2"><p class="">Liable Party: <span class="ml-2">${escape($basicStore.business?.businessName == void 0 ? " " : $basicStore.business?.businessName)}</span></p></div></div></div>  </div>`;
    });
    Page11 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="min-h-[100vh] text-black max-w-[1100px]"><div class="min-h-[calc(120vh-80px)] w-full flex flex-col p-2"><h1 class="py-4 text-xl" data-svelte-h="svelte-omacvi">Settings</h1> <div class=""><h3 class="font-bungee" data-svelte-h="svelte-1c16hux">Users</h3> <div class="p-2 sm:p-8 bg-whitebg mr-2">${validate_component(User2, "User").$$render($$result, {}, {}, {})} </div></div> <div class="mt-8"><h3 class="" data-svelte-h="svelte-1q8a3tt">Customer</h3> <div class="p-2 sm:p-8 bg-whitebg mr-2">${validate_component(DisplayAddress, "BusinessAddress").$$render($$result, {}, {}, {})} <h3 class="mt-2 font-bungee" data-svelte-h="svelte-olnb3i">Default Pickup Address</h3> ${validate_component(DefaultPickupAddress, "DefaultPickupAddress").$$render($$result, {}, {}, {})}</div></div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports17 = {};
__export(__exports17, {
  component: () => component17,
  fonts: () => fonts17,
  imports: () => imports17,
  index: () => index17,
  server: () => page_server_ts_exports6,
  server_id: () => server_id6,
  stylesheets: () => stylesheets17
});
var index17, component_cache17, component17, server_id6, imports17, stylesheets17, fonts17;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    init_page_server_ts6();
    index17 = 16;
    component17 = async () => component_cache17 ?? (component_cache17 = (await Promise.resolve().then(() => (init_page_svelte11(), page_svelte_exports11))).default);
    server_id6 = "src/routes/(admin)/admin/settings/+page.server.ts";
    imports17 = ["_app/immutable/nodes/16.e689fdfe.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/spread.8a54911c.js", "_app/immutable/chunks/config.1c7577db.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/delivery_store.5fe89634.js", "_app/immutable/chunks/commodity_store.3c0148c0.js", "_app/immutable/chunks/forms.0adc281c.js", "_app/immutable/chunks/parse.bee59afc.js"];
    stylesheets17 = ["_app/immutable/assets/16.0886a1d4.css", "_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts17 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/shipments/_page.svelte.js
var page_svelte_exports12 = {};
__export(page_svelte_exports12, {
  default: () => Page12
});
var Page12;
var init_page_svelte12 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/shipments/_page.svelte.js"() {
    init_ssr();
    init_basic_store();
    Page12 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $basicStore, $$unsubscribe_basicStore;
      $$unsubscribe_basicStore = subscribe(basicStore, (value) => $basicStore = value);
      $$unsubscribe_basicStore();
      return `<div class="p-2 min-h-[100vh] max-w-[1100px]"><h1 class="my-4 font-bold" data-svelte-h="svelte-l5vi9e">Recent Bookings</h1> <div class="text-[#25274d]"><div class="flex flex-col border border-gray-500"><div class="hidden w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 md:flex md:w-full md:flex-row md:justify-start" data-svelte-h="svelte-k096cd"><h3 class="w-full md:w-1/6">S.N</h3> <h3 class="w-full md:w-1/6">Shipment ID</h3> <h3 class="w-full md:w-1/6">Origin</h3> <h3 class="w-full md:w-1/6">Destination</h3> <h3 class="w-full md:w-1/6">Pickup Date</h3> <h3 class="w-full md:w-1/6">Download BOL</h3></div> <div class="hidden flex-col md:flex">${$basicStore?.shipments?.length > 0 ? `${each($basicStore?.shipments, (shipment, index28) => {
        return `<div class="flex w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 font-mono md:w-full md:flex-row md:justify-start"><h3 class="w-full md:w-1/6">${escape(index28 + 1)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.shipmentInfo?.quoteId)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.pickup?.address?.zipCode)}, ${escape(shipment?.quoteRequest?.pickup?.address?.city)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.delivery?.address?.zipCode)}, ${escape(shipment?.quoteRequest?.delivery?.address?.city)}</h3> <h3 class="w-full md:w-1/6">${escape(shipment?.quoteRequest?.shipmentInfo?.pickupDate.split("T")[0])}</h3>  <a target="_blank" class="w-full underline underline-offset-2 md:w-1/6"${add_attribute("href", shipment?.bookingInfo?.bolUrl, 0)}>Download BOL</a> </div>`;
      })}` : ``}</div></div> <div class="mt-6 flex w-full flex-col gap-4 font-mono font-semibold md:hidden">${$basicStore?.shipments?.length > 0 ? `${each($basicStore?.shipments, (shipment, index28) => {
        return `<div class="flex w-full max-w-[400px] rounded-xl bg-purple-100 px-6 py-8"><div class="flex w-1/2 flex-col" data-svelte-h="svelte-1njwld5"><h3 class="">S.N</h3> <h3 class="">Shipment ID</h3> <h3 class="">Origin</h3> <h3 class="">Destination</h3> <h3 class="">Pickup Date</h3> <h3 class="">Download BOL</h3></div> <div class="flex w-1/2 flex-col"><h3 class="">${escape(index28 + 1)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.shipmentInfo?.pickupDate)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.pickup?.address?.city)}, ${escape(shipment?.quoteRequest?.pickup?.address?.zipCode)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.delivery?.address?.city)}, ${escape(shipment?.quoteRequest?.delivery?.address?.zipCode)}</h3> <h3 class="">${escape(shipment?.quoteRequest?.shipmentInfo?.pickupDate.split("T")[0])}</h3> <a target="_blank" class="underline underline-offset-2"${add_attribute("href", shipment?.bookingInfo?.bolUrl, 0)}>Download BOL</a></div> </div>`;
      })}` : ``}</div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/17.js
var __exports18 = {};
__export(__exports18, {
  component: () => component18,
  fonts: () => fonts18,
  imports: () => imports18,
  index: () => index18,
  stylesheets: () => stylesheets18
});
var index18, component_cache18, component18, imports18, stylesheets18, fonts18;
var init__18 = __esm({
  ".svelte-kit/output/server/nodes/17.js"() {
    index18 = 17;
    component18 = async () => component_cache18 ?? (component_cache18 = (await Promise.resolve().then(() => (init_page_svelte12(), page_svelte_exports12))).default);
    imports18 = ["_app/immutable/nodes/17.1612f856.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js"];
    stylesheets18 = [];
    fonts18 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(admin)/admin/track/_page.svelte.js
var page_svelte_exports13 = {};
__export(page_svelte_exports13, {
  default: () => Page13
});
var css11, Page13;
var init_page_svelte13 = __esm({
  ".svelte-kit/output/server/entries/pages/(admin)/admin/track/_page.svelte.js"() {
    init_ssr();
    init_Toaster_svelte_svelte_type_style_lang();
    css11 = {
      code: "button.svelte-mm1tbx{color:white !important}",
      map: null
    };
    Page13 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let tracked;
      let shipmentNo;
      $$result.css.add(css11);
      tracked = false;
      shipmentNo = "";
      return `<div class="p-2 min-h-[100vh] text-black max-w-[1100px]"><h1 class="py-2" data-svelte-h="svelte-1pkbebb">Track Freight Status</h1> <div class="lg:self-start"><div class="p-2 gap-6 bg-whitebg shadow-md sm:p-6 flex flex-col items-center lg:items-start"><form action="#" class="flex flex-col w-full items-center lg:items-start"><div class="flex flex-col gap-4"><input class="max-w-[300px] rounded-lg p-2" type="search" name="search" placeholder="Bol Number / Pro Number"${add_attribute("value", shipmentNo, 0)}> <button type="submit" class="bg-neutral ownBtn h-[70px] w-[300px] mt-5 svelte-mm1tbx" data-svelte-h="svelte-t5dlrt">Search <i class="fas fa-search ml-4"></i></button></div></form> <h3 class="font-semibold" data-svelte-h="svelte-14gohje">Status results</h3> ${tracked ? `<div class="flex flex-col mt-3" data-svelte-h="svelte-1vd21m1"><h3>Not Found</h3></div>` : ``}</div></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/18.js
var __exports19 = {};
__export(__exports19, {
  component: () => component19,
  fonts: () => fonts19,
  imports: () => imports19,
  index: () => index19,
  stylesheets: () => stylesheets19
});
var index19, component_cache19, component19, imports19, stylesheets19, fonts19;
var init__19 = __esm({
  ".svelte-kit/output/server/nodes/18.js"() {
    index19 = 18;
    component19 = async () => component_cache19 ?? (component_cache19 = (await Promise.resolve().then(() => (init_page_svelte13(), page_svelte_exports13))).default);
    imports19 = ["_app/immutable/nodes/18.f9bc588a.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/index.ba125b59.js"];
    stylesheets19 = ["_app/immutable/assets/18.d97d25a7.css", "_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts19 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(bol)/bol/_slug_/_page.server.ts.js
var page_server_ts_exports7 = {};
__export(page_server_ts_exports7, {
  load: () => load8,
  prerender: () => prerender4,
  ssr: () => ssr3
});
async function load8(args) {
  console.log("loading booking page");
  try {
    const bookingId = args?.params?.slug;
    if (bookingId != "" || bookingId != null) {
      const url = backendUrl + `/booking/${bookingId}`;
      console.log("back end Url is :", backendUrl, bookingId);
      const data = await args.fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (data.ok) {
        const rawRes = await data.json();
        if (rawRes?.quoteRequest?.shipmentInfo?.pickupDate && rawRes?.quoteRequest?.shipmentInfo.pickupDate.includes("T")) {
          rawRes.quoteRequest.shipmentInfo.pickupDate = rawRes.quoteRequest.shipmentInfo.pickupDate.split("T")[0];
          return rawRes;
        } else {
          return rawRes;
        }
      } else {
        throw redirect(302, "/");
      }
    } else {
      throw redirect(302, "/");
    }
  } catch (error2) {
    throw redirect(302, "/");
  }
}
var prerender4, ssr3;
var init_page_server_ts7 = __esm({
  ".svelte-kit/output/server/entries/pages/(bol)/bol/_slug_/_page.server.ts.js"() {
    init_page_server();
    init_config();
    prerender4 = false;
    ssr3 = true;
  }
});

// .svelte-kit/output/server/entries/pages/(bol)/bol/_slug_/_page.svelte.js
var page_svelte_exports14 = {};
__export(page_svelte_exports14, {
  default: () => Page14
});
var getCarrierContact, css12, Page14;
var init_page_svelte14 = __esm({
  ".svelte-kit/output/server/entries/pages/(bol)/bol/_slug_/_page.svelte.js"() {
    init_ssr();
    init_Logo();
    getCarrierContact = (carrier) => {
      switch (carrier) {
        case "XPO LTL":
          return {
            name: "XPO",
            phone: "213-744-0664",
            email: "ltlccg@xpo.com",
            cancel_pickup_email: "ltlccg@xpo.com",
            cancel_pickup_phone: "213-744-0664",
            dispatch_email: "ltlccg@xpo.com",
            dispatch_phone: "213-744-0664"
          };
        case "ROADRUNNER":
          return {
            name: "RoadRunner",
            phone: "1-951-361-5900",
            email: "laxcustser@roadrunnerLTL.com",
            cancel_pickup_email: "fedex.com",
            cancel_pickup_phone: "1-951-361-5900",
            dispatch_email: "laxcustser@roadrunnerLTL.com",
            dispatch_phone: "1-951-361-5900"
          };
        case "CLEARLANE":
          return {
            name: "USPS",
            phone: "1-866-491-9255",
            email: "customerservice@clearlanefreight.com",
            cancel_pickup_email: "customerservice@clearlanefreight.com",
            cancel_pickup_phone: "1-866-491-9255",
            dispatch_email: "customerservice@clearlanefreight.com",
            dispatch_phone: "1-866-491-9255"
          };
        default:
          return {
            name: "FirstShipper Logistics",
            phone: "1-713-516-2836",
            email: "bookings@firstshipper.com",
            cancel_pickup_email: "bookings@firstshipper.com",
            cancel_pickup_phone: "713-516-2836",
            dispatch_email: "bookings@firstshipper.com",
            dispatch_phone: "1-713-516-2836"
          };
      }
    };
    css12 = {
      code: "a.svelte-1beooe1>span.personName.svelte-1beooe1::first-letter{text-transform:capitalize !important}.companyName.svelte-1beooe1.svelte-1beooe1::first-letter{text-transform:capitalize}",
      map: null
    };
    Page14 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let carrierContact;
      if (data?.bookingInfo?.carrierProNumber) {
        carrierContact = getCarrierContact(data.bookingInfo.carrierName);
      }
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css12);
      return `${data.bookingInfo?.carrierProNumber ? `<div class="bol textPrimary relative m-auto mt-4 flex max-h-[1104px] max-w-[768px] flex-col justify-around" id="bol"><div class="h-full"><div class="relative mb-2 flex h-[30px] w-full justify-between"><div class="flex h-full w-1/2 items-center justify-start">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div> <div class="flex h-full w-full items-center text-center" data-svelte-h="svelte-tf66iq"><div class="flex w-full items-center justify-end text-center"><h3 class="text-center font-semibold">BILL OF LADING</h3></div></div></div> <div class="flex w-full" style="margin-top:10px;"><div class="flex w-1/2 flex-col gap-1"><h3 data-svelte-h="svelte-19ih6u1">SHIPPER</h3> <div class="flex w-[300px] gap-2 border-b-[.5px] border-gray-700"></div> <h4 class="text-uppercase companyName mb-1 text-[20px] font-bold svelte-1beooe1" style="font-size: 16px">${escape(data?.quoteRequest?.pickup?.companyName)}</h4> <h4 class="">${escape(data?.quoteRequest?.pickup?.address?.addressLine1)}</h4> <h4 class=""><span>${escape(data?.quoteRequest?.pickup?.address?.city)}</span>, <span>${escape(data?.quoteRequest?.pickup?.address?.state)}</span>, <span>${escape(data?.quoteRequest?.pickup?.address?.zipCode)}</span></h4> <a${add_attribute("href", `tel:${data?.quoteRequest?.pickup?.contact?.phoneNumber}`, 0)} class="svelte-1beooe1"><span class="personName svelte-1beooe1" style="text-transform:capitalize">${escape(data?.quoteRequest?.pickup?.contact?.name || "")}</span>, Phone: ${escape(data?.quoteRequest?.pickup?.contact?.phoneNumber || "")}</a> <a${add_attribute("href", `tel:${data?.quoteRequest?.pickup?.contact?.emailAddress}`, 0)}>Email: ${escape(data?.quoteRequest?.pickup?.contact?.emailAddress)}</a> <h3 class="mt-2" data-svelte-h="svelte-1mbphwa">CONSIGNEE</h3> <div class="flex w-[300px] gap-2 border-b-[.5px] border-gray-700"></div> <h4 class="text-uppercase companyName mb-1 svelte-1beooe1" style="font-size: 16px;">${escape(data?.quoteRequest?.delivery?.companyName)}</h4> <h4 class="">${escape(data?.quoteRequest?.delivery?.address?.addressLine1)}</h4> <h4 class=""><span>${escape(data?.quoteRequest?.delivery?.address?.city)}</span>,   <span>${escape(data?.quoteRequest?.delivery?.address?.state)}</span>,   <span>${escape(data?.quoteRequest?.delivery?.address?.zipCode)}</span></h4> <a${add_attribute("href", `tel:${data?.quoteRequest?.delivery?.contact?.phoneNumber}`, 0)} class="svelte-1beooe1"><span class="personName svelte-1beooe1" style="text-transform:capitalize">${escape(data?.quoteRequest?.delivery?.contact?.name || "")}</span>, Phone: ${escape(data?.quoteRequest?.delivery?.contact?.phoneNumber || "")}</a> <a${add_attribute("href", `tel:${data?.quoteRequest?.delivery?.contact?.emailAddress}`, 0)}>Email: ${escape(data?.quoteRequest?.delivery?.contact?.emailAddress)}</a></div> <div class="flex w-1/2 flex-col gap-1"><div class="flex h-[50px] w-full justify-between"><div class="flex h-full w-1/2 flex-col items-center justify-center"><img${add_attribute("src", data.bookingInfo.carrierLogoUrl, 0)} height="50%" width="50%" alt="carrier logo"></div> <div class="flex h-full w-1/2 flex-col items-center justify-center"> <img${add_attribute("src", data?.bookingInfo?.proNumberSvgUrl, 0)} alt="po number" style="width:100%; height: 40px;margin:0;"> <span style="font-size: 16px; margin-top:4px;" class="text-2xl">PRO# ${escape(data?.bookingInfo.carrierProNumber)}</span></div></div> <div class="mt-1 flex w-full"><div class="flex w-full flex-col"><div class="flex gap-2 border-b-[.5px] border-gray-700"><div class="flex w-[55%] flex-col"><h3 data-svelte-h="svelte-xc22hm">Carrier</h3> <h4 class="mt-1">${escape(data?.bookingInfo.carrierName)}</h4></div> <div class="flex w-[45%] flex-col"><h3 data-svelte-h="svelte-1mush92">Pickup Date</h3> <h4 class="mt-1">${escape(data?.quoteRequest?.shipmentInfo?.displayDate)} ${escape(data?.quoteRequest?.shipmentInfo?.pickupReadyTime)}</h4></div></div> <div class="flex gap-2 border-b-[.5px] border-gray-700"><div class="flex w-[55%] flex-col"><h3 data-svelte-h="svelte-1jufsbg">Carrier PRO#</h3> <h4 class="mt-1">${escape(data?.bookingInfo.carrierProNumber)}</h4></div> <div class="flex w-[45%] flex-col"><h3 data-svelte-h="svelte-sdgk12">Bill of lading NO.</h3> <h4 class="mt-1">${escape(data?.bookingInfo.firstShipperBolNumber)}</h4></div></div> <div class="flex gap-2 border-b-[.5px] border-gray-700"><div class="flex w-[55%] flex-col"><h3 data-svelte-h="svelte-1hffq3c">PO#</h3> <h4 class="mt-1">${escape(data?.bookingInfo.carrierPickupNumber)}</h4></div> <div class="flex w-[45%] flex-col"><h3 data-svelte-h="svelte-6w140i">Reference#</h3> <h4 class="mt-1">${escape(data?.bookingInfo.carrierReferences)} ${escape("CABOL " + data.bookingInfo.carrierBolNumber)}</h4></div></div></div></div> <h3 class="mt-1 w-full border-b-[.5px] border-gray-700 font-bold" data-svelte-h="svelte-d0fuee">Fright Charge Terms</h3> <div class="flex items-center gap-2 pt-2" data-svelte-h="svelte-11k37k8"><label for="prepaid" class="label flex items-center"><input type="checkbox" class="h-4 w-4 rounded-full p-1">
              Prepaid</label> <label for="third-party" class="label flex items-center"><input type="checkbox" class="h-4 w-4 rounded-full" ${"checked"}>
              Third Party</label> <label for="inbound-collect" class="label flex items-center"><input type="checkbox" class="h-4 w-4 rounded-full bg-gray-400 p-1" style="background-color:lightgray">
              Inbound Collect</label></div> <div class="flex items-center gap-1 py-1"><h3 class="font-semibold" data-svelte-h="svelte-t9jnd4">Carrier Contact:</h3> <div class="ml-2 flex gap-3"><div class="flex gap-1"><span data-svelte-h="svelte-1s4kc5o">Email:</span> <a${add_attribute("href", `mailto:${carrierContact?.email}`, 0)}>${escape(carrierContact?.email)}</a></div> <div class="flex gap-1"><span data-svelte-h="svelte-gq3kxk">Phone:</span> <a${add_attribute("href", `tel:${carrierContact?.email}`, 0)}>${escape(carrierContact?.phone || "")}</a></div></div></div></div></div> <div class="mt-1 flex flex-col border-t-[1px] border-gray-700"></div> <div class="mt-1 mb-2 flex h-[30px] justify-between"><div class="flex w-1/2 flex-col"><h3 data-svelte-h="svelte-1yvbqs1">PICKUP INSTRUCTIONS</h3> <span style="text-align:left;">${escape(data?.quoteRequest?.pickup?.instructions || "")}</span></div> <div class="flex w-1/2 flex-col border-l-[1px] border-gray-700"><h3 class="self-end" data-svelte-h="svelte-l12djc">DELIVERY INSTRUCTIONS</h3> <span style="text-align:right;">${escape(data?.quoteRequest?.delivery?.instructions || "")}</span></div> <div class="mt-1 flex flex-col border-t-[1px] border-gray-700"></div></div> <div class="mb-3 flex min-h-[35px] flex-col"><h3 class="" data-svelte-h="svelte-sz6fv9">SPECIAL INSTRUCTIONS</h3> <span>${escape(data?.quoteRequest?.shipmentInfo?.specialInstruction || "")}</span></div> <div class="mb-2"><table class="bol-table border-collapse border border-gray-700"><tbody><tr class="border-collapse" data-svelte-h="svelte-11u3auu"><th class="border-collapse border border-gray-700" colspan="2" style="vertical-align : middle;text-align:center; width: 10%;">Handeling Unit</th> <th class="border-collapse border border-gray-700" colspan="2" style="vertical-align : middle;text-align:center; width: 10%;">Package</th> <th class="border-collapse border border-gray-700" rowspan="2" style="vertical-align : middle;text-align:center;width: 5%;">HM</th> <th class="border-collapse border border-gray-700" rowspan="2" style="horizontal-align : middle;text-align:center; width: 40%;">Commodities Description</th> <th class="border-collapse border border-gray-700" rowspan="2" style="vertical-align : middle;text-align:center;width: 10%;">Weight</th> <th class="border-collapse border border-gray-700" rowspan="2" style="vertical-align : middle;text-align:center;width: 5%;">Freight Class</th> <th class="border-collapse border border-gray-700" rowspan="2" style="vertical-align : middle;text-align:center;width: 5%;">NMFC#</th> <th class="border-collapse border border-gray-700" colspan="3" style="vertical-align : middle;text-align:center;width: 10%;">DIMENSION</th> <th class="border-collapse border border-gray-700" rowspan="2" style="vertical-align : middle;text-align:center;width: 5%;">Stackable</th></tr> <tr data-svelte-h="svelte-sjm7ao"><th class="border-collapse border border-gray-700" scope="col">Type</th> <th class="border-collapse border border-gray-700" scope="col">QTY</th> <th class="border-collapse border border-gray-700" scope="col">Type</th> <th class="border-collapse border border-gray-700" scope="col">QTY</th> <th class="border-collapse border border-gray-700" scope="col">L</th> <th class="border-collapse border border-gray-700" scope="col">W</th> <th class="border-collapse border border-gray-700" scope="col">H</th></tr> ${data?.quoteRequest?.commodities ? `${each(data?.quoteRequest.commodities, (commodity) => {
        return `<tr><td class="border-collapse border border-gray-700" height="20" data-svelte-h="svelte-1sm7g14">Pallets</td> <td class="border-collapse border border-gray-700">${escape(commodity.quantity)}</td> <td class="border-collapse border border-gray-700"></td> <td class="border-collapse border border-gray-700">${escape(commodity.quantity)}</td> <td class="border-collapse border border-gray-700"></td> <td class="border-collapse border border-gray-700">${escape(commodity.description)}</td> <td class="border-collapse border border-gray-700">${escape(commodity.weight)}</td> <td class="border-collapse border border-gray-700">${escape(commodity.freightClass)}</td> <td class="border-collapse border border-gray-700"></td> <td class="border-collapse border border-gray-700">${escape(commodity.length)}</td> <td class="border-collapse border border-gray-700">${escape(commodity.width)}</td> <td class="border-collapse border border-gray-700">${escape(commodity.height)}</td> <td class="border-collapse border border-gray-700">${escape(commodity?.commodityServices?.includes(5) ? "YES" : "NO")}</td> </tr>`;
      })}` : ``} <tr><td class="total border-collapse border border-gray-700" colspan="2" height="20">TOTAL H/U ${escape(data?.quoteRequest?.shipmentInfo?.totalItems)}</td> <td class="total border-collapse border border-gray-700" colspan="2">TOTAL PKG ${escape(data?.quoteRequest?.shipmentInfo?.totalItems)}</td> <td class="total border-collapse border border-gray-700" colspan="2">TOTAL Weight ${escape(data?.quoteRequest?.shipmentInfo?.totalWeight)}</td> <td class="total border-collapse border border-gray-700" colspan="2" data-svelte-h="svelte-1jq16m2">TOTAL Density N/A</td> <td class="total border-collapse border border-gray-700" colspan="5" data-svelte-h="svelte-8ce2zu">Cube N/A</td></tr></tbody></table></div> <div class="mb-1 mt-4" data-svelte-h="svelte-izfxxe"><h3 class="">* Weights includes total number of handeling units stated. Do not multiple weight by
          number of handeling units</h3></div> <div class="mt-2 mb-2 font-bold" data-svelte-h="svelte-1t3bnf8"><h2>This shipment has preasigned PRO# and barcode do not apply pro sticker</h2></div> <div class="aggrement mt-3 mb-3 flex h-[220px] justify-between gap-2 border-[1px] border-gray-700 p-4" data-svelte-h="svelte-1kip58e"><div class="flex w-[32%] flex-col justify-between border-r-[1px] border-r-gray-500 p-2"><h3 class="mt-2">Shipper Signature / Date</h3> <div class="notice flex flex-col"><p class="">This is to certify that the above-named materials are properly classified, described,
              packaged, marked and labeled, and are in proper condition for transportation according
              to the applicable regulations of the Department of Transportation</p></div> <div class="flex flex-col"><p class="mt-3 flex w-full">Signature: <span class="mt-3 ml-1 block w-full border-b-[.5px] border-gray-700"></span></p> <p class="mt-4 flex w-full">Date: <span class="mt-3 ml-1 block w-full border-b-[.5px] border-gray-700"></span></p></div></div> <div class="flex w-[36%] flex-col"><div class="flex w-full justify-around"><div class="ml-2 flex w-1/2 flex-col"><h3 class="mt-1 font-semibold">Trailer Loaded:</h3> <div class="flex flex-col gap-2"><div class="flex items-center"><input type="checkbox" class="checkbox" id="trailer_loaded_by_driver"> <label class="label ml-1 flex items-center" for="trailer_loaded_by_driver">By Driver</label></div> <div class="flex items-center"><input type="checkbox" class="checkbox" id="trailer_loaded_by_shipper"> <label class="label ml-1" for="trailer_loaded_by_driver">By Shipper</label></div></div> <div class="flex flex-col"><label for="hu_counted" class="label">Pieces Counted</label> <textarea id="hu_counted" class="h-[35px] w-[100px] border-[1px] border-gray-700"></textarea></div></div> <div class="flex w-1/2 flex-col"><h3 class="mt-1 font-semibold">Freight Counted:</h3> <div class="flex flex-col gap-2"><div class="flex items-center"><input type="checkbox" class="checkbox" id="freight_counted_by_driver"> <label class="label ml-1 flex items-center" for="">By Driver</label></div> <div class="flex items-center"><input type="checkbox" class="checkbox" id="freight_counted_by_shipper"> <label class="label ml-1" for="freight_counted_by_shipper">By Shipper</label></div></div> <div class="flex flex-col"><label for="hu_counted" class="label">HU Counted</label> <textarea id="hu_counted" class="h-[35px] w-[100px] border-[1px] border-gray-700"></textarea></div></div></div> <div class="ml-1 flex w-full flex-col"><label for="said_to_contain" class="label">Said to Contain</label> <textarea id="said_to_contain" class="h-[35px] w-[90%] border-[1px] border-gray-700"></textarea></div></div> <div class="flex w-[32%] flex-col justify-between border-l-[1px] border-gray-700 p-2"><h3 class="mt-2">Carrier Signature / Date</h3> <div class="notice mt-2 flex flex-col"><p class="">This is to certify that the above-named materials are properly classified, described,
              packaged, marked and labeled, and are in proper condition for transportation according
              to the applicable regulations of the Department of Transportation</p></div> <div class="flex flex-col"><p class="mt-3 flex">Signature: <span class="mt-3 ml-1 block w-full border-b-[.5px] border-gray-700"></span></p> <p class="mt-4 flex">Date: <span class="mt-3 ml-1 block w-full border-b-[.5px] border-gray-700"></span></p></div></div></div> <h3 class="note mt-4" data-svelte-h="svelte-1mm9tnr">* NOTE Liability Limitation for loss or damage in this shipment may be applicable. See 49
        U.S.C. 14706(c)(1)(A) and (B)</h3> <div class="notices flex flex-col gap-2 font-[7px]" data-svelte-h="svelte-cipaj1"><h3><strong>Notice: </strong>: Unless the Shipper completes the requirements as provided
          below, Carrier\u2019s liability shall be limited as stated in carrier minimun shipment
          coverage. in effect on date of shipment, which is available on line at
          www.firstshipper.com or may be obtained upon request to Carrier. Shipment is subject to
          the release value provisions of the NMFC as set forth in paragraph 2 on the reverse side
          of this Bill of Lading.
          <strong>In no event shall Carrier be liable for loss of pro t, income, interest, attorney fees,
            or any special, incidental or consequential damages.</strong></h3> <h3><strong>Carrier liability with shipment originating within the United States:
          </strong>Carrier\u2019s liability shall be based on actual NMFC class of the shipment and is
          limited to Carrier\u2019s minimum coverage. Carrier\u2019s liability for all household goods,
          personal effects, and articles other than new, including but not limited to used,
          remanufactured or refurbished articles shall not exceed $1.00 per pound per individual
          lost or damaged piece within the shipment. Carrier\u2019s highest level of liability is $25.00
          per pound per individual lost or damaged piece within the shipment, subject to $150,000.00
          maximum total liability per shipment. Shipper may increase Carrier\u2019s limits on liability
          if the Shipper declares excess value on the Bill of Lading below, requests excess
          liability coverage from the Carrier and pays an additional charge. For this purpose the
          declared value of the property is hereby speci cally stated by the Shipper to be $ , and
          Shipper agrees to pay an additional charge for excess liability coverage. Total declared
          value may not exceed $650,000.00 per shipment.</h3> <h3><strong>Carrier liability with shipment originating within Canada: </strong>Unless the
          Shipper completes the Special Agreement below, declares the value in the box below and
          agrees to pay the excess liability charge by initialing where indicated, Carrier\u2019s maximum
          liability is CAN$2.00 per pound (CAN$4.41 per kilogram) per individual lost or damaged
          piece within the shipment, subject to a maximum total liability per shipment of
          CAN$20,000.00, and provided further that Carrier\u2019s liability on household goods, personal
          effects articles other than new articles, including but not limited to used,
          remanufactured or refurbished articles, shall not exceed one dollar ($1.00) (CAN) per
          pound per individual lost or damaged piece within the shipment.</h3></div></div></div>` : `<h3 data-svelte-h="svelte-1dnpjdh">No data</h3>`}`;
    });
  }
});

// .svelte-kit/output/server/nodes/19.js
var __exports20 = {};
__export(__exports20, {
  component: () => component20,
  fonts: () => fonts20,
  imports: () => imports20,
  index: () => index20,
  server: () => page_server_ts_exports7,
  server_id: () => server_id7,
  stylesheets: () => stylesheets20
});
var index20, component_cache20, component20, server_id7, imports20, stylesheets20, fonts20;
var init__20 = __esm({
  ".svelte-kit/output/server/nodes/19.js"() {
    init_page_server_ts7();
    index20 = 19;
    component20 = async () => component_cache20 ?? (component_cache20 = (await Promise.resolve().then(() => (init_page_svelte14(), page_svelte_exports14))).default);
    server_id7 = "src/routes/(bol)/bol/[slug]/+page.server.ts";
    imports20 = ["_app/immutable/nodes/19.b2f1a0da.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/Logo.02de4488.js"];
    stylesheets20 = ["_app/immutable/assets/19.327bc345.css"];
    fonts20 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(public)/adminlogin/_page.ts.js
var page_ts_exports2 = {};
__export(page_ts_exports2, {
  prerender: () => prerender5
});
var prerender5;
var init_page_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/adminlogin/_page.ts.js"() {
    prerender5 = false;
  }
});

// .svelte-kit/output/server/entries/pages/(public)/adminlogin/_page.svelte.js
var page_svelte_exports15 = {};
__export(page_svelte_exports15, {
  default: () => Page15
});
var Page15;
var init_page_svelte15 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/adminlogin/_page.svelte.js"() {
    init_ssr();
    init_Toaster_svelte_svelte_type_style_lang();
    init_Circle3();
    Page15 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let loading;
      let data = { email: "", password: "" };
      loading = true;
      return `<div class="mx-auto max-w-[400px] py-32"><div class="flex flex-col shadow-md w-full bg-primary lg:rounded-lg p-8 py-12"><h2 class="text-center" data-svelte-h="svelte-yxes5z">Sign in to your account</h2> ${loading ? `<div class="inset-0 flex min-h-[400px] w-full items-center justify-center transition-opacity duration-300"><div class="flex w-full flex-col items-center justify-center pb-[100px]">${validate_component(Circle3, "Circle3").$$render($$result, { size: "60", unit: "px", duration: "1s" }, {}, {})} <div class="sm: mt-3 font-mono" data-svelte-h="svelte-ysidsu">Loging In</div></div></div>` : `<div class="flex w-full items-center justify-center mt-12"><form class="flex w-full max-w-sm flex-col items-center justify-center rounded-lg"><div class="flex w-full flex-col gap-2 rounded-md font-mono"><div class="flex w-full flex-col"><label for="email-address" class="py-1 font-bungee" data-svelte-h="svelte-1mfxm9h">Email Address</label> <input id="email-address" name="email" type="email" autocomplete="username" required class="input w-full p-2" placeholder="Email address"${add_attribute("value", data.email, 0)}> ${``}</div> <div class="flex w-full flex-col"><label for="password" class="py-1 font-bungee" data-svelte-h="svelte-1vo2qzo">Password</label> <input id="password" name="password" type="password" autocomplete="current-password" required class="input p-2" placeholder="Password"${add_attribute("value", data.password, 0)}> ${``}</div></div> <button type="submit" class="bg-neutral ownBtn mx-auto mt-10 w-full" data-svelte-h="svelte-1vfps3h"><span class="flex items-center"> <svg class="mr-5 h-4 w-4 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></span> <span class="">Sign in</span></button> <div class="mt-8 flex w-full justify-between" data-svelte-h="svelte-1eslt9i"><div class="flex w-1/2 flex-col"><h3 class="">No account?</h3> <a href="/signup"><span class="font-bold text-gray-100">Sign Up Now</span></a></div> <div class="flex w-1/2 flex-col"><h3 class="">Forgot password?</h3> <a href="/forgot-password"><span class="font-bold text-yellow-200">Reset Now</span></a></div></div></form></div>`}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/22.js
var __exports21 = {};
__export(__exports21, {
  component: () => component21,
  fonts: () => fonts21,
  imports: () => imports21,
  index: () => index21,
  stylesheets: () => stylesheets21,
  universal: () => page_ts_exports2,
  universal_id: () => universal_id4
});
var index21, component_cache21, component21, universal_id4, imports21, stylesheets21, fonts21;
var init__21 = __esm({
  ".svelte-kit/output/server/nodes/22.js"() {
    init_page_ts2();
    index21 = 22;
    component21 = async () => component_cache21 ?? (component_cache21 = (await Promise.resolve().then(() => (init_page_svelte15(), page_svelte_exports15))).default);
    universal_id4 = "src/routes/(public)/adminlogin/+page.ts";
    imports21 = ["_app/immutable/nodes/22.84e7cf23.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/valid_email.ee72379c.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js", "_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang.36b7f7b6.js", "_app/immutable/chunks/config.1c7577db.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js"];
    stylesheets21 = ["_app/immutable/assets/Toaster.3a6d0da3.css", "_app/immutable/assets/ArrowUp.baf5064f.css"];
    fonts21 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(public)/email-verification/_page.server.ts.js
var page_server_ts_exports8 = {};
__export(page_server_ts_exports8, {
  actions: () => actions,
  load: () => load9,
  prerender: () => prerender6
});
var prerender6, load9, actions;
var init_page_server_ts8 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/email-verification/_page.server.ts.js"() {
    init_page_server();
    prerender6 = false;
    load9 = async ({ locals }) => {
      const session = await locals.auth.validate();
      if (!session)
        throw redirect(302, "/login");
      if (session.user.email_verified) {
        throw redirect(302, "/");
      }
      return {};
    };
    actions = {
      default: async ({ locals }) => {
        const session = await locals.auth.validate();
        if (!session)
          throw redirect(302, "/login");
        if (session.user.email_verified) {
          throw redirect(302, "/admin");
        }
        try {
          return {
            success: true
          };
        } catch {
          return fail(500, {
            message: "An unknown error occurred"
          });
        }
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(public)/email-verification/_page.svelte.js
var page_svelte_exports16 = {};
__export(page_svelte_exports16, {
  default: () => Page16
});
var Page16;
var init_page_svelte16 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/email-verification/_page.svelte.js"() {
    init_ssr();
    init_devalue();
    Page16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { form } = $$props;
      if ($$props.form === void 0 && $$bindings.form && form !== void 0)
        $$bindings.form(form);
      return `<div class="mx-auto max-w-[400px] py-24 min-h-[800px]"><div class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8"><h1 data-svelte-h="svelte-1drqwxb">Email verification</h1> <p data-svelte-h="svelte-1fawv5l">Your email verification link was sent to your inbox (i.e. console).</p> <h2 data-svelte-h="svelte-1fgck9o">Resend verification link</h2> <form method="post" data-svelte-h="svelte-ufseqg"><input class="btn btn-primary min-w-[300px] mt-5 hover:opacity-80" type="submit" value="Resend"></form> ${form?.success ? `<p data-svelte-h="svelte-xdzvo2">Your verification link was resent</p>` : ``}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/30.js
var __exports22 = {};
__export(__exports22, {
  component: () => component22,
  fonts: () => fonts22,
  imports: () => imports22,
  index: () => index22,
  server: () => page_server_ts_exports8,
  server_id: () => server_id8,
  stylesheets: () => stylesheets22
});
var index22, component_cache22, component22, server_id8, imports22, stylesheets22, fonts22;
var init__22 = __esm({
  ".svelte-kit/output/server/nodes/30.js"() {
    init_page_server_ts8();
    index22 = 30;
    component22 = async () => component_cache22 ?? (component_cache22 = (await Promise.resolve().then(() => (init_page_svelte16(), page_svelte_exports16))).default);
    server_id8 = "src/routes/(public)/email-verification/+page.server.ts";
    imports22 = ["_app/immutable/nodes/30.140f0bba.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/forms.0adc281c.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/navigation.dd09c7a2.js"];
    stylesheets22 = [];
    fonts22 = [];
  }
});

// .svelte-kit/output/server/chunks/mailConfig.js
var isValidEmail;
var init_mailConfig = __esm({
  ".svelte-kit/output/server/chunks/mailConfig.js"() {
    isValidEmail = (maybeEmail) => {
      if (typeof maybeEmail !== "string")
        return false;
      if (maybeEmail.length > 255)
        return false;
      const emailRegexp = /^.+@.+$/;
      return emailRegexp.test(maybeEmail);
    };
  }
});

// .svelte-kit/output/server/entries/pages/(public)/forgot-password/_page.server.ts.js
var page_server_ts_exports9 = {};
__export(page_server_ts_exports9, {
  actions: () => actions2,
  prerender: () => prerender7
});
var prerender7, actions2;
var init_page_server_ts9 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/forgot-password/_page.server.ts.js"() {
    init_page_server();
    init_mailConfig();
    init_index2();
    prerender7 = false;
    actions2 = {
      default: async ({ request, platform, locals }) => {
        console.log("in send    paswrod reset link");
        try {
          const formData = await request.formData();
          const emailAddress = formData.get("email");
          console.log("email is ", emailAddress);
          if (!isValidEmail(emailAddress)) {
            return fail(400, {
              message: "Invalid email"
            });
          }
          await clerkClient.emails.createEmail({
            fromEmailName: "firstshipper",
            emailAddressId: "rakeshneupane2045@gmail.com",
            subject: "reset your password",
            body: "hello"
          });
          console.log("email is ");
          const user = auth.transformDatabaseUser(storedUser);
          return {
            success: true
          };
        } catch (e) {
          console.log("error is ", e);
          return fail(500, {
            message: "An unknown error occurred"
          });
        }
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(public)/forgot-password/_page.svelte.js
var page_svelte_exports17 = {};
__export(page_svelte_exports17, {
  default: () => Page17
});
var css13, Page17;
var init_page_svelte17 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/forgot-password/_page.svelte.js"() {
    init_ssr();
    init_devalue();
    css13 = {
      code: "label.svelte-quftiq,a.svelte-quftiq,h3.svelte-quftiq{color:white}",
      map: null
    };
    Page17 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let userData = { email: "" };
      $$result.css.add(css13);
      return `<div class="mx-auto max-w-[400px] py-32"><div class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8"><div class="flex flex-col items-center" data-svelte-h="svelte-10csrf8"><img class="h-12 w-auto" src="/images/logo/white_logo.png" alt="firstshipper company logo"></div> <form method="post" action="/forgot-password" class="flex flex-col mt-12"><label class="label font-semibold svelte-quftiq" for="email" data-svelte-h="svelte-mch8in">Forget Password?</label> <input type="email" name="email" class="input w-full" placeholder="Your Email"${add_attribute("value", userData.email, 0)}> ${``} <div class="mt-1 flex flex-col pt-2" data-svelte-h="svelte-1ggen34"><button type="submit" class="bg-neutral ownBtn my-3 w-full hover:opacity-80">Send Reset Link</button></div> <div class="flex w-full items-center gap-3 my-6" data-svelte-h="svelte-1bbvj6p"><h3 class=" svelte-quftiq">No account?</h3> <a href="/signup" class="inline font-bold underline underline-offset-4 svelte-quftiq">Create one</a></div></form></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/31.js
var __exports23 = {};
__export(__exports23, {
  component: () => component23,
  fonts: () => fonts23,
  imports: () => imports23,
  index: () => index23,
  server: () => page_server_ts_exports9,
  server_id: () => server_id9,
  stylesheets: () => stylesheets23
});
var index23, component_cache23, component23, server_id9, imports23, stylesheets23, fonts23;
var init__23 = __esm({
  ".svelte-kit/output/server/nodes/31.js"() {
    init_page_server_ts9();
    index23 = 31;
    component23 = async () => component_cache23 ?? (component_cache23 = (await Promise.resolve().then(() => (init_page_svelte17(), page_svelte_exports17))).default);
    server_id9 = "src/routes/(public)/forgot-password/+page.server.ts";
    imports23 = ["_app/immutable/nodes/31.7d99b8f0.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/valid_email.ee72379c.js", "_app/immutable/chunks/forms.0adc281c.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/navigation.dd09c7a2.js"];
    stylesheets23 = ["_app/immutable/assets/31.df4db273.css"];
    fonts23 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(public)/logout/_page.server.ts.js
var page_server_ts_exports10 = {};
__export(page_server_ts_exports10, {
  actions: () => actions3,
  load: () => load10,
  prerender: () => prerender8
});
var prerender8, load10, actions3;
var init_page_server_ts10 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/logout/_page.server.ts.js"() {
    init_page_server();
    prerender8 = false;
    load10 = async ({ locals, platform }) => {
      console.log("in logout");
      const session = await locals.auth.validate();
      if (!session)
        return fail(401);
      locals.auth.setSession(null);
      throw redirect(302, "/login");
    };
    actions3 = {
      logout: async ({ locals, platform }) => {
        const session = await locals.auth.validate();
        if (!session)
          return fail(401);
        throw redirect(302, "/login");
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(public)/logout/_page.svelte.js
var page_svelte_exports18 = {};
__export(page_svelte_exports18, {
  default: () => Page18
});
var Page18;
var init_page_svelte18 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/logout/_page.svelte.js"() {
    init_ssr();
    init_Loading();
    init_freight_class();
    init_Toaster_svelte_svelte_type_style_lang();
    Page18 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="pageWrapper flex h-[500px] w-full flex-col items-center justify-center">${validate_component(Loading, "Loading").$$render($$result, { loadingText: "Logging Out" }, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/36.js
var __exports24 = {};
__export(__exports24, {
  component: () => component24,
  fonts: () => fonts24,
  imports: () => imports24,
  index: () => index24,
  server: () => page_server_ts_exports10,
  server_id: () => server_id10,
  stylesheets: () => stylesheets24
});
var index24, component_cache24, component24, server_id10, imports24, stylesheets24, fonts24;
var init__24 = __esm({
  ".svelte-kit/output/server/nodes/36.js"() {
    init_page_server_ts10();
    index24 = 36;
    component24 = async () => component_cache24 ?? (component_cache24 = (await Promise.resolve().then(() => (init_page_svelte18(), page_svelte_exports18))).default);
    server_id10 = "src/routes/(public)/logout/+page.server.ts";
    imports24 = ["_app/immutable/nodes/36.1de1e1b9.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/Loading.5545733f.js", "_app/immutable/chunks/preload-helper.a4192956.js", "_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang.36b7f7b6.js", "_app/immutable/chunks/basic_store.c4a0ce4c.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/quote_utils.8ad4c718.js", "_app/immutable/chunks/delivery_store.5fe89634.js", "_app/immutable/chunks/commodity_store.3c0148c0.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js"];
    stylesheets24 = ["_app/immutable/assets/ArrowUp.baf5064f.css", "_app/immutable/assets/index.798bbb7e.css", "_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts24 = [];
  }
});

// node_modules/drizzle-orm/entity.js
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = value.constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}
var entityKind, hasOwnEntityKind;
var init_entity = __esm({
  "node_modules/drizzle-orm/entity.js"() {
    entityKind = Symbol.for("drizzle:entityKind");
    hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
  }
});

// node_modules/drizzle-orm/column.js
var _a, Column;
var init_column = __esm({
  "node_modules/drizzle-orm/column.js"() {
    init_entity();
    Column = class {
      constructor(table, config) {
        __publicField(this, "name");
        __publicField(this, "primary");
        __publicField(this, "notNull");
        __publicField(this, "default");
        __publicField(this, "defaultFn");
        __publicField(this, "hasDefault");
        __publicField(this, "isUnique");
        __publicField(this, "uniqueName");
        __publicField(this, "uniqueType");
        __publicField(this, "dataType");
        __publicField(this, "columnType");
        __publicField(this, "enumValues");
        __publicField(this, "config");
        this.table = table;
        this.config = config;
        this.name = config.name;
        this.notNull = config.notNull;
        this.default = config.default;
        this.defaultFn = config.defaultFn;
        this.hasDefault = config.hasDefault;
        this.primary = config.primaryKey;
        this.isUnique = config.isUnique;
        this.uniqueName = config.uniqueName;
        this.uniqueType = config.uniqueType;
        this.dataType = config.dataType;
        this.columnType = config.columnType;
      }
      mapFromDriverValue(value) {
        return value;
      }
      mapToDriverValue(value) {
        return value;
      }
    };
    _a = entityKind;
    __publicField(Column, _a, "Column");
  }
});

// node_modules/drizzle-orm/table.js
function getTableName(table) {
  return table[TableName];
}
var TableName, Schema, Columns, OriginalName, BaseName, IsAlias, ExtraConfigBuilder, IsDrizzleTable, _a2, _b, _c, _d, _e, _f, _g, _h, _i, Table;
var init_table = __esm({
  "node_modules/drizzle-orm/table.js"() {
    init_entity();
    TableName = Symbol.for("drizzle:Name");
    Schema = Symbol.for("drizzle:Schema");
    Columns = Symbol.for("drizzle:Columns");
    OriginalName = Symbol.for("drizzle:OriginalName");
    BaseName = Symbol.for("drizzle:BaseName");
    IsAlias = Symbol.for("drizzle:IsAlias");
    ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
    IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
    Table = class {
      constructor(name, schema, baseName) {
        /**
         * @internal
         * Can be changed if the table is aliased.
         */
        __publicField(this, _b);
        /**
         * @internal
         * Used to store the original name of the table, before any aliasing.
         */
        __publicField(this, _c);
        /** @internal */
        __publicField(this, _d);
        /** @internal */
        __publicField(this, _e);
        /**
         *  @internal
         * Used to store the table name before the transformation via the `tableCreator` functions.
         */
        __publicField(this, _f);
        /** @internal */
        __publicField(this, _g, false);
        /** @internal */
        __publicField(this, _h);
        __publicField(this, _i, true);
        this[TableName] = this[OriginalName] = name;
        this[Schema] = schema;
        this[BaseName] = baseName;
      }
    };
    _a2 = entityKind, _b = TableName, _c = OriginalName, _d = Schema, _e = Columns, _f = BaseName, _g = IsAlias, _h = ExtraConfigBuilder, _i = IsDrizzleTable;
    __publicField(Table, _a2, "Table");
    /** @internal */
    __publicField(Table, "Symbol", {
      Name: TableName,
      Schema,
      OriginalName,
      Columns,
      BaseName,
      IsAlias,
      ExtraConfigBuilder
    });
  }
});

// node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
function not(condition) {
  return sql`not ${condition}`;
}
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("inArray requires at least one value");
    }
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("notInArray requires at least one value");
    }
    return sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
  return sql`${value} is null`;
}
function isNotNull(value) {
  return sql`${value} is not null`;
}
function exists(subquery) {
  return sql`exists (${subquery})`;
}
function notExists(subquery) {
  return sql`not exists (${subquery})`;
}
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(
    max,
    column
  )}`;
}
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(
    min,
    column
  )} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
  return sql`${column} like ${value}`;
}
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}
var eq, ne, gt, gte, lt, lte;
var init_conditions = __esm({
  "node_modules/drizzle-orm/sql/expressions/conditions.js"() {
    init_column();
    init_entity();
    init_table();
    init_sql();
    eq = (left, right) => {
      return sql`${left} = ${bindIfParam(right, left)}`;
    };
    ne = (left, right) => {
      return sql`${left} <> ${bindIfParam(right, left)}`;
    };
    gt = (left, right) => {
      return sql`${left} > ${bindIfParam(right, left)}`;
    };
    gte = (left, right) => {
      return sql`${left} >= ${bindIfParam(right, left)}`;
    };
    lt = (left, right) => {
      return sql`${left} < ${bindIfParam(right, left)}`;
    };
    lte = (left, right) => {
      return sql`${left} <= ${bindIfParam(right, left)}`;
    };
  }
});

// node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}
var init_select = __esm({
  "node_modules/drizzle-orm/sql/expressions/select.js"() {
    init_sql();
  }
});

// node_modules/drizzle-orm/sql/expressions/index.js
var init_expressions = __esm({
  "node_modules/drizzle-orm/sql/expressions/index.js"() {
    init_conditions();
    init_select();
  }
});

// node_modules/drizzle-orm/relations.js
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
}
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc
  };
}
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[relation.referencedTable[Table.Symbol.Name]];
  if (!referencedTableTsName) {
    throw new Error(
      `Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[sourceTable[Table.Symbol.Name]];
  if (!sourceTableTsName) {
    throw new Error(
      `Table "${sourceTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(
    referencedTableConfig.relations
  )) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(
      `There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`
    ) : new Error(
      `There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`
    );
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(
    `There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`
  );
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(
        tablesConfig,
        tablesConfig[selectionItem.relationTableTsKey],
        subRows,
        selectionItem.selection,
        mapColumnValue
      ) : subRows.map(
        (subRow) => mapRelationalRow(
          tablesConfig,
          tablesConfig[selectionItem.relationTableTsKey],
          subRow,
          selectionItem.selection,
          mapColumnValue
        )
      );
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}
var _a3, Relation, _a4, Relations, _a5, _One, One, _a6, _Many, Many;
var init_relations = __esm({
  "node_modules/drizzle-orm/relations.js"() {
    init_table();
    init_column();
    init_entity();
    init_expressions();
    init_sql();
    Relation = class {
      constructor(sourceTable, referencedTable, relationName) {
        __publicField(this, "referencedTableName");
        __publicField(this, "fieldName");
        this.sourceTable = sourceTable;
        this.referencedTable = referencedTable;
        this.relationName = relationName;
        this.referencedTableName = referencedTable[Table.Symbol.Name];
      }
    };
    _a3 = entityKind;
    __publicField(Relation, _a3, "Relation");
    Relations = class {
      constructor(table, config) {
        this.table = table;
        this.config = config;
      }
    };
    _a4 = entityKind;
    __publicField(Relations, _a4, "Relations");
    _One = class _One extends Relation {
      constructor(sourceTable, referencedTable, config, isNullable) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
        this.isNullable = isNullable;
      }
      withFieldName(fieldName) {
        const relation = new _One(
          this.sourceTable,
          this.referencedTable,
          this.config,
          this.isNullable
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
    _a5 = entityKind;
    __publicField(_One, _a5, "One");
    One = _One;
    _Many = class _Many extends Relation {
      constructor(sourceTable, referencedTable, config) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
      }
      withFieldName(fieldName) {
        const relation = new _Many(
          this.sourceTable,
          this.referencedTable,
          this.config
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
    _a6 = entityKind;
    __publicField(_Many, _a6, "Many");
    Many = _Many;
  }
});

// node_modules/drizzle-orm/subquery.js
var SubqueryConfig, _a7, _b2, Subquery, _a8, WithSubquery;
var init_subquery = __esm({
  "node_modules/drizzle-orm/subquery.js"() {
    init_entity();
    SubqueryConfig = Symbol.for("drizzle:SubqueryConfig");
    Subquery = class {
      constructor(sql2, selection, alias, isWith = false) {
        /** @internal */
        __publicField(this, _b2);
        this[SubqueryConfig] = {
          sql: sql2,
          selection,
          alias,
          isWith
        };
      }
      // getSQL(): SQL<unknown> {
      // 	return new SQL([this]);
      // }
    };
    _a7 = entityKind, _b2 = SubqueryConfig;
    __publicField(Subquery, _a7, "Subquery");
    WithSubquery = class extends Subquery {
    };
    _a8 = entityKind;
    __publicField(WithSubquery, _a8, "WithSubquery");
  }
});

// node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}
var init_tracing_utils = __esm({
  "node_modules/drizzle-orm/tracing-utils.js"() {
  }
});

// node_modules/drizzle-orm/version.js
var version;
var init_version = __esm({
  "node_modules/drizzle-orm/version.js"() {
    version = "0.29.1";
  }
});

// node_modules/drizzle-orm/tracing.js
var otel, rawTracer, tracer;
var init_tracing = __esm({
  "node_modules/drizzle-orm/tracing.js"() {
    init_tracing_utils();
    init_version();
    tracer = {
      startActiveSpan(name, fn) {
        if (!otel) {
          return fn();
        }
        if (!rawTracer) {
          rawTracer = otel.trace.getTracer("drizzle-orm", version);
        }
        return iife(
          (otel2, rawTracer2) => rawTracer2.startActiveSpan(
            name,
            (span) => {
              try {
                return fn(span);
              } catch (e) {
                span.setStatus({
                  code: otel2.SpanStatusCode.ERROR,
                  message: e instanceof Error ? e.message : "Unknown error"
                  // eslint-disable-line no-instanceof/no-instanceof
                });
                throw e;
              } finally {
                span.end();
              }
            }
          ),
          otel,
          rawTracer
        );
      }
    };
  }
});

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig;
var init_view_common = __esm({
  "node_modules/drizzle-orm/view-common.js"() {
    ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");
  }
});

// node_modules/drizzle-orm/sql/sql.js
function isSQLWrapper(value) {
  return typeof value === "object" && value !== null && "getSQL" in value && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
var _a9, FakePrimitiveParam, _a10, StringChunk, _a11, _SQL, SQL, _a12, Name, noopDecoder, noopEncoder, noopMapper, _a13, Param, _a14, Placeholder, _a15, _b3, View;
var init_sql = __esm({
  "node_modules/drizzle-orm/sql/sql.js"() {
    init_entity();
    init_relations();
    init_subquery();
    init_tracing();
    init_view_common();
    init_column();
    init_table();
    FakePrimitiveParam = class {
    };
    _a9 = entityKind;
    __publicField(FakePrimitiveParam, _a9, "FakePrimitiveParam");
    StringChunk = class {
      constructor(value) {
        __publicField(this, "value");
        this.value = Array.isArray(value) ? value : [value];
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a10 = entityKind;
    __publicField(StringChunk, _a10, "StringChunk");
    _SQL = class _SQL {
      constructor(queryChunks) {
        /** @internal */
        __publicField(this, "decoder", noopDecoder);
        __publicField(this, "shouldInlineParams", false);
        this.queryChunks = queryChunks;
      }
      append(query) {
        this.queryChunks.push(...query.queryChunks);
        return this;
      }
      toQuery(config) {
        return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
          const query = this.buildQueryFromSourceParams(this.queryChunks, config);
          span?.setAttributes({
            "drizzle.query.text": query.sql,
            "drizzle.query.params": JSON.stringify(query.params)
          });
          return query;
        });
      }
      buildQueryFromSourceParams(chunks, _config) {
        const config = Object.assign({}, _config, {
          inlineParams: _config.inlineParams || this.shouldInlineParams,
          paramStartIndex: _config.paramStartIndex || { value: 0 }
        });
        const {
          escapeName,
          escapeParam,
          prepareTyping,
          inlineParams,
          paramStartIndex
        } = config;
        return mergeQueries(chunks.map((chunk) => {
          if (is(chunk, StringChunk)) {
            return { sql: chunk.value.join(""), params: [] };
          }
          if (is(chunk, Name)) {
            return { sql: escapeName(chunk.value), params: [] };
          }
          if (chunk === void 0) {
            return { sql: "", params: [] };
          }
          if (Array.isArray(chunk)) {
            const result = [new StringChunk("(")];
            for (const [i, p] of chunk.entries()) {
              result.push(p);
              if (i < chunk.length - 1) {
                result.push(new StringChunk(", "));
              }
            }
            result.push(new StringChunk(")"));
            return this.buildQueryFromSourceParams(result, config);
          }
          if (is(chunk, _SQL)) {
            return this.buildQueryFromSourceParams(chunk.queryChunks, {
              ...config,
              inlineParams: inlineParams || chunk.shouldInlineParams
            });
          }
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            const tableName = chunk[Table.Symbol.Name];
            return {
              sql: schemaName === void 0 ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
              params: []
            };
          }
          if (is(chunk, Column)) {
            return { sql: escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(chunk.name), params: [] };
          }
          if (is(chunk, View)) {
            const schemaName = chunk[ViewBaseConfig].schema;
            const viewName = chunk[ViewBaseConfig].name;
            return {
              sql: schemaName === void 0 ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
              params: []
            };
          }
          if (is(chunk, Param)) {
            const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
            if (is(mappedValue, _SQL)) {
              return this.buildQueryFromSourceParams([mappedValue], config);
            }
            if (inlineParams) {
              return { sql: this.mapInlineParam(mappedValue, config), params: [] };
            }
            let typings;
            if (prepareTyping !== void 0) {
              typings = [prepareTyping(chunk.encoder)];
            }
            return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
          }
          if (is(chunk, Placeholder)) {
            return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
          }
          if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
            return { sql: escapeName(chunk.fieldAlias), params: [] };
          }
          if (is(chunk, Subquery)) {
            if (chunk[SubqueryConfig].isWith) {
              return { sql: escapeName(chunk[SubqueryConfig].alias), params: [] };
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk[SubqueryConfig].sql,
              new StringChunk(") "),
              new Name(chunk[SubqueryConfig].alias)
            ], config);
          }
          if (isSQLWrapper(chunk)) {
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk.getSQL(),
              new StringChunk(")")
            ], config);
          }
          if (is(chunk, Relation)) {
            return this.buildQueryFromSourceParams([
              chunk.sourceTable,
              new StringChunk("."),
              sql.identifier(chunk.fieldName)
            ], config);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(chunk, config), params: [] };
          }
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
        }));
      }
      mapInlineParam(chunk, { escapeString }) {
        if (chunk === null) {
          return "null";
        }
        if (typeof chunk === "number" || typeof chunk === "boolean") {
          return chunk.toString();
        }
        if (typeof chunk === "string") {
          return escapeString(chunk);
        }
        if (typeof chunk === "object") {
          const mappedValueAsString = chunk.toString();
          if (mappedValueAsString === "[object Object]") {
            return escapeString(JSON.stringify(chunk));
          }
          return escapeString(mappedValueAsString);
        }
        throw new Error("Unexpected param value: " + chunk);
      }
      getSQL() {
        return this;
      }
      as(alias) {
        if (alias === void 0) {
          return this;
        }
        return new _SQL.Aliased(this, alias);
      }
      mapWith(decoder) {
        this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
        return this;
      }
      inlineParams() {
        this.shouldInlineParams = true;
        return this;
      }
    };
    _a11 = entityKind;
    __publicField(_SQL, _a11, "SQL");
    SQL = _SQL;
    Name = class {
      constructor(value) {
        __publicField(this, "brand");
        this.value = value;
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a12 = entityKind;
    __publicField(Name, _a12, "Name");
    noopDecoder = {
      mapFromDriverValue: (value) => value
    };
    noopEncoder = {
      mapToDriverValue: (value) => value
    };
    noopMapper = {
      ...noopDecoder,
      ...noopEncoder
    };
    Param = class {
      /**
       * @param value - Parameter value
       * @param encoder - Encoder to convert the value to a driver parameter
       */
      constructor(value, encoder3 = noopEncoder) {
        __publicField(this, "brand");
        this.value = value;
        this.encoder = encoder3;
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a13 = entityKind;
    __publicField(Param, _a13, "Param");
    ((sql2) => {
      function empty() {
        return new SQL([]);
      }
      sql2.empty = empty;
      function fromList(list) {
        return new SQL(list);
      }
      sql2.fromList = fromList;
      function raw(str) {
        return new SQL([new StringChunk(str)]);
      }
      sql2.raw = raw;
      function join(chunks, separator) {
        const result = [];
        for (const [i, chunk] of chunks.entries()) {
          if (i > 0 && separator !== void 0) {
            result.push(separator);
          }
          result.push(chunk);
        }
        return new SQL(result);
      }
      sql2.join = join;
      function identifier(value) {
        return new Name(value);
      }
      sql2.identifier = identifier;
      function placeholder2(name2) {
        return new Placeholder(name2);
      }
      sql2.placeholder = placeholder2;
      function param2(value, encoder3) {
        return new Param(value, encoder3);
      }
      sql2.param = param2;
    })(sql || (sql = {}));
    ((SQL2) => {
      var _a93;
      const _Aliased = class _Aliased {
        constructor(sql2, fieldAlias) {
          /** @internal */
          __publicField(this, "isSelectionField", false);
          this.sql = sql2;
          this.fieldAlias = fieldAlias;
        }
        getSQL() {
          return this.sql;
        }
        /** @internal */
        clone() {
          return new _Aliased(this.sql, this.fieldAlias);
        }
      };
      _a93 = entityKind;
      __publicField(_Aliased, _a93, "SQL.Aliased");
      let Aliased = _Aliased;
      SQL2.Aliased = Aliased;
    })(SQL || (SQL = {}));
    Placeholder = class {
      constructor(name2) {
        this.name = name2;
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a14 = entityKind;
    __publicField(Placeholder, _a14, "Placeholder");
    View = class {
      constructor({ name: name2, schema, selectedFields, query }) {
        /** @internal */
        __publicField(this, _b3);
        this[ViewBaseConfig] = {
          name: name2,
          originalName: name2,
          schema,
          selectedFields,
          query,
          isExisting: !query,
          isAlias: false
        };
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    _a15 = entityKind, _b3 = ViewBaseConfig;
    __publicField(View, _a15, "View");
    Column.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Table.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Subquery.prototype.getSQL = function() {
      return new SQL([this]);
    };
  }
});

// node_modules/drizzle-orm/alias.js
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(
    column,
    new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false)))
  );
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(query.queryChunks.map((c) => {
    if (is(c, Column)) {
      return aliasedTableColumn(c, alias);
    }
    if (is(c, SQL)) {
      return mapColumnsInSQLToAlias(c, alias);
    }
    if (is(c, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c, alias);
    }
    return c;
  }));
}
var _a16, ColumnAliasProxyHandler, _a17, TableAliasProxyHandler, _a18, RelationTableAliasProxyHandler;
var init_alias = __esm({
  "node_modules/drizzle-orm/alias.js"() {
    init_column();
    init_entity();
    init_sql();
    init_table();
    init_view_common();
    ColumnAliasProxyHandler = class {
      constructor(table) {
        this.table = table;
      }
      get(columnObj, prop) {
        if (prop === "table") {
          return this.table;
        }
        return columnObj[prop];
      }
    };
    _a16 = entityKind;
    __publicField(ColumnAliasProxyHandler, _a16, "ColumnAliasProxyHandler");
    TableAliasProxyHandler = class {
      constructor(alias, replaceOriginalName) {
        this.alias = alias;
        this.replaceOriginalName = replaceOriginalName;
      }
      get(target, prop) {
        if (prop === Table.Symbol.IsAlias) {
          return true;
        }
        if (prop === Table.Symbol.Name) {
          return this.alias;
        }
        if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
          return this.alias;
        }
        if (prop === ViewBaseConfig) {
          return {
            ...target[ViewBaseConfig],
            name: this.alias,
            isAlias: true
          };
        }
        if (prop === Table.Symbol.Columns) {
          const columns = target[Table.Symbol.Columns];
          if (!columns) {
            return columns;
          }
          const proxiedColumns = {};
          Object.keys(columns).map((key2) => {
            proxiedColumns[key2] = new Proxy(
              columns[key2],
              new ColumnAliasProxyHandler(new Proxy(target, this))
            );
          });
          return proxiedColumns;
        }
        const value = target[prop];
        if (is(value, Column)) {
          return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
        }
        return value;
      }
    };
    _a17 = entityKind;
    __publicField(TableAliasProxyHandler, _a17, "TableAliasProxyHandler");
    RelationTableAliasProxyHandler = class {
      constructor(alias) {
        this.alias = alias;
      }
      get(target, prop) {
        if (prop === "sourceTable") {
          return aliasedTable(target.sourceTable, this.alias);
        }
        return target[prop];
      }
    };
    _a18 = entityKind;
    __publicField(RelationTableAliasProxyHandler, _a18, "RelationTableAliasProxyHandler");
  }
});

// node_modules/drizzle-orm/sqlite-core/alias.js
var init_alias2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/alias.js"() {
  }
});

// node_modules/drizzle-orm/sqlite-core/checks.js
var _a19, CheckBuilder, _a20, Check;
var init_checks = __esm({
  "node_modules/drizzle-orm/sqlite-core/checks.js"() {
    init_entity();
    CheckBuilder = class {
      constructor(name, value) {
        __publicField(this, "brand");
        this.name = name;
        this.value = value;
      }
      build(table) {
        return new Check(table, this);
      }
    };
    _a19 = entityKind;
    __publicField(CheckBuilder, _a19, "SQLiteCheckBuilder");
    Check = class {
      constructor(table, builder) {
        __publicField(this, "name");
        __publicField(this, "value");
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
    };
    _a20 = entityKind;
    __publicField(Check, _a20, "SQLiteCheck");
  }
});

// node_modules/drizzle-orm/column-builder.js
var _a21, ColumnBuilder;
var init_column_builder = __esm({
  "node_modules/drizzle-orm/column-builder.js"() {
    init_entity();
    ColumnBuilder = class {
      constructor(name, dataType, columnType) {
        __publicField(this, "config");
        /**
         * Alias for {@link $defaultFn}.
         */
        __publicField(this, "$default", this.$defaultFn);
        this.config = {
          name,
          notNull: false,
          default: void 0,
          hasDefault: false,
          primaryKey: false,
          isUnique: false,
          uniqueName: void 0,
          uniqueType: void 0,
          dataType,
          columnType
        };
      }
      /**
       * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
       *
       * @example
       * ```ts
       * const users = pgTable('users', {
       * 	id: integer('id').$type<UserId>().primaryKey(),
       * 	details: json('details').$type<UserDetails>().notNull(),
       * });
       * ```
       */
      $type() {
        return this;
      }
      /**
       * Adds a `not null` clause to the column definition.
       *
       * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
       */
      notNull() {
        this.config.notNull = true;
        return this;
      }
      /**
       * Adds a `default <value>` clause to the column definition.
       *
       * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
       *
       * If you need to set a dynamic default value, use {@link $defaultFn} instead.
       */
      default(value) {
        this.config.default = value;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a dynamic default value to the column.
       * The function will be called when the row is inserted, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $defaultFn(fn) {
        this.config.defaultFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
       *
       * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
       */
      primaryKey() {
        this.config.primaryKey = true;
        this.config.notNull = true;
        return this;
      }
    };
    _a21 = entityKind;
    __publicField(ColumnBuilder, _a21, "ColumnBuilder");
  }
});

// node_modules/drizzle-orm/sqlite-core/table.js
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const builtColumns = Object.fromEntries(
    Object.entries(columns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  if (extraConfig) {
    table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
var InlineForeignKeys, _a22, _b4, _c2, _d2, SQLiteTable, sqliteTable;
var init_table2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/table.js"() {
    init_entity();
    init_table();
    InlineForeignKeys = Symbol.for("drizzle:SQLiteInlineForeignKeys");
    SQLiteTable = class extends Table {
      constructor() {
        super(...arguments);
        /** @internal */
        __publicField(this, _b4);
        /** @internal */
        __publicField(this, _c2, []);
        /** @internal */
        __publicField(this, _d2);
      }
    };
    _a22 = entityKind, _b4 = Table.Symbol.Columns, _c2 = InlineForeignKeys, _d2 = Table.Symbol.ExtraConfigBuilder;
    __publicField(SQLiteTable, _a22, "SQLiteTable");
    /** @internal */
    __publicField(SQLiteTable, "Symbol", Object.assign({}, Table.Symbol, {
      InlineForeignKeys
    }));
    sqliteTable = (name, columns, extraConfig) => {
      return sqliteTableBase(name, columns, extraConfig);
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/foreign-keys.js
var _a23, ForeignKeyBuilder, _a24, ForeignKey;
var init_foreign_keys = __esm({
  "node_modules/drizzle-orm/sqlite-core/foreign-keys.js"() {
    init_entity();
    init_table2();
    ForeignKeyBuilder = class {
      constructor(config, actions6) {
        /** @internal */
        __publicField(this, "reference");
        /** @internal */
        __publicField(this, "_onUpdate");
        /** @internal */
        __publicField(this, "_onDelete");
        this.reference = () => {
          const { name, columns, foreignColumns } = config();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions6) {
          this._onUpdate = actions6.onUpdate;
          this._onDelete = actions6.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey(table, this);
      }
    };
    _a23 = entityKind;
    __publicField(ForeignKeyBuilder, _a23, "SQLiteForeignKeyBuilder");
    ForeignKey = class {
      constructor(table, builder) {
        __publicField(this, "reference");
        __publicField(this, "onUpdate");
        __publicField(this, "onDelete");
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[SQLiteTable.Symbol.Name],
          ...columnNames,
          foreignColumns[0].table[SQLiteTable.Symbol.Name],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    };
    _a24 = entityKind;
    __publicField(ForeignKey, _a24, "SQLiteForeignKey");
  }
});

// node_modules/drizzle-orm/sqlite-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[SQLiteTable.Symbol.Name]}_${columns.join("_")}_unique`;
}
var _a25, UniqueConstraintBuilder, _a26, UniqueOnConstraintBuilder, _a27, UniqueConstraint;
var init_unique_constraint = __esm({
  "node_modules/drizzle-orm/sqlite-core/unique-constraint.js"() {
    init_entity();
    init_table2();
    UniqueConstraintBuilder = class {
      constructor(columns, name) {
        /** @internal */
        __publicField(this, "columns");
        this.name = name;
        this.columns = columns;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint(table, this.columns, this.name);
      }
    };
    _a25 = entityKind;
    __publicField(UniqueConstraintBuilder, _a25, "SQLiteUniqueConstraintBuilder");
    UniqueOnConstraintBuilder = class {
      constructor(name) {
        /** @internal */
        __publicField(this, "name");
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder(columns, this.name);
      }
    };
    _a26 = entityKind;
    __publicField(UniqueOnConstraintBuilder, _a26, "SQLiteUniqueOnConstraintBuilder");
    UniqueConstraint = class {
      constructor(table, columns, name) {
        __publicField(this, "columns");
        __publicField(this, "name");
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
      }
      getName() {
        return this.name;
      }
    };
    _a27 = entityKind;
    __publicField(UniqueConstraint, _a27, "SQLiteUniqueConstraint");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/common.js
var _a28, SQLiteColumnBuilder, _a29, SQLiteColumn;
var init_common = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/common.js"() {
    init_column_builder();
    init_column();
    init_entity();
    init_foreign_keys();
    init_unique_constraint();
    SQLiteColumnBuilder = class extends ColumnBuilder {
      constructor() {
        super(...arguments);
        __publicField(this, "foreignKeyConfigs", []);
      }
      references(ref, actions6 = {}) {
        this.foreignKeyConfigs.push({ ref, actions: actions6 });
        return this;
      }
      unique(name) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions: actions6 }) => {
          return ((ref2, actions22) => {
            const builder = new ForeignKeyBuilder(() => {
              const foreignColumn = ref2();
              return { columns: [column], foreignColumns: [foreignColumn] };
            });
            if (actions22.onUpdate) {
              builder.onUpdate(actions22.onUpdate);
            }
            if (actions22.onDelete) {
              builder.onDelete(actions22.onDelete);
            }
            return builder.build(table);
          })(ref, actions6);
        });
      }
    };
    _a28 = entityKind;
    __publicField(SQLiteColumnBuilder, _a28, "SQLiteColumnBuilder");
    SQLiteColumn = class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName(table, [config.name]);
        }
        super(table, config);
        this.table = table;
      }
    };
    _a29 = entityKind;
    __publicField(SQLiteColumn, _a29, "SQLiteColumn");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/blob.js
var _a30, SQLiteBigIntBuilder, _a31, SQLiteBigInt, _a32, SQLiteBlobJsonBuilder, _a33, SQLiteBlobJson, _a34, SQLiteBlobBufferBuilder, _a35, SQLiteBlobBuffer;
var init_blob = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/blob.js"() {
    init_entity();
    init_common();
    SQLiteBigIntBuilder = class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "bigint", "SQLiteBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteBigInt(table, this.config);
      }
    };
    _a30 = entityKind;
    __publicField(SQLiteBigIntBuilder, _a30, "SQLiteBigIntBuilder");
    SQLiteBigInt = class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        return BigInt(value.toString());
      }
      mapToDriverValue(value) {
        return Buffer.from(value.toString());
      }
    };
    _a31 = entityKind;
    __publicField(SQLiteBigInt, _a31, "SQLiteBigInt");
    SQLiteBlobJsonBuilder = class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "json", "SQLiteBlobJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobJson(
          table,
          this.config
        );
      }
    };
    _a32 = entityKind;
    __publicField(SQLiteBlobJsonBuilder, _a32, "SQLiteBlobJsonBuilder");
    SQLiteBlobJson = class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        return JSON.parse(value.toString());
      }
      mapToDriverValue(value) {
        return Buffer.from(JSON.stringify(value));
      }
    };
    _a33 = entityKind;
    __publicField(SQLiteBlobJson, _a33, "SQLiteBlobJson");
    SQLiteBlobBufferBuilder = class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "buffer", "SQLiteBlobBuffer");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobBuffer(table, this.config);
      }
    };
    _a34 = entityKind;
    __publicField(SQLiteBlobBufferBuilder, _a34, "SQLiteBlobBufferBuilder");
    SQLiteBlobBuffer = class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
    };
    _a35 = entityKind;
    __publicField(SQLiteBlobBuffer, _a35, "SQLiteBlobBuffer");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/custom.js
var _a36, SQLiteCustomColumnBuilder, _a37, SQLiteCustomColumn;
var init_custom = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/custom.js"() {
    init_entity();
    init_common();
    SQLiteCustomColumnBuilder = class extends SQLiteColumnBuilder {
      constructor(name, fieldConfig, customTypeParams) {
        super(name, "custom", "SQLiteCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new SQLiteCustomColumn(
          table,
          this.config
        );
      }
    };
    _a36 = entityKind;
    __publicField(SQLiteCustomColumnBuilder, _a36, "SQLiteCustomColumnBuilder");
    SQLiteCustomColumn = class extends SQLiteColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "sqlName");
        __publicField(this, "mapTo");
        __publicField(this, "mapFrom");
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
    _a37 = entityKind;
    __publicField(SQLiteCustomColumn, _a37, "SQLiteCustomColumn");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/integer.js
function integer(name, config) {
  if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if (config?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
}
var _a38, SQLiteBaseIntegerBuilder, _a39, SQLiteBaseInteger, _a40, SQLiteIntegerBuilder, _a41, SQLiteInteger, _a42, SQLiteTimestampBuilder, _a43, SQLiteTimestamp, _a44, SQLiteBooleanBuilder, _a45, SQLiteBoolean;
var init_integer = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/integer.js"() {
    init_entity();
    init_sql();
    init_common();
    SQLiteBaseIntegerBuilder = class extends SQLiteColumnBuilder {
      constructor(name, dataType, columnType) {
        super(name, dataType, columnType);
        this.config.autoIncrement = false;
      }
      primaryKey(config) {
        if (config?.autoIncrement) {
          this.config.autoIncrement = true;
        }
        this.config.hasDefault = true;
        return super.primaryKey();
      }
    };
    _a38 = entityKind;
    __publicField(SQLiteBaseIntegerBuilder, _a38, "SQLiteBaseIntegerBuilder");
    SQLiteBaseInteger = class extends SQLiteColumn {
      constructor() {
        super(...arguments);
        __publicField(this, "autoIncrement", this.config.autoIncrement);
      }
      getSQLType() {
        return "integer";
      }
    };
    _a39 = entityKind;
    __publicField(SQLiteBaseInteger, _a39, "SQLiteBaseInteger");
    SQLiteIntegerBuilder = class extends SQLiteBaseIntegerBuilder {
      constructor(name) {
        super(name, "number", "SQLiteInteger");
      }
      build(table) {
        return new SQLiteInteger(
          table,
          this.config
        );
      }
    };
    _a40 = entityKind;
    __publicField(SQLiteIntegerBuilder, _a40, "SQLiteIntegerBuilder");
    SQLiteInteger = class extends SQLiteBaseInteger {
    };
    _a41 = entityKind;
    __publicField(SQLiteInteger, _a41, "SQLiteInteger");
    SQLiteTimestampBuilder = class extends SQLiteBaseIntegerBuilder {
      constructor(name, mode) {
        super(name, "date", "SQLiteTimestamp");
        this.config.mode = mode;
      }
      /**
       * @deprecated Use `default()` with your own expression instead.
       *
       * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
       */
      defaultNow() {
        return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
      }
      build(table) {
        return new SQLiteTimestamp(
          table,
          this.config
        );
      }
    };
    _a42 = entityKind;
    __publicField(SQLiteTimestampBuilder, _a42, "SQLiteTimestampBuilder");
    SQLiteTimestamp = class extends SQLiteBaseInteger {
      constructor() {
        super(...arguments);
        __publicField(this, "mode", this.config.mode);
      }
      mapFromDriverValue(value) {
        if (this.config.mode === "timestamp") {
          return new Date(value * 1e3);
        }
        return new Date(value);
      }
      mapToDriverValue(value) {
        const unix = value.getTime();
        if (this.config.mode === "timestamp") {
          return Math.floor(unix / 1e3);
        }
        return unix;
      }
    };
    _a43 = entityKind;
    __publicField(SQLiteTimestamp, _a43, "SQLiteTimestamp");
    SQLiteBooleanBuilder = class extends SQLiteBaseIntegerBuilder {
      constructor(name, mode) {
        super(name, "boolean", "SQLiteBoolean");
        this.config.mode = mode;
      }
      build(table) {
        return new SQLiteBoolean(
          table,
          this.config
        );
      }
    };
    _a44 = entityKind;
    __publicField(SQLiteBooleanBuilder, _a44, "SQLiteBooleanBuilder");
    SQLiteBoolean = class extends SQLiteBaseInteger {
      constructor() {
        super(...arguments);
        __publicField(this, "mode", this.config.mode);
      }
      mapFromDriverValue(value) {
        return Number(value) === 1;
      }
      mapToDriverValue(value) {
        return value ? 1 : 0;
      }
    };
    _a45 = entityKind;
    __publicField(SQLiteBoolean, _a45, "SQLiteBoolean");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/numeric.js
var _a46, SQLiteNumericBuilder, _a47, SQLiteNumeric;
var init_numeric = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/numeric.js"() {
    init_entity();
    init_common();
    SQLiteNumericBuilder = class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "string", "SQLiteNumeric");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumeric(
          table,
          this.config
        );
      }
    };
    _a46 = entityKind;
    __publicField(SQLiteNumericBuilder, _a46, "SQLiteNumericBuilder");
    SQLiteNumeric = class extends SQLiteColumn {
      getSQLType() {
        return "numeric";
      }
    };
    _a47 = entityKind;
    __publicField(SQLiteNumeric, _a47, "SQLiteNumeric");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/real.js
var _a48, SQLiteRealBuilder, _a49, SQLiteReal;
var init_real = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/real.js"() {
    init_entity();
    init_common();
    SQLiteRealBuilder = class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "number", "SQLiteReal");
      }
      /** @internal */
      build(table) {
        return new SQLiteReal(table, this.config);
      }
    };
    _a48 = entityKind;
    __publicField(SQLiteRealBuilder, _a48, "SQLiteRealBuilder");
    SQLiteReal = class extends SQLiteColumn {
      getSQLType() {
        return "real";
      }
    };
    _a49 = entityKind;
    __publicField(SQLiteReal, _a49, "SQLiteReal");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/text.js
function text2(name, config = {}) {
  return config.mode === "json" ? new SQLiteTextJsonBuilder(name) : new SQLiteTextBuilder(name, config);
}
var _a50, SQLiteTextBuilder, _a51, SQLiteText, _a52, SQLiteTextJsonBuilder, _a53, SQLiteTextJson;
var init_text = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/text.js"() {
    init_entity();
    init_common();
    SQLiteTextBuilder = class extends SQLiteColumnBuilder {
      constructor(name, config) {
        super(name, "string", "SQLiteText");
        this.config.enumValues = config.enum;
        this.config.length = config.length;
      }
      /** @internal */
      build(table) {
        return new SQLiteText(table, this.config);
      }
    };
    _a50 = entityKind;
    __publicField(SQLiteTextBuilder, _a50, "SQLiteTextBuilder");
    SQLiteText = class extends SQLiteColumn {
      constructor(table, config) {
        super(table, config);
        __publicField(this, "enumValues", this.config.enumValues);
        __publicField(this, "length", this.config.length);
      }
      getSQLType() {
        return `text${this.config.length ? `(${this.config.length})` : ""}`;
      }
    };
    _a51 = entityKind;
    __publicField(SQLiteText, _a51, "SQLiteText");
    SQLiteTextJsonBuilder = class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "json", "SQLiteTextJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteTextJson(
          table,
          this.config
        );
      }
    };
    _a52 = entityKind;
    __publicField(SQLiteTextJsonBuilder, _a52, "SQLiteTextJsonBuilder");
    SQLiteTextJson = class extends SQLiteColumn {
      getSQLType() {
        return "text";
      }
      mapFromDriverValue(value) {
        return JSON.parse(value);
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
    };
    _a53 = entityKind;
    __publicField(SQLiteTextJson, _a53, "SQLiteTextJson");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/index.js
var init_columns = __esm({
  "node_modules/drizzle-orm/sqlite-core/columns/index.js"() {
    init_blob();
    init_common();
    init_custom();
    init_integer();
    init_numeric();
    init_real();
    init_text();
  }
});

// node_modules/drizzle-orm/selection-proxy.js
var _a54, _SelectionProxyHandler, SelectionProxyHandler;
var init_selection_proxy = __esm({
  "node_modules/drizzle-orm/selection-proxy.js"() {
    init_alias();
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_view_common();
    _SelectionProxyHandler = class _SelectionProxyHandler {
      constructor(config) {
        __publicField(this, "config");
        this.config = { ...config };
      }
      get(subquery, prop) {
        if (prop === SubqueryConfig) {
          return {
            ...subquery[SubqueryConfig],
            selection: new Proxy(
              subquery[SubqueryConfig].selection,
              this
            )
          };
        }
        if (prop === ViewBaseConfig) {
          return {
            ...subquery[ViewBaseConfig],
            selectedFields: new Proxy(
              subquery[ViewBaseConfig].selectedFields,
              this
            )
          };
        }
        if (typeof prop === "symbol") {
          return subquery[prop];
        }
        const columns = is(subquery, Subquery) ? subquery[SubqueryConfig].selection : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery;
        const value = columns[prop];
        if (is(value, SQL.Aliased)) {
          if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
            return value.sql;
          }
          const newValue = value.clone();
          newValue.isSelectionField = true;
          return newValue;
        }
        if (is(value, SQL)) {
          if (this.config.sqlBehavior === "sql") {
            return value;
          }
          throw new Error(
            `You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
          );
        }
        if (is(value, Column)) {
          if (this.config.alias) {
            return new Proxy(
              value,
              new ColumnAliasProxyHandler(
                new Proxy(
                  value.table,
                  new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false)
                )
              )
            );
          }
          return value;
        }
        if (typeof value !== "object" || value === null) {
          return value;
        }
        return new Proxy(value, new _SelectionProxyHandler(this.config));
      }
    };
    _a54 = entityKind;
    __publicField(_SelectionProxyHandler, _a54, "SelectionProxyHandler");
    SelectionProxyHandler = _SelectionProxyHandler;
  }
});

// node_modules/drizzle-orm/query-promise.js
var _a55, _b5, QueryPromise;
var init_query_promise = __esm({
  "node_modules/drizzle-orm/query-promise.js"() {
    init_entity();
    QueryPromise = class {
      constructor() {
        __publicField(this, _b5, "QueryPromise");
      }
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
      then(onFulfilled, onRejected) {
        return this.execute().then(onFulfilled, onRejected);
      }
    };
    _a55 = entityKind, _b5 = Symbol.toStringTag;
    __publicField(QueryPromise, _a55, "QueryPromise");
  }
});

// node_modules/drizzle-orm/utils.js
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index28, key2] of leftKeys.entries()) {
    if (key2 !== rightKeys[index28]) {
      return false;
    }
  }
  return true;
}
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key2, value]) => {
    if (is(value, SQL)) {
      return [key2, value];
    } else {
      return [key2, new Param(value, table[Table.Symbol.Columns][key2])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      Object.defineProperty(
        baseClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null)
      );
    }
  }
}
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
  return is(table, Subquery) ? table[SubqueryConfig].alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
var init_utils2 = __esm({
  "node_modules/drizzle-orm/utils.js"() {
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_table();
    init_view_common();
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/delete.js
var _a56, SQLiteDeleteBase;
var init_delete = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/delete.js"() {
    init_entity();
    init_query_promise();
    init_table2();
    init_utils2();
    SQLiteDeleteBase = class extends QueryPromise {
      constructor(table, session, dialect) {
        super();
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.config = { table };
      }
      /** 
       * Adds a `where` clause to the query.
       * 
       * Calling this method will delete only those rows that fulfill a specified condition.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       * 
       * @param where the `where` clause.
       * 
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be deleted.
       * 
       * ```ts
       * // Delete all cars with green color
       * db.delete(cars).where(eq(cars.color, 'green'));
       * // or
       * db.delete(cars).where(sql`${cars.color} = 'green'`)
       * ```
       * 
       * You can logically combine conditional operators with `and()` and `or()` operators:
       * 
       * ```ts
       * // Delete all BMW cars with a green color
       * db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       * 
       * // Delete all cars with the green or blue color
       * db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
      */
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare(isOneTimeQuery) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run"
        );
      }
      async execute(placeholderValues) {
        return this.prepare(true).execute(placeholderValues);
      }
      $dynamic() {
        return this;
      }
    };
    _a56 = entityKind;
    __publicField(SQLiteDeleteBase, _a56, "SQLiteDelete");
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/insert.js
var _a57, SQLiteInsertBuilder, _a58, SQLiteInsertBase;
var init_insert = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/insert.js"() {
    init_entity();
    init_query_promise();
    init_sql();
    init_table2();
    init_table();
    init_utils2();
    SQLiteInsertBuilder = class {
      constructor(table, session, dialect) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect);
      }
    };
    _a57 = entityKind;
    __publicField(SQLiteInsertBuilder, _a57, "SQLiteInsertBuilder");
    SQLiteInsertBase = class extends QueryPromise {
      constructor(table, values, session, dialect) {
        super();
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values };
      }
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /**
       * Adds an `on conflict do nothing` clause to the query.
       * 
       * Calling this method simply avoids inserting a row as its alternative action.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
       * 
       * @param config The `target` and `where` clauses.
       * 
       * @example
       * ```ts
       * // Insert one row and cancel the insert if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing();
       * 
       * // Explicitly specify conflict target
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing({ target: cars.id });
       * ```
       */
      onConflictDoNothing(config = {}) {
        if (config.target === void 0) {
          this.config.onConflict = sql`do nothing`;
        } else {
          const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
          const whereSql = config.where ? sql` where ${config.where}` : sql``;
          this.config.onConflict = sql`${targetSql} do nothing${whereSql}`;
        }
        return this;
      }
      /**
       * Adds an `on conflict do update` clause to the query.
       * 
       * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts} 
       * 
       * @param config The `target`, `set` and `where` clauses.
       * 
       * @example
       * ```ts
       * // Update the row if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({ 
       *     target: cars.id, 
       *     set: { brand: 'Porsche' } 
       *   });
       * 
       * // Upsert with 'where' clause
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'newBMW' },
       *     where: sql`${cars.createdAt} > '2023-01-01'::date`,
       *   });
       * ```
       */
      onConflictDoUpdate(config) {
        const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
        const whereSql = config.where ? sql` where ${config.where}` : sql``;
        const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
        this.config.onConflict = sql`${targetSql} do update set ${setSql}${whereSql}`;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare(isOneTimeQuery) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run"
        );
      }
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    };
    _a58 = entityKind;
    __publicField(SQLiteInsertBase, _a58, "SQLiteInsert");
  }
});

// node_modules/drizzle-orm/errors.js
var _a59, DrizzleError, _a60, TransactionRollbackError;
var init_errors = __esm({
  "node_modules/drizzle-orm/errors.js"() {
    init_entity();
    DrizzleError = class extends Error {
      constructor({ message, cause }) {
        super(message);
        this.name = "DrizzleError";
        this.cause = cause;
      }
    };
    _a59 = entityKind;
    __publicField(DrizzleError, _a59, "DrizzleError");
    TransactionRollbackError = class extends DrizzleError {
      constructor() {
        super({ message: "Rollback" });
      }
    };
    _a60 = entityKind;
    __publicField(TransactionRollbackError, _a60, "TransactionRollbackError");
  }
});

// node_modules/drizzle-orm/sql/functions/aggregate.js
var init_aggregate = __esm({
  "node_modules/drizzle-orm/sql/functions/aggregate.js"() {
  }
});

// node_modules/drizzle-orm/sql/functions/index.js
var init_functions = __esm({
  "node_modules/drizzle-orm/sql/functions/index.js"() {
    init_aggregate();
  }
});

// node_modules/drizzle-orm/sql/index.js
var init_sql2 = __esm({
  "node_modules/drizzle-orm/sql/index.js"() {
    init_expressions();
    init_sql();
    init_functions();
  }
});

// node_modules/drizzle-orm/sqlite-core/view-base.js
var _a61, SQLiteViewBase;
var init_view_base = __esm({
  "node_modules/drizzle-orm/sqlite-core/view-base.js"() {
    init_entity();
    init_sql();
    SQLiteViewBase = class extends View {
    };
    _a61 = entityKind;
    __publicField(SQLiteViewBase, _a61, "SQLiteViewBase");
  }
});

// node_modules/drizzle-orm/sqlite-core/dialect.js
var _a62, SQLiteDialect, _a63, SQLiteSyncDialect, _a64, SQLiteAsyncDialect;
var init_dialect = __esm({
  "node_modules/drizzle-orm/sqlite-core/dialect.js"() {
    init_alias();
    init_column();
    init_entity();
    init_errors();
    init_relations();
    init_sql();
    init_sql2();
    init_columns();
    init_table2();
    init_subquery();
    init_table();
    init_utils2();
    init_view_common();
    init_view_base();
    SQLiteDialect = class {
      escapeName(name) {
        return `"${name}"`;
      }
      escapeParam(_num) {
        return "?";
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildDeleteQuery({ table, where, returning }) {
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        return sql`delete from ${table}${whereSql}${returningSql}`;
      }
      buildUpdateSet(table, set) {
        const setEntries = Object.entries(set);
        const setSize = setEntries.length;
        return sql.join(
          setEntries.flatMap(([colName, value], i) => {
            const col = table[Table.Symbol.Columns][colName];
            const res = sql`${sql.identifier(col.name)} = ${value}`;
            if (i < setSize - 1) {
              return [res, sql.raw(", ")];
            }
            return [res];
          })
        );
      }
      buildUpdateQuery({ table, set, where, returning }) {
        const setSql = this.buildUpdateSet(table, set);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        return sql`update ${table} set ${setSql}${whereSql}${returningSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if (is(field, SQL.Aliased) && field.isSelectionField) {
            chunk.push(sql.identifier(field.fieldAlias));
          } else if (is(field, SQL.Aliased) || is(field, SQL)) {
            const query = is(field, SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(
                new SQL(
                  query.queryChunks.map((c) => {
                    if (is(c, Column)) {
                      return sql.identifier(c.name);
                    }
                    return c;
                  })
                )
              );
            } else {
              chunk.push(query);
            }
            if (is(field, SQL.Aliased)) {
              chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
            }
          } else if (is(field, Column)) {
            const tableName = field.table[Table.Symbol.Name];
            const columnName = field.name;
            if (isSingleTable) {
              chunk.push(sql.identifier(columnName));
            } else {
              chunk.push(sql`${sql.identifier(tableName)}.${sql.identifier(columnName)}`);
            }
          }
          if (i < columnsLen - 1) {
            chunk.push(sql`, `);
          }
          return chunk;
        });
        return sql.join(chunks);
      }
      buildSelectQuery({
        withList,
        fields,
        fieldsFlat,
        where,
        having,
        table,
        joins,
        orderBy,
        groupBy,
        limit,
        offset,
        distinct,
        setOperators
      }) {
        const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
        for (const f of fieldsList) {
          if (is(f.field, Column) && getTableName(f.field.table) !== (is(table, Subquery) ? table[SubqueryConfig].alias : is(table, SQLiteViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(
            ({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])
          ))(f.field.table)) {
            const tableName = getTableName(f.field.table);
            throw new Error(
              `Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`
            );
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        let withSql;
        if (withList?.length) {
          const withSqlChunks = [sql`with `];
          for (const [i, w] of withList.entries()) {
            withSqlChunks.push(sql`${sql.identifier(w[SubqueryConfig].alias)} as (${w[SubqueryConfig].sql})`);
            if (i < withList.length - 1) {
              withSqlChunks.push(sql`, `);
            }
          }
          withSqlChunks.push(sql` `);
          withSql = sql.join(withSqlChunks);
        }
        const distinctSql = distinct ? sql` distinct` : void 0;
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = (() => {
          if (is(table, Table) && table[Table.Symbol.OriginalName] !== table[Table.Symbol.Name]) {
            return sql`${sql.identifier(table[Table.Symbol.OriginalName])} ${sql.identifier(table[Table.Symbol.Name])}`;
          }
          return table;
        })();
        const joinsArray = [];
        if (joins) {
          for (const [index28, joinMeta] of joins.entries()) {
            if (index28 === 0) {
              joinsArray.push(sql` `);
            }
            const table2 = joinMeta.table;
            if (is(table2, SQLiteTable)) {
              const tableName = table2[SQLiteTable.Symbol.Name];
              const tableSchema = table2[SQLiteTable.Symbol.Schema];
              const origTableName = table2[SQLiteTable.Symbol.OriginalName];
              const alias = tableName === origTableName ? void 0 : joinMeta.alias;
              joinsArray.push(
                sql`${sql.raw(joinMeta.joinType)} join ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`} on ${joinMeta.on}`
              );
            } else {
              joinsArray.push(
                sql`${sql.raw(joinMeta.joinType)} join ${table2} on ${joinMeta.on}`
              );
            }
            if (index28 < joins.length - 1) {
              joinsArray.push(sql` `);
            }
          }
        }
        const joinsSql = sql.join(joinsArray);
        const whereSql = where ? sql` where ${where}` : void 0;
        const havingSql = having ? sql` having ${having}` : void 0;
        const orderByList = [];
        if (orderBy) {
          for (const [index28, orderByValue] of orderBy.entries()) {
            orderByList.push(orderByValue);
            if (index28 < orderBy.length - 1) {
              orderByList.push(sql`, `);
            }
          }
        }
        const groupByList = [];
        if (groupBy) {
          for (const [index28, groupByValue] of groupBy.entries()) {
            groupByList.push(groupByValue);
            if (index28 < groupBy.length - 1) {
              groupByList.push(sql`, `);
            }
          }
        }
        const groupBySql = groupByList.length > 0 ? sql` group by ${sql.join(groupByList)}` : void 0;
        const orderBySql = orderByList.length > 0 ? sql` order by ${sql.join(orderByList)}` : void 0;
        const limitSql = limit ? sql` limit ${limit}` : void 0;
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
        if (setOperators.length > 0) {
          return this.buildSetOperations(finalQuery, setOperators);
        }
        return finalQuery;
      }
      buildSetOperations(leftSelect, setOperators) {
        const [setOperator, ...rest] = setOperators;
        if (!setOperator) {
          throw new Error("Cannot pass undefined values to any set operator");
        }
        if (rest.length === 0) {
          return this.buildSetOperationQuery({ leftSelect, setOperator });
        }
        return this.buildSetOperations(
          this.buildSetOperationQuery({ leftSelect, setOperator }),
          rest
        );
      }
      buildSetOperationQuery({
        leftSelect,
        setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
      }) {
        const leftChunk = sql`${leftSelect.getSQL()} `;
        const rightChunk = sql`${rightSelect.getSQL()}`;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          const orderByValues = [];
          for (const singleOrderBy of orderBy) {
            if (is(singleOrderBy, SQLiteColumn)) {
              orderByValues.push(sql.identifier(singleOrderBy.name));
            } else if (is(singleOrderBy, SQL)) {
              for (let i = 0; i < singleOrderBy.queryChunks.length; i++) {
                const chunk = singleOrderBy.queryChunks[i];
                if (is(chunk, SQLiteColumn)) {
                  singleOrderBy.queryChunks[i] = sql.identifier(chunk.name);
                }
              }
              orderByValues.push(sql`${singleOrderBy}`);
            } else {
              orderByValues.push(sql`${singleOrderBy}`);
            }
          }
          orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)}`;
        }
        const limitSql = limit ? sql` limit ${limit}` : void 0;
        const operatorChunk = sql.raw(`${type} ${isAll ? "all " : ""}`);
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
      }
      buildInsertQuery({ table, values, onConflict, returning }) {
        const valuesSqlList = [];
        const columns = table[Table.Symbol.Columns];
        const colEntries = Object.entries(columns);
        const insertOrder = colEntries.map(([, column]) => sql.identifier(column.name));
        for (const [valueIndex, value] of values.entries()) {
          const valueList = [];
          for (const [fieldName, col] of colEntries) {
            const colValue = value[fieldName];
            if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
              let defaultValue;
              if (col.default !== null && col.default !== void 0) {
                defaultValue = is(col.default, SQL) ? col.default : sql.param(col.default, col);
              } else if (col.defaultFn !== void 0) {
                const defaultFnResult = col.defaultFn();
                defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
              } else {
                defaultValue = sql`null`;
              }
              valueList.push(defaultValue);
            } else {
              valueList.push(colValue);
            }
          }
          valuesSqlList.push(valueList);
          if (valueIndex < values.length - 1) {
            valuesSqlList.push(sql`, `);
          }
        }
        const valuesSql = sql.join(valuesSqlList);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const onConflictSql = onConflict ? sql` on conflict ${onConflict}` : void 0;
        return sql`insert into ${table} ${insertOrder} values ${valuesSql}${onConflictSql}${returningSql}`;
      }
      sqlToQuery(sql2) {
        return sql2.toQuery({
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString
        });
      }
      buildRelationalQuery({
        fullSchema,
        schema,
        tableNamesMap,
        table,
        tableConfig,
        queryConfig: config,
        tableAlias,
        nestedQueryRelation,
        joinOn
      }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key2, value]) => ({
            dbKey: value.name,
            tsKey: key2,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(
            Object.entries(tableConfig.columns).map(([key2, value]) => [key2, aliasedTableColumn(value, tableAlias)])
          );
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key2) => !selectedColumns.includes(key2));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const {
            tsKey: selectedRelationTsKey,
            queryConfig: selectedRelationConfigValue,
            relation
          } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
            const relationTableName = relation.referencedTable[Table.Symbol.Name];
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(
              ...normalizedRelation.fields.map(
                (field2, i) => eq(
                  aliasedTableColumn(normalizedRelation.references[i], relationTableAlias),
                  aliasedTableColumn(field2, tableAlias)
                )
              )
            );
            const builtRelation = this.buildRelationalQuery({
              fullSchema,
              schema,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError({
            message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
          });
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql`json_array(${sql.join(
            selection.map(
              ({ field: field2 }) => is(field2, SQLiteColumn) ? sql.identifier(field2.name) : is(field2, SQL.Aliased) ? field2.sql : field2
            ),
            sql`, `
          )})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql`coalesce(json_group_array(${field}), json_array())`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [
                {
                  path: [],
                  field: sql.raw("*")
                }
              ],
              where,
              limit,
              offset,
              orderBy,
              setOperators: []
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = void 0;
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, SQLiteTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    };
    _a62 = entityKind;
    __publicField(SQLiteDialect, _a62, "SQLiteDialect");
    SQLiteSyncDialect = class extends SQLiteDialect {
      migrate(migrations, session) {
        const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        session.run(migrationTableCreate);
        const dbMigrations = session.values(
          sql`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        session.run(sql`BEGIN`);
        try {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                session.run(sql.raw(stmt));
              }
              session.run(
                sql`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
          session.run(sql`COMMIT`);
        } catch (e) {
          session.run(sql`ROLLBACK`);
          throw e;
        }
      }
    };
    _a63 = entityKind;
    __publicField(SQLiteSyncDialect, _a63, "SQLiteSyncDialect");
    SQLiteAsyncDialect = class extends SQLiteDialect {
      async migrate(migrations, session) {
        const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        await session.run(migrationTableCreate);
        const dbMigrations = await session.values(
          sql`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        await session.transaction(async (tx) => {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.run(sql.raw(stmt));
              }
              await tx.run(
                sql`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
        });
      }
    };
    _a64 = entityKind;
    __publicField(SQLiteAsyncDialect, _a64, "SQLiteAsyncDialect");
  }
});

// node_modules/drizzle-orm/query-builders/query-builder.js
var _a65, TypedQueryBuilder;
var init_query_builder = __esm({
  "node_modules/drizzle-orm/query-builders/query-builder.js"() {
    init_entity();
    TypedQueryBuilder = class {
      /** @internal */
      getSelectedFields() {
        return this._.selectedFields;
      }
    };
    _a65 = entityKind;
    __publicField(TypedQueryBuilder, _a65, "TypedQueryBuilder");
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/select.js
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
}
var _a66, SQLiteSelectBuilder, _a67, SQLiteSelectQueryBuilderBase, _a68, SQLiteSelectBase, getSQLiteSetOperators, union, unionAll, intersect, except;
var init_select2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/select.js"() {
    init_entity();
    init_query_builder();
    init_query_promise();
    init_sql();
    init_table();
    init_utils2();
    init_view_common();
    init_subquery();
    init_view_base();
    init_selection_proxy();
    SQLiteSelectBuilder = class {
      constructor(config) {
        __publicField(this, "fields");
        __publicField(this, "session");
        __publicField(this, "dialect");
        __publicField(this, "withList");
        __publicField(this, "distinct");
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        this.withList = config.withList;
        this.distinct = config.distinct;
      }
      from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if (is(source, Subquery)) {
          fields = Object.fromEntries(
            Object.keys(source[SubqueryConfig].selection).map((key2) => [key2, source[key2]])
          );
        } else if (is(source, SQLiteViewBase)) {
          fields = source[ViewBaseConfig].selectedFields;
        } else if (is(source, SQL)) {
          fields = {};
        } else {
          fields = getTableColumns(source);
        }
        return new SQLiteSelectBase({
          table: source,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        });
      }
    };
    _a66 = entityKind;
    __publicField(SQLiteSelectBuilder, _a66, "SQLiteSelectBuilder");
    SQLiteSelectQueryBuilderBase = class extends TypedQueryBuilder {
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        __publicField(this, "_");
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "joinsNotNullableMap");
        __publicField(this, "tableName");
        __publicField(this, "isPartialSelect");
        __publicField(this, "session");
        __publicField(this, "dialect");
        /**
         * Executes a `left join` operation by adding another table to the current query.
         * 
         * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
         * 
         * @param table the table to join.
         * @param on the `on` clause.
         * 
         * @example
         * 
         * ```ts
         * // Select all users and their pets
         * const usersWithPets: { user: User; pets: Pet | null }[] = await db.select()
         *   .from(users)
         *   .leftJoin(pets, eq(users.id, pets.ownerId))
         * 
         * // Select userId and petId
         * const usersIdsAndPetIds: { userId: number; petId: number | null }[] = await db.select({
         *   userId: users.id,
         *   petId: pets.id,
         * })
         *   .from(users)
         *   .leftJoin(pets, eq(users.id, pets.ownerId))
         * ```
         */
        __publicField(this, "leftJoin", this.createJoin("left"));
        /**
         * Executes a `right join` operation by adding another table to the current query.
         * 
         * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
         * 
         * @param table the table to join.
         * @param on the `on` clause.
         * 
         * @example
         * 
         * ```ts
         * // Select all users and their pets
         * const usersWithPets: { user: User | null; pets: Pet }[] = await db.select()
         *   .from(users)
         *   .rightJoin(pets, eq(users.id, pets.ownerId))
         * 
         * // Select userId and petId
         * const usersIdsAndPetIds: { userId: number | null; petId: number }[] = await db.select({
         *   userId: users.id,
         *   petId: pets.id,
         * })
         *   .from(users)
         *   .rightJoin(pets, eq(users.id, pets.ownerId))
         * ```
         */
        __publicField(this, "rightJoin", this.createJoin("right"));
        /**
         * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
         * 
         * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
         * 
         * @param table the table to join.
         * @param on the `on` clause.
         * 
         * @example
         * 
         * ```ts
         * // Select all users and their pets
         * const usersWithPets: { user: User; pets: Pet }[] = await db.select()
         *   .from(users)
         *   .innerJoin(pets, eq(users.id, pets.ownerId))
         * 
         * // Select userId and petId
         * const usersIdsAndPetIds: { userId: number; petId: number }[] = await db.select({
         *   userId: users.id,
         *   petId: pets.id,
         * })
         *   .from(users)
         *   .innerJoin(pets, eq(users.id, pets.ownerId))
         * ```
         */
        __publicField(this, "innerJoin", this.createJoin("inner"));
        /**
         * Executes a `full join` operation by combining rows from two tables into a new table.
         * 
         * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
         * 
         * @param table the table to join.
         * @param on the `on` clause.
         * 
         * @example
         * 
         * ```ts
         * // Select all users and their pets
         * const usersWithPets: { user: User | null; pets: Pet | null }[] = await db.select()
         *   .from(users)
         *   .fullJoin(pets, eq(users.id, pets.ownerId))
         * 
         * // Select userId and petId
         * const usersIdsAndPetIds: { userId: number | null; petId: number | null }[] = await db.select({
         *   userId: users.id,
         *   petId: pets.id,
         * })
         *   .from(users)
         *   .fullJoin(pets, eq(users.id, pets.ownerId))
         * ```
         */
        __publicField(this, "fullJoin", this.createJoin("full"));
        /**
         * Adds `union` set operator to the query.
         * 
         * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
         * 
         * @example
         * 
         * ```ts
         * // Select all unique names from customers and users tables
         * await db.select({ name: users.name })
         *   .from(users)
         *   .union(
         *     db.select({ name: customers.name }).from(customers)
         *   );
         * // or
         * import { union } from 'drizzle-orm/sqlite-core'
         * 
         * await union(
         *   db.select({ name: users.name }).from(users), 
         *   db.select({ name: customers.name }).from(customers)
         * );
         * ```
         */
        __publicField(this, "union", this.createSetOperator("union", false));
        /**
         * Adds `union all` set operator to the query.
         * 
         * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
         * 
         * @example
         * 
         * ```ts
         * // Select all transaction ids from both online and in-store sales
         * await db.select({ transaction: onlineSales.transactionId })
         *   .from(onlineSales)
         *   .unionAll(
         *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
         *   );
         * // or
         * import { unionAll } from 'drizzle-orm/sqlite-core'
         * 
         * await unionAll(
         *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
         *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
         * );
         * ```
         */
        __publicField(this, "unionAll", this.createSetOperator("union", true));
        /**
         * Adds `intersect` set operator to the query.
         * 
         * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
         * 
         * @example
         * 
         * ```ts
         * // Select course names that are offered in both departments A and B
         * await db.select({ courseName: depA.courseName })
         *   .from(depA)
         *   .intersect(
         *     db.select({ courseName: depB.courseName }).from(depB)
         *   );
         * // or
         * import { intersect } from 'drizzle-orm/sqlite-core'
         * 
         * await intersect(
         *   db.select({ courseName: depA.courseName }).from(depA),
         *   db.select({ courseName: depB.courseName }).from(depB)
         * );
         * ```
         */
        __publicField(this, "intersect", this.createSetOperator("intersect", false));
        /**
         * Adds `except` set operator to the query.
         * 
         * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
         * 
         * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
         * 
         * @example
         * 
         * ```ts
         * // Select all courses offered in department A but not in department B
         * await db.select({ courseName: depA.courseName })
         *   .from(depA)
         *   .except(
         *     db.select({ courseName: depB.courseName }).from(depB)
         *   );
         * // or
         * import { except } from 'drizzle-orm/sqlite-core'
         * 
         * await except(
         *   db.select({ courseName: depA.courseName }).from(depA),
         *   db.select({ courseName: depB.courseName }).from(depB)
         * );
         * ```
         */
        __publicField(this, "except", this.createSetOperator("except", false));
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct,
          setOperators: []
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields
        };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
      }
      createJoin(joinType) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = getTableLikeName(table);
          if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !is(table, SQL)) {
              const selection = is(table, Subquery) ? table[SubqueryConfig].selection : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(
              new Proxy(
                this.config.fields,
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false])
                );
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key2]) => [key2, false])
                );
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      createSetOperator(type, isAll) {
        return (rightSelection) => {
          const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
          if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
            throw new Error(
              "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
            );
          }
          this.config.setOperators.push({ type, isAll, rightSelect });
          return this;
        };
      }
      /** @internal */
      addSetOperators(setOperators) {
        this.config.setOperators.push(...setOperators);
        return this;
      }
      /** 
       * Adds a `where` clause to the query.
       * 
       * Calling this method will select only those rows that fulfill a specified condition.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
       * 
       * @param where the `where` clause.
       * 
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be selected.
       * 
       * ```ts
       * // Select all cars with green color
       * await db.select().from(cars).where(eq(cars.color, 'green'));
       * // or
       * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
       * ```
       * 
       * You can logically combine conditional operators with `and()` and `or()` operators:
       * 
       * ```ts
       * // Select all BMW cars with a green color
       * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       * 
       * // Select all cars with the green or blue color
       * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
      */
      where(where) {
        if (typeof where === "function") {
          where = where(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.where = where;
        return this;
      }
      /**
       * Adds a `having` clause to the query.
       * 
       * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
       * 
       * @param having the `having` clause.
       * 
       * @example
       * 
       * ```ts
       * // Select all brands with more than one car
       * await db.select({
       * 	brand: cars.brand,
       * 	count: sql<number>`cast(count(${cars.id}) as int)`,
       * })
       *   .from(cars)
       *   .groupBy(cars.brand)
       *   .having(({ count }) => gt(count, 1));
       * ```
       */
      having(having) {
        if (typeof having === "function") {
          having = having(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        } else {
          const orderByArray = columns;
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        }
        return this;
      }
      /**
       * Adds a `limit` clause to the query.
       * 
       * Calling this method will set the maximum number of rows that will be returned by this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       * 
       * @param limit the `limit` clause.
       * 
       * @example
       *
       * ```ts
       * // Get the first 10 people from this query.
       * await db.select().from(people).limit(10);
       * ```
       */
      limit(limit) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).limit = limit;
        } else {
          this.config.limit = limit;
        }
        return this;
      }
      /**
       * Adds an `offset` clause to the query.
       * 
       * Calling this method will skip a number of rows when returning results from this query.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       * 
       * @param offset the `offset` clause.
       * 
       * @example
       *
       * ```ts
       * // Get the 10th-20th people from this query.
       * await db.select().from(people).offset(10).limit(10);
       * ```
       */
      offset(offset) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).offset = offset;
        } else {
          this.config.offset = offset;
        }
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        return new Proxy(
          new Subquery(this.getSQL(), this.config.fields, alias),
          new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      /** @internal */
      getSelectedFields() {
        return new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      $dynamic() {
        return this;
      }
    };
    _a67 = entityKind;
    __publicField(SQLiteSelectQueryBuilderBase, _a67, "SQLiteSelectQueryBuilder");
    SQLiteSelectBase = class extends SQLiteSelectQueryBuilderBase {
      constructor() {
        super(...arguments);
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
      }
      prepare(isOneTimeQuery) {
        if (!this.session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const fieldsList = orderSelectedFields(this.config.fields);
        const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          fieldsList,
          "all"
        );
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
      }
      async execute() {
        return this.all();
      }
    };
    _a68 = entityKind;
    __publicField(SQLiteSelectBase, _a68, "SQLiteSelect");
    applyMixins(SQLiteSelectBase, [QueryPromise]);
    getSQLiteSetOperators = () => ({
      union,
      unionAll,
      intersect,
      except
    });
    union = createSetOperator("union", false);
    unionAll = createSetOperator("union", true);
    intersect = createSetOperator("intersect", false);
    except = createSetOperator("except", false);
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js
var _a69, QueryBuilder;
var init_query_builder2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js"() {
    init_entity();
    init_dialect();
    init_select2();
    init_subquery();
    init_selection_proxy();
    QueryBuilder = class {
      constructor() {
        __publicField(this, "dialect");
      }
      $with(alias) {
        const queryBuilder = this;
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(queryBuilder);
            }
            return new Proxy(
              new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true),
              new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
            );
          }
        };
      }
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: void 0, dialect: this.getDialect() });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new SQLiteSyncDialect();
        }
        return this.dialect;
      }
    };
    _a69 = entityKind;
    __publicField(QueryBuilder, _a69, "SQLiteQueryBuilder");
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/select.types.js
var init_select_types = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/select.types.js"() {
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/update.js
var _a70, SQLiteUpdateBuilder, _a71, SQLiteUpdateBase;
var init_update = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/update.js"() {
    init_entity();
    init_query_promise();
    init_table2();
    init_utils2();
    SQLiteUpdateBuilder = class {
      constructor(table, session, dialect) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
      }
      set(values) {
        return new SQLiteUpdateBase(this.table, mapUpdateSet(this.table, values), this.session, this.dialect);
      }
    };
    _a70 = entityKind;
    __publicField(SQLiteUpdateBuilder, _a70, "SQLiteUpdateBuilder");
    SQLiteUpdateBase = class extends QueryPromise {
      constructor(table, set, session, dialect) {
        super();
        /** @internal */
        __publicField(this, "config");
        __publicField(this, "run", (placeholderValues) => {
          return this.prepare(true).run(placeholderValues);
        });
        __publicField(this, "all", (placeholderValues) => {
          return this.prepare(true).all(placeholderValues);
        });
        __publicField(this, "get", (placeholderValues) => {
          return this.prepare(true).get(placeholderValues);
        });
        __publicField(this, "values", (placeholderValues) => {
          return this.prepare(true).values(placeholderValues);
        });
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table };
      }
      /**
       * Adds a 'where' clause to the query.
       * 
       * Calling this method will update only those rows that fulfill a specified condition.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/update}
       * 
       * @param where the 'where' clause.
       * 
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be updated.
       * 
       * ```ts
       * // Update all cars with green color
       * db.update(cars).set({ color: 'red' })
       *   .where(eq(cars.color, 'green'));
       * // or
       * db.update(cars).set({ color: 'red' })
       *   .where(sql`${cars.color} = 'green'`)
       * ```
       * 
       * You can logically combine conditional operators with `and()` and `or()` operators:
       * 
       * ```ts
       * // Update all BMW cars with a green color
       * db.update(cars).set({ color: 'red' })
       *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       * 
       * // Update all cars with the green or blue color
       * db.update(cars).set({ color: 'red' })
       *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      prepare(isOneTimeQuery) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run"
        );
      }
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    };
    _a71 = entityKind;
    __publicField(SQLiteUpdateBase, _a71, "SQLiteUpdate");
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/index.js
var init_query_builders = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/index.js"() {
    init_delete();
    init_insert();
    init_query_builder2();
    init_select2();
    init_select_types();
    init_update();
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/query.js
var _a72, RelationalQueryBuilder, _a73, SQLiteRelationalQuery, _a74, SQLiteSyncRelationalQuery;
var init_query = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/query.js"() {
    init_entity();
    init_query_promise();
    init_relations();
    RelationalQueryBuilder = class {
      constructor(mode, fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
        this.mode = mode;
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
      }
      findMany(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        );
      }
      findFirst(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        );
      }
    };
    _a72 = entityKind;
    __publicField(RelationalQueryBuilder, _a72, "SQLiteAsyncRelationalQueryBuilder");
    SQLiteRelationalQuery = class extends QueryPromise {
      constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
        super();
        /** @internal */
        __publicField(this, "mode");
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        }).sql;
      }
      prepare() {
        const { query, builtQuery } = this._toSQL();
        return this.session.prepareQuery(
          builtQuery,
          void 0,
          this.mode === "first" ? "get" : "all",
          (rawRows, mapColumnValue) => {
            const rows = rawRows.map(
              (row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue)
            );
            if (this.mode === "first") {
              return rows[0];
            }
            return rows;
          }
        );
      }
      _toSQL() {
        const query = this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { query, builtQuery };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      /** @internal */
      executeRaw() {
        if (this.mode === "first") {
          return this.prepare().get();
        }
        return this.prepare().all();
      }
      async execute() {
        return this.executeRaw();
      }
    };
    _a73 = entityKind;
    __publicField(SQLiteRelationalQuery, _a73, "SQLiteAsyncRelationalQuery");
    SQLiteSyncRelationalQuery = class extends SQLiteRelationalQuery {
      sync() {
        return this.executeRaw();
      }
    };
    _a74 = entityKind;
    __publicField(SQLiteSyncRelationalQuery, _a74, "SQLiteSyncRelationalQuery");
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/raw.js
var _a75, SQLiteRaw;
var init_raw = __esm({
  "node_modules/drizzle-orm/sqlite-core/query-builders/raw.js"() {
    init_entity();
    init_query_promise();
    SQLiteRaw = class extends QueryPromise {
      constructor(cb, getSQLCb, action, dialect, mapBatchResult) {
        super();
        /** @internal */
        __publicField(this, "config");
        this.cb = cb;
        this.getSQLCb = getSQLCb;
        this.dialect = dialect;
        this.mapBatchResult = mapBatchResult;
        this.config = { action };
      }
      /** @internal */
      getSQL() {
        return this.getSQLCb();
      }
      async execute() {
        return this.cb();
      }
      prepare() {
        return {
          getQuery: () => {
            return this.dialect.sqlToQuery(this.getSQL());
          },
          mapResult: (result, isFromBatch) => {
            return isFromBatch ? this.mapBatchResult(result) : result;
          }
        };
      }
    };
    _a75 = entityKind;
    __publicField(SQLiteRaw, _a75, "SQLiteRaw");
  }
});

// node_modules/drizzle-orm/sqlite-core/db.js
var _a76, BaseSQLiteDatabase;
var init_db = __esm({
  "node_modules/drizzle-orm/sqlite-core/db.js"() {
    init_entity();
    init_selection_proxy();
    init_query_builders();
    init_subquery();
    init_query();
    init_raw();
    BaseSQLiteDatabase = class {
      constructor(resultKind, dialect, session, schema) {
        __publicField(this, "query");
        this.resultKind = resultKind;
        this.dialect = dialect;
        this.session = session;
        this._ = schema ? { schema: schema.schema, tableNamesMap: schema.tableNamesMap } : { schema: void 0, tableNamesMap: {} };
        this.query = {};
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            this.query[tableName] = new RelationalQueryBuilder(
              resultKind,
              schema.fullSchema,
              this._.schema,
              this._.tableNamesMap,
              schema.fullSchema[tableName],
              columns,
              dialect,
              session
            );
          }
        }
      }
      /**
       * Creates a subquery that defines a temporary named result set as a CTE.
       * 
       * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       * 
       * @param alias The alias for the subquery.
       * 
       * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
       * 
       * @example
       * 
       * ```ts
       * // Create a subquery with alias 'sq' and use it in the select query
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       * 
       * const result = await db.with(sq).select().from(sq);
       * ```
       * 
       * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
       * 
       * ```ts
       * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
       * const sq = db.$with('sq').as(db.select({
       *   name: sql<string>`upper(${users.name})`.as('name'),
       * })
       * .from(users));
       * 
       * const result = await db.with(sq).select({ name: sq.name }).from(sq);
       * ```
       */
      $with(alias) {
        return {
          as(qb) {
            if (typeof qb === "function") {
              qb = qb(new QueryBuilder());
            }
            return new Proxy(
              new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true),
              new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
            );
          }
        };
      }
      /**
       * Incorporates a previously defined CTE (using `$with`) into the main query.
       * 
       * This method allows the main query to reference a temporary named result set.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       * 
       * @param queries The CTEs to incorporate into the main query.
       * 
       * @example
       * 
       * ```ts
       * // Define a subquery 'sq' as a CTE using $with
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       * 
       * // Incorporate the CTE 'sq' into the main query and select from it
       * const result = await db.with(sq).select().from(sq);
       * ```
       */
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: this.session, dialect: this.dialect });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      /**
       * Creates an update query.
       * 
       * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
       * 
       * Use `.set()` method to specify which values to update.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/update} 
       * 
       * @param table The table to update.
       * 
       * @example
       * 
       * ```ts
       * // Update all rows in the 'cars' table
       * await db.update(cars).set({ color: 'red' });
       * 
       * // Update rows with filters and conditions
       * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
       * 
       * // Update with returning clause
       * const updatedCar: Car[] = await db.update(cars)
       *   .set({ color: 'red' })
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      update(table) {
        return new SQLiteUpdateBuilder(table, this.session, this.dialect);
      }
      /**
       * Creates an insert query.
       * 
       * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
       * 
       * See docs: {@link https://orm.drizzle.team/docs/insert} 
       * 
       * @param table The table to insert into.
       * 
       * @example
       * 
       * ```ts
       * // Insert one row
       * await db.insert(cars).values({ brand: 'BMW' });
       * 
       * // Insert multiple rows
       * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
       * 
       * // Insert with returning clause
       * const insertedCar: Car[] = await db.insert(cars)
       *   .values({ brand: 'BMW' })
       *   .returning();
       * ```
       */
      insert(into) {
        return new SQLiteInsertBuilder(into, this.session, this.dialect);
      }
      /**
       * Creates a delete query.
       * 
       * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted. 
       * 
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *  
       * @param table The table to delete from.
       * 
       * @example
       * 
       * ```ts
       * // Delete all rows in the 'cars' table
       * await db.delete(cars);
       * 
       * // Delete rows with filters and conditions
       * await db.delete(cars).where(eq(cars.color, 'green'));
       * 
       * // Delete with returning clause
       * const deletedCar: Car[] = await db.delete(cars)
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      delete(from) {
        return new SQLiteDeleteBase(from, this.session, this.dialect);
      }
      run(query) {
        const sql2 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.run(sql2),
            () => sql2,
            "run",
            this.dialect,
            this.session.extractRawRunValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.run(sql2);
      }
      all(query) {
        const sql2 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.all(sql2),
            () => sql2,
            "all",
            this.dialect,
            this.session.extractRawAllValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.all(sql2);
      }
      get(query) {
        const sql2 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.get(sql2),
            () => sql2,
            "get",
            this.dialect,
            this.session.extractRawGetValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.get(sql2);
      }
      values(query) {
        const sql2 = query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.values(sql2),
            () => sql2,
            "values",
            this.dialect,
            this.session.extractRawValuesValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.values(sql2);
      }
      transaction(transaction, config) {
        return this.session.transaction(transaction, config);
      }
    };
    _a76 = entityKind;
    __publicField(BaseSQLiteDatabase, _a76, "BaseSQLiteDatabase");
  }
});

// node_modules/drizzle-orm/sqlite-core/indexes.js
var _a77, IndexBuilderOn, _a78, IndexBuilder, _a79, Index;
var init_indexes = __esm({
  "node_modules/drizzle-orm/sqlite-core/indexes.js"() {
    init_entity();
    IndexBuilderOn = class {
      constructor(name, unique) {
        this.name = name;
        this.unique = unique;
      }
      on(...columns) {
        return new IndexBuilder(this.name, columns, this.unique);
      }
    };
    _a77 = entityKind;
    __publicField(IndexBuilderOn, _a77, "SQLiteIndexBuilderOn");
    IndexBuilder = class {
      constructor(name, columns, unique) {
        /** @internal */
        __publicField(this, "config");
        this.config = {
          name,
          columns,
          unique,
          where: void 0
        };
      }
      /**
       * Condition for partial index.
       */
      where(condition) {
        this.config.where = condition;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index(this.config, table);
      }
    };
    _a78 = entityKind;
    __publicField(IndexBuilder, _a78, "SQLiteIndexBuilder");
    Index = class {
      constructor(config, table) {
        __publicField(this, "config");
        this.config = { ...config, table };
      }
    };
    _a79 = entityKind;
    __publicField(Index, _a79, "SQLiteIndex");
  }
});

// node_modules/drizzle-orm/sqlite-core/primary-keys.js
var _a80, PrimaryKeyBuilder, _a81, PrimaryKey;
var init_primary_keys = __esm({
  "node_modules/drizzle-orm/sqlite-core/primary-keys.js"() {
    init_entity();
    init_table2();
    PrimaryKeyBuilder = class {
      constructor(columns, name) {
        /** @internal */
        __publicField(this, "columns");
        /** @internal */
        __publicField(this, "name");
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey(table, this.columns, this.name);
      }
    };
    _a80 = entityKind;
    __publicField(PrimaryKeyBuilder, _a80, "SQLitePrimaryKeyBuilder");
    PrimaryKey = class {
      constructor(table, columns, name) {
        __publicField(this, "columns");
        __publicField(this, "name");
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      getName() {
        return this.name ?? `${this.table[SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
    _a81 = entityKind;
    __publicField(PrimaryKey, _a81, "SQLitePrimaryKey");
  }
});

// node_modules/drizzle-orm/expressions.js
var init_expressions2 = __esm({
  "node_modules/drizzle-orm/expressions.js"() {
    init_expressions();
  }
});

// node_modules/drizzle-orm/logger.js
var _a82, ConsoleLogWriter, _a83, DefaultLogger, _a84, NoopLogger;
var init_logger = __esm({
  "node_modules/drizzle-orm/logger.js"() {
    init_entity();
    ConsoleLogWriter = class {
      write(message) {
        console.log(message);
      }
    };
    _a82 = entityKind;
    __publicField(ConsoleLogWriter, _a82, "ConsoleLogWriter");
    DefaultLogger = class {
      constructor(config) {
        __publicField(this, "writer");
        this.writer = config?.writer ?? new ConsoleLogWriter();
      }
      logQuery(query, params) {
        const stringifiedParams = params.map((p) => {
          try {
            return JSON.stringify(p);
          } catch {
            return String(p);
          }
        });
        const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
        this.writer.write(`Query: ${query}${paramsStr}`);
      }
    };
    _a83 = entityKind;
    __publicField(DefaultLogger, _a83, "DefaultLogger");
    NoopLogger = class {
      logQuery() {
      }
    };
    _a84 = entityKind;
    __publicField(NoopLogger, _a84, "NoopLogger");
  }
});

// node_modules/drizzle-orm/operations.js
var init_operations = __esm({
  "node_modules/drizzle-orm/operations.js"() {
  }
});

// node_modules/drizzle-orm/index.js
var init_drizzle_orm = __esm({
  "node_modules/drizzle-orm/index.js"() {
    init_alias();
    init_column_builder();
    init_column();
    init_entity();
    init_errors();
    init_expressions2();
    init_logger();
    init_operations();
    init_query_promise();
    init_relations();
    init_sql2();
    init_subquery();
    init_table();
    init_utils2();
    init_view_common();
  }
});

// node_modules/drizzle-orm/sqlite-core/session.js
var _a85, ExecuteResultSync, _a86, SQLitePreparedQuery, _a87, SQLiteSession, _a88, SQLiteTransaction;
var init_session = __esm({
  "node_modules/drizzle-orm/sqlite-core/session.js"() {
    init_entity();
    init_errors();
    init_drizzle_orm();
    init_db();
    ExecuteResultSync = class extends QueryPromise {
      constructor(resultCb) {
        super();
        this.resultCb = resultCb;
      }
      async execute() {
        return this.resultCb();
      }
      sync() {
        return this.resultCb();
      }
    };
    _a85 = entityKind;
    __publicField(ExecuteResultSync, _a85, "ExecuteResultSync");
    SQLitePreparedQuery = class {
      constructor(mode, executeMethod, query) {
        /** @internal */
        __publicField(this, "joinsNotNullableMap");
        this.mode = mode;
        this.executeMethod = executeMethod;
        this.query = query;
      }
      getQuery() {
        return this.query;
      }
      mapRunResult(result, _isFromBatch) {
        return result;
      }
      mapAllResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      mapGetResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      execute(placeholderValues) {
        if (this.mode === "async") {
          return this[this.executeMethod](placeholderValues);
        }
        return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
      }
      mapResult(response, isFromBatch) {
        switch (this.executeMethod) {
          case "run": {
            return this.mapRunResult(response, isFromBatch);
          }
          case "all": {
            return this.mapAllResult(response, isFromBatch);
          }
          case "get": {
            return this.mapGetResult(response, isFromBatch);
          }
        }
      }
    };
    _a86 = entityKind;
    __publicField(SQLitePreparedQuery, _a86, "PreparedQuery");
    SQLiteSession = class {
      constructor(dialect) {
        this.dialect = dialect;
      }
      prepareOneTimeQuery(query, fields, executeMethod) {
        return this.prepareQuery(query, fields, executeMethod);
      }
      run(query) {
        const staticQuery = this.dialect.sqlToQuery(query);
        try {
          return this.prepareOneTimeQuery(staticQuery, void 0, "run").run();
        } catch (err) {
          throw new DrizzleError({ cause: err, message: `Failed to run the query '${staticQuery.sql}'` });
        }
      }
      /** @internal */
      extractRawRunValueFromBatchResult(result) {
        return result;
      }
      all(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run").all();
      }
      /** @internal */
      extractRawAllValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      get(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run").get();
      }
      /** @internal */
      extractRawGetValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      values(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run").values();
      }
      /** @internal */
      extractRawValuesValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
    };
    _a87 = entityKind;
    __publicField(SQLiteSession, _a87, "SQLiteSession");
    SQLiteTransaction = class extends BaseSQLiteDatabase {
      constructor(resultType, dialect, session, schema, nestedIndex = 0) {
        super(resultType, dialect, session, schema);
        this.schema = schema;
        this.nestedIndex = nestedIndex;
      }
      rollback() {
        throw new TransactionRollbackError();
      }
    };
    _a88 = entityKind;
    __publicField(SQLiteTransaction, _a88, "SQLiteTransaction");
  }
});

// node_modules/drizzle-orm/sqlite-core/subquery.js
var init_subquery2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/subquery.js"() {
  }
});

// node_modules/drizzle-orm/sqlite-core/view-common.js
var SQLiteViewConfig;
var init_view_common2 = __esm({
  "node_modules/drizzle-orm/sqlite-core/view-common.js"() {
    SQLiteViewConfig = Symbol.for("drizzle:SQLiteViewConfig");
  }
});

// node_modules/drizzle-orm/sqlite-core/utils.js
var init_utils3 = __esm({
  "node_modules/drizzle-orm/sqlite-core/utils.js"() {
  }
});

// node_modules/drizzle-orm/sqlite-core/view.js
var _a89, ViewBuilderCore, _a90, ViewBuilder, _a91, ManualViewBuilder, _a92, _b6, SQLiteView;
var init_view = __esm({
  "node_modules/drizzle-orm/sqlite-core/view.js"() {
    init_entity();
    init_utils2();
    init_query_builder2();
    init_table2();
    init_view_common2();
    init_view_base();
    init_selection_proxy();
    ViewBuilderCore = class {
      constructor(name) {
        __publicField(this, "config", {});
        this.name = name;
      }
    };
    _a89 = entityKind;
    __publicField(ViewBuilderCore, _a89, "SQLiteViewBuilderCore");
    ViewBuilder = class extends ViewBuilderCore {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelectedFields = qb.getSelectedFields();
        return new Proxy(
          new SQLiteView({
            sqliteConfig: this.config,
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: aliasedSelectedFields,
              query: qb.getSQL().inlineParams()
            }
          }),
          selectionProxy
        );
      }
    };
    _a90 = entityKind;
    __publicField(ViewBuilder, _a90, "SQLiteViewBuilder");
    ManualViewBuilder = class extends ViewBuilderCore {
      constructor(name, columns) {
        super(name);
        __publicField(this, "columns");
        this.columns = getTableColumns(sqliteTable(name, columns));
      }
      existing() {
        return new Proxy(
          new SQLiteView({
            sqliteConfig: void 0,
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: void 0
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
      as(query) {
        return new Proxy(
          new SQLiteView({
            sqliteConfig: this.config,
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: query.inlineParams()
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
    };
    _a91 = entityKind;
    __publicField(ManualViewBuilder, _a91, "SQLiteManualViewBuilder");
    SQLiteView = class extends SQLiteViewBase {
      constructor({ sqliteConfig, config }) {
        super(config);
        /** @internal */
        __publicField(this, _b6);
        this[SQLiteViewConfig] = sqliteConfig;
      }
    };
    _a92 = entityKind, _b6 = SQLiteViewConfig;
    __publicField(SQLiteView, _a92, "SQLiteView");
  }
});

// node_modules/drizzle-orm/sqlite-core/index.js
var init_sqlite_core = __esm({
  "node_modules/drizzle-orm/sqlite-core/index.js"() {
    init_alias2();
    init_checks();
    init_columns();
    init_db();
    init_dialect();
    init_foreign_keys();
    init_indexes();
    init_primary_keys();
    init_query_builders();
    init_session();
    init_subquery2();
    init_table2();
    init_unique_constraint();
    init_utils3();
    init_view();
  }
});

// .svelte-kit/output/server/chunks/user.js
var users;
var init_user = __esm({
  ".svelte-kit/output/server/chunks/user.js"() {
    init_sqlite_core();
    users = sqliteTable("auth_user", {
      id: text2("id", {
        length: 15
      }).primaryKey(),
      username: text2("username", {
        length: 55
      }).unique(),
      email: text2("email").notNull(),
      email_verified: integer("email_verified", { mode: "boolean" }).default(false),
      created_at: text2("created_at"),
      updated_at: text2("updated_at"),
      businessId: text2("businessId"),
      name: text2("name", { length: 255 })
    });
    sqliteTable("user_key", {
      id: text2("id").primaryKey(),
      user_id: text2("user_id").references(() => users.id),
      hashed_password: text2("hashed_password", { length: 255 })
    });
    sqliteTable("user_session", {
      id: text2("id").primaryKey(),
      user_id: text2("user_id").references(() => users.id),
      active_expires: integer("active_expires", {
        mode: "number"
      }).notNull(),
      idle_expires: integer("idle_expires", {
        mode: "number"
      }).notNull(),
      state: text2("state"),
      fresh: text2("fresh")
    });
    sqliteTable("email_verification_token", {
      id: text2("id").primaryKey(),
      user_id: text2("user_id").references(() => users.id),
      expires: integer("expires", {
        mode: "number"
      }).notNull()
    });
    sqliteTable("password_reset_token", {
      id: text2("id").primaryKey(),
      user_id: text2("user_id").references(() => users.id),
      expires: integer("expires", {
        mode: "number"
      }).notNull()
    });
  }
});

// .svelte-kit/output/server/entries/pages/(public)/password-reset/_page.server.ts.js
var page_server_ts_exports11 = {};
__export(page_server_ts_exports11, {
  actions: () => actions4,
  prerender: () => prerender9
});
var prerender9, actions4;
var init_page_server_ts11 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/password-reset/_page.server.ts.js"() {
    init_page_server();
    init_mailConfig();
    init_user();
    init_index2();
    prerender9 = false;
    actions4 = {
      default: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        if (!isValidEmail(email)) {
          return fail(400, {
            message: "Invalid email"
          });
        }
        try {
          let email2 = await clerkClient.emails.createEmail({
            fromEmailName: "firstshipper ",
            emailAddressId: "rakeshneupane2045@gmail.com",
            subject: "reset your password",
            body: "<h1>Heelo</h1>"
          });
          const user = auth.transformDatabaseUser(storedUser);
          return {
            success: true
          };
        } catch (e) {
          return fail(500, {
            message: "An unknown error occurred"
          });
        }
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(public)/password-reset/_page.svelte.js
var page_svelte_exports19 = {};
__export(page_svelte_exports19, {
  default: () => Page19
});
var Page19;
var init_page_svelte19 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/password-reset/_page.svelte.js"() {
    init_ssr();
    init_devalue();
    init_Toaster_svelte_svelte_type_style_lang();
    Page19 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let resetPasswordData = {
        token: "",
        newPassword: "",
        confirmPassword: "",
        email: "",
        userId: "",
        accessToken: "",
        refreshToken: ""
      };
      return `<div class="mx-auto max-w-[400px] mt-16 sm:mt-32 pb-16"><form method="post" class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8"><div class="flex flex-col items-center" data-svelte-h="svelte-16cmlgj"><img class="h-12 w-auto" src="/images/logo/white_logo.png" alt="firstshipper company logo"></div> <h2 class="mt-6 self-center" data-svelte-h="svelte-hxosj">Reset Password</h2> <label class="" for="email" data-svelte-h="svelte-1x0glhr">Email</label> <input type="email" name="email" id="email" class="input" required style="font-size: 14px;color: #000;"${add_attribute("value", resetPasswordData.email, 0)} placeholder="emails"> <label class="" for="newPassword" data-svelte-h="svelte-10fh6a7">New Password</label> <input type="password" name="newPassword" id="newPassword" class="input" style="font-size: 14px;color: #000;" placeholder="New Password"${add_attribute("value", resetPasswordData.newPassword, 0)}> ${``} <label class="" for="confirmPassword" data-svelte-h="svelte-1mozplw">Retype password</label> <input type="password" id="confirmPassword" name="confirmPassword" class="input" style="font-size: 14px;color: #000;" placeholder="Confirm Password"${add_attribute("value", resetPasswordData.confirmPassword, 0)}> ${``} <button type="submit" class="bg-neutral ownBtn my-3 w-full hover:opacity-80" style="font-size: 16px;color: #fff;" data-svelte-h="svelte-1ggfhr2">Submit</button> <div class="flex h-[50px] items-center" data-svelte-h="svelte-1duz51l"><h3 class="font-bold">Have no account?</h3> <a href="/signup" class="ml-4 inline font-bold underline underline-offset-4">Create one</a></div></form></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/37.js
var __exports25 = {};
__export(__exports25, {
  component: () => component25,
  fonts: () => fonts25,
  imports: () => imports25,
  index: () => index25,
  server: () => page_server_ts_exports11,
  server_id: () => server_id11,
  stylesheets: () => stylesheets25
});
var index25, component_cache25, component25, server_id11, imports25, stylesheets25, fonts25;
var init__25 = __esm({
  ".svelte-kit/output/server/nodes/37.js"() {
    init_page_server_ts11();
    index25 = 37;
    component25 = async () => component_cache25 ?? (component_cache25 = (await Promise.resolve().then(() => (init_page_svelte19(), page_svelte_exports19))).default);
    server_id11 = "src/routes/(public)/password-reset/+page.server.ts";
    imports25 = ["_app/immutable/nodes/37.c905a3bf.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/forms.0adc281c.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/navigation.dd09c7a2.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.dd96718f.js"];
    stylesheets25 = ["_app/immutable/assets/Toaster.3a6d0da3.css"];
    fonts25 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(public)/password-reset/_token_/_page.server.ts.js
var page_server_ts_exports12 = {};
__export(page_server_ts_exports12, {
  actions: () => actions5,
  load: () => load11,
  prerender: () => prerender10
});
var prerender10, load11, actions5;
var init_page_server_ts12 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/password-reset/_token_/_page.server.ts.js"() {
    init_page_server();
    prerender10 = false;
    load11 = async ({ params }) => {
      const { token } = params;
      if (!token) {
        throw redirect(302, "/password-reset");
      }
      return {};
    };
    actions5 = {
      default: async ({ request, params, locals, platform }) => {
        const formData = await request.formData();
        const password = formData.get("password");
        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
          return fail(400, {
            message: "Invalid password"
          });
        }
        try {
          const { token } = params;
          if (!token)
            return fail(400, {
              message: "Invalid Token"
            });
        } catch (e) {
          return fail(400, {
            message: "Invalid or expired password reset link"
          });
        }
        throw redirect(302, "/");
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(public)/password-reset/_token_/_page.svelte.js
var page_svelte_exports20 = {};
__export(page_svelte_exports20, {
  default: () => Page20
});
var Page20;
var init_page_svelte20 = __esm({
  ".svelte-kit/output/server/entries/pages/(public)/password-reset/_token_/_page.svelte.js"() {
    init_ssr();
    init_devalue();
    Page20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { form } = $$props;
      if ($$props.form === void 0 && $$bindings.form && form !== void 0)
        $$bindings.form(form);
      return `<div class="mt-32 pb-16 mx-auto"><h1 data-svelte-h="svelte-7muqls">Reset password</h1> <form method="post" data-svelte-h="svelte-v78sq3"><label for="password">New Password</label> <input name="password" id="password"><br> <input type="submit"></form> ${form?.message ? `<p class="error">${escape(form.message)}</p>` : ``}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/38.js
var __exports26 = {};
__export(__exports26, {
  component: () => component26,
  fonts: () => fonts26,
  imports: () => imports26,
  index: () => index26,
  server: () => page_server_ts_exports12,
  server_id: () => server_id12,
  stylesheets: () => stylesheets26
});
var index26, component_cache26, component26, server_id12, imports26, stylesheets26, fonts26;
var init__26 = __esm({
  ".svelte-kit/output/server/nodes/38.js"() {
    init_page_server_ts12();
    index26 = 38;
    component26 = async () => component_cache26 ?? (component_cache26 = (await Promise.resolve().then(() => (init_page_svelte20(), page_svelte_exports20))).default);
    server_id12 = "src/routes/(public)/password-reset/[token]/+page.server.ts";
    imports26 = ["_app/immutable/nodes/38.3e6fb3f5.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js", "_app/immutable/chunks/forms.0adc281c.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/navigation.dd09c7a2.js"];
    stylesheets26 = [];
    fonts26 = [];
  }
});

// .svelte-kit/output/server/entries/pages/api/data/_page.ts.js
var page_ts_exports3 = {};
__export(page_ts_exports3, {
  load: () => load12,
  prerender: () => prerender11
});
async function load12(args) {
  const data = await args.fetch(backendUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data1 = await data.json();
  return data1;
}
var prerender11;
var init_page_ts3 = __esm({
  ".svelte-kit/output/server/entries/pages/api/data/_page.ts.js"() {
    init_config();
    prerender11 = false;
  }
});

// .svelte-kit/output/server/entries/pages/api/data/_page.svelte.js
var page_svelte_exports21 = {};
__export(page_svelte_exports21, {
  default: () => Page21
});
var css14, Page21;
var init_page_svelte21 = __esm({
  ".svelte-kit/output/server/entries/pages/api/data/_page.svelte.js"() {
    init_ssr();
    css14 = {
      code: "table.svelte-1o6dfid{border-collapse:collapse;width:100%}th.svelte-1o6dfid,td.svelte-1o6dfid{border:1px solid black;padding:8px;text-align:left}th.svelte-1o6dfid{background-color:#f2f2f2}",
      map: null
    };
    Page21 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      const values = Object.values(data);
      values.sort((a, b) => b.count - a.count);
      console.log(values);
      console.log(values);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css14);
      return `<table class="svelte-1o6dfid"><thead data-svelte-h="svelte-ezchnh"><tr><th class="svelte-1o6dfid">Profile</th></tr></thead> <tbody>${each(values, (value, index28) => {
        return `${index28 > 400 && index28 < 500 ? `<tr><td class="svelte-1o6dfid"><a${add_attribute("href", value.profile, 0)} target="_blank">${escape(value.profile)}</a></td> </tr>` : ``}`;
      })}</tbody> </table>`;
    });
  }
});

// .svelte-kit/output/server/nodes/46.js
var __exports27 = {};
__export(__exports27, {
  component: () => component27,
  fonts: () => fonts27,
  imports: () => imports27,
  index: () => index27,
  stylesheets: () => stylesheets27,
  universal: () => page_ts_exports3,
  universal_id: () => universal_id5
});
var index27, component_cache27, component27, universal_id5, imports27, stylesheets27, fonts27;
var init__27 = __esm({
  ".svelte-kit/output/server/nodes/46.js"() {
    init_page_ts3();
    index27 = 46;
    component27 = async () => component_cache27 ?? (component_cache27 = (await Promise.resolve().then(() => (init_page_svelte21(), page_svelte_exports21))).default);
    universal_id5 = "src/routes/api/data/+page.ts";
    imports27 = ["_app/immutable/nodes/46.7d1aebab.js", "_app/immutable/chunks/config.1c7577db.js", "_app/immutable/chunks/config.a250dec1.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/each.f03df721.js", "_app/immutable/chunks/index.7bbd50fc.js"];
    stylesheets27 = ["_app/immutable/assets/46.be08a542.css"];
    fonts27 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/api/business/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  POST: () => POST
});
function POST() {
}
var init_server_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/business/_server.ts.js"() {
  }
});

// .svelte-kit/output/server/entries/endpoints/(public)/email-verification/_token_/_server.ts.js
var server_ts_exports2 = {};
__export(server_ts_exports2, {
  GET: () => GET
});
var GET;
var init_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/(public)/email-verification/_token_/_server.ts.js"() {
    init_config();
    init_user();
    GET = async ({ params, locals, platform }) => {
      try {
        const { token } = params;
        if (!token) {
          return new Response("Invalid email verification link", {
            status: 400
          });
        }
        const res = await fetch(`${backendUrl}/business/business_count`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "GET"
        });
        const businessId = await res.text();
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/admin"
          }
        });
      } catch (e) {
        console.log("error in email verification", e);
        return new Response("Invalid email verification link", {
          status: 400
        });
      }
    };
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  let { data_3 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0)
    $$bindings.data_2(data_2);
  if ($$props.data_3 === void 0 && $$bindings.data_3 && data_3 !== void 0)
    $$bindings.data_3(data_3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${constructors[2] ? `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${constructors[3] ? `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {
                    default: () => {
                      return `${validate_component(constructors[3] || missing_component, "svelte:component").$$render(
                        $$result,
                        { data: data_3, form, this: components[3] },
                        {
                          this: ($$value) => {
                            components[3] = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}`;
                    }
                  }
                )}` : `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, form, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`}`;
              }
            }
          )}` : `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n<title>Firstshipper is best LTL shipping provider for domestic pallet shipping</title>\n\n<head>\n      <meta charset="utf-8" />\n      <meta name="description"\n            content="" />\n      <link rel="preload"\n            rel="icon"\n            href="' + assets2 + '/favicon-32x32.png" />\n      <link rel="icon"\n            href="/favicon-32x32.png"\n            type="image/svg+xml" />\n      <link rel="apple-touch-icon"\n            href="/ios/192.png" />\n      <link rel="mask-icon"\n            href="/favicon-32x32.png"\n            color="#ffffff" />\n      <meta name="msapplication-TileColor"\n            content="#eea47f" />\n      <meta name="theme-color"\n            content="#ffffff" />\n      <meta http-equiv="x-ua-compatible"\n            content="ie=edge" />\n      <link rel="preload"\n            rel="shortcut icon"\n            href="' + assets2 + '/favicon-32x32.png" />\n      <!-- <link rel="manifest"href="/manifest.webmanifest"/> -->\n      <link rel="manifest"\n            href="/manifest.json" />\n      <link defer\n            rel="stylesheet"\n            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"\n            integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="\n            crossorigin="anonymous"\n            referrerpolicy="no-referrer" />\n      <meta name="viewport"\n            content="width=device-width"\n            ,\n            initial-scale="1.0,"\n            maximum-scale="1.0,"\n            user-scalable="no" />\n      <link rel="preconnect"\n            href="https://fonts.googleapis.com" />\n      <link rel="preconnect"\n            href="https://fonts.gstatic.com"\n            crossorigin />\n      <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Inter:wght@100;300;500;700&family=Noto+Sans:wght@100;200;300;400;600&family=Poppins:wght@100;200;300;400;600&family=Roboto:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600&display=swap"\n            rel="stylesheet" />\n      <link rel="stylesheet"\n            href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">\n      <script src="https://cdn.jsdelivr.net/npm/flatpickr"><\/script>\n\n      ' + head + '\n</head>\n\n<body>\n      <div style="display: contents">' + body + `</div>
      <script async>
            window.initAutocomplete = function () {
                  const event = new Event('google-maps-callback', {
                        bubbles: true,
                        cancelable: true
                  });
                  window.dispatchEvent(event);
            };
      <\/script>
      <script async
              defer
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkA5e9M_G0k5eQ9E5Yti-gPXoG1_r3xCk&callback=initAutocomplete&libraries=places,geometry&v=weekly&sensor=true"><\/script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
              integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"><\/script>

      <script
              src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/index.global.min.js"><\/script>
      <!-- Google tag (gtag.js) -->
      <script async
              src="https://www.googletagmanager.com/gtag/js?id=G-Q8HT1DSP91"><\/script>
      <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                  dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-Q8HT1DSP91');
      <\/script>
      <script>
            function receiveMessage(message) {
                  var result = prompt('Message received from Flutter:' + message);
                  // Use result as per your requirement
            }
      <\/script>
</body>

</html>`,
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "d0283a"
};
function get_hooks() {
  return Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports));
}

// .svelte-kit/output/server/index.js
init_page_server();
init_devalue();
init_chunks();
var import_cookie2 = __toESM(require_cookie2(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
var PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler2 = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender12 = mod.prerender ?? state.prerender_default;
  if (prerender12 && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender12) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler2(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender12));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions6 = server2?.actions;
  if (!actions6) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions6);
  try {
    const data = await call_action(event, actions6);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions6 = server2?.actions;
  if (!actions6) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions6);
  try {
    const data = await call_action(event, actions6);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions6) {
  if (actions6.default && Object.keys(actions6).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions6) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions6[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify2, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr: csr2
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr2, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr2, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text22() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text22;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text22());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr2) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender: prerender12 }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender12;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets28 = new Set(client.stylesheets);
  const fonts28 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets28.add(url);
      for (const url of node.fonts)
        fonts28.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets28) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts28) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr4 = get_option([default_layout], "ssr") ?? true;
    const csr2 = get_option([default_layout], "csr") ?? true;
    if (ssr4) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr: csr2
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr: ssr4,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    location: redirect2.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify2(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify2(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify2(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !state.prerendering) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr2 = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr: csr2
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index28 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index28]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: get_option(nodes, "ssr") ?? true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie2.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie2.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie2.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      set_internal(name, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return (0, import_cookie2.serialize)(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie2.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name] = {
      name,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie2.serialize)(name, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix2 = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/netlify-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set([".env", ".well-known/apple-app-site-association", ".well-known/assetlinks.json", "android/android-launchericon-144-144.png", "android/android-launchericon-192-192.png", "android/android-launchericon-48-48.png", "android/android-launchericon-512-512.png", "android/android-launchericon-72-72.png", "android/android-launchericon-96-96.png", "apple-touch-icon.png", "favicon-32x32.png", "favicon.ico", "favicon.svg", "font/goldmanregular.ttf", "font/inter.ttf", "font/spacegrotesk.ttf", "iFrameCommunicator.html", "images/about/about_image.jpg", "images/background/log_in.png", "images/background/login.svg", "images/background/sign_up.svg", "images/background/video_poster.jpg", "images/banner/banner_img.png", "images/bg.svg", "images/blog/what-is-ltl-shipping.jpg", "images/icons/binding.svg", "images/icons/burger.svg", "images/icons/business.svg", "images/icons/busy.svg", "images/icons/calender.png", "images/icons/calender.svg", "images/icons/calender1.svg", "images/icons/claims.svg", "images/icons/close.svg", "images/icons/customer.svg", "images/icons/desktop.svg", "images/icons/document.svg", "images/icons/document1.svg", "images/icons/drop_down.svg", "images/icons/edit.svg", "images/icons/edit_location.svg", "images/icons/feedback.svg", "images/icons/go.svg", "images/icons/home.svg", "images/icons/icon_arrow_down.png", "images/icons/invoice.svg", "images/icons/loading.svg", "images/icons/location.svg", "images/icons/location1.svg", "images/icons/location_white.svg", "images/icons/logout.svg", "images/icons/more.svg", "images/icons/node.svg", "images/icons/open.svg", "images/icons/package.svg", "images/icons/pallet.svg", "images/icons/peace.svg", "images/icons/phone.svg", "images/icons/phone_black.svg", "images/icons/php.svg", "images/icons/pickup.svg", "images/icons/profile.svg", "images/icons/python.svg", "images/icons/quote.svg", "images/icons/ruby.svg", "images/icons/select_down.svg", "images/icons/setting.svg", "images/icons/track.svg", "images/icons/trash.svelte", "images/logo/logo_dark.svg", "images/logo/new_logo.png", "images/logo/new_logo.svg", "images/logo/new_logo_white.svg", "images/logo/new_updated_logo.svg", "images/logo/primary.png", "images/logo/r&l.png", "images/logo/roadrunner.png", "images/logo/site_logo.svg", "images/logo/site_logo_2.svg", "images/logo/test.json", "images/logo/white_logo.png", "images/logo/white_logo.svg", "images/service/service_img_1.jpg", "images/shipments.png", "images/shipping_app_image.webp", "ios/100.png", "ios/1024.png", "ios/114.png", "ios/120.png", "ios/128.png", "ios/144.png", "ios/152.png", "ios/16.png", "ios/167.png", "ios/180.png", "ios/192.png", "ios/20.png", "ios/256.png", "ios/29.png", "ios/32.png", "ios/40.png", "ios/50.png", "ios/512.png", "ios/57.png", "ios/58.png", "ios/60.png", "ios/64.png", "ios/72.png", "ios/76.png", "ios/80.png", "ios/87.png", "loading.json", "logo-16x16.png", "logo-192x192.png", "logo-32x32.png", "logo-512x512.png", "logo.svg", "logos/PDFRenderServlet.pdf", "logos/clearlane.png", "logos/edi.png", "logos/roadrunner.png", "logos/xpo.png", "manifest.json", "robots.txt", "sitemap.xml", "windows11/LargeTile.scale-100.png", "windows11/LargeTile.scale-125.png", "windows11/LargeTile.scale-150.png", "windows11/LargeTile.scale-200.png", "windows11/LargeTile.scale-400.png", "windows11/SmallTile.scale-100.png", "windows11/SmallTile.scale-125.png", "windows11/SmallTile.scale-150.png", "windows11/SmallTile.scale-200.png", "windows11/SmallTile.scale-400.png", "windows11/SplashScreen.scale-100.png", "windows11/SplashScreen.scale-125.png", "windows11/SplashScreen.scale-150.png", "windows11/SplashScreen.scale-200.png", "windows11/SplashScreen.scale-400.png", "windows11/Square150x150Logo.scale-100.png", "windows11/Square150x150Logo.scale-125.png", "windows11/Square150x150Logo.scale-150.png", "windows11/Square150x150Logo.scale-200.png", "windows11/Square150x150Logo.scale-400.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png", "windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png", "windows11/Square44x44Logo.altform-unplated_targetsize-16.png", "windows11/Square44x44Logo.altform-unplated_targetsize-20.png", "windows11/Square44x44Logo.altform-unplated_targetsize-24.png", "windows11/Square44x44Logo.altform-unplated_targetsize-256.png", "windows11/Square44x44Logo.altform-unplated_targetsize-30.png", "windows11/Square44x44Logo.altform-unplated_targetsize-32.png", "windows11/Square44x44Logo.altform-unplated_targetsize-36.png", "windows11/Square44x44Logo.altform-unplated_targetsize-40.png", "windows11/Square44x44Logo.altform-unplated_targetsize-44.png", "windows11/Square44x44Logo.altform-unplated_targetsize-48.png", "windows11/Square44x44Logo.altform-unplated_targetsize-60.png", "windows11/Square44x44Logo.altform-unplated_targetsize-64.png", "windows11/Square44x44Logo.altform-unplated_targetsize-72.png", "windows11/Square44x44Logo.altform-unplated_targetsize-80.png", "windows11/Square44x44Logo.altform-unplated_targetsize-96.png", "windows11/Square44x44Logo.scale-100.png", "windows11/Square44x44Logo.scale-125.png", "windows11/Square44x44Logo.scale-150.png", "windows11/Square44x44Logo.scale-200.png", "windows11/Square44x44Logo.scale-400.png", "windows11/Square44x44Logo.targetsize-16.png", "windows11/Square44x44Logo.targetsize-20.png", "windows11/Square44x44Logo.targetsize-24.png", "windows11/Square44x44Logo.targetsize-256.png", "windows11/Square44x44Logo.targetsize-30.png", "windows11/Square44x44Logo.targetsize-32.png", "windows11/Square44x44Logo.targetsize-36.png", "windows11/Square44x44Logo.targetsize-40.png", "windows11/Square44x44Logo.targetsize-44.png", "windows11/Square44x44Logo.targetsize-48.png", "windows11/Square44x44Logo.targetsize-60.png", "windows11/Square44x44Logo.targetsize-64.png", "windows11/Square44x44Logo.targetsize-72.png", "windows11/Square44x44Logo.targetsize-80.png", "windows11/Square44x44Logo.targetsize-96.png", "windows11/StoreLogo.scale-100.png", "windows11/StoreLogo.scale-125.png", "windows11/StoreLogo.scale-150.png", "windows11/StoreLogo.scale-200.png", "windows11/StoreLogo.scale-400.png", "windows11/Wide310x150Logo.scale-100.png", "windows11/Wide310x150Logo.scale-125.png", "windows11/Wide310x150Logo.scale-150.png", "windows11/Wide310x150Logo.scale-200.png", "windows11/Wide310x150Logo.scale-400.png"]),
    mimeTypes: { ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".ttf": "font/ttf", ".html": "text/html", ".jpg": "image/jpeg", ".webp": "image/webp", ".pdf": "application/pdf", ".txt": "text/plain", ".xml": "application/xml" },
    _: {
      client: { "start": "_app/immutable/entry/start.b6c0ef41.js", "app": "_app/immutable/entry/app.940778ff.js", "imports": ["_app/immutable/entry/start.b6c0ef41.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/singletons.793c7c79.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/paths.a9b79461.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/control.f5b05b5f.js", "_app/immutable/entry/app.940778ff.js", "_app/immutable/chunks/preload-helper.a4192956.js", "_app/immutable/chunks/public.3d8541fa.js", "_app/immutable/chunks/store.cbc14670.js", "_app/immutable/chunks/index.ba125b59.js", "_app/immutable/chunks/scheduler.5e84eaeb.js", "_app/immutable/chunks/index.7bbd50fc.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9))),
        __memo(() => Promise.resolve().then(() => (init__10(), __exports10))),
        __memo(() => Promise.resolve().then(() => (init__11(), __exports11))),
        __memo(() => Promise.resolve().then(() => (init__12(), __exports12))),
        __memo(() => Promise.resolve().then(() => (init__13(), __exports13))),
        __memo(() => Promise.resolve().then(() => (init__14(), __exports14))),
        __memo(() => Promise.resolve().then(() => (init__15(), __exports15))),
        __memo(() => Promise.resolve().then(() => (init__16(), __exports16))),
        __memo(() => Promise.resolve().then(() => (init__17(), __exports17))),
        __memo(() => Promise.resolve().then(() => (init__18(), __exports18))),
        __memo(() => Promise.resolve().then(() => (init__19(), __exports19))),
        __memo(() => Promise.resolve().then(() => (init__20(), __exports20))),
        __memo(() => Promise.resolve().then(() => (init__21(), __exports21))),
        __memo(() => Promise.resolve().then(() => (init__22(), __exports22))),
        __memo(() => Promise.resolve().then(() => (init__23(), __exports23))),
        __memo(() => Promise.resolve().then(() => (init__24(), __exports24))),
        __memo(() => Promise.resolve().then(() => (init__25(), __exports25))),
        __memo(() => Promise.resolve().then(() => (init__26(), __exports26))),
        __memo(() => Promise.resolve().then(() => (init__27(), __exports27)))
      ],
      routes: [
        {
          id: "/(public)/adminlogin",
          pattern: /^\/adminlogin\/?$/,
          params: [],
          page: { layouts: [0, 5], errors: [1, ,], leaf: 20 },
          endpoint: null
        },
        {
          id: "/(admin)/admin",
          pattern: /^\/admin\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 6 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/bol/[slug]",
          pattern: /^\/admin\/bol\/([^/]+?)\/?$/,
          params: [{ "name": "slug", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 7 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/booking/[slug]",
          pattern: /^\/admin\/booking\/([^/]+?)\/?$/,
          params: [{ "name": "slug", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 8 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/claims",
          pattern: /^\/admin\/claims\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 9 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/documents",
          pattern: /^\/admin\/documents\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 10 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/feedback",
          pattern: /^\/admin\/feedback\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 11 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/invoice",
          pattern: /^\/admin\/invoice\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 12 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/invoice/[slug]",
          pattern: /^\/admin\/invoice\/([^/]+?)\/?$/,
          params: [{ "name": "slug", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 13 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/quote",
          pattern: /^\/admin\/quote\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 14 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/quote/rates",
          pattern: /^\/admin\/quote\/rates\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 15 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/settings",
          pattern: /^\/admin\/settings\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 16 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/shipments",
          pattern: /^\/admin\/shipments\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 17 },
          endpoint: null
        },
        {
          id: "/(admin)/admin/track",
          pattern: /^\/admin\/track\/?$/,
          params: [],
          page: { layouts: [0, 2, 3], errors: [1, , ,], leaf: 18 },
          endpoint: null
        },
        {
          id: "/api/business",
          pattern: /^\/api\/business\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
        },
        {
          id: "/api/data",
          pattern: /^\/api\/data\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 26 },
          endpoint: null
        },
        {
          id: "/(bol)/bol/[slug]",
          pattern: /^\/bol\/([^/]+?)\/?$/,
          params: [{ "name": "slug", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 19 },
          endpoint: null
        },
        {
          id: "/(public)/email-verification",
          pattern: /^\/email-verification\/?$/,
          params: [],
          page: { layouts: [0, 5], errors: [1, ,], leaf: 21 },
          endpoint: null
        },
        {
          id: "/(public)/email-verification/[token]",
          pattern: /^\/email-verification\/([^/]+?)\/?$/,
          params: [{ "name": "token", "optional": false, "rest": false, "chained": false }],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts2(), server_ts_exports2)))
        },
        {
          id: "/(public)/forgot-password",
          pattern: /^\/forgot-password\/?$/,
          params: [],
          page: { layouts: [0, 5], errors: [1, ,], leaf: 22 },
          endpoint: null
        },
        {
          id: "/(public)/logout",
          pattern: /^\/logout\/?$/,
          params: [],
          page: { layouts: [0, 5], errors: [1, ,], leaf: 23 },
          endpoint: null
        },
        {
          id: "/(public)/password-reset",
          pattern: /^\/password-reset\/?$/,
          params: [],
          page: { layouts: [0, 5], errors: [1, ,], leaf: 24 },
          endpoint: null
        },
        {
          id: "/(public)/password-reset/[token]",
          pattern: /^\/password-reset\/([^/]+?)\/?$/,
          params: [{ "name": "token", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 5], errors: [1, ,], leaf: 25 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set(["/", "/about", "/blog", "/blog/what-is-ltl-shipment", "/calculate-freight-class", "/careers", "/careers/apply", "/consent", "/contact", "/freight-glossary", "/guides", "/invoice", "/login", "/login/__data.json", "/payment", "/privacy", "/redirect/token", "/signup", "/signup/__data.json", "/test", "/track", "/unsubscribe", "/admin/quote"]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  // @ts-ignore
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file = pathname.substring(1);
  try {
    file = decodeURIComponent(file);
  } catch (err) {
  }
  return manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

pusher-js/dist/web/pusher.js:
  (*!
   * Pusher JavaScript Library v8.3.0
   * https://pusher.com/
   *
   * Copyright 2020, Pusher
   * Released under the MIT licence.
   *)
*/
//# sourceMappingURL=render.js.map
