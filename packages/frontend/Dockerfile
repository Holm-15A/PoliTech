FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# 開発依存関係を含めて全てのパッケージをインストール
RUN npm install

COPY . .

# UnoCSS関連パッケージのインストール
RUN npm install -D unocss @unocss/preset-uno @unocss/preset-attributify @unocss/preset-icons

EXPOSE 5173

# 環境変数を設定
ENV NODE_ENV=development
ENV VITE_ENV=development

CMD ["npm", "run", "dev", "--", "--host"]