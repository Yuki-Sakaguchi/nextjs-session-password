import { User } from "./session";

export async function tryLogin(params: {
  username: string;
  password: string;
}): Promise<User | null> {
  console.log('tryLogin', params.username, params.password, process.env.PASSWORD);
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
