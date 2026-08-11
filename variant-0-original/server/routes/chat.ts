import { RequestHandler } from "express";
import { generateContextPrompt } from "../../client/data/knowledgeBase";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 20;

function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function isValidRole(role: string): boolean {
  return role === "user" || role === "assistant";
}

async function searchWeb(query: string): Promise<string> {
  try {
    // Try Tavily first
    const tavilyKey = process.env.TAVILY_API_KEY || process.env.SEARCH_API_KEY;
    if (tavilyKey) {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: tavilyKey,
          query: query,
          max_results: 5,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.results && Array.isArray(data.results)) {
          return data.results
            .slice(0, 3)
            .map(
              (r: { title?: string; content?: string }) =>
                `${r.title}: ${r.content?.slice(0, 300) || ""}`,
            )
            .join("\n\n");
        }
      }
    }

    return "";
  } catch (error) {
    console.error("Search error:", error);
    return "";
  }
}

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    if (!apiKey) {
      return res.status(503).json({
        reply:
          "I'm currently unavailable. Please call +91 8882 799799 for assistance.",
      });
    }

    const body = req.body;
    let { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid request" });
    }

    message = sanitizeInput(message);

    if (!message) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (!Array.isArray(history)) {
      history = [];
    }

    history = history
      .filter(
        (m: { role?: string; content?: string }) =>
          m && m.role && m.content && typeof m.content === "string",
      )
      .slice(-MAX_HISTORY_LENGTH)
      .map((m: { role?: string; content?: string }) => ({
        role: isValidRole(m.role || "user") ? m.role : "user",
        content: sanitizeInput(m.content || ""),
      }));

    const isHealthQuery =
      /\b(symptom| disease| illness| health| medicine| drug| treatment| cause| diagnosis| prevent| cure| fever| cough| pain| diabetes| blood pressure| sugar| cholesterol| vitamin| nutrition| exercise| diet| weight| infection|virus|bacteria|fungal|allergy|asthma|cancer|heart|liver|kidney|thyroid|hormone|pregnancy|pregnant|child|baby|elderly|senior|injury|burn|cut|fracture|sprain|headache|migraine|nausea|vomit|diarrhea|constipation|breathing|breath|sleep|insomnia|depression|anxiety|stress)\b/i.test(
        message,
      );

    let searchResults = "";
    if (isHealthQuery) {
      searchResults = await searchWeb(message);
    }

    const contextPrompt = generateContextPrompt(message, searchResults);

    const messages: { role: string; content: string }[] = [
      { role: "system", content: contextPrompt },
      ...history,
      { role: "user", content: message },
    ];

    const response = await fetch(
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
          temperature: 0.3,
          max_tokens: 600,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("AI service error");
    }

    const data = await response.json();
    let reply =
      data.choices[0]?.message?.content ||
      "Sorry, I could not process your request.";

    reply = sanitizeInput(reply);

    return res.json({
      reply,
      success: true,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return res.status(500).json({
      reply:
        "I apologize, but I'm experiencing technical difficulties. Please call +91 8882 799799 for immediate assistance or try again later.",
      success: false,
    });
  }
};
