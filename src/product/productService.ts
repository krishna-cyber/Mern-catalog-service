import productModel from "./productModel";
import { ProductDetails } from "./productTypes";

export default class ProductService {
    async create(productDetails: ProductDetails) {
        const category = new productModel(productDetails);

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
