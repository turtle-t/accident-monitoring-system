export async function GET() {
  const randomImpact = Math.floor(Math.random() * 25);
  const randomAlcohol = Math.random() > 0.85 ? 1 : 0;
  const randomSeatbelt = Math.random() > 0.4;
  const randomAccident = randomImpact > 18;

  // Base location
  const baseLat = 30.5781;
  const baseLon = 78.1234;

  // Slight movement simulation
  const latitude = baseLat + (Math.random() - 0.5) * 0.02;
  const longitude = baseLon + (Math.random() - 0.5) * 0.02;

  const geo_violation =
    Math.abs(latitude - baseLat) > 0.01 ||
    Math.abs(longitude - baseLon) > 0.01;

  const sms_sent = randomAccident;

  return Response.json({
    ok: true,
    data: {
      id: Math.floor(Math.random() * 1000),
      impact: randomImpact,
      alcohol: randomAlcohol,
      seatbelt: randomSeatbelt,
      accident: randomAccident,
      latitude,
      longitude,
      geo_violation,
      sms_sent,
      created_at: new Date().toISOString(),
    },
  });
}
