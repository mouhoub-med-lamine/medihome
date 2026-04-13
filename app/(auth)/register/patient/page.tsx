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
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PatientMap = dynamic(() => import('@/components/maps/PatientMap'), { ssr: false })

const PatientRegisterContent = dynamic(() =>
    Promise.resolve(function InternalPatientRegister() {
        const router = useRouter()
        const searchParams = useSearchParams()
        const currentStep = parseInt(searchParams.get('step') || '1')
        const [loading, setLoading] = useState(false)

        const setStep = (step: number) => {
            router.push(`/register/patient?step=${step}`)
        }

        const handleStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setLoading(true)
            const formData = new FormData(e.currentTarget)
            const result = await signup(formData, 'patient')
            if (result?.error) {
                toast.error(result.error)
                setLoading(false)
            }
        }

        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
                <div className="w-full max-w-2xl">
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className={`w-1/4 h-2 rounded-full mx-1 ${s <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Créer votre compte</CardTitle>
                                        <CardDescription>Informations de base pour votre profil patient</CardDescription>
                                    </CardHeader>
                                    <form onSubmit={handleStep1}>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="full_name">Nom complet</Label>
                                                <Input id="full_name" name="full_name" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
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
                                            <div className="space-y-2">
                                                <Label htmlFor="gender">Genre</Label>
                                                <Select name="gender" required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionner" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="M">Masculin</SelectItem>
                                                        <SelectItem value="F">Féminin</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="date_of_birth">Date de naissance</Label>
                                                <Input id="date_of_birth" name="date_of_birth" type="date" required />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit" className="w-full" disabled={loading}>
                                                {loading ? 'Création...' : 'Suivant'}
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Votre adresse</CardTitle>
                                        <CardDescription>Où nos médecins doivent-ils se rendre?</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[400px] relative">
                                        <PatientMap onLocationSelect={(lat, lng, addr) => {
                                            // Save to state or send to server
                                            console.log(lat, lng, addr)
                                        }} />
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => setStep(3)} className="w-full">Suivant</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Profil médical</CardTitle>
                                        <CardDescription>Ces informations aident nos médecins à mieux vous soigner</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Groupe sanguin</Label>
                                            <Select name="blood_type">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Antécédents chroniques</Label>
                                            <Input placeholder="Ex: Diabète, Hypertension (séparés par des virgules)" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Allergies</Label>
                                            <Input placeholder="Ex: Pénicilline, Arachides" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => setStep(4)} className="w-full">Suivant</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}

                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Vérification d'identité</CardTitle>
                                        <CardDescription>Veuillez télécharger une copie de votre pièce d'identité</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
                                        <Input type="file" className="hidden" id="id-upload" />
                                        <Label htmlFor="id-upload" className="cursor-pointer text-blue-600 hover:underline">
                                            Cliquez pour télécharger
                                        </Label>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => router.push('/dashboard')} className="w-full">Terminer</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        )
    }), { ssr: false })

export default function PatientRegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">Chargement...</div>}>
            <PatientRegisterContent />
        </Suspense>
    )
}
