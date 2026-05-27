import React from 'react';
import { getColleges } from '@/lib/db';
import CollegesDirectoryClient from '@/components/CollegesDirectoryClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompareDrawer from '@/components/CompareDrawer';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    state?: string;
    feeMax?: string;
    ratingMin?: string;
    saved?: string;
  }>;
}

export default async function CollegesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const search = params.search || undefined;
  const type = params.type || undefined;
  const state = params.state || undefined;
  const feeMax = params.feeMax ? Number(params.feeMax) : undefined;
  const ratingMin = params.ratingMin ? Number(params.ratingMin) : undefined;

  const colleges = await getColleges({
    search,
    type,
    state,
    feeMax,
    ratingMin,
  });

  const allColleges = await getColleges({});
  const distinctStates = Array.from(new Set(allColleges.map((col) => col.state))).sort();

  const collegesBrief = colleges.map((col) => ({
    id: col.id,
    name: col.name,
    location: col.location,
    logoUrl: col.logoUrl,
    fees: col.fees,
    rating: col.rating,
    placementAvg: col.placementAvg,
    placementHighest: col.placementHighest,
    type: col.type,
    coverUrl: col.coverUrl,
    state: col.state,
  }));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CollegesDirectoryClient
          initialColleges={collegesBrief}
          uniqueStates={distinctStates}
          uniqueTypes={Array.from(new Set(collegesBrief.map((c) => c.type)))}
        />
      </main>
      <CompareDrawer />
      <Footer />
    </>
  );
}
