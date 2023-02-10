import { MatchRoute, Method } from "./types";
export declare function getRouteMatches(routes: MatchRoute[], path: string, method: Method): {
    handler: import("./types").ApiHandler;
    params: Record<string, string>;
};
