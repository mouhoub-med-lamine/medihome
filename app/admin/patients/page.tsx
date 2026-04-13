'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, MoreVertical, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminPatientsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black italic underline decoration-blue-500 underline-offset-8">PATIENTS</h1>
                <div className="flex gap-2">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input className="pl-10 rounded-xl" placeholder="Rechercher..." />
                    </div>
                    <Button variant="outline" className="rounded-xl border-2"><Filter size={18} /></Button>
                </div>
            </div>

            <Card className="border-none shadow-xl shadow-blue-50 rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-4 text-left font-bold">Patient</th>
                                    <th className="px-8 py-4 text-left font-bold">Contact</th>
                                    <th className="px-8 py-4 text-left font-bold">Consultations</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="group hover:bg-blue-50/30 transition-colors">
                                    <td className="px-8 py-6 font-bold">Sara Ben (Mock)</td>
                                    <td className="px-8 py-6 text-sm text-gray-500">0770 12 34 56</td>
                                    <td className="px-8 py-6 text-sm font-medium">3 visites</td>
                                    <td className="px-8 py-6 text-right">
                                        <Button variant="ghost" size="icon" className="text-gray-400"><MoreVertical size={18} /></Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
