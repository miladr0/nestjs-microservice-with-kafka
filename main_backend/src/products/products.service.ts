import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findOne({ id });
  }

  async createProduct(product: Product): Promise<Product> {
    return await this.productModel.create(product);
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return await this.productModel.findOneAndUpdate({ id }, product, {
      new: true,
    });
  }

  async updateLikes(id: string): Promise<Product> {
    return await this.productModel.findOneAndUpdate(
      { id },
      { $inc: { likes: 1 } },
      {
        new: true,
      },
    );
  }

  async deleteProduct(id: string): Promise<void> {
    const res = await this.productModel.deleteOne({ id });

    if (res?.deletedCount === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
