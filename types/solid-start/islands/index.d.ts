import { Component } from "solid-js";
export { default as clientOnly } from "./clientOnly";
declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "solid-island": {
                "data-props": string;
                "data-component": string;
                "data-island": string;
                "data-when": "idle" | "load";
                children: JSX.Element;
            };
            "solid-children": {
                children: JSX.Element;
            };
        }
    }
}
export declare function island<T extends Component<any>>(Comp: T | (() => Promise<{
    default: T;
}>), path?: string): T;
