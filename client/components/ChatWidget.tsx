"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Loader2,
  Calendar,
  ArrowDown,
  Sparkles,
  ChevronDown,
  Minimize2,
  RotateCcw,
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  Clock,
  MapPin,
} from "lucide-react";
import { SITE, LEGAL_PATHS } from "@/data/site";
import { submitLead } from "@/data/leads";
import { OBESITY_CLINIC } from "@/data/obesityClinic";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  at: number;
}

type CollectionStep = "greeting" | "name" | "phone" | "reason" | "done";

const PHONE_HELP = `${SITE.phoneSecondaryDisplay} (front office) or ${SITE.phonePrimaryDisplay}`;

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
    a: `Fever is usually a sign that your body is fighting an infection. It can be caused by viral or bacterial infections. Rest, hydration, and paracetamol can help. However, if fever persists for more than 3 days or is accompanied by severe symptoms, please consult a doctor. Call ${PHONE_HELP} to book an appointment.`,
  },
  {
    q: ["cold", "cough", "flu"],
    a: "Cold, cough, and flu are common respiratory infections. Rest, plenty of fluids, and steam inhalation can help. If symptoms persist for more than a week or include breathing difficulty, please consult a doctor. Dr. Darshana specializes in respiratory care.",
  },
  {
    q: ["asthma", "breathing", "respiratory"],
    a: "Asthma is a chronic condition where the airways narrow and produce excess mucus, causing breathing difficulties. Dr. Darshana has expertise in respiratory care and offers allergy & asthma treatment. We conduct Allergy Check-ups on Monday & Thursday. Would you like to book a consultation?",
  },
  {
    q: ["blood pressure", "hypertension", "bp"],
    a: `High blood pressure (hypertension) often has no symptoms but can lead to serious health issues if untreated. Regular monitoring, low-salt diet, exercise, and medication help manage it. Dr. Darshana can help you manage blood pressure effectively. Call ${PHONE_HELP}.`,
  },
  {
    q: ["thyroid"],
    a: "Thyroid disorders affect the thyroid gland which regulates metabolism. Common issues include hypothyroidism (underactive) and hyperthyroidism (overactive). Symptoms vary but can include fatigue, weight changes, and mood swings. Dr. Darshana specializes in endocrinology. Would you like to book an appointment?",
  },
  {
    q: ["obesity", "overweight", "weight loss", "weight gain", "bmi", "metabolic"],
    a: `Dr. Darshana is a Harvard Certified Obesity Specialist and runs a dedicated Obesity Clinic for medical weight management.\n\nWhen: ${OBESITY_CLINIC.daysLabel}\nTiming: ${OBESITY_CLINIC.sessionsLabel}\nWhere: ${OBESITY_CLINIC.venue}\n\nThe clinic covers hormonal and metabolic assessment, nutrition and activity planning, and ongoing follow-up on weight-loss medicines. Call ${PHONE_HELP} or book online to reserve a slot.`,
  },
  {
    q: ["appointment", "book", "consultation", "schedule"],
    a: `To book an appointment with Dr. Darshana:\n\nCall: ${PHONE_HELP}\n\nLocation: ${SITE.hospitalName}, HBR Layout, Bangalore\n\nGeneral timing: 9 AM - 12 PM & 3 PM - 5 PM (closed Sunday)\n\nObesity Clinic: ${OBESITY_CLINIC.daysLabel}, ${OBESITY_CLINIC.sessionsLabel}\n\nWould you like me to help you book an appointment?`,
  },
  {
    q: ["timing", "hours", "open", "closed"],
    a: `Dr. Darshana's consultation hours:\n\n${SITE.hospitalName}, HBR Layout, Bangalore\n\nMorning: 9:00 AM - 12:00 PM\nEvening: 3:00 PM - 5:00 PM\n\nClosed on Sunday\n\nObesity Clinic: ${OBESITY_CLINIC.daysLabel}\nAllergy Clinic: Monday & Thursday\n\nCall ${PHONE_HELP} to book an appointment.`,
  },
  {
    q: ["fee", "cost", "charges", "price"],
    a: `Dr. Darshana offers quality healthcare at affordable rates. Consultation fees are reasonable compared to other specialists. For accurate fee details, please call ${PHONE_HELP}.`,
  },
  {
    q: ["location", "address", "hospital"],
    a: `Dr. Darshana consults at:\n\n${SITE.hospitalName}\nHBR Layout, Bangalore\n\nFor directions or to book an appointment, call ${PHONE_HELP}.`,
  },
  {
    q: ["who are you", "what are you", "chatbot", "assistant"],
    a: "I'm Dr. Darshana's AI assistant. I can help you with health-related questions, appointment bookings and general information about the clinic. For anything clinical, please speak to Dr. Darshana directly.",
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

const ESCALATION_TEXT = `For anything specific to your condition, I'd recommend speaking with Dr. Darshana directly rather than relying on a chat assistant.\n\nCall ${PHONE_HELP}\n${SITE.hospitalName}, HBR Layout, Bangalore\n\nI'm happy to help with general health information in the meantime.`;

const FALLBACK_TEXT = `I can help with general health questions, clinic timings and bookings. For specific medical advice, please consult Dr. Darshana directly.\n\nCall ${PHONE_HELP}\n${SITE.hospitalName}, HBR Layout, Bangalore`;

const WELCOME_TEXT = "Namaste! I'm Dr. Darshana's AI assistant. I can answer health questions, share clinic timings, or book you an appointment. What would you like to do?";

const saveLeadToSheet = async (data: {
  name: string;
  phone: string;
  reason: string;
}) => {
  try {
    await submitLead("chatbot", {
      name: data.name,
      phone: data.phone,
      reason: data.reason,
      page: window.location.pathname,
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
  "Obesity & Weight Management",
  "General Medicine",
  "Diabetology",
  "Respiratory Care",
  "Allergy & Asthma",
  "Endocrinology",
  "Other",
];

const QUICK_REPLIES = [
  // "Book an appointment" jumps straight into the flow; asking it as free text
  // would just match the booking FAQ and print the phone number instead.
  { label: "Book an appointment", text: "Book an appointment", icon: Calendar, startsBooking: true },
  { label: "Clinic timings", text: "What are the clinic timings?", icon: Clock, startsBooking: false },
  { label: "Obesity clinic", text: "Tell me about the obesity clinic", icon: HeartPulse, startsBooking: false },
  { label: "Doctor's fee", text: "What is the consultation fee?", icon: Stethoscope, startsBooking: false },
];

const STEP_ORDER: CollectionStep[] = ["name", "phone", "reason"];
const STEP_META: Record<string, { label: string; hint: string }> = {
  name: { label: "Your name", hint: "So we know who to greet" },
  phone: { label: "Mobile number", hint: "For call-back confirmation" },
  reason: { label: "Reason for visit", hint: "Helps us route you faster" },
};

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

/** Turns `**bold**` spans into <strong> elements. */
const formatInline = (text: string) =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );

/** Renders a single non-bullet line as a paragraph. */
const renderLine = (line: string, key: number) => (
  <p key={key} className="whitespace-pre-wrap">
    {formatInline(line)}
  </p>
);

function ChatBubble({
  msg,
  grouped,
  showTime,
}: {
  msg: Message;
  /** The previous message came from the same speaker. */
  grouped: boolean;
  /** This is the last message of a run from the same speaker. */
  showTime: boolean;
}) {
  const lines = msg.content.split("\n");
  const hasBullets = lines.some((l) => /^[-•]\s+/.test(l));
  const hasText = lines.some((l) => l.trim() && !/^[-•]\s+/.test(l));
  const isUser = msg.role === "user";

  return (
    <div
      className={cn(
        "flex animate-slide-up",
        isUser ? "justify-end" : "justify-start",
        grouped ? "mt-0.5" : "mt-2.5",
      )}
    >
      {/* Reserve the avatar column on every assistant bubble so the text edge
          stays aligned, but only draw the face on the first of a run. */}
      <div className={cn("w-7 flex-shrink-0", isUser && "hidden")}>
        {!isUser && !grouped && (
          <span
            aria-hidden="true"
            className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
          >
            DR
          </span>
        )}
      </div>

      <div
        className={cn(
          "group/bubble max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-gray-100 bg-white text-gray-700",
          grouped && (isUser ? "rounded-tr-md" : "rounded-tl-md"),
        )}
      >
        {hasBullets ? (
          <ul className="flex flex-col gap-1.5">
            {lines
              .filter((l) => l.trim())
              .map((l, i) =>
                /^[-•]\s+/.test(l) ? (
                  <li key={i} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                    />
                    <span className="min-w-0">{formatInline(l.replace(/^[-•]\s+/, ""))}</span>
                  </li>
                ) : (
                  <li key={i} className="whitespace-pre-wrap">
                    {formatInline(l)}
                  </li>
                ),
              )}
          </ul>
        ) : hasText ? (
          <div className="flex flex-col gap-1.5">
            {lines.map((l, i) => (l.trim() ? renderLine(l, i) : null))}
          </div>
        ) : null}

        {/* No hover to reveal this on touch, so the last bubble of a run always
            shows its time; the rest reveal it on hover on pointer devices. */}
        <time
          className={cn(
            "mt-1.5 block text-[10px] tabular-nums transition-opacity",
            isUser ? "text-primary-foreground/60" : "text-gray-400",
            showTime ? "opacity-100" : "opacity-0 group-hover/bubble:opacity-70",
          )}
          dateTime={new Date(msg.at).toISOString()}
        >
          {formatTime(msg.at)}
        </time>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start gap-2.5">
      <div
        aria-hidden="true"
        className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
      >
        DR
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3.5 shadow-sm">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
        <span className="sr-only">Assistant is typing</span>
      </div>
    </div>
  );
}

interface ChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChatWidget({ open, onOpenChange }: ChatWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
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
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushMessages = useCallback(
    (
      incoming: { role: "user" | "assistant"; content: string }[],
    ) => {
      const base = Date.now();
      setMessages((prev) => [
        ...prev,
        ...incoming.map((m, i) => ({
          id: `${base}-${i}-${Math.random().toString(36).slice(2, 7)}`,
          role: m.role,
          content: m.content,
          at: base + i,
        })),
      ]);
    },
    [],
  );

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  /** Clears the transcript and every step of the booking flow back to the start. */
  const restart = useCallback(() => {
    setMessages([
      { id: `welcome-${Date.now()}`, role: "assistant", content: WELCOME_TEXT, at: Date.now() },
    ]);
    setCollectionStep("greeting");
    setUserData({ name: "", phone: "", reason: "" });
    setShowSpecialtyButtons(false);
    setShowDisclaimer(false);
    setInput("");
    setAtBottom(true);
    scrollToBottom("auto");
  }, [scrollToBottom]);

  const stepIndex = STEP_ORDER.indexOf(collectionStep);
  const isBooking = stepIndex >= 0;
  const stepMeta = isBooking ? STEP_META[collectionStep] : null;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { id: "welcome", role: "assistant", content: WELCOME_TEXT, at: Date.now() },
      ]);
    }
  }, [open]);

  useEffect(() => {
    if (atBottom) scrollToBottom();
  }, [messages, loading, atBottom, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, isMinimized]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    setAtBottom(distance < 60);
  };

  const handleNameSubmit = (name: string) => {
    setUserData((prev) => ({ ...prev, name }));
    setCollectionStep("phone");

    pushMessages([
      { role: "user", content: name },
      {
        role: "assistant",
        content: `Nice to meet you, ${name}!\n\nCould you share your 10-digit mobile number? I'll use it only to confirm your appointment.`,
      },
    ]);
  };

  const handlePhoneSubmit = async (phone: string) => {
    if (!isValidIndianMobile(phone)) {
      pushMessages([
        { role: "user", content: phone },
        {
          role: "assistant",
          content:
            "That doesn't look like a valid 10-digit Indian mobile number. It should start with 6, 7, 8 or 9 - for example 9876543210.",
        },
      ]);
      return;
    }

    const formattedPhone = formatIndianMobile(phone);
    setUserData((prev) => ({ ...prev, phone: formattedPhone }));
    setCollectionStep("reason");
    setShowSpecialtyButtons(true);

    pushMessages([
      { role: "user", content: phone },
      {
        role: "assistant",
        content: "Thank you. What is the reason for your visit? Pick one below, or type it out.",
      },
    ]);
  };

  const handleReasonSubmit = (reason: string) => {
    const lead = { ...userData, reason };
    setUserData(lead);
    setCollectionStep("done");
    setShowSpecialtyButtons(false);

    saveLeadToSheet({
      name: lead.name,
      phone: lead.phone,
      reason,
    });

    pushMessages([
      { role: "user", content: reason },
      {
        role: "assistant",
        content: `Thank you, ${lead.name}. Our team will call you on +91 ${lead.phone} shortly to confirm your slot.\n\nIs there anything else I can help you with?`,
      },
    ]);
  };

  /** Enters the 3-step collection flow. `lead` is an optional user message to
   *  record first, so a quick-reply chip can jump straight into booking. */
  const beginBooking = useCallback(
    (lead?: string) => {
      setCollectionStep("name");
      pushMessages([
        ...(lead ? [{ role: "user" as const, content: lead }] : []),
        {
          role: "assistant" as const,
          content: "Happy to help you book. May I know your name?",
        },
      ]);
    },
    [pushMessages],
  );

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput("");

    if (collectionStep === "name") return handleNameSubmit(trimmed);
    if (collectionStep === "phone") return handlePhoneSubmit(trimmed);
    if (collectionStep === "reason") return handleReasonSubmit(trimmed);

    if (collectionStep === "greeting") {
      const localAnswer = findLocalAnswer(trimmed);

      if (localAnswer) {
        return pushMessages([
          { role: "user", content: trimmed },
          { role: "assistant", content: localAnswer },
        ]);
      }

      if (isSeriousHealthQuestion(trimmed)) {
        return pushMessages([
          { role: "user", content: trimmed },
          { role: "assistant", content: ESCALATION_TEXT },
        ]);
      }

      // Anything else is taken as the start of a booking request.
      beginBooking(trimmed);
    }

    pushMessages([{ role: "user", content: trimmed }]);
    setLoading(true);

    const history = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json();

      if (data.reply && !data.error) {
        pushMessages([{ role: "assistant", content: data.reply }]);
      } else {
        pushMessages([
          {
            role: "assistant",
            content: findLocalAnswer(trimmed) ?? FALLBACK_TEXT,
          },
        ]);
      }
    } catch {
      pushMessages([
        {
          role: "assistant",
          content: findLocalAnswer(trimmed) ?? FALLBACK_TEXT,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (collectionStep === "name") return "Your name...";
    if (collectionStep === "phone") return "10-digit mobile number...";
    if (collectionStep === "reason") return "Reason for visit...";
    return "Ask about symptoms, timings or booking...";
  };

  const skipBooking = () => {
    setCollectionStep("done");
    setShowSpecialtyButtons(false);
    pushMessages([
      { role: "user", content: "Skip booking" },
      {
        role: "assistant",
        content:
          "No problem. Feel free to ask me any health-related questions, or call the clinic if you'd rather speak to someone.",
      },
    ]);
  };

  return (
    <>
      {/* ── Launcher ─────────────────────────────────────────────────────── */}
      {!open && (
        <button
          onClick={() => onOpenChange(true)}
          aria-label="Open chat with Dr. Darshana's AI assistant"
          className="group fixed bottom-24 right-5 z-[99998] flex items-center gap-2.5 rounded-full border border-white/20 bg-primary py-3 pl-4 pr-5 text-white shadow-2xl shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:bottom-6 md:right-6"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
          </span>
          <span className="text-sm font-semibold">Chat with AI-Doc</span>
        </button>
      )}

      {/* ── Panel ────────────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Chat with Dr. Darshana's AI assistant"
          className={cn(
            "fixed z-[99999] flex w-[calc(100vw-2rem)] flex-col overflow-hidden border border-gray-200/70 bg-white shadow-2xl shadow-primary/20",
            "inset-x-4 bottom-4 rounded-2xl sm:inset-x-auto sm:right-6 sm:w-[390px]",
            "max-h-[min(640px,calc(100dvh-7.5rem))] animate-slide-up",
            "md:bottom-6 md:max-h-[min(640px,calc(100vh-6rem))]",
            isMinimized && "sm:w-[300px]",
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
            <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold ring-1 ring-white/25">
              DR
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-primary" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                Dr. Darshana Reddy
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-primary-foreground/70">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                AI assistant · replies instantly
              </p>
            </div>

            <button
              onClick={restart}
              aria-label="Start a new conversation"
              title="Start over"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsMinimized((m) => !m)}
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Booking progress */}
          {collectionStep === "done" ? (
            <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              Request received — our team will call you shortly
            </div>
          ) : isBooking && stepMeta ? (
            <div className="border-b border-gray-100 bg-gray-50/80 px-4 py-3">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="text-primary">
                  Step {stepIndex + 1} of {STEP_ORDER.length} · {stepMeta.label}
                </span>
                <span className="text-muted-foreground">{stepMeta.hint}</span>
              </div>
              <div className="mt-2 flex gap-1.5" aria-hidden="true">
                {STEP_ORDER.map((step, i) => (
                  <span
                    key={step}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-500",
                      i <= stepIndex ? "bg-accent" : "bg-gray-200",
                    )}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Messages */}
          {!isMinimized && (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              aria-live="polite"
              aria-relevant="additions"
              className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain bg-muted/40 px-4 py-4"
            >
              {messages.map((msg, i) => {
                const prev = messages[i - 1];
                const next = messages[i + 1];
                return (
                  <ChatBubble
                    key={msg.id}
                    msg={msg}
                    grouped={prev?.role === msg.role}
                    showTime={next?.role !== msg.role}
                  />
                );
              })}
              {loading && <TypingIndicator />}

              {/* Quick replies stay up for the whole question phase, so someone
                  who typed their own question can still pivot without retyping. */}
              {collectionStep === "greeting" && !loading && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {QUICK_REPLIES.map((reply) => {
                    const Icon = reply.icon;
                    return (
                      <button
                        key={reply.label}
                        onClick={() =>
                          reply.startsBooking
                            ? beginBooking(reply.text)
                            : sendMessage(reply.text)
                        }
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left text-xs font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md"
                      >
                        <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        <span className="min-w-0 leading-tight">{reply.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Scroll to latest */}
          {!isMinimized && !atBottom && messages.length > 1 && (
            <div className="relative">
              <button
                onClick={() => {
                  scrollToBottom();
                  setAtBottom(true);
                }}
                className="absolute -top-11 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-lg transition-transform hover:scale-105"
                aria-label="Scroll to latest message"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Reason chips */}
          {!isMinimized && collectionStep === "reason" && showSpecialtyButtons && (
            <div className="border-t border-gray-100 bg-white px-4 py-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Reason for visit
              </p>
              <div className="flex flex-wrap gap-1.5">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => handleReasonSubmit(specialty)}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    {specialty}
                  </button>
                ))}
              </div>
              <button
                onClick={skipBooking}
                className="mt-2.5 text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
              >
                Skip for now
              </button>
            </div>
          )}

          {/* Post-booking actions */}
          {!isMinimized && collectionStep === "done" && (
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 bg-white px-4 py-3">
              <a
                href={`tel:${SITE.phoneSecondary}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Call front office
              </a>
              <Link
                to={OBESITY_CLINIC.bookPath}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Book online
              </Link>
            </div>
          )}

          {/* Composer */}
          {!isMinimized && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
            >
              <input
                ref={inputRef}
                type={collectionStep === "phone" ? "tel" : "text"}
                inputMode={collectionStep === "phone" ? "numeric" : "text"}
                autoComplete={collectionStep === "phone" ? "tel" : "off"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholder()}
                aria-label="Message"
                className="min-w-0 flex-1 rounded-full border border-gray-200 bg-muted/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          )}

          {/* Footer */}
          {!isMinimized && (
            <div className="border-t border-gray-100 bg-gray-50/80">
              <button
                onClick={() => setShowDisclaimer((d) => !d)}
                aria-expanded={showDisclaimer}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">
                  Not for emergencies. This assistant shares general information only.
                </span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 flex-shrink-0 transition-transform",
                    showDisclaimer && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>

              {showDisclaimer && (
                <div className="space-y-2 border-t border-gray-100 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
                  <p>
                    This assistant provides general information only and is not a
                    substitute for professional medical advice. For emergencies,
                    call 108 or visit the nearest hospital.
                  </p>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" aria-hidden="true" />
                      <a
                        href={`tel:${SITE.phoneSecondary}`}
                        className="font-semibold text-primary hover:text-accent"
                      >
                        {SITE.phoneSecondaryDisplay}
                      </a>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {SITE.hospitalName}
                    </span>
                  </p>
                  <p>
                    By chatting you agree to our{" "}
                    <Link
                      to={LEGAL_PATHS.privacy}
                      onClick={() => onOpenChange(false)}
                      className="font-semibold text-primary underline underline-offset-2 hover:text-accent"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
