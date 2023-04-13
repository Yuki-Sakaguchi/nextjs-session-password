import type { FormEvent } from 'react';
import { useState, useCallback } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { Layout } from '@/components/Layout';
import useAuth from '@/features/auth/hooks/useAuth';
import { v4 as uuidv4 } from 'uuid';
import { useRedirectIfLoggedIn } from '@/features/auth/hooks/useRedirectIfLoggedIn';
import clsx from 'clsx';

/**
 * ログインページ
 */
export default function Login() {
  useRedirectIfLoggedIn('/');
  const { login, error, loading } = useAuth();
  const [username, setUsername] = useState(uuidv4());
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await login(username, password, '/');
    },
    [login, username, password]
  );

  return (
    <Layout title='Auth'>
      <LockClosedIcon className='mb-6 h-12 w-12 text-blue-500' />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='password'
            required
            className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className={clsx(
            'group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700',
            loading && 'pointer-events-none opacity-60'
          )}
          disabled={loading}
        >
          Login
        </button>
        {error && <p className='text-red'>{error}</p>}
      </form>
    </Layout>
  );
}
