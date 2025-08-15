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

```text
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

## packages/shared に関して (重要)

`packages/shared` はプロジェクト内で型や共通ユーティリティを管理するためのワークスペースです。いくつか注意点があります:

- なぜ `shared` に js があるように見えるか

  - 開発環境で `npm install` をパッケージ単位で実行すると、そのパッケージ配下に `node_modules` が作成され、JS ファイルや依存が現れます。ワークスペース（ルート）の `npm install` を使えば依存はルートに集約されます。`packages/shared/dist` には JS ではなく型定義（`.d.ts`）のみが生成される想定です。

- 推奨運用

1. 依存はルートで管理: ルートで `npm install` を実行してください。個別パッケージでの `npm install` は避けると依存や冗長な `node_modules` が散らばりません。

2. `packages/shared` の `node_modules` は通常コミットしないでください（.gitignore を参照）。

3. `shared` の型を更新したら、ルートから `npm --workspace=packages/shared run build` を実行して `.d.ts` を生成し、他パッケージのビルドを行って整合性を確認してください。

### shared の更新手順（簡易）

1. `packages/shared/src` に型や関数を追加/編集
2. ルートで `npm install`（依存を更新した場合）
3. ルートで `npm --workspace=packages/shared run build` を実行（`dist/` に `.d.ts` が生成されます）
4. フロント/バックで `npm --workspace=packages/frontend run build` / `npm --workspace=packages/backend run build` を実行して型が解決されることを確認

## 今回の修正サマリ

- ルートに `dev` スクリプトを追加し、`packages/frontend` と `packages/backend` を同時に起動できるようにしました。  
- `packages/shared` を新規作成し、共通型（国会議事録 API の型など）を移動しました。  
- `packages/frontend` と `packages/backend` の型参照を `shared` に切り替えました。  
- UnoCSS に関する Vite 設定と backend の TypeScript の一部型不整合を修正し、Docker Compose 環境で両方のサービスを起動できるようにしました。  

詳細な差分は Git のコミット履歴を参照してください。
