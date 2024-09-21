"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hastscript";
exports.ids = ["vendor-chunks/hastscript"];
exports.modules = {

/***/ "(ssr)/./node_modules/hastscript/lib/core.js":
/*!*********************************************!*\
  !*** ./node_modules/hastscript/lib/core.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   core: () => (/* binding */ core)\n/* harmony export */ });\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/lib/find.js\");\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/lib/normalize.js\");\n/* harmony import */ var hast_util_parse_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-parse-selector */ \"(ssr)/./node_modules/hast-util-parse-selector/lib/index.js\");\n/* harmony import */ var space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! space-separated-tokens */ \"(ssr)/./node_modules/space-separated-tokens/index.js\");\n/* harmony import */ var comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! comma-separated-tokens */ \"(ssr)/./node_modules/comma-separated-tokens/index.js\");\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast').Content} Content\n * @typedef {import('hast').Element} Element\n * @typedef {import('hast').Properties} Properties\n * @typedef {import('property-information').Info} Info\n * @typedef {import('property-information').Schema} Schema\n */\n\n/**\n * @typedef {Content | Root} Node\n *   Any concrete `hast` node.\n * @typedef {Root | Element} HResult\n *   Result from a `h` (or `s`) call.\n *\n * @typedef {string | number} HStyleValue\n *   Value for a CSS style field.\n * @typedef {Record<string, HStyleValue>} HStyle\n *   Supported value of a `style` prop.\n * @typedef {string | number | boolean | null | undefined} HPrimitiveValue\n *   Primitive property value.\n * @typedef {Array<string | number>} HArrayValue\n *   List of property values for space- or comma separated values (such as `className`).\n * @typedef {HPrimitiveValue | HArrayValue} HPropertyValue\n *   Primitive value or list value.\n * @typedef {{[property: string]: HPropertyValue | HStyle}} HProperties\n *   Acceptable value for element properties.\n *\n * @typedef {string | number | null | undefined} HPrimitiveChild\n *   Primitive children, either ignored (nullish), or turned into text nodes.\n * @typedef {Array<Node | HPrimitiveChild>} HArrayChild\n *   List of children.\n * @typedef {Node | HPrimitiveChild | HArrayChild} HChild\n *   Acceptable child value.\n */\n\n\n\n\n\n\nconst buttonTypes = new Set(['menu', 'submit', 'reset', 'button'])\n\nconst own = {}.hasOwnProperty\n\n/**\n * @param {Schema} schema\n * @param {string} defaultTagName\n * @param {Array<string>} [caseSensitive]\n */\nfunction core(schema, defaultTagName, caseSensitive) {\n  const adjust = caseSensitive && createAdjustMap(caseSensitive)\n\n  const h =\n    /**\n     * @type {{\n     *   (): Root\n     *   (selector: null | undefined, ...children: Array<HChild>): Root\n     *   (selector: string, properties?: HProperties, ...children: Array<HChild>): Element\n     *   (selector: string, ...children: Array<HChild>): Element\n     * }}\n     */\n    (\n      /**\n       * Hyperscript compatible DSL for creating virtual hast trees.\n       *\n       * @param {string | null} [selector]\n       * @param {HProperties | HChild} [properties]\n       * @param {Array<HChild>} children\n       * @returns {HResult}\n       */\n      function (selector, properties, ...children) {\n        let index = -1\n        /** @type {HResult} */\n        let node\n\n        if (selector === undefined || selector === null) {\n          node = {type: 'root', children: []}\n          // @ts-expect-error Properties are not supported for roots.\n          children.unshift(properties)\n        } else {\n          node = (0,hast_util_parse_selector__WEBPACK_IMPORTED_MODULE_0__.parseSelector)(selector, defaultTagName)\n          // Normalize the name.\n          node.tagName = node.tagName.toLowerCase()\n          if (adjust && own.call(adjust, node.tagName)) {\n            node.tagName = adjust[node.tagName]\n          }\n\n          // Handle props.\n          if (isProperties(properties, node.tagName)) {\n            /** @type {string} */\n            let key\n\n            for (key in properties) {\n              if (own.call(properties, key)) {\n                // @ts-expect-error `node.properties` is set.\n                addProperty(schema, node.properties, key, properties[key])\n              }\n            }\n          } else {\n            children.unshift(properties)\n          }\n        }\n\n        // Handle children.\n        while (++index < children.length) {\n          addChild(node.children, children[index])\n        }\n\n        if (node.type === 'element' && node.tagName === 'template') {\n          node.content = {type: 'root', children: node.children}\n          node.children = []\n        }\n\n        return node\n      }\n    )\n\n  return h\n}\n\n/**\n * @param {HProperties | HChild} value\n * @param {string} name\n * @returns {value is HProperties}\n */\nfunction isProperties(value, name) {\n  if (\n    value === null ||\n    value === undefined ||\n    typeof value !== 'object' ||\n    Array.isArray(value)\n  ) {\n    return false\n  }\n\n  if (name === 'input' || !value.type || typeof value.type !== 'string') {\n    return true\n  }\n\n  if ('children' in value && Array.isArray(value.children)) {\n    return false\n  }\n\n  if (name === 'button') {\n    return buttonTypes.has(value.type.toLowerCase())\n  }\n\n  return !('value' in value)\n}\n\n/**\n * @param {Schema} schema\n * @param {Properties} properties\n * @param {string} key\n * @param {HStyle | HPropertyValue} value\n * @returns {void}\n */\nfunction addProperty(schema, properties, key, value) {\n  const info = (0,property_information__WEBPACK_IMPORTED_MODULE_1__.find)(schema, key)\n  let index = -1\n  /** @type {HPropertyValue} */\n  let result\n\n  // Ignore nullish and NaN values.\n  if (value === undefined || value === null) return\n\n  if (typeof value === 'number') {\n    // Ignore NaN.\n    if (Number.isNaN(value)) return\n\n    result = value\n  }\n  // Booleans.\n  else if (typeof value === 'boolean') {\n    result = value\n  }\n  // Handle list values.\n  else if (typeof value === 'string') {\n    if (info.spaceSeparated) {\n      result = (0,space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__.parse)(value)\n    } else if (info.commaSeparated) {\n      result = (0,comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__.parse)(value)\n    } else if (info.commaOrSpaceSeparated) {\n      result = (0,space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__.parse)((0,comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__.parse)(value).join(' '))\n    } else {\n      result = parsePrimitive(info, info.property, value)\n    }\n  } else if (Array.isArray(value)) {\n    result = value.concat()\n  } else {\n    result = info.property === 'style' ? style(value) : String(value)\n  }\n\n  if (Array.isArray(result)) {\n    /** @type {Array<string | number>} */\n    const finalResult = []\n\n    while (++index < result.length) {\n      // @ts-expect-error Assume no booleans in array.\n      finalResult[index] = parsePrimitive(info, info.property, result[index])\n    }\n\n    result = finalResult\n  }\n\n  // Class names (which can be added both on the `selector` and here).\n  if (info.property === 'className' && Array.isArray(properties.className)) {\n    // @ts-expect-error Assume no booleans in `className`.\n    result = properties.className.concat(result)\n  }\n\n  properties[info.property] = result\n}\n\n/**\n * @param {Array<Content>} nodes\n * @param {HChild} value\n * @returns {void}\n */\nfunction addChild(nodes, value) {\n  let index = -1\n\n  if (value === undefined || value === null) {\n    // Empty.\n  } else if (typeof value === 'string' || typeof value === 'number') {\n    nodes.push({type: 'text', value: String(value)})\n  } else if (Array.isArray(value)) {\n    while (++index < value.length) {\n      addChild(nodes, value[index])\n    }\n  } else if (typeof value === 'object' && 'type' in value) {\n    if (value.type === 'root') {\n      addChild(nodes, value.children)\n    } else {\n      nodes.push(value)\n    }\n  } else {\n    throw new Error('Expected node, nodes, or string, got `' + value + '`')\n  }\n}\n\n/**\n * Parse a single primitives.\n *\n * @param {Info} info\n * @param {string} name\n * @param {HPrimitiveValue} value\n * @returns {HPrimitiveValue}\n */\nfunction parsePrimitive(info, name, value) {\n  if (typeof value === 'string') {\n    if (info.number && value && !Number.isNaN(Number(value))) {\n      return Number(value)\n    }\n\n    if (\n      (info.boolean || info.overloadedBoolean) &&\n      (value === '' || (0,property_information__WEBPACK_IMPORTED_MODULE_4__.normalize)(value) === (0,property_information__WEBPACK_IMPORTED_MODULE_4__.normalize)(name))\n    ) {\n      return true\n    }\n  }\n\n  return value\n}\n\n/**\n * Serialize a `style` object as a string.\n *\n * @param {HStyle} value\n *   Style object.\n * @returns {string}\n *   CSS string.\n */\nfunction style(value) {\n  /** @type {Array<string>} */\n  const result = []\n  /** @type {string} */\n  let key\n\n  for (key in value) {\n    if (own.call(value, key)) {\n      result.push([key, value[key]].join(': '))\n    }\n  }\n\n  return result.join('; ')\n}\n\n/**\n * Create a map to adjust casing.\n *\n * @param {Array<string>} values\n *   List of properly cased keys.\n * @returns {Record<string, string>}\n *   Map of lowercase keys to uppercase keys.\n */\nfunction createAdjustMap(values) {\n  /** @type {Record<string, string>} */\n  const result = {}\n  let index = -1\n\n  while (++index < values.length) {\n    result[values[index].toLowerCase()] = values[index]\n  }\n\n  return result\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvY29yZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsMkJBQTJCO0FBQ3hDLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsdUNBQXVDO0FBQ3BEOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQSxhQUFhLDZCQUE2QjtBQUMxQztBQUNBLGFBQWEsOENBQThDO0FBQzNEO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckM7QUFDQSxhQUFhLCtCQUErQjtBQUM1QztBQUNBLGNBQWMsOENBQThDO0FBQzVEO0FBQ0E7QUFDQSxhQUFhLG9DQUFvQztBQUNqRDtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0EsYUFBYSxzQ0FBc0M7QUFDbkQ7QUFDQTs7QUFFb0Q7QUFDRTtBQUNBO0FBQ0E7O0FBRXREOztBQUVBLGNBQWM7O0FBRWQ7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsZUFBZTtBQUMxQjtBQUNPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQyxpQkFBaUIsc0JBQXNCO0FBQ3ZDLGlCQUFpQixlQUFlO0FBQ2hDLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1Qjs7QUFFQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlCQUFpQix1RUFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLHNCQUFzQjtBQUNqQyxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsUUFBUTtBQUNuQixXQUFXLHlCQUF5QjtBQUNwQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGVBQWUsMERBQUk7QUFDbkI7QUFDQSxhQUFhLGdCQUFnQjtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDZEQUFNO0FBQ3JCLE1BQU07QUFDTixlQUFlLDZEQUFNO0FBQ3JCLE1BQU07QUFDTixlQUFlLDZEQUFNLENBQUMsNkRBQU07QUFDNUIsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLGVBQWUsd0JBQXdCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0IsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSixnQkFBZ0IsbUNBQW1DO0FBQ25ELElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsaUJBQWlCO0FBQzVCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QiwrREFBUyxZQUFZLCtEQUFTO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QjtBQUNBLGFBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2xldHR5Y29kZS1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9oYXN0c2NyaXB0L2xpYi9jb3JlLmpzPzliZDIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuUm9vdH0gUm9vdFxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLkNvbnRlbnR9IENvbnRlbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5FbGVtZW50fSBFbGVtZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuUHJvcGVydGllc30gUHJvcGVydGllc1xuICogQHR5cGVkZWYge2ltcG9ydCgncHJvcGVydHktaW5mb3JtYXRpb24nKS5JbmZvfSBJbmZvXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdwcm9wZXJ0eS1pbmZvcm1hdGlvbicpLlNjaGVtYX0gU2NoZW1hXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7Q29udGVudCB8IFJvb3R9IE5vZGVcbiAqICAgQW55IGNvbmNyZXRlIGBoYXN0YCBub2RlLlxuICogQHR5cGVkZWYge1Jvb3QgfCBFbGVtZW50fSBIUmVzdWx0XG4gKiAgIFJlc3VsdCBmcm9tIGEgYGhgIChvciBgc2ApIGNhbGwuXG4gKlxuICogQHR5cGVkZWYge3N0cmluZyB8IG51bWJlcn0gSFN0eWxlVmFsdWVcbiAqICAgVmFsdWUgZm9yIGEgQ1NTIHN0eWxlIGZpZWxkLlxuICogQHR5cGVkZWYge1JlY29yZDxzdHJpbmcsIEhTdHlsZVZhbHVlPn0gSFN0eWxlXG4gKiAgIFN1cHBvcnRlZCB2YWx1ZSBvZiBhIGBzdHlsZWAgcHJvcC5cbiAqIEB0eXBlZGVmIHtzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gSFByaW1pdGl2ZVZhbHVlXG4gKiAgIFByaW1pdGl2ZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmcgfCBudW1iZXI+fSBIQXJyYXlWYWx1ZVxuICogICBMaXN0IG9mIHByb3BlcnR5IHZhbHVlcyBmb3Igc3BhY2UtIG9yIGNvbW1hIHNlcGFyYXRlZCB2YWx1ZXMgKHN1Y2ggYXMgYGNsYXNzTmFtZWApLlxuICogQHR5cGVkZWYge0hQcmltaXRpdmVWYWx1ZSB8IEhBcnJheVZhbHVlfSBIUHJvcGVydHlWYWx1ZVxuICogICBQcmltaXRpdmUgdmFsdWUgb3IgbGlzdCB2YWx1ZS5cbiAqIEB0eXBlZGVmIHt7W3Byb3BlcnR5OiBzdHJpbmddOiBIUHJvcGVydHlWYWx1ZSB8IEhTdHlsZX19IEhQcm9wZXJ0aWVzXG4gKiAgIEFjY2VwdGFibGUgdmFsdWUgZm9yIGVsZW1lbnQgcHJvcGVydGllcy5cbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gSFByaW1pdGl2ZUNoaWxkXG4gKiAgIFByaW1pdGl2ZSBjaGlsZHJlbiwgZWl0aGVyIGlnbm9yZWQgKG51bGxpc2gpLCBvciB0dXJuZWQgaW50byB0ZXh0IG5vZGVzLlxuICogQHR5cGVkZWYge0FycmF5PE5vZGUgfCBIUHJpbWl0aXZlQ2hpbGQ+fSBIQXJyYXlDaGlsZFxuICogICBMaXN0IG9mIGNoaWxkcmVuLlxuICogQHR5cGVkZWYge05vZGUgfCBIUHJpbWl0aXZlQ2hpbGQgfCBIQXJyYXlDaGlsZH0gSENoaWxkXG4gKiAgIEFjY2VwdGFibGUgY2hpbGQgdmFsdWUuXG4gKi9cblxuaW1wb3J0IHtmaW5kLCBub3JtYWxpemV9IGZyb20gJ3Byb3BlcnR5LWluZm9ybWF0aW9uJ1xuaW1wb3J0IHtwYXJzZVNlbGVjdG9yfSBmcm9tICdoYXN0LXV0aWwtcGFyc2Utc2VsZWN0b3InXG5pbXBvcnQge3BhcnNlIGFzIHNwYWNlc30gZnJvbSAnc3BhY2Utc2VwYXJhdGVkLXRva2VucydcbmltcG9ydCB7cGFyc2UgYXMgY29tbWFzfSBmcm9tICdjb21tYS1zZXBhcmF0ZWQtdG9rZW5zJ1xuXG5jb25zdCBidXR0b25UeXBlcyA9IG5ldyBTZXQoWydtZW51JywgJ3N1Ym1pdCcsICdyZXNldCcsICdidXR0b24nXSlcblxuY29uc3Qgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxuLyoqXG4gKiBAcGFyYW0ge1NjaGVtYX0gc2NoZW1hXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFRhZ05hbWVcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gW2Nhc2VTZW5zaXRpdmVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3JlKHNjaGVtYSwgZGVmYXVsdFRhZ05hbWUsIGNhc2VTZW5zaXRpdmUpIHtcbiAgY29uc3QgYWRqdXN0ID0gY2FzZVNlbnNpdGl2ZSAmJiBjcmVhdGVBZGp1c3RNYXAoY2FzZVNlbnNpdGl2ZSlcblxuICBjb25zdCBoID1cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7e1xuICAgICAqICAgKCk6IFJvb3RcbiAgICAgKiAgIChzZWxlY3RvcjogbnVsbCB8IHVuZGVmaW5lZCwgLi4uY2hpbGRyZW46IEFycmF5PEhDaGlsZD4pOiBSb290XG4gICAgICogICAoc2VsZWN0b3I6IHN0cmluZywgcHJvcGVydGllcz86IEhQcm9wZXJ0aWVzLCAuLi5jaGlsZHJlbjogQXJyYXk8SENoaWxkPik6IEVsZW1lbnRcbiAgICAgKiAgIChzZWxlY3Rvcjogc3RyaW5nLCAuLi5jaGlsZHJlbjogQXJyYXk8SENoaWxkPik6IEVsZW1lbnRcbiAgICAgKiB9fVxuICAgICAqL1xuICAgIChcbiAgICAgIC8qKlxuICAgICAgICogSHlwZXJzY3JpcHQgY29tcGF0aWJsZSBEU0wgZm9yIGNyZWF0aW5nIHZpcnR1YWwgaGFzdCB0cmVlcy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IFtzZWxlY3Rvcl1cbiAgICAgICAqIEBwYXJhbSB7SFByb3BlcnRpZXMgfCBIQ2hpbGR9IFtwcm9wZXJ0aWVzXVxuICAgICAgICogQHBhcmFtIHtBcnJheTxIQ2hpbGQ+fSBjaGlsZHJlblxuICAgICAgICogQHJldHVybnMge0hSZXN1bHR9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIChzZWxlY3RvciwgcHJvcGVydGllcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTFcbiAgICAgICAgLyoqIEB0eXBlIHtIUmVzdWx0fSAqL1xuICAgICAgICBsZXQgbm9kZVxuXG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gdW5kZWZpbmVkIHx8IHNlbGVjdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgbm9kZSA9IHt0eXBlOiAncm9vdCcsIGNoaWxkcmVuOiBbXX1cbiAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFByb3BlcnRpZXMgYXJlIG5vdCBzdXBwb3J0ZWQgZm9yIHJvb3RzLlxuICAgICAgICAgIGNoaWxkcmVuLnVuc2hpZnQocHJvcGVydGllcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlID0gcGFyc2VTZWxlY3RvcihzZWxlY3RvciwgZGVmYXVsdFRhZ05hbWUpXG4gICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBuYW1lLlxuICAgICAgICAgIG5vZGUudGFnTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgaWYgKGFkanVzdCAmJiBvd24uY2FsbChhZGp1c3QsIG5vZGUudGFnTmFtZSkpIHtcbiAgICAgICAgICAgIG5vZGUudGFnTmFtZSA9IGFkanVzdFtub2RlLnRhZ05hbWVdXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSGFuZGxlIHByb3BzLlxuICAgICAgICAgIGlmIChpc1Byb3BlcnRpZXMocHJvcGVydGllcywgbm9kZS50YWdOYW1lKSkge1xuICAgICAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgICAgICBsZXQga2V5XG5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgaWYgKG93bi5jYWxsKHByb3BlcnRpZXMsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGBub2RlLnByb3BlcnRpZXNgIGlzIHNldC5cbiAgICAgICAgICAgICAgICBhZGRQcm9wZXJ0eShzY2hlbWEsIG5vZGUucHJvcGVydGllcywga2V5LCBwcm9wZXJ0aWVzW2tleV0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hpbGRyZW4udW5zaGlmdChwcm9wZXJ0aWVzKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBjaGlsZHJlbi5cbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICBhZGRDaGlsZChub2RlLmNoaWxkcmVuLCBjaGlsZHJlbltpbmRleF0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnZWxlbWVudCcgJiYgbm9kZS50YWdOYW1lID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgICAgbm9kZS5jb250ZW50ID0ge3R5cGU6ICdyb290JywgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW59XG4gICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFtdXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfVxuICAgIClcblxuICByZXR1cm4gaFxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFByb3BlcnRpZXMgfCBIQ2hpbGR9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge3ZhbHVlIGlzIEhQcm9wZXJ0aWVzfVxuICovXG5mdW5jdGlvbiBpc1Byb3BlcnRpZXModmFsdWUsIG5hbWUpIHtcbiAgaWYgKFxuICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgdmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHxcbiAgICBBcnJheS5pc0FycmF5KHZhbHVlKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChuYW1lID09PSAnaW5wdXQnIHx8ICF2YWx1ZS50eXBlIHx8IHR5cGVvZiB2YWx1ZS50eXBlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoJ2NoaWxkcmVuJyBpbiB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlLmNoaWxkcmVuKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKG5hbWUgPT09ICdidXR0b24nKSB7XG4gICAgcmV0dXJuIGJ1dHRvblR5cGVzLmhhcyh2YWx1ZS50eXBlLnRvTG93ZXJDYXNlKCkpXG4gIH1cblxuICByZXR1cm4gISgndmFsdWUnIGluIHZhbHVlKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U2NoZW1hfSBzY2hlbWFcbiAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHtIU3R5bGUgfCBIUHJvcGVydHlWYWx1ZX0gdmFsdWVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBhZGRQcm9wZXJ0eShzY2hlbWEsIHByb3BlcnRpZXMsIGtleSwgdmFsdWUpIHtcbiAgY29uc3QgaW5mbyA9IGZpbmQoc2NoZW1hLCBrZXkpXG4gIGxldCBpbmRleCA9IC0xXG4gIC8qKiBAdHlwZSB7SFByb3BlcnR5VmFsdWV9ICovXG4gIGxldCByZXN1bHRcblxuICAvLyBJZ25vcmUgbnVsbGlzaCBhbmQgTmFOIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgLy8gSWdub3JlIE5hTi5cbiAgICBpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuXG5cbiAgICByZXN1bHQgPSB2YWx1ZVxuICB9XG4gIC8vIEJvb2xlYW5zLlxuICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJlc3VsdCA9IHZhbHVlXG4gIH1cbiAgLy8gSGFuZGxlIGxpc3QgdmFsdWVzLlxuICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGluZm8uc3BhY2VTZXBhcmF0ZWQpIHtcbiAgICAgIHJlc3VsdCA9IHNwYWNlcyh2YWx1ZSlcbiAgICB9IGVsc2UgaWYgKGluZm8uY29tbWFTZXBhcmF0ZWQpIHtcbiAgICAgIHJlc3VsdCA9IGNvbW1hcyh2YWx1ZSlcbiAgICB9IGVsc2UgaWYgKGluZm8uY29tbWFPclNwYWNlU2VwYXJhdGVkKSB7XG4gICAgICByZXN1bHQgPSBzcGFjZXMoY29tbWFzKHZhbHVlKS5qb2luKCcgJykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHBhcnNlUHJpbWl0aXZlKGluZm8sIGluZm8ucHJvcGVydHksIHZhbHVlKVxuICAgIH1cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJlc3VsdCA9IHZhbHVlLmNvbmNhdCgpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gaW5mby5wcm9wZXJ0eSA9PT0gJ3N0eWxlJyA/IHN0eWxlKHZhbHVlKSA6IFN0cmluZyh2YWx1ZSlcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAvKiogQHR5cGUge0FycmF5PHN0cmluZyB8IG51bWJlcj59ICovXG4gICAgY29uc3QgZmluYWxSZXN1bHQgPSBbXVxuXG4gICAgd2hpbGUgKCsraW5kZXggPCByZXN1bHQubGVuZ3RoKSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEFzc3VtZSBubyBib29sZWFucyBpbiBhcnJheS5cbiAgICAgIGZpbmFsUmVzdWx0W2luZGV4XSA9IHBhcnNlUHJpbWl0aXZlKGluZm8sIGluZm8ucHJvcGVydHksIHJlc3VsdFtpbmRleF0pXG4gICAgfVxuXG4gICAgcmVzdWx0ID0gZmluYWxSZXN1bHRcbiAgfVxuXG4gIC8vIENsYXNzIG5hbWVzICh3aGljaCBjYW4gYmUgYWRkZWQgYm90aCBvbiB0aGUgYHNlbGVjdG9yYCBhbmQgaGVyZSkuXG4gIGlmIChpbmZvLnByb3BlcnR5ID09PSAnY2xhc3NOYW1lJyAmJiBBcnJheS5pc0FycmF5KHByb3BlcnRpZXMuY2xhc3NOYW1lKSkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgQXNzdW1lIG5vIGJvb2xlYW5zIGluIGBjbGFzc05hbWVgLlxuICAgIHJlc3VsdCA9IHByb3BlcnRpZXMuY2xhc3NOYW1lLmNvbmNhdChyZXN1bHQpXG4gIH1cblxuICBwcm9wZXJ0aWVzW2luZm8ucHJvcGVydHldID0gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheTxDb250ZW50Pn0gbm9kZXNcbiAqIEBwYXJhbSB7SENoaWxkfSB2YWx1ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGFkZENoaWxkKG5vZGVzLCB2YWx1ZSkge1xuICBsZXQgaW5kZXggPSAtMVxuXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgLy8gRW1wdHkuXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgbm9kZXMucHVzaCh7dHlwZTogJ3RleHQnLCB2YWx1ZTogU3RyaW5nKHZhbHVlKX0pXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB3aGlsZSAoKytpbmRleCA8IHZhbHVlLmxlbmd0aCkge1xuICAgICAgYWRkQ2hpbGQobm9kZXMsIHZhbHVlW2luZGV4XSlcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAndHlwZScgaW4gdmFsdWUpIHtcbiAgICBpZiAodmFsdWUudHlwZSA9PT0gJ3Jvb3QnKSB7XG4gICAgICBhZGRDaGlsZChub2RlcywgdmFsdWUuY2hpbGRyZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGVzLnB1c2godmFsdWUpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbm9kZSwgbm9kZXMsIG9yIHN0cmluZywgZ290IGAnICsgdmFsdWUgKyAnYCcpXG4gIH1cbn1cblxuLyoqXG4gKiBQYXJzZSBhIHNpbmdsZSBwcmltaXRpdmVzLlxuICpcbiAqIEBwYXJhbSB7SW5mb30gaW5mb1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFByaW1pdGl2ZVZhbHVlfSB2YWx1ZVxuICogQHJldHVybnMge0hQcmltaXRpdmVWYWx1ZX1cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcmltaXRpdmUoaW5mbywgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoaW5mby5udW1iZXIgJiYgdmFsdWUgJiYgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSkge1xuICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSlcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoaW5mby5ib29sZWFuIHx8IGluZm8ub3ZlcmxvYWRlZEJvb2xlYW4pICYmXG4gICAgICAodmFsdWUgPT09ICcnIHx8IG5vcm1hbGl6ZSh2YWx1ZSkgPT09IG5vcm1hbGl6ZShuYW1lKSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogU2VyaWFsaXplIGEgYHN0eWxlYCBvYmplY3QgYXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtIU3R5bGV9IHZhbHVlXG4gKiAgIFN0eWxlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIENTUyBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHN0eWxlKHZhbHVlKSB7XG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gIGxldCBrZXlcblxuICBmb3IgKGtleSBpbiB2YWx1ZSkge1xuICAgIGlmIChvd24uY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goW2tleSwgdmFsdWVba2V5XV0uam9pbignOiAnKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJzsgJylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBtYXAgdG8gYWRqdXN0IGNhc2luZy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHZhbHVlc1xuICogICBMaXN0IG9mIHByb3Blcmx5IGNhc2VkIGtleXMuXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgc3RyaW5nPn1cbiAqICAgTWFwIG9mIGxvd2VyY2FzZSBrZXlzIHRvIHVwcGVyY2FzZSBrZXlzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBZGp1c3RNYXAodmFsdWVzKSB7XG4gIC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgc3RyaW5nPn0gKi9cbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgbGV0IGluZGV4ID0gLTFcblxuICB3aGlsZSAoKytpbmRleCA8IHZhbHVlcy5sZW5ndGgpIHtcbiAgICByZXN1bHRbdmFsdWVzW2luZGV4XS50b0xvd2VyQ2FzZSgpXSA9IHZhbHVlc1tpbmRleF1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/core.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/hastscript/lib/html.js":
