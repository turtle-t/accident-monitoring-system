import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const rows = await sql`
      SELECT *
      FROM accident_logs
      ORDER BY id DESC;
    `;

    return Response.json({ ok: true, data: rows });
  } catch (err) {
    console.error("API /history error:", err);
    return Response.json({ ok: false, error: "DB Error" }, { status: 500 });
  }
}
