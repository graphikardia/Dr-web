import { Layout } from "@/components/Layout";
import {
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  ExternalLink,
  Award,
  BookOpen,
  Quote,
  Stethoscope,
  Calendar,
  FileText,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ── Lightbox (reused from About) ─────────────────────────────────────────────
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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all hover:scale-110"
      >
        <X className="w-7 h-7 text-white" />
      </button>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tabular-nums">
        {idx + 1} / {total}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i - 1 + total) % total);
        }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>

      <div className="relative flex flex-col items-center justify-center px-20 w-full h-full">
        <img
          key={img.src}
          src={img.src}
          alt={img.caption}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
          style={{ animation: "lbFadeIn 0.2s ease" }}
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i + 1) % total);
        }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

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

// ── Newspaper Slider ─────────────────────────────────────────────────────────
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
      style={{
        width: isCenter ? "min(280px, 70vw)" : "min(170px, 40vw)",
        height: isCenter ? "min(380px, 90vw)" : "min(240px, 60vw)",
      }}
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

// ── Data ─────────────────────────────────────────────────────────────────────

const authoredArticles = [
  {
    title: "The Diabetes-Heart Connection",
    publication: "Deccan Herald",
    date: "April 30, 2022",
    url: "https://www.deccanherald.com/features/the-diabetes-heart-connection-1104684.html",
    excerpt:
      "If high blood glucose levels remain in the bloodstream for a long period of time, it can damage blood vessels and the nerves that control them leading to heart disease.",
    content: [
      "Heart disease and diabetes are closely linked. High blood sugar damages blood vessels, making them stiff and narrow — a condition called atherosclerosis. This restricts blood flow to the heart, increasing risk of heart attack and stroke.",
      "Diabetes also damages the nerves controlling the heart and blood vessels (autonomic neuropathy), causing irregular heart rhythms and blood pressure problems. Peripheral arterial disease — narrowing of arteries in legs — is also common, causing pain, ulcers, and increased risk of amputation.",
      "Regular screening, blood sugar control, blood pressure management, and lifestyle changes are essential to prevent cardiovascular complications in diabetic patients.",
    ],
  },
];

const mediaQuotes = [
  {
    topic: "Asthma & Air Quality",
    publication: "Times of India",
    date: "May 2025",
    quote:
      "Over 70% of asthma cases in Bengaluru remain undiagnosed. Prevalence has jumped from 9% to 25% in five years. Deteriorating air quality, construction dust, and weather fluctuations are key triggers.",
  },
  {
    topic: "Dust Allergy Surge",
    publication: "Times of India",
    date: "May 2026",
    quote:
      "This rise is largely due to intensified construction activity, road excavation, dry weather, and reduced rainfall. PM10 particles directly affect the nose, throat, and airways.",
  },
  {
    topic: "Weather & Health",
    publication: "Times of India",
    date: "February 2026",
    quote:
      "Compared to last year, we're seeing a 50% rise in cases. On an average day, we now consult 10-15 patients. Sharp weather fluctuations, worsening air pollution, and unhealthy dietary habits are driving this surge.",
  },
  {
    topic: "Viral Infections (Monsoon)",
    publication: "Times of India",
    date: "May 2025",
    quote:
      "60-70% of my OPD is now respiratory viral cases — upper respiratory tract infections, common cold, cough, flu-like illnesses. Closed, poorly ventilated spaces create ideal conditions for spread.",
  },
  {
    topic: "Windcheaters & Dust",
    publication: "Times of India",
    date: "December 2024",
    quote:
      "Increase in dust allergies traced to ongoing Metro construction, poor road conditions, and dry spells. Effective road maintenance, dust control at construction sites, and public awareness are crucial.",
  },
  {
    topic: "Candida auris Infection",
    publication: "Times of India",
    date: "2024",
    quote:
      "Candida auris is a formidable fungal pathogen causing outbreaks, particularly in healthcare facilities. Its resistance to multiple antifungal drugs and ability to persist on surfaces makes containment complex.",
  },
  {
    topic: "Water Bells Initiative",
    publication: "Times of India",
    date: "2024",
    quote:
      "The water bell initiative will improve concentration and learning outcomes, build a healthy lifelong habit, and is a low-cost intervention. A practical schedule would be every 60-90 min, 3-4 times during school hours.",
  },
  {
    topic: "Mango Overconsumption",
    publication: "Bangalore Mirror",
    date: "July 2022",
    quote:
      "Overconsumption of mangoes — its excessive fibre can cause upset stomach, diarrhoea, gastritis. 30-40% increase in gastroenteritis cases reported at OPDs.",
  },
  {
    topic: "Urban Heating",
    publication: "Times of India",
    date: "2024",
    quote:
      "Rising temperatures increase risk of extreme heat leading to headache, confusion, tiredness, vomiting. Temperatures above 40°C cause heat strokes, organ failure, even death.",
  },
  {
    topic: "Dengue Surge",
    publication: "Times of India",
    date: "2023",
    quote:
      "Usually see a spurt by May, peak Sept-Oct. This year cases surged Jan-March. 80% of Karnataka's 1,417 dengue cases are from Bengaluru, probably due to ease of COVID restrictions.",
  },
  {
    topic: "Omicron Third Wave",
    publication: "Times of India",
    date: "2022",
    quote:
      "The number infected with Omicron was dramatically higher but mostly mild due to successful vaccination drive. Severe cases still represent significant numbers.",
  },
  {
    topic: "Lingering Illnesses",
    publication: "Times of India",
    date: "February 2025",
    quote:
      "Gastrointestinal infections have tripled. Respiratory illnesses up by at least 20%. Post-viral cough and breathlessness are now lasting weeks.",
  },
  {
    topic: "Tomato Flu",
    publication: "Financial Express",
    date: "2022",
    quote:
      "The name 'tomato flu' is a misnomer. It is a rare viral infection that gets its name from tomato-shaped red rashes. Not known if related to chikungunya or dengue.",
  },
  {
    topic: "Pigeon Feeding",
    publication: "Bangalore Mirror",
    date: "2024",
    quote:
      "Urban pigeon overpopulation is an under-recognised environmental health hazard. Accumulated droppings can cause pulmonary fibrosis, which is largely irreversible.",
  },
  {
    topic: "HMPV Virus",
    publication: "Times of India",
    date: "2025",
    quote:
      "HMPV is no different from other respiratory viruses. Early detection helps manage complications.",
  },
];

