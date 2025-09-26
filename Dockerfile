# Imagen base oficial de Node.js (ligera)
FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json primero (mejor cache)
COPY package*.json ./

# Instalamos dependencias
RUN npm install --production

# Copiamos el resto del proyecto
COPY . .

# Puerto que expone tu app (ajústalo si usas otro)
EXPOSE 3000

# Comando para arrancar la app
CMD ["npm", "start"]
