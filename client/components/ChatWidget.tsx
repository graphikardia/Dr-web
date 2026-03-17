"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Loader2,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type CollectionStep = "greeting" | "name" | "phone" | "reason" | "done";

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

const isValidIndianMobile = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const withCode = cleaned.startsWith("+91") ? cleaned : cleaned;
  const numberPart = withCode.replace("+91", "");
  return /^[6-9]\d{9}$/.test(numberPart);
};

const formatIndianMobile = (phone: string): string => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const numberPart = cleaned.startsWith("+91")
    ? cleaned.slice(3)
    : cleaned.startsWith("91")
      ? cleaned.slice(2)
      : cleaned;
  return numberPart;
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
  const [collectionStep, setCollectionStep] =
    useState<CollectionStep>("greeting");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    reason: "",
  });
  const [showSpecialtyButtons, setShowSpecialtyButtons] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcomeMessage =
    "Namaste! 🙏 I'm Dr. Darshana's AI assistant. I'm here to help you with:\n\n• Health-related questions\n• Appointment bookings\n• General inquiries\n\nHow can I help you today?";

  const askForNameMessage = "May I know your name?";

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
        content: `Nice to meet you, ${name}! 📱\n\nCould you please share your 10-digit mobile number? (e.g., 9876543210)`,
      },
    ]);
  };

  const handlePhoneSubmit = async (phone: string) => {
    if (!isValidIndianMobile(phone)) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", content: phone },
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)`,
        },
      ]);
      return;
    }

    const formattedPhone = formatIndianMobile(phone);
    const updatedData = { ...userData, phone: formattedPhone };
    setUserData(updatedData);
    setCollectionStep("reason");
    setShowSpecialtyButtons(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: phone },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thank you! 📋\n\nWhat is the reason for your visit? You can select from the options below or type your reason.`,
      },
    ]);
  };

  const handleReasonSubmit = async (reason: string) => {
    const updatedData = { ...userData, reason };
    setUserData(updatedData);
    setCollectionStep("done");
    setShowSpecialtyButtons(false);

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
        content: `Thank you, ${userData.name}! ✅\n\nOur team will contact you at +91 ${userData.phone} shortly.\n\nIs there anything else I can help you with?`,
      },
    ]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (collectionStep === "greeting") {
      setCollectionStep("name");
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", content: text },
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: askForNameMessage,
        },
      ]);
      setInput("");
      return;
    }

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
          content: "Sorry, please call +91 8882 799799 for assistance.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (collectionStep === "greeting") return "Ask me anything...";
    if (collectionStep === "name") return "Your name...";
    if (collectionStep === "phone") return "10-digit mobile number...";
    if (collectionStep === "reason") return "Reason for visit...";
    return "Type your message...";
  };

  const getProgressText = () => {
    if (collectionStep === "greeting") return "💬 Free Chat";
    if (collectionStep === "name") return "Step 1 of 3";
    if (collectionStep === "phone") return "Step 2 of 3";
    if (collectionStep === "reason") return "Step 3 of 3";
    return "";
  };

  const skipBooking = () => {
    setCollectionStep("done");
    setShowSpecialtyButtons(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: "Skip booking" },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `No problem! Feel free to ask me any health-related questions or let me know if you need help with anything else.`,
      },
    ]);
  };

  return (
    <>
      {/* Floating Button - Chat with AI-Doc */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[99998] flex items-center gap-3 bg-gradient-to-r from-primary to-[#1a3a5c] px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 border-2 border-white"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white" />
          </div>
          <span className="text-white font-semibold text-sm whitespace-nowrap">
            Chat with AI-Doc
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-[99999] w-[380px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[560px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-[#1a3a5c] px-5 py-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <span className="text-white text-xl font-bold">DR</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-base">
                Dr. Darshana Reddy
              </h3>
              <p className="text-white/70 text-xs">
                Internal Medicine & Diabetology
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Progress */}
          <div className="bg-amber-50 px-5 py-2 text-xs font-medium text-amber-700 flex items-center justify-between">
            <span>{getProgressText()}</span>
            {collectionStep === "done" && <span>✅ Booked</span>}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-primary to-[#1a3a5c] text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Specialty Buttons */}
          {collectionStep === "reason" && showSpecialtyButtons && (
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2 font-medium">
                Select reason for visit:
              </p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => handleReasonSubmit(specialty)}
                    className="px-3 py-2 bg-primary/5 hover:bg-accent hover:text-white text-primary text-xs font-semibold rounded-full border border-primary/20 hover:border-accent transition-all duration-200 shadow-sm"
                  >
                    {specialty}
                  </button>
                ))}
              </div>
              <button
                onClick={skipBooking}
                className="mt-2 text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Skip for now
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
            <input
              type={collectionStep === "phone" ? "tel" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={getPlaceholder()}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="w-12 h-12 bg-gradient-to-r from-accent to-[#e65a2a] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-center gap-6">
              <a
                href="tel:+918882799799"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="/contact"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 bg-gradient-to-r from-primary to-[#1a3a5c] text-center">
            <p className="text-white/60 text-xs">
              Powered by AI • Not for emergencies
            </p>
          </div>
        </div>
      )}
    </>
  );
}
