import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const cookieName = process.env.NEXT_PUBLIC_APP_SITE_NAME as string;
  const password = process.env.SECRET_TOKEN as string;

  const session = await getIronSession(req, res, {
    cookieName,
    password,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });

  const { user } = session;
  console.log('from middleware', { user });

  if (req.nextUrl.pathname === '/login') {
    // トップページの場合はログインしていたらダッシュボードに遷移させる
    if (user?.username) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    // トップページ以外の場合、ログインしていなかったらトップページに遷移させる
    if (!user?.username) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return res;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /images/* (images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
