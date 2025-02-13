/** @format */
'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
    const { messages, input, handleInputChange, handleSubmit, error } = useChat();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 flex flex-col h-[90vh]">
                {' '}
                {/* Full height */}
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">AI Chat Assistant</h1>
                {/* Chat Messages Container */}
                <div className="flex-1 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`p-3 my-2 rounded-lg max-w-[80%] ${
                                message.role === 'user'
                                    ? 'bg-blue-500 text-white self-end ml-auto'
                                    : 'bg-gray-200 text-gray-800 self-start'
                            }`}
                        >
                            <strong>{message.role === 'user' ? 'You' : 'AI'}</strong>: {message.content}
                        </div>
                    ))}
                </div>
                {/* Error Display */}
                {error && <div className="text-red-500 text-sm mb-2">Error: {error.message}</div>}
                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <input
                        name="prompt"
                        value={input}
                        onChange={handleInputChange}
                        className="flex-1 p-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
