import { FormError } from "../../data";
import { ServerFunctionEvent } from "../types";
import { CreateServerFunction } from "./types";
export type { APIEvent } from "../../api/types";
export declare const server$: CreateServerFunction;
export declare function respondWith(request: Request, data: Response | Error | FormError | string | object, responseType: "throw" | "return"): Response;
export declare function handleServerRequest(event: ServerFunctionEvent): Promise<Response>;
