'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home, Clipboard, Calendar,
    User, Settings, LogOut,
    PlusSquare, History, FileText,
    Users, TrendingUp, ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/lib/actions/auth.actions'

interface SidebarProps {
    role: 'patient' | 'doctor' | 'admin'
}

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname()

    const links = {
        patient: [
            { name: 'Dashboard', href: '/patient/dashboard', icon: Home },
            { name: 'Demande', href: '/patient/request', icon: PlusSquare },
            { name: 'Dossier', href: '/patient/records', icon: FileText },
            { name: 'Famille', href: '/patient/family', icon: Users },
            { name: 'Profil', href: '/patient/profile', icon: User },
        ],
        doctor: [
            { name: 'Dashboard', href: '/doctor/dashboard', icon: Home },
            { name: 'Requêtes', href: '/doctor/requests', icon: Clipboard },
            { name: 'Planning', href: '/doctor/schedule', icon: Calendar },
            { name: 'Revenus', href: '/doctor/earnings', icon: TrendingUp },
            { name: 'Profil', href: '/doctor/profile', icon: User },
        ],
        admin: [
            { name: 'Dashboard', href: '/admin/dashboard', icon: TrendingUp },
            { name: 'Médecins', href: '/admin/doctors', icon: Stethoscope },
            { name: 'Patients', href: '/admin/patients', icon: Users },
            { name: 'Vérification', href: '/admin/verification', icon: ShieldCheck },
            { name: 'Paramètres', href: '/admin/settings', icon: Settings },
        ]
    }

    const currentLinks = links[role] || []

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 h-full">
            <div className="p-8">
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    MediHome
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {currentLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                            pathname === link.href
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                    >
                        <link.icon className={cn(
                            "h-5 w-5 transition-transform group-hover:scale-110",
                            pathname === link.href ? "text-blue-600" : "text-gray-400"
                        )} />
                        {link.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Déconnexion
                </button>
            </div>
        </aside>
    )
}

// Fixed import for Stethoscope used in admin links
import { Stethoscope } from 'lucide-react'
