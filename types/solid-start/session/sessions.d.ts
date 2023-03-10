/*!
 * Original code by Remix Sofware Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE.remix.md for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/sessions.ts
 */
import type { CookieParseOptions, CookieSerializeOptions } from "./cookie";
import type { Cookie, CookieOptions, CreateCookieFunction } from "./cookies";
export declare function warnOnce(condition: boolean, message: string): void;
/**
 * An object of name/value pairs to be used in the session.
 */
export interface SessionData {
    [name: string]: any;
}
/**
 * Session persists data across HTTP requests.
 *
 * @see https://remix.run/api/remix#session-api
 */
export interface Session {
    /**
     * A unique identifier for this session.
     *
     * Note: This will be the empty string for newly created sessions and
     * sessions that are not backed by a database (i.e. cookie-based sessions).
     */
    readonly id: string;
    /**
     * The raw data contained in this session.
     *
     * This is useful mostly for SessionStorage internally to access the raw
     * session data to persist.
     */
    readonly data: SessionData;
    /**
     * Returns `true` if the session has a value for the given `name`, `false`
     * otherwise.
     */
    has(name: string): boolean;
    /**
     * Returns the value for the given `name` in this session.
     */
    get(name: string): any;
    /**
     * Sets a value in the session for the given `name`.
     */
    set(name: string, value: any): void;
    /**
     * Sets a value in the session that is only valid until the next `get()`.
     * This can be useful for temporary values, like error messages.
     */
    flash(name: string, value: any): void;
    /**
     * Removes a value from the session.
     */
    unset(name: string): void;
}
export type CreateSessionFunction = (initialData?: SessionData, id?: string) => Session;
/**
 * Creates a new Session object.
 *
 * Note: This function is typically not invoked directly by application code.
 * Instead, use a `SessionStorage` object's `getSession` method.
 *
 * @see https://remix.run/api/remix#createsession
 */
export declare const createSession: CreateSessionFunction;
export type IsSessionFunction = (object: any) => object is Session;
/**
 * Returns true if an object is a Remix session.
 *
 * @see https://remix.run/api/remix#issession
 */
export declare const isSession: IsSessionFunction;
/**
 * SessionStorage stores session data between HTTP requests and knows how to
 * parse and create cookies.
 *
 * A SessionStorage creates Session objects using a `Cookie` header as input.
 * Then, later it generates the `Set-Cookie` header to be used in the response.
 */
export interface SessionStorage {
    /**
     * Parses a Cookie header from a HTTP request and returns the associated
     * Session. If there is no session associated with the cookie, this will
     * return a new Session with no data.
     */
    getSession(cookieHeader?: string | null, options?: CookieParseOptions): Promise<Session>;
    /**
     * Stores all data in the Session and returns the Set-Cookie header to be
     * used in the HTTP response.
     */
    commitSession(session: Session, options?: CookieSerializeOptions): Promise<string>;
    /**
     * Deletes all data associated with the Session and returns the Set-Cookie
     * header to be used in the HTTP response.
     */
    destroySession(session: Session, options?: CookieSerializeOptions): Promise<string>;
}
/**
 * SessionIdStorageStrategy is designed to allow anyone to easily build their
 * own SessionStorage using `createSessionStorage(strategy)`.
 *
 * This strategy describes a common scenario where the session id is stored in
 * a cookie but the actual session data is stored elsewhere, usually in a
 * database or on disk. A set of create, read, update, and delete operations
 * are provided for managing the session data.
 */
export interface SessionIdStorageStrategy {
    /**
     * The Cookie used to store the session id, or options used to automatically
     * create one.
     */
    cookie?: Cookie | (CookieOptions & {
        name?: string;
    });
    /**
     * Creates a new record with the given data and returns the session id.
     */
    createData: (data: SessionData, expires?: Date) => Promise<string>;
    /**
     * Returns data for a given session id, or `null` if there isn't any.
     */
    readData: (id: string) => Promise<SessionData | null>;
    /**
     * Updates data for the given session id.
     */
    updateData: (id: string, data: SessionData, expires?: Date) => Promise<void>;
    /**
     * Deletes data for a given session id from the data store.
     */
    deleteData: (id: string) => Promise<void>;
}
export type CreateSessionStorageFunction = (strategy: SessionIdStorageStrategy) => SessionStorage;
/**
 * Creates a SessionStorage object using a SessionIdStorageStrategy.
 *
 * Note: This is a low-level API that should only be used if none of the
 * existing session storage options meet your requirements.
 *
 * @see https://remix.run/api/remix#createsessionstorage
 */
export declare const createSessionStorageFactory: (createCookie: CreateCookieFunction) => CreateSessionStorageFunction;
export declare function warnOnceAboutSigningSessionCookie(cookie: Cookie): void;
