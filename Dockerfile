FROM node:18.10.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ENTRYPOINT ["scripts/web-docker-entrypoint-dev.sh"]
