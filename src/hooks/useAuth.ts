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
    console.log(password);
    if (password === 'aaa') {
      console.log('login')
      setLogin(true);
    }
  };

  const signOut = () => {
    setLogin(false);
    setPassword('');
  };

  const validateSession = async () => {
    console.log('validateSession', login);
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

