'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-foreground text-foreground py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Brand description */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-display font-black text-2xl tracking-tight uppercase text-foreground">
                CampusFinder.
              </span>
            </Link>
            <p className="text-sm font-mono max-w-sm text-foreground/70 uppercase tracking-widest leading-relaxed">
              Data-focused institution research. <br/> Stop guessing. Start modeling.
            </p>
          </div>

          {/* Quick Sitemap Links */}
          <div className="space-y-4">
            <h4 className="text-foreground text-[10px] font-mono font-black tracking-widest uppercase">System Index</h4>
            <ul className="space-y-3 text-xs font-mono tracking-wider uppercase">
              <li>
                <Link href="/colleges" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span className="text-accent/50 text-[10px]">01</span> Database Directory
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span className="text-accent/50 text-[10px]">02</span> Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/predictor" className="hover:text-accent transition-colors flex items-center gap-2">
                  <span className="text-accent/50 text-[10px]">03</span> Inference Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="text-foreground text-[10px] font-mono font-black tracking-widest uppercase">Resources</h4>
            <ul className="space-y-3 text-xs font-mono tracking-wider uppercase text-foreground/70">
              <li className="hover:text-accent cursor-pointer transition-colors">JEE Main Cutoffs 2025</li>
              <li className="hover:text-accent cursor-pointer transition-colors">JEE Advanced Guidelines</li>
              <li className="hover:text-accent cursor-pointer transition-colors">BITSAT Exam Dates</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-foreground flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-foreground/50">
          <div>
            &copy; {new Date().getFullYear()} CampusFinder Systems.
          </div>
          <div>
            Built with strict constraints.
          </div>
        </div>
      </div>
    </footer>
  );
}
