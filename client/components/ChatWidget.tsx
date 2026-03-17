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

const localFAQs = [
  {
    q: ["allergy", "allergies", "allergic"],
    a: "Allergy is a condition where the immune system reacts abnormally to substances that are normally harmless. Common allergens include pollen, dust mites, pet dander, certain foods, and insect stings. Symptoms can range from mild (sneezing, itching) to severe (breathing difficulties). Dr. Darshana specializes in allergy diagnosis and treatment. Would you like to book an appointment?",
  },
  {
    q: ["diabetes", "diabetic", "blood sugar", "sugar"],
    a: "Diabetes is a chronic condition that affects how your body processes blood sugar. Common symptoms include increased thirst, frequent urination, fatigue, and blurred vision. Dr. Darshana has 16+ years of experience in diabetes management. We offer free diabetes camps on the 1st and 3rd Tuesday of every month. Would you like more information or book an appointment?",
  },
  {
    q: ["fever", "febrile"],
    a: "Fever is usually a sign that your body is fighting an infection. It can be caused by viral or bacterial infections. Rest, hydration, and paracetamol can help. However, if fever persists for more than 3 days or is accompanied by severe symptoms, please consult a doctor. Call +91 8882 799799 to book an appointment.",
  },
  {
    q: ["cold", "cough", "flu"],
    a: "Cold, cough, and flu are common respiratory infections. Rest, plenty of fluids, and steam inhalation can help. If symptoms persist for more than a week or include breathing difficulty, please consult a doctor. Dr. Darshana specializes in respiratory care.",
  },
  {
    q: ["asthma", "breathing", "respiratory"],
    a: "Asthma is a chronic condition where the airways narrow and produce excess mucus, causing breathing difficulties. Dr. Darshana has expertise in respiratory care and offers allergy & asthma treatment. We conduct Allergy Check-ups on Monday & Thursday. Would you like to book an consultation?",
  },
  {
    q: ["blood pressure", "hypertension", "bp"],
    a: "High blood pressure (hypertension) often has no symptoms but can lead to serious health issues if untreated. Regular monitoring, low-salt diet, exercise, and medication help manage it. Dr. Darshana can help you manage blood pressure effectively. Call +91 8882 799799.",
  },
  {
    q: ["thyroid"],
    a: "Thyroid disorders affect the thyroid gland which regulates metabolism. Common issues include hypothyroidism (underactive) and hyperthyroidism (overactive). Symptoms vary but can include fatigue, weight changes, and mood swings. Dr. Darshana specializes in endocrinology. Would you like to book an appointment?",
  },
  {
    q: ["appointment", "book", "consultation", "schedule"],
    a: "To book an appointment with Dr. Darshana:\n\n📞 Call: +91 8882 799799\n\n🏥 Location: Altius Hospital, HBR Layout, Bangalore\n\n🕐 Timing: 9 AM - 12 PM & 3 PM - 5 PM (Closed Sunday)\n\nWould you like me to help you book an appointment?",
  },
  {
    q: ["timing", "hours", "open", "closed"],
    a: "Dr. Darshana's consultation hours:\n\n🏥 Altius Hospital, HBR Layout, Bangalore\n\n⏰ Morning: 9:00 AM - 12:00 PM\n⏰ Evening: 3:00 PM - 5:00 PM\n\n📅 Closed on Sunday\n\nCall +91 8882 799799 to book an appointment.",
  },
  {
    q: ["fee", "cost", "charges", "price"],
    a: "Dr. Darshana offers quality healthcare at affordable rates. Consultation fees are reasonable compared to other specialists. For accurate fee details, please call +91 8882 799799.",
  },
  {
    q: ["location", "address", "hospital"],
    a: "Dr. Darshana consults at:\n\n🏥 Altius Hospital\n📍 HBR Layout, Bangalore\n\nFor directions or to book an appointment, call +91 8882 799799.",
  },
  {
    q: ["who are you", "what are you", "chatbot", "assistant"],
    a: "I'm Dr. Darshana's AI assistant! I can help you with:\n\n• Health-related questions\n• Appointment bookings\n• Information about services\n\nHow can I assist you today?",
  },
];

const findLocalAnswer = (question: string): string | null => {
  const lowerQ = question.toLowerCase();
  for (const faq of localFAQs) {
    for (const keyword of faq.q) {
      if (lowerQ.includes(keyword)) {
        return faq.a;
      }
    }
  }
  return null;
};

const healthKeywords = [
  "symptom",
  "disease",
  "diagnosis",
  "treatment",
  "medicine",
  "drug",
  "cancer",
  "tumor",
  "stroke",
  "heart attack",
  "seizure",
  "paralysis",
  "pregnant",
  "abortion",
  "miscarriage",
  "fertility",
  "ivf",
  "hiv",
  "aids",
  "sex",
  "sexual",
  "std",
  "sti",
  "mental",
  "depression",
  "anxiety",
  "suicide",
  "psychiatrist",
  "kidney",
  "liver",
  "dialysis",
  "transplant",
  "surgery",
  "operation",
  "chemotherapy",
  "radiation",
  "prescription",
  " dosage",
  "side effect",
  "interaction",
  "medical advice",
  "should i",
  "do i need",
  "is it normal",
];

const isSeriousHealthQuestion = (question: string): boolean => {
  const lowerQ = question.toLowerCase();
  return healthKeywords.some((keyword) => lowerQ.includes(keyword));
};

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
      const localAnswer = findLocalAnswer(text);

      if (localAnswer) {
        const userMsg: Message = {
          id: Date.now().toString(),
          role: "user",
          content: text,
        };
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: localAnswer,
        };
        setMessages((prev) => [...prev, userMsg, botMsg]);
        setInput("");
        return;
      }

      if (isSeriousHealthQuestion(text)) {
        const userMsg: Message = {
          id: Date.now().toString(),
          role: "user",
          content: text,
        };
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "For specific medical concerns, I recommend consulting Dr. Darshana directly.\n\n📞 Call: +91 8882 799799\n🏥 Altius Hospital, HBR Layout\n\nFor general health tips, feel free to ask!",
        };
        setMessages((prev) => [...prev, userMsg, botMsg]);
        setInput("");
        return;
      }

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

      if (data.reply && !data.error) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const localAnswer = findLocalAnswer(text);
        if (localAnswer) {
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: localAnswer,
          };
          setMessages((prev) => [...prev, botMsg]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "assistant",
              content:
                "I can help with general health questions. For specific medical advice, please consult Dr. Darshana directly.\n\n📞 Call: +91 8882 799799\n🏥 Altius Hospital, HBR Layout",
            },
          ]);
        }
      }
    } catch (error) {
      const localAnswer = findLocalAnswer(text);
      if (localAnswer) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: localAnswer,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "I can help with general health questions. For specific medical advice, please consult Dr. Darshana directly.\n\n📞 Call: +91 8882 799799\n🏥 Altius Hospital, HBR Layout",
          },
        ]);
      }
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
