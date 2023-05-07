import { tryLogin } from '@/features/auth/database';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/features/auth/session';
import { NextApiRequest, NextApiResponse } from 'next';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;
  try {
    const user = await tryLogin({ username, password });
    req.session.user = user;
    if (!user) {
      res.status(400).json({ message: '認証に失敗しました' });
      return;
    }
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
