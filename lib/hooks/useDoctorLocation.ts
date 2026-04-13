'use client'

import { useState, useEffect } from 'react'
export function useDoctorLocation(doctorId: string | null) {
    const [location, setLocation] = useState<[number, number] | null>(null)

    useEffect(() => {
        if (!doctorId) return
        // Mock static location (Alger center)
        setLocation([36.7538, 3.0588])
    }, [doctorId])

    return location
}
