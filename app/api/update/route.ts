import { neon } from "@neondatabase/serverless";

function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

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

    // ✅ YOUR REAL GEO CENTER
    const centerLat = 30.756017940347842;
    const centerLon = 78.35909315468292;

    const distance = getDistanceKm(
      latitude,
      longitude,
      centerLat,
      centerLon
    );

    const geo_violation = distance > 3; // 3 km radius

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
