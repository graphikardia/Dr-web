"use client";
import { useEffect, useRef, useState } from "react";

const PATH_D = `M1 50.4494C21.5444 36.8963 59.0356 12.4101 62.1224 10.5525C66.7478 7.76902 96.8834 -6.21045 132.877 5.79707C168.871 17.8046 173.896 34.3736 175.658 49.9588C177.083 62.5583 161.957 73.9402 153.575 79.8845L38.6419 155.435C26.5965 162.794 12.232 193.594 47.174 215.287C84.314 238.344 125.469 227.551 138.794 219.079L260.704 140.733C271.1 134.115 299.124 125.019 331.459 134.908C363.596 144.735 372.221 164.704 373.905 172.115C373.905 172.115 376.035 185.277 368.385 196.153C360.734 207.029 340.781 217.74 340.781 217.74L237.893 284.95C224.079 294.398 212.563 320.28 241.105 341.889C271.52 364.916 317.694 362.463 340.279 347.745L399 309.479`;
const PATH_LENGTH = 1255;

// ── 4 stops — exact Builder.io positions, correct order & labels ─────────────
const STOPS = [
  {
    tx: -19,     ty: 37.9494,
    role: "Senior Resident",
    org:  "St. John's Medical College & Hospital",
    short: "St. John's",
    side: "right" as const,
    accent: "#1B3F8B",   // deep navy — St John's identity colour
    bg:     "#E8EEF8",
  },
  {
    tx: 140.028, ty: 6.9795,
    role: "Consultant",
    org:  "Apollo Hospitals",
    short: "Apollo",
    side: "right" as const,
    accent: "#003087",   // Apollo deep blue
    bg:     "#E6EDF8",
  },
  {
    tx: 21.1932, ty: 198.625,
    role: "Consultant",
    org:  "K C Raju Multispeciality Hospital",
    short: "K C Raju",
    side: "right" as const,
    accent: "#0e6e4a",   // green — multispeciality / medical green
    bg:     "#E6F4EE",
  },
  {
    tx: 339.222, ty: 137.107,
    role: "Senior Consultant & HOD",
    org:  "Altius Hospital",
    short: "Altius",
    side: "left" as const,
    accent: "#0055FF",   // Altius electric blue
    bg:     "#BCE5FF",
  },
];

const THRESHOLDS = [0.06, 0.25, 0.52, 0.74];

// ─────────────────────────────────────────────────────────────────────────────
// Custom letter-mark icons — styled to evoke each hospital's visual identity
// ─────────────────────────────────────────────────────────────────────────────

/** St. John's — red cross on shield (Catholic medical college emblem style) */
const LogoStJohns = ({ active }: { active: boolean }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    {/* Shield */}
    <path
      d="M13 2L4 5.5V13C4 17.8 8 21.8 13 24C18 21.8 22 17.8 22 13V5.5L13 2Z"
      fill={active ? "#fff" : "#e5e7eb"}
      stroke={active ? "#1B3F8B" : "#9ca3af"}
      strokeWidth="1.2"
    />
    {/* Red cross */}
    <rect x="11.5" y="8"  width="3" height="10" rx="0.5" fill={active ? "#C8102E" : "#d1d5db"}/>
    <rect x="8"    y="11.5" width="10" height="3" rx="0.5" fill={active ? "#C8102E" : "#d1d5db"}/>
  </svg>
);

