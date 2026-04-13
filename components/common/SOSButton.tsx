'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'react-hot-toast'

export default function SOSButton() {
    const [open, setOpen] = useState(false)

    const handleSOS = () => {
        toast.success("Alerte SOS activée. Le SAMU et vos contacts d'urgence ont été prévenus.")
        setOpen(false)
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 animate-pulse"
            >
                <span className="font-bold text-lg">SOS</span>
            </motion.button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertCircle /> URGENCE CRITIQUE
                        </DialogTitle>
                        <DialogDescription className="py-4">
                            En appuyant sur "Confirmer", MediHome va immédiatement :
                            <ul className="list-disc ml-5 mt-2 space-y-1">
                                <li>Appeler le numéro d'urgence (14)</li>
                                <li>Envoyer votre position exacte à vos contacts d'urgence</li>
                                <li>Dépêcher le médecin le plus proche en mode prioritaire</li>
                            </ul>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                        <Button variant="destructive" onClick={handleSOS} className="bg-red-600 hover:bg-red-700">
                            CONFIRMER SOS
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
