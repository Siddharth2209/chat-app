'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatDetail from '@/components/ChatDetail';
import { Chat, User } from '@/types';

export default function TestChatPage() {
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
    },
    {
      id: '6',
      title: 'Testing group',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'group',
      is_demo: true,
      last_message: 'Testing 12345',
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '7',
      title: 'Yasin 3',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'direct',
      is_demo: true,
      dont_send: true,
      last_message: 'First Bulk Message',
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '8',
      title: 'Test Skope Final 9473',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'direct',
      is_demo: true,
      last_message: 'Heyy',
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '9',
      title: 'Skope Demo',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'direct',
      is_demo: true,
      last_message: 'test 123',
      last_message_time: "2025-01-23T08:01:00.000Z"
    },
    {
      id: '10',
      title: 'Test Demo15',
      created_at: "2025-01-23T08:01:00.000Z",
      updated_at: "2025-01-23T08:01:00.000Z",
      chat_type: 'direct',
      is_demo: true,
      last_message: 'test 123',
      last_message_time: "2025-01-23T08:01:00.000Z"
    }
  ];

  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [filtered, setFiltered] = useState(false);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleFilterToggle = () => {
    setFiltered(!filtered);
  };

  // Force the selected chat to be the first chat for testing
  const forcedSelectedChat = mockChats[0];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 border-r border-gray-200">
          <ChatList 
            chats={mockChats} 
            selectedChat={forcedSelectedChat} 
            onChatSelect={handleChatSelect} 
            filtered={filtered}
            onFilterToggle={handleFilterToggle}
            user={mockUser}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <ChatDetail chat={forcedSelectedChat} user={mockUser} />
        </div>
      </div>
    </div>
  );
}
