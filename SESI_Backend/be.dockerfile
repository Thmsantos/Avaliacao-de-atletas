FROM node:16

WORKDIR /usr/src/sesi_be
COPY package*.json ./

RUN npm install

COPY . .

# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/