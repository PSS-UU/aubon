FROM node:16.14-alpine3.15 as base
RUN apk update && apk add g++ make python3
WORKDIR /backend
RUN npm config set unsafe-perm true
RUN npm i -g db-migrate
COPY ./backend/package*.json ./

FROM base as dev
RUN npm i
RUN npm i -g nodemon ts-node
COPY ./backend/ ./
CMD ["npm", "start"]

FROM base as prod-builder
RUN npm i typescript
COPY ./backend/ ./
RUN npm run build

FROM base as prod
RUN npm i --production
COPY --from=prod-builder ./backend/dist ./dist
COPY ./backend/python ./python
COPY ./backend/migrations ./migrations
COPY ./backend/database.json ./database.json
CMD ["node", "dist/app.js"]