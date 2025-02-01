import { checkSchema } from "express-validator";

export default checkSchema(
    {
        currentPage: {
            customSanitizer: {
                options: (value) => {
                    const parsedValue = Number(value);
                    return isNaN(parsedValue) ? 1 : parsedValue;
                },
            },
        },
        pageSize: {
            customSanitizer: {
                options: (value) => {
                    const parsedValue = Number(value);
                    return isNaN(parsedValue) ? 10 : parsedValue;
                },
            },
        },
        tenantId: {
            customSanitizer: {
                options: (value: string) => {
                    return value || "";
                },
            },
        },
        search: {
            customSanitizer: {
                options: (value: string) => {
                    return value || "";
                },
            },
        },
        categoryId: {
            customSanitizer: {
                options: (value: string) => {
                    return value || "";
                },
            },
        },
    },
    ["query"],
);
