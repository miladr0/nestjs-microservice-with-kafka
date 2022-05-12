import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private httpService: HttpService,
  ) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post('/:id/like')
  async updateLikes(@Param('id') id: string) {
    const result = await this.productsService.updateLikes(id);
    console.log('result: ', result);
    this.httpService
      .post(`http://127.0.0.1:8000/api/product/${id}/like`, {
        likes: result.likes,
      })
      .subscribe((res) => {
        console.log(
          '%cproducts.controller.ts line:31 res',
          'color: #007acc;',
          res,
        );
      });

    return result;
  }

  @EventPattern('CREATE_PRODUCT')
  async createProduct(data: Product) {
    return this.productsService.createProduct(data);
  }

  @EventPattern('UPDATE_PRODUCT')
  async updateProduct(data: { id: string; updateProduct: Product }) {
    return this.productsService.updateProduct(data.id, data.updateProduct);
  }

  @EventPattern('DELETE_PRODUCT')
  async deleteProduct(id: string) {
    return this.productsService.deleteProduct(id);
  }
}
