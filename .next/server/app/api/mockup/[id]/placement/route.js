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
exports.id = "app/api/mockup/[id]/placement/route";
exports.ids = ["app/api/mockup/[id]/placement/route"];
exports.modules = {

/***/ "(rsc)/./app/api/mockup/[id]/placement/route.ts":
/*!************************************************!*\
  !*** ./app/api/mockup/[id]/placement/route.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/**\n * PATCH /api/mockup/[id]/placement\n * Input:  { placement: { x, y, scale, rotateY?, rotateX? } }\n * Output: { mockupId, placement }\n *\n * D-17: Saves updated placement coordinates.\n * NOTE: This route intentionally does NOT re-composite the image.\n * Repositioning is handled client-side (CSS layer approach in PlacementCanvas).\n * Re-compositing only happens at POST /api/mockup time (scene selection).\n */ \n\n\nconst PlacementPatchSchema = zod__WEBPACK_IMPORTED_MODULE_2__.object({\n    placement: zod__WEBPACK_IMPORTED_MODULE_2__.object({\n        x: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(0).max(1),\n        y: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(0).max(1),\n        scale: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(0.05).max(1),\n        rotateY: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(-45).max(45).optional().default(0),\n        rotateX: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(-30).max(30).optional().default(0)\n    })\n});\nasync function PATCH(req, { params }) {\n    try {\n        const { id } = await params;\n        const body = await req.json();\n        const parsed = PlacementPatchSchema.safeParse(body);\n        if (!parsed.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid input',\n                details: parsed.error.issues\n            }, {\n                status: 400\n            });\n        }\n        const { x, y, scale, rotateY = 0, rotateX = 0 } = parsed.data.placement;\n        const updated = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.mockup.update({\n            where: {\n                id\n            },\n            data: {\n                placementX: x,\n                placementY: y,\n                placementScale: scale,\n                placementRotateY: rotateY,\n                placementRotateX: rotateX\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            mockupId: updated.id,\n            placement: {\n                x: updated.placementX,\n                y: updated.placementY,\n                scale: updated.placementScale,\n                rotateY: updated.placementRotateY,\n                rotateX: updated.placementRotateX\n            }\n        });\n    } catch (err) {\n        console.error('[PATCH /api/mockup/:id/placement]', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Placement update failed'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21vY2t1cC9baWRdL3BsYWNlbWVudC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7OztDQVNDLEdBRXVEO0FBQ2hDO0FBQ007QUFFOUIsTUFBTUcsdUJBQXVCRix1Q0FBUSxDQUFDO0lBQ3BDSSxXQUFXSix1Q0FBUSxDQUFDO1FBQ2xCSyxHQUFHTCx1Q0FBUSxHQUFHTyxHQUFHLENBQUMsR0FBR0MsR0FBRyxDQUFDO1FBQ3pCQyxHQUFHVCx1Q0FBUSxHQUFHTyxHQUFHLENBQUMsR0FBR0MsR0FBRyxDQUFDO1FBQ3pCRSxPQUFPVix1Q0FBUSxHQUFHTyxHQUFHLENBQUMsTUFBTUMsR0FBRyxDQUFDO1FBQ2hDRyxTQUFTWCx1Q0FBUSxHQUFHTyxHQUFHLENBQUMsQ0FBQyxJQUFJQyxHQUFHLENBQUMsSUFBSUksUUFBUSxHQUFHQyxPQUFPLENBQUM7UUFDeERDLFNBQVNkLHVDQUFRLEdBQUdPLEdBQUcsQ0FBQyxDQUFDLElBQUlDLEdBQUcsQ0FBQyxJQUFJSSxRQUFRLEdBQUdDLE9BQU8sQ0FBQztJQUMxRDtBQUNGO0FBRU8sZUFBZUUsTUFDcEJDLEdBQWdCLEVBQ2hCLEVBQUVDLE1BQU0sRUFBdUM7SUFFL0MsSUFBSTtRQUNGLE1BQU0sRUFBRUMsRUFBRSxFQUFFLEdBQUcsTUFBTUQ7UUFDckIsTUFBTUUsT0FBTyxNQUFNSCxJQUFJSSxJQUFJO1FBQzNCLE1BQU1DLFNBQVNuQixxQkFBcUJvQixTQUFTLENBQUNIO1FBRTlDLElBQUksQ0FBQ0UsT0FBT0UsT0FBTyxFQUFFO1lBQ25CLE9BQU94QixxREFBWUEsQ0FBQ3FCLElBQUksQ0FDdEI7Z0JBQUVJLE9BQU87Z0JBQWlCQyxTQUFTSixPQUFPRyxLQUFLLENBQUNFLE1BQU07WUFBQyxHQUN2RDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTSxFQUFFdEIsQ0FBQyxFQUFFSSxDQUFDLEVBQUVDLEtBQUssRUFBRUMsVUFBVSxDQUFDLEVBQUVHLFVBQVUsQ0FBQyxFQUFFLEdBQUdPLE9BQU9PLElBQUksQ0FBQ3hCLFNBQVM7UUFFdkUsTUFBTXlCLFVBQVUsTUFBTTVCLHVDQUFFQSxDQUFDNkIsTUFBTSxDQUFDQyxNQUFNLENBQUM7WUFDckNDLE9BQU87Z0JBQUVkO1lBQUc7WUFDWlUsTUFBTTtnQkFDSkssWUFBWTVCO2dCQUNaNkIsWUFBWXpCO2dCQUNaMEIsZ0JBQWdCekI7Z0JBQ2hCMEIsa0JBQWtCekI7Z0JBQ2xCMEIsa0JBQWtCdkI7WUFFcEI7UUFDRjtRQUVBLE9BQU9mLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDO1lBQ3ZCa0IsVUFBVVQsUUFBUVgsRUFBRTtZQUNwQmQsV0FBVztnQkFDVEMsR0FBR3dCLFFBQVFJLFVBQVU7Z0JBQ3JCeEIsR0FBR29CLFFBQVFLLFVBQVU7Z0JBQ3JCeEIsT0FBT21CLFFBQVFNLGNBQWM7Z0JBQzdCeEIsU0FBU2tCLFFBQVFPLGdCQUFnQjtnQkFDakN0QixTQUFTZSxRQUFRUSxnQkFBZ0I7WUFDbkM7UUFDRjtJQUNGLEVBQUUsT0FBT0UsS0FBSztRQUNaQyxRQUFRaEIsS0FBSyxDQUFDLHFDQUFxQ2U7UUFDbkQsT0FBT3hDLHFEQUFZQSxDQUFDcUIsSUFBSSxDQUFDO1lBQUVJLE9BQU87UUFBMEIsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDL0U7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxPbmVEcml2ZVxcRGVza3RvcFxcQkZHXFxGcmFtaW5nLXN0dWRpb1xcYXBwXFxhcGlcXG1vY2t1cFxcW2lkXVxccGxhY2VtZW50XFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBBVENIIC9hcGkvbW9ja3VwL1tpZF0vcGxhY2VtZW50XG4gKiBJbnB1dDogIHsgcGxhY2VtZW50OiB7IHgsIHksIHNjYWxlLCByb3RhdGVZPywgcm90YXRlWD8gfSB9XG4gKiBPdXRwdXQ6IHsgbW9ja3VwSWQsIHBsYWNlbWVudCB9XG4gKlxuICogRC0xNzogU2F2ZXMgdXBkYXRlZCBwbGFjZW1lbnQgY29vcmRpbmF0ZXMuXG4gKiBOT1RFOiBUaGlzIHJvdXRlIGludGVudGlvbmFsbHkgZG9lcyBOT1QgcmUtY29tcG9zaXRlIHRoZSBpbWFnZS5cbiAqIFJlcG9zaXRpb25pbmcgaXMgaGFuZGxlZCBjbGllbnQtc2lkZSAoQ1NTIGxheWVyIGFwcHJvYWNoIGluIFBsYWNlbWVudENhbnZhcykuXG4gKiBSZS1jb21wb3NpdGluZyBvbmx5IGhhcHBlbnMgYXQgUE9TVCAvYXBpL21vY2t1cCB0aW1lIChzY2VuZSBzZWxlY3Rpb24pLlxuICovXG5cbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInO1xuXG5jb25zdCBQbGFjZW1lbnRQYXRjaFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgcGxhY2VtZW50OiB6Lm9iamVjdCh7XG4gICAgeDogei5udW1iZXIoKS5taW4oMCkubWF4KDEpLFxuICAgIHk6IHoubnVtYmVyKCkubWluKDApLm1heCgxKSxcbiAgICBzY2FsZTogei5udW1iZXIoKS5taW4oMC4wNSkubWF4KDEpLFxuICAgIHJvdGF0ZVk6IHoubnVtYmVyKCkubWluKC00NSkubWF4KDQ1KS5vcHRpb25hbCgpLmRlZmF1bHQoMCksXG4gICAgcm90YXRlWDogei5udW1iZXIoKS5taW4oLTMwKS5tYXgoMzApLm9wdGlvbmFsKCkuZGVmYXVsdCgwKSxcbiAgfSksXG59KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKFxuICByZXE6IE5leHRSZXF1ZXN0LFxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogUHJvbWlzZTx7IGlkOiBzdHJpbmcgfT4gfSxcbikge1xuICB0cnkge1xuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHBhcmFtcztcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCBwYXJzZWQgPSBQbGFjZW1lbnRQYXRjaFNjaGVtYS5zYWZlUGFyc2UoYm9keSk7XG5cbiAgICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdJbnZhbGlkIGlucHV0JywgZGV0YWlsczogcGFyc2VkLmVycm9yLmlzc3VlcyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH0sXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHsgeCwgeSwgc2NhbGUsIHJvdGF0ZVkgPSAwLCByb3RhdGVYID0gMCB9ID0gcGFyc2VkLmRhdGEucGxhY2VtZW50O1xuXG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IGRiLm1vY2t1cC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGxhY2VtZW50WDogeCxcbiAgICAgICAgcGxhY2VtZW50WTogeSxcbiAgICAgICAgcGxhY2VtZW50U2NhbGU6IHNjYWxlLFxuICAgICAgICBwbGFjZW1lbnRSb3RhdGVZOiByb3RhdGVZLFxuICAgICAgICBwbGFjZW1lbnRSb3RhdGVYOiByb3RhdGVYLFxuICAgICAgICAvLyBtb2NrdXBJbWFnZVVybCBpbnRlbnRpb25hbGx5IG5vdCB1cGRhdGVkIOKAlCBjbGllbnQgcmVuZGVycyBwb3NpdGlvbiB2aWEgQ1NTXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIG1vY2t1cElkOiB1cGRhdGVkLmlkLFxuICAgICAgcGxhY2VtZW50OiB7XG4gICAgICAgIHg6IHVwZGF0ZWQucGxhY2VtZW50WCxcbiAgICAgICAgeTogdXBkYXRlZC5wbGFjZW1lbnRZLFxuICAgICAgICBzY2FsZTogdXBkYXRlZC5wbGFjZW1lbnRTY2FsZSxcbiAgICAgICAgcm90YXRlWTogdXBkYXRlZC5wbGFjZW1lbnRSb3RhdGVZLFxuICAgICAgICByb3RhdGVYOiB1cGRhdGVkLnBsYWNlbWVudFJvdGF0ZVgsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbUEFUQ0ggL2FwaS9tb2NrdXAvOmlkL3BsYWNlbWVudF0nLCBlcnIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnUGxhY2VtZW50IHVwZGF0ZSBmYWlsZWQnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJ6IiwiZGIiLCJQbGFjZW1lbnRQYXRjaFNjaGVtYSIsIm9iamVjdCIsInBsYWNlbWVudCIsIngiLCJudW1iZXIiLCJtaW4iLCJtYXgiLCJ5Iiwic2NhbGUiLCJyb3RhdGVZIiwib3B0aW9uYWwiLCJkZWZhdWx0Iiwicm90YXRlWCIsIlBBVENIIiwicmVxIiwicGFyYW1zIiwiaWQiLCJib2R5IiwianNvbiIsInBhcnNlZCIsInNhZmVQYXJzZSIsInN1Y2Nlc3MiLCJlcnJvciIsImRldGFpbHMiLCJpc3N1ZXMiLCJzdGF0dXMiLCJkYXRhIiwidXBkYXRlZCIsIm1vY2t1cCIsInVwZGF0ZSIsIndoZXJlIiwicGxhY2VtZW50WCIsInBsYWNlbWVudFkiLCJwbGFjZW1lbnRTY2FsZSIsInBsYWNlbWVudFJvdGF0ZVkiLCJwbGFjZW1lbnRSb3RhdGVYIiwibW9ja3VwSWQiLCJlcnIiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/mockup/[id]/placement/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst db = globalThis.__prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) {\n    globalThis.__prisma = db;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBUzlDLE1BQU1DLEtBQUtDLFdBQVdDLFFBQVEsSUFBSSxJQUFJSCx3REFBWUEsQ0FBQztJQUNqREksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RjtBQUVBLElBQUlBLElBQXFDLEVBQUU7SUFDekNILFdBQVdDLFFBQVEsR0FBR0Y7QUFDeEI7QUFFYyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxPbmVEcml2ZVxcRGVza3RvcFxcQkZHXFxGcmFtaW5nLXN0dWRpb1xcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbi8vIFNpbmdsZXRvbiBwYXR0ZXJuIGZvciBQcmlzbWEgY2xpZW50IOKAlCBwcmV2ZW50cyBjb25uZWN0aW9uIHBvb2wgZXhoYXVzdGlvblxuLy8gaW4gTmV4dC5qcyBob3QtcmVsb2FkIGRldiBlbnZpcm9ubWVudFxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIHZhciBfX3ByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBkYiA9IGdsb2JhbFRoaXMuX19wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCh7XG4gIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBnbG9iYWxUaGlzLl9fcHJpc21hID0gZGI7XG59XG5cbmV4cG9ydCB7IGRiIH07XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZGIiLCJnbG9iYWxUaGlzIiwiX19wcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&page=%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&page=%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_mockup_id_placement_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/mockup/[id]/placement/route.ts */ \"(rsc)/./app/api/mockup/[id]/placement/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/mockup/[id]/placement/route\",\n        pathname: \"/api/mockup/[id]/placement\",\n        filename: \"route\",\n        bundlePath: \"app/api/mockup/[id]/placement/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\OneDrive\\\\Desktop\\\\BFG\\\\Framing-studio\\\\app\\\\api\\\\mockup\\\\[id]\\\\placement\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_mockup_id_placement_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtb2NrdXAlMkYlNUJpZCU1RCUyRnBsYWNlbWVudCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbW9ja3VwJTJGJTVCaWQlNUQlMkZwbGFjZW1lbnQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtb2NrdXAlMkYlNUJpZCU1RCUyRnBsYWNlbWVudCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDQkZHJTVDRnJhbWluZy1zdHVkaW8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNCRkclNUNGcmFtaW5nLXN0dWRpbyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDb0Q7QUFDakk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxCRkdcXFxcRnJhbWluZy1zdHVkaW9cXFxcYXBwXFxcXGFwaVxcXFxtb2NrdXBcXFxcW2lkXVxcXFxwbGFjZW1lbnRcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL21vY2t1cC9baWRdL3BsYWNlbWVudC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL21vY2t1cC9baWRdL3BsYWNlbWVudFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbW9ja3VwL1tpZF0vcGxhY2VtZW50L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXEJGR1xcXFxGcmFtaW5nLXN0dWRpb1xcXFxhcHBcXFxcYXBpXFxcXG1vY2t1cFxcXFxbaWRdXFxcXHBsYWNlbWVudFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&page=%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&page=%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmockup%2F%5Bid%5D%2Fplacement%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();