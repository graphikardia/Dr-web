import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type CollectionStep = "name" | "phone" | "reason" | "done";

const GOOGLE_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXX";

const saveLeadToSheet = async (data: {
  name: string;
  phone: string;
  reason: string;
}) => {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors" as RequestMode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: "chatbot" }),
    });
  } catch (e) {
    console.error("Failed to save lead:", e);
  }
};

const specialties = [
  "General Medicine",
  "Diabetology",
  "Respiratory Care",
  "Allergy & Asthma",
  "Endocrinology",
  "Other",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [collectionStep, setCollectionStep] = useState<CollectionStep>("name");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    reason: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcomeMessage =
    "Namaste! 🙏 I'm Dr. Darshana's virtual assistant. I'm here to help you with appointments, consultations, and any questions about our services.\n\nMay I know your good name?";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: "1", role: "assistant", content: welcomeMessage }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNameSubmit = async (name: string) => {
    const updatedData = { ...userData, name };
    setUserData(updatedData);
    setCollectionStep("phone");

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: name },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Nice to meet you, ${name}! 📱\n\nCould you please share your mobile number?`,
      },
    ]);
  };

  const handlePhoneSubmit = async (phone: string) => {
    const updatedData = { ...userData, phone };
    setUserData(updatedData);
    setCollectionStep("reason");

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: phone },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thank you! 📋\n\nWhat is the reason for your visit? (e.g., diabetes checkup, general consultation, allergy issues, etc.)`,
      },
    ]);
  };

  const handleReasonSubmit = async (reason: string) => {
    const updatedData = { ...userData, reason };
    setUserData(updatedData);
    setCollectionStep("done");

    // Save lead to Google Sheets
    saveLeadToSheet({
      name: userData.name,
      phone: userData.phone,
      reason: reason,
    });

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: reason },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thank you for sharing, ${userData.name}! ✅\n\nOur team will contact you at ${userData.phone} shortly to confirm your appointment.\n\nIs there anything else you'd like to know about Dr. Darshana's services?`,
      },
    ]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (collectionStep === "name") {
      handleNameSubmit(text);
      setInput("");
      return;
    }
    if (collectionStep === "phone") {
      handlePhoneSubmit(text);
      setInput("");
      return;
    }
    if (collectionStep === "reason") {
      handleReasonSubmit(text);
      setInput("");
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Sorry, please call +91 8882 799799 for immediate assistance.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (collectionStep === "name") return "Your name please...";
    if (collectionStep === "phone") return "Your mobile number...";
    if (collectionStep === "reason") return "Reason for visit...";
    return "Ask me anything...";
  };

  const getProgressText = () => {
    if (collectionStep === "name") return "Step 1 of 3";
    if (collectionStep === "phone") return "Step 2 of 3";
    if (collectionStep === "reason") return "Step 3 of 3";
    return "";
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[99998] w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-pulse"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "380px",
            maxWidth: "calc(100vw - 40px)",
            height: "520px",
            maxHeight: "calc(100vh - 120px)",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 99999,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.3)",
                overflow: "hidden",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <span className="text-white text-lg font-bold">D</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ color: "white", fontSize: "16px", fontWeight: 600 }}
              >
                Dr. Darshana's Assistant
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                }}
              >
                Internal Medicine & Diabetology
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "5px",
                fontSize: "18px",
                opacity: 0.8,
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          {collectionStep !== "done" && (
            <div
              style={{
                background: "#f0fdfa",
                padding: "8px 18px",
                fontSize: "12px",
                color: "#0d9488",
                fontWeight: 600,
                borderBottom: "1px solid #ccfbf1",
              }}
            >
              {getProgressText()}
            </div>
          )}

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              background: "#f8fafc",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  maxWidth: "85%",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  background: msg.role === "user" ? "#0d9488" : "white",
                  color: msg.role === "user" ? "white" : "#334155",
                  border:
                    msg.role === "assistant" ? "1px solid #e2e8f0" : "none",
                  borderBottomLeftRadius:
                    msg.role === "assistant" ? "4px" : "16px",
                  borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                  boxShadow:
                    msg.role === "assistant"
                      ? "0 1px 3px rgba(0,0,0,0.08)"
                      : "none",
                }}
              >
                {msg.content.split("\n").map((line, i) => (
                  <p
                    key={i}
                    style={{
                      margin: i > 0 ? "6px 0 0" : 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    animation: "bounce 1s infinite",
                    margin: "0 2px",
                    color: "#0d9488",
                  }}
                >
                  •
                </span>
                <span
                  style={{
                    animation: "bounce 1s infinite 0.2s",
                    margin: "0 2px",
                    color: "#0d9488",
                  }}
                >
                  •
                </span>
                <span
                  style={{
                    animation: "bounce 1s infinite 0.4s",
                    margin: "0 2px",
                    color: "#0d9488",
                  }}
                >
                  •
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Specialty Buttons */}
          {collectionStep === "reason" && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                padding: "12px",
                background: "white",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => handleReasonSubmit(specialty)}
                  style={{
                    padding: "8px 14px",
                    background: "#f0fdfa",
                    color: "#0d9488",
                    border: "1px solid #0d9488",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#0d9488";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#f0fdfa";
                    e.currentTarget.style.color = "#0d9488";
                  }}
                >
                  {specialty}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "14px",
              background: "white",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <input
              type={collectionStep === "phone" ? "tel" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={getPlaceholder()}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "1px solid #cbd5e1",
                borderRadius: "24px",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: "44px",
                height: "44px",
                background: "#0d9488",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Quick Actions */}
          {collectionStep === "done" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                padding: "12px",
                background: "white",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <a
                href="tel:+918882799799"
                style={{
                  fontSize: "13px",
                  color: "#0d9488",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="/contact"
                style={{
                  fontSize: "13px",
                  color: "#0d9488",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Book Appointment
              </a>
            </div>
          )}

          <style>{`
            @keyframes bounce {
              0%, 60%, 100% { transform: translateY(0); }
              30% { transform: translateY(-4px); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
