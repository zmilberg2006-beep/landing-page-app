import { NextResponse } from 'next/server'

// Endpoint disabled for security
export async function POST() {
  return NextResponse.json({ error: 'disabled' }, { status: 403 })
}
