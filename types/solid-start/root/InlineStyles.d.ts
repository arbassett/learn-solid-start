declare global {
    const $ROUTE_LAYOUTS: Record<string, {
        layouts: any[];
        id: string;
    }>;
}
declare var routeLayouts: Record<string, {
    layouts: any[];
    id: string;
}>;
export { routeLayouts };
export declare function InlineStyles(): import("solid-js").JSX.Element;
