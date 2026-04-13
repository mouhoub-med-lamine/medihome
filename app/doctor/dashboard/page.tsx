'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Activity, Users, DollarSign,
    MapPin, Clock, ArrowRight,
    TrendingUp, Star, Phone
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

export default function DoctorDashboard() {
    const [isOnline, setIsOnline] = useState(true)

    return (
        <div className="space-y-8">
            {/* Availability Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-100 dark:shadow-none">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tight underline decoration-white/30 underline-offset-8 decoration-4">DR. SOFIA BRAHIMI</h1>
                    <p className="mt-2 opacity-80 font-medium">Cardiologie • 12 ans d'expérience</p>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                    <span className="font-bold text-sm">{isOnline ? 'EN LIGNE' : 'HORS LIGNE'}</span>
                    <Switch
                        checked={isOnline}
                        onCheckedChange={setIsOnline}
                        className="data-[state=checked]:bg-green-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Visites Aujourd\'hui', value: '8', icon: Activity, color: 'text-blue-600' },
                    { label: 'Gain du Jour', value: '25,000 DA', icon: DollarSign, color: 'text-green-600' },
                    { label: 'Note Patient', value: '4.9/5', icon: Star, color: 'text-orange-500' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-gray-50 dark:bg-gray-900/50">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-black uppercase text-gray-400">{stat.label}</span>
                                <stat.icon size={16} className={stat.color} />
                            </div>
                            <div className="text-2xl font-black">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Live Map Preview (Static for now) */}
                <Card className="shadow-2xl border-none overflow-hidden h-[400px] relative group">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin size={48} className="mx-auto text-blue-600 mb-2 animate-bounce" />
                            <p className="text-gray-400 font-bold">CARTE DES DEMANDES</p>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-white/20 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold">3 Demandes à proximité ({"<"} 5km)</span>
                            <Button size="sm" variant="ghost" className="text-blue-600 font-bold">Explorer <ArrowRight size={14} className="ml-1" /></Button>
                        </div>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-xl border-none">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="text-blue-600" size={20} /> Activité Récente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { patient: 'Karim B.', type: 'Consultation', fee: '3,500 DA', status: 'Terminé' },
                            { patient: 'Lina M.', type: 'Suivi', fee: '2,500 DA', status: 'Terminé' },
                            { patient: 'Yassine G.', type: 'Urgence', fee: '5,000 DA', status: 'Annulé' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                        {item.patient.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{item.patient}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-black">{item.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm">{item.fee}</p>
                                    <Badge variant="ghost" className="text-[9px] h-4 p-0">{item.status}</Badge>
                                </div>
                            </div>
                        ))}
                        <Button className="w-full h-12 bg-blue-600 shadow-lg shadow-blue-100 dark:shadow-none" asChild>
                            <Link href="/doctor/requests">CONSULTER LES DEMANDES</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
