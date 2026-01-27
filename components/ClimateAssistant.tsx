
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, RotateCcw } from 'lucide-react';
import { generateClimateAdvice } from '../services/geminiService';
import { Message } from '../types';

const STORAGE_KEY = 'fourci_chat_history';

const ClimateAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: 'Hello! I am your FOURCi Climate Assistant. How can I help you understand climate resilience today?' }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20))); // Keep last 20
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const clearChat = () => {
    const defaultMsg = [{ role: 'model', text: 'Hello again! How can I assist you with climate action today?' }];
    setMessages(defaultMsg as Message[]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMessage: Message = { role: 'user', text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateClimateAdvice(userText, messages);
      const aiMessage: Message = { role: 'model', text: responseText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'model', text: "I encountered an error. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all hover:scale-110 flex items-center justify-center animate-bounce focus-visible:ring-offset-2"
          aria-label="Open Climate Assistant"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div 
          ref={chatWindowRef}
          role="dialog" 
          className="bg-white rounded-2xl shadow-2xl w-[calc(100vw-32px)] sm:w-[400px] h-[85vh] sm:h-[550px] flex flex-col overflow-hidden border border-gray-100 animate-scaleUp"
        >
          {/* Header */}
          <div className="bg-green-600 p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <div>
                <h2 className="font-bold text-sm">FOURCi Assistant</h2>
                <span className="text-[10px] text-green-200 uppercase font-bold tracking-widest">Always Active</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={clearChat}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
                title="Clear History"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-200 shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 p-3 rounded-2xl border border-gray-200 flex items-center space-x-2 text-xs italic">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Researching...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about local climate action..."
                className="flex-grow border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-green-600 text-white p-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
      <style>{`
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ClimateAssistant;
