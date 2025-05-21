'use client';

import { format } from 'date-fns';
import { Chat } from '@/types';
import { FiPhone, FiAlertCircle, FiCheck, FiVolume2, FiMic } from 'react-icons/fi';

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export default function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  // Format the date to show in the format shown in the design
  const formattedDate = chat.last_message_time 
    ? format(new Date(chat.last_message_time), 'HH:mm')
    : '';
  
  // Format the date for the timestamp below the chat
  const formattedTimestamp = chat.last_message_time
    ? format(new Date(chat.last_message_time), 'dd-MM-yyyy')
    : '';
  
  // Determine the badge type based on chat properties
  const getBadgeType = () => {
    if (chat.is_demo) return 'Demo';
    if (chat.is_internal) return 'Internal';
    if (chat.is_signup) return 'Signup';
    if (chat.is_content) return 'Content';
    if (chat.dont_send) return 'Dont Send';
    return null;
  };
  
  const badgeType = getBadgeType();
  
  // Generate a random phone number for demo purposes
  const phoneNumber = `+91 ${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)}`;
  
  return (
    <div 
      className={`py-2 px-3 border-b border-gray-100 cursor-pointer ${isSelected ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 text-sm font-medium overflow-hidden">
            {chat.title.charAt(0)}
          </div>
          {chat.unread_count && chat.unread_count > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
              {chat.unread_count}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 text-sm truncate">{chat.title}</h3>
            <div className="flex items-center gap-1">
              {formattedDate && (
                <span className="text-xs text-gray-400">{formattedDate}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 mt-0.5">
            {badgeType && (
              <span className={`text-xs px-1 py-0.5 rounded-sm ${
                badgeType === 'Demo' ? 'bg-gray-100 text-gray-600' :
                badgeType === 'Internal' ? 'bg-green-50 text-green-700' :
                badgeType === 'Signup' ? 'bg-blue-50 text-blue-700' :
                badgeType === 'Content' ? 'bg-orange-50 text-orange-700' :
                'bg-red-50 text-red-700'
              }`}>
                {badgeType}
              </span>
            )}
            
            {chat.dont_send && (
              <span className="text-xs px-1 py-0.5 rounded-sm bg-red-50 text-red-700">
                Dont Send
              </span>
            )}
          </div>
          
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {chat.last_message || 'No messages yet'}
          </p>
          
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
            <span className="flex items-center gap-0.5">
              <FiPhone size={10} />
              <span>{phoneNumber}</span>
            </span>
            
            {chat.chat_type === 'group' && (
              <span className="ml-1 text-xs text-gray-400">+3</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
