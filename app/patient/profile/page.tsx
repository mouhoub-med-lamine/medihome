'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MOCK_PROFILES } from '@/lib/mock-data'
import { toast } from 'react-hot-toast'
import { User, Phone, Mail, Calendar, Droplet, Shield } from 'lucide-react'

export default function PatientProfilePage() {
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Mock profile load
        const mockProfile = MOCK_PROFILES.find(p => p.role === 'patient')
        if (mockProfile) {
            setUser({ email: mockProfile.email })
            setProfile(mockProfile)
        }
        setLoading(false)
    }, [])

    if (loading) return <div className="flex items-center justify-center h-full">Chargement...</div>

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black italic underline decoration-blue-500 underline-offset-8">MON PROFIL</h1>
                <Button variant="outline" className="rounded-xl border-2">Modifier</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Info Card */}
                <Card className="md:col-span-1 border-none shadow-xl shadow-blue-50 rounded-3xl overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4 pt-12">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <User size={48} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{profile?.full_name || 'Utilisateur'}</h2>
                            <p className="text-gray-500 text-sm">{user?.email}</p>
                        </div>
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                            Patient Verifié
                        </div>
                    </CardContent>
                </Card>

                {/* Details Table */}
                <Card className="md:col-span-2 border-none shadow-xl shadow-blue-50 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-lg font-bold">Informations Personnelles</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs font-bold uppercase">Numéro de téléphone</Label>
                                <div className="flex items-center gap-2 font-semibold">
                                    <Phone size={14} className="text-blue-500" />
                                    {profile?.phone || 'Non renseigné'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs font-bold uppercase">Date de naissance</Label>
                                <div className="flex items-center gap-2 font-semibold">
                                    <Calendar size={14} className="text-blue-500" />
                                    {profile?.date_of_birth || 'Non renseigné'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs font-bold uppercase">Groupe Sanguin</Label>
                                <div className="flex items-center gap-2 font-semibold text-red-600">
                                    <Droplet size={14} />
                                    B+ (Mock)
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs font-bold uppercase">Identité Vérifiée</Label>
                                <div className="flex items-center gap-2 font-semibold text-blue-600">
                                    <Shield size={14} />
                                    Oui
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <Label className="text-gray-400 text-xs font-bold uppercase mb-3 block">Conditions Médicales</Label>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">Hypertension</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">Asthme</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
