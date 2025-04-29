# Frontend

Viteで構築されたReactアプリケーション

## 技術スタック

- React
- Redux Toolkit (状態管理)
- TypeScript
- Vite (ビルドツール)
- Docker

## 開発環境のセットアップ

### Dockerを使用する場合

プロジェクトのルートディレクトリで以下のコマンドを実行:

```bash
npm run dev
```

### ローカルで直接実行する場合

```bash
npm install
npm run dev
```

## 環境変数

- `VITE_API_URL`: バックエンドAPIのURL（デフォルト: http://localhost:3000）

## プロジェクト構造

```
src/
├── assets/     # 静的ファイル（画像など）
├── components/ # Reactコンポーネント
├── store/      # Reduxストア関連
├── types/      # TypeScript型定義
└── App.tsx     # メインアプリケーション
```

## 利用可能なスクリプト

- `npm run dev`: 開発サーバーの起動
- `npm run build`: プロダクションビルド
- `npm run lint`: コードのリント
- `npm run preview`: ビルドしたアプリケーションのプレビュー

## コーディング規約

- コンポーネントはTypeScriptで記述
- スタイリングにはCSS Modulesを使用
- Reduxの状態管理にはRedux Toolkitを使用
- コンポーネントはatomic designの原則に従って整理
