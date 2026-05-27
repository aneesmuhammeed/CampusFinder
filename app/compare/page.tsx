'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  GitCompare, Trash2, ArrowLeft, Star, MapPin,
  Globe, X, Check, Calendar
} from 'lucide-react';

interface CourseItem { id: string; name: string; duration: string; fees: number; eligibility: string; }
interface CollegeDetail {
  id: string; name: string; description: string; location: string; state: string;
  fees: number; rating: number; established: number; type: string; logoUrl: string;
  coverUrl: string; website: string; placementAvg: number; placementHighest: number;
  courses: CourseItem[];
}

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useApp();
  const [fullColleges, setFullColleges] = useState<CollegeDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadColleges() {
      if (compareList.length === 0) { setFullColleges([]); setIsLoading(false); return; }
      setIsLoading(true);
      try {
        const ids = compareList.map((c) => `id=${encodeURIComponent(c.id)}`).join('&');
        const res = await fetch(`/api/colleges?${ids}`);
        if (res.ok) {
          const data = await res.json();
          setFullColleges(data.colleges);
        }
      } catch (e) {
        console.error('Error fetching comparison details', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadColleges();
  }, [compareList]);

  const highestAvg = fullColleges.length > 0 ? Math.max(...fullColleges.map((c) => c.placementAvg)) : 0;
  const highestPkg = fullColleges.length > 0 ? Math.max(...fullColleges.map((c) => c.placementHighest)) : 0;
  const lowestFees = fullColleges.length > 0 ? Math.min(...fullColleges.map((c) => c.fees)) : 0;

  const emptySlots = Array.from({ length: Math.max(0, 3 - fullColleges.length) });

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-slate-300 bg-clip-text text-transparent flex items-center gap-2">
              <GitCompare className="h-7 w-7 text-indigo-500 shrink-0" />
              <span>Side-by-Side Comparison</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Comparing {compareList.length} selected {compareList.length === 1 ? 'university' : 'universities'} across placements, fees, and courses
            </p>
          </div>
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-all duration-300 self-start md:self-auto"
            >
              <Trash2 className="h-4 w-4" />
              <span>Reset List</span>
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="glass-card border border-card-border p-12 text-center max-w-2xl mx-auto my-12 flex flex-col items-center">
            <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 text-indigo-500 rounded-2xl flex items-center justify-center mb-4">
              <GitCompare className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">No Colleges Selected</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Go to the college directory, select 2–3 colleges using the "Compare" checkboxes, then return here.
            </p>
            <Link
              href="/colleges"
              className="mt-6 flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Explore College Directory</span>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="w-full text-center py-20 flex flex-col items-center gap-3">
            <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading comparison data…</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-card-border shadow-lg">
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900/40 backdrop-blur-md min-w-[700px]">
              <tbody>

                {/* ── HEADER ROW ─────────────────────────────────── */}
                <tr className="bg-slate-50/50 dark:bg-slate-950/30">
                  <td className="p-6 font-extrabold text-xs uppercase tracking-wider text-slate-400 w-[200px] border-b border-r border-slate-100 dark:border-slate-800">
                    Institute
                  </td>
                  {fullColleges.map((col) => (
                    <td key={col.id} className="p-6 border-b border-r border-slate-100 dark:border-slate-800 relative">
                      <button
                        onClick={() => removeFromCompare(col.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="flex flex-col items-center text-center gap-3 pt-2">
                        <div className="h-16 w-16 bg-white p-1 rounded-xl shadow border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          <img src={col.logoUrl} alt="logo" className="h-full w-full object-contain" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight line-clamp-2">{col.name}</h3>
                          <span className="inline-flex items-center gap-1 mt-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded text-[10px] font-black">
                            <Star className="h-3 w-3 fill-current" />{col.rating}
                          </span>
                        </div>
                      </div>
                    </td>
                  ))}
                  {emptySlots.map((_, i) => (
                    <td key={i} className="p-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-indigo-500 font-bold">
                        <Link href="/colleges">+ Add College</Link>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* ── SECTION: GENERAL ───────────────────────────── */}
                <SectionHeader label="General" colSpan={4} />

                <CompareRow label="Type">
                  {fullColleges.map((col) => <td key={col.id} className={tdClass}><span className="font-bold text-sm text-slate-800 dark:text-slate-200">{col.type}</span></td>)}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

                <CompareRow label="Location">
                  {fullColleges.map((col) => (
                    <td key={col.id} className={tdClass}>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />{col.location}, {col.state}
                      </span>
                    </td>
                  ))}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

                <CompareRow label="Established">
                  {fullColleges.map((col) => (
                    <td key={col.id} className={tdClass}>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />Estd. {col.established}
                      </span>
                    </td>
                  ))}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

                <CompareRow label="Website">
                  {fullColleges.map((col) => (
                    <td key={col.id} className={tdClass}>
                      <a href={col.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-bold">
                        <span>Visit Site</span><Globe className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  ))}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

                {/* ── SECTION: PLACEMENTS ────────────────────────── */}
                <SectionHeader label="Placements" colSpan={4} />

                <CompareRow label="Avg Package">
                  {fullColleges.map((col) => {
                    const best = col.placementAvg === highestAvg;
                    return (
                      <td key={col.id} className={`${tdClass} ${best ? 'bg-emerald-500/5 dark:bg-emerald-500/10' : ''}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-extrabold ${best ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            ₹{col.placementAvg} LPA
                          </span>
                          {best && <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-black uppercase">Highest</span>}
                        </div>
                      </td>
                    );
                  })}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

                <CompareRow label="Highest Package">
                  {fullColleges.map((col) => {
                    const best = col.placementHighest === highestPkg;
                    return (
                      <td key={col.id} className={`${tdClass} ${best ? 'bg-emerald-500/5 dark:bg-emerald-500/10' : ''}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-extrabold ${best ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            ₹{col.placementHighest} LPA
                          </span>
                          {best && <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-black uppercase">Highest</span>}
                        </div>
                      </td>
                    );
                  })}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

                {/* ── SECTION: FEES ──────────────────────────────── */}
                <SectionHeader label="Tuition Fees" colSpan={4} />

                <CompareRow label="Annual Fees">
                  {fullColleges.map((col) => {
                    const cheapest = col.fees === lowestFees;
                    return (
                      <td key={col.id} className={`${tdClass} ${cheapest ? 'bg-indigo-500/5 dark:bg-indigo-500/10' : ''}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-extrabold ${cheapest ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            ₹{new Intl.NumberFormat('en-IN').format(col.fees)} / yr
                          </span>
                          {cheapest && <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[9px] font-black uppercase">Best Value</span>}
                        </div>
                      </td>
                    );
                  })}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

                {/* ── SECTION: COURSES ───────────────────────────── */}
                <SectionHeader label="Courses Offered" colSpan={4} />

                <CompareRow label="Courses">
                  {fullColleges.map((col) => (
                    <td key={col.id} className={tdClass}>
                      <div className="space-y-1.5 max-h-52 overflow-y-auto">
                        {col.courses.map((course) => (
                          <div key={course.id} className="flex items-start gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200">
                            <Check className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                            <span>{course.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                  {emptySlots.map((_, i) => <td key={i} className={tdClass} />)}
                </CompareRow>

              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

const tdClass = 'px-6 py-4 border-b border-r border-slate-100 dark:border-slate-800/80 align-top';

function SectionHeader({ label, colSpan }: { label: string; colSpan: number }) {
  return (
    <tr className="bg-slate-100/50 dark:bg-slate-950/40">
      <td colSpan={colSpan} className="px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </td>
    </tr>
  );
}

function CompareRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <td className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-400 border-b border-r border-slate-100 dark:border-slate-800/80 align-top w-[200px]">
        {label}
      </td>
      {children}
    </tr>
  );
}
