FROM node:24-slim AS builder 

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

COPY src ./src
COPY public ./public
COPY vite.config.js ./
COPY index.html ./
COPY .env ./
COPY tailwind.config.js ./
COPY postcss.config.cjs ./

EXPOSE 5000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5000"]
