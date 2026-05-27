import { NextResponse } from 'next/server';
import { getCollegeById } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.getAll('id');

  if (!ids || ids.length === 0) {
    return NextResponse.json({ error: 'At least one college id is required.' }, { status: 400 });
  }

  try {
    const colleges = await Promise.all(ids.map((id) => getCollegeById(id)));
    const found = colleges.filter((c) => c !== null);
    return NextResponse.json({ colleges: found });
  } catch (e) {
    console.error('Error fetching colleges for comparison:', e);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
