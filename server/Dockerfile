FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install


FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

COPY index.js ./
COPY router ./router
COPY controllers ./controllers
COPY models ./models
COPY middleware ./middleware
COPY .env ./

EXPOSE 5000

CMD ["npm", "start"]