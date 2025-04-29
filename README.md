# PoliTech

モノレポ構成のTypeScriptベースのWebアプリケーションプロジェクトです。

## 技術スタック

### フロントエンド
- React
- Redux Toolkit
- TypeScript
- Vite

### バックエンド
- Node.js
- Express
- TypeScript
- Prisma (ORM)

### データベース
- PostgreSQL

### 開発環境
- Docker / Docker Compose
- TypeScript
- ESLint

## プロジェクト構成

```
packages/
├── frontend/  # フロントエンドアプリケーション (React + Redux)
└── backend/   # バックエンドAPI (Express + Prisma)
```

## 必要要件

- Docker
- Docker Compose
- Node.js (v20以上推奨)
- npm

## セットアップ手順

1. リポジトリのクローン:
```bash
git clone [repository-url]
cd politech
```

2. 依存パッケージのインストール:
```bash
npm install
```

3. アプリケーションのビルドと起動:
```bash
# Dockerイメージのビルド
npm run build

# アプリケーションの起動
npm run dev
```

4. データベースのセットアップ:
```bash
# マイグレーションの実行
npm run db:migrate
```

## 開発

### アクセスURL
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:3000
- Prisma Studio: http://localhost:5555 (データベース管理UI)

### 利用可能なスクリプト

- `npm run dev`: アプリケーションの起動（開発モード）
- `npm run build`: Dockerイメージのビルド
- `npm run db:migrate`: データベースマイグレーションの実行
- `npm run db:studio`: Prisma Studioの起動

## GCPデプロイメント

このプロジェクトは将来的なGCPデプロイメントを想定して設計されています。デプロイメント手順は今後追加予定です。

## 開発ガイドライン

- コードスタイル: ESLintの設定に従ってください
- コミットメッセージ: 明確で簡潔な説明を心がけてください
- ブランチ戦略: GitHub Flowを採用しています