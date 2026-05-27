import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getColleges } from '@/lib/db';
import {
  GraduationCap, Search, GitCompare, Sparkles, ArrowRight,
  Star, MapPin, Briefcase, ChevronRight, Zap, Shield, BarChart3
} from 'lucide-react';

export default async function HomePage() {
  // Fetch top-rated colleges for showcase
  const topColleges = await getColleges({ ratingMin: 4.5 });
  const featuredColleges = topColleges.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ─── HERO SECTION ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 text-center relative z-10">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-slate-900 dark:text-white max-w-5xl mx-auto">
              Find Your{' '}
              <span className="text-blue-600 dark:text-blue-400">
                Perfect College
              </span>{' '}
              Match
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Discover, compare, and predict your admission chances across India's top IITs, NITs, and elite private universities using real cutoff data.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/colleges"
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition-all duration-300 shadow-md hover:scale-[1.03]"
              >
                <Search className="h-4 w-4" />
                <span>Explore Colleges</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/predictor"
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-2xl text-sm transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:scale-[1.02]"
              >
                <GraduationCap className="h-4 w-4 text-blue-500" />
                <span>Predict My Rank</span>
              </Link>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-xs font-bold text-slate-500 dark:text-slate-400">
              {[
                { value: '8+', label: 'Premier Institutes' },
                { value: '50+', label: 'Courses Listed' },
                { value: '100+', label: 'Cutoff Records' },
                { value: 'Free', label: 'Forever' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES SECTION ─────────────────────────────────────── */}
        <section className="py-20 bg-slate-50/50 dark:bg-slate-950/20 border-y border-slate-100 dark:border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Everything You Need to Decide
              </h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
                From smart search to cutoff-based admission probability — built for serious students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Search,
                  color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/40',
                  title: 'Smart Search & Filter',
                  desc: 'Find colleges by exam, fees, state, type, and minimum ratings using an advanced multi-dimensional filtering engine.',
                  href: '/colleges',
                },
                {
                  icon: GitCompare,
                  color: 'text-slate-500 bg-slate-100 dark:bg-slate-800',
                  title: 'Side-by-Side Compare',
                  desc: 'Compare up to 3 colleges simultaneously — fees, placement packages, courses, and rating — with auto-highlighted winners.',
                  href: '/compare',
                },
                {
                  icon: BarChart3,
                  color: 'text-sky-500 bg-sky-50 dark:bg-sky-900/40',
                  title: 'Admission Predictor',
                  desc: 'Input your JEE / BITSAT rank and quota to instantly generate categorized admission probability predictions from real cutoffs.',
                  href: '/predictor',
                },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 space-y-4 group hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 rounded-2xl"
                  >
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold">
                      <span>Explore</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── TOP COLLEGES PREVIEW ─────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Top-Rated Institutions
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Highest-rated colleges based on student reviews & placement data
                </p>
              </div>
              <Link
                href="/colleges"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredColleges.map((college) => (
                <Link
                  key={college.id}
                  href={`/colleges/${college.id}`}
                  className="glass-card group overflow-hidden flex flex-col bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 rounded-2xl"
                >
                  {/* Cover */}
                  <div className="relative h-40 overflow-hidden bg-slate-800">
                    <img
                      src={(college as any).coverUrl || college.logoUrl}
                      alt={college.name}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-sm border border-slate-700/50">
                      {college.type}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                        {college.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {college.location}, {(college as any).state}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {college.rating}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                        <Briefcase className="h-3.5 w-3.5" />
                        ₹{college.placementAvg} LPA avg
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/colleges"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all"
              >
                <span>View All Colleges</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Know Your Admission Probability{' '}
              <span className="text-blue-400">
                Before Applying
              </span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Enter your rank, exam type, and category. Our algorithm cross-references historic closing cutoffs from IITs, NITs, and private universities to show your most probable matches.
            </p>
            <Link
              href="/predictor"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-all duration-300 shadow-md hover:scale-[1.03]"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Start Rank Prediction →</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
