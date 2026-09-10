import { SITE } from "@/data/site";

export const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Darshana Reddy",
    "image": `${SITE.url}/og-image.jpg`,
    "@id": SITE.url,
    "url": SITE.url,
    "telephone": SITE.phonePrimary,
    "email": SITE.email,
    "description":
      "Dr. Darshana Reddy is a Senior Consultant in Internal Medicine and Metabolic Diseases with 16+ years of experience in Bangalore. Former Medical Superintendent; MBBS, MD, DNB (Internal Medicine), FID, DAA, FICP; Harvard-certified Obesity Specialist.",
    "medicalSpecialty": [
      "InternalMedicine",
      "Diabetology",
      "Endocrinology",
      "Nutrition",
      "Allergy"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE.streetAddress,
      "addressLocality": SITE.addressLocality,
      "addressRegion": SITE.addressRegion,
      "postalCode": SITE.postalCode,
      "addressCountry": SITE.addressCountry
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "MBBS, MD, DNB (Internal Medicine), FID, DAA, FICP; Certified Obesity Specialist (Harvard Medical School)"
      }
    ],
    "hasHospitalAffiliation": {
      "@type": "Hospital",
      "name": SITE.hospitalName,
      "address": `${SITE.streetAddress}, ${SITE.addressLocality}, ${SITE.addressRegion} ${SITE.postalCode}`
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "12:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "15:00",
        "closes": "17:00"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};