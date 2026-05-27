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
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-card-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-blue-600 group-hover:bg-blue-700 text-white p-2 rounded-xl transition-all duration-300">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-blue-600 dark:text-blue-400">
                  CampusFinder
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                    {link.badge && link.badge > 0 ? (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white shadow-sm">
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Saved list icon */}
              <Link
                href="/colleges?saved=true"
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60 transition-all duration-200"
                title="Saved Colleges"
              >
                <Bookmark className="h-5 w-5" />
                {savedIds.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-400"></span>
                  </span>
                )}
              </Link>

              {/* User Session */}
              {isLoggedIn && user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden lg:flex flex-col text-right">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {user.email}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200"
                    title="Log Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 shadow-md shadow-indigo-200 dark:shadow-none hover:shadow-indigo-300 hover:scale-[1.02]"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass-card bg-slate-900 border border-slate-800 text-white rounded-2xl overflow-hidden p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className="h-12 w-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                <Key className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Sign In to CampusFinder</h3>
              <p className="text-sm text-slate-400 mt-1">
                Access your bookmarked colleges & rank predictions
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Demo Student"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. demo@campusfinder.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-900/30 hover:scale-[1.01]"
              >
                Sign In / Register
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthName('Demo Student');
                  setAuthEmail('demo@campusfinder.com');
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4"
              >
                Quick Fill Demo Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
