import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

/**
 * ログイン用のフック
 */
export const useAuth = () => {
  const { push } = useRouter();

  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState('');

  const signIn = async () => {
    if (password === 'aaa') {
      setLogin(true);
    }
  };

  const signOut = () => {
    setLogin(false);
    setPassword('');
  };

  const validateSession = async () => {
    if (login) {
      push('/dashboard');
    } else {
      push('/');
    }
  };

  useEffect(() => {
    validateSession();
  }, [login]);

  return {
    login,
    setLogin,
    password,
    setPassword,
    signIn,
    signOut,
    validateSession
  };
};

