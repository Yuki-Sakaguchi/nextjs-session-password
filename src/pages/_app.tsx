import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import useAuth from '@/features/auth/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  const { checkLogin } = useAuth();

  useEffect(() => {
    checkLogin();
  }, []);

  return <Component {...pageProps} />;
}
