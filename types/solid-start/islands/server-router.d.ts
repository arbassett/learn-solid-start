import { JSX } from "solid-js";
export interface RouteDefinition {
    path: string;
    component?: () => JSX.Element;
    children?: RouteDefinition | RouteDefinition[];
}
export type Params = Record<string, string>;
export interface PathMatch {
    params: Params;
    path: string;
}
export interface MatchedRoute {
    id: string;
    originalPath: string;
    pattern: string;
    component: (props: any) => JSX.Element;
    match: PathMatch;
    shared: boolean;
}
export interface Branch {
    routes: MatchedRoute[];
    score: number;
}
export declare function resolvePath(base: string, path: string, from?: string): string | undefined;
export declare function joinPaths(from: string, to: string): string;
export declare function matchPath(path: string, location: string, partial?: boolean): PathMatch | null;
export declare function scoreRoute(route: MatchedRoute): number;
export declare function createMatchedRoute(routeDef: RouteDefinition, base: string, id: string, location: string): MatchedRoute | null;
export declare function getMatchedBranch(routeDef: RouteDefinition | RouteDefinition[], location: string, stack?: MatchedRoute[], branches?: Branch[]): Branch | null;
export interface RouterContextState {
    routes: MatchedRoute[];
    location: string;
}
export declare const RouterContext: import("solid-js").Context<RouterContextState>;
export declare const useRouter: () => RouterContextState;
export interface OutletContextState {
    depth: number;
    route: MatchedRoute;
}
export declare const OutletContext: import("solid-js").Context<OutletContextState>;
export declare const useOutlet: () => OutletContextState;
export declare const useRouteParams: () => () => Params;
export interface RouterProps {
    location: string;
    prevLocation: string;
    routes: RouteDefinition | RouteDefinition[];
    children: JSX.Element;
    out?: any;
}
export declare function Router(props: RouterProps): JSX.Element;
export declare function Outlet(props: {
    children: JSX.Element;
}): JSX.Element;
