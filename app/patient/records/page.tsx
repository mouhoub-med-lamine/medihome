'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    FileText, Download, Filter,
    Search, Calendar, ArrowRight,
    Activity, Heart, Thermometer
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const healthData = [
    { date: '01/04', bpm: 72, temp: 36.6 },
    { date: '02/04', bpm: 75, temp: 36.8 },
    { date: '03/04', bpm: 70, temp: 36.5 },
    { date: '04/04', bpm: 82, temp: 37.2 },
    { date: '05/04', bpm: 78, temp: 36.9 },
    { date: '06/04', bpm: 74, temp: 36.7 },
    { date: '07/04', bpm: 71, temp: 36.6 },
]

export default function RecordsPage() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-black italic tracking-tighter underline decoration-blue-500 underline-offset-8 decoration-4">VOTRE DOSSIER MÉDICAL</h1>
                <p className="text-gray-500 mt-4 font-medium">Consultez votre historique et téléchargez vos ordonnances.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Tabs defaultValue="consultations" className="w-full">
                        <TabsList className="bg-gray-100/50 dark:bg-gray-900/50 p-1.5 rounded-2xl h-14 w-full md:w-auto mb-6">
                            <TabsTrigger value="consultations" className="rounded-xl font-black text-xs uppercase px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all">Consultations</TabsTrigger>
                            <TabsTrigger value="ordonnances" className="rounded-xl font-black text-xs uppercase px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all">Ordonnances</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
                        <CardHeader className="p-8 pb-0">
                            <CardTitle className="font-black text-xl flex items-center gap-2 italic text-blue-600"><Activity size={24} /> ÉVOLUTION POULS</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={healthData}>
                                    <Line type="monotone" dataKey="bpm" stroke="#3b82f6" strokeWidth={4} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
