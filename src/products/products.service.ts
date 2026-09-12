import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: Array<{ id: number; name: string; price: number }> = [];
  private nextId = 1;

  findAll() {
    // TODO: implementar este método
    return this.products;
  }

  findOne(id: number) {
    // TODO: implementar este método
    // TODO: lanzar NotFoundException si no existe
    if (!this.products.find((p) => p.id === id)) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return this.products.find((p) => p.id === id);
  }

  create(dto: CreateProductDto) {
    // TODO: implementar este método
    const product = { id: this.nextId++, ...dto };
    this.products.push(product);
    return product;
  }

  remove(id: number) {
    // TODO: implementar este método
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    this.products = this.products.filter((p) => p.id !== id);
    return product;
  }
}