const articlesByCategory = [
  {
    category: "Respiratory & Allergy",
    color: "from-blue-600 to-blue-400",
    bg: "bg-blue-50",
    border: "border-blue-200",
    items: [
      "Asthma prevalence jumped 9% → 25% in 5 years; 70% undiagnosed",
      "PM10/PM2.5 pollution causing chronic respiratory distress",
      "Dust allergies linked to Metro construction & poor roads",
      "Weather flip-flop (13°C–31°C) driving 50% rise in viral cases",
      "Monsoon surge: 60-70% OPD now respiratory viral infections",
      "Candida auris — multidrug-resistant fungal threat",
      "HMPV detection & management in children",
    ],
  },
  {
    category: "Diabetes & Metabolism",
    color: "from-red-600 to-red-400",
    bg: "bg-red-50",
    border: "border-red-200",
    items: [
      "Authored: 'The Diabetes-Heart Connection' — Deccan Herald",
      "Diabetes-heart disease nexus: atherosclerosis & neuropathy",
      "Comprehensive diabetes care & reversal programmes",
      "Gestational, Type 1, and Type 2 diabetes management",
    ],
  },
  {
    category: "Infectious Diseases",
    color: "from-green-600 to-green-400",
    bg: "bg-green-50",
    border: "border-green-200",
    items: [
      "Dengue surge: 80% of Karnataka cases from Bengaluru",
      "Omicron third wave — mild due to vaccination coverage",
      "Tomato flu — rare viral infection explained",
      "HMPV advisory and outbreak management",
    ],
  },
  {
    category: "Child & Community Health",
    color: "from-purple-600 to-purple-400",
    bg: "bg-purple-50",
    border: "border-purple-200",
    items: [
      "Water bells initiative — hydration & learning outcomes",
      "Pigeon feeding — pulmonary fibrosis risks",
      "Mango overconsumption & gastroenteritis",
      "Urban heating & heat stroke prevention",
    ],
  },
  {
    category: "Healthcare & Wellness",
    color: "from-orange-500 to-amber-400",
    bg: "bg-orange-50",
    border: "border-orange-200",
    items: [
      "World Health Day 2022 — 'Our planet, our health'",
      "Lingering post-viral illnesses & immunity rebuilding",
      "Preventive healthcare & lifestyle modifications",
      "Regular health screenings for early detection",
    ],
  },
];

