'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { GraduationCap, Bookmark, GitCompare, Compass, User, LogOut, X, Key } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { savedIds, compareList, isLoggedIn, user, login, logout } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail) {
      const name = authName || 'Student';
      login(name, authEmail);
      setShowAuthModal(false);
      setAuthName('');
      setAuthEmail('');
    }
  };

  const navLinks = [
    { href: '/colleges', label: 'Discover Colleges', icon: Compass },
    { href: '/compare', label: 'Compare', icon: GitCompare, badge: compareList.length },
    { href: '/predictor', label: 'Rank Predictor', icon: GraduationCap },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-display font-black text-xl tracking-tight uppercase text-foreground">
                  CampusFinder.
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 py-2 text-sm font-medium transition-all relative ${
                      isActive
                        ? 'text-foreground'
                        : 'text-neutral-500 hover:text-foreground'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && link.badge > 0 ? (
                      <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-sm bg-foreground text-[10px] font-mono text-background">
                        {link.badge}
                      </span>
                    ) : null}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-6">
              {/* Saved list icon */}
              <Link
                href="/colleges?saved=true"
                className="relative text-neutral-500 hover:text-foreground transition-all duration-200"
                title="Saved Items"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground/70 hover:text-foreground">
                  Saved [{savedIds.length}]
                </span>
                {savedIds.length > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-1.5 w-1.5 rounded-full bg-accent"></span>
                )}
              </Link>

              {/* User Session */}
              {isLoggedIn && user ? (
                <div className="flex items-center gap-4 border-l border-card-border pl-6">
                  <div className="hidden lg:flex flex-col text-right">
                    <span className="text-xs font-mono font-semibold text-foreground leading-tight uppercase">
                      {user.name}
                    </span>
                    <span className="text-[10px] bg-accent text-accent-text px-1 mt-0.5 inline-block self-end uppercase">
                      Student
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1 text-neutral-500 hover:text-accent transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-1.5 border border-foreground text-foreground hover:bg-foreground hover:text-background text-xs font-mono uppercase tracking-widest transition-all"
                >
                  <span>Authenticate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-none p-4">
          <div className="w-full max-w-md bg-background border border-foreground text-foreground rounded-none overflow-hidden p-8 shadow-[8px_8px_0_0_#1A1A1A] relative animate-in fade-in duration-200">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-1 px-2 border border-transparent hover:border-foreground transition-all duration-200"
            >
              <span className="font-mono text-xs uppercase text-foreground">Close</span>
            </button>

            <div className="flex flex-col items-start text-left mt-2 mb-8 border-b border-foreground pb-6">
              <h3 className="font-display text-2xl font-black uppercase">Authenticate.</h3>
              <p className="font-mono text-xs text-foreground/70 mt-2 uppercase tracking-wide">
                Access your bookmarked models & forecast comparisons.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-foreground/80 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Demo Sequence"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-foreground text-foreground placeholder-foreground/30 focus:outline-none rounded-none text-sm font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] font-black uppercase tracking-widest text-foreground/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. demo@campusfinder.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-foreground text-foreground placeholder-foreground/30 focus:outline-none rounded-none text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-accent hover:bg-foreground text-white font-mono text-sm uppercase tracking-widest font-black transition-all duration-200 border-none"
              >
                Initialize Session
              </button>
            </form>

            <div className="mt-8 pt-4 border-t border-foreground/10 text-left">
              <button
                type="button"
                onClick={() => {
                  setAuthName('Demo Reference');
                  setAuthEmail('demo@campusfinder.com');
                }}
                className="font-mono text-[10px] text-accent hover:text-foreground font-black uppercase tracking-wider underline underline-offset-4"
              >
                Insert Dummy Payload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
