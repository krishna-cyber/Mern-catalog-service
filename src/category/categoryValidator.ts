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
        priceConfiguration: {
            notEmpty: {
                errorMessage: "Price Configuration is Required",
            },
        },
        "priceConfiguration.*.priceType": {
            isString: {
                errorMessage: "Pricetype must be string",
            },
            isIn: {
                options: [["base", "additional"]],
                errorMessage: "Invalid priceType options",
            },
        },
        attributes: {
            notEmpty: {
                errorMessage: "Attributes are required",
            },
        },
    },
    ["body"],
);
