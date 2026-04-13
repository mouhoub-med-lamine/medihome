'use client'

import React from 'react'
import { Bell, Search, User, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { logout } from '@/lib/actions/auth.actions'

export default function Navbar() {
    return (
        <header className="h-16 md:h-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 z-30">
            <div className="flex items-center gap-4">
                <div className="md:hidden font-bold text-blue-600 text-xl">MediHome</div>
                <div className="hidden md:flex relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        placeholder="Rechercher..."
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-full pl-10 pr-4 h-9 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 font-bold">
                    A
                </div>
            </div>
        </header>
    )
}
