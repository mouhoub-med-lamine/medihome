'use server'

import { revalidatePath } from 'next/cache'

export async function createRequest(formData: any) {
    // Mock success and return a fake object that UI expects
    revalidatePath('/patient/dashboard')
    revalidatePath('/doctor/requests')

    return {
        success: true,
        error: null as string | null,
        data: {
            id: 'req-new-' + Math.random().toString(36).substr(2, 9),
            status: 'pending',
            ...formData
        }
    }
}

export async function cancelRequest(requestId: string) {
    revalidatePath('/patient/dashboard')
    return { success: true }
}
