import type { JSX } from "solid-js";
declare global {
    interface Window {
        INSPECT: () => void;
    }
}
export default function mount(code?: () => JSX.Element, element?: Document): void;
