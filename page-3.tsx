'use client';

import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Chat with TOME Assistant
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Ask questions, see examples, and learn how we transform SOPs into training assets
          </p>
        </div>
        
        <div className="mt-10">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
