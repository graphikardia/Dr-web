import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Users,
  Stethoscope,
  Heart,
  Wind,
  ChevronLeft,
  ChevronRight,
  Image,
  X,
  ZoomIn,
  MessageCircle,
  Send,
  CheckCircle,
  Loader2,
  ChevronDown,
  Phone,
  Mail,
  Activity,
  Pill,
  Cloud,
  Leaf,
  FlaskConical,
  StethoscopeIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const GOOGLE_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbzTLEzt8Isngldw4gjNaGI7lgyu9xWGc4Ocu6-2bRbFzl33g5VjL0jSv05f7qxyPw3dyQ/exec";

const awardImages = [
  { src: "/awards-speech/award-1.jpeg", caption: "Award Ceremony" },
  { src: "/awards-speech/award-2.jpeg", caption: "Medical Conference" },
  { src: "/awards-speech/award-3.jpeg", caption: "FICP Felicitation" },
  { src: "/awards-speech/award-4.jpeg", caption: "Guest Lecture" },
  { src: "/awards-speech/award-5.jpeg", caption: "CME Programme" },
  { src: "/awards-speech/award-6.jpeg", caption: "Panel Discussion" },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIdx,
  onClose,
}: {
  images: { src: string; caption: string }[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const total = images.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, total]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const img = images[idx];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all hover:scale-110"
      >
        <X className="w-7 h-7 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tabular-nums">
        {idx + 1} / {total}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i - 1 + total) % total);
        }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>

      {/* Image */}
      <div
        className="relative flex flex-col items-center justify-center px-20 w-full h-full"
        // onClick={(e) => e.stopPropagation()}
      >
        <img
          key={img.src}
          src={img.src}
          alt={img.caption}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
          style={{ animation: "lbFadeIn 0.2s ease" }}
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i + 1) % total);
        }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Dot strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center px-4 max-w-lg">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIdx(i);
            }}
            className={`rounded-full transition-all duration-300 ${i === idx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes lbFadeIn {
          from { opacity:0; transform:scale(0.96); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Slide Card ────────────────────────────────────────────────────────────────
function SlideCard({
  img,
  isCenter,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  img: { src: string; caption: string };
  isCenter: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-500 group
        ${
          isCenter
            ? "border-accent ring-4 ring-accent/25 scale-100 z-10 cursor-zoom-in"
            : "border-transparent scale-90 opacity-40 cursor-pointer"
        }`}
      style={{ width: isCenter ? 310 : 180, height: isCenter ? 280 : 200 }}
    >
      {errored ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-3">
            <Image className="w-7 h-7 text-accent" />
          </div>
          <p className="text-sm font-bold text-primary text-center">
            {img.caption}
          </p>
        </div>
      ) : (
        <img
          src={img.src}
          alt={img.caption}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setErrored(true)}
        />
      )}

      {/* Zoom hint — centre card only */}
      {isCenter && !errored && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2.5 shadow-lg">
            <ZoomIn className="w-6 h-6 text-primary" />
          </div>
        </div>
      )}

      {/* Zoom hint — centre card only */}
      {isCenter && !errored && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2.5 shadow-lg">
            <ZoomIn className="w-6 h-6 text-primary" />
          </div>
        </div>
      )}

      {!isCenter && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
          <ChevronRight className="w-6 h-6 text-white/70" />
        </div>
      )}
    </div>
  );
}

