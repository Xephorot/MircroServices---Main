Para esta solucion se usa mongo db en un contenedor de docker ya que si no tendrias que buscar otra solucion sin el network ya que este permite una comunicacion entre contenedores.

En el caso que no halla un contenedor de mongo creado debes ejecutar los siguientes comandos:

docker run --name nest-main --network backend -d -p 27017:27017 mongo

creas una base de datos llamada nest_main
y su coleccion llamada products

use nest_main
db.createCollection('products')

o Tambien puedes hacer un mongo mongo-init.js en la raiz del proyecto

Docker Main-Service
El caso que tengas mongodb de manera local, tienes que poner en el docker compose la siguiente ruta y en el app.module.ts Tambien

mongodb://nest-main:27017/nest_main

En el caso que tengas el mongodb en un docker solo cambiar el nest-main por el nombre del contenedor de mongo

mongodb://nest-main:27017/nest_main

Despues creamos un network nuevo

docker network create backend

y despues ponemos lo siguiente

docker network connect backend nest-main

y finalmente haces un 

docker-compose up --build
