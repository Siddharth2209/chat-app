'use client';

import { useState, useEffect, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Chat, User, Message } from '@/types';
import MessageItem from './MessageItem';
import { 
  FiRefreshCw, 
  FiHelpCircle, 
  FiMoreHorizontal, 
  FiPhone,
  FiVideo,
  FiSearch,
  FiMaximize2,
  FiMenu,
  FiDownload,
  FiArrowDown,
  FiChevronDown,
  FiPaperclip,
  FiSmile,
  FiClock,
  FiSend,
  FiImage,
  FiMic,
  FiLink2,
  FiCornerUpRight,
  FiChevronUp,
  FiShare
} from 'react-icons/fi';
import { format } from 'date-fns';

interface ChatDetailProps {
  chat: Chat;
  user: User | null;
}

export default function ChatDetail({ chat, user }: ChatDetailProps) {
  const [messages, setMessages] = useState<(Message & {
    profiles?: {
      full_name: string;
      avatar_url: string | null;
    };
  })[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'private'>('whatsapp');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            profiles:user_id(full_name, avatar_url)
          `)
          .eq('chat_id', chat.id)
          .order('created_at', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
    
    // Subscribe to new messages
    const messagesSubscription = supabase
      .channel(`chat:${chat.id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_id=eq.${chat.id}`
      }, (payload) => {
        // Fetch the user details for the new message
        const fetchMessageWithUser = async () => {
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', payload.new.user_id)
            .single();
            
          if (error) {
            console.error('Error fetching user for new message:', error);
            return;
          }
          
          const newMessage: Message & {
            profiles?: {
              full_name: string;
              avatar_url: string | null;
            };
          } = {
            ...payload.new as Message,
            profiles: data
          };
          
          setMessages(prev => [...prev, newMessage]);
        };
        
        fetchMessageWithUser();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, [chat.id, supabase]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (content: string) => {
    if (!user || !content.trim()) return;
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chat.id,
            user_id: user.id,
            content,
            is_read: false
          }
        ]);
        
      if (error) {
        throw error;
      }
      
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  // Use a fixed phone number for demo purposes to avoid hydration errors
  const phoneNumber = "+91 94422 63231";
  
  // Use a fixed date for demo purposes to avoid hydration errors
  const demoDate = "23-01-2025";
  
  // Generate demo messages
  const getDemoMessages = () => {
    if (messages.length > 0) return messages;
    
    return [
      {
        id: "1",
        chat_id: chat.id,
        user_id: "other",
        content: "Hello, South Euna!",
        created_at: "2025-01-23T08:01:00.000Z",
        updated_at: "2025-01-23T08:01:00.000Z",
        is_read: true,
        profiles: {
          full_name: "Roshnaq Airtel",
          avatar_url: null
        }
      },
      {
        id: "2",
        chat_id: chat.id,
        user_id: "other",
        content: "CDERT",
        created_at: "2025-01-23T08:01:00.000Z",
        updated_at: "2025-01-23T08:01:00.000Z",
        is_read: true,
        profiles: {
          full_name: "Roshnaq Airtel",
          avatar_url: null
        }
      },
      {
        id: "3",
        chat_id: chat.id,
        user_id: user?.id || "self",
        content: "Hello, Livonia!",
        created_at: "2025-01-23T08:01:00.000Z",
        updated_at: "2025-01-23T08:01:00.000Z",
        is_read: true
      },
      {
        id: "4",
        chat_id: chat.id,
        user_id: user?.id || "self",
        content: "test el centro",
        created_at: "2025-01-23T08:01:00.000Z",
        updated_at: "2025-01-23T08:01:00.000Z",
        is_read: true
      },
      {
        id: "5",
        chat_id: chat.id,
        user_id: user?.id || "self",
        content: "testing",
        created_at: "2025-01-23T08:01:00.000Z",
        updated_at: "2025-01-23T08:01:00.000Z",
        is_read: true
      }
    ] as (Message & {
      profiles?: {
        full_name: string;
        avatar_url: string | null;
      };
    })[];
  };
  
  const demoMessages = getDemoMessages();
  
  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
            {chat.title.charAt(0)}
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{chat.title}</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="flex items-center gap-0.5">
                <span>Roshnaq Airtel, Roshnaq Jio, Bharat Kumar Ramesh, Periskope</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-600">
            <FiRefreshCw size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <FiHelpCircle size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <FiShare size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : demoMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No messages yet
          </div>
        ) : (
          <div className="space-y-3">
            {/* Date separator */}
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {demoDate}
              </div>
            </div>
            
            {demoMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isOwnMessage={message.user_id === user?.id || message.user_id === "self"}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 p-3">
        <div className="flex mb-2">
          <button 
            className={`px-3 py-1 text-sm rounded-t-md ${activeTab === 'whatsapp' ? 'bg-green-50 text-green-600 border-t border-l border-r border-green-200' : 'text-gray-500'}`}
            onClick={() => setActiveTab('whatsapp')}
          >
            WhatsApp
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-t-md ${activeTab === 'private' ? 'bg-gray-50 text-gray-600 border-t border-l border-r border-gray-200' : 'text-gray-500'}`}
            onClick={() => setActiveTab('private')}
          >
            Private Note
          </button>
        </div>
        
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md p-2">
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 outline-none text-sm"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(messageText);
              }
            }}
          />
          
          <div className="flex items-center gap-2 text-gray-400">
            <button className="hover:text-gray-600">
              <FiPaperclip size={18} />
            </button>
            <button className="hover:text-gray-600">
              <FiSmile size={18} />
            </button>
            <button className="hover:text-gray-600">
              <FiImage size={18} />
            </button>
            <button className="hover:text-gray-600">
              <FiMic size={18} />
            </button>
            <button 
              className={`p-1.5 rounded-full ${messageText.trim() ? 'bg-green-500 text-white' : 'text-gray-400'}`}
              onClick={() => handleSendMessage(messageText)}
              disabled={!messageText.trim()}
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
