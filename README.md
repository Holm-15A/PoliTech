# PoliTech

モノレポ構成の TypeScript ベースの Web アプリケーションプロジェクトです。

## 技術スタック

### フロントエンド

- React 18
- Redux Toolkit（状態管理）
- TypeScript
- Vite（ビルドツール）
- ESLint（コード品質管理）

### バックエンド

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- Passport.js（認証）

### データベース

- PostgreSQL

### インフラストラクチャ

- Docker / Docker Compose
- GCP（将来的なデプロイ先）

## プロジェクト構成

```text
.
├── docker-compose.yml
├── package.json
├── README.md
└── packages/
  ├── backend/
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── tsconfig.json
  │   └── src/             # Express + TypeScript サーバー
  ├── frontend/
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── vite.config.ts
  │   └── src/             # React + Vite + TypeScript アプリ
  └── shared/
    ├── package.json
    ├── src/             # 共通型・ユーティリティ (TypeScript ソース)
    └── dist/            # build 出力 (.d.ts)
```
 
## 必要要件

1. Docker Desktop 4.x以上
2. Docker Compose v2.x以上
3. Node.js v20.x以上
4. npm v10.x以上

## 環境変数の設定

プロジェクトを実行する前に、以下の環境変数を設定する必要があります：

### バックエンド (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/politech"
JWT_SECRET="your-jwt-secret"
PORT=3000
```

### フロントエンド (.env)

```env
VITE_API_URL="http://localhost:3000"
```

## セットアップ手順

1. リポジトリのクローン:

```bash
git clone [repository-url]
cd politech
```

1. 依存パッケージのインストール:

```bash
npm install
```

1. データベースの準備:

```bash
# PostgreSQLコンテナの起動
docker-compose up -d db

# スキーマの生成
npm run db:generate

# マイグレーションの実行
npm run db:migrate
```

1. アプリケーションの起動:

```bash
# 開発モードで起動
npm run dev
```

## 開発

### アクセスURL

- フロントエンド: [http://localhost:5173](http://localhost:5173)
- バックエンドAPI: [http://localhost:3000](http://localhost:3000)
- Prisma Studio: [http://localhost:5555](http://localhost:5555) (データベース管理UI)

### よく使うコマンド

- **開発環境の起動**:

  ```bash
  npm run dev
  ```

  Docker Composeを使用して、フロントエンド、バックエンド、データベースを同時に起動します。

- **データベースのマイグレーション**:

  ```bash
  npm run db:migrate
  ```

  Prisma Migrateを実行して、データベーススキーマを最新の状態に保ちます。

- **Prisma Studioの起動**:

  ```bash
  npm run db:studio
  ```

  Prisma Studioを起動して、データベースの内容をGUIで確認・編集します。

- **Dockerイメージのビルド**:

  ```bash
  npm run build
  ```

  Dockerイメージをビルドします。

- **Dockerコンテナの停止**:

  ```bash
  docker compose down
  ```

  Dockerコンテナを停止します。

-- **Dockerイメージ再ビルド & 起動**:

  ```bash
  docker compose down && docker compose build --no-cache && docker compose up -d
  ```

  Dockerイメージをキャッシュなしでビルドしてから起動します。

### 利用可能なスクリプト

プロジェクトルートで実行可能なスクリプト:

- `npm run dev`: アプリケーションの起動（開発モード）
- `npm run build`: Dockerイメージのビルド
- `npm run start`: アプリケーションの起動（プロダクションモード）
- `npm run db:generate`: Prismaクライアントの生成
- `npm run db:migrate`: データベースマイグレーションの実行
- `npm run db:studio`: Prisma Studioの起動
- `npm run lint`: ESLintによるコード検証
- `npm run format`: Prettierによるコードフォーマット

## デバッグ

### VSCode デバッグ設定

プロジェクトには .vscode/launch.json が含まれており、以下のデバッグ設定が利用可能です：

- バックエンドのデバッグ
- フロントエンドのデバッグ（Chrome）
- フロントエンドのユニットテスト

## GCPデプロイメント

このプロジェクトは将来的なGCPデプロイメントを想定して設計されています。以下のサービスを利用予定です：

- Cloud Run（コンテナホスティング）
- Cloud SQL（PostgreSQL）
- Cloud Storage（静的アセット）
- Cloud Build（CI/CD）

詳細なデプロイメント手順は今後追加予定です。
