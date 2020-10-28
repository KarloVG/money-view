FROM node:lts-alpine AS deps
WORKDIR /deps
COPY ./package.json ./yarn.lock ./
RUN yarn install

FROM node:lts-alpine as builder
WORKDIR /ng-app
COPY . .
COPY --from=deps /deps/ ./
RUN yarn run ng build --prod --output-path=dist --base-href=/app/ --deploy-url=/app/

FROM nginx:alpine
COPY ./nginx/ /etc/nginx/
COPY --from=builder /ng-app/dist/ /var/www/ng-app/

CMD ["nginx", "-g", "daemon off;"]
