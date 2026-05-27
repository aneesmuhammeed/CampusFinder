'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompareDrawer from '@/components/CompareDrawer';
import { 
  GraduationCap, Sparkles, AlertCircle, ArrowRight, ArrowLeft, Star, 
  MapPin, Briefcase, IndianRupee, RotateCcw, CheckCircle2, 
  Search, ShieldAlert, Award
} from 'lucide-react';

interface Prediction {
  college: {
    id: string;
    name: string;
    location: string;
    state: string;
    fees: number;
    rating: number;
    logoUrl: string;
    coverUrl: string;
    placementAvg: number;
    placementHighest: number;
    type: string;
  };
  branch: string;
  closingRank: number;
  probability: 'Highly Likely' | 'Target' | 'Reach';
}

export default function PredictorPage() {
  // Questionnaire states
  const [exam, setExam] = useState<'JEE Main' | 'JEE Advanced' | 'BITSAT' | 'MET' | ''>('');
  const [category, setCategory] = useState<'General' | 'OBC' | 'SC' | 'ST' | ''>('');
  const [rankInput, setRankInput] = useState('');
  
  // Results states
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Prediction[]>([]);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const examsList = [
    { name: 'JEE Main', desc: 'For NITs, IIITs & Central Universities' },
    { name: 'JEE Advanced', desc: 'For Elite Indian Institutes of Technology (IITs)' },
    { name: 'BITSAT', desc: 'For BITS Pilani campuses' },
    { name: 'MET', desc: 'For Manipal Institute of Technology' },
  ];

  const categoriesList = ['General', 'OBC', 'SC', 'ST'];

  const handlePredictSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exam || !category || !rankInput) return;

    const parsedRank = Number(rankInput);
    if (isNaN(parsedRank) || parsedRank <= 0) {
      setErrorMsg('Please enter a valid positive rank number.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setHasPredicted(false);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          category,
          rank: parsedRank
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.predictions);
        setHasPredicted(true);
      } else {
        const err = await response.json();
        setErrorMsg(err.error || 'Prediction calculation failed.');
      }
    } catch (e) {
      console.error('Error fetching prediction results', e);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setExam('');
    setCategory('');
    setRankInput('');
    setResults([]);
    setHasPredicted(false);
    setErrorMsg('');
  };

  // Group predictions by probability for structured layout
  const highlyLikely = results.filter((r) => r.probability === 'Highly Likely');
  const target = results.filter((r) => r.probability === 'Target');
  const reach = results.filter((r) => r.probability === 'Reach');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link 
          href="/colleges" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Directory</span>
        </Link>
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-wider border border-indigo-200/35">
            <Sparkles className="h-4 w-4 fill-current" />
            <span>Smart Matchmaking</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Accredited Admission Predictor
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
            Analyze historic cutoff closing parameters from IITs, NITs, and elite private schools to predict your target engineering branches.
          </p>
        </div>

        {/* Dynamic Panel (Form vs Results) */}
        {!hasPredicted ? (
          /* QUESTIONNAIRE FORM PANEL */
          <div className="max-w-2xl mx-auto glass-card bg-card-bg/40 border border-card-border p-6 md:p-10 shadow-xl relative overflow-hidden">
            <form onSubmit={handlePredictSubmit} className="space-y-8">
              
              {/* 1. Exam selection grid */}
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Step 1: Select Entrance Exam
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {examsList.map((ex) => (
                    <button
                      key={ex.name}
                      type="button"
                      onClick={() => setExam(ex.name as any)}
                      className={`px-5 py-4 rounded-2xl border text-left transition-all duration-300 ${
                        exam === ex.name
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/25 scale-[1.02]'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-350 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <h4 className="font-extrabold text-sm leading-tight">{ex.name}</h4>
                      <p className={`text-[10px] mt-1 ${exam === ex.name ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {ex.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Quota Category selection row */}
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Step 2: Reservation Quota / Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat as any)}
                      className={`py-3.5 rounded-xl border font-bold text-xs uppercase tracking-wider text-center transition-all duration-200 ${
                        category === cat
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 scale-[1.01]'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-650 dark:text-slate-350'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Rank Entry Box */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  Step 3: Enter Your All India Rank (AIR)
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 2500"
                  value={rankInput}
                  onChange={(e) => setRankInput(e.target.value)}
                  className="w-full px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[10px] text-slate-400 leading-relaxed flex items-start gap-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>Please provide your actual rank score. If testing JEE Advanced, enter your rank under 5,000 for IIT recommendations. For JEE Main, ranks up to 35,000 fetch active matches.</span>
                </p>
              </div>

              {/* Submit CTA */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !exam || !category || !rankInput}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-850 disabled:text-slate-450 text-white font-bold rounded-2xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                {isLoading ? (
                  <span>Synthesizing Cutoffs Data...</span>
                ) : (
                  <>
                    <span>Generate Admission Predictions</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* RESULTS PREDICTOR DASHBOARD */
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Summary Banner */}
            <div className="glass-card bg-slate-900 border border-slate-850 p-6 md:p-8 text-white rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Parameters Analyzed</span>
                <h3 className="font-extrabold text-lg text-slate-100">
                  {exam} Prediction Report (Category: {category})
                </h3>
                <p className="text-xs text-slate-450">
                  Cutoff threshold search: closing rank above <span className="font-extrabold text-white text-sm font-mono">{rankInput}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                <span className="text-xs font-semibold text-slate-400">
                  Found {results.length} Eligible Matches
                </span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Start Over</span>
                </button>
              </div>
            </div>

            {results.length === 0 ? (
              /* No matches found screen */
              <div className="glass-card border border-card-border p-12 text-center max-w-xl mx-auto">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 text-rose-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <ShieldAlert className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  No Eligible Match Found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                  Your rank matches are higher than historic cutoffs registered in our database. Try checking another exam (e.g. JEE Main instead of Advanced) or enter a lower rank score (e.g. 5,000) to see matching models.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-650 text-white font-semibold rounded-xl text-xs transition-colors"
                >
                  Configure Rank Parameters
                </button>
              </div>
            ) : (
              /* Results probability sections */
              <div className="space-y-8">
                
                {/* 1. HIGHLY LIKELY SECTION (GREEN) */}
                {highlyLikely.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                      <h3 className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>Highly Likely Matches (Safety Options)</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-black">
                          {highlyLikely.length}
                        </span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {highlyLikely.map((res, idx) => (
                        <PredictionResultCard key={idx} res={res} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. TARGET SECTION (BLUE) */}
                {target.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-indigo-500"></div>
                      <h3 className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>Target Matches (Balanced Options)</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-600 text-[10px] font-black">
                          {target.length}
                        </span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {target.map((res, idx) => (
                        <PredictionResultCard key={idx} res={res} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. REACH SECTION (ORANGE) */}
                {reach.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                      <h3 className="font-extrabold text-sm text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>Reach Matches (Ambitious / Borderline Options)</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 text-[10px] font-black">
                          {reach.length}
                        </span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {reach.map((res, idx) => (
                        <PredictionResultCard key={idx} res={res} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <CompareDrawer />

      <Footer />
    </div>
  );
}

// Sub-component prediction card display
function PredictionResultCard({ res }: { res: Prediction }) {
  const probColors = {
    'Highly Likely': 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    'Target': 'bg-indigo-500/15 border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
    'Reach': 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400',
  };

  const formattedFees = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
  }).format(res.college.fees / 100000);

  return (
    <div className="glass-card bg-card-bg/50 border border-card-border p-5 hover:scale-[1.005] hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        {/* Brand line */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white p-1 rounded-lg border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
              <img src={res.college.logoUrl} alt="logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-100 line-clamp-1">
                {res.college.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5 mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                <span>{res.college.location}, {res.college.state}</span>
              </span>
            </div>
          </div>

          <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border shrink-0 ${probColors[res.probability]}`}>
            {res.probability}
          </span>
        </div>

        {/* Branch specification */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1 font-semibold">
              <Award className="h-3.5 w-3.5 text-indigo-400 shrink-0" /> Predicted Specialization
            </span>
            <span className="font-bold text-[10px]">Cutoff Closing Limit</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
              {res.branch}
            </span>
            <span className="font-black text-slate-900 dark:text-slate-200 text-sm font-mono shrink-0">
              &lt; {res.closingRank}
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-1.5 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-medium text-slate-400">
          <div>
            <span>Average Fees</span>
            <p className="font-extrabold text-slate-800 dark:text-slate-200 text-xs mt-0.5 flex items-center">
              <IndianRupee className="h-3 w-3" />
              <span>{formattedFees}L</span>
            </p>
          </div>
          <div className="text-center">
            <span>Avg Placement</span>
            <p className="font-extrabold text-slate-800 dark:text-slate-200 text-xs mt-0.5">
              ₹{res.college.placementAvg} LPA
            </p>
          </div>
          <div className="text-right">
            <span>Rating score</span>
            <p className="font-extrabold text-amber-500 text-xs mt-0.5 flex items-center justify-end gap-0.5">
              <Star className="h-3 w-3 fill-current" />
              <span>{res.college.rating}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Button link */}
      <Link
        href={`/colleges/${res.college.id}`}
        className="block text-center py-2.5 bg-slate-900 hover:bg-indigo-650 text-white dark:bg-slate-800 dark:hover:bg-indigo-650 text-[10px] font-bold rounded-xl transition-colors mt-2"
      >
        Explore College details
      </Link>
    </div>
  );
}
