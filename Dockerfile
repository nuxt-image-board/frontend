# Nodeイメージの取得
FROM node:12.19.0-alpine3.12
# ワーキングディレクトリの指定
WORKDIR /usr/local/app
# モジュールを揃える(gitが要る)
COPY package.json ./
RUN apk add --no-cache --virtual .build-dep git
RUN npm install --production --quiet
# ビルド
COPY . .
ENV NODE_ENV production
RUN npm run build
# 不要なものを消す
RUN apk del .build-dep --purge
RUN rm -rf /var/cache/apk/
RUN rm -rf config app assets components locales pages plugins
# 起動環境設定
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm", "run", "start"]