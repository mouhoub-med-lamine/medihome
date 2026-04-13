'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Stethoscope, User, Clock, MapPin,
    CheckCircle2, ChevronRight, ChevronLeft,
    AlertTriangle, Calendar, Activity, Heart,
    CreditCard, Banknote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { createRequest } from '@/lib/actions/request.actions'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'

const steps = ['Spécialiste', 'Symptômes', 'Quand?', 'Où?', 'Contact', 'Récapitulatif']

const specializations = [
    { id: 'generaliste', name: 'Généraliste', icon: Stethoscope },
    { id: 'cardiologue', name: 'Cardiologue', icon: Activity },
    { id: 'pediatre', name: 'Pédiatre', icon: Heart },
    { id: 'dermatologue', name: 'Dermatologue', icon: User },
]

export default function RequestWizard() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [formData, setFormData] = useState({
        specialization: '',
        for_who: 'me',
        symptoms: '',
        urgency: 'normal',
        time: 'now',
        address: 'Alger, Algérie',
        latitude: 36.7538,
        longitude: 3.0588,
        payment_method: 'cash',
        fee: 2500,
        guest_name: '',
        guest_phone: '',
    })

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })
    }, [])

    const nextStep = () => {
        // Skip Contact step if authenticated
        if (step === 4 && user) {
            setStep(6)
        } else {
            setStep(s => Math.min(s + 1, 6))
        }
    }
    const prevStep = () => {
        if (step === 6 && user) {
            setStep(4)
        } else {
            setStep(s => Math.max(s - 1, 1))
        }
    }

    const handleSubmit = async () => {
        if (!user && (!formData.guest_name || !formData.guest_phone)) {
            toast.error("Veuillez remplir vos informations de contact")
            return
        }
        setLoading(true)
        const result = await createRequest(formData)
        if (result.error) {
            toast.error(result.error)
            setLoading(false)
        } else {
            toast.success("Demande créée avec succès!")
            // If guest, maybe show a special tracking page or redirect to login
            if (user) {
                router.push(`/patient/tracking/${result.data.id}`)
            } else {
                router.push(`/tracking/${result.data.id}`)
            }
        }
    }

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="flex justify-between relative mb-12">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2" />
                {steps.map((label, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${i + 1 <= step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {i + 1 < step ? <CheckCircle2 size={20} /> : <span className="font-bold">{i + 1}</span>}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${i + 1 <= step ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Choisissez un spécialiste</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {specializations.map(spec => (
                                    <button
                                        key={spec.id}
                                        onClick={() => { setFormData({ ...formData, specialization: spec.id }); nextStep(); }}
                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.specialization === spec.id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 hover:border-blue-200 bg-white'}`}
                                    >
                                        <spec.icon size={32} />
                                        <span className="font-bold">{spec.name}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="pt-6">
                                <Label className="mb-3 block font-bold">Pour qui?</Label>
                                <div className="flex gap-4">
                                    <Button
                                        variant={formData.for_who === 'me' ? 'default' : 'outline'}
                                        onClick={() => setFormData({ ...formData, for_who: 'me' })}
                                        className="flex-1 rounded-xl h-12"
                                    >Pour moi</Button>
                                    <Button
                                        variant={formData.for_who === 'family' ? 'default' : 'outline'}
                                        onClick={() => setFormData({ ...formData, for_who: 'family' })}
                                        className="flex-1 rounded-xl h-12"
                                    >Un proche</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Décrivez les symptômes</h3>
                            <div className="space-y-2">
                                <Label>Symptômes et antécédents</Label>
                                <Textarea
                                    placeholder="Détaillez ce que vous ressentez..."
                                    className="min-h-[150px] rounded-xl"
                                    value={formData.symptoms}
                                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label className="font-bold">Niveau d'urgence</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'normal', label: 'Normal', color: 'bg-green-100 text-green-700' },
                                        { id: 'urgent', label: 'Urgent', color: 'bg-orange-100 text-orange-700' },
                                        { id: 'very_urgent', label: 'Critique', color: 'bg-red-100 text-red-700' },
                                    ].map(lvl => (
                                        <button
                                            key={lvl.id}
                                            onClick={() => setFormData({ ...formData, urgency: lvl.id })}
                                            className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.urgency === lvl.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100'}`}
                                        >
                                            <div className={`w-full py-2 rounded-lg ${lvl.color}`}>{lvl.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 text-center py-4">
                            <h3 className="text-xl font-bold">Quand souhaitez-vous voir le médecin?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <Card
                                    className={`cursor-pointer transition-all ${formData.time === 'now' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : ''}`}
                                    onClick={() => setFormData({ ...formData, time: 'now' })}
                                >
                                    <CardContent className="p-8 flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                            <Clock size={32} />
                                        </div>
                                        <span className="text-xl font-bold">Maintenant</span>
                                        <p className="text-sm text-gray-500">Le premier médecin disponible intervient immédiatement.</p>
                                    </CardContent>
                                </Card>
                                <Card
                                    className={`cursor-pointer transition-all ${formData.time === 'later' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : ''}`}
                                    onClick={() => setFormData({ ...formData, time: 'later' })}
                                >
                                    <CardContent className="p-8 flex flex-col items-center gap-4 opacity-50">
                                        <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                                            <Calendar size={32} />
                                        </div>
                                        <span className="text-xl font-bold">Planifier</span>
                                        <p className="text-sm text-gray-500">Choisissez une date et une heure (Bientôt disponible).</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Confirmez votre adresse</h3>
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-start gap-3">
                                <MapPin className="text-blue-600 mt-1" />
                                <div>
                                    <span className="font-bold block">Adresse enregistrée</span>
                                    <p className="text-sm text-gray-500">{formData.address}</p>
                                </div>
                            </div>
                            <div className="h-[250px] bg-gray-200 rounded-2xl relative overflow-hidden">
                                {/* Mini Leaflet Map would go here */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                                    Carte Interactive
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-blue-600 italic">VOS COORDONNÉES</h3>
                            <p className="text-sm text-gray-500">Puisque vous n'êtes pas connecté, nous avons besoin de vos informations pour que le médecin puisse vous contacter.</p>

                            <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label>Nom Complet</Label>
                                    <Input
                                        placeholder="Ex: Mohamed Alilou"
                                        className="h-14 rounded-2xl border-2"
                                        value={formData.guest_name}
                                        onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Numéro de Téléphone</Label>
                                    <Input
                                        placeholder="Ex: 0550 12 34 56"
                                        className="h-14 rounded-2xl border-2"
                                        value={formData.guest_phone}
                                        onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-orange-50 text-orange-700 rounded-2xl text-xs font-medium">
                                Note : Créer un compte plus tard vous permettra de suivre votre historique médical.
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Récapitulatif de la demande</h3>
                            <Card className="border-none bg-gray-50 dark:bg-gray-900 shadow-inner">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <span className="text-gray-500">Spécialiste</span>
                                        <span className="font-bold capitalize text-blue-600">{formData.specialization}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <span className="text-gray-500">Patient</span>
                                        <span className="font-bold">{formData.for_who === 'me' ? 'Vous-même' : 'Un proche'}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <span className="text-gray-500">Urgence</span>
                                        <Badge
                                            className={formData.urgency === 'normal' ? 'bg-green-500' : formData.urgency === 'urgent' ? 'bg-orange-500' : 'bg-red-500'}
                                        >
                                            {formData.urgency.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-gray-900 dark:text-white font-bold text-lg">Total estimé</span>
                                        <span className="font-bold text-2xl text-blue-600">{formData.fee} DA</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-4 pt-4">
                                <Label className="font-bold">Mode de paiement</Label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setFormData({ ...formData, payment_method: 'card' })}
                                        className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-3 transition-all ${formData.payment_method === 'card' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100'}`}
                                    >
                                        <CreditCard size={20} /> Carte
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, payment_method: 'cash' })}
                                        className={`flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-3 transition-all ${formData.payment_method === 'cash' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100'}`}
                                    >
                                        <Banknote size={20} /> Espèces
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-10">
                {step > 1 && (
                    <Button variant="outline" onClick={prevStep} className="h-14 px-8 rounded-2xl flex-1 md:flex-none">
                        <ChevronLeft className="mr-2" /> Retour
                    </Button>
                )}
                <Button
                    onClick={step === 6 ? handleSubmit : nextStep}
                    className={`h-14 px-8 rounded-2xl flex-1 ${step !== 6 ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-green-600 shadow-lg shadow-green-200'}`}
                    disabled={loading || (step === 1 && !formData.specialization) || (step === 5 && (!formData.guest_name || !formData.guest_phone))}
                >
                    {loading ? 'Traitement...' : step === 6 ? 'Confirmer la demande' : 'Continuer'}
                    {step !== 6 && <ChevronRight className="ml-2" />}
                </Button>
            </div>

            <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-2xl text-sm">
                <AlertTriangle size={18} className="shrink-0" />
                <p>En confirmant, votre demande sera notifiée aux médecins les plus proches de votre position géographique.</p>
            </div>
        </div>
    )
}
