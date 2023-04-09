import { tryLogin } from "@/features/auth/database";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/features/auth/session";
import { NextApiRequest, NextApiResponse } from "next";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;
  try {
    const userInfo = await tryLogin({ username, password });
    if (!userInfo) {
      res.status(400).json({ message: "ログインに失敗しました" });
      return;
    }
    req.session.user = userInfo;
    await req.session.save();
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
