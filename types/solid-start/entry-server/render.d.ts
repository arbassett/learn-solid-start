import { JSX } from "solid-js";
import { PageEvent } from "../server/types";
export declare function renderSync(fn: (context: PageEvent) => JSX.Element, options?: {
    nonce?: string;
    renderId?: string;
}): () => import("solid-start/entry-server").MiddlewareFn;
export declare function renderAsync(fn: (context: PageEvent) => JSX.Element, options?: {
    timeoutMs?: number;
    nonce?: string;
    renderId?: string;
}): () => import("solid-start/entry-server").MiddlewareFn;
export declare function renderStream(fn: (context: PageEvent) => JSX.Element, baseOptions?: {
    nonce?: string;
    renderId?: string;
    onCompleteShell?: (info: {
        write: (v: string) => void;
    }) => void;
    onCompleteAll?: (info: {
        write: (v: string) => void;
    }) => void;
}): () => import("solid-start/entry-server").MiddlewareFn;
