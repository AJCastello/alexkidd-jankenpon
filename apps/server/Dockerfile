FROM node:20.15.0-alpine3.20 as builder
RUN corepack enable

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM node:20.15.0-alpine3.20 as release

WORKDIR /app

COPY --from=builder /app/package.json ./

RUN npm install --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENTRYPOINT [ "node", "." ]