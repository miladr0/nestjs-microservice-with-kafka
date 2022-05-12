import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://127.0.0.1:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });

  await app.startAllMicroservices();
  await app.listen(8001);
}
bootstrap();
