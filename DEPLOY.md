# Guía de Despliegue

## Opción 1: Despliegue en Render (Recomendado)

### Paso 1: Preparar el repositorio
1. Asegúrate de que todos los cambios estén en GitHub
2. El archivo `render.yaml` está configurado en la raíz del proyecto

### Paso 2: Conectar con Render
1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en "New" → "Blueprint"
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente el archivo `render.yaml`

### Paso 3: Configurar variables de entorno
Después del despliegue, necesitas configurar:

**Backend:**
- `MONGODB_URI`: Tu URI de MongoDB Atlas
- `PORT`: 4001 (ya configurado)

**Frontend:**
- `REACT_APP_API_URL`: La URL de tu backend (ej: https://awdu3-backend.onrender.com)

### URLs resultantes:
- **Backend**: `https://awdu3-backend.onrender.com`
- **Frontend**: `https://awdu3-frontend.onrender.com`

---

## Opción 2: Despliegue con Docker Compose (Local o VPS)

### Prerrequisitos
- Docker instalado
- Docker Compose instalado

### Comandos:

```bash
# Construir y ejecutar todos los servicios
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### URLs locales:
- **Backend**: `http://localhost:4001`
- **Frontend**: `http://localhost:80`

---

## Opción 3: Despliegue con Dockerfiles individuales

### Backend:
```bash
# Construir imagen
docker build -f Dockerfile.backend -t awdu3-backend .

# Ejecutar contenedor
docker run -d -p 4001:4001 --name backend awdu3-backend
```

### Frontend:
```bash
# Construir imagen
cd client
docker build -f Dockerfile.frontend -t awdu3-frontend .

# Ejecutar contenedor
docker run -d -p 80:80 --name frontend awdu3-frontend
```

---

## Configuración adicional para producción

### Backend (Server.mjs)
Asegúrate de configurar CORS para permitir peticiones del frontend:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: 'https://awdu3-frontend.onrender.com', // URL de tu frontend
  credentials: true
};

app.use(cors(corsOptions));
```

### Frontend
Crea un archivo `.env.production` en la carpeta `client`:

```env
REACT_APP_API_URL=https://awdu3-backend.onrender.com
```

---

## Notas importantes

1. **MongoDB Atlas**: Asegúrate de permitir conexiones desde cualquier IP (0.0.0.0/0) en MongoDB Atlas para Render
2. **Variables de entorno**: Nunca subas archivos `.env` a GitHub
3. **Plan gratuito de Render**: Los servicios se duermen después de 15 minutos de inactividad
4. **HTTPS**: Render proporciona HTTPS automáticamente

---

## Troubleshooting

Si el frontend no puede conectar con el backend:
1. Verifica que `REACT_APP_API_URL` apunte a la URL correcta del backend
2. Verifica la configuración de CORS en el backend
3. Asegúrate de que el backend esté funcionando

Si hay errores de build:
1. Revisa los logs en Render Dashboard
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que la versión de Node.js sea compatible
