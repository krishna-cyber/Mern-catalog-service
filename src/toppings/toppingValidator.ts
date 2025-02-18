import { checkSchema } from "express-validator";

export default checkSchema({
    name: {
        isString: {
            errorMessage: "Name must be string",
        },
        notEmpty: {
            errorMessage: "Name is required",
        },
    },
    price: {
        isString: {
            errorMessage: "Name must be string",
        },
        notEmpty: {
            errorMessage: "Name is required",
        },
    },
    tenantId: {
        isMongoId: {
            errorMessage: "Invalid objectId",
        },
        notEmpty: {
            errorMessage: "tenantId is required",
        },
    },
    image: {
        custom: {
            options: (value, { req }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const file = req.file;

                if (!file) {
                    throw new Error("File is required");
                }
                return true;
            },
        },
    },
});
