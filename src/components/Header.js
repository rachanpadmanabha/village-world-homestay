import React, { useState } from 'react';
import { Menu, Sun, Moon, ChevronDown } from 'lucide-react';
import { scrollToId } from '../utils';

function NavItem({ to, children }) {
  return (
    <button onClick={() => scrollToId(to)} className="nav-link text-sm font-medium px-3 py-2 focus:outline-none">
      {children}
    </button>
  );
}

export default function Header({ dark, setDark, scrolled }) {
  const [open, setOpen] = useState(false);
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'header-scrolled bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition-transform duration-300">
            <span className="font-display text-lg">VW</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-bold leading-none bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">Village World Homestay</h1>
            <p className="font-body text-xs mt-1 text-neutral-500 dark:text-neutral-400 font-medium">Luxury homestay in Coorg</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavItem to="highlights">Home</NavItem>
          <NavItem to="about">About</NavItem>
          <NavItem to="rooms">Rooms</NavItem>
          <NavItem to="gallery">Gallery</NavItem>
          <NavItem to="activities">Activities</NavItem>
          <NavItem to="contact">Contact</NavItem>
          <button onClick={() => scrollToId('contact')} className="btn-premium font-body text-sm">
            Contact Me
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDark(d => !d)} 
            className="p-3 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 border border-purple-200 dark:border-slate-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {dark ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-amber-600" />}
          </button>
          <button 
            className="md:hidden p-3 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 hover:scale-105 transition-all duration-300" 
            onClick={() => setOpen(o => !o)}
          >
            <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>

        {open && (
          <div className="absolute right-4 top-16 bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-lg w-56 md:hidden">
            <div className="flex flex-col gap-3">
              <button onClick={() => { scrollToId('highlights'); setOpen(false); }}>Home</button>
              <button onClick={() => { scrollToId('about'); setOpen(false); }}>About</button>
              <button onClick={() => { scrollToId('rooms'); setOpen(false); }}>Rooms</button>
              <button onClick={() => { scrollToId('gallery'); setOpen(false); }}>Gallery</button>
              <button onClick={() => { scrollToId('activities'); setOpen(false); }}>Activities</button>
              <button onClick={() => { scrollToId('contact'); setOpen(false); }}>Contact</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
