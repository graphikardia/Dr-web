import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [activePlatformFilter, setActivePlatformFilter] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "diabetes", label: "Diabetes Care" },
    { id: "respiratory", label: "Respiratory" },
    { id: "general", label: "General Health" },
  ];

  const platforms = [
    { id: "all", label: "All Platforms" },
    { id: "google", label: "Google Reviews" },
    { id: "practo", label: "Practo" },
    { id: "instagram", label: "Instagram" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      category: "diabetes",
      platform: "google",
      rating: 5,
      text: "Dr. Darshana has been instrumental in managing my diabetes. Her personalized approach and regular follow-ups have significantly improved my health metrics.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    },
    {
      id: 2,
      name: "Priya Sharma",
      category: "respiratory",
      platform: "practo",
      rating: 5,
      text: "Excellent doctor! She diagnosed my respiratory condition accurately and prescribed the right treatment. The improvement was remarkable within weeks.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: 3,
      name: "Arun Reddy",
      category: "general",
      platform: "instagram",
      rating: 5,
      text: "Dr. Darshana's health tips on Instagram are life-changing. Her advice on preventive care has helped me maintain excellent health.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun",
    },
    {
      id: 4,
      name: "Asha Patel",
      category: "diabetes",
      platform: "google",
      rating: 5,
      text: "Very knowledgeable and caring doctor. She takes time to explain everything and ensures I understand my condition well.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Asha",
    },
    {
      id: 5,
      name: "Vikram Singh",
      category: "respiratory",
      platform: "google",
      rating: 5,
      text: "Dr. Darshana's expertise in respiratory care is evident. My asthma is now well-controlled thanks to her effective treatment plan.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
    {
      id: 6,
      name: "Meera Nair",
      category: "general",
      platform: "practo",
      rating: 5,
      text: "The best internal medicine doctor I've consulted. Professional, empathetic, and highly skilled. Highly recommended!",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
    },
    {
      id: 7,
      name: "Suresh Kumar",
      category: "diabetes",
      platform: "instagram",
      rating: 5,
      text: "Following Dr. Darshana's lifestyle tips has transformed my health. My blood sugar levels are now stable and I feel energetic.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh",
    },
    {
      id: 8,
      name: "Divya Menon",
      category: "respiratory",
      platform: "practo",
      rating: 5,
      text: "Very attentive doctor who listens to patient concerns carefully. Her treatment approach is evidence-based and effective.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divya",
    },
    {
      id: 9,
      name: "Ravi Prabhu",
      category: "general",
      platform: "google",
      rating: 5,
      text: "Comprehensive health checkup and excellent guidance. Dr. Darshana helped identify early signs of a condition I wasn't aware of.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
    },
  ];

  const filteredTestimonials = testimonials.filter((t) => {
    const categoryMatch = activeCategoryFilter === "all" || t.category === activeCategoryFilter;
    const platformMatch = activePlatformFilter === "all" || t.platform === activePlatformFilter;
    return categoryMatch && platformMatch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container-max">
          <h1 className="text-white mb-4">Patient Testimonials</h1>
          <p className="text-lg text-primary-foreground/90">
            Hear from patients who have experienced excellent care and positive health outcomes
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-primary mb-4">Filter by Category</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategoryFilter(category.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                      activeCategoryFilter === category.id
                        ? "bg-accent text-accent-foreground shadow-lg"
                        : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Filter */}
            <div>
              <h3 className="font-bold text-primary mb-4">Filter by Platform</h3>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setActivePlatformFilter(platform.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                      activePlatformFilter === platform.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                    )}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>
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
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full bg-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {platforms.find(p => p.id === testimonial.platform)?.label}
                    </p>
                  </div>
                  <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                    {categories.find(c => c.id === testimonial.category)?.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No testimonials found for the selected filters.
              </p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-accent">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Patient Satisfaction
            </h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-accent mb-2">
                  {testimonials.length}+
                </p>
                <p className="text-muted-foreground">Happy Patients</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent mb-2">
                  5.0
                </p>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent mb-2">
                  {testimonials.filter(t => t.rating === 5).length}/
                  {testimonials.length}
                </p>
                <p className="text-muted-foreground">5-Star Reviews</p>
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
