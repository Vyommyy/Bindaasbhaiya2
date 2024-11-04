import React from 'react';
import { Plus, MessageSquare, Trash2, Edit } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onEditConversation: (id: string) => void;
}

export default function ChatSidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onEditConversation
}: ChatSidebarProps) {
  return (
    <div className="hidden md:flex flex-col w-80 bg-[#0A0F1C] border-r border-white/10">
      <button 
        onClick={onNewChat}
        className="flex items-center space-x-2 m-3 p-3 bg-[#1E1E1E] hover:bg-white/5 rounded-lg transition-colors text-white group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Plus className="w-5 h-5" />
        <span>New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`w-full p-3 rounded-lg transition-all duration-200 group relative ${
              activeConversationId === conversation.id
                ? 'bg-white/10'
                : 'hover:bg-white/5'
            }`}
          >
            <div 
              onClick={() => onSelectConversation(conversation.id)}
              className="cursor-pointer"
            >
              <div className="flex items-center space-x-3 mb-1">
                <MessageSquare className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <span className="text-sm font-medium text-gray-200 truncate pr-16">
                  {conversation.title}
                </span>
              </div>
              
              <p className="text-xs text-gray-500 truncate">
                {conversation.preview}
              </p>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditConversation(conversation.id);
                }}
                className="p-1 hover:bg-white/10 rounded-md"
                title="Edit title"
              >
                <Edit className="w-4 h-4 text-gray-400 hover:text-blue-400" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                className="p-1 hover:bg-white/10 rounded-md"
                title="Delete conversation"
              >
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        ))}

        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  );
}