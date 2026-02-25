export async function POST() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json({ ok: false, error: "Missing env variables" });
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "Test message from Accident Dashboard 🚨",
      }),
    });

    const json = await res.json();

    return Response.json({ ok: json.ok });
  } catch (err) {
    return Response.json({ ok: false, error: err });
  }
}
