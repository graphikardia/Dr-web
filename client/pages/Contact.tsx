import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CalendarDays, CheckCircle, Loader2 } from "lucide-react";

const GOOGLE_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbzTLEzt8Isngldw4gjNaGI7lgyu9xWGc4Ocu6-2bRbFzl33g5VjL0jSv05f7qxyPw3dyQ/exec";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    condition: "",
    preferredDate: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", condition: "", preferredDate: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container-max">
          <h1 className="text-white mb-4">Book Your Appointment</h1>
          <p className="text-lg text-primary-foreground/90">
            Schedule a consultation with Dr. Darshana Reddy
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="mb-8">Contact Information</h2>

              <div className="mb-8 flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Phone</h4>
                  <a href="tel:+918882799799" className="text-muted-foreground hover:text-accent transition-colors">
                    +91 8882 799 799
                  </a>
                  <p className="text-sm text-muted-foreground/70 mt-1">Call to schedule</p>
                </div>
              </div>

              <div className="mb-8 flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Email</h4>
                  <a href="mailto:info@altiushospital.com" className="text-muted-foreground hover:text-accent transition-colors">
                    info@altiushospital.com
                  </a>
                  <p className="text-sm text-muted-foreground/70 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="mb-8 flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    Altius Hospital<br />
                    HBR Layout, Bangalore<br />
                    Karnataka 560043
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-accent/10 rounded-lg border border-accent/20">
                <Clock className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-2">Working Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl">

                {status === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800 font-semibold">
                      Thank you! Your appointment request has been received and saved. We'll contact you within 24 hours to confirm.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-semibold">
                      Something went wrong. Please try again or call us directly at +91 8882 799 799.
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-primary mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Primary Concern *</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 bg-white"
                    >
                      <option value="">Select a concern</option>
                      <option value="diabetes">Diabetes Management</option>
                      <option value="respiratory">Respiratory Issues</option>
                      <option value="allergy">Allergy & Asthma</option>
                      <option value="general">General Checkup</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent resize-none disabled:opacity-50"
                    placeholder="Tell us more about your health concern..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full btn-accent font-bold py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Free Camp Section */}
      <section className="section-padding bg-gradient-to-br from-accent/10 to-accent/5 border-y border-accent/20">
        <div className="container-max max-w-3xl text-center">
          <CalendarDays className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="mb-4">Free Health Camps</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Dr. Darshana conducts free diabetes awareness and health screening camps twice a month. These camps provide complimentary consultations, blood sugar screening, and health education.
          </p>
          <div className="bg-white p-6 rounded-lg border border-accent/20 mb-6">
            <p className="text-muted-foreground">
              <strong>Next Camp Date:</strong> Contact us for the upcoming camp schedule
            </p>
          </div>
          <a href="tel:+918882799799" className="inline-block btn-primary">
            Call to Register for Camp
          </a>
        </div>
      </section>

      {/* Map Section — Altius Hospital, HBR Layout, Bangalore */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-center mb-8">Visit Us</h2>
          <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0185706671273!2d77.62660041142576!3d13.034489313441748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae175a83f3f40d%3A0xa1e557900cd7b67c!2sAltius%20Multi-speciality%20Hospital%2C%20HBR%20Layout!5e0!3m2!1sen!2sin!4v1771857450345!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-4">
            <a
              href="https://maps.app.goo.gl/B6csSdqyacrhLHkP7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
            >
              <MapPin className="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
