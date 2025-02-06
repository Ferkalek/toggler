import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private readonly dataPath = path.join(process.cwd(), 'backend', 'src', 'assets', 'products.json');

  private async readData(): Promise<Product[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf8');
      return JSON.parse(data).products;
    } catch (error) {
      console.error('Error reading products:', error);
      return [];
    }
  }

  private async writeData(products: Product[]): Promise<void> {
    await fs.writeFile(this.dataPath, JSON.stringify({ products }, null, 2), 'utf8');
  }

  async findAll(): Promise<Product[]> {
    return this.readData();
  }

  async findOne(id: string): Promise<Product> {
    const products = await this.readData();
    const product = products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const products = await this.readData();
    const product: Product = {
      id: uuidv4(),
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.push(product);
    await this.writeData(products);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const products = await this.readData();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    products[index] = {
      ...products[index],
      ...updateProductDto,
      updatedAt: new Date(),
    };

    await this.writeData(products);
    return products[index];
  }

  async remove(id: string): Promise<void> {
    const products = await this.readData();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    products.splice(index, 1);
    await this.writeData(products);
  }
}
