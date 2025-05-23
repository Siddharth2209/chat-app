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
  // Use a fixed time for demo purposes to avoid hydration errors
  const formattedTime = "09:49";
  
  // For demo purposes, let's generate a sender name if it's not the user's message
  const senderName = !isOwnMessage ? (message.profiles?.full_name || 'Roshnaq Airtel') : 'Periskope';
  
  // Use a fixed email for demo purposes to avoid hydration errors
  const email = "bharat@hashladka.dev";
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isOwnMessage && (
        <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 text-xs font-medium mr-2 self-end mb-1">
          {senderName.charAt(0)}
        </div>
      )}
      
      <div className="max-w-[70%]">
        {!isOwnMessage && (
          <div className="text-xs font-medium text-green-600 mb-1 ml-1">
            {senderName}
          </div>
        )}
        
        <div 
          className={`${
            isOwnMessage 
              ? 'bg-green-50 text-gray-800 border border-green-100' 
              : 'bg-white text-gray-800 border border-gray-100'
          } py-2 px-3 rounded-md text-sm`}
        >
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        </div>
        
        <div className={`flex items-center ${isOwnMessage ? 'justify-end' : 'justify-start'} gap-1 mt-1`}>
          {isOwnMessage && (
            <>
              <span className="text-xs text-green-600">Periskope</span>
              <span className="text-[10px] text-gray-400">+{email}</span>
            </>
          )}
          
          <span className="text-[10px] text-gray-400 ml-auto">{formattedTime}</span>
          
          {isOwnMessage && (
            <span className="text-green-500">
              <FiCheck size={12} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
