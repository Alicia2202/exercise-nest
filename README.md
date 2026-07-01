# Ejercicio de Clase: API NestJS con TODOs

API REST de productos y pedidos construida con NestJS y TypeScript, diseñada como
ejercicio de clase. **El proyecto compila y arranca, pero está roto a propósito.**
Tu tarea es encontrar y resolver los problemas para que todos los endpoints
funcionen correctamente.

## Stack

- **NestJS** v10 (última estable)
- **TypeScript** en modo estricto
- **class-validator** y **class-transformer** para validación
- **Arreglos en memoria** (sin base de datos)

## Endpoints esperados

| Método | Ruta             | Respuesta esperada              |
| ------ | ---------------- | ------------------------------- |
| GET    | `/products`      | 200 - Lista de productos        |
| GET    | `/products/:id`  | 200 - Producto / 404 si no existe |
| POST   | `/products`      | 201 - Producto creado            |
| DELETE | `/products/:id`  | 200 - Producto eliminado / 404   |
| GET    | `/orders`        | 200 - Lista de pedidos           |
| POST   | `/orders`        | 201 - Pedido creado / 400 si no existe el producto |

## Instrucciones

1. Hacé **fork** de este repositorio
2. Cloná tu fork localmente
3. Instalá las dependencias con `npm install`
4. Levantá el servidor con `npm run start:dev`
5. Probá los endpoints con **Postman**, **Thunder Client** o `curl`
6. Completá los 4 problemas listados abajo hasta que todos los endpoints
   respondan correctamente

> [!IMPORTANT]
> El comando `npm run build` debe compilar sin errores y el servidor debe
> arrancar sin problemas en todo momento. Los bugs son de lógica y
> configuración, no de sintaxis.

## Los 4 problemas a resolver

Buscá `TODO` en el código para encontrar todos los lugares que necesitan
atención.

### 1. Implementar los métodos de `ProductsService`

📁 `src/products/products.service.ts`

Los métodos `findAll()`, `findOne(id)`, `create(dto)` y `remove(id)` están
declarados pero retornan `null`. Implementalos usando el arreglo `products` y el
contador `nextId` que ya tenés declarados.

El método `findOne` debe **lanzar `NotFoundException`** si el producto con ese
id no existe.

### 2. Agregar decoradores de validación a los DTOs

📁 `src/products/dto/create-product.dto.ts`
📁 `src/orders/dto/create-order.dto.ts`

Ambos DTOs tienen los campos declarados pero sin decoradores de
`class-validator`. Agregá las validaciones apropiadas:

- `name`: no vacío, string
- `price`: número positivo
- `productId`: número, entero positivo
- `quantity`: número, entero positivo

El `ValidationPipe` global ya está configurado en `main.ts` — solo falta
decorar los DTOs.

### 3. Inyectar `OrdersService` en `OrdersController`

📁 `src/orders/orders.controller.ts`

El constructor del controlador no inyecta `OrdersService`. Descomentá el
import y la inyección, y actualizá los métodos `findAll()` y `create()` para
que usen el servicio.

### 4. Importar `ProductsModule` en `OrdersModule` y registrar `OrdersService`

📁 `src/orders/orders.module.ts`

`OrdersService` necesita `ProductsService` para validar que un producto existe
antes de crear un pedido. Pero `OrdersModule` no importa `ProductsModule` ni
registra `OrdersService` como provider.

Agregá la importación de `ProductsModule` y registrá `OrdersService` en el
arreglo `providers`.

## Verificación final

Cuando hayas resuelto los 4 problemas, todos los endpoints deben comportarse
así:

```bash
# Crear productos
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado","price":150}'
# → 201 { id: 1, name: "Teclado", price: 150 }

# Listar productos
curl http://localhost:3000/products
# → 200 [{ id: 1, name: "Teclado", price: 150 }]

# Obtener producto existente
curl http://localhost:3000/products/1
# → 200 { id: 1, name: "Teclado", price: 150 }

# Obtener producto inexistente
curl http://localhost:3000/products/999
# → 404 { message: "Producto con id 999 no encontrado", ... }

# Eliminar producto
curl -X DELETE http://localhost:3000/products/1
# → 200 { id: 1, name: "Teclado", price: 150 }

# Crear pedido con producto existente
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'
# → 201 { id: 1, productId: 1, quantity: 2 }

# Crear pedido con producto inexistente → error
# Crear producto sin nombre → error de validación 400
```

¡Buena suerte!
