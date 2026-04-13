'use client'

import { useState } from 'react'
import { signup } from '@/lib/actions/auth.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { Stethoscope, Clipboard, Clock, MapPin, FileText } from 'lucide-react'

export default function DoctorRegisterPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentStep = parseInt(searchParams.get('step') || '1')
    const [loading, setLoading] = useState(false)

    const setStep = (step: number) => {
        router.push(`/register/doctor?step=${step}`)
    }

    const handleStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const result = await signup(formData, 'doctor')
        if (result?.error) {
            toast.error(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-2xl">
                <div className="mb-8 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {['Compte', 'Professionnel', 'Planning', 'Zone', 'Documents'].map((label, i) => (
                        <div key={i} className={`flex flex-col items-center flex-1 ${i + 1 <= currentStep ? 'text-blue-600' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                {i + 1}
                            </div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Card shadow-lg>
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Stethoscope className="text-blue-600" />
                                        <CardTitle>Inscription Médecin</CardTitle>
                                    </div>
                                    <CardDescription>Rejoignez notre réseau de soins à domicile</CardDescription>
                                </CardHeader>
                                <form onSubmit={handleStep1}>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Nom complet</Label>
                                            <Input id="full_name" name="full_name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email professionnel</Label>
                                            <Input id="email" name="email" type="email" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Mot de passe</Label>
                                            <Input id="password" name="password" type="password" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Téléphone</Label>
                                            <Input id="phone" name="phone" required />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit" className="w-full bg-blue-600" disabled={loading}>
                                            {loading ? 'Traitement...' : 'Suivant'}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clipboard className="text-blue-600" />
                                        <CardTitle>Informations Professionnelles</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Spécialisation</Label>
                                        <Select name="specialization" required>
                                            <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="generaliste">Généraliste</SelectItem>
                                                <SelectItem value="cardiologue">Cardiologue</SelectItem>
                                                <SelectItem value="pediatre">Pédiatre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Numéro de licence</Label>
                                        <Input placeholder="Ex: 12345/DZ" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Années d'expérience</Label>
                                        <Input type="number" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tarif de base (DA)</Label>
                                        <Input type="number" defaultValue={2000} required />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={() => setStep(3)} className="w-full">Suivant</Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    )}

                    {currentStep >= 3 && (
                        <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Card className="p-8 text-center">
                                <CardTitle className="mb-4">Etape {currentStep} en cours...</CardTitle>
                                <p className="text-gray-600 mb-6">Cette section (Planning, Zone, Documents) est en cours de développement.</p>
                                <Button onClick={() => currentStep < 5 ? setStep(currentStep + 1) : router.push('/dashboard')}>
                                    {currentStep < 5 ? 'Continuer' : 'Terminer'}
                                </Button>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
