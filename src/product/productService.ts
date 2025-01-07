import productModel from "./productModel";

export default class ProductService {
    constructor() {}

    async create(
        name: string,
        // priceConfiguration: PriceConfiguration,
        // attributes: Attribute,
    ) {
        const category = new productModel({
            name,
            // priceConfiguration,
            // attributes,
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
