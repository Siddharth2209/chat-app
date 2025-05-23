'use client';

import { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiSave, 
  FiPhone, 
  FiCheck, 
  FiAlertCircle,
  FiPlus,
  FiX,
  FiUsers,
  FiRefreshCw,
  FiMessageCircle,
  FiStar,
  FiHelpCircle,
  FiChevronDown,
  FiShare
} from 'react-icons/fi';
import { Chat, User } from '@/types';
import ChatItem from './ChatItem';
import { createBrowserClient } from '@supabase/ssr';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  filtered: boolean;
  onFilterToggle: () => void;
  user: User | null;
}

export default function ChatList({ 
  chats, 
  selectedChat, 
  onChatSelect, 
  filtered, 
  onFilterToggle,
  user
}: ChatListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [chatType, setChatType] = useState<'direct' | 'group'>('direct');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  const filteredChats = chats.filter(chat => {
    if (!searchTerm) return true;
    return chat.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleCreateChat = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (!newChatTitle.trim()) {
      setError('Please enter a chat title');
      return;
    }
    
    setIsCreating(true);
    setError(null);
    
    try {
      // 1. Create a new chat
      const { data: chatData, error: chatError } = await supabase
        .from('chats')
        .insert({
          title: newChatTitle.trim(),
          chat_type: chatType,
        })
        .select()
        .single();
      
      if (chatError) throw chatError;
      
      // 2. Add the current user as a member (admin)
      const { error: memberError } = await supabase
        .from('chat_members')
        .insert({
          chat_id: chatData.id,
          user_id: user.id,
          role: 'admin'
        });
      
      if (memberError) throw memberError;
      
      // Close modal and reset form
      setIsModalOpen(false);
      setNewChatTitle('');
      setChatType('direct');
      
      // The real-time subscription in the chat page will handle updating the chat list
      
    } catch (error: any) {
      setError(error.message || 'Failed to create chat');
      console.error('Error creating chat:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-96 border-r border-gray-200 flex flex-col">
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <FiMessageCircle className="text-gray-400" />
            <span className="text-sm font-medium">chats</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-700">
              <FiRefreshCw size={16} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FiHelpCircle size={16} />
            </button>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FiStar className="text-yellow-400" size={16} />
              <span>5 / 6 phones</span>
              <FiChevronDown size={14} className="text-gray-400" />
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <FiShare size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <button className="flex items-center gap-1 px-2 py-1 rounded text-xs border border-green-500 text-green-600 bg-white">
            <span className="flex items-center gap-1">
              <FiFilter size={12} />
              Custom filter
            </span>
          </button>
          
          <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600">
            Save
          </button>
          
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-7 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
          </div>
          
          <button 
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${filtered ? 'bg-green-100 text-green-800 border border-green-500' : 'text-gray-600'}`}
            onClick={onFilterToggle}
          >
            <FiFilter size={12} />
            <span>Filtered</span>
            {filtered && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-white">
        {filteredChats.map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isSelected={selectedChat?.id === chat.id}
            onClick={() => onChatSelect(chat)}
          />
        ))}
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors fixed bottom-5 right-5 shadow-lg"
        >
          <FiPlus size={20} />
        </button>
      </div>
      
      {/* New Chat Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create New Chat</h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setNewChatTitle('');
                  setError(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleCreateChat}>
              <div className="mb-4">
                <label htmlFor="chat-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Chat Title
                </label>
                <input
                  id="chat-title"
                  type="text"
                  value={newChatTitle}
                  onChange={(e) => setNewChatTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter chat title"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chat Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="chat-type"
                      value="direct"
                      checked={chatType === 'direct'}
                      onChange={() => setChatType('direct')}
                      className="mr-2"
                    />
                    <span>Direct</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="chat-type"
                      value="group"
                      checked={chatType === 'group'}
                      onChange={() => setChatType('group')}
                      className="mr-2"
                    />
                    <span>Group</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewChatTitle('');
                    setError(null);
                  }}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Chat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
