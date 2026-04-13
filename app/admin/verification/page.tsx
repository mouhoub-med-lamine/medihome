'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, FileText, Check, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminVerificationPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black italic underline decoration-orange-500 underline-offset-8 uppercase tracking-tight">VÉRIFICATION DES DOCUMENTS</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pending verification card */}
                <Card className="border-2 border-orange-100 border-dashed bg-orange-50/30 rounded-3xl">
                    <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-lg font-bold">Dr. Karima (Mock)</CardTitle>
                            <p className="text-xs font-black uppercase text-orange-600">En attente de revue</p>
                        </div>
                        <div className="p-3 bg-white rounded-2xl shadow-sm">
                            <FileText className="text-orange-500" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        <p className="text-sm text-gray-500">Document : Diplôme d'État en Médecine Générale (PDF)</p>
                        <div className="flex gap-3">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl gap-2"><Check size={18} /> Approuver</Button>
                            <Button variant="outline" className="flex-1 rounded-xl border-2 text-red-600 border-red-100 hover:bg-red-50 gap-2"><X size={18} /> Rejeter</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Empty state if nothing else */}
            <div className="py-20 text-center text-gray-300 font-medium">
                Aucune autre demande de vérification en attente.
            </div>
        </div>
    )
}
