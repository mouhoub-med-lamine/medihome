'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Heart, Calendar, FileText,
    MapPin, Plus, ArrowRight,
    Activity, Thermometer, Droplets
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function PatientDashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-100 dark:shadow-none">
                <div className="space-y-2">
                    <h1 className="text-3xl font-black italic tracking-tight underline decoration-white/20 underline-offset-8 decoration-4">BONJOUR, AMINE</h1>
                    <p className="opacity-80 font-medium">Prenez soin de votre santé aujourd'hui.</p>
                </div>
                <Button className="mt-6 md:mt-0 bg-white text-blue-600 hover:bg-gray-100 font-black rounded-2xl h-14 px-8 shadow-xl" asChild>
                    <Link href="/patient/request">
                        <Plus className="mr-2 h-5 w-5" /> NOUVELLE CONSULTATION
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Pouls', value: '72 bpm', icon: Activity, color: 'text-red-500' },
                    { label: 'Temp', value: '36.6 °C', icon: Thermometer, color: 'text-orange-500' },
                    { label: 'Hydratation', value: '80%', icon: Droplets, color: 'text-blue-500' },
                    { label: 'Sommeil', value: '7.5h', icon: Calendar, color: 'text-indigo-500' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-gray-50 dark:bg-gray-900/50 rounded-3xl">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-black uppercase text-gray-400">{stat.label}</span>
                                <stat.icon size={14} className={stat.color} />
                            </div>
                            <div className="text-lg font-black">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
