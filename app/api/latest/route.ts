import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Fix: Use 'created_at' instead of 'timestamp' (your column name)
    const result = await sql`
      SELECT * FROM accident_logs 
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json({ 
        ok: true, 
        data: null 
      });
    }

    // Return the single object (not an array)
    return NextResponse.json({ 
      ok: true, 
      data: result[0]
    });

  } catch (error) {
    console.error('Latest API error:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Disable cache for real-time data
export const revalidate = 0;
