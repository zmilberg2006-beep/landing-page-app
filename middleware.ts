import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /dashboard but allow /dashboard/login
  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    const session = request.cookies.get('ds_session')?.value
    const secret  = process.env.DASHBOARD_SECRET || 'lalag-secret-2024'

    if (!session || session !== secret) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
