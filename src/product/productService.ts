import { PriceConfiguration } from "../category/categoryTypes";
import productModel from "./productModel";
import { ProductAttribute } from "./productTypes";

export default class ProductService {
    async create(
        name: string,
        description: string,
        image: string,
        priceConfiguration: PriceConfiguration,
        attributes: [ProductAttribute],
        tenantId: string,
        categoryId: string,
        isPublish = false,
    ) {
        const category = new productModel({
            name,
            description,
            image,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublish,
        });

        return category.save();
    }

    async listCategories() {
        return productModel.find({});
    }

    async getById(_id: string) {
        return productModel.findById(_id);
    }

    // async updateById(id: string, data: Category) {
    //     return productModel.findByIdAndUpdate(id, data);
    // }

    async deleteById(id: string) {
        return productModel.deleteOne({ _id: id });
    }
}
