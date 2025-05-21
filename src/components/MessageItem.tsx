'use client';

import { format } from 'date-fns';
import { Message } from '@/types';
import { FiCheck, FiCheckCircle, FiClock } from 'react-icons/fi';

interface MessageItemProps {
  message: Message & {
    profiles?: {
      full_name: string;
      avatar_url: string | null;
    };
  };
  isOwnMessage: boolean;
}

export default function MessageItem({ message, isOwnMessage }: MessageItemProps) {
  const formattedTime = format(new Date(message.created_at), 'HH:mm');
  
  // For demo purposes, let's generate a sender name if it's not the user's message
  const senderName = !isOwnMessage ? (message.profiles?.full_name || 'Roshnaq Artel') : '';
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
      {!isOwnMessage && (
        <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 text-xs font-medium mr-2 self-end mb-1">
          {senderName.charAt(0)}
        </div>
      )}
      
      <div 
        className={`max-w-[70%] ${
          isOwnMessage 
            ? 'bg-green-50 text-gray-800 border border-green-100' 
            : 'bg-white text-gray-800 border border-gray-100'
        } py-1.5 px-2 rounded-md text-sm`}
      >
        {!isOwnMessage && (
          <div className="text-xs font-medium text-green-600 mb-0.5">
            {senderName}
          </div>
        )}
        
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        
        <div className="flex items-center justify-end gap-0.5 mt-0.5">
          <span className="text-[10px] text-gray-400">{formattedTime}</span>
          
          {isOwnMessage && (
            <span className="text-green-500">
              <FiCheck size={10} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
