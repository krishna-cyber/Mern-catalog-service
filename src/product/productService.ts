import mongoose from "mongoose";
import Product from "./productModel";
import { ProductDetails } from "./productTypes";

export default class ProductService {
    async create(productDetails: ProductDetails) {
        const product = new Product(productDetails);

        return product.save();
    }

    async getProductLists(
        currentPage: number,
        pageSize: number,
        categoryId: string | null,
        tenantId: string | null,
        searchString: string,
        isPublish: boolean,
    ) {
        interface FilteredQueryParams {
            name?: { $regex: string; $options: string };
            tenantId?: string;
            categoryId?: mongoose.Types.ObjectId;
            isPublish?: boolean | object;
        }
        const filteredQueryParams: FilteredQueryParams = {
            // ...(tenantId && { tenantId }),
            // ...(searchString && { searchString }),  //येसरी पनि लेखन सकिन्छ ,if लगाउने भन्दा यो तरिका राम्रो र छोटो छ
            ...(isPublish && { isPublish: Boolean(isPublish) }),
        };

        if (tenantId) {
            filteredQueryParams.tenantId = tenantId;
        }

        if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
            filteredQueryParams.categoryId = new mongoose.Types.ObjectId(
                categoryId,
            );
        }

        if (searchString) {
            filteredQueryParams.name = {
                $regex: `^.*${searchString}.*$`,
                $options: "i",
            };
        }

        const data = await Product.find(filteredQueryParams)
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        const totalCounts = await Product.countDocuments();

        const response = {
            data,
            totalCounts,
        };

        return response;
    }

    async listCategories() {
        return Product.find({});
    }

    async getById(_id: string) {
        return Product.findById(_id);
    }

    // async updateById(id: string, data: Category) {
    //     return Product.findByIdAndUpdate(id, data);
    // }

    async deleteById(id: string) {
        return Product.deleteOne({ _id: id });
    }
}
