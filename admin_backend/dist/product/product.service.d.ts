import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product } from './product.entinty';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    allProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    createProduct(product: CreateProductDto): Promise<Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProductById(id: string): Promise<void>;
}
