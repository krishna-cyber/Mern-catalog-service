import { checkSchema } from "express-validator";

export default checkSchema(
    {
        id: {
            isMongoId: {
                errorMessage: "Invalid Id",
            },
        },
    },
    ["params"],
);
