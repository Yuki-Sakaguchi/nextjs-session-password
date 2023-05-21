import { User, sessionOptions } from '@/features/auth/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { getJstTime, isValidDateNow } from '@/lib/Date';

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  if (req.session.user) {
    // 最後のアクセスから経った時間が一定時間を超えていたらセッションは無効
    if (isValidDateNow(new Date(req.session.user.updatedAt))) {
      // 有効な場合は引き続きログイン状態を維持
      req.session.user.updatedAt = getJstTime();
      await req.session.save();
      res.json(req.session.user);
    } else {
      // 無効な場合はログアウトさせる
      req.session.destroy();
      res.send(null);
    }
  } else {
    res.json(null);
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
