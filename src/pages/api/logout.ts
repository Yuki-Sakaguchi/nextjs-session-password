import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/features/auth/session';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>
) {
  console.log('logout before', req.session);
  res.setHeader('Cache-Control', 'no-cache');
  req.session.destroy();

  // cookie を明示的に削除
  const cookieName = process.env.NEXT_PUBLIC_APP_SITE_NAME as string;
  res.setHeader('Set-Cookie', [
    serialize(cookieName, '', {
      maxAge: -1,
      path: '/',
    }),
  ]);
  console.log('logout after', req.session);

  res.send({ ok: true });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
