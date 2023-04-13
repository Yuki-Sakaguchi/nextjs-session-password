import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Layout } from '@/components/Layout';
import useAuth from '@/features/auth/hooks/useAuth';
import { useRequireLogin } from '@/features/auth/hooks/useRequireLogin';
import clsx from 'clsx';

/**
 * トップページ
 */
export default function Home() {
  useRequireLogin();
  const { logout, loading } = useAuth();

  return (
    <Layout title='Dashboard'>
      <PencilSquareIcon className='mb-6 h-12 w-12 text-blue-500' />
      <p>ダッシュボード</p>
      <div className='mt-4'>
        <button
          type='submit'
          className={clsx(
            'group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700',
            loading && 'pointer-events-none opacity-60'
          )}
          disabled={loading}
          onClick={logout}
        >
          logout
        </button>
      </div>
    </Layout>
  );
}
