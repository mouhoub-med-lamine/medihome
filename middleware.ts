import { type NextRequest, NextResponse } from 'next/server'
export async function middleware(request: NextRequest) {
    const cookieStore = request.cookies
    const userId = cookieStore.get('demo-user-id')?.value
    const role = cookieStore.get('demo-user-role')?.value

    const url = new URL(request.url)
    const path = url.pathname

    // Public paths that don't need auth
    const isPublicPath = path === '/' ||
        path === '/login' ||
        path.startsWith('/register') ||
        path === '/patient/request'

    if (!userId && (path.startsWith('/dashboard') ||
        (path.startsWith('/patient') && path !== '/patient/request') ||
        path.startsWith('/doctor') ||
        path.startsWith('/admin'))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (userId) {
        // Redirect authenticated users away from auth pages
        if (isPublicPath && path !== '/') {
            if (role === 'patient') return NextResponse.redirect(new URL('/patient/dashboard', request.url))
            if (role === 'doctor') return NextResponse.redirect(new URL('/doctor/dashboard', request.url))
            if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

        // Role-based protection
        if (path.startsWith('/doctor') && role !== 'doctor') {
            return NextResponse.redirect(new URL('/patient/dashboard', request.url))
        }
        if (path.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/patient/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
