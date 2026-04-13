'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Globe, Shield, Bell, CreditCard } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black italic underline decoration-blue-500 underline-offset-8">PARAMÈTRES SYSTÈME</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 bg-gray-50">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Globe size={20} className="text-blue-500" /> Général
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="font-bold">Mode Maintenance</Label>
                                <p className="text-xs text-gray-500">Désactiver l'accès aux utilisateurs</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="font-bold">Inscriptions ouvertes</Label>
                                <p className="text-xs text-gray-500">Autoriser les nouveaux comptes médecins</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 bg-gray-50">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Bell size={20} className="text-blue-500" /> Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="font-bold">Alertes SMS</Label>
                                <p className="text-xs text-gray-500">Facturation par service tiers</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="font-bold">Rapports Hebdomadaires</Label>
                                <p className="text-xs text-gray-500">Envoyer par email aux admins</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
