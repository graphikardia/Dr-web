import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Heart,
  Clock,
} from "lucide-react";
import { SITE, LEGAL_PATHS } from "@/data/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Videos", href: "/videos" },
  { label: "Articles", href: "/articles" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: LEGAL_PATHS.privacy },
  { label: "Terms & Conditions", href: LEGAL_PATHS.terms },
  { label: "Cookie Policy", href: LEGAL_PATHS.cookies },
  { label: "Refund Policy", href: LEGAL_PATHS.refunds },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-max py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">
              {SITE.title}
            </h3>
            <p className="text-sm opacity-90 mb-4">{SITE.tagline}</p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram: @${SITE.instagramHandle}`}
              className="hover:text-accent transition-colors inline-flex items-center gap-2 text-sm"
            >
              <Instagram size={20} />
              @{SITE.instagramHandle}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-base font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-start">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <a
                  href={`tel:${SITE.phonePrimary}`}
                  className="hover:text-accent transition-colors"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-2 items-start">
                <Mail size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {SITE.email}
                </a>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin
                  size={16}
                  className="flex-shrink-0 mt-0.5 text-accent"
                />
                <p>
                  {SITE.hospitalName}, HBR Layout, Bangalore
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <Clock
                  size={16}
                  className="flex-shrink-0 mt-0.5 text-accent"
                />
                <p>{SITE.hoursShort}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Dr. Darshana Reddy. All rights
              reserved.
            </p>
            <p className="text-xs opacity-70 max-w-md text-center md:text-right">
              This website is for information only and is not a substitute for
              professional medical advice. In an emergency, call 108.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <span>Made with</span>
              <Heart size={16} className="text-accent fill-accent" />
              <span>by Graphikardia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};