import { Mail, Phone, MapPin, Instagram, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-max py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Dr. Darshana Reddy</h3>
            <p className="text-sm opacity-90 mb-4">
              Senior Consultant - Internal Medicine & Diabetologist at Altius Hospital
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/your_lifestyle_doctor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/videos" className="hover:text-accent transition-colors">
                  Videos
                </a>
              </li>
              <li>
                <a href="/testimonials" className="hover:text-accent transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-bold mb-4">Expertise</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-accent transition-colors cursor-pointer">
                General Medicine
              </li>
              <li className="hover:text-accent transition-colors cursor-pointer">
                Diabetes Management
              </li>
              <li className="hover:text-accent transition-colors cursor-pointer">
                Allergy & Asthma
              </li>
              <li className="hover:text-accent transition-colors cursor-pointer">
                Respiratory Diseases
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-start">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <a href="tel:+918882799799" className="hover:text-accent transition-colors">
                  +91 8882 799 799
                </a>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <p>Altius Hospital, HBR Layout, Bangalore</p>
              </div>
              <div className="flex gap-2 items-start">
                <Mail size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <p>info@altiushospital.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80">
              © 2024 Dr. Darshana Reddy. All rights reserved.
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-accent fill-accent" />
              <span>by Altius Hospital</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
