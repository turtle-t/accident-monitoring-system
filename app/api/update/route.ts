import { neon } from "@neondatabase/serverless";

export async function GET(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const { searchParams } = new URL(req.url);

    const impact = Number(searchParams.get("impact"));
    const alcohol = Number(searchParams.get("alcohol"));
    const seatbelt = searchParams.get("seatbelt") === "1";
    const accident = searchParams.get("accident") === "1";
    const latitude = Number(searchParams.get("lat"));
    const longitude = Number(searchParams.get("lon"));

    // Simple geo-fence logic (5km radius)
    const centerLat = 30.5781;
    const centerLon = 78.1234;

    const geo_violation =
      Math.abs(latitude - centerLat) > 0.05 ||
      Math.abs(longitude - centerLon) > 0.05;

    const sms_sent = accident;

    await sql`
      INSERT INTO accident_logs
      (impact, alcohol, seatbelt, accident, latitude, longitude, geo_violation, sms_sent)
      VALUES
      (${impact}, ${alcohol}, ${seatbelt}, ${accident}, ${latitude}, ${longitude}, ${geo_violation}, ${sms_sent});
    `;

    return Response.json({ ok: true });

  } catch (err) {
    console.error("Update API error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}