import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 right-6 z-40 md:hidden transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <div className="flex gap-3">
        <a 
          href="tel:+919900004527"
          className="flex-1 bg-white border-2 border-primary text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          Call
        </a>
        <Link 
          to="/contact"
          className="flex-[2] bg-gradient-to-r from-accent to-accent/90 text-accent-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform"
        >
          <Calendar className="w-5 h-5" />
          Book Now
        </Link>
      </div>
    </div>
  );
};
