const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 4000;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_MODEL = process.env.HUGGINGFACE_MODEL || "meta-llama/Meta-Llama-3-8B-Instruct";

if (!HUGGINGFACE_API_KEY) {
  console.warn("[HuggingFace] Missing HUGGINGFACE_API_KEY. Create a .env file with your token before starting the server.");
}

const SYSTEM_PROMPT = `You are Blue Peak AI, the virtual assistant for Blue Peak Web-Solutions founded by brothers Felix Mngola Onyango and Andrew Mwandoe Onyango. \n
- Always speak in a helpful, friendly, and professional tone.\n
- Use the information below as ground truth when possible.\n
- Pricing: Modern websites $280 – $400 (2–4 weeks, includes responsive design, CMS handover, on-page SEO); E-commerce $6,500 – $18,000; Custom web apps $9,500 – $28,000; Mobile apps $12,000 – $32,000; SEO & Growth $850 – $2,400/mo; Branding $1,400 – $6,500. Mention timelines and ongoing care when relevant.\n
- Services: web development, e-commerce, custom applications, mobile apps, branding/UI, SEO & growth marketing, cloud solutions, cybersecurity, IT consulting.\n
- Company: Global remote agency based in Kenya. Contact emails bluepeakw@gmail.com, phones +254 115 034 956 (Felix Mngola Onyango) and +254 115 138 594 (Andrew Mwandoe Onyango).\n
- If you lack information, guide the user to share project scope so a tailored quote can be prepared.`;

const buildPrompt = (message, history = []) => {
  const trimmedHistory = history
    .slice(-6)
    .map((entry) => {
      const role = entry.type === "user" ? "User" : "Assistant";
      return `${role}: ${entry.text}`;
    })
    .join("\n");

  return [
    SYSTEM_PROMPT,
    "Conversation so far:",
    trimmedHistory || "(No prior conversation)",
    `User: ${message}`,
    "Assistant:"
  ].join("\n\n");
};

app.get("/health", (_req, res) => {
  res.json({ status: "ok", model: HUGGINGFACE_MODEL });
});

app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A user message is required." });
  }

  if (!HUGGINGFACE_API_KEY) {
    return res.status(500).json({ error: "Hugging Face API key is not configured on the server." });
  }

  const prompt = buildPrompt(message, history);

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${encodeURIComponent(HUGGINGFACE_MODEL)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.4,
          top_p: 0.9,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[HuggingFace] API error", response.status, errorText);
      return res.status(response.status).json({ error: "Hugging Face API error", detail: errorText });
    }

    const data = await response.json();
    let reply = "I’m sorry, I couldn’t craft a response right now.";

    if (Array.isArray(data)) {
      const generated = data[0]?.generated_text || data[0]?.text;
      if (generated) {
        reply = generated.trim();
      }
    } else if (typeof data === "object" && data.generated_text) {
      reply = data.generated_text.trim();
    }

    res.json({ reply });
  } catch (error) {
    console.error("[HuggingFace] Unexpected error", error);
    res.status(500).json({ error: "Failed to contact Hugging Face.", detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Hugging Face proxy server listening on port ${PORT}`);
});
