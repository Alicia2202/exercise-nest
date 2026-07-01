# SOLUCIÓN - Solo para el docente

> [!CAUTION]
> Este archivo contiene las soluciones. No lo subas al repositorio que van a
> forkear los alumnos.

---

## 1. ProductsService - Implementación correcta

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: Array<{ id: number; name: string; price: number }> = [];
  private nextId = 1;

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  create(dto: CreateProductDto) {
    const product = { id: this.nextId++, ...dto };
    this.products.push(product);
    return product;
  }

  remove(id: number) {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== id);
    return product;
  }
}
```

## 2. DTOs con decoradores de validación

### `src/products/dto/create-product.dto.ts`

```typescript
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
```

### `src/orders/dto/create-order.dto.ts`

```typescript
import { IsNumber, IsInt, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  quantity: number;
}
```

## 3. OrdersController con inyección correcta

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
```

## 4. OrdersModule con import correcto

```typescript
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
```

---

## Notas

- El `ValidationPipe` ya está configurado en `main.ts` con `whitelist: true` y
  `transform: true`. Al agregar los decoradores, la validación funciona
  automáticamente.
- `ProductsModule` exporta `ProductsService`, por lo que al importarlo en
  `OrdersModule`, `OrdersService` puede inyectarlo sin problemas.
- Al usar `ParseIntPipe` en los parámetros `:id`, Nest convierte el string a
  número automáticamente.
