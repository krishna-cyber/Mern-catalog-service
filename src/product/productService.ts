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
    ) {
        interface FilteredQueryParams {
            name?: { $regex: string; $options: string };
            tenantId?: string;
            categoryId?: mongoose.Types.ObjectId;
        }
        const filteredQueryParams: FilteredQueryParams = {};

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

        const results = await Product.aggregate([
            {
                $match: filteredQueryParams,
            },
            {
                $facet: {
                    totalCounts: [{ $count: "count" }],
                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: (currentPage - 1) * pageSize },
                        { $limit: pageSize },
                    ],
                },
            },
        ]);

        const response = {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            data: results[0]?.data || [],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            totalCounts: results[0]?.totalCounts[0]?.count || 0,
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
