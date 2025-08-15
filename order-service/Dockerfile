FROM node:20-slim AS base
WORKDIR /app


COPY package*.json ./
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && npm install --no-audit --no-fund \
  && rm -rf /var/lib/apt/lists/*


COPY . .
RUN npm run build


FROM node:20-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/src/proto ./dist/proto
COPY --from=base /app/src/proto ./proto
COPY package*.json ./

# Create data directory
RUN mkdir -p /app/data

EXPOSE 3002
CMD ["npm", "run", "start:prod"]


