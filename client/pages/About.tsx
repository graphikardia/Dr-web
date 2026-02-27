"use client";
import { Layout } from "@/components/Layout";
import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { JourneyMap } from "@/components/JourneyMap";

// ── Newspaper Slider ──────────────────────────────────────────────────────────
const newspaperImages = Array.from({ length: 23 }, (_, i) => ({
  src: `/newspaper/article-${i + 1}.jpeg`,
  caption: `Article ${i + 1}`,
}));

function NewspaperCard({ img, isCenter }: { img: { src: string; caption: string }; isCenter: boolean }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className={`relative rounded-xl overflow-hidden transition-all duration-500 flex-shrink-0 ${isCenter ? "w-72 h-96 shadow-2xl scale-100 z-10" : "w-56 h-80 opacity-50 scale-95 z-0"}`}>
      {errored
        ? <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">{img.caption}</div>
        : <img src={img.src} alt={img.caption} className="w-full h-full object-cover" onError={() => setErrored(true)} />}
      {isCenter && !errored && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-white text-sm font-medium">{img.caption}</p>
        </div>
      )}
    </div>
  );
}

function NewspaperSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = newspaperImages.length;
  const resetTimer = (next: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
    setCurrent(next);
  };
  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const visible = [(current - 1 + total) % total, current, (current + 1) % total];
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <button onClick={() => resetTimer((current - 1 + total) % total)} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-accent/10 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
        <div className="flex items-end gap-4 overflow-hidden">
          {visible.map((imgIdx, pos) => <NewspaperCard key={imgIdx} img={newspaperImages[imgIdx]} isCenter={pos === 1} />)}
        </div>
        <button onClick={() => resetTimer((current + 1) % total)} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-accent/10 transition-colors"><ChevronRight className="w-5 h-5" /></button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{current + 1} / {total}</span>
        <div className="flex gap-1.5">
          {newspaperImages.map((_, i) => <button key={i} onClick={() => resetTimer(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-accent/25 hover:bg-accent/50"}`} />)}
        </div>
      </div>
    </div>
  );
}

// ── Education Timeline ────────────────────────────────────────────────────────
const education = [
  { degree: "M.B.B.S",                                      institution: "Navodaya Medical College",               year: "2010" },
  { degree: "M.D (General Medicine)",                        institution: "Navodaya Medical College",               year: "2013" },
  { degree: "D.N.B (General Medicine)",                      institution: "National Board of Examinations",         year: "2013" },
  { degree: "Fellowship in Diabetes",                        institution: "Medvarsity, affiliated to Liverpool UK", year: "2015" },
  { degree: "Diploma in Allergy & Asthma (DAA)",            institution: "C.M.C, Vellore",                        year: "2016" },
  { degree: "FICP — Fellow of Indian College of Physicians", institution: "Indian College of Physicians",           year: "2024" },
];

function EducationTimeline() {
  const [visible, setVisible] = useState<boolean[]>(new Array(education.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting)
          setTimeout(() => setVisible((prev) => { const n = [...prev]; n[i] = true; return n; }), i * 120);
      }, { threshold: 0.2 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);
  return (
    <div className="relative">
      <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-300 to-emerald-100 rounded-full" />
      <div className="space-y-5">
        {education.map((edu, idx) => (
          <div key={idx} ref={(el) => (itemRefs.current[idx] = el)}
            className={`relative flex gap-4 transition-all duration-500 ${visible[idx] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center shadow-md">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight">{edu.degree}</h4>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">{edu.year}</span>
              </div>
              <p className="text-sm text-gray-500">{edu.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────
const affiliations = [
  "Executive Committee Member — API (2023–2026)",
  "Current Executive Committee Member — API (2025–26)",
  "Internal Audit Committee Member — API (2025–26)",
  "Life Member — Respiratory Society of South India (RSSDI)",
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
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Dr. Darshana Reddy</h1>
          <p className="text-lg text-blue-600 font-medium">FICP · MD · DNB · Senior Consultant, Internal Medicine & Diabetologist</p>
        </div>
      </section>

      {/* Stats + Bio */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 mb-10">
            {[
              { value: "16+",  label: "Years of Clinical Experience",         icon: "🏥" },
              { value: "2L+",  label: "OPD Patients Treated",                 icon: "👥" },
              { value: "FICP", label: "Fellow of Indian College of Physicians",icon: "🎓" },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-2xl font-bold text-blue-700 mb-1">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-gray-600 space-y-3">
            <p>Dr. Darshana Reddy is a distinguished physician with 16 years of progressive experience in internal medicine, commanding a reputation for clinical excellence and patient-centric care. Having treated over 2 lakh OPD patients — in addition to countless ICU and in-patient cases — she has become one of the most trusted healthcare providers in Bangalore.</p>
            <p>She holds the prestigious FICP (Fellow of Indian College of Physicians) designation, earned through demonstrated excellence in internal medicine. Dr. Reddy has worked at Bangalore's most respected institutions — from St. John's Medical College to Apollo Hospitals — bringing academic rigour and clinical expertise to every patient encounter.</p>
          </div>
        </div>
      </section>

      {/* ── Career Journey Map  +  Qualifications ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — winding journey map */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Work Experience</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Career Journey</h2>
                <p className="text-gray-500 text-sm mt-1">A winding path through Bangalore's most prestigious medical institutions.</p>
              </div>

              {/* colour key */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                {[
                  { label: "St. John's Medical College", bg: "#BCE5FF" },
                  { label: "Apollo Hospitals",           bg: "#E5EBF2" },
                  { label: "K C Raju Multispeciality",   bg: "#E5EBF2" },
                  { label: "Altius Hospital",            bg: "#BCE5FF" },
                ].map((k, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full border border-blue-300 flex-shrink-0" style={{ backgroundColor: k.bg }} />
                    {k.label}
                  </div>
                ))}
              </div>

              <JourneyMap />
              <p className="text-xs text-gray-400 text-center mt-3">Hover over icons to explore each role</p>
            </div>

            {/* RIGHT — education */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">Qualifications</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Educational Background</h2>
                <p className="text-gray-500 text-sm mt-1">Academic credentials from India's leading medical institutions.</p>
              </div>
              <EducationTimeline />
            </div>

          </div>
        </div>
      </section>

      {/* Newspaper Slider */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">Media Coverage</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Newspaper Articles</h2>
            <p className="text-gray-500 text-sm mt-2">Regularly featured in Times of India, Bangalore Mirror, and Deccan Herald.</p>
          </div>
          <NewspaperSlider />
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-widest text-purple-500 uppercase">Memberships</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Professional Affiliations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {affiliations.map((a, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Service */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-widest text-rose-500 uppercase">Giving Back</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Community Service & Engagement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {community.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-rose-50 rounded-xl p-4 border border-rose-100">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-rose-500 text-sm font-bold">{idx + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
