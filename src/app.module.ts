import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    //Si estas con un contenedor de docker: mongodb://nest-main:27017/nest_main
    //Local: mongodb://localhost:27017/nest_main
    MongooseModule.forRoot('mongodb://nest-main:27017/nest_main', { 
      autoCreate: true,
    }),
    ProductModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
