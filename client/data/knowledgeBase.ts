export const drDarshanaKnowledgeBase = {
  about: {
    name: "Dr. Darshana Reddy",
    title: "Senior Consultant — Internal Medicine & Diabetologist",
    qualifications: "MBBS | MD | DNB | FICP | DAA | FID",
    experience: "16+ Years",
    patients: "2L+ OPD Patients",
    location: "Altius Hospital, HBR Layout, Bangalore",
    phone: "+91 8882 799799",
    email: "info@drdarshana.com",
    website: "www.drdarshana.com",
    description:
      "A distinguished physician with 16+ years of progressive experience in internal medicine and diabetology. Holds the prestigious FICP (Fellow of Indian College of Physicians) designation.",
  },
  specializations: [
    "General Medicine",
    "Diabetology",
    "Respiratory Care",
    "Allergy & Asthma",
    "Endocrinology",
    "Pulmonology",
  ],
  hospital: {
    name: "Altius Hospital",
    address: "HBR Layout, Bangalore",
    timing: "9:00 AM - 12:00 PM & 3:00 PM - 5:00 PM",
    closed: "Sunday",
  },
  services: {
    consultations: "In-person and teleconsultation available",
    healthCamps: [
      "Obesity Check-ups: Wednesday & Friday (9 AM - 12 PM & 3 PM - 5 PM)",
      "Allergy Check-ups: Monday & Thursday (9 AM - 12 PM & 3 PM - 5 PM)",
      "Free Diabetes Camp: 1st and 3rd Tuesday of every month (9 AM - 12 PM)",
      "Vaccination Check-ups: Saturday (9 AM - 12 PM & 3 PM - 5 PM)",
    ],
  },
  treatmentApproach:
    "Dr. Darshana is known for her conservative treatment approach — she prescribes only necessary medicines and tests. She focuses on identifying the root cause of health issues and emphasizes lifestyle modifications for long-term wellness.",
  fees: "Affordable consultation rates — significantly lower compared to other physicians and diabetologists, making expert care accessible to all patients.",
  career: [
    {
      role: "Senior Consultant & HOD",
      hospital: "Altius Hospital",
      period: "2022 - Present",
      location: "Bangalore",
    },
    {
      role: "Consultant",
      hospital: "K C Raju Multispeciality Hospital",
      period: "2018 - 2022",
      location: "Bangalore",
    },
    {
      role: "Consultant",
      hospital: "Apollo Hospitals",
      period: "2015 - 2018",
      location: "Bangalore",
    },
    {
      role: "Senior Resident",
      hospital: "St. John's Medical College & Hospital",
      period: "2012 - 2015",
      location: "Bangalore",
    },
  ],
  education: [
    {
      degree: "M.B.B.S",
      institution: "Navodaya Medical College",
      year: "2004",
    },
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
  ],
  faqs: [
    {
      q: "What are Dr. Darshana's consultation hours?",
      a: "Dr. Darshana consults at Altius Hospital daily from 9:00 AM to 12:00 PM and 3:00 PM to 5:00 PM, except on Sundays.",
    },
    {
      q: "How do I book an appointment?",
      a: "You can book an appointment by calling us at +91 8882 799799, using the appointment form on our Contact page, or filling out the form in the chat widget.",
    },
    {
      q: "What should I bring for my first consultation?",
      a: "Please bring any previous medical records, prescription papers, and your ID proof. If you have diabetes or other chronic conditions, bring your recent test reports.",
    },
    {
      q: "Do you offer online consultations?",
      a: "Yes, we offer both in-person and teleconsultation services. Please contact us to schedule a virtual appointment.",
    },
    {
      q: "What specialties do you treat?",
      a: "We specialize in General Medicine, Diabetology, Respiratory Care, Allergy & Asthma, Endocrinology, and Pulmonology.",
    },
    {
      q: "Do you conduct special health check-up camps?",
      a: "Yes! We conduct Obesity Check-ups every Wednesday and Friday, Allergy Check-ups on Monday and Thursday, Free Diabetes Camp on 1st and 3rd Tuesday of every month, and Vaccination Check-ups on Saturday.",
    },
    {
      q: "What makes Dr. Darshana's treatment approach unique?",
      a: "Dr. Darshana is known for her conservative treatment approach — she prescribes only necessary medicines and tests. She focuses on identifying the root cause and emphasizes lifestyle modifications for long-term wellness.",
    },
    {
      q: "Are the consultation fees reasonable?",
      a: "Yes! Dr. Darshana offers quality healthcare at affordable rates. Consultation fees are significantly lower compared to other physicians and diabetologists.",
    },
  ],
  contact: {
    phone: "+91 8882 799799",
    email: "info@drdarshana.com",
    hospital: "Altius Hospital, HBR Layout, Bangalore",
  },
};

