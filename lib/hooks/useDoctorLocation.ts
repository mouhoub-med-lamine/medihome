'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useDoctorLocation(doctorId: string | null) {
    const [location, setLocation] = useState<[number, number] | null>(null)
    const supabase = createClient()

    useEffect(() => {
        if (!doctorId) return

        // Fetch initial location
        supabase
            .from('doctor_profiles')
            .select('current_latitude, current_longitude')
            .eq('id', doctorId)
            .single()
            .then(({ data }) => {
                if (data?.current_latitude && data?.current_longitude) {
                    setLocation([data.current_latitude, data.current_longitude])
                }
            })

        // Subscribe to changes
        const channel = supabase
            .channel(`doctor-location-${doctorId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'doctor_profiles',
                    filter: `id=eq.${doctorId}`,
                },
                (payload) => {
                    if (payload.new.current_latitude && payload.new.current_longitude) {
                        setLocation([payload.new.current_latitude, payload.new.current_longitude])
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [doctorId, supabase])

    return location
}
