import { useAtomValue } from 'jotai';
import { currentUserState } from '../states/currentUser';

/**
 * ログインユーザー情報を取得
 */
export function useCurrentUser() {
  const currentUser = useAtomValue(currentUserState);
  const isAuthChecking = currentUser === undefined;

  return {
    currentUser,
    isAuthChecking,
  };
}
