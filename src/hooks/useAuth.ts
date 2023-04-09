import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

/**
 * ログイン用のフック
 */
export const useAuth = () => {
  const { push } = useRouter();
  const [login, setLogin] = useState(false);
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  /**
   * APIを叩いてログインに成功したらステータスを変更
   */
  const signIn = async () => {
    console.log(uid, password)
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid, password })
    });
    console.log(uid, password, response)
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      if (data?.message === 'ok') {
        setLogin(true);
      }
    }
  };

  /**
   * サインアウト
   */
  const signOut = () => {
    setLogin(false);
    setPassword('');
  };

  /**
   * ログイン状態の確認
   */
  const verify = async () => {
    const response = await fetch('/api/verify');
    console.log(response)
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      if (data?.message === 'ok' && data?.uid) {
        console.log('ok')
        setUid(data?.uid);
        setLogin(true);
      } else {
        console.log('no')
        setUid(uuidv4());
      }
    } else {
      signOut();
    }
  };

  /**
   * ログインしていない場合はトップページに戻す
   */
  const validateSession = async () => {
    if (login) {
      push('/dashboard');
    } else {
      push('/');
    }
  };

  useEffect(() => {
    console.log(uid)
    validateSession();
  }, [uid, login]);

  return {
    login,
    setLogin,
    uid,
    setUid,
    password,
    setPassword,
    signIn,
    signOut,
    verify,
    validateSession
  };
};