/*!*********************************************!*\
  !*** ./node_modules/hastscript/lib/html.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   h: () => (/* binding */ h)\n/* harmony export */ });\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/index.js\");\n/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ \"(ssr)/./node_modules/hastscript/lib/core.js\");\n/**\n * @typedef {import('./core.js').HChild} Child\n *   Acceptable child value.\n * @typedef {import('./core.js').HProperties} Properties\n *   Acceptable value for element properties.\n * @typedef {import('./core.js').HResult} Result\n *   Result from a `h` (or `s`) call.\n *\n * @typedef {import('./jsx-classic.js').Element} h.JSX.Element\n * @typedef {import('./jsx-classic.js').IntrinsicAttributes} h.JSX.IntrinsicAttributes\n * @typedef {import('./jsx-classic.js').IntrinsicElements} h.JSX.IntrinsicElements\n * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} h.JSX.ElementChildrenAttribute\n */\n\n\n\n\nconst h = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.core)(property_information__WEBPACK_IMPORTED_MODULE_1__.html, 'div')\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvaHRtbC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLGFBQWEsNEJBQTRCO0FBQ3pDO0FBQ0EsYUFBYSxpQ0FBaUM7QUFDOUM7QUFDQSxhQUFhLDZCQUE2QjtBQUMxQztBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsYUFBYSxnREFBZ0Q7QUFDN0QsYUFBYSw4Q0FBOEM7QUFDM0QsYUFBYSxxREFBcUQ7QUFDbEU7O0FBRXlDO0FBQ1g7O0FBRXZCLFVBQVUsOENBQUksQ0FBQyxzREFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL2xldHR5Y29kZS1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9oYXN0c2NyaXB0L2xpYi9odG1sLmpzPzBmNGIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NvcmUuanMnKS5IQ2hpbGR9IENoaWxkXG4gKiAgIEFjY2VwdGFibGUgY2hpbGQgdmFsdWUuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NvcmUuanMnKS5IUHJvcGVydGllc30gUHJvcGVydGllc1xuICogICBBY2NlcHRhYmxlIHZhbHVlIGZvciBlbGVtZW50IHByb3BlcnRpZXMuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NvcmUuanMnKS5IUmVzdWx0fSBSZXN1bHRcbiAqICAgUmVzdWx0IGZyb20gYSBgaGAgKG9yIGBzYCkgY2FsbC5cbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuRWxlbWVudH0gaC5KU1guRWxlbWVudFxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9qc3gtY2xhc3NpYy5qcycpLkludHJpbnNpY0F0dHJpYnV0ZXN9IGguSlNYLkludHJpbnNpY0F0dHJpYnV0ZXNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanN4LWNsYXNzaWMuanMnKS5JbnRyaW5zaWNFbGVtZW50c30gaC5KU1guSW50cmluc2ljRWxlbWVudHNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanN4LWNsYXNzaWMuanMnKS5FbGVtZW50Q2hpbGRyZW5BdHRyaWJ1dGV9IGguSlNYLkVsZW1lbnRDaGlsZHJlbkF0dHJpYnV0ZVxuICovXG5cbmltcG9ydCB7aHRtbH0gZnJvbSAncHJvcGVydHktaW5mb3JtYXRpb24nXG5pbXBvcnQge2NvcmV9IGZyb20gJy4vY29yZS5qcydcblxuZXhwb3J0IGNvbnN0IGggPSBjb3JlKGh0bWwsICdkaXYnKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/html.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js":
