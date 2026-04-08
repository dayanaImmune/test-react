# bookstore API (MySQL sin Docker)

API con Node.js + Express que incluye:

- Router modular
- Autenticación JWT
- Hash de contraseñas con bcrypt
- Encriptación AES-256-CBC de un campo sensible
- CRUD sobre tablas relacionales en MySQL
- Tests con Vitest + Supertest

## Tema

Gestión de libros y categorías.

## Entidades

- `users`
- `categories`
- `books` → relacionada con `categories` y `users`

## Seguridad

- `password_hash` con bcrypt
- `supplier_cost` guardado cifrado
- rutas protegidas con JWT

## Requisitos previos

Necesitas tener **MySQL instalado localmente** y el servidor arrancado.

## Crear la base de datos local

1. Copia variables:

```bash
cp .env.example .env
```

2. Asegúrate de que MySQL está corriendo en tu máquina.

3. Inicializa la base de datos y tablas:

```bash
npm install
npm run init-db
```

## Arranque

```bash
npm run dev
```

## Tests

Los tests están preparados para ejecutarse **sin MySQL real**, porque mockean la capa de repositorios.

```bash
npm run test
```

## Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Categories

- `GET /api/categories`
- `GET /api/categories/:id`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

### Books

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`
