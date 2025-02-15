import logger from "../config/logger";
import Toppings from "./toppingModel";

export class ToppingService {
    async create() {}
    async lists() {
        try {
            const result = await Toppings.find();
            return result;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
