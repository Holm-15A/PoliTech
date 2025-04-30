#!/bin/bash
set -e

# データベースが利用可能になるまで待機
echo "Waiting for database to be ready..."
until nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

# Prismaのセットアップ
echo "Running Prisma setup..."
npx prisma generate
npx prisma migrate deploy

# コマンドの実行
exec "$@"