/*!*********************************************************************!*\
  !*** ./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   svgCaseSensitiveTagNames: () => (/* binding */ svgCaseSensitiveTagNames)\n/* harmony export */ });\nconst svgCaseSensitiveTagNames = [\n  'altGlyph',\n  'altGlyphDef',\n  'altGlyphItem',\n  'animateColor',\n  'animateMotion',\n  'animateTransform',\n  'clipPath',\n  'feBlend',\n  'feColorMatrix',\n  'feComponentTransfer',\n  'feComposite',\n  'feConvolveMatrix',\n  'feDiffuseLighting',\n  'feDisplacementMap',\n  'feDistantLight',\n  'feDropShadow',\n  'feFlood',\n  'feFuncA',\n  'feFuncB',\n  'feFuncG',\n  'feFuncR',\n  'feGaussianBlur',\n  'feImage',\n  'feMerge',\n  'feMergeNode',\n  'feMorphology',\n  'feOffset',\n  'fePointLight',\n  'feSpecularLighting',\n  'feSpotLight',\n  'feTile',\n  'feTurbulence',\n  'foreignObject',\n  'glyphRef',\n  'linearGradient',\n  'radialGradient',\n  'solidColor',\n  'textArea',\n  'textPath'\n]\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvc3ZnLWNhc2Utc2Vuc2l0aXZlLXRhZy1uYW1lcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2xldHR5Y29kZS1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9oYXN0c2NyaXB0L2xpYi9zdmctY2FzZS1zZW5zaXRpdmUtdGFnLW5hbWVzLmpzP2U3ZGIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHN2Z0Nhc2VTZW5zaXRpdmVUYWdOYW1lcyA9IFtcbiAgJ2FsdEdseXBoJyxcbiAgJ2FsdEdseXBoRGVmJyxcbiAgJ2FsdEdseXBoSXRlbScsXG4gICdhbmltYXRlQ29sb3InLFxuICAnYW5pbWF0ZU1vdGlvbicsXG4gICdhbmltYXRlVHJhbnNmb3JtJyxcbiAgJ2NsaXBQYXRoJyxcbiAgJ2ZlQmxlbmQnLFxuICAnZmVDb2xvck1hdHJpeCcsXG4gICdmZUNvbXBvbmVudFRyYW5zZmVyJyxcbiAgJ2ZlQ29tcG9zaXRlJyxcbiAgJ2ZlQ29udm9sdmVNYXRyaXgnLFxuICAnZmVEaWZmdXNlTGlnaHRpbmcnLFxuICAnZmVEaXNwbGFjZW1lbnRNYXAnLFxuICAnZmVEaXN0YW50TGlnaHQnLFxuICAnZmVEcm9wU2hhZG93JyxcbiAgJ2ZlRmxvb2QnLFxuICAnZmVGdW5jQScsXG4gICdmZUZ1bmNCJyxcbiAgJ2ZlRnVuY0cnLFxuICAnZmVGdW5jUicsXG4gICdmZUdhdXNzaWFuQmx1cicsXG4gICdmZUltYWdlJyxcbiAgJ2ZlTWVyZ2UnLFxuICAnZmVNZXJnZU5vZGUnLFxuICAnZmVNb3JwaG9sb2d5JyxcbiAgJ2ZlT2Zmc2V0JyxcbiAgJ2ZlUG9pbnRMaWdodCcsXG4gICdmZVNwZWN1bGFyTGlnaHRpbmcnLFxuICAnZmVTcG90TGlnaHQnLFxuICAnZmVUaWxlJyxcbiAgJ2ZlVHVyYnVsZW5jZScsXG4gICdmb3JlaWduT2JqZWN0JyxcbiAgJ2dseXBoUmVmJyxcbiAgJ2xpbmVhckdyYWRpZW50JyxcbiAgJ3JhZGlhbEdyYWRpZW50JyxcbiAgJ3NvbGlkQ29sb3InLFxuICAndGV4dEFyZWEnLFxuICAndGV4dFBhdGgnXG5dXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/hastscript/lib/svg.js":
