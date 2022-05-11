import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    getAllProducts(): Promise<Product[]>;
}
