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
exports.id = "app/api/studio-config/route";
exports.ids = ["app/api/studio-config/route"];
exports.modules = {

/***/ "(rsc)/./app/api/studio-config/route.ts":
/*!****************************************!*\
  !*** ./app/api/studio-config/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/**\n * GET /api/studio-config — public read\n * PUT /api/studio-config — admin update (studio-side operation)\n * A-11, D-11: Single config point — never hardcoded in templates\n */ \n\n\nasync function GET() {\n    try {\n        const config = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.studioConfig.findUnique({\n            where: {\n                id: 1\n            }\n        });\n        if (!config) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Studio config not found'\n            }, {\n                status: 404\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(config);\n    } catch (err) {\n        console.error('[GET /api/studio-config]', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to load studio config'\n        }, {\n            status: 500\n        });\n    }\n}\nconst StudioConfigUpdateSchema = zod__WEBPACK_IMPORTED_MODULE_2__.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1).optional(),\n    logoUrl: zod__WEBPACK_IMPORTED_MODULE_2__.string().url().optional(),\n    commissionRatePercent: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(0).max(100).optional(),\n    brandAccentColor: zod__WEBPACK_IMPORTED_MODULE_2__.string().regex(/^#[0-9a-fA-F]{6}$/).optional()\n});\nasync function PUT(req) {\n    try {\n        // Admin-only: in production this would check an admin token/role.\n        // For now, accept a shared admin secret from the Authorization header.\n        const adminSecret = process.env.ADMIN_SECRET;\n        if (adminSecret) {\n            const authHeader = req.headers.get('authorization');\n            if (authHeader !== `Bearer ${adminSecret}`) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'Admin access required'\n                }, {\n                    status: 403\n                });\n            }\n        }\n        const body = await req.json();\n        const parsed = StudioConfigUpdateSchema.safeParse(body);\n        if (!parsed.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid input',\n                details: parsed.error.issues\n            }, {\n                status: 400\n            });\n        }\n        const updated = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.studioConfig.upsert({\n            where: {\n                id: 1\n            },\n            update: parsed.data,\n            create: {\n                id: 1,\n                name: parsed.data.name ?? 'Hollow & Hale',\n                logoUrl: parsed.data.logoUrl ?? '/logo-placeholder.svg',\n                commissionRatePercent: parsed.data.commissionRatePercent ?? 10,\n                brandAccentColor: parsed.data.brandAccentColor ?? '#c8a96e'\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(updated);\n    } catch (err) {\n        console.error('[PUT /api/studio-config]', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to update studio config'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dmVcXERlc2t0b3BcXEJGR1xcRnJhbWluZy1zdHVkaW9cXGFwcFxcYXBpXFxzdHVkaW8tY29uZmlnXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdFVCAvYXBpL3N0dWRpby1jb25maWcg4oCUIHB1YmxpYyByZWFkXG4gKiBQVVQgL2FwaS9zdHVkaW8tY29uZmlnIOKAlCBhZG1pbiB1cGRhdGUgKHN0dWRpby1zaWRlIG9wZXJhdGlvbilcbiAqIEEtMTEsIEQtMTE6IFNpbmdsZSBjb25maWcgcG9pbnQg4oCUIG5ldmVyIGhhcmRjb2RlZCBpbiB0ZW1wbGF0ZXNcbiAqL1xuXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJ0AvbGliL2RiJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb25maWcgPSBhd2FpdCBkYi5zdHVkaW9Db25maWcuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiAxIH0gfSk7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnU3R1ZGlvIGNvbmZpZyBub3QgZm91bmQnIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihjb25maWcpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbR0VUIC9hcGkvc3R1ZGlvLWNvbmZpZ10nLCBlcnIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGxvYWQgc3R1ZGlvIGNvbmZpZycgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG5jb25zdCBTdHVkaW9Db25maWdVcGRhdGVTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDEpLm9wdGlvbmFsKCksXG4gIGxvZ29Vcmw6IHouc3RyaW5nKCkudXJsKCkub3B0aW9uYWwoKSxcbiAgY29tbWlzc2lvblJhdGVQZXJjZW50OiB6Lm51bWJlcigpLm1pbigwKS5tYXgoMTAwKS5vcHRpb25hbCgpLFxuICBicmFuZEFjY2VudENvbG9yOiB6LnN0cmluZygpLnJlZ2V4KC9eI1swLTlhLWZBLUZdezZ9JC8pLm9wdGlvbmFsKCksXG59KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gQWRtaW4tb25seTogaW4gcHJvZHVjdGlvbiB0aGlzIHdvdWxkIGNoZWNrIGFuIGFkbWluIHRva2VuL3JvbGUuXG4gICAgLy8gRm9yIG5vdywgYWNjZXB0IGEgc2hhcmVkIGFkbWluIHNlY3JldCBmcm9tIHRoZSBBdXRob3JpemF0aW9uIGhlYWRlci5cbiAgICBjb25zdCBhZG1pblNlY3JldCA9IHByb2Nlc3MuZW52LkFETUlOX1NFQ1JFVDtcbiAgICBpZiAoYWRtaW5TZWNyZXQpIHtcbiAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSByZXEuaGVhZGVycy5nZXQoJ2F1dGhvcml6YXRpb24nKTtcbiAgICAgIGlmIChhdXRoSGVhZGVyICE9PSBgQmVhcmVyICR7YWRtaW5TZWNyZXR9YCkge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0FkbWluIGFjY2VzcyByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCBwYXJzZWQgPSBTdHVkaW9Db25maWdVcGRhdGVTY2hlbWEuc2FmZVBhcnNlKGJvZHkpO1xuXG4gICAgaWYgKCFwYXJzZWQuc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnSW52YWxpZCBpbnB1dCcsIGRldGFpbHM6IHBhcnNlZC5lcnJvci5pc3N1ZXMgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgZGIuc3R1ZGlvQ29uZmlnLnVwc2VydCh7XG4gICAgICB3aGVyZTogeyBpZDogMSB9LFxuICAgICAgdXBkYXRlOiBwYXJzZWQuZGF0YSxcbiAgICAgIGNyZWF0ZToge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgbmFtZTogcGFyc2VkLmRhdGEubmFtZSA/PyAnSG9sbG93ICYgSGFsZScsXG4gICAgICAgIGxvZ29Vcmw6IHBhcnNlZC5kYXRhLmxvZ29VcmwgPz8gJy9sb2dvLXBsYWNlaG9sZGVyLnN2ZycsXG4gICAgICAgIGNvbW1pc3Npb25SYXRlUGVyY2VudDogcGFyc2VkLmRhdGEuY29tbWlzc2lvblJhdGVQZXJjZW50ID8/IDEwLFxuICAgICAgICBicmFuZEFjY2VudENvbG9yOiBwYXJzZWQuZGF0YS5icmFuZEFjY2VudENvbG9yID8/ICcjYzhhOTZlJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odXBkYXRlZCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tQVVQgL2FwaS9zdHVkaW8tY29uZmlnXScsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gdXBkYXRlIHN0dWRpbyBjb25maWcnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJ6IiwiZGIiLCJHRVQiLCJjb25maWciLCJzdHVkaW9Db25maWciLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImVyciIsImNvbnNvbGUiLCJTdHVkaW9Db25maWdVcGRhdGVTY2hlbWEiLCJvYmplY3QiLCJuYW1lIiwic3RyaW5nIiwibWluIiwib3B0aW9uYWwiLCJsb2dvVXJsIiwidXJsIiwiY29tbWlzc2lvblJhdGVQZXJjZW50IiwibnVtYmVyIiwibWF4IiwiYnJhbmRBY2NlbnRDb2xvciIsInJlZ2V4IiwiUFVUIiwicmVxIiwiYWRtaW5TZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiQURNSU5fU0VDUkVUIiwiYXV0aEhlYWRlciIsImhlYWRlcnMiLCJnZXQiLCJib2R5IiwicGFyc2VkIiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImRldGFpbHMiLCJpc3N1ZXMiLCJ1cGRhdGVkIiwidXBzZXJ0IiwidXBkYXRlIiwiZGF0YSIsImNyZWF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/studio-config/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst db = globalThis.__prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) {\n    globalThis.__prisma = db;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBUzlDLE1BQU1DLEtBQUtDLFdBQVdDLFFBQVEsSUFBSSxJQUFJSCx3REFBWUEsQ0FBQztJQUNqREksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RjtBQUVBLElBQUlBLElBQXFDLEVBQUU7SUFDekNILFdBQVdDLFFBQVEsR0FBR0Y7QUFDeEI7QUFFYyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxPbmVEcml2ZVxcRGVza3RvcFxcQkZHXFxGcmFtaW5nLXN0dWRpb1xcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbi8vIFNpbmdsZXRvbiBwYXR0ZXJuIGZvciBQcmlzbWEgY2xpZW50IOKAlCBwcmV2ZW50cyBjb25uZWN0aW9uIHBvb2wgZXhoYXVzdGlvblxuLy8gaW4gTmV4dC5qcyBob3QtcmVsb2FkIGRldiBlbnZpcm9ubWVudFxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIHZhciBfX3ByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBkYiA9IGdsb2JhbFRoaXMuX19wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCh7XG4gIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBnbG9iYWxUaGlzLl9fcHJpc21hID0gZGI7XG59XG5cbmV4cG9ydCB7IGRiIH07XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZGIiLCJnbG9iYWxUaGlzIiwiX19wcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudio-config%2Froute&page=%2Fapi%2Fstudio-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudio-config%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudio-config%2Froute&page=%2Fapi%2Fstudio-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudio-config%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_studio_config_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/studio-config/route.ts */ \"(rsc)/./app/api/studio-config/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/studio-config/route\",\n        pathname: \"/api/studio-config\",\n        filename: \"route\",\n        bundlePath: \"app/api/studio-config/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\OneDrive\\\\Desktop\\\\BFG\\\\Framing-studio\\\\app\\\\api\\\\studio-config\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_studio_config_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdHVkaW8tY29uZmlnJTJGcm91dGUmcGFnZT0lMkZhcGklMkZzdHVkaW8tY29uZmlnJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc3R1ZGlvLWNvbmZpZyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDQkZHJTVDRnJhbWluZy1zdHVkaW8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNCRkclNUNGcmFtaW5nLXN0dWRpbyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEM7QUFDdkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxCRkdcXFxcRnJhbWluZy1zdHVkaW9cXFxcYXBwXFxcXGFwaVxcXFxzdHVkaW8tY29uZmlnXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zdHVkaW8tY29uZmlnL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc3R1ZGlvLWNvbmZpZ1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc3R1ZGlvLWNvbmZpZy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxCRkdcXFxcRnJhbWluZy1zdHVkaW9cXFxcYXBwXFxcXGFwaVxcXFxzdHVkaW8tY29uZmlnXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudio-config%2Froute&page=%2Fapi%2Fstudio-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudio-config%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudio-config%2Froute&page=%2Fapi%2Fstudio-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudio-config%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();