# Chat Application

A modern chat application built with Next.js, Supabase, and Tailwind CSS.

## Features

- User authentication and profile management
- Real-time messaging
- Chat creation and management
- Modern UI design
- WhatsApp-style interface
- Mobile-responsive design

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Real-time subscriptions)
- **State Management**: React Hooks
- **Styling**: Tailwind CSS, React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The application uses the following tables in Supabase:
- profiles: User profiles
- chats: Chat rooms
- chat_members: Relationship between users and chats
- messages: Chat messages
- labels: Chat labels
- chat_labels: Relationship between chats and labels
- filters: User-defined filters

## License

MIT
