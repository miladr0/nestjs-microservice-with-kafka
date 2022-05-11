import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nest_admin',
      autoLoadEntities: true,
      // entities: [],
      synchronize: true, // shouldn't be used in production, otherwise you will loose your data
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
