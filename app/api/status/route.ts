import { neon } from "@neondatabase/serverless";

export async function GET() {
  let neonStatus = false;
  let telegramOnline = false;
  let raspberryOnline = false;

  try {
    // ========== CHECK NEON DATABASE ==========
    const sql = neon(process.env.DATABASE_URL!);
    await sql`SELECT 1;`;
    neonStatus = true;

    // ========== CHECK RASPBERRY PI HEARTBEAT ==========
    try {
      const result = await sql`
        SELECT last_heartbeat
        FROM pi_status
        WHERE id = 1;
      `;

      if (result.length > 0) {
        const last = new Date(result[0].last_heartbeat);
        const diffMs = Date.now() - last.getTime();

        raspberryOnline = diffMs < 10000; // <10 seconds means ONLINE
      }
    } catch (err) {
      raspberryOnline = false;
    }

    // ========== CHECK TELEGRAM BOT ==========
    try {
      const token = process.env.TELEGRAM_BOT_TOKEN;

      if (token) {
        const url = `https://api.telegram.org/bot${token}/getMe`;
        const res = await fetch(url);
        const json = await res.json();

        telegramOnline = json.ok === true;
      }
    } catch (err) {
      telegramOnline = false;
    }

  } catch (err) {
    neonStatus = false;
  }

  return Response.json({
    ok: true,
    data: {
      api: true,               // Website API works
      neon: neonStatus,        // Neon DB status
      telegram: telegramOnline,// Telegram bot status
      raspberry: raspberryOnline, // Pi heartbeat status
    },
  });
}
