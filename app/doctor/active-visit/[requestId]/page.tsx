'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin, Clock, CheckCircle2,
    MessageCircle, Navigation, User,
    FileText, Plus, Trash2, Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { MOCK_REQUESTS } from '@/lib/mock-data'
import { updateVisitStatus, submitConsultation } from '@/lib/actions/doctor.actions'
import { toast } from 'react-hot-toast'
import Chat from '@/components/common/Chat'

export default function ActiveVisitPage() {
    const { requestId } = useParams()
    const router = useRouter()
    const [request, setRequest] = useState<any>(null)
    const [meds, setMeds] = useState([{ name: '', dosage: '', frequency: '' }])
    const [diagnosis, setDiagnosis] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const mockReq = MOCK_REQUESTS.find(r => r.id === requestId) || MOCK_REQUESTS[0]
        setRequest(mockReq)
        setLoading(false)
    }, [requestId])

    const addMed = () => setMeds([...meds, { name: '', dosage: '', frequency: '' }])
    const removeMed = (index: number) => setMeds(meds.filter((_, i) => i !== index))

    const handleStatusChange = async (newStatus: string) => {
        const res = await updateVisitStatus(requestId as string, newStatus)
        if (res.success) {
            setRequest((prev: any) => ({ ...prev, status: newStatus }))
            toast.success(`Statut mis à jour: ${newStatus}`)
        }
    }

    const handleFinish = async () => {
        const res = await submitConsultation({
            requestId,
            doctorId: request.doctor_id,
            patientId: request.patient_id,
            diagnosis,
            medications: meds,
            notes: "Consultation à domicile"
        })
        if (res.success) {
            toast.success("Consultation terminée!")
            router.push('/doctor/dashboard')
        }
    }

    if (loading) return <div className="p-20 text-center text-gray-500">Chargement de la visite...</div>

    return (
        <div className="space-y-6 pb-20 max-w-6xl mx-auto">
            {/* Visit Control Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-950 p-6 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 gap-4">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 animate-pulse">
                        <Navigation size={24} />
                    </div>
                    <div>
                        <h3 className="font-black text-xs uppercase text-gray-400 tracking-wider">Statut de la visite</h3>
                        <p className="text-2xl font-black capitalize tracking-tight">{request.status.replace('_', ' ')}</p>
                    </div>
                </div>
                <div className="flex gap-4 w-full md:auto">
                    {request.status === 'accepted' && (
                        <Button onClick={() => handleStatusChange('arrived')} className="flex-1 bg-green-600 hover:bg-green-700 h-14 p-0 rounded-2xl font-black shadow-xl shadow-green-100 dark:shadow-none">JE SUIS ARRIVÉ</Button>
                    )}
                    {['arrived', 'in_progress'].includes(request.status) && (
                        <Button onClick={() => handleStatusChange('in_progress')} variant="outline" className="flex-1 h-14 rounded-2xl border-2 border-dashed border-blue-200 text-blue-600 font-black hover:border-blue-300">COMMENCER</Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Patient Info Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="overflow-hidden border-none shadow-xl rounded-[2rem]">
                        <CardHeader className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-[1.5rem] bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 text-3xl font-black shadow-inner">Y</div>
                                <div>
                                    <CardTitle className="font-black text-xl">Patient Info</CardTitle>
                                    <CardDescription className="font-bold">{request.patient_address}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Symptômes Déclarés</p>
                                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl italic text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800 leading-relaxed">
                                    "{request.symptoms}"
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Medical Form */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="p-10 border-b border-gray-50 dark:border-gray-800">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <FileText size={24} />
                                <Badge variant="outline" className="border-blue-100 text-blue-600 font-black rounded-lg">RAPPORT MÉDICAL</Badge>
                            </div>
                            <CardTitle className="text-3xl font-black italic tracking-tighter">DIAGNOSTIC & OBSERVATIONS</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-10">
                            <div className="space-y-4">
                                <Label className="font-black text-xs uppercase tracking-widest text-gray-400">Diagnostic Principal</Label>
                                <Textarea
                                    placeholder="Décrivez l'état du patient et votre diagnostic..."
                                    className="min-h-[120px] rounded-3xl bg-gray-50/50 border-none shadow-inner p-6 focus-visible:ring-blue-500"
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                />
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <Label className="font-black text-xl italic tracking-tight">ORDONNANCE DIGITALE</Label>
                                    <Button variant="outline" size="sm" onClick={addMed} className="rounded-xl font-black text-blue-600 border-blue-100 hover:bg-blue-50">
                                        <Plus size={18} className="mr-2" /> AJOUTER
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {meds.map((med, i) => (
                                        <div key={i} className="flex flex-col md:flex-row gap-4 items-end bg-gray-50/50 dark:bg-gray-950/20 p-6 rounded-[2rem] relative group border border-gray-100 dark:border-gray-800">
                                            <div className="flex-1 space-y-2 w-full">
                                                <Label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Médicament</Label>
                                                <Input placeholder="Nom" className="bg-white dark:bg-gray-900 rounded-xl h-12" value={med.name} onChange={(e) => {
                                                    const newMeds = [...meds]; newMeds[i].name = e.target.value; setMeds(newMeds);
                                                }} />
                                            </div>
                                            <div className="w-full md:w-40 space-y-2">
                                                <Label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Dosage</Label>
                                                <Input placeholder="Ex: 500mg" className="bg-white dark:bg-gray-900 rounded-xl h-12" value={med.dosage} onChange={(e) => {
                                                    const newMeds = [...meds]; newMeds[i].dosage = e.target.value; setMeds(newMeds);
                                                }} />
                                            </div>
                                            {meds.length > 1 && (
                                                <Button variant="ghost" size="icon" onClick={() => removeMed(i)} className="rounded-xl h-12 w-12 text-red-400 hover:text-red-500 hover:bg-red-50">
                                                    <Trash2 size={22} />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-10 flex gap-6">
                                <Button
                                    onClick={handleFinish}
                                    disabled={!diagnosis.trim()}
                                    className="flex-1 h-16 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-200 dark:shadow-none font-black text-lg group"
                                >
                                    TERMINER LA VISITE <Send size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Chat requestId={requestId as string} currentUserId={request?.doctor_id} />
        </div>
    )
}
