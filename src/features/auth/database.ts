import { User, NullUser } from './session';

export async function tryLogin(params: {
  username: string;
  password: string;
}): Promise<User | null> {
  if (params.username && params.password === process.env.PASSWORD) {
    // logged in
    return {
      username: params.username,
    };
  } else {
    // failed to log in
    return null;
  }
}
