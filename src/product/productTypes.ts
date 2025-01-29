import { PriceConfiguration } from "../category/categoryTypes";

export interface ProductAttribute {
    name: string;
    value: string;
}

export interface ProductDetails {
    name: string;
    description: string;
    image: string[];
    priceConfiguration: PriceConfiguration;
    attributes: [ProductAttribute];
    tenantId: string;
    categoryId: string;
    isPublish: boolean;
}

export interface ProductBodyRequest {
    name: string;
    description: string;
    priceConfiguration: string;
    attributes: string;
    tenantId: string;
    categoryId: string;
    isPublish: boolean;
}
