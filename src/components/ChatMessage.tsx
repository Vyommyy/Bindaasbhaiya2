import React from 'react';
import { User, Copy, RefreshCw, MoreVertical } from 'lucide-react';
import Logo from './Logo';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'bot';
  onRedefine?: () => void;
  onCopy?: () => void;
}

export default function ChatMessage({ content, sender, onRedefine, onCopy }: ChatMessageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    onCopy?.();
  };

  return (
    <div className={`flex items-start space-x-4 ${
      sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
    } animate-fade-in`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        sender === 'user' ? 'bg-blue-600' : 'bg-teal-600'
      }`}>
        {sender === 'user' ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Logo className="w-5 h-5" />
        )}
      </div>
      
      <div className={`relative group max-w-[80%] ${
        sender === 'user' ? 'ml-12' : 'mr-12'
      }`}>
        <div className={`p-4 rounded-2xl glass-effect ${
          sender === 'user' 
            ? 'bg-blue-600/90 text-white' 
            : 'bg-teal-600/10 text-white'
        } shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
          <p className="text-base whitespace-pre-wrap">{content}</p>
        </div>
        
        <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2 text-xs text-gray-400">
          {sender === 'bot' && (
            <>
              <button 
                onClick={handleCopy}
                className="flex items-center space-x-1 hover:text-teal-400"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
              <span>•</span>
              <button 
                onClick={onRedefine}
                className="flex items-center space-x-1 hover:text-teal-400"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Redefine</span>
              </button>
              <span>•</span>
              <button className="hover:text-teal-400">
                <MoreVertical className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}