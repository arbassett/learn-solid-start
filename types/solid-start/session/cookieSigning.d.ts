/*!
 * Original code by Remix Sofware Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE.remix.md for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/cookieSigning.ts
 */
export type InternalSignFunctionDoNotUseMe = (value: string, secret: string) => Promise<string>;
export type InternalUnsignFunctionDoNotUseMe = (cookie: string, secret: string) => Promise<string | false>;
export declare const sign: InternalSignFunctionDoNotUseMe;
export declare const unsign: InternalUnsignFunctionDoNotUseMe;
