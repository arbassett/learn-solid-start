export declare const XSolidStartStatusCodeHeader = "x-solidstart-status-code";
export declare const XSolidStartLocationHeader = "x-solidstart-location";
export declare const LocationHeader = "Location";
export declare const ContentTypeHeader = "content-type";
export declare const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
export declare const XSolidStartContentTypeHeader = "x-solidstart-content-type";
export declare const XSolidStartOrigin = "x-solidstart-origin";
export declare const JSONResponseType = "application/json";
/**
 * A JSON response. Converts `data` to JSON and sets the `Content-Type` header.
 */
export declare function json<Data>(data: Data, init?: number | ResponseInit): Response;
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */
export declare function redirect(url: string, init?: number | ResponseInit): Response;
export declare function eventStream(request: Request, init: (send: (event: string, data: any) => void) => () => void): Response;
export declare function isResponse(value: any): value is Response;
export declare function isRedirectResponse(response: Response | any): response is Response;
export declare class ResponseError extends Error implements Response {
    status: number;
    headers: Headers;
    name: string;
    ok: boolean;
    statusText: string;
    redirected: boolean;
    url: string;
    constructor(response: Response);
    response: () => Response;
    type: ResponseType;
    clone(): Response;
    get body(): ReadableStream<Uint8Array>;
    bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    text(): Promise<string>;
    json(): Promise<any>;
}
