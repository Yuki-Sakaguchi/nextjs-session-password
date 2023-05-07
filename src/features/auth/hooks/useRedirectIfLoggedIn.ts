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
    if (currentUser) {
      // ログイン時にはパスが変更される場合があるので、少し遅延させてからパスが違う場合のみ遷移させる
      setTimeout(() => {
        if (redirectTo !== router.pathname) router.push(redirectTo);
      }, 100);
    }
  }, [redirectTo, router, isAuthChecking, currentUser]);
}
