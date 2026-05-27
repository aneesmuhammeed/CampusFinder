'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Heart, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Brand description */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white group">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-blue-600 dark:text-blue-400">
                CampusFinder
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              Empowering students to research, compare, and discover their perfect college match. Predict your admission probabilities with advanced historic cutoff intelligence.
            </p>
          </div>

          {/* Quick Sitemap Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Sitemap</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/colleges" className="hover:text-indigo-400 transition-colors">
                  Discover Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-indigo-400 transition-colors">
                  Compare Colleges
                </Link>
              </li>
              <li>
                <Link href="/predictor" className="hover:text-indigo-400 transition-colors">
                  Rank & Cutoff Predictor
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">JEE Main Cutoffs 2025</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">JEE Advanced Guidelines</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">BITSAT Exam Dates</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-center text-xs">
          <div>
            &copy; {new Date().getFullYear()} CampusFinder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
