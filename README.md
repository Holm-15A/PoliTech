# PoliTech

モノレポ構成のTypeScriptベースのWebアプリケーションプロジェクトです。

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

```
packages/
├── frontend/    # フロントエンドアプリケーション
│   ├── src/
│   │   ├── components/  # 再利用可能なコンポーネント
│   │   ├── pages/       # ページコンポーネント
│   │   ├── hooks/       # カスタムフック
│   │   ├── store/       # Reduxストア
│   │   └── utils/       # ユーティリティ関数
│   └── ...
└── backend/     # バックエンドAPI
    ├── src/
    │   ├── controllers/ # ルートハンドラー
    │   ├── services/    # ビジネスロジック
    │   ├── routes/     # APIルート定義
    │   └── types/      # 型定義
    └── prisma/         # データベーススキーマ
```

## 必要要件

- Docker Desktop 4.x以上
- Docker Compose v2.x以上
- Node.js v20.x以上
- npm v10.x以上

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

2. 依存パッケージのインストール:
```bash
npm install
```

3. データベースの準備:
```bash
# PostgreSQLコンテナの起動
docker-compose up -d db

# スキーマの生成
npm run db:generate

# マイグレーションの実行
npm run db:migrate
```

4. アプリケーションの起動:
```bash
# 開発モードで起動
npm run dev
```

## 開発

### アクセスURL
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:3000
- Prisma Studio: http://localhost:5555 (データベース管理UI)

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

プロジェクトには.vscode/launch.jsonが含まれており、以下のデバッグ設定が利用可能です：

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

## 開発ガイドライン

### コーディング規約

- TypeScriptの厳格な型チェックを有効化
- ESLintとPrettierの設定に従う
- コンポーネントはFunction Componentで実装
- 状態管理はRedux Toolkitを使用

### Git運用

- ブランチ戦略: GitHub Flow
- プルリクエストベースの開発
- コミットメッセージは日本語で、変更内容を簡潔に説明

### コミットメッセージフォーマット

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントのみの変更
style: コードの意味に影響しない変更（空白、フォーマット等）
refactor: リファクタリング
test: テストの追加・修正
chore: ビルドプロセスやツールの変更
```

## トラブルシューティング

よくある問題と解決方法：

1. データベース接続エラー
   - 環境変数の確認
   - PostgreSQLコンテナの状態確認

2. ビルドエラー
   - node_modulesの削除と再インストール
   - TypeScriptバージョンの確認

3. 開発サーバー起動エラー
   - ポート重複の確認
   - プロセスの強制終了と再起動