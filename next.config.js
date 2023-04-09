/**
 * @param {string} appEnv
 */
function loadEnv(appEnv = "local") {
  const pkg = require('./package.json');
  const env = {
    ...require(`./env/env.${appEnv}`),
    NEXT_PUBLIC_APP_ENV: appEnv,
    NEXT_PUBLIC_APP_SITE_NAME: pkg.name,
  };

  console.log({ env });

  Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value;
  });
}

// 環境に合わせて設定ファイルを読み込む
loadEnv(process.env.APP_ENV);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
