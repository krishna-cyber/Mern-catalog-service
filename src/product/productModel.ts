import mongoose, { Schema } from "mongoose";

const priceConfigurationSchema = new Schema({
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
            type: [String],
            required: true,
        },
        priceConfiguration: {
            type: Map,
            of: priceConfigurationSchema,
            required: true,
        },
        attributes: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: true,
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
            default: true,
        },
    },
    { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
