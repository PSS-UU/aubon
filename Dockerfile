FROM node:16.14-alpine3.15 as backend
RUN apk update && apk add g++ make python3
WORKDIR /backend
COPY ./backend/package*.json ./
RUN npm i
RUN npm i -g db-migrate
COPY ./backend/ ./
RUN ls -laF
CMD ["npm", "start"]