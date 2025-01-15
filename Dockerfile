FROM node:20 AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml", "./"]

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM oven/bun:1-alpine AS runner
WORKDIR /app


COPY --from=builder /app/.output /app/.output

CMD ["bun",  "run", ".output/server/index.mjs"]

EXPOSE 3000