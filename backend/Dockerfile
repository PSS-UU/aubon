FROM node:16.14-alpine3.15 as dev
RUN apk update && apk add g++ make python3
WORKDIR /backend
RUN npm config set unsafe-perm true
RUN npm i -g db-migrate
COPY ./package*.json ./
RUN npm i
RUN npm i -g nodemon ts-node
COPY ./ ./
CMD ["npm", "start"]