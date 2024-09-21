"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-extension-gfm-tagfilter";
exports.ids = ["vendor-chunks/micromark-extension-gfm-tagfilter"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-extension-gfm-tagfilter/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/micromark-extension-gfm-tagfilter/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmTagfilterHtml: () => (/* binding */ gfmTagfilterHtml)\n/* harmony export */ });\n/**\n * @typedef {import('micromark-util-types').CompileContext} CompileContext\n * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension\n * @typedef {import('micromark-util-types').Token} Token\n */\n\n// An opening or closing tag start, followed by a case-insensitive specific tag name,\n// followed by HTML whitespace, a greater than, or a slash.\nconst reFlow =\n  /<(\\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\\t\\n\\f\\r />])/gi\n\n// As HTML (text) parses tags separately (and very strictly), we don’t need to be\n// global.\nconst reText = new RegExp('^' + reFlow.source, 'i')\n\n/**\n * Extension for `micromark` that can be passed in `htmlExtensions`, to\n * support GitHub’s weird and useless tagfilter when serializing to HTML.\n *\n * @type {HtmlExtension}\n */\nconst gfmTagfilterHtml = {\n  exit: {\n    htmlFlowData(token) {\n      exitHtmlData.call(this, token, reFlow)\n    },\n    htmlTextData(token) {\n      exitHtmlData.call(this, token, reText)\n    }\n  }\n}\n\n/**\n * @this {CompileContext}\n * @param {Token} token\n * @param {RegExp} filter\n */\nfunction exitHtmlData(token, filter) {\n  let value = this.sliceSerialize(token)\n\n  if (this.options.allowDangerousHtml) {\n    value = value.replace(filter, '&lt;$1$2')\n  }\n\n  this.raw(this.encode(value))\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLWV4dGVuc2lvbi1nZm0tdGFnZmlsdGVyL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLGFBQWEsK0NBQStDO0FBQzVELGFBQWEsOENBQThDO0FBQzNELGFBQWEsc0NBQXNDO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2xldHR5Y29kZS1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9taWNyb21hcmstZXh0ZW5zaW9uLWdmbS10YWdmaWx0ZXIvaW5kZXguanM/YjQxYSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuQ29tcGlsZUNvbnRleHR9IENvbXBpbGVDb250ZXh0XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLkh0bWxFeHRlbnNpb259IEh0bWxFeHRlbnNpb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuVG9rZW59IFRva2VuXG4gKi9cblxuLy8gQW4gb3BlbmluZyBvciBjbG9zaW5nIHRhZyBzdGFydCwgZm9sbG93ZWQgYnkgYSBjYXNlLWluc2Vuc2l0aXZlIHNwZWNpZmljIHRhZyBuYW1lLFxuLy8gZm9sbG93ZWQgYnkgSFRNTCB3aGl0ZXNwYWNlLCBhIGdyZWF0ZXIgdGhhbiwgb3IgYSBzbGFzaC5cbmNvbnN0IHJlRmxvdyA9XG4gIC88KFxcLz8pKGlmcmFtZXxub2VtYmVkfG5vZnJhbWVzfHBsYWludGV4dHxzY3JpcHR8c3R5bGV8dGl0bGV8dGV4dGFyZWF8eG1wKSg/PVtcXHRcXG5cXGZcXHIgLz5dKS9naVxuXG4vLyBBcyBIVE1MICh0ZXh0KSBwYXJzZXMgdGFncyBzZXBhcmF0ZWx5IChhbmQgdmVyeSBzdHJpY3RseSksIHdlIGRvbuKAmXQgbmVlZCB0byBiZVxuLy8gZ2xvYmFsLlxuY29uc3QgcmVUZXh0ID0gbmV3IFJlZ0V4cCgnXicgKyByZUZsb3cuc291cmNlLCAnaScpXG5cbi8qKlxuICogRXh0ZW5zaW9uIGZvciBgbWljcm9tYXJrYCB0aGF0IGNhbiBiZSBwYXNzZWQgaW4gYGh0bWxFeHRlbnNpb25zYCwgdG9cbiAqIHN1cHBvcnQgR2l0SHVi4oCZcyB3ZWlyZCBhbmQgdXNlbGVzcyB0YWdmaWx0ZXIgd2hlbiBzZXJpYWxpemluZyB0byBIVE1MLlxuICpcbiAqIEB0eXBlIHtIdG1sRXh0ZW5zaW9ufVxuICovXG5leHBvcnQgY29uc3QgZ2ZtVGFnZmlsdGVySHRtbCA9IHtcbiAgZXhpdDoge1xuICAgIGh0bWxGbG93RGF0YSh0b2tlbikge1xuICAgICAgZXhpdEh0bWxEYXRhLmNhbGwodGhpcywgdG9rZW4sIHJlRmxvdylcbiAgICB9LFxuICAgIGh0bWxUZXh0RGF0YSh0b2tlbikge1xuICAgICAgZXhpdEh0bWxEYXRhLmNhbGwodGhpcywgdG9rZW4sIHJlVGV4dClcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAcGFyYW0ge1Rva2VufSB0b2tlblxuICogQHBhcmFtIHtSZWdFeHB9IGZpbHRlclxuICovXG5mdW5jdGlvbiBleGl0SHRtbERhdGEodG9rZW4sIGZpbHRlcikge1xuICBsZXQgdmFsdWUgPSB0aGlzLnNsaWNlU2VyaWFsaXplKHRva2VuKVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dEYW5nZXJvdXNIdG1sKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKGZpbHRlciwgJyZsdDskMSQyJylcbiAgfVxuXG4gIHRoaXMucmF3KHRoaXMuZW5jb2RlKHZhbHVlKSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-extension-gfm-tagfilter/index.js\n");

/***/ })

};
;