import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/features/auth/session';
// import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>
) {
  console.log('logout before', req.session);
  req.session.destroy();
  console.log('logout after', req.session);
  res.send({ ok: true });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
