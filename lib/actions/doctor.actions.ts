'use server'

import { revalidatePath } from 'next/cache'

export async function acceptRequest(requestId: string) {
    revalidatePath('/doctor/dashboard')
    revalidatePath('/doctor/requests')
    return { success: true }
}

export async function updateVisitStatus(requestId: string, status: string) {
    revalidatePath(`/doctor/active-visit/${requestId}`)
    return { success: true }
}

export async function submitConsultation(consultationData: any) {
    // Mock success
    return { success: true }
}
