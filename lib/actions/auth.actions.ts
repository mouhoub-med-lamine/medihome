'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { MOCK_PROFILES } from '@/lib/mock-data'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Find user in mock data
    const user = MOCK_PROFILES.find(u => u.email === email)

    if (!user || password !== 'password') {
        return { error: 'Email ou mot de passe incorrect (utilisez "password")' }
    }

    const cookieStore = await cookies()
    cookieStore.set('demo-user-id', user.id, { path: '/' })
    cookieStore.set('demo-user-role', user.role, { path: '/' })
    cookieStore.set('demo-user-name', user.full_name, { path: '/' })

    revalidatePath('/', 'layout')

    if (user.role === 'doctor') redirect('/doctor/dashboard')
    if (user.role === 'admin') redirect('/admin/dashboard')
    redirect('/patient/dashboard')
}

export async function signup(formData: FormData, role: 'patient' | 'doctor') {
    try {
        const full_name = formData.get('full_name') as string
        const email = formData.get('email') as string

        // Basic validation
        if (!email || !full_name) {
            return { error: 'Veuillez remplir tous les champs obligatoires' }
        }

        // Mock signup success
        const cookieStore = await cookies()
        cookieStore.set('demo-user-role', role, { path: '/' })
        cookieStore.set('demo-user-name', full_name, { path: '/' })

        revalidatePath('/', 'layout')

        if (role === 'patient') {
            redirect('/register/patient?step=2')
        } else {
            redirect('/register/doctor?step=2')
        }
    } catch (err: any) {
        if (err.message === 'NEXT_REDIRECT') throw err
        return { error: "Une erreur inattendue s'est produite." }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('demo-user-id')
    cookieStore.delete('demo-user-role')
    cookieStore.delete('demo-user-name')

    revalidatePath('/', 'layout')
    redirect('/login')
}
