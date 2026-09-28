import { SITE } from "@/data/site";

export const OBESITY_CLINIC = {
  anchor: "obesity-booking",
  title: "Obesity Clinic",
  specialist: "Dr. Darshana Reddy",
  credentials: "Harvard Certified Obesity Specialist",
  intro:
    "Book a consultation with Dr. Darshana Reddy, Harvard Certified Obesity Specialist, for evidence-based weight management, metabolic assessment and long-term obesity care.",
  days: ["Wednesday", "Saturday"],
  daysLabel: "Every Wednesday & Saturday",
  sessions: ["9:00 AM – 12:00 PM", "3:00 PM – 5:00 PM"],
  sessionsLabel: "9 AM–12 PM | 3 PM–5 PM",
  venue: "Even Hospital, HBR Layout, Bangalore",
  frontOfficeDisplay: SITE.phoneSecondaryDisplay,
  frontOffice: SITE.phoneSecondary,
  bookPath: "/contact#obesity-booking",
} as const;

export interface InsightVideo {
  id: number;
  episode: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  duration: string;
  topics: string[];
}

export const INSIGHT_VIDEOS: InsightVideo[] = [
  {
    id: 1,
    episode: "Episode 1",
    title: "Obesity Is a Disease, Not a Choice",
    description:
      "Why obesity is recognised as a chronic disease — and what that means for treatment. The AMA's landmark policy recognises obesity as a disease requiring a range of medical interventions, not a simple matter of willpower. Learn how hormonal imbalance, waist circumference and metabolic markers shape a realistic treatment plan.",
    src: "/health-videos/obesity-metabolic-health-ep1.mp4",
    poster: "/health-videos/obesity-metabolic-health-ep1.jpg",
    duration: "1:35",
    topics: ["AMA policy", "Hormonal cause", "Waist assessment"],
  },
  {
    id: 2,
    episode: "Episode 2",
    title: "Ozempic & Mounjaro: A New Era in Weight Loss?",
    description:
      "The whole internet is talking about Ozempic and Mounjaro. Dr. Darshana explains where these drugs actually came from — a venom-inspired discovery — and how they signal the pancreas to release insulin while curbing cravings. Crucially, they are not fat-burning injections or miracle drugs.",
    src: "/health-videos/obesity-metabolic-health-ep2.mp4",
    poster: "/health-videos/obesity-metabolic-health-ep2.jpg",
    duration: "1:46",
    topics: ["GLP-1 medicines", "Mechanism", "Not a miracle drug"],
  },
  {
    id: 3,
    episode: "Episode 3",
    title: "When Will I See Results? Setting Realistic Expectations",
    description:
      "\"Doctor, I've started my medication — when will I start losing weight?\" Expecting dramatic change in the first few days or weeks is one of the biggest mistakes patients make. How much you lose depends on the medicine and how you tolerate it, and you may notice changes long before the scales move.",
    src: "/health-videos/obesity-metabolic-health-ep3.mp4",
    poster: "/health-videos/obesity-metabolic-health-ep3.jpg",
    duration: "1:45",
    topics: ["Realistic expectations", "Timing", "Side effects"],
  },
  {
    id: 4,
    episode: "Episode 4",
    title: "Why Your GLP-1 Dose Is Gradually Increased",
    description:
      "GLP-1 receptor agonists such as Ozempic and Mounjaro are given as once-weekly injections, and doctors start you on the lowest dose before stepping it up. Dr. Darshana explains why the dose is increased, how the body builds tolerance, and why the medicine only works if you have not reached that plateau.",
    src: "/health-videos/obesity-metabolic-health-ep4.mp4",
    poster: "/health-videos/obesity-metabolic-health-ep4.jpg",
    duration: "0:59",
    topics: ["Dose titration", "Tolerance", "Weekly dosing"],
  },
];

export const LEGACY_INSIGHT_VIDEO: InsightVideo = {
  id: 0,
  episode: "Health Awareness Reel",
  title: "Low Platelet Count in Dengue: When a Transfusion Is Needed",
  description:
    "Is it just your platelet count that matters? A count below thirty thousand always carries a bleeding risk — but it is platelet integrity and how fast the count is falling that decide the outcome. Dr. Darshana explains when a platelet transfusion is genuinely needed and why it is not mandatory in every case of dengue.",
  src: "/latest-insight-reel.mp4",
  poster: "",
  duration: "1:09",
  topics: ["Dengue", "Platelets", "Transfusion"],
};
