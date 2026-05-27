'use client';

import React from 'react';
import { SlidersHorizontal, Search, RotateCcw, Star, Landmark, MapPin, IndianRupee } from 'lucide-react';

interface FilterSidebarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  feeMax: number;
  setFeeMax: (val: number) => void;
  ratingMin: number;
  setRatingMin: (val: number) => void;
  onReset: () => void;
  availableStates: string[];
}

export default function FilterSidebar({
  search,
  setSearch,
  selectedType,
  setSelectedType,
  selectedState,
  setSelectedState,
  feeMax,
  setFeeMax,
  ratingMin,
  setRatingMin,
  onReset,
  availableStates,
}: FilterSidebarProps) {
  const collegeTypes = ['All', 'IIT', 'NIT', 'Private', 'Central'];
  const ratingThresholds = [0, 4.0, 4.3, 4.5, 4.7];

  const formattedFeeMax = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
  }).format(feeMax / 100000);

  return (
    <aside className="glass-card bg-card-bg/40 border border-card-border p-6 space-y-6 sticky top-24 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <SlidersHorizontal className="h-5 w-5 text-indigo-500" />
          <h3 className="font-extrabold text-base tracking-tight">Advanced Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Keyword search input */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Search College
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. IIT Bombay, Mumbai..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500"
          />
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
        </div>
      </div>

      {/* 2. College Type Selector */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Landmark className="h-3.5 w-3.5" /> Type of Institute
        </label>
        <div className="flex flex-wrap gap-1.5">
          {collegeTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedType === type
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100 dark:shadow-none'
                  : 'bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {type === 'All' ? 'All Types' : type}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Fee range slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1">
            <IndianRupee className="h-3.5 w-3.5" /> Max Annual Fees
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm font-sans">
            ₹{formattedFeeMax}L
          </span>
        </div>
        <input
          type="range"
          min={50000}
          max={500000}
          step={20000}
          value={feeMax}
          onChange={(e) => setFeeMax(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
        />
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-450">
          <span>₹50K</span>
          <span>₹2.5L</span>
          <span>₹5L</span>
        </div>
      </div>

      {/* 4. State region selection */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> State / Region
        </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="">All States</option>
          {availableStates.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Star ratings filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Minimum Rating
        </label>
        <div className="space-y-1.5">
          {ratingThresholds.map((threshold) => (
            <button
              key={threshold}
              onClick={() => setRatingMin(threshold)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all duration-200 ${
                ratingMin === threshold
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex text-amber-500">
                <Star className="h-4.5 w-4.5 fill-current" />
              </div>
              <span>
                {threshold === 0 ? 'All Ratings' : `${threshold.toFixed(1)} & above`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
