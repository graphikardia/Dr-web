import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    if (!apiKey) {
      return response.status(503).json({
        reply:
          "Service unavailable. Please call +91 8882 799799 for assistance.",
      });
    }

    const { message, history = [] } = request.body;

    if (!message || typeof message !== "string") {
      return response.status(400).json({ error: "Invalid request" });
    }

    const sanitizedMessage = message
      .replace(/<[^>]*>/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .trim()
      .slice(0, 1000);

    const systemPrompt = `You are Dr. Darshana's AI Assistant for her medical practice in Bangalore, India.

CRITICAL RULES:
1. Answer questions about Dr. Darshana's practice accurately
2. For health questions, provide general information only
3. Always recommend consulting a doctor for specific medical advice
4. Be friendly, professional, and helpful

DR. DARSHANA'S INFO:
- Senior Consultant — Internal Medicine & Diabetologist
- 16+ Years Experience
- Location: Altius Hospital, HBR Layout, Bangalore
- Phone: +91 8882 799799
- Timing: 9 AM - 12 PM & 3 PM - 5 PM (Closed Sunday)
- Specializations: General Medicine, Diabetology, Respiratory Care, Allergy & Asthma, Endocrinology

Always end with a friendly note and offer to help further.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history
        .slice(-10)
        .map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: sanitizedMessage },
    ];

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      },
    );

    if (!groqResponse.ok) {
      throw new Error("AI service error");
    }

    const data = await groqResponse.json();
    const reply =
      data.choices[0]?.message?.content ||
      "Sorry, I could not process your request.";

    return response.json({ reply, success: true });
  } catch (error) {
    console.error("Chat API Error:", error);
    return response.status(500).json({
      reply:
        "I apologize for the inconvenience. Please call +91 8882 799799 for assistance.",
    });
  }
}