const honors = [
  {
    title: "FICP — Fellow of Indian College of Physicians",
    org: "Indian College of Physicians / APICON",
    date: "2024",
    description:
      "One of India's highest academic distinctions in internal medicine, presented at the APICON convocation in Patna. Reserved for physicians who demonstrate excellence beyond standard practice.",
  },
];

const stats = [
  { value: "21", label: "Newspaper Articles", icon: Newspaper },
  { value: "15+", label: "News Outlets Featured", icon: FileText },
  { value: "1", label: "Authored Health Columns", icon: BookOpen },
  { value: "FICP", label: "National Fellowship", icon: Award },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Articles() {
  return (
    <Layout>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary to-primary/85 text-primary-foreground py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/8 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 animate-slide-up">
            Media & Publications
          </span>
          <h1
            className="text-white mb-4 animate-slide-up"
            style={{ animationDelay: "50ms" }}
          >
            Articles & Blogs
          </h1>
          <p
            className="text-lg text-primary-foreground/85 max-w-2xl animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            Expert medical insights, health columns, and media features by Dr.
            Darshana Reddy across leading publications.
          </p>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-2xl border border-accent/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-slide-up text-center group"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <item.icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                  {item.value}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Authored Article ───────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              By Dr. Darshana Reddy
            </span>
            <h2>Authored Columns</h2>
          </div>

          <div className="space-y-8">
            {authoredArticles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-accent/10 hover:shadow-2xl transition-all duration-500 animate-slide-up"
                style={{ animationDelay: "100ms" }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">
                    {article.publication}
                  </span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  {article.title}
                </h3>

                <p className="text-muted-foreground italic border-l-4 border-accent pl-4 mb-6">
                  "{article.excerpt}"
                </p>

                <div className="space-y-4 mb-6">
                  {article.content.map((para, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:underline group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Read full article on {article.publication}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media Coverage by Category ─────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="mb-12 text-center animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Coverage
            </span>
            <h2>Media Coverage by Topic</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Dr. Reddy has been quoted across 15+ publications on diverse
              health topics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesByCategory.map((cat, idx) => (
              <div
                key={idx}
                className={`${cat.bg} rounded-3xl p-6 border ${cat.border} hover:shadow-lg transition-all duration-300 animate-slide-up group`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${cat.color} mb-5 w-16 group-hover:w-24 transition-all duration-500`}
                />
                <h3 className="text-lg font-bold text-primary mb-4">
                  {cat.category}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quoted In ──────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="mb-12 text-center animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Expert Commentary
            </span>
            <h2>As Quoted In The News</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Dr. Reddy's expert commentary featured in leading national and
              city publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaQuotes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-accent/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Quote className="w-6 h-6 text-accent flex-shrink-0 mt-1 opacity-60" />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-accent/10 text-accent px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {item.publication}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-primary mb-2">
                  {item.topic}
                </h4>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newspaper Clippings ────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Print Media
            </span>
            <h2>Newspaper Clippings</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Scanned articles from Times of India, Bangalore Mirror, Deccan
              Herald, Financial Express, and more.
            </p>
          </div>
          <NewspaperSlider />
        </div>
      </section>

      {/* ── Honors ─────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Recognition
            </span>
            <h2>Awards & Honours</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {honors.map((honor, idx) => (
              <div
                key={idx}
                className="col-span-1 md:col-span-2 bg-gradient-to-br from-accent/5 via-white to-accent/10 rounded-3xl p-8 md:p-10 border border-accent/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up group"
                style={{ animationDelay: "100ms" }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-primary">
                        {honor.title}
                      </h3>
                      <span className="bg-accent/10 text-accent px-3 py-0.5 rounded-full text-xs font-bold">
                        {honor.date}
                      </span>
                    </div>
                    <p className="text-sm text-accent font-semibold mb-2">
                      {honor.org}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {honor.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full -ml-36 -mb-36 blur-3xl opacity-50" />
        <div className="container-max text-center relative z-10">
          <Stethoscope className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="text-white mb-6">Stay Updated on Health Insights</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Follow Dr. Darshana Reddy for the latest in internal medicine,
            diabetes care, respiratory health, and wellness advice.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl group"
          >
            <Calendar className="w-5 h-5 group-hover:animate-bounce-soft" />
            Book a Consultation
          </a>
        </div>
      </section>
    </Layout>
  );
}
