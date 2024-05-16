import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto).save();
    console.log(createProductDto)
    return createdProduct;
  }

  async findAllProducts() : Promise<Product[]>{
    return await this.productModel.find().exec();
  }

  async findOneProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async removeProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
