import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product } from './product.entinty';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    createProduct(createProduct: CreateProductDto): Promise<Product>;
    updateProduct(id: string, updateProduct: UpdateProductDto): Promise<Product>;
    deleteProductById(id: string): Promise<void>;
}
