import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  private orders: Array<{ id: number; productId: number; quantity: number }> =
    [];
  private nextId = 1;

  constructor(private readonly productsService: ProductsService) {}

  findAll() {
    return this.orders;
  }

  create(dto: CreateOrderDto) {
    const product = this.productsService.findOne(dto.productId);

    if (!product) {
      throw new Error(`Producto con id ${dto.productId} no encontrado`);
    }

    const order = { id: this.nextId++, ...dto };
    this.orders.push(order);
    return order;
  }
}
