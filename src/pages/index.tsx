import type { FormEvent } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { Layout } from '@/components/Layout';
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { password, setPassword, signIn } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn();
  };

  return (
    <Layout title="Auth">
      <LockClosedIcon className="mb-6 h-12 w-12 text-blue-500" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </Layout>)
}
