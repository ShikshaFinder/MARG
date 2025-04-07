import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { location = "xyz" } = req.body;

    const response = await fetch("http://127.0.0.1:8000/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
