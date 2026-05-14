export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { destination, explorers, date } = req.body;
  console.log(`Booking: ${destination} × ${explorers} on ${date}`);

  res.json({
    success: true,
    bookingId: `ER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  });
}
