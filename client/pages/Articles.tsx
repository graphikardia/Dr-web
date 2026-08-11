import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Stethoscope,
  Calendar,
  ZoomIn,
} from "lucide-react";

interface ArticleData {
  id: number;
  image: string;
  topic: string;
  publication: string;
  date: string;
  text: string;
}

const articleData: ArticleData[] = [
  {
    id: 1,
    image: "/newspaper/article-1.jpeg",
    topic:
      "Asthma cases on rise, doctors point to poor air quality & late diagnosis",
    publication: "Times of India",
    date: "May 2025",
    text: `Asthma cases on rise, doctors point to poor air quality & late diagnosis
Yashaswini.Sri @timesofindia.com

Bengaluru: Asthma tightening its grip on the city, hospitals reporting a 25% rise in cases and 15% increase in hospitalisation the past five years. Doctors attribute the spike to deteriorating air quality, rampant construction dust and frequent weather fluctuations, noting that the condition is becoming both more common and harder to manage.

WORLD ASTHMA DAY

Following Covid, recovery from viral infections is taking longer, and many people without prior asthma history are now developing post-viral wheeze requiring long-term inhalers. Either way, asthma outcomes are getting worse," said Dr Vivek Anand Padegal, director of pulmonology at Fortis Hospital.

Dr Darshana Reddy, senior consultant at Altius Hospital, highlighted that over 70% of asthma cases in Bengaluru remain undiagnosed.

"Prevalence has jumped from 9% to 25% in five years, especially due to air pollution and underdiagnosis. Symptoms like cough and wheezing often mistaken for other conditions. After the lockdown ended, increased vehicular emissions and low mixing worsened air quality. In children alone, it's as high as 19.4%," she said.`,
  },
  {
    id: 3,
    image: "/newspaper/article-3.jpeg",
    topic: "Trouble in the air? B'lureans huff & puff as pollution surges",
    publication: "Times of India",
    date: "2024",
    text: `Trouble in the air? B'lureans huff & puff as pollution surges
Yashaswini.Sri @timesofindia.com

Bengaluru: Several Bengalureans are battling eye irritation, cough and respiratory discomfort. Many complain that what once was a seasonal irritation is now turning into a year-round challenge. The reason, according to doctors, is the alarming rise in levels of PM2.5 and PM10 in the city.

Doctors highlight the growing link between pollution and these ailments, warning of potential long-term risks. PM10 levels have exceeded safe limits, while PM2.5 continues to rise.

Dr Darshana Reddy | Senior Consultant, Internal Medicine and Allergologist, Altius Hospital:
"PM10 affects the upper airways, triggering allergies, asthma and COPD, while PM2.5 leads to lung infections, inflammation and even genetic mutations linked to cancer. Long-term exposure increases the risk of heart attacks, strokes, diabetes and cognitive decline in children. Pregnant women face risks of premature births and low birth weight babies. With vehicular emissions being the primary source, vulnerable groups like children and the elderly remain most affected."`,
  },
  {
    id: 4,
    image: "/newspaper/article-4.jpeg",
    topic:
      "Rain & pain: Bengaluru hospitals see surge in viral infection cases",
    publication: "Times of India",
    date: "May 2025",
    text: `Rain & pain: Bengaluru hospitals see surge in viral infection cases
Yahaswini.Sri@timesofindia.com

Bengaluru: As pre-monsoon showers turn into full-blown rain across Bengaluru, city hospitals are witnessing a surge in viral infections, particularly respiratory illnesses. Doctors are reporting a spike in cases of cold, cough, fever, flu-like symptoms.

They say key triggers are sudden temperature drops, rising humidity, and increased social mixing in closed environments.

Dr Darshana Reddy, senior consultant in internal medicine at Altius Hospital in HBR Layout, said: "We're seeing an increase in upper respiratory tract infections, especially the common cold, cough, and flu-like illnesses. About 60-70% of my OPD is now respiratory viral cases. The sudden weather shifts and rise in humidity are creating the perfect recipe for viruses to thrive and spread."

Alongside respiratory infections, there's also an uptick in cases of viral fevers accompanied by body aches, fatigue, sore throat, and even viral arthritis. Dr Reddy said she's treating about 7-8 such patients daily, with children, elderly, and adults with compromised immunity being the most vulnerable.`,
  },
  {
    id: 5,
    image: "/newspaper/article-5.jpeg",
    topic: "K'taka Issues Advisory on HMPV; Taking Steps to Prevent Spread: CM",
    publication: "Times of India",
    date: "2025",
    text: `TWO CASES DETECTED, HAVE NO HISTORY OF INTERNATIONAL TRAVEL

K'taka Issues Advisory on HMPV; Taking Steps to Prevent Spread: CM
Puran Choudhary

Bengaluru: Two cases of Human Metapneumovirus (HMPV) were reported in Bengaluru in two infants on Monday. The 3-month-old girl and 8-month-old boy were tested positive for the virus at the city's private Baptist Hospital.

The Indian Council of Medical Research (ICMR) said both cases had no history of international travel and while the girl has been discharged from the hospital, the boy is recovering.

DOCTORS CALL FOR MORE TESTING
"People need to understand that HMPV is no different from other respiratory viruses. If we follow these precautions, the risk of spread can be minimised," senior consultant of internal medicine and allergologist at Altius Hospital Darshana Reddy said. Early detection and timely treatment can help manage complications and avoid hospitalisation or ICU stays, she said. Reddy recommended that the government conduct rapid screenings.

"Right now, we don't have a vaccine for HMPV, unlike Covid-19. More testing will also aid research and help us develop a vaccine in the future," the doctor said.`,
  },
  {
    id: 6,
    image: "/newspaper/article-6.jpeg",
    topic: "3rd time lucky? Schools told to reintroduce water bells",
    publication: "Times of India",
    date: "2024",
    text: `3rd time lucky? Schools told to reintroduce water bells
Times News Network

Bengaluru: Failed in 2019 and 2022. Will the reintroduction of water bells — an attempt to encourage students to stay hydrated in schools — pass the test this time around?

State govt has brought back water bells in all schools in the state — govt, aided and unaided schools. Water bells rang thrice a day — at 10.35am, 12 noon and 2pm — in the first two attempts.

Water bells — short pauses between classes to remind students to stay hydrated — was first introduced in 2019 by the then primary and secondary education minister S Suresh Kumar.`,
  },
  {
    id: 7,
    image: "/newspaper/article-7.jpeg",
    topic: "Move suggested by child rights panel — Water Bells",
    publication: "Times of India",
    date: "2024",
    text: `Move suggested by child rights panel — Continued from page 1

The concept was introduced in the state by the then primary and secondary education minister S Suresh Kumar in 2019 on the suggestion of his colleague, the then tourism minister CT Ravi. At that time, Kerala had launched the initiative.

The Karnataka project was barely implemented when the Covid-19 pandemic ended physical attendance in schools for nearly two years.

Dr Darshana Reddy | Senior Consultant (Internal Medicine) & Medical Superintendent, Altius Hospital:
"The water bell initiative will improve concentration and learning outcomes, build a healthy lifelong habit, and is a low-cost intervention that can be integrated with nutrition & wellness programmes. A practical, non-disruptive schedule would be every 60-90 min, typically 3-4 times during school hours."`,
  },
  {
    id: 8,
    image: "/newspaper/article-8.jpeg",
    topic: "Do school children need reminders for drinking water?",
    publication: "Times of India",
    date: "2024",
    text: `Do school children need reminders for drinking water? How harmful is dehydration in children? How important is the water-bell initiative?

3rd time lucky? Schools told to reintroduce water bells
Times News Network

Bengaluru: Failed in 2019 and 2022. Will the reintroduction of water bells — an attempt to encourage students to stay hydrated in schools — pass the test this time around?

State govt has brought back water bells in all schools in the state — govt, aided and unaided schools. Water bells rang thrice a day — at 10.35am, 12 noon and 2pm in the first two attempts.

According to experts, kids often do not recognise thirst early, especially when they are engaged in classes or playing. Say state govt initiative will build a healthy lifelong habit, and is a low-cost intervention.`,
  },
  {
    id: 9,
    image: "/newspaper/article-9.jpeg",
    topic: "Public feeding of pigeons: For or against?",
    publication: "Bangalore Mirror",
    date: "2024",
    text: `Public feeding of pigeons: For or against? — CONTINUED FROM PAGE 1

"Urban pigeon overpopulation has emerged as an under-recognised environmental health hazard. The fine particulate matter generated from droppings and feathers contaminates indoor air and predisposes residents to chronic respiratory illness. The immunologic response to avian proteins and fungal antigens found in pigeon debris can mimic other interstitial lung diseases, often leading to delayed diagnosis and progressive fibrosis. We are seeing an increasing subset of patients with unexplained dyspnea, hypoxia, and ground-glass opacities on imaging, later traced back to chronic pigeon exposure—highlighting the need for detailed environmental history in respiratory evaluation," said Dr Darshana Reddy, Altius Hospital.

She noted that once pulmonary fibrosis develops secondary to pigeon exposure, the damage is largely irreversible making early recognition and cessation of exposure remain the only effective preventive strategies. "ICU admissions are necessary for severe respiratory failure following exposure to pigeon nests or droppings, especially in immunocompromised or elderly individuals, underscoring the potential for acute exacerbations," she said.`,
  },
  {
    id: 10,
    image: "/newspaper/article-10.jpeg",
    topic: "Move suggested by child rights panel — Water Bells (page 2)",
    publication: "Times of India",
    date: "2024",
    text: `Move suggested by child rights panel — Continued from page 1

The concept was introduced in the state by the then primary and secondary education minister S Suresh Kumar in 2019 on the suggestion of his colleague, the then tourism minister CT Ravi.

This time, the decision to reintroduce water bells was taken on the recommendation of Karnataka State Commission for Protection of Child Rights (KSCPCR) to the education department.

Dr Darshana Reddy | Senior Consultant (Internal Medicine) & Medical Superintendent, Altius Hospital:
"The water bell initiative will improve concentration and learning outcomes, build a healthy lifelong habit, and is a low-cost intervention that can be integrated with nutrition & wellness programmes. A practical, non-disruptive schedule would be every 60-90 min, typically 3-4 times during school hours."`,
  },
  {
    id: 11,
    image: "/newspaper/article-11.jpeg",
    topic: "Water Bells — Expert Quote Close-up",
    publication: "Times of India",
    date: "2024",
    text: `The water bell initiative will improve concentration and learning outcomes, build a healthy lifelong habit, and is a low-cost intervention that can be integrated with nutrition & wellness programmes. A practical, non-disruptive schedule would be every 60-90 min, typically 3-4 times during school hours.

Dr Darshana Reddy | Senior Consultant (Internal Medicine) & Medical Superintendent, Altius Hospital`,
  },
  {
    id: 12,
    image: "/newspaper/article-12.jpeg",
    topic: "Candida auris fungal infection",
    publication: "Times of India",
    date: "2024",
    text: `"Candida auris is a formidable fungal pathogen causing outbreaks, particularly in healthcare facilities. It poses a significant threat due to its resistance to multiple antifungal drugs, rendering treatment challenging. Its ability to persist on surfaces and spread between patients makes containment efforts complex," says Dr Darshana Reddy, MBBS, MD, DNB Internal Medicine, Senior Consultant, Internal Medicine, Altius hospital, HBR layout.`,
  },
  {
    id: 13,
    image: "/newspaper/article-13.jpeg",
    topic: "Tummy ache? Blame it on too many mangoes",
    publication: "Bangalore Mirror / Times of India",
    date: "July 2022",
    text: `Tummy ache? Blame it on too many mangoes
Iffath.Fathima @timesgroup.com

Bengalureans love their mangoes. But too many mangoes might just land you in the doctor's chamber as doctors are reporting an increase in the incidence of gastric and diarrhoea due to overconsumption of mangoes.

Dr Darshana Reddy, senior consultant, internal medicine, Altius Hospitals, HBR layout said: "There are a few side effects of consuming mangoes in large quantities. The most common ones are diarrhoea and gastritis. I have patients who eat kilos of mangoes in a day."

There are several reasons for this. Mango is rich in fibre and sorbitol, a type of sugar that enables gut motility, informed Reddy.

"Diarrhoea does not ensue when mangoes are consumed in moderation. However excessive consumption may result in increased frequency of upset stomach. Ripening of commercially sold mangoes is not natural. Mangoes are picked before they achieve early ripening. There are several chemicals that are being used to achieve it like calcium carbide. These chemicals can be harmful to the gut. Treated mangoes soaked for 15 minutes in water releases a pungent smell," Reddy added.`,
  },
  {
    id: 14,
    image: "/newspaper/article-14.jpeg",
    topic: "Deforestation and rapid urbanization — health impact",
    publication: "Times of India",
    date: "2024",
    text: `Deforestation and rapid urbanization is progressing at a fast pace at the cost of our planet, Dr. Darshana Reddy, Senior Consultant - Internal Medicine, Altius Hospital, Bangalore pointed out.

"Rising temperatures increase the risk of extreme heat leading to headache, confusion, tiredness, and vomiting. Temperatures above 40 degrees result in heat strokes causing organ failure and hospitalization, sometimes even death," she explained.`,
  },
  {
    id: 15,
    image: "/newspaper/article-15.jpeg",
    topic: "Lingering illnesses rise, docs flag immunity issues",
    publication: "Times of India",
    date: "February 2025",
    text: `Lingering illnesses rise, docs flag immunity issues
Yashaswini.Sri @timesofindia.com

Bengaluru: Fever, cough, fatigue — which were once a passing seasonal flu — now seem to linger for weeks, leaving Bengalureans drained and frustrated.

Gastrointestinal infections have tripled, with an alarming increase in stomach flu, rotavirus, salmonella, typhoid, and E. coli cases, according to Dr Darshana Reddy, senior consultant in internal medicine at Altius Hospital.

"Compared to last year, respiratory illnesses have risen by at least 20%, including allergic rhinitis cases. Cases of influenza H1N1 are spiking, and post-viral coughs are lingering for weeks. Severe sinusitis and congestion are also leading to absenteeism and reduced productivity," she added.`,
  },
  {
    id: 16,
    image: "/newspaper/article-16.jpeg",
    topic: "Dengue cases surge in Bengaluru",
    publication: "Times of India",
    date: "2023",
    text: `Dr Darshana Reddy, consultant, internal medicine, Altius Hospital, said they usually see a spurt in dengue cases by May and a peak in September-October each year. However, this year they have witnessed cases surge by early January-March.

"It is probably because of ease in Covid restrictions and people stepping out. There have been about 1,417 cases of dengue in Karnataka up to early May this year with no deaths noted as per the National Centre for Vector-Borne Diseases. Almost 80% of the cases are from Bengaluru," Dr Reddy said.`,
  },
  {
    id: 17,
    image: "/newspaper/article-17.jpeg",
    topic: "Omicron third wave — mild due to vaccination",
    publication: "Times of India",
    date: "2022",
    text: `Dr Darshana Reddy, consultant, Internal Medicine, Altius Hospital, Bangalore, who saw many young people who tested positive during the third wave, agreed with the report findings, saying that thankfully most of the cases were mild, as a result of a successful vaccination drive that had undoubtedly proved useful.

"The number of people infected with Omicron was dramatically higher than at any other time in the pandemic. The infection is mild in most individuals, but those who have severe illness still represent a significant number," Dr Reddy said.`,
  },
  {
    id: 18,
    image: "/newspaper/article-18.jpeg",
    topic: "Small Size Kidney (Hindi) — Expert Opinion",
    publication: "Hindi News",
    date: "2024",
    text: `Hindi article on Small Size Kidney (renal hypoplasia). Dr. Darshana R, Consultant Internal Medicine, Altius Hospital, Bangalore quoted as medical expert.`,
  },
  {
    id: 19,
    image: "/newspaper/article-19.jpeg",
    topic: "World Health Day 2022 — 'Our planet, our health'",
    publication: "WHO / Times of India",
    date: "April 2022",
    text: `World Health Day 2022 - theme — "Our planet, our health." Amid a pandemic, a polluted planet, increasing diseases like cancer, asthma, heart disease, on World Health Day 2022, WHO has claimed global attention on the interconnectedness between the planet and our health, urgent actions needed to keep humans and the planet healthy and foster a movement to create societies focused on well-being.`,
  },
  {
    id: 20,
    image: "/newspaper/article-20.jpeg",
    topic:
      "13°C to 31°C: Weather flip-flop leaves Bengalureans sniffling and wheezing",
    publication: "Times of India",
    date: "February 2026",
    text: `13°C to 31°C: Weather flip-flop leaves Bengalureans sniffling and wheezing
Jahnavi@timesofindia.com

Bengaluru: The city's once-predictable weather has turned capricious. Mornings now arrive with a sharp chill — temperatures dipping to 13-14°C — only for afternoons to climb swiftly to a sweltering 31°C. The stark swing within a matter of hours is driving an uptick in visits to clinics across neighbourhoods.

Doctors report a noticeable surge in respiratory illnesses, including bronchitis, viral flu, persistent cough, sore throat and fever.

"Compared to last year, we're seeing a 50% rise in such cases. On an average day, we now consult 10-15 patients, reflecting a rise in both outpatient visits and inpatient admissions. This surge is largely driven by sharp weather fluctuations, worsening air pollution and unhealthy dietary habits," said Dr Ajay HR, consultant in internal medicine, Prakriya Hospitals.

Doctors note children's immunity is still developing, while older adults — particularly those with diabetes, asthma or COPD — are more sensitive to temperature swings.`,
  },
  {
    id: 21,
    image: "/newspaper/article-21.jpeg",
    topic: "Tomato flu — rare viral infection explained",
    publication: "Financial Express",
    date: "2022",
    text: `"The name 'tomato flu' is a misnomer. It is a rare viral infection of uncertain origin that gets its name from the typical tomato-shaped red rashes that it causes on the body of infected individuals. It is not known if the fever is related to chikungunya or dengue that it mimicks in presentation," Dr. Darshana Reddy, Consultant — Internal Medicine, Altius Hospital, Bangalore told Financial Express.com.`,
  },
  {
    id: 22,
    image: "/newspaper/article-22.jpeg",
    topic:
      "Late nights, skipped meals — Bengaluru's daily routine triggering migraine attacks",
    publication: "Times of India",
    date: "June 2026",
    text: `Late nights, skipped meals — Bengaluru's daily routine triggering migraine attacks

Bengaluru: The city's notorious traffic, endless work calls, late-night shifts, and irregular meal timings are doing more than just causing fatigue. Neurologists say Bengaluru's fast-paced urban lifestyle is leading to migraine attacks in people who are already predisposed to the condition.

"Migraine is not merely a headache; it is largely a lifestyle disorder. People today are constantly chasing deadlines, spending hours commuting, working across time zones and getting very little time to relax. This combination of chronic stress, poor sleep, and lack of recovery is what drives migraine attacks," said Dr Satishchandra P, neurologist at Apollo Speciality Hospitals, Jayanagar.

Migraine affects nearly 12-15% of adults globally, while a recent population-based study in Karnataka estimated that 14-25% of adults in both urban and rural areas suffer from the condition, according to Dr Santosh NS, consultant neurologist at Manipal Hospital Whitefield.

He said migraines usually begin between 15 and 20 years of age and are most common among people aged 20-50 years. Diagnosis is clinical and based on the International Headache Society criteria, which includes recurrent headache episodes lasting between four hours and three days, often accompanied by nausea, vomiting, and sensitivity to light or sound.

Migraine patients are particularly sensitive to bright lights, loud sounds, hunger, emotional stress and even sudden weather changes, said Dr Santosh.

According to Dr Darshana Reddy, senior consultant and medical superintendent at Altius Hospital, migraine is influenced by a combination of genetic susceptibility and environmental triggers. "Long working hours, shift work resulting in irregular sleep schedules, work-related stress, excessive screen time, dehydration, irregular meal timings, traffic congestion, air pollution and bright sunlight are all common triggers in Bengaluru," she said, adding that a trigger alone does not cause migraine but precipitates an attack in someone who is already susceptible.

Sleep disruption further worsens the problem. "Both inadequate sleep and oversleeping can trigger migraines," Dr Santosh said. "Many IT professionals working in US or UK shifts experience headaches because their circadian rhythm is disturbed."

Women are two to three times more likely than men to develop migraine because of hormonal fluctuations during menstruation, pregnancy and menopause, Dr Santosh added.

Doctors say treatment extends well beyond painkillers. Regular sleep schedules, eating meals on time, staying hydrated, exercising moderately, limiting screen exposure, and managing stress through meditation or relaxation techniques form the cornerstone of migraine management. For people with frequent attacks, preventive medication may also be prescribed.

Food habits also matter
Chocolates, aged cheese, foods containing monosodium glutamate (MSG), processed meats, artificial sweeteners, alcohol, excessive caffeine or even caffeine withdrawal can trigger migraine in some individuals, according to the doctors. "Strong perfumes, incense sticks, vehicular exhaust, flashing lights and sudden weather changes are among other less-recognised triggers," Dr Darshana said. She recommends maintaining a headache diary to help identify personal triggers.`,
  },
];

