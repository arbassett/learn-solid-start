import { FormProps } from "./Form";
import type { ParentComponent } from "solid-js";
import { ServerFunctionEvent } from "../server/types";
interface ActionEvent extends ServerFunctionEvent {
}
export interface Submission<T, U> {
    input: T;
    result?: U;
    error?: any;
    clear: () => void;
    retry: () => void;
}
export type RouteAction<T, U> = [
    {
        pending: boolean;
        input?: T;
        result?: U;
        error?: any;
        clear: () => void;
        retry: () => void;
    },
    ((vars: T) => Promise<U>) & {
        Form: T extends FormData ? ParentComponent<FormProps> : never;
        url: string;
    }
];
export type RouteMultiAction<T, U> = [
    Submission<T, U>[] & {
        pending: Submission<T, U>[];
    },
    ((vars: T) => Promise<U>) & {
        Form: T extends FormData ? ParentComponent<FormProps> : never;
        url: string;
    }
];
export type Invalidate = ((r: Response) => string | any[] | void) | string | any[];
export declare function createRouteAction<T = void, U = void>(fn: (arg1: void, event: ActionEvent) => Promise<U>, options?: {
    invalidate?: Invalidate;
}): RouteAction<T, U>;
export declare function createRouteAction<T, U = void>(fn: (args: T, event: ActionEvent) => Promise<U>, options?: {
    invalidate?: Invalidate;
}): RouteAction<T, U>;
export declare function createRouteMultiAction<T = void, U = void>(fn: (arg1: void, event: ActionEvent) => Promise<U>, options?: {
    invalidate?: Invalidate;
}): RouteMultiAction<T, U>;
export declare function createRouteMultiAction<T, U = void>(fn: (args: T, event: ActionEvent) => Promise<U>, options?: {
    invalidate?: Invalidate;
}): RouteMultiAction<T, U>;
export {};
