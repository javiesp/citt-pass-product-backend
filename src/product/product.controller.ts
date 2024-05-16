import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  @MessagePattern("createProduct")// se comunica con la api por medio de message pattern
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/find-all-products')
  @MessagePattern("findAllProducts")
  findAll() {
    return this.productService.findAllProducts();
  }

  @Get('/find-one-product/:id') 
  @MessagePattern('findOneProduct')
  findOne(id: string) {
    return this.productService.findOneProduct(id);
  }

  @Patch('/update-product/:id')
  @MessagePattern('updateProduct')
  update(payload) { 
    console.log(payload) 
    return this.productService.updateProduct(payload.id, payload.updateProductDto);
  }

  @Delete('/delete-product/:id')
  @MessagePattern('removeProduct')
  remove(id: string) {
    return this.productService.removeProduct(id);
  }
}
