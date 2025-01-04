import mongoose, { Schema } from "mongoose";

interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "additiol";
        avilableOptions: string[];
    };
}

interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    avilableOptions: string[];
}

export interface Category {
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

const priceConfigurationSchema = new Schema<PriceConfiguration>({
    priceType: {
        type: String,
        enum: ["base", "aditional"],
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

const categorySchema = new Schema<Category>({
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
});

export default mongoose.model("Category", categorySchema);
