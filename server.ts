import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { sql } from "@vercel/postgres";

dotenv.config({ path: ".env.local" });
dotenv.config();

// Initialize server-side Gemini API
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chat widget will operate in fallback mode.");
}

let dbInitialized = false;

async function initDb() {
  if (dbInitialized) return;
  if (!process.env.POSTGRES_URL) {
    console.warn("WARNING: POSTGRES_URL is not set. Database integration will run in offline simulation mode.");
    return;
  }
  try {
    // Create contact_submissions table
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
    
    // Create chat_logs table
    await sql`
      CREATE TABLE IF NOT EXISTS chat_logs (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255),
        sender VARCHAR(50) NOT NULL,
        message_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    dbInitialized = true;
    console.log("Database tables initialized successfully (Local).");
  } catch (error) {
    console.error("Error initializing database tables (Local):", error);
  }
}

const WAQAR_FACT_SHEET = `
You are the Virtual AI Portfolio Assistant representing Waqar Haider.
Your job is to answer questions about Waqar Haider in an elite, highly professional, polite, and persuasive tone. Promote his high expertise and interest in working at world-class establishments like OpenAI, DeepMind, NVIDIA, Anthropic, Meta AI, Google, Tesla, or leading startup ecosystems.

Here are the accurate bio details of Waqar Haider:
- Name: Waqar Haider
- Title: AI Engineer / Full Stack Developer
- Contact Email: waqarhaidertufian@gmail.com
- Phone / WhatsApp: +92 327 1086970
- Location: Faisalabad, Pakistan
- Mission: Designing and building luxury AI-driven technology products, intelligent systems, deep neural networks, computer vision, and elite full-stack applications.
- Key Specializations: Deep Learning, Computer Vision, Generative AI, Natural Language Processing, and scalable Web Architecture.
- Key Skills:
  - AI & ML: Python, TensorFlow, PyTorch, OpenCV, Scikit-Learn, Hugging Face, Deep learning models, LLMs, RAG, Prompt Engineering.
  - Web & DevOps: React, React Native, Next.js, Node.js, FastAPI, Express, MongoDB, SQL, PostgreSQL, Docker, Git & GitHub, AWS, GCP, Cloud Platforms.
- Work Experience:
  1. AI & Machine Learning Engineer (2025 - PRESENT) | Independent / Self-Employed, Faisalabad, Pakistan
     - Developed cutting-edge AI models, boosting efficiency by 30%.
     - Implemented machine learning algorithms, enhancing predictive accuracy by 25%.
     - Optimized data pipelines, reducing processing time by 40%.
     - Achieved a 20% increase in customer satisfaction through personalized solutions.
  2. Full Stack Engineer Intern (Jun 2025 - Sep 2025) | NETSOL Technologies, Lahore, Pakistan
     - Developed full-stack web modules using React and FastAPI for finance platforms.
     - Built robust MLOps pipelines to preprocess and validate multi-source financial data.
     - Integrated Generative AI and LLM orchestration to automate complex workflows.
     - Maintained reusable code across microservices using Docker containerization.
- Education: BS in Artificial Intelligence from The University Of Faisalabad (2023 - PRESENT), GPA: 3.8 / 4.0.
- Certifications & Achievements: Deep Learning Specialization by Coursera, TensorFlow Developer Certificate, OpenCV Computer Vision Professional, over 50+ successful client integrations globally, and active AI open-source contributor.
- Personality traits: Driven by precision, minimalist design, deep technical excellence, resilient problem-solver, elegant communicator.

Instructions for your responses:
- Keep answers relatively concise, professional, and directly helpful.
- Avoid repeating this full list of credentials unless asked. Just retrieve relevant answers naturally.
- Highlight Waqar's email, whatsapp, and location beautifully when people ask how to contact or hire him.
- If they ask general setup questions, feel free to give helpful technical guidance, but keep the focus on Waqar.
- Adopt a premium, futuristic luxury tone, matching the portfolio's aesthetics.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize DB on server start
  if (process.env.POSTGRES_URL) {
    await initDb();
  }

  // API Route for Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      if (!process.env.POSTGRES_URL) {
        console.warn("POSTGRES_URL is missing. Simulating contact submission.");
        return res.json({
          success: true,
          message: "Simulation: Contact form submitted successfully (Local).",
          data: { name, email, subject, message }
        });
      }

      await initDb();
      const result = await sql`
        INSERT INTO contact_submissions (name, email, subject, message)
        VALUES (${name}, ${email}, ${subject || ""}, ${message})
        RETURNING id, created_at;
      `;

      console.log("Contact submission saved to database (Local):", result.rows[0]);

      return res.json({
        success: true,
        message: "Your message has been securely submitted and saved.",
        submissionId: result.rows[0].id
      });
    } catch (error: any) {
      console.error("Contact Form error:", error);
      res.status(500).json({ error: error.message || "Failed to save contact submission." });
    }
  });

  // API Route for AI portfolio assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, sessionId } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      // Log user message to database
      if (process.env.POSTGRES_URL) {
        try {
          await initDb();
          await sql`
            INSERT INTO chat_logs (session_id, sender, message_text)
            VALUES (${sessionId || "unknown"}, 'user', ${message});
          `;
        } catch (dbErr) {
          console.error("Failed to log user chat message to database:", dbErr);
        }
      }

      if (!ai) {
        // Fallback response if API key is not present
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(800);
        
        let responseFallback = "Hi there! I am Waqar Haider's virtual assistant. I am currently running in offline preview mode (GEMINI_API_KEY is not configured yet). However, I can let you know that Waqar is an Elite AI & Full Stack Engineer specialized in Deep Learning, Computer Vision, and highly scalable software. You can directly reach him via email at waqarhaidertufian@gmail.com or WhatsApp at +923271086970!";
        
        const lower = message.toLowerCase();
        if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("hire") || lower.includes("reach")) {
          responseFallback = "You can directly contact Waqar Haider via Email at waqarhaidertufian@gmail.com or WhatsApp/Phone at +92 327 1086970. He is based in Faisalabad, Pakistan, and is open for remote opportunities, collaborations, and contract work!";
        } else if (lower.includes("project") || lower.includes("portfolio")) {
          responseFallback = "Waqar has built several next-gen projects, including an AI Virtual Fitness Trainer, a Smart Medical Diagnosis System, a real-time Face Recognition Platform, and more. Scroll down his portfolio to see elegant project detail cards!";
        } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("code")) {
          responseFallback = "Waqar's advanced technology stack includes Python, PyTorch, TensorFlow, OpenCV, FastAPI, React, Next.js, Node.js, and cloud containerizations like Docker. He specializes in deploying real-time deep learning models.";
        }

        // Log fallback response to database
        if (process.env.POSTGRES_URL) {
          try {
            await sql`
              INSERT INTO chat_logs (session_id, sender, message_text)
              VALUES (${sessionId || "unknown"}, 'bot', ${responseFallback});
            `;
          } catch (dbErr) {
            console.error("Failed to log bot fallback reply to database:", dbErr);
          }
        }

        return res.json({ text: responseFallback });
      }

      const formattedContents: any[] = [];
      
      // Inject standard facts & background as first system instruction
      // and then build structural chat turn sequences if history is present.
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          formattedContents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      
      // Add final prompt
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: WAQAR_FACT_SHEET,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I was unable to formulate a response. Please feel free to email Waqar directly at waqarhaidertufian@gmail.com!";

      // Log bot reply to database
      if (process.env.POSTGRES_URL) {
        try {
          await sql`
            INSERT INTO chat_logs (session_id, sender, message_text)
            VALUES (${sessionId || "unknown"}, 'bot', ${reply});
          `;
        } catch (dbErr) {
          console.error("Failed to log bot reply to database:", dbErr);
        }
      }

      res.json({ text: reply });

    } catch (error: any) {
      console.error("Gemini API backend error:", error);
      res.status(500).json({ error: error.message || "Something went wrong on the server." });
    }
  });

  // Serve static UI assets and handle React SPA fellback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started at http://localhost:${PORT}`);
  });
}

startServer();
