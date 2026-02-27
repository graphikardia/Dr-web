import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, Stethoscope, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/videos", label: "Videos" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const moveUnderline = (el: HTMLElement | null) => {
    if (!el || !navRef.current || !underlineRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    underlineRef.current.style.width = `${elRect.width}px`;
    underlineRef.current.style.left = `${elRect.left - navRect.left}px`;
    underlineRef.current.style.opacity = "1";
  };

  const hideUnderline = () => {
    if (underlineRef.current) underlineRef.current.style.opacity = "0";
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes rotateIn {
          from { transform: rotate(-10deg) scale(0.8); opacity: 0; }
          to { transform: rotate(0) scale(1); opacity: 1; }
        }
        .header-wrap {
          animation: slideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .nav-link-item {
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            hsl(var(--accent)) 0%,
            #fff 45%,
            hsl(var(--accent)) 55%,
            hsl(var(--accent)) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 10px hsl(var(--accent)), 0 0 20px hsl(var(--accent)/0.5);
            filter: brightness(1);
          }
          50% { 
            text-shadow: 0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent)/0.7), 0 0 60px hsl(var(--accent)/0.4);
            filter: brightness(1.2);
          }
        }
        .name-glow {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        .mobile-nav-enter {
          animation: fadeInUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .float-icon {
          animation: float 3s ease-in-out infinite;
        }
        .scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .rotate-in {
          animation: rotateIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .nav-underline {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .menu-line {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .glass-effect {
          background: rgba(var(--primary-rgb), 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>

      <header
        className={cn(
          "header-wrap sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-effect shadow-2xl shadow-primary/20 border-b border-white/5"
            : "bg-primary shadow-lg",
        )}
      >
        {/* Animated accent lines */}
        <div className="relative h-[3px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
        </div>

        <div className="container-max">
          <div
            className={cn(
              "flex justify-between items-center transition-all duration-500",
              scrolled ? "py-2" : "py-3",
            )}
          >
            {/* Brand with enhanced animation */}
            <Link to="/" className="flex items-center gap-3 group relative">
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-accent/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Avatar with pulse ring */}
              <div className="relative flex-shrink-0">
                <span className="absolute inset-0 rounded-xl bg-accent/40 animate-[pulse-ring_2s_ease-out_infinite]" />
                <div
                  className={cn(
                    "relative rounded-xl flex items-center justify-center shadow-lg border-2 border-accent/30",
                    "bg-gradient-to-br from-accent to-accent/80 transition-all duration-500",
                    "group-hover:scale-110 group-hover:shadow-accent/50 group-hover:shadow-xl group-hover:rotate-3",
                    scrolled ? "w-10 h-10" : "w-12 h-12",
                  )}
                >
                  <Stethoscope
                    className={cn(
                      "text-accent-foreground transition-all duration-300",
                      scrolled ? "w-5 h-5" : "w-6 h-6",
                      "group-hover:rotate-12",
                    )}
                  />
                </div>
              </div>

              <div className="hidden sm:block">
                <p
                  className={cn(
                    "font-bold leading-tight transition-all duration-300",
                    scrolled
                      ? "text-white group-hover:text-white"
                      : "text-accent name-glow group-hover:text-accent",
                    scrolled ? "text-sm" : "text-base",
                  )}
                >
                  Dr. Darshana Reddy
                </p>
                <p
                  className={cn(
                    "transition-all duration-300",
                    scrolled
                      ? "text-white/70 group-hover:text-white/90"
                      : "text-white/80 group-hover:text-white",
                    scrolled ? "text-[10px]" : "text-xs",
                  )}
                >
                  FICP · MD · DNB · Internal Medicine & Diabetologist
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={hideUnderline}
            >
              {/* Animated gliding underline */}
              <div
                ref={underlineRef}
                className="absolute bottom-0 h-[3px] bg-gradient-to-r from-accent to-accent/80 rounded-full nav-underline opacity-0 pointer-events-none shadow-lg shadow-accent/50"
                style={{ left: 0, width: 0 }}
              />

              {navLinks.map((link, i) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "nav-link-item relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
                      "hover:text-accent hover:bg-white/10 hover:scale-105",
                      active
                        ? "text-accent bg-white/15 shadow-lg shadow-accent/10"
                        : scrolled
                          ? "text-white/85 hover:text-accent"
                          : "text-white hover:text-accent",
                    )}
                    style={{ animationDelay: `${i * 60 + 100}ms` }}
                    onMouseEnter={(e) => moveUnderline(e.currentTarget)}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.label}
                      {active && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/50" />
                      )}
                    </span>
                  </Link>
                );
              })}

              {/* Enhanced CTA Button */}
              <Link
                to="/contact"
                className={cn(
                  "nav-link-item ml-3 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm",
                  "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground shadow-lg shadow-accent/25",
                  "hover:shadow-accent/50 hover:shadow-xl hover:scale-105 hover:-translate-y-0.5",
                  "transition-all duration-300 relative overflow-hidden group/btn",
                  "border border-accent/20 hover:border-accent/50",
                )}
                style={{ animationDelay: `${navLinks.length * 60 + 100}ms` }}
              >
                {/* Animated shine effect */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <Calendar className="w-4 h-4 relative z-10 group-hover/btn:animate-[float_2s_ease-in-out_infinite]" />
                <span className="relative z-10">Book Appointment</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl",
                "transition-all duration-300 hover:bg-white/10 active:scale-95",
                isOpen ? "bg-white/10" : "",
              )}
              onClick={() => {
                setIsOpen(!isOpen);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                {/* Animated hamburger/close icon */}
                <span
                  className={cn(
                    "menu-line absolute left-0.5 top-1 h-0.5 w-5 bg-white rounded-full",
                    isOpen ? "rotate-45 top-2.5" : "",
                  )}
                />
                <span
                  className={cn(
                    "menu-line absolute left-0.5 top-2.5 h-0.5 w-5 bg-white rounded-full transition-all duration-300",
                    isOpen ? "opacity-0 scale-0" : "",
                  )}
                />
                <span
                  className={cn(
                    "menu-line absolute left-0.5 top-2.5 h-0.5 w-5 bg-white rounded-full",
                    isOpen ? "-rotate-45 top-2.5" : "",
                  )}
                />
                <span
                  className={cn(
                    "menu-line absolute left-0.5 top-4 h-0.5 w-3.5 bg-white rounded-full",
                    isOpen ? "w-5" : "",
                  )}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-400 ease-in-out",
              mobileMenuOpen
                ? "max-h-[500px] opacity-100 pb-6"
                : "max-h-0 opacity-0",
            )}
          >
            <div className="pt-3 border-t border-white/10">
              {/* Animated separator */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-4 scale-in" />

              <div className="space-y-1">
                {navLinks.map((link, i) => {
                  const active = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "mobile-nav-enter flex items-center gap-3 py-3.5 px-4 rounded-xl text-sm font-medium",
                        "transition-all duration-200 hover:bg-white/10 hover:text-accent hover:translate-x-2",
                        active
                          ? "text-accent bg-white/15 shadow-lg shadow-accent/10"
                          : "text-primary-foreground/85",
                      )}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {active ? (
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 shadow-lg shadow-accent/50" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-white/20 flex-shrink-0" />
                      )}
                      {link.label}
                      {active && (
                        <ChevronDown className="w-4 h-4 ml-auto rotate-180 text-accent" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <Link
                to="/contact"
                onClick={() => {
                  setIsOpen(false);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "mobile-nav-enter mt-4 flex items-center justify-center gap-2",
                  "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground px-6 py-3.5 rounded-xl font-semibold text-sm",
                  "shadow-lg shadow-accent/25 hover:shadow-accent/50 hover:scale-[1.02] transition-all duration-200",
                  "border border-accent/20 hover:border-accent/50",
                )}
                style={{ animationDelay: `${navLinks.length * 50}ms` }}
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className={cn(
            "h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-all duration-500",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </header>
    </>
  );
};
