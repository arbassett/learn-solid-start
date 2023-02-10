import { JSX, ParentProps } from "solid-js";
export declare function ErrorBoundary(props: ParentProps<{
    fallback?: (e: any, reset: () => void) => JSX.Element;
}>): JSX.Element;
export declare function ErrorMessage(props: {
    error: any;
}): JSX.Element;
