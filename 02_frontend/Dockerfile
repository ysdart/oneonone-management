# ベースイメージとしてNode.jsを使用
FROM node:22-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコンテナにコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# Viteサーバーを起動するポートを公開
EXPOSE 5173

# 開発サーバーを起動
CMD ["npm", "run", "dev"]