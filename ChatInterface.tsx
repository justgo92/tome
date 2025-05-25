'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type Sample = {
  id: string;
  title: string;
  type: string;
  description: string;
  thumbnail: string;
  preview_url: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m the TOME AI assistant. How can I help you learn about our AI-driven training asset creation service?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [samples, setSamples] = useState<Sample[] | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the FastAPI endpoint
      // For now, we'll simulate the API call with a timeout
      
      // Prepare the request payload
      const payload = {
        messages: [...messages, userMessage],
        show_samples: false,
        sample_type: null
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would be:
      // const response = await fetch('http://localhost:8001/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // const data = await response.json();
      
      // Simulate response based on user input
      const simulatedResponse = simulateResponse(userMessage.content);
      
      // Add assistant message to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: simulatedResponse.message.content 
      }]);
      
      // Set samples if any
      setSamples(simulatedResponse.samples);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to simulate API response
  const simulateResponse = (userMessage: string) => {
    const userMessageLower = userMessage.toLowerCase();
    let responseContent = '';
    let showSamples = false;
    let sampleType = null;
    
    // Simple response logic based on user input
    if (userMessageLower.includes('hello') || userMessageLower.includes('hi')) {
      responseContent = 'Hello! How can I help you learn about TOME\'s AI-driven training asset creation service?';
    } else if (userMessageLower.includes('pricing') || userMessageLower.includes('cost')) {
      responseContent = 'TOME uses a credit-based pricing model with packages starting at 50 credits per month. Different asset types require different credit amounts: e-learning modules (10 credits), videos (15 credits), process maps (8 credits), and job aids (5 credits).';
    } else if (userMessageLower.includes('how') && userMessageLower.includes('work')) {
      responseContent = 'TOME works in four simple steps: 1) Submit your document, 2) Specify audience and tone, 3) Review the preview within 72 hours, and 4) Launch by downloading the finished assets for your LMS or intranet.';
    } else if (userMessageLower.includes('example') || userMessageLower.includes('sample')) {
      responseContent = 'Here are some examples of our work. We create e-learning modules, avatar-based videos, interactive process maps, and PDF job aids.';
      showSamples = true;
      
      if (userMessageLower.includes('e-learning') || userMessageLower.includes('elearning')) {
        sampleType = 'e-learning';
      } else if (userMessageLower.includes('video')) {
        sampleType = 'video';
      } else if (userMessageLower.includes('process') || userMessageLower.includes('map')) {
        sampleType = 'process-map';
      } else if (userMessageLower.includes('job') || userMessageLower.includes('aid') || userMessageLower.includes('pdf')) {
        sampleType = 'job-aid';
      }
    } else {
      responseContent = 'TOME transforms standard operating procedures and documentation into engaging training assets in just 72 hours. Our AI-powered process, combined with human quality assurance, ensures accurate, compliant, and instructionally sound materials delivered at Silicon speed. How else can I help you?';
    }
    
    // Generate sample data if needed
    let sampleData = null;
    if (showSamples) {
      sampleData = [
        {
          id: 'elearning-sample-1',
          title: 'Customer Onboarding E-Learning Module',
          type: 'e-learning',
          description: 'Interactive module covering the customer onboarding process with knowledge checks and simulations.',
          thumbnail: 'https://placehold.co/300x200/e2e8f0/1e40af?text=E-Learning+Sample',
          preview_url: '#'
        },
        {
          id: 'video-sample-1',
          title: 'Compliance Training Video',
          type: 'video',
          description: 'Avatar-based explainer video for annual compliance training with engaging visuals.',
          thumbnail: 'https://placehold.co/300x200/fef2f2/dc2626?text=Video+Sample',
          preview_url: '#'
        },
        {
          id: 'process-map-sample-1',
          title: 'Product Development Process Map',
          type: 'process-map',
          description: 'Interactive visualization of the product development lifecycle with clickable stages.',
          thumbnail: 'https://placehold.co/300x200/ecfdf5/047857?text=Process+Map+Sample',
          preview_url: '#'
        },
        {
          id: 'job-aid-sample-1',
          title: 'Customer Service Quick Reference Guide',
          type: 'job-aid',
          description: 'Printable PDF with key procedures and troubleshooting steps for customer service representatives.',
          thumbnail: 'https://placehold.co/300x200/eff6ff/1d4ed8?text=Job+Aid+Sample',
          preview_url: '#'
        }
      ];
      
      // Filter by type if specified
      if (sampleType) {
        sampleData = sampleData.filter(sample => sample.type === sampleType);
      }
    }
    
    return {
      message: { role: 'assistant', content: responseContent },
      samples: sampleData
    };
  };
  
  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-indigo-600 text-white px-4 py-3 flex items-center">
        <div className="h-8 w-8 rounded-full bg-white text-indigo-600 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium">TOME Assistant</h3>
          <p className="text-xs text-indigo-100">Ask about our services, pricing, or see examples</p>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-4">
            <div className="inline-block rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Sample works display */}
        {samples && samples.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Sample Works:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {samples.map((sample) => (
                <a 
                  key={sample.id}
                  href={sample.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="h-32 bg-gray-200 overflow-hidden">
                    <img 
                      src={sample.thumbnail} 
                      alt={sample.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm text-gray-900 truncate">{sample.title}</h5>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        {sample.type}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{sample.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about TOME services, pricing, or examples..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`rounded-full p-2 ${
              isLoading || !input.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Ask about our services, pricing, or type "examples" to see sample work
        </div>
      </div>
    </div>
  );
}
