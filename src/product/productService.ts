import Product from "./productModel";
import { ProductDetails } from "./productTypes";

export default class ProductService {
    async create(productDetails: ProductDetails) {
        const product = new Product(productDetails);

        return product.save();
    }

    async getProductLists(
        currentPage: number = 1,
        pageSize: number = 10,
        tenantId: string | null = "",
        categoryId: string | null = "",
        searchString: string = "",
    ) {
        interface FilteredQueryParams {
            name?: { $regex: string; $options: string };
            tenantId?: string;
            categoryId?: string;
        }
        const filteredQueryParams: FilteredQueryParams = {};

        if (tenantId) {
            filteredQueryParams.tenantId = tenantId;
        }

        if (categoryId) {
            filteredQueryParams.categoryId = categoryId;
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
            totalCounts: results[0].totalCounts[0].count || 0,
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
