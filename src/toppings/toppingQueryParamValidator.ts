import { checkSchema } from "express-validator";

export default checkSchema(
    {
        tenantId: {
            customSanitizer: {
                options: (value: string) => {
                    return value || "";
                },
            },
        },
    },
    ["query"],
);
