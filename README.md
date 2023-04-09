# Cookie を使った簡易なパスワード認証を実装
ユーザーIDが不要でパスワード付きのサイトを作る。  
パスワードは全員共通なので、簡易的なものを想定しています。  

iron-session をつかっており、サーバー側でセッション管理をしているわけではなく、 cookie で管理しています。  

- [iron-session](https://github.com/vvo/iron-session)
    - [Next.jsのサンプル](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session)
    - [参考記事](https://mseeeen.msen.jp/nextjs-custom-auth-with-iron-session/)
- [SWR](https://swr.vercel.app/ja)

## 設定ファイル
`/env` に `/env/env.local.json` のように json ファイルを置いて環境ごとに動くようにする. 
本来はこれは `gitignore` に追加するか、リポジトリを `private` にする

```json
{
    "NEXT_PUBLIC_API_BASE_URL": "サイトのURLを入れる",
    "SECRET_TOKEN": "32桁以上の乱数を入れる",
    "PASSWORD": "ユーザーに入れてもらうパスワードを入れる"
}
```

上記の json とは別に、 `process.env` に以下の値が生えます。
- `NEXT_PUBLIC_APP_SITE_NAME` を `package.json` の `name` を設定
- `NEXT_PUBLIC_APP_ENV` に `local`, `development`, `production` が入ります
