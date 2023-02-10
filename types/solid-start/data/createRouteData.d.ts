import type { Resource, ResourceOptions } from "solid-js";
import type { ReconcileOptions } from "solid-js/store";
import { ServerFunctionEvent } from "../server/types";
interface RouteDataEvent extends ServerFunctionEvent {
}
type RouteDataSource<S> = S | false | null | undefined | (() => S | false | null | undefined);
type RouteDataFetcher<S, T> = (source: S, event: RouteDataEvent) => T | Promise<T>;
type RouteDataOptions<T, S> = ResourceOptions<T> & {
    key?: RouteDataSource<S>;
    reconcileOptions?: ReconcileOptions;
};
export declare function createRouteData<T, S = true>(fetcher: RouteDataFetcher<S, T>, options?: RouteDataOptions<undefined, S>): Resource<T | undefined>;
export declare function createRouteData<T, S = true>(fetcher: RouteDataFetcher<S, T>, options: RouteDataOptions<T, S>): Resource<T>;
export declare function refetchRouteData(key?: string | any[] | void): Promise<void>;
export {};
