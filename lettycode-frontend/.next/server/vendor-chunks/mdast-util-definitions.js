"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-definitions";
exports.ids = ["vendor-chunks/mdast-util-definitions"];
exports.modules = {

/***/ "(ssr)/./node_modules/mdast-util-definitions/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/mdast-util-definitions/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   definitions: () => (/* binding */ definitions)\n/* harmony export */ });\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ \"(ssr)/./node_modules/unist-util-visit/lib/index.js\");\n/**\n * @typedef {import('mdast').Root} Root\n * @typedef {import('mdast').Content} Content\n * @typedef {import('mdast').Definition} Definition\n */\n\n/**\n * @typedef {Root | Content} Node\n *\n * @callback GetDefinition\n *   Get a definition by identifier.\n * @param {string | null | undefined} [identifier]\n *   Identifier of definition.\n * @returns {Definition | null}\n *   Definition corresponding to `identifier` or `null`.\n */\n\n\n\nconst own = {}.hasOwnProperty\n\n/**\n * Find definitions in `tree`.\n *\n * Uses CommonMark precedence, which means that earlier definitions are\n * preferred over duplicate later definitions.\n *\n * @param {Node} tree\n *   Tree to check.\n * @returns {GetDefinition}\n *   Getter.\n */\nfunction definitions(tree) {\n  /** @type {Record<string, Definition>} */\n  const cache = Object.create(null)\n\n  if (!tree || !tree.type) {\n    throw new Error('mdast-util-definitions expected node')\n  }\n\n  (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_0__.visit)(tree, 'definition', (definition) => {\n    const id = clean(definition.identifier)\n    if (id && !own.call(cache, id)) {\n      cache[id] = definition\n    }\n  })\n\n  return definition\n\n  /** @type {GetDefinition} */\n  function definition(identifier) {\n    const id = clean(identifier)\n    // To do: next major: return `undefined` when not found.\n    return id && own.call(cache, id) ? cache[id] : null\n  }\n}\n\n/**\n * @param {string | null | undefined} [value]\n * @returns {string}\n */\nfunction clean(value) {\n  return String(value || '').toUpperCase()\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1kZWZpbml0aW9ucy9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsNEJBQTRCO0FBQ3pDOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsV0FBVywyQkFBMkI7QUFDdEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFc0M7O0FBRXRDLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQLGFBQWEsNEJBQTRCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLHVEQUFLO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBLGFBQWEsZUFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZXR0eWNvZGUtZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1kZWZpbml0aW9ucy9saWIvaW5kZXguanM/ODQwYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuUm9vdH0gUm9vdFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5Db250ZW50fSBDb250ZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLkRlZmluaXRpb259IERlZmluaXRpb25cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtSb290IHwgQ29udGVudH0gTm9kZVxuICpcbiAqIEBjYWxsYmFjayBHZXREZWZpbml0aW9uXG4gKiAgIEdldCBhIGRlZmluaXRpb24gYnkgaWRlbnRpZmllci5cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2lkZW50aWZpZXJdXG4gKiAgIElkZW50aWZpZXIgb2YgZGVmaW5pdGlvbi5cbiAqIEByZXR1cm5zIHtEZWZpbml0aW9uIHwgbnVsbH1cbiAqICAgRGVmaW5pdGlvbiBjb3JyZXNwb25kaW5nIHRvIGBpZGVudGlmaWVyYCBvciBgbnVsbGAuXG4gKi9cblxuaW1wb3J0IHt2aXNpdH0gZnJvbSAndW5pc3QtdXRpbC12aXNpdCdcblxuY29uc3Qgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxuLyoqXG4gKiBGaW5kIGRlZmluaXRpb25zIGluIGB0cmVlYC5cbiAqXG4gKiBVc2VzIENvbW1vbk1hcmsgcHJlY2VkZW5jZSwgd2hpY2ggbWVhbnMgdGhhdCBlYXJsaWVyIGRlZmluaXRpb25zIGFyZVxuICogcHJlZmVycmVkIG92ZXIgZHVwbGljYXRlIGxhdGVyIGRlZmluaXRpb25zLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gdHJlZVxuICogICBUcmVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge0dldERlZmluaXRpb259XG4gKiAgIEdldHRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluaXRpb25zKHRyZWUpIHtcbiAgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBEZWZpbml0aW9uPn0gKi9cbiAgY29uc3QgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgaWYgKCF0cmVlIHx8ICF0cmVlLnR5cGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21kYXN0LXV0aWwtZGVmaW5pdGlvbnMgZXhwZWN0ZWQgbm9kZScpXG4gIH1cblxuICB2aXNpdCh0cmVlLCAnZGVmaW5pdGlvbicsIChkZWZpbml0aW9uKSA9PiB7XG4gICAgY29uc3QgaWQgPSBjbGVhbihkZWZpbml0aW9uLmlkZW50aWZpZXIpXG4gICAgaWYgKGlkICYmICFvd24uY2FsbChjYWNoZSwgaWQpKSB7XG4gICAgICBjYWNoZVtpZF0gPSBkZWZpbml0aW9uXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBkZWZpbml0aW9uXG5cbiAgLyoqIEB0eXBlIHtHZXREZWZpbml0aW9ufSAqL1xuICBmdW5jdGlvbiBkZWZpbml0aW9uKGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBpZCA9IGNsZWFuKGlkZW50aWZpZXIpXG4gICAgLy8gVG8gZG86IG5leHQgbWFqb3I6IHJldHVybiBgdW5kZWZpbmVkYCB3aGVuIG5vdCBmb3VuZC5cbiAgICByZXR1cm4gaWQgJiYgb3duLmNhbGwoY2FjaGUsIGlkKSA/IGNhY2hlW2lkXSA6IG51bGxcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3ZhbHVlXVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2xlYW4odmFsdWUpIHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCAnJykudG9VcHBlckNhc2UoKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-definitions/lib/index.js\n");

/***/ })

};
;