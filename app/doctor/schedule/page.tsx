'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

export default function DoctorSchedulePage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black italic underline decoration-blue-500 underline-offset-8">PLANNING</h1>
            <Card className="border-none shadow-xl shadow-blue-50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-blue-600 text-white p-8">
                    <CardTitle className="flex items-center gap-3">
                        <Calendar /> Disponibilités hebdomadaires
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-20 text-center text-gray-400">
                    L'interface de gestion du calendrier sera bientôt disponible.
                </CardContent>
            </Card>
        </div>
    )
}
