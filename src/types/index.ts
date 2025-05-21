export interface User {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
  last_message_time?: string;
  chat_type: 'direct' | 'group';
  is_demo?: boolean;
  is_internal?: boolean;
  is_signup?: boolean;
  is_content?: boolean;
  dont_send?: boolean;
  unread_count?: number;
}

export interface ChatMember {
  id: string;
  chat_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  role?: 'admin' | 'member';
}

export interface Message {
  id: string;
  chat_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_read: boolean;
  attachment_url?: string;
  attachment_type?: 'image' | 'video' | 'file';
}

export interface Label {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface ChatLabel {
  id: string;
  chat_id: string;
  label_id: string;
  created_at: string;
  updated_at: string;
}

export interface Filter {
  id: string;
  name: string;
  criteria: Record<string, any>;
  user_id: string;
  created_at: string;
  updated_at: string;
}
