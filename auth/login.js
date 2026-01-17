export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kipify@2026";

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = Buffer.from(`admin:${Date.now()}`).toString("base64");

  res.status(200).json({
    success: true,
    token,
    message: "Login successful",
  });
}
