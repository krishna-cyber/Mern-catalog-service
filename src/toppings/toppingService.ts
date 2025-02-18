import mongoose from "mongoose";
import { ImagekitStorage } from "../common/services/imageKit/imagekitStorage";
import logger from "../config/logger";
import Toppings from "./toppingModel";

interface ToppingCreateData {
    file: Express.Multer.File;
    name: string;
    tenantId: mongoose.Schema.Types.ObjectId;
    price: string;
}

export class ToppingService {
    constructor(private readonly imageUploadService: ImagekitStorage) {}

    async create({ file, name, tenantId, price }: ToppingCreateData) {
        //todo
        //upload file , if successfully uploaded deleted stored file
        //get url
        //save in database and return id of topping
        const uploadDetails = await this.imageUploadService.uploadSingle(file);

        const { _id } = await new Toppings({
            name,
            tenantId,
            price,
            image: uploadDetails.url,
        }).save();
        return { _id };
    }
    async lists(id: string) {
        const filter = {
            ...(id && { tenantId: id }),
        };
        try {
            const result = await Toppings.find(filter);
            return result;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
