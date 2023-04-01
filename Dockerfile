FROM node:18-alpine

WORKDIR "/app"
COPY . .
RUN yarn install --immutable --immutable-cache --check-cache
RUN yarn build
CMD ["yarn", "start:dev"]
