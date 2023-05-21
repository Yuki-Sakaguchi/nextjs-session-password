import { getJstTime } from '@/lib/Date';
import { User } from './session';

export async function tryLogin(params: {
  username: string;
  password: string;
}): Promise<User | null> {
  if (params.username && params.password === process.env.PASSWORD) {
    // logged in
    const now = getJstTime();
    return {
      username: params.username,
      createdAt: now,
      updatedAt: now,
    };
  } else {
    // failed to log in
    return null;
  }
}
