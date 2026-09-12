import { Controller, Get, Post, Body } from '@nestjs/common';
// TODO: descomentar esta línea cuando OrdersService esté inyectado
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  // TODO: inyectar OrdersService acá
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  findAll() {
    // TODO: usar this.ordersService.findAll()
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    // TODO: usar this.ordersService.create(dto)
    return this.ordersService.create(dto);
  }
}
