export const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Darshana Reddy",
    "image": "https://cdn.builder.io/api/v1/image/assets%2F25125c27db8e4312bad1ed13783208b5%2F5541045c8f37402690c453b2a605f8a5?format=webp&width=800&height=1200",
    "@id": "https://drdarshanareddy.com",
    "url": "https://drdarshanareddy.com",
    "telephone": "+918882799799",
    "medicalSpecialty": [
      "InternalMedicine",
      "Diabetology",
      "Allergy",
      "Endocrinology"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "HBR Layout",
      "addressLocality": "Bangalore",
      "addressRegion": "KA",
      "postalCode": "560043",
      "addressCountry": "IN"
    },
    "hasHospitalAffiliation": [
      {
        "@type": "Hospital",
        "name": "Altius Hospital",
        "address": "HBR Layout, Bangalore"
      },
      {
        "@type": "Hospital",
        "name": "Even Hospital",
        "address": "Bangalore"
      }
    ],
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
