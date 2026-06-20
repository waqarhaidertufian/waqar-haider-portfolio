import { sql } from "@vercel/postgres";

let dbInitialized = false;

async function initDb() {
  if (dbInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    dbInitialized = true;
  } catch (error) {
    console.error("Failed to initialize contact_submissions table:", error);
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  // Handle CORS and preflight request
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // Ensure database connection strings are present
    if (!process.env.POSTGRES_URL) {
      console.warn("POSTGRES_URL is missing. Operating in offline fallback simulation mode.");
      // Fallback simulation
      return res.status(200).json({
        success: true,
        message: "Simulation: Form submitted successfully without database storage.",
        data: { name, email, subject, message }
      });
    }

    // Initialize database
    await initDb();

    // Insert contact form data
    const result = await sql`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject || ""}, ${message})
      RETURNING id, created_at;
    `;

    console.log("Contact form submission saved to database:", result.rows[0]);

    return res.status(200).json({
      success: true,
      message: "Your message has been securely submitted and saved.",
      submissionId: result.rows[0].id
    });

  } catch (error: any) {
    console.error("Database or handler error in /api/contact:", error);
    return res.status(500).json({
      error: "Failed to store submission.",
      details: error.message || error
    });
  }
}
