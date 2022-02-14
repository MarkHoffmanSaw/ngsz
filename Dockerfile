FROM node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.21.6-alpine as production
RUN apk add bash
COPY --from=build /app/dist/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]  