// ── Award Slider ──────────────────────────────────────────────────────────────
function AwardSlider() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = awardImages.length;

  const resetTimer = (next: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      3500,
    );
    setCurrent(next);
  };

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      3500,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const prev = () => resetTimer((current - 1 + total) % total);
  const next = () => resetTimer((current + 1) % total);
  const visible = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ];

  return (
    <>
      {lightbox && (
        <Lightbox
          images={awardImages}
          startIdx={current}
          onClose={() => {
            setLightbox(false);
          }}
        />
      )}

      <div className="w-full select-none">
        {/* Hint */}
        <p className="text-center text-xs text-accent font-semibold mb-4 flex items-center justify-center gap-1.5">
          <ZoomIn className="w-3.5 h-3.5" /> Click the centre image to view full
          screen
        </p>

        <div className="flex items-center justify-center gap-3 md:gap-6">
          <button
            onClick={prev}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-3 md:gap-6 items-center justify-center overflow-hidden w-full max-w-3xl">
            {visible.map((imgIdx, pos) => (
              <SlideCard
                key={imgIdx}
                img={awardImages[imgIdx]}
                isCenter={pos === 1}
                onClick={
                  pos === 1
                    ? () => {
                        setLightbox(true);
                      }
                    : pos === 0
                      ? prev
                      : next
                }
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
          {current + 1} / {total}
        </p>
        <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
          {awardImages.map((_, i) => (
            <button
              key={i}
              onClick={() => resetTimer(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-accent/25 hover:bg-accent/50"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────
const stats = [
  { label: "Years of Experience", value: "16+", icon: Stethoscope },
  { label: "Specialty Experience", value: "13+", icon: Heart },
  { label: "OPD Patients Treated", value: "2L+", icon: Users },
  { label: "Specialisations", value: "6+", icon: Wind },
];

const expertise = [
  {
    title: "General Medicine",
    description: "Comprehensive internal medicine care for complex conditions",
    image: "/Clinical Specialties/General Medicine.jpeg",
    icon: Stethoscope,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Diabetology",
    description:
      "Specialized diabetes management & long-term treatment planning",
    image: "/Clinical Specialties/Diabetology.jpeg",
    icon: Activity,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Respiratory Care",
    description: "Advanced diagnosis and treatment of respiratory diseases",
    image: "/Clinical Specialties/Respiratory Care.jpeg",
    icon: Cloud,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    title: "Allergy & Asthma",
    description: "Precise allergy identification and evidence-based management",
    image: "/Clinical Specialties/Allergy & Asthma.jpeg",
    icon: Leaf,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Endocrinology",
    description: "Expert hormonal & metabolic disorder management",
    image: "/Clinical Specialties/endocrinology.jpeg",
    icon: FlaskConical,
    color: "from-orange-500 to-orange-600",
  },
];

const careerHighlights = [
  {
    title: "Senior Resident",
    subtitle: "St. John's Medical College & Hospital, Bangalore",
  },
  { title: "Consultant", subtitle: "Apollo Hospitals" },
  { title: "Consultant", subtitle: "K C Raju Multispeciality Hospital" },
  { title: "Senior Consultant", subtitle: "Altius Hospital" },
];

const faqs = [
  {
    question: "What are Dr. Darshana's consultation hours?",
    answer:
      "Dr. Darshana consults at Altius Hospital daily from 9:00 AM to 12:00 PM and 3:00 PM to 5:00 PM, except on Sundays.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by calling us at +91 8882 799799, using the appointment form on our Contact page, or filling out the form below.",
  },
  {
    question: "What should I bring for my first consultation?",
    answer:
      "Please bring any previous medical records, prescription papers, and your ID proof. If you have diabetes or other chronic conditions, bring your recent test reports.",
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Yes, we offer both in-person and teleconsultation services. Please contact us to schedule a virtual appointment.",
  },
  {
    question: "What specialties do you treat?",
    answer:
      "We specialize in General Medicine, Diabetology, Respiratory Care, Allergy & Asthma, Endocrinology, and Pulmonology.",
  },
  {
    question: "Do you conduct special health check-up camps?",
    answer:
      "Yes! We conduct Obesity Check-ups every Wednesday and Friday (9 AM - 12 PM & 3 PM - 5 PM), Allergy Check-ups on Monday and Thursday (9 AM - 12 PM & 3 PM - 5 PM), Free Diabetes Camp on 1st and 3rd Tuesday of every month (9 AM - 12 PM), and Vaccination Check-ups on Saturday (9 AM - 12 PM & 3 PM - 5 PM).",
  },
  {
    question: "What makes Dr. Darshana's treatment approach unique?",
    answer:
      "Dr. Darshana is known for her conservative treatment approach — she prescribes only necessary medicines and tests. She focuses on identifying the root cause of health issues and emphasizes lifestyle modifications for long-term wellness. Patients appreciate her empathetic listening and honest diagnosis.",
  },
  {
    question: "Are the consultation fees reasonable?",
    answer:
      "Yes! Dr. Darshana offers quality healthcare at affordable rates. Consultation fees are significantly lower compared to other physicians and diabetologists, making expert care accessible to all patients.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-accent transition-colors"
      >
        <span className="font-semibold text-primary pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "Shashi Kala",
    location: "Patient",
    rating: 5,
    text: "What a humble doctor. She spent good amount of time explaining my issues and trust me when I say that she is the real lifestyle doctor. She explained how our health entirely depends on our lifestyle. I strongly recommend her.",
  },
  {
    name: "Padmanabhan Iyer",
    location: "Local Guide",
    rating: 5,
    text: "Though very young Darshana is wise, empathetic, makes patients comfortable, listens and is very honest in diagnosis and treatment. She has the right and different approach in a highly competitive profession where commercialisation is creeping in.",
  },
  {
    name: "Ajay Singh",
    location: "Patient",
    rating: 5,
    text: "Dr Reddy is highly knowledgeable, listen to patients carefully, diagnose properly, identifies the root of the problem and suggest precise medicines. She helped me post COVID recovery. SHE IS WONDERFUL DOCTOR AND ANGEL HUMAN.",
  },
  {
    name: "Pooja Mali",
    location: "Patient",
    rating: 5,
    text: "I was suffering from Anemia. Dr Darshana Mam diagnosed it from route cause behind Anemia and then treated. Now my Haemoglobin is good and I feel more energetic. Very good Dr with vast experience.",
  },
  {
    name: "Mahesh Kumar",
    location: "Patient",
    rating: 5,
    text: "My Grandfather who has asthmatic problem from past 5yrs. Through google we found Dr Darshana, Adult pulmonalogist, gave a good treatment and had a wonderful experience with her.",
  },
  {
    name: "Aswathi Das",
    location: "Local Guide",
    rating: 5,
    text: "Dr Darshana is a wonderful doctor. She doesn't prescribe unnecessary medicines. She is extremely patient and listens to our concerns without any judgement. Very happy with our association for over 5 years with her.",
  },
  {
    name: "Ajith T V",
    location: "Patient",
    rating: 5,
    text: "What an Amazing Doctor she is..!!! Three of us in family have recovered from Covid and so thankfull to Doctor Darshana for her excellent guidance. She only give required medication instead of too many tablets.",
  },
  {
    name: "Sridhar Babu",
    location: "Local Guide",
    rating: 5,
    text: "One of the very few doctors I have come across who is genuine and caring for her patients. In these times of money mindedness of many in the medical fraternity, she stands out tall.",
  },
];

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
        <div className="absolute top-6 left-6 text-accent/20">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <div className="relative">
          <div className="flex gap-1 mb-4">
            {[...Array(t.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed italic">
            "{t.text}"
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-primary text-lg">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.location}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-accent hover:text-white hover:border-accent flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-accent hover:text-white hover:border-accent flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-accent"
                  : "w-2 h-2 bg-gray-300 hover:bg-accent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HelpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, sheet: "Sheet2" }),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
      <h3 className="text-xl font-bold text-primary mb-2">
        We're Here to Help
      </h3>
      <p className="text-muted-foreground mb-6">
        Have questions? Fill out the form below and we'll get back to you.
      </p>

      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-800 font-semibold">
            Thank you! Your message has been received. We'll contact you soon.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold">
            Something went wrong. Please try again or call us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-primary mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === "loading"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-primary mb-2">
            Email ID *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === "loading"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-primary mb-2">
            Let us know how we can help you! *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            disabled={status === "loading"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent resize-none disabled:opacity-50"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full btn-accent font-bold py-3 text-lg flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-primary-foreground py-16 md:py-28 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-bounce-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl pointer-events-none" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/40 rounded-full animate-bounce-soft"
            style={{
              top: `${15 + i * 13}%`,
              left: `${5 + i * 15}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}

        {/* Animated geometric patterns */}
        <div
          className="absolute top-20 left-[10%] w-24 h-24 border border-accent/20 rounded-lg rotate-12 animate-float opacity-30"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-32 right-[15%] w-16 h-16 border border-accent/30 rounded-full animate-float opacity-40"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/3 right-[25%] w-12 h-12 bg-accent/10 rounded-full animate-pulse" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent px-5 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="tracking-wider">
                  MBBS | MD | DNB | FICP | DAA | FID
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 animate-slide-up leading-tight"
                style={{ animationDelay: "100ms" }}
              >
                Dr. Darshana{" "}
                <span className="text-accent relative">
                  Reddy
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-1"
                    viewBox="0 0 100 4"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 2 Q 25 0, 50 2 T 100 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-accent"
                    />
                  </svg>
                </span>
              </h1>
              <p
                className="text-xl text-primary-foreground/90 mb-3 font-semibold animate-slide-up"
                style={{ animationDelay: "200ms" }}
              >
                Senior Consultant — Internal Medicine & Diabetologist
              </p>
              <p
                className="text-base text-primary-foreground/75 mb-8 leading-relaxed animate-slide-up max-w-lg"
                style={{ animationDelay: "300ms" }}
              >
                16 years of dedicated excellence in internal medicine, diabetes
                management, and respiratory care — serving over 2 lakh OPD
                patients across Bangalore's leading hospitals.
              </p>
              <div
                className="flex gap-4 flex-wrap animate-slide-up"
                style={{ animationDelay: "400ms" }}
              >
                <Link
                  to="/contact"
                  className="btn-accent hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse-glow relative overflow-hidden group"
                >
                  <span className="relative z-10">Book Appointment</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link
                  to="/about"
                  className="bg-transparent border-2 border-accent/70 text-accent hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust badges */}
              <div
                className="mt-10 pt-6 border-t border-white/10 animate-slide-up"
                style={{ animationDelay: "500ms" }}
              >
                <p className="text-xs text-primary-foreground/50 mb-3 uppercase tracking-widest">
                  Trusted By Patients At
                </p>
                <div className="flex flex-wrap gap-6 opacity-60">
                  {["Apollo Hospitals", "Altius Hospital", "St. John's"].map(
                    (hospital, i) => (
                      <span
                        key={i}
                        className="text-sm text-primary-foreground/70 font-medium"
                      >
                        {hospital}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center animate-slide-in-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30 rounded-3xl blur-2xl opacity-70 animate-pulse" />
                <div
                  className="absolute -inset-2 rounded-2xl border-2 border-dashed border-accent/30 animate-spin"
                  style={{ animationDuration: "12s" }}
                />
                <div className="absolute top-4 -right-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-xs font-medium">
                      Available Today
                    </span>
                  </div>
                </div>
                <div className="w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-200 relative border-4 border-white/20 transform hover:scale-105 transition-transform duration-500 group">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F25125c27db8e4312bad1ed13783208b5%2F5541045c8f37402690c453b2a605f8a5?format=webp&width=800&height=1200"
                    alt="Dr. Darshana Reddy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg whitespace-nowrap">
                    <p className="text-primary text-xs font-bold text-center">
                      16 Years · 2L+ OPD Patients
                    </p>
                  </div>
                </div>
                {/* Decorative corner elements */}
                <div className="absolute -bottom-3 -left-3 w-16 h-16 border-l-2 border-b-2 border-accent/40 rounded-bl-xl" />
                <div className="absolute -top-3 -right-3 w-16 h-16 border-r-2 border-t-2 border-accent/40 rounded-tr-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-white border-b border-gray-100">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-accent/5 hover:shadow-xl hover:border-accent border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:-translate-y-3 animate-slide-up cursor-pointer group"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <div className="relative inline-block mb-3">
                    <div className="absolute inset-0 bg-accent/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 group-hover:scale-150" />
                    <Icon className="w-9 h-9 text-accent mx-auto relative" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="container-max relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Clinical Specialties
            </span>
            <h2>Areas of Expertise</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Comprehensive healthcare solutions backed by years of experience
              and advanced medical certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl border-2 border-transparent hover:border-accent/30 transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                  />

                  {/* Image section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Floating icon badge */}
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Number badge */}
                    <div className="absolute bottom-4 left-4 text-5xl font-bold text-white/20 group-hover:text-white/30 transition-colors duration-300">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-20">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Learn more link */}
                    <div className="mt-4 flex items-center gap-2 text-accent font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-accent/20 group-hover:border-r-transparent transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 blur-3xl" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Professional Background
              </span>
              <h2 className="mb-6">About Dr. Darshana</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Dr. Darshana Reddy is a highly accomplished physician with 16
                years of experience in internal medicine. She holds the
                prestigious FICP (Fellow of Indian College of Physicians) — one
                of India's highest distinctions in medicine.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With advanced certifications including MD, DNB, Fellowship in
                Diabetes, and a Diploma in Allergy &amp; Asthma from CMC
                Vellore, she brings unmatched expertise to complex medical
                conditions.
              </p>
              <Link
                to="/about"
                className="inline-block btn-primary hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                View Full Profile
              </Link>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 rounded-2xl border border-accent/20 hover:shadow-xl transition-all duration-300 animate-slide-in-right transform hover:scale-105">
              <h4 className="font-bold text-primary mb-5 text-lg">
                Career Highlights
              </h4>
              <div className="space-y-4">
                {careerHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-2.5 h-2.5 bg-accent rounded-full mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <div>
                      <h4 className="font-bold text-primary group-hover:text-accent transition-colors duration-300 text-base">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Patient Stories
            </span>
            <h2>What Our Patients Say</h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Check-ups & Tests - Movie Strip */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Glimpses of Care
            </span>
            <h2>Check-ups & Tests</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Moments from consultations, diagnostic procedures, and patient
              care at Altius Hospital.
            </p>
          </div>
          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollBehavior: "smooth" }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-lg border-2 border-white hover:border-accent transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={`/checkups/checkup-${i}.jpg`}
                    alt={`Check-up ${i}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
                          <div class="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p class="text-xs font-semibold text-primary">Check-up ${i}</p>
                        </div>
                      `;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special Check-ups & Timing */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Special Services
            </span>
            <h2>Special Check-ups & Timings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-primary mb-2">Obesity Check-ups</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Wednesday & Friday
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                9:00 AM - 12:00 PM & 3:00 PM - 5:00 PM
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-primary mb-2">Allergy Check-ups</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Monday & Thursday
              </p>
              <p className="text-sm text-green-600 font-semibold">
                9:00 AM - 12:00 PM & 3:00 PM - 5:00 PM
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-primary mb-2">
                Free Diabetes Camp
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                1st & 3rd Tuesday of Month
              </p>
              <p className="text-sm text-purple-600 font-semibold">
                9:00 AM - 12:00 PM (FREE)
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-primary mb-2">
                Vaccination Check-ups
              </h3>
              <p className="text-sm text-muted-foreground mb-2">Saturday</p>
              <p className="text-sm text-orange-600 font-semibold">
                9:00 AM - 12:00 PM & 3:00 PM - 5:00 PM
              </p>
            </div>
          </div>
          <div className="mt-10 bg-gradient-to-r from-primary to-primary/85 rounded-xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Consultation Timings</h3>
            <p className="text-primary-foreground/90 mb-4">
              Dr. Darshana consults at <strong>Altius Hospital</strong> daily
              except Sundays
            </p>
            <p className="text-2xl font-bold text-accent mb-2">
              9:00 AM - 12:00 PM & 3:00 PM - 5:00 PM
            </p>
            <p className="text-primary-foreground/80">
              For appointments call:{" "}
              <strong className="text-accent">+91 8882 799 799</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ & Help Form - Side by Side */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* FAQ */}
            <div>
              <div className="text-center mb-8 animate-slide-up lg:text-left">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  <MessageCircle className="w-4 h-4 inline-block mr-1" />
                  FAQ
                </span>
                <h2 className="lg:text-left">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mt-3 max-w-xl mx-auto lg:mx-0">
                  Find answers to common questions about our services and
                  consultations.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                {faqs.map((faq, idx) => (
                  <FAQItem
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* We're Here to Help Form */}
            <div>
              <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
                Get in Touch
              </span>
              <h2 className="mb-4">Have More Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you need to schedule an appointment or have questions
                about our services, we're here to help. Fill out the form and
                our team will get back to you within 24 hours.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Phone</p>
                    <a
                      href="tel:+918882799799"
                      className="text-muted-foreground hover:text-accent"
                    >
                      +91 8882 799 799
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Email</p>
                    <a
                      href="mailto:info@altiushospital.com"
                      className="text-muted-foreground hover:text-accent"
                    >
                      info@altiushospital.com
                    </a>
                  </div>
                </div>
              </div>
              <HelpForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
