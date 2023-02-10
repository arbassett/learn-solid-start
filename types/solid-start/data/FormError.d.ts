export declare class ServerError extends Error {
    status: number;
    constructor(message: string, { status, stack }?: {
        status?: number;
        stack?: string;
    });
}
export declare class FormError extends ServerError {
    formError?: string;
    fields?: {};
    fieldErrors?: {
        [key: string]: string;
    };
    constructor(message: string, { fieldErrors, form, fields, stack }?: {
        fieldErrors?: {};
        form?: FormData;
        fields?: {};
        stack?: string;
    });
}
