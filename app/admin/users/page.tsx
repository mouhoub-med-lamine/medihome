'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Search, Filter, MoreVertical,
    Trash2, ShieldCheck, UserX,
    User, Stethoscope, ChevronLeft, ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function AdminUsersPage() {
    const [filter, setFilter] = useState('all')

    const users = [
        { id: 1, name: 'Dr. Sofia Brahimi', role: 'doctor', status: 'active', joined: '2024-03-12' },
        { id: 2, name: 'Yacine Gherbi', role: 'patient', status: 'active', joined: '2024-04-01' },
        { id: 3, name: 'Dr. Amine Benali', role: 'doctor', status: 'pending', joined: '2024-04-10' },
        { id: 4, name: 'Lina Mansouri', role: 'patient', status: 'suspended', joined: '2024-02-15' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tighter underline decoration-blue-500 underline-offset-8 decoration-4">GESTION DES UTILISATEURS</h1>
                    <p className="text-gray-500 mt-4 font-medium">Supervisez et gérez les comptes de la plateforme.</p>
                </div>
            </div>

            <Card className="border-none shadow-2xl shadow-blue-50/50 dark:shadow-none overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-gray-50/50 dark:bg-gray-900/50 p-8 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="Rechercher par nom, email..." className="pl-12 h-12 bg-white dark:bg-gray-950 rounded-2xl border-none shadow-inner" />
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-gray-200"><Filter size={18} className="mr-2" /> Filtres</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-gray-50/30 dark:bg-gray-900/30 border-none">
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="font-black text-[10px] uppercase text-gray-400 px-8 h-14">Utilisateur</TableHead>
                                <TableHead className="font-black text-[10px] uppercase text-gray-400 h-14">Rôle</TableHead>
                                <TableHead className="font-black text-[10px] uppercase text-gray-400 h-14">Inscription</TableHead>
                                <TableHead className="font-black text-[10px] uppercase text-gray-400 h-14">Statut</TableHead>
                                <TableHead className="text-right font-black text-[10px] uppercase text-gray-400 pr-8 h-14">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors border-gray-50 dark:border-gray-800">
                                    <TableCell className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black border border-blue-50 dark:border-blue-800">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="ghost" className={`rounded-xl px-4 py-1.5 flex items-center gap-2 w-fit border ${user.role === 'doctor' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                            {user.role === 'doctor' ? <Stethoscope size={14} /> : <User size={14} />}
                                            <span className="capitalize font-bold text-[11px] tracking-wide">{user.role}</span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-500 font-medium">{user.joined}</TableCell>
                                    <TableCell>
                                        <Badge className={`rounded-lg px-3 py-1 font-black text-[9px] ${user.status === 'active' ? 'bg-green-500' : user.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'}`}>
                                            {user.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100"><MoreVertical size={20} className="text-gray-400" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[180px] rounded-2xl p-2 shadow-2xl border-gray-100">
                                                <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer">
                                                    <ShieldCheck size={18} className="text-green-500" /> <span className="font-bold text-sm">Activer</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
