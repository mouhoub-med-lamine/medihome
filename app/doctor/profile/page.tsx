'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, ShieldCheck, Award } from 'lucide-react'

export default function DoctorProfilePage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black italic underline decoration-blue-500 underline-offset-8">MON PROFIL PROFESSIONNEL</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1 border-none shadow-xl rounded-3xl">
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4 pt-12">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <User size={48} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Dr. Ahmed (Mock)</h2>
                            <p className="text-gray-500 text-sm">Généraliste</p>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                            <ShieldCheck size={14} /> Certifié
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-none shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="p-8">
                        <CardTitle className="text-lg font-bold">Expérience & Diplômes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-4 text-gray-500 text-sm">
                        L'édition du profil sera opérationnelle dès que la vérification des documents sera terminée.
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
