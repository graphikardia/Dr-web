import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Users, Stethoscope, Heart, Wind, ChevronLeft, ChevronRight, Image, X, ZoomIn } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const awardImages = [
  { src: "/awards-speech/award-1.jpeg",  caption: "Award Ceremony" },
  { src: "/awards-speech/award-2.jpeg",  caption: "Medical Conference" },
  { src: "/awards-speech/award-3.jpeg",  caption: "FICP Felicitation" },
  { src: "/awards-speech/award-4.jpeg",  caption: "Guest Lecture" },
  { src: "/awards-speech/award-5.jpeg",  caption: "CME Programme" },
  { src: "/awards-speech/award-6.jpeg",  caption: "Panel Discussion" },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, startIdx, onClose }: {
  images: { src: string; caption: string }[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const total = images.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % total);
      if (e.key === "ArrowLeft")  setIdx((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, total]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const img = images[idx];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
      onMouseLeave={onClose}
    >
      {/* Close */}
      <button onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tabular-nums">
        {idx + 1} / {total}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + total) % total); }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10">
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>

      {/* Image */}
      <div
        className="relative flex flex-col items-center justify-center px-20 w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={img.src}
          src={img.src}
          alt={img.caption}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
          style={{ animation: "lbFadeIn 0.2s ease" }}
        />
        <p className="text-white/70 text-sm mt-4 font-medium">{img.caption}</p>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % total); }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10">
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Dot strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center px-4 max-w-lg">
        {images.map((_, i) => (
          <button key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`rounded-full transition-all duration-300 ${i === idx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`} />
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
function SlideCard({ img, isCenter, onClick, onMouseEnter, onMouseLeave }: {
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
        ${isCenter
          ? "border-accent ring-4 ring-accent/25 scale-100 z-10 cursor-zoom-in"
          : "border-transparent scale-90 opacity-40 cursor-pointer"}`}
      style={{ width: isCenter ? 310 : 180, height: isCenter ? 280 : 200 }}
    >
      {errored ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-3">
            <Image className="w-7 h-7 text-accent" />
          </div>
          <p className="text-sm font-bold text-primary text-center">{img.caption}</p>
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

      {isCenter && !errored && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
          <p className="text-white text-sm font-semibold text-center">{img.caption}</p>
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
  const [current,  setCurrent]  = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = awardImages.length;

  const resetTimer = (next: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 3500);
    setCurrent(next);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const prev = () => resetTimer((current - 1 + total) % total);
  const next = () => resetTimer((current + 1) % total);
  const visible = [(current - 1 + total) % total, current, (current + 1) % total];

  return (
    <>
      {lightbox && (
        <Lightbox
          images={awardImages}
          startIdx={current}
          onClose={() => setLightbox(false)}
        />
      )}

      <div className="w-full select-none">
        {/* Hint */}
        <p className="text-center text-xs text-accent font-semibold mb-4 flex items-center justify-center gap-1.5">
          <ZoomIn className="w-3.5 h-3.5" /> Hover or click the centre image to view full screen
        </p>

        <div className="flex items-center justify-center gap-3 md:gap-6">
          <button onClick={prev}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-3 md:gap-6 items-center justify-center overflow-hidden w-full max-w-3xl">
            {visible.map((imgIdx, pos) => (
              <SlideCard
                key={imgIdx}
                img={awardImages[imgIdx]}
                isCenter={pos === 1}
                onClick={
                  pos === 1 ? () => setLightbox(true)
                  : pos === 0 ? prev
                  : next
                }
                onMouseEnter={pos === 1 ? () => setLightbox(true)  : undefined}
                onMouseLeave={pos === 1 ? () => setLightbox(false) : undefined}
              />
            ))}
          </div>

          <button onClick={next}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4 font-medium">{current + 1} / {total}</p>
        <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
          {awardImages.map((_, i) => (
            <button key={i} onClick={() => resetTimer(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-accent/25 hover:bg-accent/50"}`} />
          ))}
        </div>
      </div>
    </>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────
const stats = [
  { label: "Years of Experience",  value: "16+",       icon: Stethoscope },
  { label: "OPD Patients Treated", value: "2L+",       icon: Users },
  { label: "ICU & IP Patients",    value: "Thousands", icon: Heart },
  { label: "Specialisations",      value: "6+",        icon: Wind },
];

const expertise = [
  { title: "General Medicine",  description: "Comprehensive internal medicine care for complex conditions" },
  { title: "Diabetology",       description: "Specialized diabetes management & long-term treatment planning" },
  { title: "Respiratory Care",  description: "Advanced diagnosis and treatment of respiratory diseases" },
  { title: "Allergy & Asthma",  description: "Precise allergy identification and evidence-based management" },
  { title: "Endocrinology",     description: "Expert hormonal & metabolic disorder management" },
  { title: "Pulmonology",       description: "Comprehensive lung disease specialization & care" },
];