const monthMap: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};
function sortVal(d: string) {
  const p = d.split(" ");
  if (p.length === 2) return +p[1] * 12 + (monthMap[p[0].toLowerCase()] ?? 0);
  return +p[0] * 12 + 6;
}
articleData.sort((a, b) => sortVal(b.date) - sortVal(a.date));

const articleImages = articleData.map((a) => ({
  src: a.image,
  caption: a.topic,
}));

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
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, images.length]);
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
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center"
      >
        <X className="w-7 h-7 text-white" />
      </button>
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {idx + 1} / {images.length}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i - 1 + images.length) % images.length);
        }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>
      <div className="relative flex flex-col items-center justify-center px-20 w-full h-full">
        <img
          key={img.src}
          src={img.src}
          alt={img.caption}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
          style={{ animation: "fadeIn 0.2s ease" }}
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i + 1) % images.length);
        }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center"
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
    </div>
  );
}

export default function Articles() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  return (
    <Layout>
      <SEOHead
        title="Articles & Blogs - Dr. Darshana Reddy"
        description="Medical articles, newspaper features, and health columns by Dr. Darshana Reddy. Expert insights on internal medicine, diabetes, respiratory health, and wellness from leading publications."
        canonical="/articles"
        ogType="article"
      />
      {lightboxIdx !== null && (
        <Lightbox
          images={articleImages}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

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

      {/* ── Event Highlights ─────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="mb-10 text-center animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Event Highlights
            </span>
            <h2>Professional Engagements & CME Programs</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Dr. Reddy regularly speaks at national and regional physician conferences on diabetes, internal medicine, and evidence-based practice.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            {/* TS APICON 2026 Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-accent/10 animate-slide-up hover:shadow-lg transition-all" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/3 flex flex-col justify-center">
                  <span className="text-xs font-bold tracking-wider text-accent uppercase mb-2">Speaker &middot; Invited Talk</span>
                  <h3 className="text-2xl font-bold text-primary mb-3">10th Annual Conference of API Telangana State</h3>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4 font-medium">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> 11–12 July 2026</span>
                    <span className="flex items-center gap-2">📍 ESCI, Gachibowli, Hyderabad</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Organized by Association of Physicians of India – Telangana State, hosted by API Hyderabad Chapter.<br/><br/>
                    Presented on: <strong className="text-primary/90">"Asymptomatic Hyperuricemia — An Innocent Bystander or a Menacing Foe?"</strong>
                  </p>
                </div>
                
                <div className="lg:w-2/3 w-full aspect-video md:h-80 relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
                   <style>{`
                   .slider-track {
                     display: flex;
                     width: 400%;
                     height: 100%;
                     animation: scroll-slide 16s infinite ease-in-out;
                   }
                   .slider-track:hover {
                     animation-play-state: paused;
                   }
                   @keyframes scroll-slide {
                     0%, 20% { transform: translateX(0); }
                     25%, 45% { transform: translateX(-25%); }
                     50%, 70% { transform: translateX(-50%); }
                     75%, 95% { transform: translateX(-75%); }
                     100% { transform: translateX(0); }
                   }
                   `}</style>
                   <div className="slider-track">
                     <div className="w-[25%] h-full flex items-center justify-center bg-gray-100 shrink-0 p-2 md:p-4">
                       <img src="/newspaper/ts-apicon-2026-dr-darshana-reddy-speaking.jpeg" onError={(e) => { if(e.currentTarget.src.includes('newspaper')) { e.currentTarget.src = '/ts-apicon-2026-dr-darshana-reddy-speaking.jpeg'; } else { e.currentTarget.src = 'https://placehold.co/800x500/101827/ffffff?text=Speaking'; } }} alt="Dr. Darshana Reddy speaking at TS APICON 2026, Hyderabad" className="w-full h-full object-contain shadow-sm rounded-lg" />
                     </div>
                     <div className="w-[25%] h-full flex items-center justify-center bg-gray-100 shrink-0 p-2 md:p-4">
                       <img src="/newspaper/ts-apicon-2026-case-presentation-hyperuricemia.jpeg" onError={(e) => { if(e.currentTarget.src.includes('newspaper')) { e.currentTarget.src = '/ts-apicon-2026-case-presentation-hyperuricemia.jpeg'; } else { e.currentTarget.src = 'https://placehold.co/800x500/101827/ffffff?text=Case+Presentation'; } }} alt="Case presentation slide on asymptomatic hyperuricemia, TS APICON 2026" className="w-full h-full object-contain shadow-sm rounded-lg" />
                     </div>
                     <div className="w-[25%] h-full flex items-center justify-center bg-gray-100 shrink-0 p-2 md:p-4">
                       <img src="/newspaper/ts-apicon-2026-definition-thresholds-slide.jpeg" onError={(e) => { if(e.currentTarget.src.includes('newspaper')) { e.currentTarget.src = '/ts-apicon-2026-definition-thresholds-slide.jpeg'; } else { e.currentTarget.src = 'https://placehold.co/800x500/101827/ffffff?text=Slide'; } }} alt="Slide comparing hyperuricemia diagnostic thresholds across ACR, EULAR, and other guidelines" className="w-full h-full object-contain shadow-sm rounded-lg" />
                     </div>
                     <div className="w-[25%] h-full flex items-center justify-center bg-gray-100 shrink-0 p-2 md:p-4">
                       <img src="/newspaper/ts-apicon-2026-felicitation-dr-darshana-reddy.jpeg" onError={(e) => { if(e.currentTarget.src.includes('newspaper')) { e.currentTarget.src = '/ts-apicon-2026-felicitation-dr-darshana-reddy.jpeg'; } else { e.currentTarget.src = 'https://placehold.co/800x500/101827/ffffff?text=Felicitation'; } }} alt="Dr. Darshana Reddy being felicitated at TS APICON 2026" className="w-full h-full object-contain shadow-sm rounded-lg" />
                     </div>
                   </div>
                   <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-50 bg-black/40 px-3 py-1.5 rounded-full pointer-events-none z-10">
                     <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                     <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                     <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                     <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* KAPICON 2026 Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-accent/10 h-full flex flex-col animate-slide-up hover:shadow-lg transition-all" style={{ animationDelay: "200ms" }}>
                <div className="mb-4 flex-1">
                  <span className="text-xs font-bold tracking-wider text-accent uppercase mb-2 block">Dignitary</span>
                  <h3 className="text-lg font-bold text-primary mb-2">43rd Annual Conference API Karnataka</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-accent" /> 8–10 May 2026</span>
                    <span className="flex items-center gap-1">📍 SIMS, Shivamogga</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    KAPICON 2026 — Theme: "Inspiring Minds, Improving Care".
                  </p>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-video bg-gray-100 flex-shrink-0">
                   <img src="/newspaper/kapicon-shivamogga-2026-group-photo.jpeg" onError={(e) => { e.currentTarget.src = '/kapicon-shivamogga-2026-group-photo.jpeg' }} alt="Group photo of dignitaries at KAPICON Shivamogga 2026" className="w-full h-full object-cover object-center" />
                </div>
              </div>

              {/* CME Video Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-accent/10 h-full flex flex-col animate-slide-up hover:shadow-lg transition-all" style={{ animationDelay: "300ms" }}>
                <div className="mb-4 flex-1">
                  <span className="text-xs font-bold tracking-wider text-accent uppercase mb-2 block">CME Session</span>
                  <h3 className="text-lg font-bold text-primary mb-2">Addressing hundreds of Doctors</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2 block">
                    23rd May 2026 — Continuing medical education session on lifestyle diseases and preventive medicine.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm bg-black aspect-video flex-shrink-0">
                  <video controls playsInline className="w-full h-full object-cover outline-none">
                    <source src="/CME-Programme.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <div className="mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              By Dr. Darshana Reddy
            </span>
            <h2>Authored Columns</h2>
          </div>
          <div
            className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-accent/10 hover:shadow-2xl transition-all duration-500 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">
                Deccan Herald
              </span>
              <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                April 30, 2022
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              The Diabetes-Heart Connection
            </h3>
            <p className="text-muted-foreground italic border-l-4 border-accent pl-4 mb-6">
              "If high blood glucose levels remain in the bloodstream for a long
              period of time, it can damage blood vessels and the nerves that
              control them leading to heart disease."
            </p>
            <div className="space-y-4 mb-6 text-muted-foreground leading-relaxed">
              <p>
                Heart disease and diabetes are closely linked. High blood sugar
                damages blood vessels, making them stiff and narrow — a
                condition called atherosclerosis. This restricts blood flow to
                the heart, increasing risk of heart attack and stroke.
              </p>
              <p>
                Diabetes also damages the nerves controlling the heart and blood
                vessels (autonomic neuropathy), causing irregular heart rhythms
                and blood pressure problems. Peripheral arterial disease —
                narrowing of arteries in legs — is also common, causing pain,
                ulcers, and increased risk of amputation.
              </p>
              <p>
                Regular screening, blood sugar control, blood pressure
                management, and lifestyle changes are essential to prevent
                cardiovascular complications in diabetic patients.
              </p>
            </div>
            <a
              href="https://www.deccanherald.com/features/the-diabetes-heart-connection-1104684.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline group"
            >
              Read full article on Deccan Herald
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="mb-12 text-center animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Newspaper Coverage
            </span>
            <h2>All Articles Featuring Dr. Darshana Reddy</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Full text extracted from scanned newspaper clippings. Click an
              image to view full screen.
            </p>
          </div>
          <div className="space-y-10">
            {articleData.map((article, idx) => {
              const isExpanded = expanded[article.id] ?? false;
              return (
                <div
                  key={article.id}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-slide-up"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex flex-col lg:flex-row">
                    <div
                      className="lg:w-80 xl:w-96 flex-shrink-0 bg-gray-100 cursor-pointer relative group"
                      onClick={() => setLightboxIdx(idx)}
                    >
                      <div className="aspect-[3/4] lg:aspect-auto lg:h-full min-h-[300px] relative">
                        <img
                          src={article.image}
                          alt={article.topic}
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
                            <ZoomIn className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">
                          {article.publication}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-4">
                        {article.topic}
                      </h3>
                      <pre className="font-sans text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-[Poppins]">
                        {isExpanded
                          ? article.text
                          : article.text.split("\n").slice(0, 12).join("\n") +
                            (article.text.split("\n").length > 12
                              ? "\n..."
                              : "")}
                      </pre>
                      {article.text.split("\n").length > 12 && (
                        <button
                          onClick={() =>
                            setExpanded((prev) => ({
                              ...prev,
                              [article.id]: !isExpanded,
                            }))
                          }
                          className="mt-4 text-accent font-semibold text-sm hover:underline"
                        >
                          {isExpanded ? "Show less ▲" : "Read full article ▼"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="mb-12 animate-slide-up">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Recognition
            </span>
            <h2>Awards & Honours</h2>
          </div>
          <div className="bg-gradient-to-br from-accent/5 via-white to-accent/10 rounded-3xl p-8 md:p-10 border border-accent/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up group">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    FICP — Fellow of Indian College of Physicians
                  </h3>
                  <span className="bg-accent/10 text-accent px-3 py-0.5 rounded-full text-xs font-bold">
                    2024
                  </span>
                </div>
                <p className="text-sm text-accent font-semibold mb-2">
                  Indian College of Physicians / APICON
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  One of India's highest academic distinctions in internal
                  medicine, presented at the APICON convocation in Patna.
                  Reserved for physicians who demonstrate excellence beyond
                  standard practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <style>{`@keyframes fadeIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}`}</style>
    </Layout>
  );
}
