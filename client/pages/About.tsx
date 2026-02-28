import { Layout } from "@/components/Layout";
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  X,
  ZoomIn,
  Award,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const awardImages = [
  { src: "/awards-speech/award-1.jpeg", caption: "Award Ceremony" },
  { src: "/awards-speech/award-2.jpeg", caption: "Medical Conference" },
  { src: "/awards-speech/award-3.jpeg", caption: "FICP Felicitation" },
  { src: "/awards-speech/award-4.jpeg", caption: "Guest Lecture" },
  { src: "/awards-speech/award-5.jpeg", caption: "CME Programme" },
  { src: "/awards-speech/award-6.jpeg", caption: "Panel Discussion" },
  { src: "/awards-speech/award-7.jpeg", caption: "Award Recognition" },
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
        // onClick={console.log}
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

// ── Newspaper Slider ──────────────────────────────────────────────────────────
const newspaperImages = Array.from({ length: 23 }, (_, i) => ({
  src: `/newspaper/article-${i + 1}.jpeg`,
  caption: `Article ${i + 1}`,
}));

function NewspaperCard({
  img,
  isCenter,
  onOpen,
}: {
  img: { src: string; caption: string };
  isCenter: boolean;
  onOpen: () => void;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div
      onClick={isCenter ? onOpen : undefined}
      className={`relative flex-shrink-0 rounded-xl overflow-hidden border-2 shadow-lg transition-all duration-500 group
        ${
          isCenter
            ? "border-accent ring-4 ring-accent/25 scale-100 z-10 opacity-100 cursor-zoom-in"
            : "border-transparent scale-90 opacity-40 cursor-default"
        }`}
      style={{ width: isCenter ? 280 : 170, height: isCenter ? 380 : 240 }}
    >
      {errored ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-accent/10 p-4">
          <Newspaper className="w-10 h-10 text-accent/50 mb-3" />
          <p className="text-xs font-bold text-primary text-center">
            {img.caption}
          </p>
        </div>
      ) : (
        <img
          src={img.src}
          alt={img.caption}
          className="w-full h-full object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
          onError={() => setErrored(true)}
        />
      )}

      {/* Zoom hint — only on center */}
      {isCenter && !errored && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2.5 shadow-lg">
            <ZoomIn className="w-6 h-6 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
}

function NewspaperSlider() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = newspaperImages.length;

  const resetTimer = (next: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      4000,
    );
    setCurrent(next);
  };

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      4000,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const visible = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ];

  return (
    <>
      {lightbox && (
        <Lightbox
          images={newspaperImages}
          startIdx={current}
          onClose={() => setLightbox(false)}
        />
      )}

      <div className="w-full select-none">
        <p className="text-center text-xs text-accent font-semibold mb-4 flex items-center justify-center gap-1.5">
          <ZoomIn className="w-3.5 h-3.5" /> Click the centre article to view
          full screen
        </p>

        <div className="flex items-center justify-center gap-3 md:gap-6">
          <button
            onClick={() => resetTimer((current - 1 + total) % total)}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-3 md:gap-6 items-center justify-center overflow-hidden w-full max-w-3xl">
            {visible.map((imgIdx, pos) => (
              <NewspaperCard
                key={imgIdx}
                img={newspaperImages[imgIdx]}
                isCenter={pos === 1}
                onOpen={() => setLightbox(true)}
              />
            ))}
          </div>

          <button
            onClick={() => resetTimer((current + 1) % total)}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
          {current + 1} / {total}
        </p>
        <div className="flex justify-center gap-1.5 mt-2 flex-wrap px-4">
          {newspaperImages.map((_, i) => (
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

// ── Award Slider (for Milestones) ─────────────────────────────────────────────
function AwardSlideCard({
  img,
  isCenter,
  onClick,
}: {
  img: { src: string; caption: string };
  isCenter: boolean;
  onClick?: () => void;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div
      onClick={onClick}
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
            <Award className="w-7 h-7 text-accent" />
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
              <AwardSlideCard
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

// ── Journey Path ──────────────────────────────────────────────────────────────
const experienceStops = [
  {
    role: "Senior Resident",
    hospital: "St. John's Medical College & Hospital",
    location: "Bangalore",
    note: "Prestigious academic centre — residency in Chest Medicine",
    color: "#0055FF",
    bg: "#BCE5FF",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0055FF"
        strokeWidth="2"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
  },
  {
    role: "Consultant",
    hospital: "Apollo Hospitals",
    location: "Bangalore",
    note: "Consultant physician at one of India's premier hospital chains",
    color: "#7C3AED",
    bg: "#EDE9FE",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="2"
      >
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    role: "Consultant",
    hospital: "K C Raju Multispeciality Hospital",
    location: "Bangalore",
    note: "Full-time consultant managing complex multi-system diseases",
    color: "#059669",
    bg: "#D1FAE5",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#059669"
        strokeWidth="2"
      >
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
      </svg>
    ),
  },
  {
    role: "Senior Consultant & HOD",
    hospital: "Altius Hospital",
    location: "HBR Layout, Bangalore",
    note: "Head of Dept — Internal Medicine; Medical Superintendent",
    color: "#DC2626",
    bg: "#FEE2E2",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#DC2626"
        strokeWidth="2"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

function JourneyPath() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [pathProgress, setPathProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let start: number | null = null;
          const duration = 2000;
          const animate = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setPathProgress(progress);
            setActiveIdx(Math.floor(progress * experienceStops.length) - 1);
            if (progress < 1) requestAnimationFrame(animate);
            else setActiveIdx(experienceStops.length - 1);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pathD =
    "M 420 350 C 350 350 280 320 240 280 C 180 220 180 180 240 120 C 300 60 350 50 420 50";
  const pathLength = 700;
  const dashOffset = pathLength - pathProgress * pathLength;
  const iconPositions = [
    { x: 420, y: 50, labelSide: "left" },
    { x: 280, y: 140, labelSide: "left" },
    { x: 140, y: 230, labelSide: "left" },
    { x: 380, y: 340, labelSide: "left" },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: 440 }}
    >
      <svg
        viewBox="0 0 480 390"
        className="absolute inset-0 w-full h-full"
        style={{ maxHeight: 390 }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0055FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0055FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0055FF" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={pathD}
          stroke="#E5EBF2"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          className="opacity-50"
        />
        <path
          d={pathD}
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.05s linear",
            filter: "url(#glow)",
          }}
        />
        <path
          d={pathD}
          stroke="#0055FF"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity={pathProgress * 0.8}
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: dashOffset,
          }}
        />

        <circle
          cx="420"
          cy="350"
          r="10"
          fill="#0055FF"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="420" cy="350" r="5" fill="white" />

        <text
          x="420"
          y="375"
          textAnchor="middle"
          className="text-[10px] fill-gray-500 font-medium"
        >
          START
        </text>

        <circle
          cx="420"
          cy="50"
          r="8"
          fill="#DC2626"
          stroke="white"
          strokeWidth="2"
        />
        <text
          x="420"
          y="35"
          textAnchor="middle"
          className="text-[10px] fill-gray-500 font-medium"
        >
          CURRENT
        </text>
        {iconPositions.map((pos, i) => {
          const isActive = activeIdx >= i;
          return (
            <g key={i}>
              {isActive && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="24"
                  fill={experienceStops[i].bg}
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values="22;28;22"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0.2;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="20"
                fill={isActive ? experienceStops[i].bg : "#F3F4F6"}
                stroke={isActive ? experienceStops[i].color : "#D1D5DB"}
                strokeWidth="2"
                style={{ transition: "fill 0.5s ease, stroke 0.5s ease" }}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill={isActive ? experienceStops[i].color : "#9CA3AF"}
                className="text-[10px] font-bold"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      {iconPositions.map((pos, i) => {
        const stop = experienceStops[i];
        const pct = { x: (pos.x / 480) * 100, y: (pos.y / 390) * 100 };
        const active = activeIdx >= i;
        return (
          <div
            key={i}
            className={`absolute transition-all duration-700 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              top: `calc(${pct.y}% - 30px)`,
              right: `calc(${100 - pct.x}% + 28px)`,
              maxWidth: "42%",
            }}
          >
            <div
              className={`bg-white rounded-xl shadow-lg border border-gray-100 p-3 transition-all duration-500 hover:shadow-xl hover:border-accent/40 ${active ? "scale-100" : "scale-95"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: stop.color }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: stop.bg, color: stop.color }}
                >
                  {stop.role}
                </span>
              </div>
              <p className="text-xs font-bold text-primary leading-tight">
                {stop.hospital}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stop.location}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────
const education = [
  { degree: "M.B.B.S", institution: "Navodaya Medical College", year: "2004" },
  {
    degree: "M.D (General Medicine)",
    institution: "Navodaya Medical College",
    year: "2010",
  },
  {
    degree: "D.N.B (General Medicine)",
    institution: "National Board of Examinations",
    year: "2015",
  },
  {
    degree: "Fellowship in Diabetes",
    institution: "Medvarsity, affiliated to Liverpool UK",
    year: "2015",
  },
  {
    degree: "Diploma in Allergy & Asthma (DAA)",
    institution: "C.M.C, Vellore",
    year: "2015",
  },
  {
    degree: "FICP — Fellow of Indian College of Physicians",
    institution: "Indian College of Physicians",
    year: "2024",
  },
];

const affiliations = [
  "Executive Committee Member — API (2023–2026)",
  "Current Executive Committee Member — API (2025–26)",
  "Internal Audit Committee Member — API (2025–26)",
  "Life Member — Research Society for the Study of Diabetes in India(RSSDI)",
  "Life Member — Indian Medical Association (IMA)",
  "Life Member — European Respiratory Society (ERS)",
  "Life Member — Indian Association of Endocrinologists (IAE)",
];

const community = [
  "Conducts free diabetes camps twice a month for the past 5+ years",
  "Regular columnist in Times of India, Bangalore Mirror, and Deccan Herald",
  "Active participant in national scientific forums and seminars",
  "Mentors young medical professionals in internal medicine",
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/85 text-primary-foreground py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/8 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <h1 className="text-white mb-4 animate-slide-up">
            About Dr. Darshana Reddy
          </h1>
          <p
            className="text-lg text-primary-foreground/85 max-w-2xl animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            FICP · MD · DNB · Senior Consultant, Internal Medicine &
            Diabetologist
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {[
              {
                value: "16+",
                label: "Years of Clinical Experience",
                icon: "🏥",
              },
              { value: "2L+", label: "OPD Patients Treated", icon: "👥" },
              {
                value: "FICP",
                label: "Fellow of Indian College of Physicians",
                icon: "🎓",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 rounded-2xl border border-accent/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-slide-up text-center group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-3xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {item.value}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 animate-slide-up">
            Dr. Darshana Reddy is a distinguished physician with 16 years of
            progressive experience in internal medicine, commanding a reputation
            for clinical excellence and patient-centric care. Having treated
            over 2 lakh OPD patients — in addition to countless ICU and
            in-patient cases — she has become one of the most trusted healthcare
            providers in Bangalore.
          </p>
          <p
            className="text-lg text-muted-foreground leading-relaxed animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            She holds the prestigious FICP (Fellow of Indian College of
            Physicians) designation, earned through demonstrated excellence in
            internal medicine. Dr. Reddy has worked at Bangalore's most
            respected institutions — from St. John's Medical College to Apollo
            Hospitals — bringing academic rigour and clinical expertise to every
            patient encounter.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="mb-8 animate-slide-up">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  Career Journey
                </span>
                <h2>Work Experience</h2>
                <p className="text-muted-foreground mt-2">
                  A journey through Bangalore's most prestigious medical
                  institutions.
                </p>
              </div>
              <div className="hidden md:block">
                <JourneyPath />
              </div>
              <div className="md:hidden space-y-5">
                {experienceStops.map((stop, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border border-white"
                        style={{ background: stop.bg }}
                      >
                        {stop.icon}
                      </div>
                      {idx < experienceStops.length - 1 && (
                        <div
                          className="w-0.5 flex-1 mt-2"
                          style={{ background: "#BCE5FF" }}
                        />
                      )}
                    </div>
                    <div className="pb-6 flex-1">
                      <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:border-accent/40 hover:shadow-md transition-all duration-300">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-2"
                          style={{ background: stop.bg, color: stop.color }}
                        >
                          {stop.role}
                        </span>
                        <h3 className="text-base font-bold text-primary">
                          {stop.hospital}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {stop.location}
                        </p>
                        <p className="text-sm text-muted-foreground/80 italic mt-1">
                          {stop.note}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 lg:p-8">
              <div className="mb-8 animate-slide-up">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  Qualifications
                </span>
                <h2>Educational Background</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 animate-slide-up"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground flex-shrink-0">
                        <GraduationCap size={18} />
                      </div>
                      {idx < education.length - 1 && (
                        <div className="w-0.5 h-12 bg-accent/30 mt-2" />
                      )}
                    </div>
                    <div className="pb-4 flex-1 group">
                      <div className="bg-gradient-to-br from-gray-50 to-accent/5 p-4 rounded-xl hover:shadow-md hover:border-accent border-2 border-transparent transition-all duration-300">
                        <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-2">
                          {edu.institution}
                        </p>
                        <span className="inline-block bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Memberships
            </span>
            <h2>Professional Affiliations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {affiliations.map((a, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-accent/5 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-accent border-2 border-transparent transition-all duration-300 transform hover:scale-[1.02] animate-slide-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Giving Back
            </span>
            <h2>Community Service & Engagement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {community.map((activity, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start p-6 bg-gradient-to-r from-accent/5 to-transparent rounded-2xl border border-accent/20 hover:shadow-md hover:border-accent transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <div className="w-2.5 h-2.5 bg-accent-foreground rounded-full" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {activity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Media Coverage
            </span>
            <h2>Newspaper Articles</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Regularly featured in Times of India, Bangalore Mirror, and Deccan
              Herald for expertise and community contributions.
            </p>
          </div>
          <NewspaperSlider />
        </div>
      </section>

      {/* Milestones & Moments - Awards & Conferences */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Milestones & Moments
            </span>
            <h2>Awards & Conferences</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Award ceremonies, medical conferences, keynote addresses, and
              community health programmes.
            </p>
          </div>
          <AwardSlider />
        </div>
      </section>
    </Layout>
  );
}
