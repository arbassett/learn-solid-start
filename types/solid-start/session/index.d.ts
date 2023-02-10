/*!
 * Original code by Remix Sofware Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE.remix.md for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime
 */
import "./cookieSigning";
export * from "./cookie";
export type { SessionIdStorageStrategy, SessionStorage } from "./sessions";
export declare const createCookie: import("./cookies").CreateCookieFunction;
export declare const createCookieSessionStorage: import("./cookieStorage").CreateCookieSessionStorageFunction;
export declare const createSessionStorage: import("./sessions").CreateSessionStorageFunction;
export declare const createMemorySessionStorage: import("./memoryStorage").CreateMemorySessionStorageFunction;
