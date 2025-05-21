'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { 
  FiPaperclip, 
  FiSmile, 
  FiSend, 
  FiClock, 
  FiImage, 
  FiMic 
} from 'react-icons/fi';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Focus the input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Message..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-700">
              <FiPaperclip size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FiSmile size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FiClock size={20} />
            </button>
          </div>
        </div>
        
        <button
          className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleSend}
        >
          <FiSend size={20} />
        </button>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <FiImage size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FiMic size={20} />
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          <span className="font-medium">Periskope</span>
        </div>
      </div>
    </div>
  );
}
