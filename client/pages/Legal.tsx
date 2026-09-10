import { SEOHead } from "@/components/SEOHead";
import { SITE, LEGAL_PATHS } from "@/data/site";

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalDocument {
  title: string;
  shortTitle: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  notice?: string;
}

const INTRO_DISCLAIMER =
  "This website is for general information only and is not a substitute for professional medical advice, diagnosis, or treatment. In an emergency, call 108 or go to the nearest hospital.";

const legalDocuments: Record<string, LegalDocument> = {
  [LEGAL_PATHS.privacy]: {
    title: "Privacy Policy",
    shortTitle: "Privacy Policy",
    description:
      "How Dr. Darshana Reddy collects, uses, and protects your personal information when you visit drdarshanareddy.com.",
    updated: "10 September 2026",
    notice: INTRO_DISCLAIMER,
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          `This website is operated by Dr. Darshana Reddy, MBBS, MD, DNB (Internal Medicine), FID, DAA, FICP, Certified Obesity Specialist, Department of Internal Medicine and Metabolic Diseases. Dr. Darshana consults at ${SITE.hospitalName}, ${SITE.streetAddress.replace("Even Hospital, ", "")}, ${SITE.addressLocality}, Karnataka. For any privacy-related questions, contact ${SITE.email}.`,
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          `Contact and appointment forms: when you submit the appointment or inquiry form on this website, or use the on-site chat widget, we collect the details you provide — typically your name, phone number, email address, and the reason for your visit.`,
          "Technical information: we do not use analytics or advertising trackers. Your browser may store small preference values in local storage (for example, your cookie consent choice). We may also record the fact of a visit through our hosting provider's standard server logs.",
          "We do not collect health information, payment card details, or government identification numbers through this website.",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: [
          "We use the details you share to respond to your enquiry, schedule an appointment with Dr. Darshana at Even Hospital, and, where relevant, coordinate with the hospital for your visit.",
          "Your information is used only for the purpose you provided it for and is not sold, rented, or shared with third parties for marketing.",
        ],
      },
      {
        heading: "Processors and third parties",
        paragraphs: [
          `Appointment requests submitted through the chat widget may be recorded in a Google Forms/Sheets spreadsheet via Google Apps Script. Google processes this data on its servers under Google's terms.`,
          "Our website embeds content from third-party services, including Instagram (video reels), Google Maps (location), and video players. When you load these embeds, those providers may process your IP address and set their own cookies, governed by their respective privacy policies.",
        ],
      },
      {
        heading: "Lawful basis and consent",
        paragraphs: [
          "Where you provide information through a form or the chat widget, we rely on your consent and on our legitimate interest in responding to your enquiry. You may withdraw consent at any time by contacting us. Where European data protection law (GDPR) applies to you, your rights are protected in addition to your rights under Indian law, including the Digital Personal Data Protection Act, 2023 (India).",
        ],
      },
      {
        heading: "How long we keep information",
        paragraphs: [
          "Enquiry and appointment details are retained only as long as reasonably needed to respond to you and to maintain records required by applicable professional and legal obligations. You may request that we delete the information you submitted.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You may request access to, correction of, or deletion of the personal information we hold about you, in accordance with applicable law. To exercise these rights, write to us at " +
            `${SITE.email} and we will respond within a reasonable period.`,
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "This website is served over an encrypted (HTTPS) connection. We take reasonable technical and organisational measures to protect the limited information we collect, but no method of transmission or storage is completely secure.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The current version will always be available on this page with the date of the latest update.",
        ],
      },
    ],
  },
  [LEGAL_PATHS.terms]: {
    title: "Terms & Conditions",
    shortTitle: "Terms & Conditions",
    description:
      "The terms that govern your use of the Dr. Darshana Reddy website and the information published on it.",
    updated: "10 September 2026",
    notice: INTRO_DISCLAIMER,
    sections: [
      {
        heading: "Acceptance of terms",
        paragraphs: [
          "By accessing or using this website, you agree to these Terms & Conditions and to our Privacy Policy. If you do not agree, please do not use the website.",
        ],
      },
      {
        heading: "Information on this site is educational",
        paragraphs: [
          "Content published here — including articles, videos, and chatbot responses — is provided for general awareness and educational purposes only. It is not medical advice and does not create a doctor–patient relationship. Always consult a qualified doctor for diagnosis and treatment of any medical condition, and never disregard professional advice because of something you read on this website.",
        ],
      },
      {
        heading: "Emergencies",
        paragraphs: [
          "This website is not for medical emergencies. If you or someone else is experiencing an emergency, call 108 or go to the nearest hospital immediately.",
        ],
      },
      {
        heading: "The chat assistant",
        paragraphs: [
          "The chat widget on this website is an AI-powered assistant that provides general information only. Its responses may be incomplete or inaccurate and are not a substitute for the doctor's judgement. Do not rely on the assistant for diagnosis, treatment decisions, or emergencies. Personal medical information should not be shared through the chat.",
        ],
      },
      {
        heading: "Appointment requests",
        paragraphs: [
          "Submitting an appointment or enquiry form reserves a request for scheduling only. Confirmation of an appointment is provided by the clinic by phone or email. Consultation fees are collected at the hospital in accordance with its policy.",
        ],
      },
      {
        heading: "Responsibility for your information",
        paragraphs: [
          "You are responsible for the accuracy of the information you provide and must not submit anyone else's personal information without their consent.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "All content on this website, including text, and imagery created for it, is owned by or licensed to Dr. Darshana Reddy unless otherwise credited. Third-party imagery is used under the relevant rights (for example, the Pexels licence for stock photographs). You may not republish, sell, or commercially reuse the content without permission.",
        ],
      },
      {
        heading: "External links",
        paragraphs: [
          "The website links to external services such as Instagram and Google Maps. We are not responsible for the content or privacy practices of those third-party services.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, we are not liable for any loss or damage arising from your use of this website or reliance on its content. Nothing in these terms limits liability that cannot be limited under applicable law.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, and any disputes are subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update these terms at any time. Continued use of the website after changes constitutes acceptance of the revised terms.",
        ],
      },
    ],
  },
  [LEGAL_PATHS.cookies]: {
    title: "Cookie Policy",
    shortTitle: "Cookie Policy",
    description:
      "What cookies and similar technologies this website uses, and how third-party embeds set their own cookies.",
    updated: "10 September 2026",
    notice: INTRO_DISCLAIMER,
    sections: [
      {
        heading: "Our own cookies",
        paragraphs: [
          "We do not set tracking or advertising cookies and we do not use third-party analytics on this website. The only storage we set on your device is an essential local-storage value recording your cookie consent choice, and your on-site chat history while you use it.",
        ],
      },
      {
        heading: "Third-party embeds",
        paragraphs: [
          "Some pages embed content from other providers, which may serve their own cookies and collect data subject to their policies:",
        ],
      },
      {
        heading: "Instagram",
        paragraphs: [
          "Video reels are embedded from Instagram. Loading them may cause Instagram (Meta) to serve cookies and process your IP address. See Instagram's privacy policy for details.",
        ],
      },
      {
        heading: "Google Maps",
        paragraphs: [
          "The contact page includes a Google Maps embed, which is served by Google. Google may set cookies and process location data in accordance with Google's policies.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can decline non-essential embeds by not visiting the pages that include them, and you can control or delete cookies through your browser settings. Your browser's help section explains how to clear cookies and local storage.",
        ],
      },
    ],
  },
  [LEGAL_PATHS.refunds]: {
    title: "Refund & Cancellation Policy",
    shortTitle: "Refunds & Cancellations",
    description:
      "Our policy on fees, refunds, and cancellations for consultations and services.",
    updated: "10 September 2026",
    notice: INTRO_DISCLAIMER,
    sections: [
      {
        heading: "Payments on this website",
        paragraphs: [
          "This website does not process payments or sell digital products. Consultation and procedure fees are collected by the hospital or clinic where services are provided.",
        ],
      },
      {
        heading: "Consultation fees",
        paragraphs: [
          "Consultation fees are governed by the admission, billing, and refund policy of the facility where you are treated (Even Hospital, HBR Layout, Bangalore). Please contact the hospital's front office regarding fees, cancellations, and refunds.",
        ],
      },
      {
        heading: "Free health camps",
        paragraphs: [
          "The free community health camps conducted by Dr. Darshana, held twice a month since 2021, are provided without charge, including the listed screening tests. No refund applies as no fee is collected.",
        ],
      },
      {
        heading: "Appointment cancellations",
        paragraphs: [
          "If you cannot attend a booked appointment, please inform the clinic as early as possible by phone so the slot can be offered to other patients.",
        ],
      },
    ],
  },
};

