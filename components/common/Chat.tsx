'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, MessageSquare, X, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
    id: string
    content: string
    sender_id: string
    created_at: string
}

export default function Chat({ requestId, currentUserId }: { requestId: string, currentUserId: string }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Mock initial messages
        setMessages([
            { id: '1', content: 'Bonjour Dr., j\'ai une forte fièvre.', sender_id: 'patient-1', created_at: new Date().toISOString() },
            { id: '2', content: 'Je suis en route, environ 10 minutes.', sender_id: 'doctor-1', created_at: new Date().toISOString() }
        ])
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isOpen])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const newMessage: Message = {
            id: Math.random().toString(),
            content: input,
            sender_id: currentUserId,
            created_at: new Date().toISOString()
        }

        setMessages(prev => [...prev, newMessage])
        setInput('')
    }

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-blue-600 shadow-xl z-40 md:bottom-10"
                >
                    <MessageSquare />
                </Button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-50 flex flex-col border border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-blue-600 text-white flex justify-between items-center bg-gradient-to-r from-blue-600 to-teal-500">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">M</div>
                                <div>
                                    <h3 className="text-sm font-bold">Chat Médical</h3>
                                    <p className="text-[10px] opacity-80">En ligne</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10">
                                <X size={18} />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-950/50"
                        >
                            {messages.length === 0 && (
                                <div className="text-center py-10 text-gray-400 text-xs italic">
                                    Commencez la conversation en toute sécurité.
                                </div>
                            )}
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${m.sender_id === currentUserId ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none border border-gray-100 dark:border-gray-700'}`}>
                                        {m.content}
                                        <p className={`text-[9px] mt-1 opacity-50 ${m.sender_id === currentUserId ? 'text-right' : 'text-left'}`}>
                                            {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                            <Button variant="ghost" size="icon" className="shrink-0 text-gray-400"><Paperclip size={18} /></Button>
                            <Input
                                placeholder="Écrivez un message..."
                                className="bg-gray-50 border-none rounded-xl"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button type="submit" size="icon" className="shrink-0 bg-blue-600 rounded-xl">
                                <Send size={18} />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
