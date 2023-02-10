export declare function getApiHandler(url: URL, method: string): {
    handler: import("./types").ApiHandler;
    params: Record<string, string>;
};
export declare function isApiRequest(request: Request): boolean;
export * from "../server/responses";
export type { APIEvent } from "./types";
