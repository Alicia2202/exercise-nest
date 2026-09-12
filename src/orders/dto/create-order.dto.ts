import {IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  // TODO: agregar decorador de validación
  @IsNumber()
  @IsInt()
  @IsPositive()
  productId: number;

  // TODO: agregar decorador de validación
  @IsNumber()
  @IsInt()
  @IsPositive()
  quantity: number;
}
