import {IsNotEmpty,IsNumber,IsString,IsPositive } from "class-validator";

export class CreateProductDto {
  // TODO: agregar decorador de validación
  @IsNotEmpty()
  @IsString()
  name: string;

  // TODO: agregar decorador de validación
  @IsNumber()
  @IsPositive()
  price: number;
}
