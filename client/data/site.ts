export const SITE = {
  title: "Dr. Darshana Reddy",
  url: "https://drdarshanareddy.com",
  tagline: "Senior Consultant – Internal Medicine & Metabolic Diseases",
  ogImage: "https://drdarshanareddy.com/og-image.jpg",
  instagram: "https://instagram.com/your_lifestyle_doctor",
  instagramHandle: "your_lifestyle_doctor",
  facebook: "https://www.facebook.com/drdarshanareddy",
  phonePrimary: "+919900004527",
  phonePrimaryDisplay: "+91 990 000 4527",
  phoneSecondary: "+918047284123",
  phoneSecondaryDisplay: "080-47284123",
  phoneDisplay: "080-47284123 / 9900004527",
  email: "dr.darshana@gmail.com",
  hospitalName: "Even Hospital",
  streetAddress: "Even Hospital, HBR Layout",
  addressLocality: "Bangalore",
  addressRegion: "Karnataka",
  postalCode: "560043",
  addressCountry: "IN",
  hoursShort: "Mon–Sat 9:00 AM – 12:00 PM & 3:00 PM – 5:00 PM",
  established: "Since 2021",
} as const;

export const LEGAL_PATHS = {
  privacy: "/privacy-policy",
  terms: "/terms-conditions",
  cookies: "/cookie-policy",
  refunds: "/refund-policy",
} as const;

export function breadcrumbJsonLd(pages: { name: string; path: string }[]) {
  const last = pages[pages.length - 1];
  return [
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}${last.path}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        ...pages.map((p, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: p.name,
          item: `${SITE.url}${p.path}`,
        })),
      ],
    },
  ];
}