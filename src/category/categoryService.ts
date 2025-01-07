import categoryModel from "./categoryModel";
import { Attribute, Category, PriceConfiguration } from "./categoryTypes";

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

    async listCategories() {
        return categoryModel.find({});
    }

    async getById(_id: string) {
        return categoryModel.findById(_id);
    }

    async updateById(id: string, data: Category) {
        return categoryModel.findByIdAndUpdate(id, data);
    }

    async deleteById(id: string) {
        return categoryModel.deleteOne({ _id: id });
    }
}
