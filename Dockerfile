FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["sh", "-c", "npm run start:dev && npm run listen"]