/** Apollo — stylised "A" with arc (echoes their iconic arc/leaf motif) */
const LogoApollo = ({ active }: { active: boolean }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    {/* Circle background */}
    <circle cx="13" cy="13" r="10"
      fill={active ? "#003087" : "#e5e7eb"}
      stroke={active ? "#003087" : "#9ca3af"}
      strokeWidth="0.5"
    />
    {/* "A" letterform */}
    <path
      d="M9 19L13 8L17 19"
      stroke={active ? "#fff" : "#9ca3af"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* crossbar */}
    <path
      d="M10.5 15.5H15.5"
      stroke={active ? "#fff" : "#9ca3af"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Decorative arc above A */}
    <path
      d="M9.5 9.5C9.5 9.5 13 6 16.5 9.5"
      stroke={active ? "#00B0F0" : "#d1d5db"}
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/** K C Raju — green caduceus-style staff with entwined element */
const LogoKCRaju = ({ active }: { active: boolean }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    {/* Rounded square bg */}
    <rect x="2" y="2" width="22" height="22" rx="5"
      fill={active ? "#0e6e4a" : "#e5e7eb"}
      stroke={active ? "#0e6e4a" : "#9ca3af"}
      strokeWidth="0.5"
    />
    {/* Vertical staff */}
    <line x1="13" y1="5" x2="13" y2="21"
      stroke={active ? "#fff" : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round"/>
    {/* Left wing */}
    <path d="M13 10 C10 9 8 11 9.5 13 C11 15 13 14 13 14"
      stroke={active ? "#86efac" : "#d1d5db"} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    {/* Right wing */}
    <path d="M13 10 C16 9 18 11 16.5 13 C15 15 13 14 13 14"
      stroke={active ? "#86efac" : "#d1d5db"} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    {/* Top wings */}
    <path d="M9 7 L13 5 L17 7"
      stroke={active ? "#fff" : "#9ca3af"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

/** Altius — "A" with upward arrow/peak (altius = higher in Latin) */
const LogoAltius = ({ active }: { active: boolean }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    {/* Hexagon */}
    <path
      d="M13 2L21.66 7V17L13 22L4.34 17V7L13 2Z"
      fill={active ? "#0055FF" : "#e5e7eb"}
      stroke={active ? "#0055FF" : "#9ca3af"}
      strokeWidth="0.5"
    />
    {/* Bold A */}
    <path
      d="M9 19L13 7L17 19"
      stroke={active ? "#fff" : "#9ca3af"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M10.8 15H15.2"
      stroke={active ? "#BCE5FF" : "#d1d5db"}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Upward tick on peak */}
    <path d="M13 7L13 4"
      stroke={active ? "#BCE5FF" : "#d1d5db"}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path d="M11 5.5L13 4L15 5.5"
      stroke={active ? "#BCE5FF" : "#d1d5db"}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const LOGOS = [LogoStJohns, LogoApollo, LogoKCRaju, LogoAltius];

// ── Component ─────────────────────────────────────────────────────────────────
export function JourneyMap() {
  const [progress,   setProgress]   = useState(0);
  const [active,     setActive]     = useState<boolean[]>(Array(STOPS.length).fill(false));
  const [tooltip,    setTooltip]    = useState<number | null>(null);
  const containerRef                = useRef<HTMLDivElement>(null);
  const animatedRef                 = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animatedRef.current) {
        animatedRef.current = true;
        let start: number | null = null;
        const duration = 2400;
        const tick = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setProgress(p);
          setActive(STOPS.map((_, i) => p >= THRESHOLDS[i]));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.15 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const dashOffset = PATH_LENGTH * (1 - progress);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", overflowVisible: true } as React.CSSProperties}>
      <div style={{ position: "relative", width: 400, height: 360, margin: "0 auto" }}>

        {/* ── SVG Track ── */}
        <svg width="400" height="360" viewBox="0 0 400 360" fill="none"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {/* Dashed grey background */}
          <path d={PATH_D} stroke="#E5EBF2" strokeWidth="2"
            strokeDasharray="12 6" strokeLinecap="round" fill="none"/>
          {/* Animated colour fill */}
          <path d={PATH_D} stroke="#BCE5FF" strokeWidth="3"
            strokeLinecap="round" fill="none"
            strokeDasharray={PATH_LENGTH} strokeDashoffset={dashOffset}/>
        </svg>

        {/* ── Icon bubbles ── */}
        {STOPS.map((stop, i) => {
          const Logo   = LOGOS[i];
          const isOn   = active[i];
          const isLeft = stop.side === "left";
          const showTip = tooltip === i;

          return (
            <div key={i}
              onMouseEnter={() => setTooltip(i)}
              onMouseLeave={() => setTooltip(null)}
              style={{
                position:  "absolute",
                left:       0,
                top:        0,
                transform: `translate(${stop.tx}px, ${stop.ty}px)`,
                zIndex:     20,
                cursor:    "pointer",
              }}
            >
              {/* Bubble */}
              <div style={{
                width:           44,
                height:          44,
                borderRadius:    "50%",
                backgroundColor: isOn ? stop.bg    : "#F3F4F6",
                border:          `2px solid ${isOn ? stop.accent : "#E5E7EB"}`,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                boxShadow:       isOn ? `0 3px 12px ${stop.accent}33` : "none",
                transform:       isOn ? "scale(1)"   : "scale(0.75)",
                opacity:         isOn ? 1 : 0.35,
                transition:      "all 0.45s cubic-bezier(.34,1.56,.64,1)",
              }}>
                <Logo active={isOn} />
              </div>

              {/* Tooltip */}
              {showTip && isOn && (
                <div style={{
                  position:        "absolute",
                  top:             "50%",
                  transform:       "translateY(-50%)",
                  ...(isLeft
                    ? { right: 52, textAlign: "right"  as const }
                    : { left:  52, textAlign: "left"   as const }),
                  backgroundColor: "#fff",
                  border:          `1.5px solid ${stop.accent}33`,
                  borderRadius:     10,
                  padding:          "7px 12px",
                  whiteSpace:       "nowrap",
                  pointerEvents:    "none",
                  boxShadow:        `0 6px 20px rgba(0,0,0,0.10)`,
                  zIndex:           50,
                  animation:        "jmFadeIn .18s ease forwards",
                  borderLeft:       isLeft ? undefined : `3px solid ${stop.accent}`,
                  borderRight:      isLeft ? `3px solid ${stop.accent}` : undefined,
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: stop.accent, lineHeight: 1.3,
                  }}>
                    {stop.role}
                  </div>
                  <div style={{
                    fontSize: 10, color: "#6B7280",
                    lineHeight: 1.4, marginTop: 2,
                    maxWidth: 160,
                    whiteSpace: "normal",
                  }}>
                    {stop.org}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step legend below map */}
      <div style={{
        display:        "flex",
        justifyContent: "center",
        gap:             8,
        marginTop:       12,
        flexWrap:        "wrap",
      }}>
        {STOPS.map((stop, i) => (
          <div key={i} style={{
            display:      "flex",
            alignItems:   "center",
            gap:           5,
            fontSize:      10,
            color:         active[i] ? "#374151" : "#9CA3AF",
            transition:   "color 0.4s",
          }}>
            <div style={{
              width:           8,
              height:          8,
              borderRadius:    "50%",
              backgroundColor: active[i] ? stop.accent : "#D1D5DB",
              flexShrink:      0,
              transition:     "background-color 0.4s",
            }}/>
            {stop.short}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes jmFadeIn {
          from { opacity:0; transform: translateY(-50%) translateX(6px); }
          to   { opacity:1; transform: translateY(-50%) translateX(0);   }
        }
      `}</style>
    </div>
  );
}
