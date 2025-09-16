import { NextResponse } from 'next/server';
import dbConnect from '@/lib/DBconnection';
import Review from '@/models/review';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, review, rating } = await request.json();

    if (!name || !review || !rating) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const newReview = new Review({ name, review, rating });
    const savedReview = await newReview.save();

    return NextResponse.json(
      { message: 'Review added successfully', review: savedReview },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}