import { useSession } from "next-auth/react";
import { db } from ".";
import Order from "../models/Order";


export const getOrderById = async( sub )=> {

    await db.connect();
    const order = await Order.findOne({ 'session.sub': sub }).lean();
    await db.disconnect();

    if ( !order ) {
        return null;
    }

    return JSON.parse(JSON.stringify(order));


}