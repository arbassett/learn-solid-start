/*!
 * Original code by Remix Sofware Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE.remix.md for details
 *
 * Credits to the Remix team for the Form implementation:
 * https://github.com/remix-run/remix/blob/main/packages/remix-react/components.tsx#L865
 */
import { ComponentProps } from "solid-js";
export interface FormAction<Data> {
    action: string;
    method: string;
    formData: Data;
    encType: string;
}
export { FormError } from "./FormError";
export { FormImpl as Form };
type FormEncType = "application/x-www-form-urlencoded" | "multipart/form-data";
export interface SubmitOptions {
    /**
     * The HTTP method used to submit the form. Overrides `<form method>`.
     * Defaults to "GET".
     */
    method?: FormMethod;
    /**
     * The action URL path used to submit the form. Overrides `<form action>`.
     * Defaults to the path of the current route.
     *
     * Note: It is assumed the path is already resolved. If you need to resolve a
     * relative path, use `useFormAction`.
     */
    action?: string;
    /**
     * The action URL used to submit the form. Overrides `<form encType>`.
     * Defaults to "application/x-www-form-urlencoded".
     */
    encType?: FormEncType;
    /**
     * Set `true` to replace the current entry in the browser's history stack
     * instead of creating a new one (i.e. stay on "the same page"). Defaults
     * to `false`.
     */
    replace?: boolean;
}
/**
 * Submits a HTML `<form>` to the server without reloading the page.
 */
export interface SubmitFunction {
    (
    /**
     * Specifies the `<form>` to be submitted to the server, a specific
     * `<button>` or `<input type="submit">` to use to submit the form, or some
     * arbitrary data to submit.
     *
     * Note: When using a `<button>` its `name` and `value` will also be
     * included in the form data that is submitted.
     */
    target: HTMLFormElement | HTMLButtonElement | HTMLInputElement | FormData | URLSearchParams | {
        [name: string]: string;
    } | null, 
    /**
     * Options that override the `<form>`'s own attributes. Required when
     * submitting arbitrary data without a backing `<form>`.
     */
    options?: SubmitOptions): void;
}
export type FormMethod = "get" | "post" | "put" | "patch" | "delete";
export interface FormProps extends Omit<ComponentProps<"form">, "method" | "onSubmit"> {
    /**
     * The HTTP verb to use when the form is submit. Supports "get", "post",
     * "put", "delete", "patch".
     *
     * Note: If JavaScript is disabled, you'll need to implement your own "method
     * override" to support more than just GET and POST.
     */
    method?: FormMethod;
    /**
     * Normal `<form action>` but supports React Router's relative paths.
     */
    action?: string;
    /**
     * Normal `<form encType>`.
     *
     * Note: Remix only supports `application/x-www-form-urlencoded` right now
     * but will soon support `multipart/form-data` as well.
     */
    /**
     * Forces a full document navigation instead of a fetch.
     */
    reloadDocument?: boolean;
    /**
     * Replaces the current entry in the browser history stack when the form
     * navigates. Use this if you don't want the user to be able to click "back"
     * to the page with the form on it.
     */
    replace?: boolean;
    onSubmit?: (event: SubmitEvent) => void;
    /**
     * A function to call when the form is submitted. If you call
     * `event.preventDefault()` then this form will not be called.
     */
    onSubmission?: (submission: FormAction<FormData>) => void;
}
/**
 * A Remix-aware `<form>`. It behaves like a normal form except that the
 * interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */
interface FormImplProps extends FormProps {
    onSubmmsion?: (submission: FormAction<FormData>) => void;
}
export declare let FormImpl: (_props: FormImplProps) => import("solid-js").JSX.Element;
export interface SubmitOptions {
    /**
     * The HTTP method used to submit the form. Overrides `<form method>`.
     * Defaults to "GET".
     */
    method?: FormMethod;
    /**
     * The action URL path used to submit the form. Overrides `<form action>`.
     * Defaults to the path of the current route.
     *
     * Note: It is assumed the path is already resolved. If you need to resolve a
     * relative path, use `useFormAction`.
     */
    action?: string;
    /**
     * The action URL used to submit the form. Overrides `<form encType>`.
     * Defaults to "application/x-www-form-urlencoded".
     */
    /**
     * Set `true` to replace the current entry in the browser's history stack
     * instead of creating a new one (i.e. stay on "the same page"). Defaults
     * to `false`.
     */
    replace?: boolean;
}
export declare function useSubmitImpl(onSubmission: (sub: FormAction<FormData>) => void): SubmitFunction;