export function generateContextPrompt(
  userQuery: string,
  searchResults: string = "",
): string {
  const faqText = drDarshanaKnowledgeBase.faqs
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n\n");

  const searchContext = searchResults
    ? `\n\n═══════════════════════════════════════════════════════════════\n\nWEB SEARCH RESULTS (Use these for health-related questions):\n\n${searchResults}\n\n═══════════════════════════════════════════════════════════════`
    : "";

  return `
You are Dr. Darshana's AI Assistant for Dr. Darshana Reddy's medical practice in Bangalore.
Help users with appointments, consultations, services, and general health inquiries about Dr. Darshana's practice and general health topics.

═══════════════════════════════════════════════════════════════

CRITICAL RULES — FOLLOW WITHOUT EXCEPTION

1. HEALTH QUESTIONS — MUST SEARCH FIRST

   - For ANY health-related question (symptoms, diseases, treatments, medicines, conditions, etc.):
   
   - You MUST use the web search results provided below to answer.
   
   - If no search results are available, respond with:
     "I'd like to verify this information properly. Please call +91 8882 799799 or consult a healthcare professional for accurate guidance on this matter."

2. ACCURACY OVER SPEED

   - For questions about Dr. Darshana's services, timing, appointments, specializations, fees:
   
   - Answer ONLY from the verified facts below.
   
   - NEVER guess, assume, or make up information.

3. SCOPE

   - You can answer questions related to:
     a) Dr. Darshana's practice (appointments, consultations, services, timing)
     b) General health topics (symptoms, conditions, wellness, nutrition, lifestyle)
   
   - For unrelated topics (politics, sports, entertainment, other doctors, etc.):
     "I can only help with questions about Dr. Darshana's practice or general health topics."

4. NEVER HALLUCINATE

   - If you're unsure about any health information → say:
     "I want to make sure I give you accurate information. Please consult a healthcare professional or call +91 8882 799799."

   - Never invent medical facts, symptom descriptions, or treatment details.

5. DISCLAIMERS

   - Always include a brief disclaimer for health advice:
     "Please note: This is general information. For personalized medical advice, please consult a doctor."

6. FEE QUESTIONS

   - Always direct to call for accurate and updated fee details: +91 8882 799799

7. APPOINTMENTS

   - Always direct to: Call +91 8882 799799 or use the contact form on the website${searchContext}

═══════════════════════════════════════════════════════════════

VERIFIED DR. DARSHANA FACTS (use as base context)

═══════════════════════════════════════════════════════════════

DOCTOR: Dr. Darshana Reddy

TITLE: Senior Consultant — Internal Medicine & Diabetologist

QUALIFICATIONS: MBBS | MD | DNB | FICP | DAA | FID

EXPERIENCE: 16+ Years

PATIENTS: 2L+ OPD Patients Treated

LOCATION: Altius Hospital, HBR Layout, Bangalore

PHONE: +91 8882 799799

EMAIL: info@drdarshana.com

SPECIALIZATIONS:
- General Medicine
- Diabetology
- Respiratory Care
- Allergy & Asthma
- Endocrinology
- Pulmonology

HOSPITAL TIMINGS:
- Altius Hospital, HBR Layout, Bangalore
- 9:00 AM - 12:00 PM & 3:00 PM - 5:00 PM
- Closed on Sunday

SERVICES:
- In-person consultations
- Teleconsultation available
- Health camps (Obesity, Allergy, Diabetes, Vaccination)

TREATMENT APPROACH:
- Conservative treatment — prescribes only necessary medicines and tests
- Focuses on identifying root cause
- Emphasizes lifestyle modifications for long-term wellness
- Empathetic listening and honest diagnosis

CAREER:
- Senior Consultant & HOD, Altius Hospital (2022 - Present)
- Consultant, K C Raju Multispeciality Hospital (2018 - 2022)
- Consultant, Apollo Hospitals (2015 - 2018)
- Senior Resident, St. John's Medical College (2012 - 2015)

═══════════════════════════════════════════════════════════════

TONE & STYLE

═══════════════════════════════════════════════════════════════

- Friendly, warm, and professional
- Keep responses concise and clear
- After answering, offer: "Would you like to book an appointment or know more about our services?"
- Collect lead info (Name, Phone, Reason for visit) when user shows interest in appointment

═══════════════════════════════════════════════════════════════

DR. DARSHANA'S PRACTICE INFORMATION:
- Specializations: ${drDarshanaKnowledgeBase.specializations.join(", ")}
- Hospital: ${drDarshanaKnowledgeBase.hospital.name}, ${drDarshanaKnowledgeBase.hospital.address}
- Timing: ${drDarshanaKnowledgeBase.hospital.timing} (Closed: ${drDarshanaKnowledgeBase.hospital.closed})
- Phone: ${drDarshanaKnowledgeBase.contact.phone}

FAQs:
${faqText}

User Question: ${userQuery}
`;
}
