import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from './useCurrentUser';

/**
 * このフックを使ったページはログイン必須ページになる
 * ログインしていない状況であればログインページにリダイレクトされる
 */
export function useRequireLogin(redirectTo = '/login') {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return;
    if (!currentUser) router.push(redirectTo);
  }, [redirectTo, router, isAuthChecking, currentUser]);
}
