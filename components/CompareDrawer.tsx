'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { GitCompare, X, Trash2, ArrowRight } from 'lucide-react';

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare } = useApp();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-slate-900 border-t border-slate-800 text-white shadow-2xl glass-compare-bar transform animate-in slide-in-from-bottom-full duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title / Info */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <GitCompare className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              <span>Compare Colleges</span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-black">
                {compareList.length} / 3
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
              Select up to 3 colleges to compare placements, fees, and ratings side-by-side
            </p>
          </div>
        </div>

        {/* Selected Items Previews */}
        <div className="flex flex-wrap items-center justify-center gap-4 my-2 md:my-0">
          {compareList.map((college) => (
            <div
              key={college.id}
              className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/60 pl-2.5 pr-1.5 py-1.5 rounded-xl text-xs font-semibold relative group shadow-sm"
            >
              <div className="h-6 w-6 rounded bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                <img src={college.logoUrl} alt="logo" className="h-full w-full object-contain" />
              </div>
              <span className="max-w-[120px] truncate text-slate-200">{college.name}</span>
              <button
                onClick={() => removeFromCompare(college.id)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-700 hover:text-rose-400 transition-colors"
                title="Remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Add more placeholder */}
          {compareList.length < 3 && (
            <div className="hidden lg:flex items-center justify-center h-9 px-4 rounded-xl border border-dashed border-slate-700 text-slate-500 text-xs font-medium">
              + Add {3 - compareList.length} more
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={clearCompare}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear</span>
          </button>
          
          <Link
            href="/compare"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-700/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Compare Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
