
import { orderItem } from "./order-item";
import {  user }  from "@itechnology/users";

export class  order {
    _id?: string;
    orderItems?: orderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: user;
    dateOrdered?: string;

}