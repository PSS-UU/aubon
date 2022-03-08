FROM node:16.14-alpine3.15 as base
RUN apk update && apk add g++ make python3
WORKDIR /backend
RUN npm config set unsafe-perm true
RUN npm i -g db-migrate
COPY ./backend/package*.json ./

FROM base as dev
RUN npm i
RUN npm i -g nodemon ts-node
COPY ./ ./
CMD ["npm", "start"]

FROM base as prod-builder
RUN npm i typescript
COPY ./ ./
RUN npm run build

FROM base as prod
RUN npm i --production
COPY --from=prod-builder ./dist ./dist
COPY ./python ./python
COPY ./migrations ./migrations
COPY ./database.json ./database.json
CMD ["node", "dist/app.js"]