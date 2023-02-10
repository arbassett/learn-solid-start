/*!
 * Original code by Remix Sofware Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE.remix.md for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/memoryStorage.ts
 */
import type { CreateSessionStorageFunction, SessionIdStorageStrategy, SessionStorage } from "./sessions";
interface MemorySessionStorageOptions {
    /**
     * The Cookie used to store the session id on the client, or options used
     * to automatically create one.
     */
    cookie?: SessionIdStorageStrategy["cookie"];
}
export type CreateMemorySessionStorageFunction = (options?: MemorySessionStorageOptions) => SessionStorage;
/**
 * Creates and returns a simple in-memory SessionStorage object, mostly useful
 * for testing and as a reference implementation.
 *
 * Note: This storage does not scale beyond a single process, so it is not
 * suitable for most production scenarios.
 *
 * @see https://remix.run/api/remix#creatememorysessionstorage
 */
export declare const createMemorySessionStorageFactory: (createSessionStorage: CreateSessionStorageFunction) => CreateMemorySessionStorageFunction;
export {};
