import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) {

    }

    async all():Promise<Product[]>{
        return this.productModel.find().exec();
    }

    async create(data): Promise<Product> {
        return new this.productModel(data).save();
    }
    async findOne(id: number): Promise<Product>{
        return this.productModel.findOne({id});
    }

    async update(id: number, data: Partial<Product>): Promise<Product | null> {
        // `findOneAndUpdate` devuelve el documento antiguo por defecto, debes especificar `{ new: true }` para obtener el documento actualizado
        return this.productModel.findOneAndUpdate(
            { id },
            { $set: data },
            { new: true, useFindAndModify: false } // `useFindAndModify` debe estar en false para evitar deprecaciones
        ).exec();
    }
    async delete(id:number):Promise<void>{
        await this.productModel.deleteOne({id}).exec();
    }
        
}
