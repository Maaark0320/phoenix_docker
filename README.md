# docker-for-phoenix

## 概要
Dockerを使用してPhoenix Frameworkの開発環境を構築するためのファイル群。

## ビルド前に行うこと
1. `$ cp .env.example .env`
-  `.env`ファイルの環境変数を編集する

## ビルド
- `$ docker-compose build --no-cache`
- `$ docker-compose run --rm app bash`でappコンテナにアクセス
<!-- - ビルド前に指定したアプリケーション名がカレントディレクトリであるか確認
- `$ mix phoenix.new .`でPhoenixの雛形を生成
  - `Y/n`で選択する確認は全部`no`で
  - webpackを使うので`--no-brunch`オプションを使いたいところだが行わないこと
    - `static`以下が生成されなくなる -->
- `npm install`を実行
- ローカルに戻り、`config/dev.exs`を開き以下のように変更
  - 環境変数は`.env`で設定したものを`docker-compose.yml`が読み込むように設定しています。
  - (`phoenix_app`の部分はビルド前に設定したアプリケーション名に置き換える)

```
config :phoenix_app, ChatPhoenix.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("POSTGRES_USER"),
  password: System.get_env("POSTGRES_PASSWORD"),
  database: System.get_env("POSTGRES_DATABASE"),
  hostname: System.get_env("POSTGRES_HOSTNANE"),
  pool_size: 10
```

- `$ docker-compose run --rm app mix ecto.create`でデータベースを作成
- `$ docker-compose up -d`でapp, dbコンテナを立ち上げる
- `$ docker-compose ps`でコンテナの状態を確認する

## webpackに変更したことによる対応
http://matthewlehner.net/using-webpack-with-phoenix-and-elixir/ を参考にした。

`config/dev.exs`のwatchersオプションを以下に変更
```
config :phoenix_app, WebpackIntegration.Endpoint,
  # leave other settings and change the `watchers` option.
  watchers: [npm: ["run", "watch"]]
```
