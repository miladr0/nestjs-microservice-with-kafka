import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
