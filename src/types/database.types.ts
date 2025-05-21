export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          title: string
          created_at: string
          updated_at: string
          last_message: string | null
          last_message_time: string | null
          chat_type: 'direct' | 'group'
          is_demo: boolean
          is_internal: boolean
          is_signup: boolean
          is_content: boolean
          dont_send: boolean
        }
        Insert: {
          id?: string
          title: string
          created_at?: string
          updated_at?: string
          last_message?: string | null
          last_message_time?: string | null
          chat_type: 'direct' | 'group'
          is_demo?: boolean
          is_internal?: boolean
          is_signup?: boolean
          is_content?: boolean
          dont_send?: boolean
        }
        Update: {
          id?: string
          title?: string
          created_at?: string
          updated_at?: string
          last_message?: string | null
          last_message_time?: string | null
          chat_type?: 'direct' | 'group'
          is_demo?: boolean
          is_internal?: boolean
          is_signup?: boolean
          is_content?: boolean
          dont_send?: boolean
        }
      }
      chat_members: {
        Row: {
          id: string
          chat_id: string
          user_id: string
          created_at: string
          updated_at: string
          role: 'admin' | 'member'
        }
        Insert: {
          id?: string
          chat_id: string
          user_id: string
          created_at?: string
          updated_at?: string
          role?: 'admin' | 'member'
        }
        Update: {
          id?: string
          chat_id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          role?: 'admin' | 'member'
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
          is_read: boolean
          attachment_url: string | null
          attachment_type: 'image' | 'video' | 'file' | null
        }
        Insert: {
          id?: string
          chat_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
          is_read?: boolean
          attachment_url?: string | null
          attachment_type?: 'image' | 'video' | 'file' | null
        }
        Update: {
          id?: string
          chat_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
          is_read?: boolean
          attachment_url?: string | null
          attachment_type?: 'image' | 'video' | 'file' | null
        }
      }
      labels: {
        Row: {
          id: string
          name: string
          color: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          color: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_labels: {
        Row: {
          id: string
          chat_id: string
          label_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          label_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          label_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      filters: {
        Row: {
          id: string
          name: string
          criteria: Json
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          criteria: Json
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          criteria?: Json
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
