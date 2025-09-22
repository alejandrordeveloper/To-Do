# Todo-App

Aplicación web para gestionar tareas y usuarios con verificación por correo electrónico.

## Características
- Registro de usuarios con validación y verificación por email
- Login de usuarios
- Gestión de tareas (pendiente, completada, eliminada)
- Interfaz moderna con Tailwind CSS
- Backend con Node.js, Express y MongoDB

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env`:
   ```env
   MONGO_URI_TEST=<tu_uri_mongodb>
   ACCESS_TOKEN_SECRET=<tu_secreto_jwt>
   EMAIL_USER=<tu_email>
   EMAIL_PASS=<tu_password>
   NODE_ENV=development
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```

## Estructura del proyecto
```
app.js
index.js
package.json
controllers/
  users.js
models/
  user.js
views/
  home/
    index.html
  verify/
    index.html
public/
  styles/
    output.css
```

## Uso de Tailwind CSS
- El archivo `tailwind.config.js` está configurado para procesar los archivos HTML y JS.
- Compila el CSS con:
  ```bash
  npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch
  ```

## Endpoints principales
- `POST /api/users` — Registro de usuario
- `PATCH /api/users/:id/:token` — Verificación de usuario

## Licencia
Este proyecto es de uso libre para fines educativos.
