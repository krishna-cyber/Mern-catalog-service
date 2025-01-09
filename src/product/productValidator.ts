import { UploadedFile } from "express-fileupload";
import { checkSchema } from "express-validator";

export default checkSchema(
    {
        name: {
            isString: {
                errorMessage: "Name must be string",
            },
            notEmpty: {
                errorMessage: "Name is required",
            },
        },
        description: {
            notEmpty: {
                errorMessage: "Description is required",
            },
            isString: {
                errorMessage: "Description must be string",
            },
        },
        priceConfiguration: {
            notEmpty: {
                errorMessage: "Price configuration is required",
            },
        },
        attributes: {
            notEmpty: {
                errorMessage: "Attributes is required",
            },
        },
        categoryId: {
            notEmpty: {
                errorMessage: "Category id is required",
            },
        },
        tenantId: {
            notEmpty: {
                errorMessage: "Tenant is required",
            },
        },
        image: {
            custom: {
                options: (value, { req }) => {
                    const files = req.files as UploadedFile[];

                    if (!files) {
                        throw new Error("File is required");
                    }
                    return true;
                },
            },
        },
    },
    ["body"],
);
