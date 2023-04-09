import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/features/auth/session';
import { NextApiRequest, NextApiResponse } from 'next';

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>
) {
  console.log('logout before', req.session);
  res.setHeader('Cache-Control', 'no-cache');
  req.session.destroy();
  console.log('logout after', req.session);
  res.json({ ok: true });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
