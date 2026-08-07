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
exports.id = "app/api/events/route";
exports.ids = ["app/api/events/route"];
exports.modules = {

/***/ "(rsc)/./app/api/events/route.ts":
/*!*********************************!*\
  !*** ./app/api/events/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n/**\n * POST /api/events\n * Records configuration_started and configuration_completed events\n * E-3: Dual success metric — start → complete rate\n */ \n\n\n\nconst EventSchema = zod__WEBPACK_IMPORTED_MODULE_3__.object({\n    type: zod__WEBPACK_IMPORTED_MODULE_3__[\"enum\"]([\n        'configuration_started',\n        'configuration_completed'\n    ]),\n    sessionId: zod__WEBPACK_IMPORTED_MODULE_3__.string().min(1)\n});\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const parsed = EventSchema.safeParse(body);\n        if (!parsed.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid input',\n                details: parsed.error.issues\n            }, {\n                status: 400\n            });\n        }\n        const eventType = parsed.data.type === 'configuration_started' ? _prisma_client__WEBPACK_IMPORTED_MODULE_2__.ConversionEventType.CONFIGURATION_STARTED : _prisma_client__WEBPACK_IMPORTED_MODULE_2__.ConversionEventType.CONFIGURATION_COMPLETED;\n        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.conversionEvent.create({\n            data: {\n                type: eventType,\n                sessionId: parsed.data.sessionId\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            recorded: true\n        });\n    } catch (err) {\n        console.error('[POST /api/events]', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to record event'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2V2ZW50cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztDQUlDLEdBRXVEO0FBQ2hDO0FBQ007QUFDdUI7QUFFckQsTUFBTUksY0FBY0gsdUNBQVEsQ0FBQztJQUMzQkssTUFBTUwsd0NBQU0sQ0FBQztRQUFDO1FBQXlCO0tBQTBCO0lBQ2pFTyxXQUFXUCx1Q0FBUSxHQUFHUyxHQUFHLENBQUM7QUFDNUI7QUFFTyxlQUFlQyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxJQUFJRSxJQUFJO1FBQzNCLE1BQU1DLFNBQVNYLFlBQVlZLFNBQVMsQ0FBQ0g7UUFFckMsSUFBSSxDQUFDRSxPQUFPRSxPQUFPLEVBQUU7WUFDbkIsT0FBT2pCLHFEQUFZQSxDQUFDYyxJQUFJLENBQ3RCO2dCQUFFSSxPQUFPO2dCQUFpQkMsU0FBU0osT0FBT0csS0FBSyxDQUFDRSxNQUFNO1lBQUMsR0FDdkQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1DLFlBQ0pQLE9BQU9RLElBQUksQ0FBQ2pCLElBQUksS0FBSywwQkFDakJILCtEQUFtQkEsQ0FBQ3FCLHFCQUFxQixHQUN6Q3JCLCtEQUFtQkEsQ0FBQ3NCLHVCQUF1QjtRQUVqRCxNQUFNdkIsdUNBQUVBLENBQUN3QixlQUFlLENBQUNDLE1BQU0sQ0FBQztZQUM5QkosTUFBTTtnQkFDSmpCLE1BQU1nQjtnQkFDTmQsV0FBV08sT0FBT1EsSUFBSSxDQUFDZixTQUFTO1lBQ2xDO1FBQ0Y7UUFFQSxPQUFPUixxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO1lBQUVjLFVBQVU7UUFBSztJQUM1QyxFQUFFLE9BQU9DLEtBQUs7UUFDWkMsUUFBUVosS0FBSyxDQUFDLHNCQUFzQlc7UUFDcEMsT0FBTzdCLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFBRUksT0FBTztRQUF5QixHQUFHO1lBQUVHLFFBQVE7UUFBSTtJQUM5RTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHVzZXJcXE9uZURyaXZlXFxEZXNrdG9wXFxCRkdcXEZyYW1pbmctc3R1ZGlvXFxhcHBcXGFwaVxcZXZlbnRzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBPU1QgL2FwaS9ldmVudHNcbiAqIFJlY29yZHMgY29uZmlndXJhdGlvbl9zdGFydGVkIGFuZCBjb25maWd1cmF0aW9uX2NvbXBsZXRlZCBldmVudHNcbiAqIEUtMzogRHVhbCBzdWNjZXNzIG1ldHJpYyDigJQgc3RhcnQg4oaSIGNvbXBsZXRlIHJhdGVcbiAqL1xuXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJ0AvbGliL2RiJztcbmltcG9ydCB7IENvbnZlcnNpb25FdmVudFR5cGUgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IEV2ZW50U2NoZW1hID0gei5vYmplY3Qoe1xuICB0eXBlOiB6LmVudW0oWydjb25maWd1cmF0aW9uX3N0YXJ0ZWQnLCAnY29uZmlndXJhdGlvbl9jb21wbGV0ZWQnXSksXG4gIHNlc3Npb25JZDogei5zdHJpbmcoKS5taW4oMSksXG59KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGNvbnN0IHBhcnNlZCA9IEV2ZW50U2NoZW1hLnNhZmVQYXJzZShib2R5KTtcblxuICAgIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0ludmFsaWQgaW5wdXQnLCBkZXRhaWxzOiBwYXJzZWQuZXJyb3IuaXNzdWVzIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnRUeXBlID1cbiAgICAgIHBhcnNlZC5kYXRhLnR5cGUgPT09ICdjb25maWd1cmF0aW9uX3N0YXJ0ZWQnXG4gICAgICAgID8gQ29udmVyc2lvbkV2ZW50VHlwZS5DT05GSUdVUkFUSU9OX1NUQVJURURcbiAgICAgICAgOiBDb252ZXJzaW9uRXZlbnRUeXBlLkNPTkZJR1VSQVRJT05fQ09NUExFVEVEO1xuXG4gICAgYXdhaXQgZGIuY29udmVyc2lvbkV2ZW50LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHR5cGU6IGV2ZW50VHlwZSxcbiAgICAgICAgc2Vzc2lvbklkOiBwYXJzZWQuZGF0YS5zZXNzaW9uSWQsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcmVjb3JkZWQ6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tQT1NUIC9hcGkvZXZlbnRzXScsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gcmVjb3JkIGV2ZW50JyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwieiIsImRiIiwiQ29udmVyc2lvbkV2ZW50VHlwZSIsIkV2ZW50U2NoZW1hIiwib2JqZWN0IiwidHlwZSIsImVudW0iLCJzZXNzaW9uSWQiLCJzdHJpbmciLCJtaW4iLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJwYXJzZWQiLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJkZXRhaWxzIiwiaXNzdWVzIiwic3RhdHVzIiwiZXZlbnRUeXBlIiwiZGF0YSIsIkNPTkZJR1VSQVRJT05fU1RBUlRFRCIsIkNPTkZJR1VSQVRJT05fQ09NUExFVEVEIiwiY29udmVyc2lvbkV2ZW50IiwiY3JlYXRlIiwicmVjb3JkZWQiLCJlcnIiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/events/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst db = globalThis.__prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) {\n    globalThis.__prisma = db;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBUzlDLE1BQU1DLEtBQUtDLFdBQVdDLFFBQVEsSUFBSSxJQUFJSCx3REFBWUEsQ0FBQztJQUNqREksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RjtBQUVBLElBQUlBLElBQXFDLEVBQUU7SUFDekNILFdBQVdDLFFBQVEsR0FBR0Y7QUFDeEI7QUFFYyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxPbmVEcml2ZVxcRGVza3RvcFxcQkZHXFxGcmFtaW5nLXN0dWRpb1xcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbi8vIFNpbmdsZXRvbiBwYXR0ZXJuIGZvciBQcmlzbWEgY2xpZW50IOKAlCBwcmV2ZW50cyBjb25uZWN0aW9uIHBvb2wgZXhoYXVzdGlvblxuLy8gaW4gTmV4dC5qcyBob3QtcmVsb2FkIGRldiBlbnZpcm9ubWVudFxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIHZhciBfX3ByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBkYiA9IGdsb2JhbFRoaXMuX19wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCh7XG4gIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBnbG9iYWxUaGlzLl9fcHJpc21hID0gZGI7XG59XG5cbmV4cG9ydCB7IGRiIH07XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZGIiLCJnbG9iYWxUaGlzIiwiX19wcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevents%2Froute&page=%2Fapi%2Fevents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevents%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevents%2Froute&page=%2Fapi%2Fevents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevents%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_events_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/events/route.ts */ \"(rsc)/./app/api/events/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/events/route\",\n        pathname: \"/api/events\",\n        filename: \"route\",\n        bundlePath: \"app/api/events/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\OneDrive\\\\Desktop\\\\BFG\\\\Framing-studio\\\\app\\\\api\\\\events\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_events_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZldmVudHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmV2ZW50cyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmV2ZW50cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDQkZHJTVDRnJhbWluZy1zdHVkaW8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNCRkclNUNGcmFtaW5nLXN0dWRpbyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDbUM7QUFDaEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxCRkdcXFxcRnJhbWluZy1zdHVkaW9cXFxcYXBwXFxcXGFwaVxcXFxldmVudHNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2V2ZW50cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2V2ZW50c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZXZlbnRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXEJGR1xcXFxGcmFtaW5nLXN0dWRpb1xcXFxhcHBcXFxcYXBpXFxcXGV2ZW50c1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevents%2Froute&page=%2Fapi%2Fevents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevents%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevents%2Froute&page=%2Fapi%2Fevents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevents%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();