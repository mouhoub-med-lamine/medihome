'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Users, Stethoscope, DollarSign,
    ShieldAlert, CheckCircle2, XCircle,
    TrendingUp, Activity, MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const revenueData = [
    { name: 'Lun', value: 45000 },
    { name: 'Mar', value: 52000 },
    { name: 'Mer', value: 48000 },
    { name: 'Jeu', value: 61000 },
    { name: 'Ven', value: 55000 },
    { name: 'Sam', value: 67000 },
    { name: 'Dim', value: 72000 },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black italic tracking-tight underline decoration-blue-500 underline-offset-8 decoration-4">ADMIN COMMAND CENTER</h1>
                <p className="text-gray-500 mt-2">Vue d'ensemble de la plateforme MediHome.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Utilisateurs', value: '4,281', icon: Users, color: 'text-blue-600' },
                    { label: 'Médecins Actifs', value: '312', icon: Stethoscope, color: 'text-teal-600' },
                    { label: 'CA Total (Mensuel)', value: '1.2M DA', icon: DollarSign, color: 'text-green-600' },
                    { label: 'Alertes Système', value: '2', icon: ShieldAlert, color: 'text-red-600' },
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Verification Queue */}
                <Card className="lg:col-span-2 shadow-xl border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>File de Vérification</CardTitle>
                            <CardDescription>Nouveaux médecins en attente de certification.</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">5 EN ATTENTE</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">D</div>
                                        <div>
                                            <p className="font-bold text-sm">Dr. Karim Belhadj</p>
                                            <p className="text-[10px] text-gray-400">Cardiologie • 12 ans exp.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Refuser</Button>
                                        <Button size="sm" className="bg-blue-600">Vérifier</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Revenue Chart */}
                <Card className="shadow-xl border-none">
                    <CardHeader>
                        <CardTitle>Revenus Hebdomadaires</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
