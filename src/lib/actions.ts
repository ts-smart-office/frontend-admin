'use server'
import { cookies } from 'next/headers'

export async function handleAdminSession(admin: any) {
	const { id, name, email, role } = admin
	const sessionAdmin = { id, name, email, role }

	cookies().set('session_admin', JSON.stringify(sessionAdmin), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1,
		path: '/',
	})
}

export async function getAdminSession() {
	const sessionAdmin = cookies().get('session_admin')?.value
	return sessionAdmin ? JSON.parse(sessionAdmin) : undefined
}

export async function deleteAdminSession() {
	const deleteCookies = cookies()
		.getAll()
		.forEach(cookie => {
			cookies().delete(cookie.name)
		})
	return deleteCookies
}
