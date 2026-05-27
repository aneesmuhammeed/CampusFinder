import { NextResponse } from 'next/server';
import { addReview } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { collegeId, userName, rating, comment } = body;

    // Validation
    if (!collegeId || !userName || rating === undefined || !comment) {
      return NextResponse.json(
        { error: 'Missing required review parameters.' },
        { status: 400 }
      );
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid rating. Must be a number between 1 and 5.' },
        { status: 400 }
      );
    }

    // Call the database writing service
    const review = await addReview(collegeId, userName, rating, comment);

    if (!review) {
      return NextResponse.json(
        { error: 'Failed to insert review. College record not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Review added successfully.',
      review,
    });
  } catch (e) {
    console.error('API Error in reviews POST route:', e);
    return NextResponse.json(
      { error: 'An unexpected internal server error occurred.' },
      { status: 500 }
    );
  }
}
