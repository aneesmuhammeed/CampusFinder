import React from 'react';
import Link from 'next/link';
import { getCollegeById } from '@/lib/db';
import CollegeDetailClient from '@/components/CollegeDetailClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GraduationCap, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CollegeDetailPage({ params }: PageProps) {
  // Resolve params Promise in Next.js 15/16
  const { id } = await params;

  // Run the server-side DB query
  const college = await getCollegeById(id);

  if (!college) {
    // Elegant fallback if college doesn't exist
    return (
      <>
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
          <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 text-indigo-500 rounded-2xl flex items-center justify-center mb-6">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            College Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-sm">
            We couldn't locate any college matching the specified identifier in our database records.
          </p>
          <Link
            href="/colleges"
            className="mt-6 flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Directory</span>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return <CollegeDetailClient college={college} />;
}
