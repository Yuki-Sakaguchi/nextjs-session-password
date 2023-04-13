import { useAtom, useAtomValue } from 'jotai';
import { currentUserState } from '@/features/auth/states/currentUser';

/**
 * ログインユーザー情報を取得
 */
export function useCurrentUser() {
  // const [currentUser, setCurrentUser] = useAtom(currentUserState);
  const currentUser = useAtomValue(currentUserState);
  const isAuthChecking = currentUser === undefined;

  return {
    currentUser,
    isAuthChecking,
  };
}
