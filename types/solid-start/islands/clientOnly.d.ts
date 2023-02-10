import type { Component, ComponentProps, JSX } from "solid-js";
export default function clientOnly<T extends Component<any>>(fn: () => Promise<{
    default: T;
}>): (props: ComponentProps<T> & {
    fallback?: JSX.Element;
}) => any;
