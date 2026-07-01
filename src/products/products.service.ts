import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: Array<{ id: number; name: string; price: number }> = [];
  private nextId = 1;

  findAll() {
    // TODO: implementar este método
    return null;
  }

  findOne(id: number) {
    // TODO: implementar este método
    // TODO: lanzar NotFoundException si no existe
    return null;
  }

  create(dto: CreateProductDto) {
    // TODO: implementar este método
    return null;
  }

  remove(id: number) {
    // TODO: implementar este método
    return null;
  }
}
