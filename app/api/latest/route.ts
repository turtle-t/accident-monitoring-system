import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// Define the type for your data (optional but recommended)
interface AccidentLog {
  id: number;
  created_at: string;
  impact: number;
  alcohol: number;
  seatbelt: boolean;
  accident: boolean;
  latitude: number;
  longitude: number;
  geo_violation: boolean;
  sms_sent: boolean;
}

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Get ONLY the most recent record
    const result = await sql<AccidentLog[]>`
      SELECT * FROM accident_logs 
      ORDER BY timestamp DESC 
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
      data: result[0]  // Just the first/latest record
    });

  } catch (error) {
    console.error('Latest API error:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Optional: Add revalidation if needed
export const revalidate = 0; // Disable cache for real-time data