/*!********************************************!*\
  !*** ./node_modules/hastscript/lib/svg.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   s: () => (/* binding */ s)\n/* harmony export */ });\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/index.js\");\n/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ \"(ssr)/./node_modules/hastscript/lib/core.js\");\n/* harmony import */ var _svg_case_sensitive_tag_names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svg-case-sensitive-tag-names.js */ \"(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js\");\n/**\n * @typedef {import('./core.js').HChild} Child\n *   Acceptable child value.\n * @typedef {import('./core.js').HProperties} Properties\n *   Acceptable value for element properties.\n * @typedef {import('./core.js').HResult} Result\n *   Result from a `h` (or `s`) call.\n *\n * @typedef {import('./jsx-classic.js').Element} s.JSX.Element\n * @typedef {import('./jsx-classic.js').IntrinsicAttributes} s.JSX.IntrinsicAttributes\n * @typedef {import('./jsx-classic.js').IntrinsicElements} s.JSX.IntrinsicElements\n * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} s.JSX.ElementChildrenAttribute\n */\n\n\n\n\n\nconst s = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.core)(property_information__WEBPACK_IMPORTED_MODULE_1__.svg, 'g', _svg_case_sensitive_tag_names_js__WEBPACK_IMPORTED_MODULE_2__.svgCaseSensitiveTagNames)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvc3ZnLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsNEJBQTRCO0FBQ3pDO0FBQ0EsYUFBYSxpQ0FBaUM7QUFDOUM7QUFDQSxhQUFhLDZCQUE2QjtBQUMxQztBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsYUFBYSxnREFBZ0Q7QUFDN0QsYUFBYSw4Q0FBOEM7QUFDM0QsYUFBYSxxREFBcUQ7QUFDbEU7O0FBRXdDO0FBQ1Y7QUFDNEM7O0FBRW5FLFVBQVUsOENBQUksQ0FBQyxxREFBRyxPQUFPLHNGQUF3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2xldHR5Y29kZS1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9oYXN0c2NyaXB0L2xpYi9zdmcuanM/NmNlZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vY29yZS5qcycpLkhDaGlsZH0gQ2hpbGRcbiAqICAgQWNjZXB0YWJsZSBjaGlsZCB2YWx1ZS5cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vY29yZS5qcycpLkhQcm9wZXJ0aWVzfSBQcm9wZXJ0aWVzXG4gKiAgIEFjY2VwdGFibGUgdmFsdWUgZm9yIGVsZW1lbnQgcHJvcGVydGllcy5cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vY29yZS5qcycpLkhSZXN1bHR9IFJlc3VsdFxuICogICBSZXN1bHQgZnJvbSBhIGBoYCAob3IgYHNgKSBjYWxsLlxuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanN4LWNsYXNzaWMuanMnKS5FbGVtZW50fSBzLkpTWC5FbGVtZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuSW50cmluc2ljQXR0cmlidXRlc30gcy5KU1guSW50cmluc2ljQXR0cmlidXRlc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9qc3gtY2xhc3NpYy5qcycpLkludHJpbnNpY0VsZW1lbnRzfSBzLkpTWC5JbnRyaW5zaWNFbGVtZW50c1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9qc3gtY2xhc3NpYy5qcycpLkVsZW1lbnRDaGlsZHJlbkF0dHJpYnV0ZX0gcy5KU1guRWxlbWVudENoaWxkcmVuQXR0cmlidXRlXG4gKi9cblxuaW1wb3J0IHtzdmd9IGZyb20gJ3Byb3BlcnR5LWluZm9ybWF0aW9uJ1xuaW1wb3J0IHtjb3JlfSBmcm9tICcuL2NvcmUuanMnXG5pbXBvcnQge3N2Z0Nhc2VTZW5zaXRpdmVUYWdOYW1lc30gZnJvbSAnLi9zdmctY2FzZS1zZW5zaXRpdmUtdGFnLW5hbWVzLmpzJ1xuXG5leHBvcnQgY29uc3QgcyA9IGNvcmUoc3ZnLCAnZycsIHN2Z0Nhc2VTZW5zaXRpdmVUYWdOYW1lcylcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/svg.js\n");

/***/ })

};
;