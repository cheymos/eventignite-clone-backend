FROM node:lts-alpine AS build
WORKDIR /home/app
COPY ./package.json ./yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM node:lts-alpine AS base
WORKDIR /home/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --prod
COPY --from=build /home/app/dist ./dist
CMD ["node", "dist/main"]
