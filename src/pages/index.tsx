import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Layout } from '@/components/Layout';
import useAuth from '@/features/auth/hooks/useAuth';
import { useRequireLogin } from '@/features/auth/hooks/useRequireLogin';

export default function Home() {
  useRequireLogin();
  const { logout } = useAuth();

  return (
    <Layout title='Dashboard'>
      <PencilSquareIcon className='mb-6 h-12 w-12 text-blue-500' />
      <p>ダッシュボード</p>
      <div className='mt-4'>
        <button
          type='submit'
          className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700'
          onClick={logout}
        >
          logout
        </button>
      </div>
    </Layout>
  );
}
