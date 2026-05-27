'use client';

import React from 'react';
import Link from 'next/link';
import { useApp, CollegeBrief } from '@/context/AppContext';
import { Bookmark, Star, MapPin, IndianRupee, Briefcase, ChevronRight, Check } from 'lucide-react';

interface CollegeCardProps {
  college: CollegeBrief;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { savedIds, compareList, toggleSave, addToCompare, removeFromCompare } = useApp();

  const isSaved = savedIds.includes(college.id);
  const isCompared = compareList.some((item) => item.id === college.id);

  const handleCompareChange = () => {
    if (isCompared) {
      removeFromCompare(college.id);
    } else {
      const added = addToCompare(college);
      if (!added) {
        alert('You can compare a maximum of 3 colleges side-by-side. Please remove one before adding another.');
      }
    }
  };

  const formattedFees = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
  }).format(college.fees / 100000);

  return (
    <div className="group glass-card overflow-hidden flex flex-col relative bg-card-bg/50 border border-card-border hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
      {/* Cover Image & Hover Overlays */}
      <div className="h-44 w-full relative overflow-hidden bg-slate-800">
        <img
          src={college.coverUrl}
          alt={college.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md border border-slate-700/50">
            {college.type}
          </span>
          <button
            onClick={() => toggleSave(college.id)}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all duration-200 ${
              isSaved
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/35 hover:bg-indigo-700'
                : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-900/90'
            }`}
            title={isSaved ? 'Remove from Bookmarks' : 'Save to Bookmarks'}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* College Logo Floating over cover bottom */}
        <div className="absolute bottom-3 left-4 flex items-center gap-3 z-10">
          <div className="h-12 w-12 rounded-xl bg-white p-1 shadow-md border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
            <img src={college.logoUrl} alt="logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 bg-amber-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-sm">
              <Star className="h-3 w-3 fill-current" />
              <span>{college.rating}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {college.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-medium">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>{college.location}, {college.state}</span>
            </p>
          </div>

          {/* Stats Analytics Grid */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                <Briefcase className="h-3 w-3 text-indigo-400" /> Placements (Avg)
              </span>
              <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                ₹{college.placementAvg} LPA
              </p>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Highest Package
              </span>
              <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                ₹{college.placementHighest} LPA
              </p>
            </div>
          </div>

          {/* Fees Display */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span>Avg Annual Fees</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-200 flex items-center text-sm">
              <IndianRupee className="h-3.5 w-3.5" />
              {formattedFees} Lakhs
            </span>
          </div>
        </div>

        {/* Action Buttons footer */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {/* Comparison checkbox */}
          <button
            onClick={handleCompareChange}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
              isCompared
                ? 'bg-violet-600/10 border-violet-500/30 text-violet-600 dark:text-violet-400'
                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center transition-all ${
              isCompared ? 'bg-violet-600 border-violet-500 text-white' : 'border-slate-300 dark:border-slate-700'
            }`}>
              {isCompared && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
            <span>Compare</span>
          </button>

          {/* Explore Details CTA */}
          <Link
            href={`/colleges/${college.id}`}
            className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-indigo-600 text-white dark:bg-slate-800 dark:hover:bg-indigo-600 transition-all duration-300 shadow-sm"
          >
            <span>Explore College</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
