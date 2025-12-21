#!/bin/bash
set -e

# Generate Prisma client
pnpm prisma:generate

# Only run migrations if:
# 1. We're in Vercel (VERCEL env var is set)
# 2. OR DATABASE_URL is set and not pointing to localhost
if [ -n "$VERCEL" ] || ([ -n "$DATABASE_URL" ] && [[ ! "$DATABASE_URL" == *"localhost"* ]] && [[ ! "$DATABASE_URL" == *"127.0.0.1"* ]]); then
  echo "Running migrations for production database..."
  pnpm prisma:migrate:deploy
else
  echo "Skipping migrations (local development or no valid DATABASE_URL)"
fi

# Build Next.js app
next build

