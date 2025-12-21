#!/bin/bash
set -e

# Generate Prisma client
pnpm prisma:generate

# Only run migrations in Vercel/CI environments
if [ -n "$VERCEL" ] || [ -n "$CI" ] || [ "$NODE_ENV" = "production" ]; then
  echo "Running migrations for production database..."
  pnpm prisma:migrate:deploy
else
  echo "Skipping migrations (local development)"
fi

# Build Next.js app
next build

