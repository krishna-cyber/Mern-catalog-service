import mongoose, { Schema } from "mongoose";
import { Attribute, Category, PriceConfiguration } from "./categoryTypes";

const priceConfigurationSchema = new Schema<PriceConfiguration>({
    priceType: {
        type: String,
        enum: ["base", "additional"],
        required: true,
    },
    avilableOptions: {
        type: [String],
        required: true,
    },
});

const attributeSchema = new Schema<Attribute>({
    name: {
        type: String,
        required: true,
    },
    widgetType: {
        type: String,
        enum: ["radio", "switch"],
        required: true,
    },
    defaultValue: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    avilableOptions: {
        type: [String],
        required: true,
    },
});

const categorySchema = new Schema<Category>(
    {
        name: {
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
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Category", categorySchema);
