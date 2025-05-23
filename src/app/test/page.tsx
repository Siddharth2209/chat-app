'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatDetail from '@/components/ChatDetail';
import { Chat, User } from '@/types';

export default function TestPage() {
  // Mock user data
  const mockUser: User = {
    id: 'test-user-id',
    full_name: 'Test User',
    email: 'test@example.com',
    created_at: "2025-01-23T08:01:00.000Z",
    updated_at: "2025-01-23T08:01:00.000Z"
  };

  // Mock chat data
  const mockChats: Chat[] = [
    {
      id: '1',
      title: 'Test El Centro',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'group',
      is_demo: true,
      last_message: 'Hello, South Euna!',
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '2',
      title: 'Test Skope Final 5',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'direct',
      is_demo: true,
      last_message: "This doesn't go on Tuesday...",
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '3',
      title: 'Periskope Team Chat',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'group',
      is_internal: true,
      last_message: 'Test message',
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '4',
      title: '+91 99999 99999',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'direct',
      is_signup: true,
      last_message: "Hi there, I'm Swapnika, Co-Founder of...",
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '5',
      title: 'Test Demo17',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'direct',
      is_content: true,
      is_demo: true,
      last_message: '123',
      last_message_time: "2025-01-23T08:01:00.000Z"
    }
  ];

  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [filtered, setFiltered] = useState(false);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleFilterToggle = () => {
    setFiltered(!filtered);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 border-r border-gray-200">
          <ChatList 
            chats={mockChats} 
            selectedChat={selectedChat} 
            onChatSelect={handleChatSelect} 
            filtered={filtered}
            onFilterToggle={handleFilterToggle}
            user={mockUser}
          />
        </div>
        <div className="flex-1">
          <ChatDetail chat={selectedChat} user={mockUser} />
        </div>
      </div>
    </div>
  );
}
