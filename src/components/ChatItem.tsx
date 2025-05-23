'use client';

import { format } from 'date-fns';
import { Chat } from '@/types';
import { FiPhone, FiAlertCircle, FiCheck, FiVolume2, FiMic, FiCheckCircle } from 'react-icons/fi';

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export default function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  // Format the date to show in the format shown in the design
  const formattedDate = chat.last_message_time 
    ? format(new Date(chat.last_message_time), 'dd-MMM-yy')
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
  
  // Use a fixed phone number for demo purposes to avoid hydration errors
  const phoneNumber = "+91 94422 63231";
  
  // Use a fixed message for demo purposes to avoid hydration errors
  const defaultMessage = chat.id === '1' ? "Hello, South Euna!" :
                        chat.id === '2' ? "This doesn't go on Tuesday..." :
                        chat.id === '3' ? "Test message" :
                        chat.id === '4' ? "Hi there, I'm Swapnika, Co-Founder of..." :
                        chat.id === '5' ? "123" :
                        chat.id === '6' ? "Testing 12345" :
                        chat.id === '7' ? "First Bulk Message" :
                        chat.id === '8' ? "Heyy" :
                        chat.id === '9' ? "test 123" :
                        "test 123";
  
  const lastMessage = chat.last_message || defaultMessage;
  
  // Use a fixed time for demo purposes to avoid hydration errors
  const messageTime = "09:49";
  
  return (
    <div 
      className={`py-3 px-3 border-b border-gray-100 cursor-pointer ${isSelected ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
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
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900 text-sm truncate">{chat.title}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              {formattedDate}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-1 mb-1">
            {chat.is_demo && (
              <span className="text-xs px-1.5 py-0.5 rounded-sm bg-gray-100 text-gray-600">
                Demo
              </span>
            )}
            
            {chat.is_internal && (
              <span className="text-xs px-1.5 py-0.5 rounded-sm bg-green-50 text-green-700">
                Internal
              </span>
            )}
            
            {chat.is_signup && (
              <span className="text-xs px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-700">
                Signup
              </span>
            )}
            
            {chat.is_content && (
              <span className="text-xs px-1.5 py-0.5 rounded-sm bg-orange-50 text-orange-700">
                Content
              </span>
            )}
            
            {chat.dont_send && (
              <span className="text-xs px-1.5 py-0.5 rounded-sm bg-red-50 text-red-700">
                Dont Send
              </span>
            )}
            
            {chat.chat_type === 'group' && (
              <span className="text-xs text-gray-400">+3</span>
            )}
          </div>
          
          <div className="flex items-start">
            <p className="text-xs text-gray-500 truncate flex-1">
              {chat.last_message_read ? (
                <span className="flex items-center gap-0.5">
                  <FiCheck size={10} className="text-gray-400" />
                  {lastMessage}
                </span>
              ) : (
                lastMessage
              )}
            </p>
            
            {messageTime && (
              <span className="text-xs text-gray-400 ml-2">{messageTime}</span>
            )}
          </div>
          
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <span className="flex items-center gap-0.5">
              <FiPhone size={10} />
              <span>{phoneNumber}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
