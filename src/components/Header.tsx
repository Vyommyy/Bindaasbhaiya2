import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="h-16 bg-background border-b border-white/10 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
            <div className="relative flex items-center bg-background rounded-full p-1">
              <Logo className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent flex items-center space-x-2">
            BindaasBhaiya
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
            <span>Features</span>
            <div className="h-1 w-0 group-hover:w-full bg-blue-400 transition-all duration-300"></div>
          </a>
          <a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
            <span>About</span>
            <div className="h-1 w-0 group-hover:w-full bg-blue-400 transition-all duration-300"></div>
          </a>
          <a href="#faq" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2 group">
            <span>FAQ</span>
            <div className="h-1 w-0 group-hover:w-full bg-blue-400 transition-all duration-300"></div>
          </a>
        </nav>

        <button className="md:hidden relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-2 bg-background rounded-lg">
            <Menu className="w-5 h-5 text-blue-400" />
          </div>
        </button>
      </div>
    </header>
  );
}