import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";
import { OBESITY_CLINIC } from "@/data/obesityClinic";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  "Medical weight management, not crash diets",
  "Hormonal & metabolic assessment",
  "Nutrition, activity & behavioural support",
  "Ongoing follow-up and dose monitoring",
];

export function ObesityClinicBooking({
  variant = "home",
  className,
}: {
  variant?: "home" | "contact";
  className?: string;
}) {
  const isContact = variant === "contact";

  return (
    <section
      id={OBESITY_CLINIC.anchor}
      className={cn(
        "section-padding relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5",
        className,
      )}
    >
      <div className="absolute top-0 left-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 rounded-full -mb-36 -mr-24 blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-4">
            <HeartPulse className="w-4 h-4" />
            Obesity &amp; Metabolic Health Clinic
          </span>
          <h2 className="mb-4">
            Book a Consultation with{" "}
            <span className="text-accent">{OBESITY_CLINIC.specialist}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {OBESITY_CLINIC.intro}
          </p>
          <span className="inline-flex items-center gap-2 mt-5 bg-white text-primary px-5 py-2.5 rounded-full text-sm font-bold border border-accent/30 shadow-sm">
            <GraduationCap className="w-4 h-4 text-accent" />
            {OBESITY_CLINIC.credentials}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Schedule card */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-accent/20 overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-primary to-primary/90 px-6 md:px-8 py-5 text-primary-foreground">
              <h3 className="text-white text-xl">
                Clinic Schedule &amp; Venue
              </h3>
              <p className="text-primary-foreground/85 text-sm">
                Fixed weekly slots — book ahead to avoid a full waiting room.
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Clinic Days
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {OBESITY_CLINIC.daysLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div className="w-full">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Timings
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OBESITY_CLINIC.sessions.map((session) => (
                      <span
                        key={session}
                        className="bg-accent/10 text-accent px-4 py-2 rounded-lg text-sm font-bold"
                      >
                        {session}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Venue
                  </p>
                  <p className="font-bold text-primary">
                    {OBESITY_CLINIC.venue}
                  </p>
                  <a
                    href={`tel:${OBESITY_CLINIC.frontOffice}`}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mt-1 font-medium"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Front office: {OBESITY_CLINIC.frontOfficeDisplay}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  What your consultation covers
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {HIGHLIGHTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking actions */}
          <div className="lg:col-span-2 space-y-5 animate-slide-up">
            <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-3xl p-7 shadow-xl">
              <h3 className="text-white text-xl mb-2">Reserve Your Slot</h3>
              <p className="text-primary-foreground/85 text-sm mb-6">
                {isContact
                  ? "Send your request below and our front office will confirm your Wednesday or Saturday slot within 24 hours."
                  : "Pick a Wednesday or Saturday slot at the Obesity Clinic and get started with a plan built around your body, not a generic diet."}
              </p>

              {isContact ? (
                <a
                  href="#appointment-form"
                  className="w-full btn-accent font-bold flex items-center justify-center gap-2 text-lg"
                >
                  Fill the Booking Form
                  <ArrowRight className="w-5 h-5" />
                </a>
              ) : (
                <Link
                  to={OBESITY_CLINIC.bookPath}
                  className="w-full btn-accent font-bold flex items-center justify-center gap-2 text-lg group"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              <a
                href={`tel:${OBESITY_CLINIC.frontOffice}`}
                className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call {OBESITY_CLINIC.frontOfficeDisplay}
              </a>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-accent/20 shadow-sm">
              <h4 className="font-bold text-primary mb-3">
                Prefer a video or phone consult?
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Mention it in your booking request and we will arrange a remote
                follow-up after your in-clinic assessment.
              </p>
              <Link
                to="/videos"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                Watch the Obesity &amp; Metabolic Health series
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
