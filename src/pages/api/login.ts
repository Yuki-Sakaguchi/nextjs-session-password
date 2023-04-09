import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

type Data = {
  message: string,
  uid?: string,
};

/**
 * uid と password を受け取ってログインに成功した時は JWT を Cookie にセットする
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // POST 以外は受け付けない
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'only support POST' });
  }

  const { uid, password } = req.body;
  if (uid && password === process.env.PASSWORD) {
    // ログイン成功
    
    // cookie を設定してレスポンスを返す
    const claims = { sub: uid };
    const jwt = sign(claims, process.env.SECRET_TOKEN as string);
    res.setHeader('Set-Cookie',
      cookie.serialize(
        `${(process.env.NEXT_PUBLIC_APP_SITE_NAME as string)}_session`,
        jwt,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          path: '/'
        }
      )
    );
    res.json({
      message: 'ok',
      uid,
    });

  } else {
    // ログイン失敗
    res.json({ message: 'ng' });
  }
}
