
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# -------------------------
# Stage 2: Dependencies
# -------------------------
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# -------------------------
# Stage 3: Build & Prune
# -------------------------
FROM deps AS builder

COPY . .

# Compile TypeScript using esbuild into /app/dist
RUN pnpm run build

# Prune development dependencies so only production packages remain in node_modules
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm prune --prod

# -------------------------
# Stage 4: Production runner
# -------------------------
FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Copy production artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Run as non-root user
USER node

EXPOSE 4000

CMD ["node", "dist/index.js"]