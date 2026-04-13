'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Stethoscope, MapPin, ClipboardList,
  Activity, ShieldCheck, CreditCard,
  ChevronRight, ArrowRight, Menu, X,
  FileText, Clock, Users, PlusSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">MediHome</span>
            </div>

            {/* Desktop Navbar */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Comment ça marche</a>
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Fonctionnalités</a>
              <Link href="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link href="/register/patient">
                <Button className="bg-blue-600 hover:bg-blue-700">Commencer</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Le médecin <span className="text-blue-600 italic underline decoration-teal-400">vient à vous</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Des soins médicaux à domicile, rapides et certifiés. Plus besoin de se déplacer, nos spécialistes interviennent chez vous en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-16 px-10 text-xl font-bold shadow-2xl shadow-blue-200 animate-bounce-slow" asChild>
                <Link href="/patient/request">DEMANDER UN MÉDECIN</Link>
              </Button>
              <div className="flex flex-col gap-2">
                <Button size="lg" variant="ghost" className="h-12 px-6 text-sm font-semibold text-gray-500" asChild>
                  <Link href="/register/patient">Créer un compte patient</Link>
                </Button>
                <Button size="lg" variant="ghost" className="h-12 px-6 text-sm font-semibold text-gray-400" asChild>
                  <Link href="/register/doctor">Rejoindre en tant que médecin</Link>
                </Button>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <span>Rejoint par +5,000 patients cette semaine</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-100 dark:border-gray-800">
              {/* Replace with actual image later */}
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 h-[500px] w-full flex items-center justify-center text-white">
                <Stethoscope size={100} strokeWidth={1} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between gap-8">
          {[
            { label: 'Médecins certifiés', value: '500+' },
            { label: 'Consultations', value: '10,000+' },
            { label: 'Villes couvertes', value: '48' },
            { label: 'Satisfaction', value: '98%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fonctionnement simple</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Trois étapes pour recevoir des soins de qualité sans quitter votre domicile.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Décrivez vos symptômes', icon: ClipboardList, step: '01' },
            { title: 'Un médecin est assigné', icon: MapPin, step: '02' },
            { title: 'Consultation à domicile', icon: Activity, step: '03' },
          ].map((item, i) => (
            <div key={i} className="relative text-center group">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <item.icon size={32} />
              </div>
              <div className="absolute -top-4 right-1/2 translate-x-12 text-5xl font-black text-gray-100 dark:text-gray-800 pointer-events-none -z-10">{item.step}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">Processus guidé et sécurisé pour une prise en charge optimale.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Géolocalisation', desc: 'Trouvez le médecin le plus proche de chez vous en temps réel.', icon: MapPin },
              { title: 'Médecins certifiés', desc: 'Tous nos praticiens sont rigoureusement vérifiés par nos équipes.', icon: ShieldCheck },
              { title: 'Ordonnances numériques', desc: 'Vos ordonnances sont disponibles immédiatement sur votre mobile.', icon: FileText },
              { title: 'Suivi en temps réel', desc: 'Suivez le trajet de votre médecin sur une carte interactive.', icon: Clock },
              { title: 'Paiement sécurisé', desc: 'Payez en ligne ou en espèces en toute simplicité.', icon: CreditCard },
              { title: 'Dossier médical', desc: 'Retrouvez tout votre historique médical au même endroit.', icon: Users },
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 pt-20 pb-10 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-blue-600 mb-6 block">MediHome</span>
            <p className="text-gray-500 text-sm leading-relaxed">
              La plateforme leader pour les soins médicaux à domicile en Algérie.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Liens rapides</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/register/patient">Espace Patient</Link></li>
              <li><Link href="/register/doctor">Espace Médecin</Link></li>
              <li><Link href="/login">Se connecter</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Mentions légales</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <p className="text-sm text-gray-500 mb-2">contact@medihome.dz</p>
            <p className="text-sm text-gray-500">+213 (0) 550 00 00 00</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          © 2026 MediHome. Tous droits réservés.
        </div>
      </footer>

      {/* Floating Action Button for Quick Request */}
      <div className="fixed bottom-12 right-6 z-40 hidden md:block">
        <Link href="/patient/request">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-4 rounded-full font-black italic shadow-2xl flex items-center gap-3 border-4 border-white dark:border-gray-800"
          >
            <PlusSquare size={24} />
            URGENCE MÉDICALE ?
          </motion.button>
        </Link>
      </div>
    </div>
  )
}
