import { A as BaseA, Location, Navigator } from "@solidjs/router";
import { Accessor, ComponentProps } from "solid-js";
declare const A: (props: ComponentProps<typeof BaseA>) => import("solid-js").JSX.Element;
declare const Routes: (props: ComponentProps<any>) => import("solid-js").JSX.Element;
declare const Outlet: () => import("solid-js").JSX.Element;
declare const useLocation: () => Location<unknown>;
declare const useNavigate: () => Navigator;
declare global {
    interface Window {
        LOCATION: Accessor<Location>;
        NAVIGATE: Navigator;
    }
}
export { A, Outlet, Routes, useLocation, useNavigate };
