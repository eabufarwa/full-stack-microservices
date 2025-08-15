FROM node:20-alpine AS deps
WORKDIR /app
COPY admin-web/package*.json ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY admin-web/. .
COPY contracts ./contracts
RUN npm run build

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY admin-web/package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]


