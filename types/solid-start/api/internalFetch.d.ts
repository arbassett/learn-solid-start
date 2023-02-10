import type { MatchRoute } from "./types";
export declare const registerApiRoutes: (routes: MatchRoute[]) => void;
export declare function internalFetch(route: string, init: RequestInit): Promise<Response>;
