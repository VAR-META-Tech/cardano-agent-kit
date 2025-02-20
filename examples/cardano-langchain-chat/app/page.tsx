/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Chatbox() {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom when a new message is added
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages: { text: string; sender: 'user' | 'ai' }[] = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            setMessages([...newMessages, { text: data.reply, sender: 'ai' }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
        setLoading(false);
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Chat with AI 🤖</h1>
            <div className="w-full flex flex-col h-[85vh] bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Chat Messages */}
                <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-3 rounded-xl shadow-md w-auto max-w-[75%] break-words ${
                                msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black'
                            }`}
                        >
                            {msg.text}
                        </motion.div>
                    ))}
                </div>

                {/* Input Field */}
                <form onSubmit={sendMessage} className="flex items-center p-4 border-t bg-white">
                    <input
                        type="text"
                        className="flex-grow text-black border p-3 rounded-l-lg focus:outline-none"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? '...' : 'Send'}
                    </button>
                </form>
            </div>
        </main>
    );
}