interface LegalPageProps {
  doc: LegalDocument;
  path: string;
}

function LegalPage({ doc, path }: LegalPageProps) {
  const jsonLd = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: doc.shortTitle,
          item: `${SITE.url}${path}`,
        },
      ],
    },
  ];

  return (
    <div className="bg-surface min-h-screen">
      <SEOHead
        title={doc.title}
        description={doc.description}
        canonical={path}
        keywords={undefined}
        jsonLd={jsonLd}
      />
      <div className="container-max py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-2">
            Updated {doc.updated}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{doc.title}</h1>
          {doc.notice && (
            <p className="text-sm text-muted-foreground border-l-2 border-primary/40 pl-3 mb-6">
              {doc.notice}
            </p>
          )}
          <div className="space-y-8 mt-8">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold mb-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-foreground/80 leading-relaxed"
                        : "text-foreground/80 leading-relaxed mt-3"
                    }
                  >
                    {text}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return <LegalPage doc={legalDocuments[LEGAL_PATHS.privacy]} path={LEGAL_PATHS.privacy} />;
}

export function TermsConditions() {
  return <LegalPage doc={legalDocuments[LEGAL_PATHS.terms]} path={LEGAL_PATHS.terms} />;
}

export function CookiePolicy() {
  return <LegalPage doc={legalDocuments[LEGAL_PATHS.cookies]} path={LEGAL_PATHS.cookies} />;
}

export function RefundPolicy() {
  return <LegalPage doc={legalDocuments[LEGAL_PATHS.refunds]} path={LEGAL_PATHS.refunds} />;
}