const careerHighlights = [
  { title: "Senior Resident",   subtitle: "St. John's Medical College & Hospital, Bangalore" },
  { title: "Consultant",        subtitle: "Apollo Hospitals" },
  { title: "Consultant",        subtitle: "K C Raju Multispeciality Hospital" },
  { title: "Senior Consultant", subtitle: "Altius Hospital" },
  { title: "FICP",              subtitle: "Fellow of Indian College of Physicians" },
];

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
          <div key={i} className="absolute w-2 h-2 bg-accent/40 rounded-full animate-bounce-soft"
            style={{ top: `${15 + i * 13}%`, left: `${5 + i * 15}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${2 + i * 0.5}s` }} />
        ))}
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-block bg-accent/20 border border-accent/40 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                ✦ FICP | MD | DNB | Fellowship in Diabetes | DAA
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 animate-slide-up leading-tight" style={{ animationDelay: "100ms" }}>
                Dr. Darshana <span className="text-accent">Reddy</span>
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-3 font-semibold animate-slide-up" style={{ animationDelay: "200ms" }}>
                Senior Consultant — Internal Medicine & Diabetologist
              </p>
              <p className="text-base text-primary-foreground/75 mb-8 leading-relaxed animate-slide-up max-w-lg" style={{ animationDelay: "300ms" }}>
                16 years of dedicated excellence in internal medicine, diabetes management, and respiratory care — serving over 2 lakh OPD patients across Bangalore's leading hospitals.
              </p>
              <div className="flex gap-4 flex-wrap animate-slide-up" style={{ animationDelay: "400ms" }}>
                <Link to="/contact" className="btn-accent hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse-glow">Book Appointment</Link>
                <Link to="/about" className="bg-transparent border-2 border-accent/70 text-accent hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">Learn More</Link>
              </div>
            </div>
            <div className="flex justify-center animate-slide-in-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30 rounded-3xl blur-2xl opacity-70 animate-pulse" />
                <div className="absolute -inset-2 rounded-2xl border-2 border-dashed border-accent/30 animate-spin" style={{ animationDuration: "12s" }} />
                <div className="w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-200 relative border-4 border-white/20 transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F25125c27db8e4312bad1ed13783208b5%2F5541045c8f37402690c453b2a605f8a5?format=webp&width=800&height=1200"
                    alt="Dr. Darshana Reddy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg whitespace-nowrap">
                    <p className="text-primary text-xs font-bold text-center">16 Years · 2L+ OPD Patients</p>
                  </div>
                </div>
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
                <div key={idx} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-accent/5 hover:shadow-xl hover:border-accent border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:-translate-y-3 animate-slide-up cursor-pointer group"
                  style={{ animationDelay: `${idx * 120}ms` }}>
                  <div className="relative inline-block mb-3">
                    <div className="absolute inset-0 bg-accent/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 group-hover:scale-150" />
                    <Icon className="w-9 h-9 text-accent mx-auto relative" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="container-max relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">Clinical Specialties</span>
            <h2>Areas of Expertise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, idx) => (
              <div key={idx} className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:border-accent border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:-translate-y-3 animate-slide-up group cursor-pointer overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-accent to-accent/50 group-hover:h-full transition-all duration-500 rounded-t-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground relative z-10">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 blur-3xl" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-4">Professional Background</span>
              <h2 className="mb-6">About Dr. Darshana</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Dr. Darshana Reddy is a highly accomplished physician with 16 years of experience in internal medicine. She holds the prestigious FICP (Fellow of Indian College of Physicians) — one of India's highest distinctions in medicine.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With advanced certifications including MD, DNB, Fellowship in Diabetes, and a Diploma in Allergy &amp; Asthma from CMC Vellore, she brings unmatched expertise to complex medical conditions.
              </p>
              <Link to="/about" className="inline-block btn-primary hover:scale-105 hover:shadow-xl transition-all duration-300">View Full Profile</Link>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 rounded-2xl border border-accent/20 hover:shadow-xl transition-all duration-300 animate-slide-in-right transform hover:scale-105">
              <h4 className="font-bold text-primary mb-5 text-lg">Career Highlights</h4>
              <div className="space-y-4">
                {careerHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-2.5 h-2.5 bg-accent rounded-full mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <div>
                      <h4 className="font-bold text-primary group-hover:text-accent transition-colors duration-300 text-base">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones & Moments — Award Slider with Lightbox */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">Milestones & Moments</span>
            <h2>Awards & Conferences</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Award ceremonies, medical conferences, keynote addresses, and community health programmes.</p>
          </div>
          <AwardSlider />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/85 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mr-48 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full -ml-40 blur-3xl animate-bounce-soft pointer-events-none" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-accent rounded-full animate-ping"
            style={{ top: `${20 + i * 15}%`, left: `${10 + i * 18}%`, animationDelay: `${i * 0.6}s` }} />
        ))}
        <div className="container-max text-center relative z-10">
          <h2 className="text-white mb-6 animate-slide-up">Ready for Your Consultation?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "100ms" }}>
            Book your appointment with Dr. Darshana Reddy for personalised, expert medical care delivered with compassion.
          </p>
          <Link to="/contact" className="inline-block bg-accent text-accent-foreground hover:opacity-90 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-slide-up animate-pulse-glow"
            style={{ animationDelay: "200ms" }}>
            Book Your Appointment Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}
