# 1. Build stage: используем node для установки зависимостей и сборки фронта через Vite
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Сборка production сборки через Vite (скрипт build определим ниже в package.json)
RUN yarn build

# 2. Production stage: отдаём статику через nginx
FROM nginx:stable-alpine

# Копируем кастомный nginx.conf внутрь образа:
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
