import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { supabaseResponse, user } = await updateSession(request)

    const url = new URL(request.url)
    const path = url.pathname

    // Public paths that don't need auth
    const isPublicPath = path === '/' || path.startsWith('/(auth)') || path === '/login' || path.startsWith('/register')

    if (!user && (path.startsWith('/dashboard') || path.startsWith('/(patient)') || path.startsWith('/(doctor)') || path.startsWith('/(admin)'))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user) {
        // Check role and redirect accordingly
        const { data: profile } = await (await import('@/lib/supabase/server')).createClient()
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const role = profile?.role

        // Redirect authenticated users away from auth pages
        if (isPublicPath && path !== '/') {
            if (role === 'patient') return NextResponse.redirect(new URL('/dashboard', request.url))
            if (role === 'doctor') return NextResponse.redirect(new URL('/doctor/dashboard', request.url))
            if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

        // Role-based protection
        if (path.startsWith('/doctor') && role !== 'doctor') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if (path.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return supabaseResponse
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
