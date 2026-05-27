'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, MapPin, X, ChevronLeft } from 'lucide-react';
import CollegeCard from './CollegeCard';

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  type: string;
  logoUrl: string;
  coverUrl: string;
  placementAvg: number;
  placementHighest: number;
}

export default function CollegesDirectoryClient({
  initialColleges,
  uniqueStates,
  uniqueTypes,
}: {
  initialColleges: College[];
  uniqueStates: string[];
  uniqueTypes: string[];
}) {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [maxFees, setMaxFees] = useState(5000000); // 50L
  const [minRating, setMinRating] = useState(0);

  const filteredColleges = useMemo(() => {
    return initialColleges.filter((col) => {
      if (search && !col.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedState !== 'All' && col.state !== selectedState) return false;
      if (selectedType !== 'All' && col.type !== selectedType) return false;
      if (col.fees > maxFees) return false;
      if (col.rating < minRating) return false;
      return true;
    });
  }, [initialColleges, search, selectedState, selectedType, maxFees, minRating]);

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 space-y-6">
        <div className="mb-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white font-semibold">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <span>Filters</span>
          </div>

          <div className="space-y-5">
            {/* Search */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. IIT Madras..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-transparent dark:text-white transition-colors"
                />
              </div>
            </div>

            {/* State */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-transparent dark:text-white transition-colors"
              >
                <option value="All">All States</option>
                {uniqueStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Institute Type</label>
              <div className="space-y-2">
                {['All', ...uniqueTypes].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                      className="text-blue-600 focus:ring-blue-500 bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Fees */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Max Fees / yr</label>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  ₹{maxFees >= 5000000 ? 'Any' : `${(maxFees / 100000).toFixed(1)}L`}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={maxFees}
                onChange={(e) => setMaxFees(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            
            {/* Min Rating */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Min Rating</label>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{minRating} ★</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <div className="flex-1 mt-6 md:mt-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {filteredColleges.length} Institutes Found
          </h2>
        </div>

        {filteredColleges.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <X className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">No colleges match your criteria</h3>
            <button
              onClick={() => {
                setSearch(''); setSelectedState('All'); setSelectedType('All'); setMaxFees(5000000); setMinRating(0);
              }}
              className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
