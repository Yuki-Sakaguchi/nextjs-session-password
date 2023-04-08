import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  const { validateSession } = useAuth();

  useEffect(() => {
    validateSession();
  }, []);

  return <Component {...pageProps} />
}
