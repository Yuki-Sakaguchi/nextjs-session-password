import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken';

type Data = {
  message: string,
  uid?: string,
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // GET 以外は受け付けない
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'We only support GET' });
  }

  console.log(req.cookies)

  const cookieSessionData = req.cookies[`${(process.env.NEXT_PUBLIC_APP_SITE_NAME as string)}_session`]!;
  const secretToken = process.env.SECRET_TOKEN as string;

  console.log(cookieSessionData, secretToken)

  verify(cookieSessionData, secretToken, async (err, decoded) => {
    if (!err && decoded) {
      res.json({ message: 'ok', uid: decoded.sub as string });
    } else {
      res.json({ message: 'ng' });
    }
  });
}
