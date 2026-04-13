'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Plus, MoreVertical, Heart, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function FamilyPage() {
    const members = [
        { id: 1, name: 'Fatima Gherbi', relation: 'Mère', age: '62', blood: 'A+', alerts: 'Diabète Type 2' },
    ]

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tighter underline decoration-blue-500 underline-offset-8 decoration-4">GESTION DE LA FAMILLE</h1>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-2xl font-black shadow-2xl">
                    <Plus className="mr-2 h-5 w-5" /> AJOUTER UN MEMBRE
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {members.map((m) => (
                    <Card key={m.id} className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-10 space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                                    <User size={36} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">{m.name}</h3>
                                    <p className="text-gray-400 font-bold">{m.relation} • {m.age} ans</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
