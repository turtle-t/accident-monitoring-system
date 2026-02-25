import { neon } from "@neondatabase/serverless";

export async function GET() {
  let neonStatus = false;
  let raspberryOnline = false;
  let latestLog = null;

  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Neon status
    await sql`SELECT 1`;
    neonStatus = true;

    // Raspberry Pi heartbeat
    const heartbeat =
      await sql`SELECT last_heartbeat FROM pi_status WHERE id = 1`;
    if (heartbeat.length > 0) {
      const last = new Date(heartbeat[0].last_heartbeat);
      raspberryOnline = Date.now() - last.getTime() < 10000;
    }

    // Latest log
    const logs = await sql`
      SELECT * FROM accident_logs ORDER BY id DESC LIMIT 1;
    `;
    latestLog = logs.length > 0 ? logs[0] : null;

    return Response.json({
      ok: true,
      neon: neonStatus,
      raspberry: raspberryOnline,
      latest: latestLog,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "Server error" });
  }
}
