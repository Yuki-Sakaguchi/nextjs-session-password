/**
 * 環境変数の型定義を生成
 */
type Env = Partial<Readonly<typeof import('./env.local.json')>>;

declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly NEXT_PUBLIC_APP_ENV?: string;
  }
}
