import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
// TODO: importar ProductsModule acá
// import { ProductsModule } from '../products/products.module';
// TODO: agregar OrdersService a providers
// import { OrdersService } from './orders.service';

@Module({
  imports: [
    // TODO: este módulo necesita importar ProductsModule para que OrdersService funcione
  ],
  controllers: [OrdersController],
  providers: [
    // TODO: agregar OrdersService acá
  ],
})
export class OrdersModule {}
