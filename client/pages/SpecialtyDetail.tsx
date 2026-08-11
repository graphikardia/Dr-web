import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { 
  ChevronLeft, 
  Stethoscope, 
  Activity, 
  Cloud, 
  Leaf, 
  FlaskConical, 
  CheckCircle,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

const specialtiesData: Record<string, any> = {
  "general-medicine": {
    title: "General Medicine",
    icon: Stethoscope,
    image: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg",
    description: "Comprehensive internal medicine care for acute and chronic conditions, focusing on accurate diagnosis and long-term wellness.",
    fullContent: [
      "Dr. Darshana Reddy provides expert diagnosis and management for a vast range of medical conditions affecting adults. As a specialist in General Medicine, she acts as the first point of contact for patients with undifferentiated symptoms.",
      "Our general medicine services emphasize evidence-based protocols and a thorough clinical approach to manage everything from common infections to complex multi-organ diseases.",
    ],
    features: [
      "Management of acute viral and bacterial infections",
      "Hypertension and lifestyle disease screening",
      "Executive health check-ups and preventive screenings",
      "Elderly care and geriatric medicine",
      "Pre-operative medical assessments"
    ],
    officialSource: "Clinical guidelines based on API (Association of Physicians of India)."
  },
  "diabetology": {
    title: "Diabetology",
    icon: Activity,
    image: "https://images.pexels.com/photos/7579165/pexels-photo-7579165.jpeg",
    description: "Precision diabetes management and reversal programs focused on glycemic control and complication prevention.",
    fullContent: [
      "Diabetes management requires a holistic approach beyond just sugar control. Dr. Darshana specializes in tailoring treatment plans for Type 1, Type 2, and Gestational Diabetes.",
      "We focus on 'Diabetes Reversal' for early-stage patients through intensive lifestyle modification, medical nutrition therapy, and optimized pharmacological intervention.",
    ],
    features: [
      "Continuous Glucose Monitoring (CGM) interpretation",
      "Insulin pump therapy and optimization",
      "Diabetic neuropathy and foot care screening",
      "Gestational diabetes management for expectant mothers",
      "Dietary and lifestyle counseling for diabetes reversal"
    ],
    officialSource: "Adhering to RSSDI and ADA (American Diabetes Association) standards."
  },
  "respiratory-care": {
    title: "Respiratory Care",
    icon: Cloud,
    image: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg",
    description: "Advanced pulmonology services for asthma, COPD, and allergic respiratory conditions.",
    fullContent: [
      "Respiratory health is critical to overall vitality. Our clinic provides specialized care for chronic obstructive pulmonary disease (COPD), asthma, and post-COVID respiratory complications.",
      "With advanced diagnostic tools like Spirometry (Lung Function Test), we ensure precise diagnosis and effective long-term management strategies.",
    ],
    features: [
      "Spirometry and Pulmonary Function Testing (PFT)",
      "Asthma and COPD management programs",
      "Treatment for sleep apnea and snoring disorders",
      "Post-viral cough and lung rehabilitation",
      "Nebulization and inhalation therapy guidance"
    ],
    officialSource: "Guidelines based on GINA (Global Initiative for Asthma) and GOLD (Global Initiative for Chronic Obstructive Lung Disease)."
  },
  "allergy-asthma": {
    title: "Allergy & Asthma",
    icon: Leaf,
    image: "https://images.pexels.com/photos/5998511/pexels-photo-5998511.jpeg",
    description: "Specialized identification and treatment of environmental and food allergies through advanced testing.",
    fullContent: [
      "Allergies can significantly impact quality of life. We utilize the 'Allergen Skin Prick Test' (the gold standard) to identify specific triggers for allergic rhinitis, asthma, and skin allergies.",
      "Our immunotherapy programs aim to modify the immune system's response to allergens, potentially providing long-term relief without lifelong medication.",
    ],
    features: [
      "Skin Prick Testing for 50+ common allergens",
      "Sublingual and Subcutaneous Immunotherapy",
      "Management of Allergic Rhinitis and Sinusitis",
      "Food and drug allergy evaluations",
      "Chronic Urticaria (hives) management"
    ],
    officialSource: "Adhering to World Allergy Organization (WAO) clinical protocols."
  },
  "endocrinology": {
    title: "Endocrinology",
    icon: FlaskConical,
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
    description: "Management of hormonal imbalances and metabolic disorders including thyroid, PCOD, and bone health.",
    fullContent: [
      "Hormonal health governs everything from metabolism to reproductive health. We provide specialized care for thyroid disorders (hypothyroidism/hyperthyroidism) and PCOD.",
      "Our metabolic optimization program addresses the root causes of obesity, metabolic syndrome, and hormonal fatigue through targeted medical intervention.",
    ],
    features: [
      "Comprehensive Thyroid clinic",
      "PCOD/PCOS medical management for women",
      "Metabolic syndrome and obesity care",
      "Osteoporosis and bone mineral health",
      "Correction of adrenal and pituitary imbalances"
    ],
    officialSource: "Guidelines based on Endocrine Society and IAE."
  },
  "adult-immunisation": {
    title: "Adult Immunisation",
    icon: CheckCircle,
    image: "https://images.pexels.com/photos/5863389/pexels-photo-5863389.jpeg",
    description: "Preventive vaccination programs for adults to protect against influenza, pneumonia, cervical cancer, and more.",
    fullContent: [
      "Vaccinations are not just for children. Adult immunisation is a critical part of preventive health that protects individuals from life-threatening diseases as they age or if they have chronic conditions.",
      "We offer a complete range of adult vaccines recommended by the Association of Physicians of India (API) and global health bodies.",
    ],
    features: [
      "Influenza (Flu) and Pneumococcal vaccines",
      "HPV (Cervical Cancer) vaccination for adults",
      "Hepatitis A & B protection",
      "Adult Tdap (Tetanus, Diphtheria, Pertussis) boosters",
      "Shingles (Herpes Zoster) vaccination for seniors"
    ],
    officialSource: "Recommended by the API (Association of Physicians of India) Advisory Board on Adult Immunization."
  }
};

export default function SpecialtyDetail() {
  const { slug } = useParams();
  const data = slug ? specialtiesData[slug] : null;

  if (!data) {
    return (
      <Layout>
        <div className="container-max py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Specialty not found</h2>
          <Link to="/" className="btn-accent">Return Home</Link>
        </div>
      </Layout>
    );
  }

  const Icon = data.icon;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container-max relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors mb-8 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Specialties
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-center">
             <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center text-accent-foreground shadow-2xl">
                <Icon className="w-10 h-10" />
             </div>
             <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
                <p className="text-xl text-primary-foreground/80 max-w-2xl">{data.description}</p>
             </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-accent rounded-full" />
                Specialized Care Approach
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                {data.fullContent.map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-10 p-6 bg-accent/5 rounded-2xl border border-accent/20">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  Official Guidelines
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  {data.officialSource}
                </p>
              </div>
            </div>

            <div className="space-y-8 animate-slide-in-right">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video relative group">
                <img 
                  src={data.image} 
                  alt={data.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6">Key Focus Areas</h3>
                <ul className="space-y-4">
                  {data.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-muted-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-white mb-6">Schedule Your Consultation</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                Consult with Dr. Darshana Reddy for a personalized treatment plan focused on your long-term health and wellness. Available for both in-person and tele-consultations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-accent px-10 py-4 text-lg font-bold flex items-center gap-2 group">
                  <Calendar className="w-5 h-5" />
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+919900004527" className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-lg font-bold transition-all border border-white/20">
                  Call: +91 990 000 4527
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center">
                <p className="text-white/60 text-sm mb-4">Share this specialty with others</p>
                <div className="flex gap-4">
                  <a 
                    href={`https://wa.me/?text=Check out ${data.title} specialty by Dr. Darshana Reddy: ${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
