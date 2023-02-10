import { ServerFunction } from "../server/server-functions/types";
interface WebSocketEvent {
    durableObject: any;
    request: Request;
}
export declare function createWebSocketServer(fn: ServerFunction<[WebSocket, WebSocketEvent], (a: WebSocket, b: WebSocketEvent) => void>): {
    connect: (id?: string) => WebSocket;
};
export {};
