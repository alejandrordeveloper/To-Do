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
config.js
index.js
package.json
postcss.config.js
tailwind.config.js
controllers/
  login.js
  logout.js
  todos.js
  users.js
models/
  todo.js
  user.js
src/
  styles.css
views/
  home/
    index.html
    Components/
      nav.js
      notification.js
    login/
      index.html
      index.js
    signup/
      index.html
      index.js
    styles/
      output.css
  verify/
    index.html
    index.js
img/
  signup.svg
```

## Uso de Tailwind CSS
- El archivo `tailwind.config.js` está configurado para procesar los archivos HTML y JS.
- Compila el CSS con:
  ```bash
  npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch
  ```

## Endpoints principales
- `POST /api/users` — Registro de usuario
- `GET /api/users/verify/:id/:token` — Verificación de usuario (redirige a login tras verificar)
- `PATCH /api/users/:id/:token` — Re-verificación manual (si el link expiró)

## Flujo de verificación de correo
1. El usuario se registra y recibe un email con un enlace de verificación.
2. Al hacer clic en el enlace, el backend verifica el token y redirige automáticamente a la página de login si la verificación es exitosa.
3. Si el link expiró, el backend envía un nuevo correo de verificación.

## Licencia
Este proyecto es de uso libre para fines educativos.
