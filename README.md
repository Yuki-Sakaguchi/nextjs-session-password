# Cookie を使った簡易なパスワード認証を実装
ユーザーIDが不要でパスワード付きのサイトを作る。  
パスワードは全員共通なので、簡易的なものを想定しています。  

iron-session をつかっており、サーバー側でセッション管理をしているわけではなく、 cookie で管理しています。  

## DEMO
https://nextjs-session-password.vercel.app/  
password = `mcgJb5aj`

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

## 参考記事
- [iron-session](https://github.com/vvo/iron-session)
    - [Next.jsのサンプル](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session)
    - [参考記事](https://mseeeen.msen.jp/nextjs-custom-auth-with-iron-session/)
    - もっとしっかり作りなたいならたぶん [NextAuth](https://github.com/maximilianschmitt/next-auth)
    - 参考は `SWR` を使ってましたが、`Jotai` に変えました
- [React Hooks: JWT Authentication (without Redux) example](https://www.bezkoder.com/react-hooks-jwt-auth/)
- [Next.js の Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [Next.jsで環境変数（env）を使いこなすための記事](https://zenn.dev/aktriver/articles/2022-04-nextjs-env)
- 今回使ってないけど JWT も調べた
    - [nextjs with typescript:27 JWTとcookieを組み合わせる](https://note.com/fz5050/n/n672db8042be4)
    - [JWT の仕組み](https://zenn.dev/mikakane/articles/tutorial_for_jwt)
- [Next.jsでページ共通の処理をする（useEffectを使う例）](https://zenn.dev/catnose99/articles/2169dae14b58b6)
- [React 用状態管理ライブラリ「Jotai」に入門](https://zenn.dev/kkeeth/articles/studying-jotai-library)