'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Clipboard, SkipForward, ArrowRight,
    MapPin, Clock, Zap, User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MOCK_REQUESTS } from '@/lib/mock-data'
import { acceptRequest } from '@/lib/actions/doctor.actions'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function DoctorRequestsPage() {
    const [requests, setRequests] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setRequests(MOCK_REQUESTS)
        setLoading(false)
    }, [])

    const handleAccept = async (id: string) => {
        const result = await acceptRequest(id)
        if (result && 'error' in result) {
            toast.error((result as any).error)
        } else {
            toast.success("Demande acceptée!")
            router.push(`/doctor/active-visit/${id}`)
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Chargement des demandes...</div>

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tighter underline decoration-blue-500 underline-offset-8 decoration-4">DEMANDES ENTRANTES</h1>
                    <p className="text-gray-500 mt-2 font-medium">Restez en ligne pour recevoir de nouvelles notifications.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {requests.length === 0 ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                            <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <Clipboard size={32} className="text-gray-300" />
                            </div>
                            <p className="text-gray-400 font-black uppercase text-sm tracking-widest">Aucune demande en attente</p>
                        </motion.div>
                    ) : (
                        requests.map((req, i) => (
                            <motion.div
                                key={req.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Card className="border-none shadow-2xl bg-white dark:bg-gray-800 overflow-hidden relative rounded-[2rem]">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Left Info */}
                                            <div className="p-8 flex-1 space-y-6">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center border border-blue-100 dark:border-blue-800">
                                                            <User size={28} className="text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-black text-xl tracking-tight">Patient #{req.id.slice(0, 4)}</h3>
                                                            <p className="text-xs text-gray-400 font-bold uppercase flex items-center gap-1 mt-1">
                                                                <MapPin size={10} /> {req.patient_address || 'Alger, Centre'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge className={`rounded-xl px-4 py-1 font-black ${req.urgency === 'very_urgent' ? 'bg-red-600' : req.urgency === 'urgent' ? 'bg-orange-600' : 'bg-green-600'}`}>
                                                        {req.urgency.toUpperCase()}
                                                    </Badge>
                                                </div>

                                                <div className="bg-gray-50/50 dark:bg-gray-950/20 p-5 rounded-3xl text-sm italic text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800 leading-relaxed">
                                                    "{req.symptoms}"
                                                </div>

                                                <div className="flex items-center gap-8 text-sm">
                                                    <div className="flex items-center gap-2 text-blue-600 font-black">
                                                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                                                        1.2 km
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-500 font-bold">
                                                        <Clock size={16} /> 8 min estimation
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Action */}
                                            <div className="min-w-[220px] bg-gray-50/50 dark:bg-gray-900/40 p-8 flex flex-col justify-center gap-4 border-l border-gray-100 dark:border-gray-800">
                                                <div className="text-center group">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">Honoraires</span>
                                                    <span className="text-3xl font-black text-blue-600 tracking-tighter">{req.fee || 2500} DA</span>
                                                </div>
                                                <Button
                                                    className="w-full bg-blue-600 h-14 shadow-2xl shadow-blue-200 dark:shadow-none font-black text-lg rounded-2xl hover:scale-[1.02] transition-transform active:scale-95"
                                                    onClick={() => handleAccept(req.id)}
                                                >
                                                    ACCEPTER
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-gray-400 font-bold hover:bg-transparent">Ignorer</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
