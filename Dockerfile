FROM node:lts-alpine AS deps
WORKDIR /deps
COPY ./package.json ./yarn.lock ./
RUN yarn install

FROM node:lts-alpine as builder
ARG baseHref="/"
ARG deployUrl="/"
WORKDIR /ng-app
COPY . .
COPY --from=deps /deps/ ./
RUN yarn run ng build --prod --output-path=dist --base-href=${baseHref} --deploy-url=${deployUrl}

FROM nginx:alpine
COPY ./nginx/ /etc/nginx/
COPY --from=builder /ng-app/dist/ /var/www/ng-app/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
