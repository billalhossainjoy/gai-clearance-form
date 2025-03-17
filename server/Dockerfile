# Base state
FROM node:23-alpine AS base

RUN apk update && \
    apk add --no-cache \
    openssl \
    bash \
    libc6-compat

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npx prisma generate


# Development stage
FROM base AS development

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

# Build stage
FROM base AS builder

RUN npm run build

# Production stage
FROM node:23 as production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json .

CMD ["node", "dist/main.js"]