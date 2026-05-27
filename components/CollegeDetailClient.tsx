'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CollegeDetail } from '@/lib/db';
import Navbar from './Navbar';
import Footer from './Footer';
import CompareDrawer from './CompareDrawer';
import { 
  Building, Calendar, Landmark, MapPin, IndianRupee, Briefcase, 
  Star, Globe, Bookmark, GitCompare, MessageSquare, BookOpen, 
  ChevronLeft, Award, Send,  ChevronRight,
  User,
  Quote,
  GraduationCap,
  CheckCircle2
} from 'lucide-react';

interface CollegeDetailClientProps {
  college: CollegeDetail;
}

export default function CollegeDetailClient({ college }: CollegeDetailClientProps) {
  const { savedIds, compareList, toggleSave, addToCompare, removeFromCompare } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'placements' | 'reviews'>('overview');

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState(college.reviews);
  const [localRating, setLocalRating] = useState(college.rating);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isSaved = savedIds.includes(college.id);
  const isCompared = compareList.some((item) => item.id === college.id);

  const handleCompareToggle = () => {
    if (isCompared) {
      removeFromCompare(college.id);
    } else {
      const added = addToCompare({
        id: college.id,
        name: college.name,
        location: college.location,
        state: college.state,
        logoUrl: college.logoUrl,
        coverUrl: college.coverUrl,
        fees: college.fees,
        rating: college.rating,
        placementAvg: college.placementAvg,
        placementHighest: college.placementHighest,
        type: college.type,
      });
      if (!added) {
        alert('You can compare a maximum of 3 colleges. Please remove one from the tray.');
      }
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collegeId: college.id,
          userName: reviewName,
          rating: Number(reviewRating),
          comment: reviewComment,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Prepend new review and recalculate average locally
        const updatedReviews = [result.review, ...localReviews];
        setLocalReviews(updatedReviews);
        
        const avg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        setLocalRating(parseFloat(avg.toFixed(1)));

        setSubmitSuccess(true);
        setReviewName('');
        setReviewComment('');
        setTimeout(() => setSubmitSuccess(false), 4000);
      }
    } catch (e) {
      console.error('Error submitting review', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock recruiters list matching college tier
  const recruiters = college.type === 'IIT' || college.type === 'Private' && college.placementAvg > 15
    ? ['Google', 'Microsoft', 'Goldman Sachs', 'Amazon', 'Apple', 'Uber', 'NVIDIA']
    : ['TCS', 'Infosys', 'Cognizant', 'Wipro', 'HCL', 'Accenture', 'L&T'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Back Link */}
        <Link 
          href="/colleges" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Directory</span>
        </Link>

        {/* Hero Section Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-card-border mb-8 bg-slate-950 text-white min-h-[300px] flex flex-col justify-end">
          {/* Cover image with strong opacity blur */}
          <div className="absolute inset-0 bg-slate-900">
            <img 
              src={college.coverUrl} 
              alt={college.name} 
              className="w-full h-full object-cover opacity-45 blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative p-6 md:p-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              {/* Logo block */}
              <div className="h-24 w-24 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/20">
                <img src={college.logoUrl} alt="logo" className="h-full w-full object-contain" />
              </div>

              {/* Title & metadata */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 border border-indigo-400/35">
                    {college.type} Institute
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{localRating} / 5</span>
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-none text-white">
                  {college.name}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-sm text-slate-350">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-indigo-400" /> {college.location}, {college.state}
                  </span>
                  <span className="hidden sm:inline text-slate-650">•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-indigo-400" /> Estd. {college.established}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-3 self-center md:self-auto shrink-0 z-20">
              <button
                onClick={handleCompareToggle}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all border ${
                  isCompared
                    ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
              >
                <GitCompare className="h-4 w-4" />
                <span>{isCompared ? 'Compared' : 'Add to Compare'}</span>
              </button>

              <button
                onClick={() => toggleSave(college.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
                title="Bookmark College"
              >
                <Bookmark className={`h-4.5 w-4.5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Bar Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800/80 gap-6 overflow-x-auto pb-px mb-8 text-sm">
          {[
            { id: 'overview', label: 'Overview', icon: Building },
            { id: 'courses', label: 'Courses & Fees', icon: BookOpen },
            { id: 'placements', label: 'Placement Statistics', icon: Briefcase },
            { id: 'reviews', label: `Reviews (${localReviews.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                  isTabActive
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Info Columns (left side, width: 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <div className="glass-card bg-card-bg/40 border border-card-border p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Building className="h-5 w-5 text-indigo-500" />
                    <span>About the Institute</span>
                  </h2>
                  <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed whitespace-pre-line">
                    {college.description}
                  </p>
                </div>

                {/* Infographic Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-850/40">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ownership</span>
                    <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm mt-1">{college.type}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-850/40">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Established</span>
                    <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm mt-1">{college.established}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-850/40">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Official Portal</span>
                    <a 
                      href={college.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-extrabold text-indigo-650 dark:text-indigo-400 text-sm mt-1 flex items-center gap-1 hover:underline"
                    >
                      <span>Visit Site</span>
                      <Globe className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 2. COURSES PANEL */}
            {activeTab === 'courses' && (
              <div className="glass-card bg-card-bg/40 border border-card-border p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    <span>Offered Degrees & Fees</span>
                  </h2>
                </div>

                <div className="overflow-x-auto -mx-6 md:mx-0">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-3.5">Course Name</th>
                        <th className="px-6 py-3.5">Duration</th>
                        <th className="px-6 py-3.5">Admission Exam</th>
                        <th className="px-6 py-3.5 text-right">Annual Fees</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                      {college.courses.map((course) => (
                        <tr key={course.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">{course.name}</td>
                          <td className="px-6 py-4 text-slate-650 dark:text-slate-350">{course.duration}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold">
                              {course.eligibility}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-black text-right text-slate-900 dark:text-slate-200">
                            ₹{new Intl.NumberFormat('en-IN').format(course.fees)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. PLACEMENTS PANEL */}
            {activeTab === 'placements' && (
              <div className="glass-card bg-card-bg/40 border border-card-border p-6 md:p-8 space-y-8">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-indigo-500" />
                  <span>Placements Intelligence</span>
                </h2>

                {/* VISUAL CHART GAUGE BARS */}
                <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-150 dark:border-slate-800/80">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Package Ranges (LPA)</h3>
                  
                  {/* Avg Package Row */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Average Placement Package</span>
                      <span className="font-black text-indigo-650 dark:text-indigo-400">₹{college.placementAvg} LPA</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden">
                      {/* Bar width proportion to highest in pool (e.g. 170LPA max) */}
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(100, (college.placementAvg / 170) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Highest Package Row */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Highest Salary Package</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">₹{college.placementHighest} LPA</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(100, (college.placementHighest / 170) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Recruiters section */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Key Recruiting Corporate Partners</h3>
                  <div className="flex flex-wrap gap-2">
                    {recruiters.map((rec) => (
                      <span 
                        key={rec} 
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-extrabold text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-1.5"
                      >
                        <Award className="h-3.5 w-3.5 text-amber-500" />
                        <span>{rec}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. REVIEWS PANEL */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {/* Submit New Review Card */}
                <div className="glass-card bg-slate-900 border border-slate-800 text-white p-6 md:p-8 space-y-6 shadow-xl">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-indigo-400" />
                      <span>Share Campus Experience</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Help other students make informed college choices
                    </p>
                  </div>

                  {submitSuccess ? (
                    <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-slate-200 text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span>Your review was successfully saved! Thank you for sharing your experience.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Priyan Sen"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                          />
                        </div>

                        {/* Rating Dropdown */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">
                            Star Rating
                          </label>
                          <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-sm cursor-pointer"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5 - Perfect)</option>
                            <option value={4}>⭐⭐⭐⭐ (4 - Great)</option>
                            <option value={3}>⭐⭐⭐ (3 - Average)</option>
                            <option value={2}>⭐⭐ (2 - Below Avg)</option>
                            <option value={1}>⭐ (1 - Poor)</option>
                          </select>
                        </div>
                      </div>

                      {/* Comment Area */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-1">
                          Review Comments
                        </label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Tell us about infrastructure, hostel life, placement cell, or professors..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-900/35 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Saving review...</span>
                        ) : (
                          <>
                            <span>Post Review</span>
                            <Send className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider">
                    Student Reviews Feed
                  </h3>
                  
                  {localReviews.length > 0 ? (
                    localReviews.map((rev) => (
                      <div 
                        key={rev.id} 
                        className="glass-card bg-card-bg/40 border border-card-border p-5 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-900 font-bold flex items-center justify-center text-slate-700 dark:text-slate-300 text-xs">
                              {rev.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">{rev.userName}</p>
                              <span className="text-[10px] text-slate-400">
                                {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          
                          {/* Rating stars display */}
                          <div className="flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded text-amber-600 dark:text-amber-400 text-xs font-black">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span>{rev.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                      No student reviews recorded yet. Be the first to share your experience!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats sidebar (right side, width: 1/3) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Cutoffs widget (Predictor cutoffs) */}
            <div className="glass-card bg-card-bg/40 border border-card-border p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80 text-slate-800 dark:text-slate-200">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                <h3 className="font-extrabold text-base tracking-tight">Historic Cutoffs</h3>
              </div>
              
              <div className="space-y-3">
                {college.cutoffs.length > 0 ? (
                  college.cutoffs.slice(0, 5).map((cut) => (
                    <div key={cut.id} className="flex justify-between items-center text-xs py-1">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{cut.branch}</span>
                        <p className="text-[10px] text-slate-400 font-semibold">{cut.exam} • {cut.category}</p>
                      </div>
                      <span className="font-black text-indigo-650 dark:text-indigo-400 text-sm font-mono">
                        &lt; {cut.closingRank}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400">No cutoff ranks available.</div>
                )}
                {college.cutoffs.length > 5 && (
                  <Link 
                    href="/predictor"
                    className="block text-center text-[10px] font-bold text-indigo-650 dark:text-indigo-400 pt-2 hover:underline uppercase tracking-wider"
                  >
                    Predict Admission Chances &rarr;
                  </Link>
                )}
              </div>
            </div>

            {/* Financial Index card */}
            <div className="glass-card bg-gradient-to-tr from-slate-900 to-indigo-950 border border-slate-850 p-6 space-y-4 text-white">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-slate-200">
                <IndianRupee className="h-5 w-5 text-indigo-400" />
                <h3 className="font-extrabold text-base tracking-tight">Tuition Cost</h3>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Average Annual Fees</span>
                <p className="font-black text-2xl tracking-tight text-white">
                  ₹{new Intl.NumberFormat('en-IN').format(college.fees)} / Year
                </p>
                <p className="text-[10px] text-slate-400 pt-1 leading-relaxed">
                  * Tuition fees vary depending on the specific major course chosen by the student.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating compare Drawer */}
      <CompareDrawer />

      <Footer />
    </div>
  );
}
