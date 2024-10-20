import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://kllqiqln:Hn9KZhfVtF3gIdcPslFqwIZepNaQbOhb@chimpanzee.rmq.cloudamqp.com/kllqiqln'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
    console.log("Microservice is listening");

}

bootstrap();
