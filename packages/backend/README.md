# Backend

Express + Prismaで構築されたバックエンドAPI

## 技術スタック

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Docker

## セットアップ

### Dockerを使用する場合

プロジェクトのルートディレクトリで以下のコマンドを実行:

```bash
npm run dev
```

### ローカルで直接実行する場合

1. 依存パッケージのインストール:
```bash
npm install
```

2. データベースのセットアップ:
```bash
npx prisma migrate dev
```

3. 開発サーバーの起動:
```bash
npm run dev
```

## 環境変数

`.env`ファイルに以下の環境変数を設定:

- `DATABASE_URL`: PostgreSQLデータベースの接続URL
- `PORT`: サーバーのポート番号（デフォルト: 3000）

## プロジェクト構造

```
src/
├── controllers/ # リクエストハンドラー
├── routes/      # APIルート定義
├── services/    # ビジネスロジック
└── index.ts     # アプリケーションのエントリーポイント
```

## データベース

### マイグレーション

新しいマイグレーションの作成:
```bash
npx prisma migrate dev --name [マイグレーション名]
```

### Prisma Studio

データベース管理UIの起動:
```bash
npx prisma studio
```

## APIドキュメント

APIエンドポイントの詳細なドキュメントは今後追加予定です。

## テスト

テストの実行:
```bash
npm test
```

## コーディング規約

- コントローラーは単一責任の原則に従う
- サービスレイヤーでビジネスロジックを実装
- エラーハンドリングは一貫性のある方法で行う
- 非同期処理にはasync/awaitを使用