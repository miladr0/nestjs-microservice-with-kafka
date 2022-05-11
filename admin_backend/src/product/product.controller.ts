import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product } from './product.entinty';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.allProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProduct);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProduct);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProductById(id);
  }
}
