/*!
 * Original code by Remix Sofware Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE.remix.md for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/cookies.ts
 */
import type { CookieParseOptions, CookieSerializeOptions } from "./cookie";
export type SignFunction = (value: string, secret: string) => Promise<string>;
export type UnsignFunction = (cookie: string, secret: string) => Promise<string | false>;
export type { CookieParseOptions, CookieSerializeOptions };
export interface CookieSignatureOptions {
    /**
     * An array of secrets that may be used to sign/unsign the value of a cookie.
     *
     * The array makes it easy to rotate secrets. New secrets should be added to
     * the beginning of the array. `cookie.serialize()` will always use the first
     * value in the array, but `cookie.parse()` may use any of them so that
     * cookies that were signed with older secrets still work.
     */
    secrets?: string[];
}
export type CookieOptions = CookieParseOptions & CookieSerializeOptions & CookieSignatureOptions;
/**
 * A HTTP cookie.
 *
 * A Cookie is a logical container for metadata about a HTTP cookie; its name
 * and options. But it doesn't contain a value. Instead, it has `parse()` and
 * `serialize()` methods that allow a single instance to be reused for
 * parsing/encoding multiple different values.
 *
 * @see https://remix.run/api/remix#cookie-api
 */
export interface Cookie {
    /**
     * The name of the cookie, used in the `Cookie` and `Set-Cookie` headers.
     */
    readonly name: string;
    /**
     * True if this cookie uses one or more secrets for verification.
     */
    readonly isSigned: boolean;
    /**
     * The Date this cookie expires.
     *
     * Note: This is calculated at access time using `maxAge` when no `expires`
     * option is provided to `createCookie()`.
     */
    readonly expires?: Date;
    /**
     * Parses a raw `Cookie` header and returns the value of this cookie or
     * `null` if it's not present.
     */
    parse(cookieHeader: string | null, options?: CookieParseOptions): Promise<any>;
    /**
     * Serializes the given value to a string and returns the `Set-Cookie`
     * header.
     */
    serialize(value: any, options?: CookieSerializeOptions): Promise<string>;
}
export type CreateCookieFunction = (name: string, cookieOptions?: CookieOptions) => Cookie;
/**
 * Creates a logical container for managing a browser cookie from the server.
 *
 * @see https://remix.run/api/remix#createcookie
 */
export declare const createCookieFactory: ({ sign, unsign }: {
    sign: SignFunction;
    unsign: UnsignFunction;
}) => CreateCookieFunction;
export type IsCookieFunction = (object: any) => object is Cookie;
/**
 * Returns true if an object is a Remix cookie container.
 *
 * @see https://remix.run/api/remix#iscookie
 */
export declare const isCookie: IsCookieFunction;
