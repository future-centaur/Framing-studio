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
exports.id = "app/api/referral-link/route";
exports.ids = ["app/api/referral-link/route"];
exports.modules = {

/***/ "(rsc)/./app/api/referral-link/route.ts":
/*!****************************************!*\
  !*** ./app/api/referral-link/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/**\n * POST /api/referral-link\n * Input: { photographerId } (auth required)\n * Output: { referralCode, url }\n * A-6: Generates a referral link attributing a cart to the photographer\n */ \n\n\nasync function POST(req) {\n    try {\n        const { photographerId } = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.requirePhotographerAuth)(req);\n        const referralLink = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.referralLink.create({\n            data: {\n                photographerId\n            }\n        });\n        const siteUrl = \"http://localhost:3000\" ?? 0;\n        const url = `${siteUrl}/r/${referralLink.code}`;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            referralCode: referralLink.code,\n            url\n        });\n    } catch (err) {\n        if (err instanceof Response) return err;\n        console.error('[POST /api/referral-link]', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to generate referral link'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlZmVycmFsLWxpbmsvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7OztDQUtDLEdBRXVEO0FBQ0g7QUFDdkI7QUFFdkIsZUFBZUcsS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsY0FBYyxFQUFFLEdBQUcsTUFBTUosa0VBQXVCQSxDQUFDRztRQUV6RCxNQUFNRSxlQUFlLE1BQU1KLHVDQUFFQSxDQUFDSSxZQUFZLENBQUNDLE1BQU0sQ0FBQztZQUNoREMsTUFBTTtnQkFBRUg7WUFBZTtRQUN6QjtRQUVBLE1BQU1JLFVBQVVDLHVCQUFnQyxJQUFJLENBQXVCO1FBQzNFLE1BQU1HLE1BQU0sR0FBR0osUUFBUSxHQUFHLEVBQUVILGFBQWFRLElBQUksRUFBRTtRQUUvQyxPQUFPZCxxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO1lBQ3ZCQyxjQUFjVixhQUFhUSxJQUFJO1lBQy9CRDtRQUNGO0lBQ0YsRUFBRSxPQUFPSSxLQUFLO1FBQ1osSUFBSUEsZUFBZUMsVUFBVSxPQUFPRDtRQUNwQ0UsUUFBUUMsS0FBSyxDQUFDLDZCQUE2Qkg7UUFDM0MsT0FBT2pCLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRUssT0FBTztRQUFtQyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN4RjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHVzZXJcXE9uZURyaXZlXFxEZXNrdG9wXFxCRkdcXEZyYW1pbmctc3R1ZGlvXFxhcHBcXGFwaVxccmVmZXJyYWwtbGlua1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQT1NUIC9hcGkvcmVmZXJyYWwtbGlua1xuICogSW5wdXQ6IHsgcGhvdG9ncmFwaGVySWQgfSAoYXV0aCByZXF1aXJlZClcbiAqIE91dHB1dDogeyByZWZlcnJhbENvZGUsIHVybCB9XG4gKiBBLTY6IEdlbmVyYXRlcyBhIHJlZmVycmFsIGxpbmsgYXR0cmlidXRpbmcgYSBjYXJ0IHRvIHRoZSBwaG90b2dyYXBoZXJcbiAqL1xuXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgcmVxdWlyZVBob3RvZ3JhcGhlckF1dGggfSBmcm9tICdAL2xpYi9hdXRoJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwaG90b2dyYXBoZXJJZCB9ID0gYXdhaXQgcmVxdWlyZVBob3RvZ3JhcGhlckF1dGgocmVxKTtcblxuICAgIGNvbnN0IHJlZmVycmFsTGluayA9IGF3YWl0IGRiLnJlZmVycmFsTGluay5jcmVhdGUoe1xuICAgICAgZGF0YTogeyBwaG90b2dyYXBoZXJJZCB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2l0ZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnO1xuICAgIGNvbnN0IHVybCA9IGAke3NpdGVVcmx9L3IvJHtyZWZlcnJhbExpbmsuY29kZX1gO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHJlZmVycmFsQ29kZTogcmVmZXJyYWxMaW5rLmNvZGUsXG4gICAgICB1cmwsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBSZXNwb25zZSkgcmV0dXJuIGVycjtcbiAgICBjb25zb2xlLmVycm9yKCdbUE9TVCAvYXBpL3JlZmVycmFsLWxpbmtdJywgZXJyKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBnZW5lcmF0ZSByZWZlcnJhbCBsaW5rJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicmVxdWlyZVBob3RvZ3JhcGhlckF1dGgiLCJkYiIsIlBPU1QiLCJyZXEiLCJwaG90b2dyYXBoZXJJZCIsInJlZmVycmFsTGluayIsImNyZWF0ZSIsImRhdGEiLCJzaXRlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NJVEVfVVJMIiwidXJsIiwiY29kZSIsImpzb24iLCJyZWZlcnJhbENvZGUiLCJlcnIiLCJSZXNwb25zZSIsImNvbnNvbGUiLCJlcnJvciIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/referral-link/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateOTPCode: () => (/* binding */ generateOTPCode),\n/* harmony export */   requirePhotographerAuth: () => (/* binding */ requirePhotographerAuth),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/**\n * lib/auth.ts\n * Photographer session token management using jose (JWT)\n * SESSION_SECRET read from env (PRD §7)\n */ \nconst SECRET = new TextEncoder().encode(process.env.SESSION_SECRET ?? 'dev-secret-change-in-production');\nconst ALGORITHM = 'HS256';\nconst EXPIRY = '7d';\n/**\n * Sign a JWT for a photographer session.\n */ async function signToken(photographerId) {\n    return new jose__WEBPACK_IMPORTED_MODULE_0__.SignJWT({\n        photographerId\n    }).setProtectedHeader({\n        alg: ALGORITHM\n    }).setIssuedAt().setExpirationTime(EXPIRY).sign(SECRET);\n}\n/**\n * Verify a JWT and return the payload, or null if invalid.\n */ async function verifyToken(token) {\n    try {\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_1__.jwtVerify)(token, SECRET, {\n            algorithms: [\n                ALGORITHM\n            ]\n        });\n        return payload;\n    } catch  {\n        return null;\n    }\n}\n/**\n * Middleware-style guard: extracts and verifies the photographer auth token\n * from the Authorization header (Bearer <token>) or the session cookie.\n * Returns the photographerId, or throws a 401 response.\n */ async function requirePhotographerAuth(req) {\n    let token;\n    // Try Authorization header first\n    const authHeader = req.headers.get('authorization');\n    if (authHeader?.startsWith('Bearer ')) {\n        token = authHeader.slice(7);\n    }\n    // Fallback: cookie\n    if (!token) {\n        token = req.cookies.get('photographer_session')?.value;\n    }\n    if (!token) {\n        throw new Response(JSON.stringify({\n            error: 'Unauthorized — no session token'\n        }), {\n            status: 401,\n            headers: {\n                'Content-Type': 'application/json'\n            }\n        });\n    }\n    const payload = await verifyToken(token);\n    if (!payload) {\n        throw new Response(JSON.stringify({\n            error: 'Unauthorized — invalid or expired token'\n        }), {\n            status: 401,\n            headers: {\n                'Content-Type': 'application/json'\n            }\n        });\n    }\n    return {\n        photographerId: payload.photographerId\n    };\n}\n/**\n * Generate a 6-digit numeric OTP code.\n */ function generateOTPCode() {\n    return Math.floor(100000 + Math.random() * 900000).toString();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztDQUlDLEdBRXlDO0FBRzFDLE1BQU1FLFNBQVMsSUFBSUMsY0FBY0MsTUFBTSxDQUNyQ0MsUUFBUUMsR0FBRyxDQUFDQyxjQUFjLElBQUk7QUFHaEMsTUFBTUMsWUFBWTtBQUNsQixNQUFNQyxTQUFTO0FBUWY7O0NBRUMsR0FDTSxlQUFlQyxVQUFVQyxjQUFzQjtJQUNwRCxPQUFPLElBQUlYLHlDQUFPQSxDQUFDO1FBQUVXO0lBQWUsR0FDakNDLGtCQUFrQixDQUFDO1FBQUVDLEtBQUtMO0lBQVUsR0FDcENNLFdBQVcsR0FDWEMsaUJBQWlCLENBQUNOLFFBQ2xCTyxJQUFJLENBQUNkO0FBQ1Y7QUFFQTs7Q0FFQyxHQUNNLGVBQWVlLFlBQVlDLEtBQWE7SUFDN0MsSUFBSTtRQUNGLE1BQU0sRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTWxCLCtDQUFTQSxDQUFDaUIsT0FBT2hCLFFBQVE7WUFBRWtCLFlBQVk7Z0JBQUNaO2FBQVU7UUFBQztRQUM3RSxPQUFPVztJQUNULEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRUE7Ozs7Q0FJQyxHQUNNLGVBQWVFLHdCQUNwQkMsR0FBZ0I7SUFFaEIsSUFBSUo7SUFFSixpQ0FBaUM7SUFDakMsTUFBTUssYUFBYUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7SUFDbkMsSUFBSUYsWUFBWUcsV0FBVyxZQUFZO1FBQ3JDUixRQUFRSyxXQUFXSSxLQUFLLENBQUM7SUFDM0I7SUFFQSxtQkFBbUI7SUFDbkIsSUFBSSxDQUFDVCxPQUFPO1FBQ1ZBLFFBQVFJLElBQUlNLE9BQU8sQ0FBQ0gsR0FBRyxDQUFDLHlCQUF5Qkk7SUFDbkQ7SUFFQSxJQUFJLENBQUNYLE9BQU87UUFDVixNQUFNLElBQUlZLFNBQ1JDLEtBQUtDLFNBQVMsQ0FBQztZQUFFQyxPQUFPO1FBQWtDLElBQzFEO1lBQUVDLFFBQVE7WUFBS1YsU0FBUztnQkFBRSxnQkFBZ0I7WUFBbUI7UUFBRTtJQUVuRTtJQUVBLE1BQU1MLFVBQVUsTUFBTUYsWUFBWUM7SUFDbEMsSUFBSSxDQUFDQyxTQUFTO1FBQ1osTUFBTSxJQUFJVyxTQUNSQyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsT0FBTztRQUEwQyxJQUNsRTtZQUFFQyxRQUFRO1lBQUtWLFNBQVM7Z0JBQUUsZ0JBQWdCO1lBQW1CO1FBQUU7SUFFbkU7SUFFQSxPQUFPO1FBQUViLGdCQUFnQlEsUUFBUVIsY0FBYztJQUFDO0FBQ2xEO0FBRUE7O0NBRUMsR0FDTSxTQUFTd0I7SUFDZCxPQUFPQyxLQUFLQyxLQUFLLENBQUMsU0FBU0QsS0FBS0UsTUFBTSxLQUFLLFFBQVFDLFFBQVE7QUFDN0QiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcdXNlclxcT25lRHJpdmVcXERlc2t0b3BcXEJGR1xcRnJhbWluZy1zdHVkaW9cXGxpYlxcYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGxpYi9hdXRoLnRzXG4gKiBQaG90b2dyYXBoZXIgc2Vzc2lvbiB0b2tlbiBtYW5hZ2VtZW50IHVzaW5nIGpvc2UgKEpXVClcbiAqIFNFU1NJT05fU0VDUkVUIHJlYWQgZnJvbSBlbnYgKFBSRCDCpzcpXG4gKi9cblxuaW1wb3J0IHsgU2lnbkpXVCwgand0VmVyaWZ5IH0gZnJvbSAnam9zZSc7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gJ25leHQvc2VydmVyJztcblxuY29uc3QgU0VDUkVUID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICBwcm9jZXNzLmVudi5TRVNTSU9OX1NFQ1JFVCA/PyAnZGV2LXNlY3JldC1jaGFuZ2UtaW4tcHJvZHVjdGlvbicsXG4pO1xuXG5jb25zdCBBTEdPUklUSE0gPSAnSFMyNTYnO1xuY29uc3QgRVhQSVJZID0gJzdkJztcblxuZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uUGF5bG9hZCB7XG4gIHBob3RvZ3JhcGhlcklkOiBzdHJpbmc7XG4gIGlhdD86IG51bWJlcjtcbiAgZXhwPzogbnVtYmVyO1xufVxuXG4vKipcbiAqIFNpZ24gYSBKV1QgZm9yIGEgcGhvdG9ncmFwaGVyIHNlc3Npb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduVG9rZW4ocGhvdG9ncmFwaGVySWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgU2lnbkpXVCh7IHBob3RvZ3JhcGhlcklkIH0pXG4gICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogQUxHT1JJVEhNIH0pXG4gICAgLnNldElzc3VlZEF0KClcbiAgICAuc2V0RXhwaXJhdGlvblRpbWUoRVhQSVJZKVxuICAgIC5zaWduKFNFQ1JFVCk7XG59XG5cbi8qKlxuICogVmVyaWZ5IGEgSldUIGFuZCByZXR1cm4gdGhlIHBheWxvYWQsIG9yIG51bGwgaWYgaW52YWxpZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVRva2VuKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPFNlc3Npb25QYXlsb2FkIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYXdhaXQgand0VmVyaWZ5KHRva2VuLCBTRUNSRVQsIHsgYWxnb3JpdGhtczogW0FMR09SSVRITV0gfSk7XG4gICAgcmV0dXJuIHBheWxvYWQgYXMgdW5rbm93biBhcyBTZXNzaW9uUGF5bG9hZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBNaWRkbGV3YXJlLXN0eWxlIGd1YXJkOiBleHRyYWN0cyBhbmQgdmVyaWZpZXMgdGhlIHBob3RvZ3JhcGhlciBhdXRoIHRva2VuXG4gKiBmcm9tIHRoZSBBdXRob3JpemF0aW9uIGhlYWRlciAoQmVhcmVyIDx0b2tlbj4pIG9yIHRoZSBzZXNzaW9uIGNvb2tpZS5cbiAqIFJldHVybnMgdGhlIHBob3RvZ3JhcGhlcklkLCBvciB0aHJvd3MgYSA0MDEgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlUGhvdG9ncmFwaGVyQXV0aChcbiAgcmVxOiBOZXh0UmVxdWVzdCxcbik6IFByb21pc2U8eyBwaG90b2dyYXBoZXJJZDogc3RyaW5nIH0+IHtcbiAgbGV0IHRva2VuOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgLy8gVHJ5IEF1dGhvcml6YXRpb24gaGVhZGVyIGZpcnN0XG4gIGNvbnN0IGF1dGhIZWFkZXIgPSByZXEuaGVhZGVycy5nZXQoJ2F1dGhvcml6YXRpb24nKTtcbiAgaWYgKGF1dGhIZWFkZXI/LnN0YXJ0c1dpdGgoJ0JlYXJlciAnKSkge1xuICAgIHRva2VuID0gYXV0aEhlYWRlci5zbGljZSg3KTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrOiBjb29raWVcbiAgaWYgKCF0b2tlbikge1xuICAgIHRva2VuID0gcmVxLmNvb2tpZXMuZ2V0KCdwaG90b2dyYXBoZXJfc2Vzc2lvbicpPy52YWx1ZTtcbiAgfVxuXG4gIGlmICghdG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgUmVzcG9uc2UoXG4gICAgICBKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVW5hdXRob3JpemVkIOKAlCBubyBzZXNzaW9uIHRva2VuJyB9KSxcbiAgICAgIHsgc3RhdHVzOiA0MDEsIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0sXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCB2ZXJpZnlUb2tlbih0b2tlbik7XG4gIGlmICghcGF5bG9hZCkge1xuICAgIHRocm93IG5ldyBSZXNwb25zZShcbiAgICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQg4oCUIGludmFsaWQgb3IgZXhwaXJlZCB0b2tlbicgfSksXG4gICAgICB7IHN0YXR1czogNDAxLCBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSB9LFxuICAgICk7XG4gIH1cblxuICByZXR1cm4geyBwaG90b2dyYXBoZXJJZDogcGF5bG9hZC5waG90b2dyYXBoZXJJZCB9O1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgNi1kaWdpdCBudW1lcmljIE9UUCBjb2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVPVFBDb2RlKCk6IHN0cmluZyB7XG4gIHJldHVybiBNYXRoLmZsb29yKDEwMDAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwMDApLnRvU3RyaW5nKCk7XG59XG4iXSwibmFtZXMiOlsiU2lnbkpXVCIsImp3dFZlcmlmeSIsIlNFQ1JFVCIsIlRleHRFbmNvZGVyIiwiZW5jb2RlIiwicHJvY2VzcyIsImVudiIsIlNFU1NJT05fU0VDUkVUIiwiQUxHT1JJVEhNIiwiRVhQSVJZIiwic2lnblRva2VuIiwicGhvdG9ncmFwaGVySWQiLCJzZXRQcm90ZWN0ZWRIZWFkZXIiLCJhbGciLCJzZXRJc3N1ZWRBdCIsInNldEV4cGlyYXRpb25UaW1lIiwic2lnbiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJwYXlsb2FkIiwiYWxnb3JpdGhtcyIsInJlcXVpcmVQaG90b2dyYXBoZXJBdXRoIiwicmVxIiwiYXV0aEhlYWRlciIsImhlYWRlcnMiLCJnZXQiLCJzdGFydHNXaXRoIiwic2xpY2UiLCJjb29raWVzIiwidmFsdWUiLCJSZXNwb25zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsInN0YXR1cyIsImdlbmVyYXRlT1RQQ29kZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst db = globalThis.__prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) {\n    globalThis.__prisma = db;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBUzlDLE1BQU1DLEtBQUtDLFdBQVdDLFFBQVEsSUFBSSxJQUFJSCx3REFBWUEsQ0FBQztJQUNqREksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RjtBQUVBLElBQUlBLElBQXFDLEVBQUU7SUFDekNILFdBQVdDLFFBQVEsR0FBR0Y7QUFDeEI7QUFFYyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxPbmVEcml2ZVxcRGVza3RvcFxcQkZHXFxGcmFtaW5nLXN0dWRpb1xcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbi8vIFNpbmdsZXRvbiBwYXR0ZXJuIGZvciBQcmlzbWEgY2xpZW50IOKAlCBwcmV2ZW50cyBjb25uZWN0aW9uIHBvb2wgZXhoYXVzdGlvblxuLy8gaW4gTmV4dC5qcyBob3QtcmVsb2FkIGRldiBlbnZpcm9ubWVudFxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIHZhciBfX3ByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBkYiA9IGdsb2JhbFRoaXMuX19wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCh7XG4gIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBnbG9iYWxUaGlzLl9fcHJpc21hID0gZGI7XG59XG5cbmV4cG9ydCB7IGRiIH07XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZGIiLCJnbG9iYWxUaGlzIiwiX19wcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freferral-link%2Froute&page=%2Fapi%2Freferral-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freferral-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freferral-link%2Froute&page=%2Fapi%2Freferral-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freferral-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_referral_link_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/referral-link/route.ts */ \"(rsc)/./app/api/referral-link/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/referral-link/route\",\n        pathname: \"/api/referral-link\",\n        filename: \"route\",\n        bundlePath: \"app/api/referral-link/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\OneDrive\\\\Desktop\\\\BFG\\\\Framing-studio\\\\app\\\\api\\\\referral-link\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_OneDrive_Desktop_BFG_Framing_studio_app_api_referral_link_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZWZlcnJhbC1saW5rJTJGcm91dGUmcGFnZT0lMkZhcGklMkZyZWZlcnJhbC1saW5rJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmVmZXJyYWwtbGluayUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDQkZHJTVDRnJhbWluZy1zdHVkaW8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNCRkclNUNGcmFtaW5nLXN0dWRpbyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEM7QUFDdkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxCRkdcXFxcRnJhbWluZy1zdHVkaW9cXFxcYXBwXFxcXGFwaVxcXFxyZWZlcnJhbC1saW5rXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9yZWZlcnJhbC1saW5rL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcmVmZXJyYWwtbGlua1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcmVmZXJyYWwtbGluay9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxCRkdcXFxcRnJhbWluZy1zdHVkaW9cXFxcYXBwXFxcXGFwaVxcXFxyZWZlcnJhbC1saW5rXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freferral-link%2Froute&page=%2Fapi%2Freferral-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freferral-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freferral-link%2Froute&page=%2Fapi%2Freferral-link%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freferral-link%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5COneDrive%5CDesktop%5CBFG%5CFraming-studio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();