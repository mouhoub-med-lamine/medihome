import React from 'react'
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-white dark:bg-gray-950 overflow-hidden font-sans">
            <Sidebar role="admin" />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
