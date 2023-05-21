import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import useAuth from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const { checkLogin } = useAuth();
  const router = useRouter();

  // ページ遷移ごとにログインセッションIDの確認をする
  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
