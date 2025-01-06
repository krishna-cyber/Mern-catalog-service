export interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "additiol";
        avilableOptions: string[];
    };
}

export interface Attribute {
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

export interface CreateCategoryRequest {
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute;
}
