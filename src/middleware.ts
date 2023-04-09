import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

/**
 * アクセス時にJWTトークンがあるか確かめてなければTOPにリダイレクトさせる 
 */
export async function middleware(request: NextRequest) {
  console.log('middleware', request.nextUrl.pathname);
  // トップ以外の場合は認証チェックをする。失敗した場合はトップにリダイレクト
  if (request.nextUrl.pathname !== '/') {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/verify');
    const data = await response.json();
    if (response.ok) {
      if (data?.message === 'ng') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}