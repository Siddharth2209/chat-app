'use client';

import ChatDetail from '@/components/ChatDetail';
import { Chat, User } from '@/types';

export default function TestDetailPage() {
  // Mock user data
  const mockUser: User = {
    id: 'test-user-id',
    full_name: 'Test User',
    email: 'test@example.com',
    created_at: "2025-01-23T08:01:00.000Z",
    updated_at: "2025-01-23T08:01:00.000Z"
  };

  // Mock chat data
  const mockChat: Chat = {
    id: '1',
    title: 'Test El Centro',
    created_at: "2025-01-23T08:01:00.000Z",
    updated_at: "2025-01-23T08:01:00.000Z",
    chat_type: 'group',
    is_demo: true,
    last_message: 'Hello, South Euna!',
    last_message_time: "2025-01-23T08:01:00.000Z"
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1">
        <ChatDetail chat={mockChat} user={mockUser} />
      </div>
    </div>
  );
}
