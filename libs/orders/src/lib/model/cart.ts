export class Cart {
    items?: cartItem[];
}

export class cartItem {
    productId?: string;
    quantity?: number;
}

export class cartItemProduct {
    product?: any;
    quantity?: number;
}