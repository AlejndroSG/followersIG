FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar código fuente de la aplicación
COPY . .

# Exponer puerto (mismo que en la aplicación)
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]
