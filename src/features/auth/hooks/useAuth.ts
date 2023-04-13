import { useState } from 'react';
import { useAtom } from 'jotai';

import fetchJson, { FetchError } from '../fetchJson';
import { User } from '../session';
import { currentUserState } from '../states/currentUser';

/**
 * ログインに関するフック
 */
export default function useAuth() {
  const [currentUser, setCurrentUser] = useAtom(currentUserState);
  const [error, setError] = useState<string>('');

  /**
   * ログイン状態を確認してステータスを更新
   */
  const checkLogin = async () => {
    try {
      const user = (await fetchJson('/api/user', 'GET')) as User;
      setCurrentUser(user); // ログインに失敗した時はnullが入る
    } catch (e: any) {
      if (e instanceof FetchError) {
        setError(e.data.message);
      } else {
        setError(e?.message ?? 'unknown error');
      }
      setCurrentUser(null);
    }
  };

  /**
   * ログインをする
   * @params username
   * @params password
   */
  const login = async (username: string, password: string) => {
    const body = { username, password };
    try {
      const user = (await fetchJson('/api/login', 'POST', body)) as User;
      setCurrentUser(user);
    } catch (e: any) {
      if (e instanceof FetchError) {
        setError(e.data.message);
      } else {
        setError(e?.message ?? 'unknown error');
      }
      setCurrentUser(null);
    }
  };

  /**
   * ログアウトをする
   */
  const logout = async () => {
    try {
      await fetchJson<{ ok: boolean }>('/api/logout', 'POST');
      setCurrentUser(null);
    } catch (e: any) {
      if (e instanceof FetchError) {
        setError(e.data.message);
      } else {
        setError(e?.message ?? 'unknown error');
      }
      setCurrentUser(null);
    }
  };

  return {
    currentUser,
    error,
    checkLogin,
    login,
    logout,
  };
}
