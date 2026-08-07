/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/design-link/route";
exports.ids = ["app/api/design-link/route"];
exports.modules = {

/***/ "(rsc)/./app/api/design-link/route.ts":
/*!**************************************!*\
  !*** ./app/api/design-link/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/**\n * POST /api/design-link — save a configuration, returns { shareableId }\n * GET /api/design-link/[id] — retrieve saved configuration\n * D-5: No account creation required\n */ \n\n\nconst DesignLinkSchema = zod__WEBPACK_IMPORTED_MODULE_2__.object({\n    fileUrl: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1),\n    mouldingId: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1),\n    matId: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1),\n    glazingId: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1),\n    mountId: zod__WEBPACK_IMPORTED_MODULE_2__.string().optional().nullable(),\n    sessionId: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1)\n});\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const parsed = DesignLinkSchema.safeParse(body);\n        if (!parsed.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid input',\n                details: parsed.error.issues\n            }, {\n                status: 400\n            });\n        }\n        const { fileUrl, mouldingId, matId, glazingId, mountId, sessionId } = parsed.data;\n        const configuration = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.configuration.create({\n            data: {\n                fileUrl,\n                mouldingId,\n                matId,\n                glazingId,\n                mountId: mountId ?? null,\n                sessionId\n            }\n        });\n        const siteUrl = \"http://localhost:3000\" ?? 0;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            shareableId: configuration.id,\n            shareableUrl: `${siteUrl}/configure?design=${configuration.id}`\n        });\n    } catch (err) {\n        console.error('[POST /api/design-link]', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to save design'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Rlc2lnbi1saW5rL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztDQUlDLEdBRXVEO0FBQ2hDO0FBQ007QUFFOUIsTUFBTUcsbUJBQW1CRix1Q0FBUSxDQUFDO0lBQ2hDSSxTQUFTSix1Q0FBUSxHQUFHTSxHQUFHLENBQUM7SUFDeEJDLFlBQVlQLHVDQUFRLEdBQUdNLEdBQUcsQ0FBQztJQUMzQkUsT0FBT1IsdUNBQVEsR0FBR00sR0FBRyxDQUFDO0lBQ3RCRyxXQUFXVCx1Q0FBUSxHQUFHTSxHQUFHLENBQUM7SUFDMUJJLFNBQVNWLHVDQUFRLEdBQUdXLFFBQVEsR0FBR0MsUUFBUTtJQUN2Q0MsV0FBV2IsdUNBQVEsR0FBR00sR0FBRyxDQUFDO0FBQzVCO0FBRU8sZUFBZVEsS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtRQUMzQixNQUFNQyxTQUFTaEIsaUJBQWlCaUIsU0FBUyxDQUFDSDtRQUUxQyxJQUFJLENBQUNFLE9BQU9FLE9BQU8sRUFBRTtZQUNuQixPQUFPckIscURBQVlBLENBQUNrQixJQUFJLENBQ3RCO2dCQUFFSSxPQUFPO2dCQUFpQkMsU0FBU0osT0FBT0csS0FBSyxDQUFDRSxNQUFNO1lBQUMsR0FDdkQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU0sRUFBRXBCLE9BQU8sRUFBRUcsVUFBVSxFQUFFQyxLQUFLLEVBQUVDLFNBQVMsRUFBRUMsT0FBTyxFQUFFRyxTQUFTLEVBQUUsR0FBR0ssT0FBT08sSUFBSTtRQUVqRixNQUFNQyxnQkFBZ0IsTUFBTXpCLHVDQUFFQSxDQUFDeUIsYUFBYSxDQUFDQyxNQUFNLENBQUM7WUFDbERGLE1BQU07Z0JBQ0pyQjtnQkFDQUc7Z0JBQ0FDO2dCQUNBQztnQkFDQUMsU0FBU0EsV0FBVztnQkFDcEJHO1lBQ0Y7UUFDRjtRQUVBLE1BQU1lLFVBQVVDLHVCQUFnQyxJQUFJLENBQXVCO1FBRTNFLE9BQU85QixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUN2QmUsYUFBYU4sY0FBY08sRUFBRTtZQUM3QkMsY0FBYyxHQUFHTixRQUFRLGtCQUFrQixFQUFFRixjQUFjTyxFQUFFLEVBQUU7UUFDakU7SUFDRixFQUFFLE9BQU9FLEtBQUs7UUFDWkMsUUFBUWYsS0FBSyxDQUFDLDJCQUEyQmM7UUFDekMsT0FBT3BDLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDO1lBQUVJLE9BQU87UUFBd0IsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDN0U7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxPbmVEcml2ZVxcRGVza3RvcFxcQkZHXFxGcmFtaW5nLXN0dWRpb1xcYXBwXFxhcGlcXGRlc2lnbi1saW5rXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBPU1QgL2FwaS9kZXNpZ24tbGluayDigJQgc2F2ZSBhIGNvbmZpZ3VyYXRpb24sIHJldHVybnMgeyBzaGFyZWFibGVJZCB9XG4gKiBHRVQgL2FwaS9kZXNpZ24tbGluay9baWRdIOKAlCByZXRyaWV2ZSBzYXZlZCBjb25maWd1cmF0aW9uXG4gKiBELTU6IE5vIGFjY291bnQgY3JlYXRpb24gcmVxdWlyZWRcbiAqL1xuXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJ0AvbGliL2RiJztcblxuY29uc3QgRGVzaWduTGlua1NjaGVtYSA9IHoub2JqZWN0KHtcbiAgZmlsZVVybDogei5zdHJpbmcoKS5taW4oMSksXG4gIG1vdWxkaW5nSWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBtYXRJZDogei5zdHJpbmcoKS5taW4oMSksXG4gIGdsYXppbmdJZDogei5zdHJpbmcoKS5taW4oMSksXG4gIG1vdW50SWQ6IHouc3RyaW5nKCkub3B0aW9uYWwoKS5udWxsYWJsZSgpLFxuICBzZXNzaW9uSWQ6IHouc3RyaW5nKCkubWluKDEpLFxufSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCBwYXJzZWQgPSBEZXNpZ25MaW5rU2NoZW1hLnNhZmVQYXJzZShib2R5KTtcblxuICAgIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0ludmFsaWQgaW5wdXQnLCBkZXRhaWxzOiBwYXJzZWQuZXJyb3IuaXNzdWVzIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBmaWxlVXJsLCBtb3VsZGluZ0lkLCBtYXRJZCwgZ2xhemluZ0lkLCBtb3VudElkLCBzZXNzaW9uSWQgfSA9IHBhcnNlZC5kYXRhO1xuXG4gICAgY29uc3QgY29uZmlndXJhdGlvbiA9IGF3YWl0IGRiLmNvbmZpZ3VyYXRpb24uY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZmlsZVVybCxcbiAgICAgICAgbW91bGRpbmdJZCxcbiAgICAgICAgbWF0SWQsXG4gICAgICAgIGdsYXppbmdJZCxcbiAgICAgICAgbW91bnRJZDogbW91bnRJZCA/PyBudWxsLFxuICAgICAgICBzZXNzaW9uSWQsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2l0ZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHNoYXJlYWJsZUlkOiBjb25maWd1cmF0aW9uLmlkLFxuICAgICAgc2hhcmVhYmxlVXJsOiBgJHtzaXRlVXJsfS9jb25maWd1cmU/ZGVzaWduPSR7Y29uZmlndXJhdGlvbi5pZH1gLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbUE9TVCAvYXBpL2Rlc2lnbi1saW5rXScsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gc2F2ZSBkZXNpZ24nIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJ6IiwiZGIiLCJEZXNpZ25MaW5rU2NoZW1hIiwib2JqZWN0IiwiZmlsZVVybCIsInN0cmluZyIsIm1pbiIsIm1vdWxkaW5nSWQiLCJtYXRJZCIsImdsYXppbmdJZCIsIm1vdW50SWQiLCJvcHRpb25hbCIsIm51bGxhYmxlIiwic2Vzc2lvbklkIiwiUE9TVCIsInJlcSIsImJvZHkiLCJqc29uIiwicGFyc2VkIiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImVycm9yIiwiZGV0YWlscyIsImlzc3VlcyIsInN0YXR1cyIsImRhdGEiLCJjb25maWd1cmF0aW9uIiwiY3JlYXRlIiwic2l0ZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TSVRFX1VSTCIsInNoYXJlYWJsZUlkIiwiaWQiLCJzaGFyZWFibGVVcmwiLCJlcnIiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/design-link/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst db = globalThis.__prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) {\n    globalThis.__prisma = db;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBUzlDLE1BQU1DLEtBQUtDLFdBQVdDLFFBQVEsSUFBSSxJQUFJSCx3REFBWUEsQ0FBQztJQUNqREksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RjtBQUVBLElBQUlBLElBQXFDLEVBQUU7SUFDekNILFdBQVdDLFFBQVEsR0FBR0Y7QUFDeEI7QUFFYyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxPbmVEcml2ZVxcRGVza3RvcFxcQkZHXFxGcmFtaW5nLXN0dWRpb1xcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbi8vIFNpbmdsZXRvbiBwYXR0ZXJuIGZvciBQcmlzbWEgY2xpZW50IOKAlCBwcmV2ZW50cyBjb25uZWN0aW9uIHBvb2wgZXhoYXVzdGlvblxuLy8gaW4gTmV4dC5qcyBob3QtcmVsb2FkIGRldiBlbnZpcm9ubWVudFxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIHZhciBfX3ByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBkYiA9IGdsb2JhbFRoaXMuX19wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCh7XG4gIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBnbG9iYWxUaGlzLl9fcHJpc21hID0gZGI7XG59XG5cbmV4cG9ydCB7IGRiIH07XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZGIiLCJnbG9iYWxUaGlzIiwiX19wcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdesign-link%2Froute&page=%2Fapi%2Fdesign-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdesign-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdesign-link%2Froute&page=%2Fapi%2Fdesign-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdesign-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_design_link_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/design-link/route.ts */ \"(rsc)/./app/api/design-link/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/design-link/route\",\n        pathname: \"/api/design-link\",\n        filename: \"route\",\n        bundlePath: \"app/api/design-link/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\OneDrive\\\\Desktop\\\\BFG\\\\Framing-studio\\\\app\\\\api\\\\design-link\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_design_link_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZkZXNpZ24tbGluayUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZGVzaWduLWxpbmslMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZkZXNpZ24tbGluayUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDQkZHJTVDRnJhbWluZy1zdHVkaW8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNCRkclNUNGcmFtaW5nLXN0dWRpbyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDd0M7QUFDckg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxCRkdcXFxcRnJhbWluZy1zdHVkaW9cXFxcYXBwXFxcXGFwaVxcXFxkZXNpZ24tbGlua1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZGVzaWduLWxpbmsvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9kZXNpZ24tbGlua1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZGVzaWduLWxpbmsvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcQkZHXFxcXEZyYW1pbmctc3R1ZGlvXFxcXGFwcFxcXFxhcGlcXFxcZGVzaWduLWxpbmtcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdesign-link%2Froute&page=%2Fapi%2Fdesign-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdesign-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdesign-link%2Froute&page=%2Fapi%2Fdesign-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdesign-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();