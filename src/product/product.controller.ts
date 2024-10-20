import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        private httpService:HttpService
    
    ){
    }
    @Get()
    async all() {
        return this.productService.all();
    }
    @Post(':id/like')
async like(@Param('id') id: number) {
    // Encuentra el producto antes de la actualización
    const product = await this.productService.findOne(id);
    console.log('Product before update:', product);

    if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Actualiza el producto
    const updatedProduct = await this.productService.update(id, {
        likes: (product.likes || 0) + 1
    });
    console.log('Product after update:', updatedProduct);

    // Luego realiza la solicitud HTTP
    try {
        const response = await firstValueFrom(
            //Cambiar a http://localhost:8000/api/products/${id}/like si la base de datos es local
            //Si no a http://admin_service:8000/api/products/${id}/like
            this.httpService.post(`http://admin_service:8000/api/products/${id}/like`, {})
        );
        console.log('HTTP response:', response.data);
    } catch (error) {
        console.error('Error making HTTP request:', error);
    }

    return updatedProduct;
}
    @EventPattern('product_created')
    async productCreated(product:any){
        await this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,
        });
    }
    @EventPattern('product_updated')
    async productUpdated(product:any){
        
        await this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,
        });
    }
    @EventPattern('product_deleted')
    async productDeleted(id:number){
        
        await this.productService.delete(id);
        };
    
}
