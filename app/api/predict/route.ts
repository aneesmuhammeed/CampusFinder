import { NextResponse } from 'next/server';
import { predictColleges } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { exam, rank, category } = body;

    // Schema Validation
    if (!exam || rank === undefined || !category) {
      return NextResponse.json(
        { error: 'Missing required prediction fields (exam, rank, category).' },
        { status: 400 }
      );
    }

    const parsedRank = Number(rank);
    if (isNaN(parsedRank) || parsedRank <= 0) {
      return NextResponse.json(
        { error: 'Invalid rank format. Rank must be a positive integer.' },
        { status: 400 }
      );
    }

    const supportedExams = ['JEE Main', 'JEE Advanced', 'BITSAT', 'MET', 'VITEEE'];
    if (!supportedExams.includes(exam)) {
      return NextResponse.json(
        { error: `Unsupported exam type. Supported exams are: ${supportedExams.join(', ')}` },
        { status: 400 }
      );
    }

    // Run the matching algorithm
    const predictions = await predictColleges({
      exam,
      rank: parsedRank,
      category,
    });

    return NextResponse.json({
      success: true,
      exam,
      rank: parsedRank,
      category,
      count: predictions.length,
      predictions,
    });
  } catch (e) {
    console.error('API Error in predictor route:', e);
    return NextResponse.json(
      { error: 'An unexpected internal server error occurred.' },
      { status: 500 }
    );
  }
}
