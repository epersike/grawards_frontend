FROM node:18 AS build-stage

WORKDIR /app

COPY app/package.json ./

RUN npm install

COPY . ./

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build-stage /app/dist/angular-movie-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]