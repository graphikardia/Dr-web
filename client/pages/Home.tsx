import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Users, Stethoscope, Heart, Wind, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const awardImages = [
  { src: "/awards-speech/award-1.jpg",  caption: "Award Ceremony" },
  { src: "/awards-speech/award-2.jpg",  caption: "Medical Conference" },
  { src: "/awards-speech/award-3.jpg",  caption: "FICP Felicitation" },
  { src: "/awards-speech/award-4.jpg",  caption: "Guest Lecture" },
  { src: "/awards-speech/award-5.jpg",  caption: "CME Programme" },
  { src: "/awards-speech/award-6.jpg",  caption: "Panel Discussion" },
  { src: "/awards-speech/award-7.jpg",  caption: "Community Camp" },
  { src: "/awards-speech/award-8.jpg",  caption: "Award Night" },
  { src: "/awards-speech/award-9.jpg",  caption: "Academic Talk" },
  { src: "/awards-speech/award-10.jpg", caption: "Recognition" },
  { src: "/awards-speech/award-11.jpg", caption: "Keynote Address" },
  { src: "/awards-speech/award-12.jpg", caption: "Medical Summit" },
];

function AwardSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = awardImages.length;

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3500);
    setCurrent(c => (c + dir + total) % total);
  };

  const visible = [(current - 1 + total) % total, current, (current + 1) % total];

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-center gap-3 md:gap-6">
        <button onClick={() => go(-1)} className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-3 md:gap-6 items-center justify-center overflow-hidden w-full max-w-3xl">
          {visible.map((imgIdx, pos) => {
            const img = awardImages[imgIdx];
            const isCenter = pos === 1;
            return (
              <div
                key={imgIdx}
                onClick={() => !isCenter && go(pos === 0 ? -1 : 1)}
                className={`relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-500 cursor-pointer ${
                  isCenter ? "border-accent ring-4 ring-accent/25 scale-100 z-10" : "border-transparent scale-90 opacity-40"
                }`}
                style={{ width: isCenter ? 310 : 180, height: isCenter ? 280 : 200 }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const p = e.currentTarget.parentElement;
                    if (p) p.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4"><div class="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-3"><svg xmlns='http://www.w3.org/2000/svg' class='w-7 h-7 text-accent' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg></div><p class='text-sm font-bold text-primary text-center'>${img.caption}</p></div>`;
                  }}
                />
                {isCenter && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                    <p className="text-white text-sm font-semibold text-center">{img.caption}</p>
                  </div>
                )}
                {!isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                    {pos === 0 ? <ChevronLeft className="w-6 h-6 text-white/70" /> : <ChevronRight className="w-6 h-6 text-white/70" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={() => go(1)} className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4 font-medium">{current + 1} / {total}</p>
      <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
        {awardImages.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setCurrent(i); timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3500); }}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-accent/25 hover:bg-accent/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

const stats = [
  { label: "Years of Experience", value: "16+", icon: Stethoscope },
  { label: "OPD Patients Treated", value: "2L+", icon: Users },
  { label: "ICU & IP Patients", value: "Thousands", icon: Heart },
  { label: "Specialisations", value: "6+", icon: Wind },
];

const expertise = [
  { title: "General Medicine", description: "Comprehensive internal medicine care for complex conditions" },
  { title: "Diabetology", description: "Specialized diabetes management & long-term treatment planning" },
  { title: "Respiratory Care", description: "Advanced diagnosis and treatment of respiratory diseases" },
  { title: "Allergy & Asthma", description: "Precise allergy identification and evidence-based management" },
  { title: "Endocrinology", description: "Expert hormonal & metabolic disorder management" },
  { title: "Pulmonology", description: "Comprehensive lung disease specialization & care" },
];

const careerHighlights = [
  { title: "Senior Resident", subtitle: "St. John's Medical College & Hospital, Bangalore" },
  { title: "Consultant", subtitle: "Apollo Hospitals" },
  { title: "Consultant", subtitle: "K C Raju Multispeciality Hospital" },
  { title: "Senior Consultant", subtitle: "Altius Hospital" },
  { title: "FICP", subtitle: "Fellow of Indian College of Physicians" },
];

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
                <Link to="/contact" className="btn-accent hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse-glow">
                  Book Appointment
                </Link>
                <Link to="/about" className="bg-transparent border-2 border-accent/70 text-accent hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  Learn More
                </Link>
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
              <Link to="/about" className="inline-block btn-primary hover:scale-105 hover:shadow-xl transition-all duration-300">
                View Full Profile
              </Link>
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

      {/* Awards & Speech Slider */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">Milestones & Moments</span>
            <h2>Awards & Conferences</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Award ceremonies, medical conferences, keynote addresses, and community health programmes.
            </p>
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
