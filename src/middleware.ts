import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAdminSession } from './lib/actions'

const protectedRoutes = ['/', '/reservations', '/foods']

export default async function middleware(req: NextRequest) {
	const sessionAdmin = await getAdminSession()
	if (!sessionAdmin && protectedRoutes.includes(req.nextUrl.pathname)) {
		const absoluteURL = new URL('/signin', req.nextUrl.origin)
		return NextResponse.redirect(absoluteURL.toString())
	}
}
