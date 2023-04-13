import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from './useCurrentUser';

/**
 * このフックを使ったページはログインしていたら見れないページになる
 * ログインしている状況であれば引数で渡されたパスにリダイレクトされる
 */
export function useRedirectIfLoggedIn(redirectTo: string) {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return;
    if (currentUser) router.push(redirectTo);
  }, [redirectTo, router, isAuthChecking, currentUser]);
}
