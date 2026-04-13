'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react'

export default function DoctorEarningsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black italic underline decoration-green-500 underline-offset-8">MES REVENUS</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-lg shadow-green-50 rounded-3xl">
                    <CardContent className="p-8">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <p className="text-gray-500 text-sm font-medium">Aujourd'hui</p>
                                <h3 className="text-3xl font-black">7,500 DA</h3>
                            </div>
                            <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                                <DollarSign size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-xl shadow-gray-100 rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-lg font-bold">Historique des transactions</CardTitle>
                </CardHeader>
                <CardContent className="p-20 text-center text-gray-400">
                    Aucune transaction récente à afficher.
                </CardContent>
            </Card>
        </div>
    )
}
