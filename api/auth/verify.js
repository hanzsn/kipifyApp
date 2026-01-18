export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ success: false });
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    if (!decoded.startsWith("admin:")) throw new Error();

    const timestamp = Number(decoded.split(":")[1]);
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      return res.status(401).json({ success: false });
    }

    return res.json({ success: true });
  } catch {
    return res.status(401).json({ success: false });
  }
}
