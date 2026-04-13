import React from 'react'
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-white dark:bg-gray-950 overflow-hidden">
            {/* Desktop Sidebar */}
            <Sidebar role="doctor" />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    {children}
                </main>

                {/* Mobile Bottom Nav for Doctors */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-40">
                    {/* Doctor Icons */}
                </div>
            </div>
        </div>
    )
}
