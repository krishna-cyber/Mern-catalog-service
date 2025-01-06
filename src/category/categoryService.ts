import categoryModel from "./categoryModel";
import { Attribute, PriceConfiguration } from "./categoryTypes";

export default class CategoryService {
    constructor() {}

    async create(
        name: string,
        priceConfiguration: PriceConfiguration,
        attributes: Attribute,
    ) {
        const category = new categoryModel({
            name,
            priceConfiguration,
            attributes,
        });

        return category.save();
    }
}
