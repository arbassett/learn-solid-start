import { RouterProps } from "@solidjs/router";
import { RouteDefinition } from "../islands/server-router";
import { FetchEvent, PageEvent } from "../server/types";
/** Function responsible for listening for streamed [operations]{@link Operation}. */
export type Middleware = (input: MiddlewareInput) => MiddlewareFn;
/** Input parameters for to an Exchange factory function. */
export interface MiddlewareInput {
    forward: MiddlewareFn;
}
/** Function responsible for receiving an observable [operation]{@link Operation} and returning a [result]{@link OperationResult}. */
export type MiddlewareFn = (event: FetchEvent) => Promise<Response> | Response;
/** This composes an array of Exchanges into a single ExchangeIO function */
export declare const composeMiddleware: (exchanges: Middleware[]) => ({ forward }: MiddlewareInput) => MiddlewareFn;
export declare function createHandler(...exchanges: Middleware[]): (event: FetchEvent) => Promise<Response>;
export declare function StartRouter(props: RouterProps & {
    location: string;
    prevLocation: string;
    routes: RouteDefinition | RouteDefinition[];
}): import("solid-js").JSX.Element;
export default function StartServer({ event }: {
    event: PageEvent;
}): import("solid-js").JSX.Element;
