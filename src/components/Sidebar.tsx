'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { 
  FiHome, 
  FiMessageSquare, 
  FiSettings, 
  FiBarChart2, 
  FiUsers, 
  FiLogOut,
  FiMenu,
  FiList,
  FiFileText,
  FiCpu,
  FiGrid
} from 'react-icons/fi';

export default function Sidebar() {
  const router = useRouter();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <aside className="bg-white border-r border-gray-200 flex flex-col w-16">
      <div className="p-3 flex justify-center border-b border-gray-100">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          P
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col items-center gap-5 py-5">
        <Link href="/chat" className="text-gray-400 hover:text-green-500 p-2">
          <FiHome size={20} />
        </Link>
        <Link href="/chat" className="text-green-500 p-2 bg-green-50 rounded-md">
          <FiMessageSquare size={20} />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-green-500 p-2">
          <FiList size={20} />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-green-500 p-2">
          <FiBarChart2 size={20} />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-green-500 p-2">
          <FiFileText size={20} />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-green-500 p-2">
          <FiUsers size={20} />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-green-500 p-2">
          <FiGrid size={20} />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-green-500 p-2">
          <FiCpu size={20} />
        </Link>
      </nav>
      
      <div className="p-4 flex justify-center border-t border-gray-100">
        <button 
          onClick={handleSignOut}
          className="text-gray-400 hover:text-red-500 p-2"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </aside>
  );
}
