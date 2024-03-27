## sandbox-nest
TypeScriptによるサーバーサイド学習用リポジトリ

NestJSを使ってクラウドサービスや認証サービスの操作などを試す

## Commands

`yarn start:dev`

アプリケーションの起動(`localhost`)

`yarn nest g ${SCHEMATICS} ${NAME}`

controller, module, serviceなどを作成する

## Description

### `src/config/env-validator`

アプリケーション起動時に環境変数のバリデーションを行う

### `src/google/auth`

Googleログインを行うAPI

### `src/mart`

ECサイトを想定したAPI

ドメイン駆動設計の学習・実践として開発を進める

## DB

MySQLを起動する

`docker-compose up -d`

MySQLを操作する

`docker-compose run mysql-cli`


