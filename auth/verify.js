export default function handler(req, res) {
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

    res.json({ success: true });
  } catch {
    res.status(401).json({ success: false });
  }
}
