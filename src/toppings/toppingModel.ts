import mongoose from "mongoose";
import { Topping } from "./toppingTypes";

const toppingSchema = new mongoose.Schema<Topping>({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Toppings = mongoose.model("Topping", toppingSchema);

export default Toppings;
