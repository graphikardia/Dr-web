import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, breadcrumbJsonLd } from "@/data/site";

interface Testimonial {
  id: number;
  name: string;
  category: string;
  rating: number;
  text: string;
}

const categories = [
  { id: "all", label: "All" },
  { id: "diabetes", label: "Diabetes Care" },
  { id: "respiratory", label: "Respiratory" },
  { id: "general", label: "General Health" },
];

const categoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? "";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Shashi K.",
    category: "general",
    rating: 5,
    text: "What a humble doctor. She spent good amount of time explaining my health concerns and explained how our health depends on our lifestyle. I strongly recommend her.",
  },
  {
    id: 2,
    name: "Padmanabhan I.",
    category: "general",
    rating: 5,
    text: "Dr. Darshana is wise, empathetic, makes patients comfortable, listens and is very honest in diagnosis and treatment. She has the right and different approach in a highly competitive profession.",
  },
  {
    id: 3,
    name: "Ajay S.",
    category: "general",
    rating: 5,
    text: "Dr. Reddy is highly knowledgeable, listens to patients carefully, diagnoses properly, identifies the root of the problem and suggests precise medicines. She helped me during my recovery from COVID.",
  },
  {
    id: 4,
    name: "Pooja M.",
    category: "diabetes",
    rating: 5,
    text: "I was suffering from anaemia. Dr. Darshana identified the root cause behind it and then treated it. I have been feeling much more energetic. A very good doctor with vast experience.",
  },
  {
    id: 5,
    name: "Mahesh K.",
    category: "respiratory",
    rating: 5,
    text: "My grandfather, who had an asthmatic problem for years, received good treatment from Dr. Darshana and we had a wonderful experience with her.",
  },
  {
    id: 6,
    name: "Aswathi D.",
    category: "general",
    rating: 5,
    text: "Dr. Darshana is a wonderful doctor. She doesn't prescribe unnecessary medicines. She is extremely patient and listens to our concerns without any judgement. Very happy with our association for over 5 years.",
  },
  {
    id: 7,
    name: "Ajith T.",
    category: "general",
    rating: 5,
    text: "What an amazing doctor she is. Three of us in the family were under her care during COVID and are grateful for her excellent guidance. She prescribes only the required medication.",
  },
  {
    id: 8,
    name: "Sridhar B.",
    category: "general",
    rating: 5,
    text: "One of the very few doctors I have come across who is genuine and caring for her patients. She stands out for her integrity and patient-first approach.",
  },
];

const initialAvatar = (name: string) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return initials;
};

export default function Testimonials() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");

  const filteredTestimonials = testimonials.filter(
    (t) => activeCategoryFilter === "all" || t.category === activeCategoryFilter,
  );

  return (
    <Layout>
      <SEOHead
        title="Patient Testimonials - Dr. Darshana Reddy"
        description={`Read what patients say about Dr. Darshana Reddy. Patient feedback on general medicine, diabetes care, respiratory treatment and internal medicine at ${SITE.hospitalName}, HBR Layout, Bangalore.`}
        canonical="/testimonials"
        jsonLd={breadcrumbJsonLd([
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container-max">
          <h1 className="text-white mb-4">Patient Testimonials</h1>
          <p className="text-lg text-primary-foreground/90">
            Feedback shared by patients of Dr. Darshana Reddy
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container-max pt-8">
        <p className="text-sm text-muted-foreground bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          These are individual patient feedback messages shared voluntarily.
          Individual results vary and no specific outcome is guaranteed.
        </p>
      </div>

      {/* Category Filter */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-max">
          <div>
            <h2 className="font-bold text-primary mb-4">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryFilter(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                    activeCategoryFilter === category.id
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "bg-gray-100 text-muted-foreground hover:bg-gray-200",
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-accent text-accent"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                  <span
                    aria-hidden="true"
                    className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold text-sm"
                  >
                    {initialAvatar(testimonial.name)}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Patient feedback
                    </p>
                  </div>
                  <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                    {categoryLabel(testimonial.category)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No testimonials found for the selected filter.
              </p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-accent">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Patient Feedback
            </h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-accent mb-2">
                  {testimonials.length}
                </p>
                <p className="text-muted-foreground">Testimonials shared</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent mb-2">5.0</p>
                <p className="text-muted-foreground">Average rating given</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent mb-2">
                  {testimonials.filter((t) => t.rating === 5).length}/
                  {testimonials.length}
                </p>
                <p className="text-muted-foreground">5-star feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container-max text-center">
          <h2 className="text-white mb-4">Ready to Experience Our Care?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Book your appointment with Dr. Darshana Reddy today
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-accent-foreground hover:opacity-90 px-8 py-4 rounded-lg font-bold transition-opacity"
          >
            Schedule Your Consultation
          </a>
        </div>
      </section>
    </Layout>
  );
}