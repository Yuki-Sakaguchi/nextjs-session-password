import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Layout } from '@/components/Layout';

export default function Home() {
  return (
    <Layout title="Dashboard">
      <PencilSquareIcon className="mb-6 h-12 w-12 text-blue-500" />
      <p>ダッシュボード</p>
    </Layout>
  );
}
