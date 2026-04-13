'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin, Phone, MessageSquare,
    Clock, ShieldCheck, Star,
    Shield, Navigation, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'
import { MOCK_REQUESTS } from '@/lib/mock-data'
import { useDoctorLocation } from '@/lib/hooks/useDoctorLocation'
import Chat from '@/components/common/Chat'

const DoctorTrackingMap = dynamic(() => import('@/components/maps/DoctorTrackingMap'), { ssr: false })

export default function TrackingPage() {
    const { requestId } = useParams()
    const [request, setRequest] = useState<any>(null)
    const doctorLocation = useDoctorLocation(request?.doctor_id)

    useEffect(() => {
        const mockReq = MOCK_REQUESTS.find(r => r.id === requestId) || MOCK_REQUESTS[0]
        setRequest(mockReq)
    }, [requestId])

    if (!request) return <div className="p-20 text-center">Chargement du suivi...</div>

    return (
        <div className="h-[calc(100vh-120px)] relative rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 z-0">
                <DoctorTrackingMap
                    patientPos={[request.latitude, request.longitude]}
                    doctorPos={doctorLocation || [request.latitude + 0.01, request.longitude + 0.01]}
                />
            </div>

            <Chat requestId={requestId as string} currentUserId={request?.patient_id} />
        </div>
    )
}
