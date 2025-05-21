'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatDetail from '@/components/ChatDetail';
import { Chat, User } from '@/types';

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError.message || 'Unknown error', profileError);
          
          // Check if the profile doesn't exist and create it
          if (profileError.code === 'PGRST116') { // PostgreSQL error for "no rows returned"
            try {
              // Create a profile for the user
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert({
                  id: session.user.id,
                  full_name: session.user.user_metadata?.full_name || 'User',
                  email: session.user.email || '',
                })
                .select()
                .single();
                
              if (createError) {
                console.error('Error creating profile:', createError);
                return;
              }
              
              setUser(newProfile);
            } catch (createProfileError) {
              console.error('Error in profile creation:', createProfileError);
              return;
            }
          } else {
            // For other errors, return early
            return;
          }
        } else {
          setUser(profile);
        }

        // Get user's chats
        const { data: userChats, error: chatsError } = await supabase
          .from('chats')
          .select(`
            *,
            chat_members!inner(user_id)
          `)
          .eq('chat_members.user_id', session.user.id)
          .order('updated_at', { ascending: false });

        if (chatsError) {
          console.error('Error fetching chats:', chatsError);
          return;
        }

        setChats(userChats);
        
        // Set first chat as selected if available
        if (userChats.length > 0 && !selectedChat) {
          setSelectedChat(userChats[0]);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up real-time subscription for new messages
    const messagesSubscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, (payload) => {
        // Refresh chats when a new message is received
        checkUser();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, [router, supabase]);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleFilterToggle = () => {
    setFiltered(!filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">
        <ChatList 
          chats={chats} 
          selectedChat={selectedChat} 
          onChatSelect={handleChatSelect} 
          filtered={filtered}
          onFilterToggle={handleFilterToggle}
          user={user}
        />
        {selectedChat ? (
          <ChatDetail chat={selectedChat} user={user} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <p className="text-gray-500 text-sm">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
