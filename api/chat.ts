import { GoogleGenAI } from "@google/genai";
import { sql } from "@vercel/postgres";

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
}

let dbInitialized = false;

async function initDb() {
  if (dbInitialized) return;
  try {
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
  } catch (error) {
    console.error("Failed to initialize chat_logs table:", error);
    throw error;
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
    const { message, history, sessionId } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Save user message to database if postgres connection exists
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

      // Save fallback response to database if postgres connection exists
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

      return res.status(200).json({ text: responseFallback });
    }

    const formattedContents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        formattedContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }
    
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

    // Save bot reply to database if postgres connection exists
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

    return res.status(200).json({ text: reply });

  } catch (error: any) {
    console.error("Gemini API backend error:", error);
    return res.status(500).json({ error: error.message || "Something went wrong on the server." });
  }
}
