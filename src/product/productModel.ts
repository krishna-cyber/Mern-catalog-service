import mongoose, { Schema } from "mongoose";
import { ProductAttribute } from "./productTypes";

const attributeSchema = new Schema<ProductAttribute>({
    name: {
        type: String,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const priceConfigurationSchema = new Schema({
    priceType: {
        type: String,
        enum: ["base", "additional"],
        required: true,
    },
    avilableOptions: {
        type: Map,
        of: Number,
    },
});

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            requied: true,
        },
        image: {
            type: String,
            required: true,
        },
        priceConfiguration: {
            type: Map,
            of: priceConfigurationSchema,
            required: true,
        },
        attributes: {
            type: [attributeSchema],
        },
        tenantId: {
            type: String,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        isPublish: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Product", productSchema);
