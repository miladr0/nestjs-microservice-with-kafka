import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product } from './product.entinty';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async allProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      throw error;
    }
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const { title, image } = product;
    const newProduct = this.productRepository.create({ title, image });
    await this.productRepository.save(newProduct);

    return newProduct;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productRepository.save({ ...updateProductDto, id: id });
  }

  async deleteProductById(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
