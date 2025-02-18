import mongoose from "mongoose";

export interface Topping {
    name: string;
    tenantId: mongoose.Schema.Types.ObjectId;
    price: string;
    image: string;
}

export interface ToppingBodyRequest {
    name: string;
    tenantId: mongoose.Schema.Types.ObjectId;
    price: string;
}
