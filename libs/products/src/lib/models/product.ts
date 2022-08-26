import { category } from "./category";

export class product {
    id? : string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price?:  number;
    category?: category;
    CountinStock?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}