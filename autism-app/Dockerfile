FROM node:latest

WORKDIR /autism-app/src

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run","start" ]
