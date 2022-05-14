import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MAIN_PRODUCT_QUEUE } from 'src/constants/constants';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product } from './product.entinty';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(MAIN_PRODUCT_QUEUE) private readonly mainProductQueue: ClientProxy,
  ) {}

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
    const product = await this.productService.createProduct(createProduct);

    this.mainProductQueue.emit('CREATE_PRODUCT', product);
    return product;
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Product> {
    const result = await this.productService.updateProduct(id, updateProduct);
    this.mainProductQueue.emit('UPDATE_PRODUCT', {
      id,
      updateProduct,
    });

    return result;
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<void> {
    const result = await this.productService.deleteProductById(id);
    this.mainProductQueue.emit('DELETE_PRODUCT', id);

    return result;
  }

  @Post('/:id/like')
  async updateLikes(
    @Param('id') id: string,
    @Body('likes') likes: number,
  ): Promise<Product> {
    const result = await this.productService.updateLikes(id, { likes });

    return result;
  }
}
