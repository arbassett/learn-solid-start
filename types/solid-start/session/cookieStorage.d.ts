/*!
 * Original code by Remix Sofware Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE.remix.md for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/cookieStorage.ts
 */
import type { CreateCookieFunction } from "./cookies";
import type { SessionIdStorageStrategy, SessionStorage } from "./sessions";
interface CookieSessionStorageOptions {
    /**
     * The Cookie used to store the session data on the client, or options used
     * to automatically create one.
     */
    cookie?: SessionIdStorageStrategy["cookie"];
}
export type CreateCookieSessionStorageFunction = (options?: CookieSessionStorageOptions) => SessionStorage;
/**
 * Creates and returns a SessionStorage object that stores all session data
 * directly in the session cookie itself.
 *
 * This has the advantage that no database or other backend services are
 * needed, and can help to simplify some load-balanced scenarios. However, it
 * also has the limitation that serialized session data may not exceed the
 * browser's maximum cookie size. Trade-offs!
 *
 * @see https://remix.run/api/remix#createcookiesessionstorage
 */
export declare const createCookieSessionStorageFactory: (createCookie: CreateCookieFunction) => CreateCookieSessionStorageFunction;
export {};
