
# Dockerización del Microservicio Main con MongoDB

Este repositorio contiene el código del microservicio **Main**, desarrollado en **Node.js** y utilizando **MongoDB** como base de datos. A continuación, se explican los pasos para configurar y levantar el entorno utilizando Docker.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu máquina antes de comenzar:
- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Normalmente se instala junto con Docker

## Instrucciones Paso a Paso

### 1. Clonar el Repositorio

Clona el repositorio en tu máquina local utilizando Git.

```bash
git clone https://github.com/Xephorot/MircroServices---Main
```

### 2. Crear y Configurar MongoDB en un Contenedor de Docker

Si no tienes un contenedor de MongoDB corriendo, ejecuta el siguiente comando para crear un contenedor de **MongoDB**:

```bash
docker run --name nest-main --network backend -d -p 27017:27017 mongo
```

Este comando crea un contenedor llamado `nest-main` que:
- Corre en la red de Docker llamada `backend`.
- Expone el puerto `27017` para conexiones a MongoDB.

### 3. Crear la Base de Datos y la Colección `products`

Una vez que el contenedor de MongoDB esté corriendo, puedes conectarte al contenedor para crear la base de datos y la colección de forma manual:

1. Conéctate al contenedor de MongoDB:

   ```bash
   docker exec -it nest-main mongo
   ```

2. Crea la base de datos `nest_main` y la colección `products`:

   ```bash
   use nest_main;
   db.createCollection('products');
   ```

### 4. Crear la Red de Docker

Si no tienes una red de Docker creada, utiliza el siguiente comando para crear una red llamada `backend`, que permitirá la comunicación entre los contenedores:

```bash
docker network create backend
```

### 5. Conectar el Contenedor de MongoDB a la Red

Conecta el contenedor de MongoDB (`nest-main`) a la red `backend`:

```bash
docker network connect backend nest-main
```

### 6. Configuración del Archivo `app.module.ts`

#### **Si estás usando MongoDB en Docker**:

En el archivo `app.module.ts`, asegúrate de que la conexión a MongoDB esté configurada correctamente usando el nombre del contenedor `nest-main`:

```typescript
MongooseModule.forRoot('mongodb://nest-main:27017/nest_main', {
  autoCreate: true,
}),
```

#### **Si estás usando MongoDB Localmente**:

Si tienes MongoDB instalado localmente, asegúrate de que la conexión en `app.module.ts` esté configurada así:

```typescript
MongooseModule.forRoot('mongodb://localhost:27017/nest_main', {
  autoCreate: true,
}),
```

### 7. Levantar los Contenedores con Docker Compose

Finalmente, una vez que todo esté configurado correctamente, puedes levantar el microservicio **Main** utilizando Docker Compose:

```bash
docker-compose up --build
```

Este comando compilará y levantará el microservicio **Main** en un contenedor, asegurando que esté conectado correctamente a MongoDB.

## Comandos Adicionales

- **Ver los logs de los contenedores**:
  ```bash
  docker-compose logs -f
  ```

- **Parar y eliminar los contenedores**:
  ```bash
  docker-compose down
  ```
## Repositorios Relacionados

Este proyecto forma parte de un conjunto de microservicios y frontend que interactúan entre sí. Asegúrate de clonar también los siguientes repositorios para tener el entorno completo:

1. **Main-Service** (Microservicio Principal - MongoDB):
   - [Repositorio Main-Service](https://github.com/Xephorot/MircroServices---Main)

2. **Admin-Service** (Microservicio Admin - MySQL):
   - [Repositorio Admin-Service](https://github.com/Xephorot/Microservices---Admin)

3. **Frontend** (Interfaz de Usuario - React):
   - [Repositorio Frontend](https://github.com/Xephorot/Frontend-MicroServices)
