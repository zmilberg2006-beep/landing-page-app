import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const validUser = process.env.DASHBOARD_USER   || 'zahava'
  const validPass = process.env.DASHBOARD_PASS   || 'lalag2024'
  const secret    = process.env.DASHBOARD_SECRET || 'lalag-secret-2024'

  if (username === validUser && password === validPass) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('ds_session', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
    })
    return res
  }

  return NextResponse.json({ ok: false, error: 'שם משתמש או סיסמה שגויים' }, { status: 401 })
}
