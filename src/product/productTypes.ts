import { PriceConfiguration } from "../category/categoryTypes";

export interface ProductAttribute {
    name: string;
    value: string;
}

export interface productDetails {
    name: string;
    description: string;
    image: ArrayBuffer;
    priceConfiguration: PriceConfiguration;
    attributes: [ProductAttribute];
    tenantId: string;
    categoryId: string;
    isPublish: boolean;
}
