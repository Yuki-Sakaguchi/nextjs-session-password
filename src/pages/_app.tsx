import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  // const { verify, validateSession } = useAuth();

  // useEffect(() => {
  //   console.log('load')
  //   verify();
  //   validateSession();
  // }, []);

  return <Component {...pageProps} />
}