'use client'

import { useState } from 'react'
import { login } from '@/lib/actions/auth.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Stethoscope, User, Lock, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const result = await login(formData)
        if (result?.error) {
            toast.error(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">MediHome</h1>
                    <p className="text-gray-600 dark:text-gray-400">Votre santé à domicile</p>
                </div>

                <Card className="border-none shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
                        <CardDescription>Connectez-vous pour accéder à votre espace MediHome</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="exemple@mail.com"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                        Oublié?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg" disabled={loading}>
                                {loading ? 'Connexion...' : 'Se connecter'}
                            </Button>
                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Vous n'avez pas de compte?
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <Button variant="outline" asChild className="h-10">
                                    <Link href="/register/patient">
                                        <User className="mr-2 h-4 w-4" /> Patient
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="h-10">
                                    <Link href="/register/doctor">
                                        <Stethoscope className="mr-2 h-4 w-4" /> Médecin
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}
