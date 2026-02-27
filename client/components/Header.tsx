import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",            label: "Home"         },
  { href: "/about",       label: "About"        },
  { href: "/videos",      label: "Videos"       },
  { href: "/testimonials",label: "Testimonials" },
  { href: "/contact",     label: "Contact"      },
];

export const Header = () => {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRef       = useRef<HTMLDivElement>(null);
  const location     = useLocation();

  /* ── Scroll detection ──────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close mobile menu on route change ────────────────────────────────── */
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  /* ── Sliding underline for desktop nav ────────────────────────────────── */
  const moveUnderline = (el: HTMLElement | null) => {
    if (!el || !navRef.current || !underlineRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    underlineRef.current.style.width   = `${elRect.width}px`;
    underlineRef.current.style.left    = `${elRect.left - navRect.left}px`;
    underlineRef.current.style.opacity = "1";
  };

  const hideUnderline = () => {
    if (underlineRef.current) underlineRef.current.style.opacity = "0";
  };

  const currentIdx = navLinks.findIndex((l) => l.href === location.pathname);

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: .6; }
          100% { transform: scale(1.55); opacity: 0;  }
        }
        @keyframes draw-line {
          from { width: 0; }
          to   { width: 100%; }
        }
        .header-wrap {
          animation: slideDown 0.55s cubic-bezier(.22,1,.36,1) both;
        }
        .nav-link-item {
          animation: fadeInUp 0.4s cubic-bezier(.22,1,.36,1) both;
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            hsl(var(--accent)) 0%,
            #fff 40%,
            hsl(var(--accent)) 60%,
            hsl(var(--accent)) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .mobile-nav-enter {
          animation: fadeInUp 0.3s cubic-bezier(.22,1,.36,1) both;
        }
        .draw-separator {
          animation: draw-line 0.6s ease both;
        }
      `}</style>

      <header
        className={cn(
          "header-wrap sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-2xl shadow-primary/30 py-0"
            : "bg-primary shadow-lg py-0"
        )}
      >
        {/* ── Top accent line ──────────────────────────────────────────── */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

        <div className="container-max">
          <div className={cn(
            "flex justify-between items-center transition-all duration-500",
            scrolled ? "py-2" : "py-3"
          )}>

            {/* ── Brand ──────────────────────────────────────────────────── */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* Avatar with pulse ring */}
              <div className="relative flex-shrink-0">
                <span className="absolute inset-0 rounded-xl bg-accent/50 animate-[pulse-ring_2s_ease-out_infinite]" />
                <div className={cn(
                  "relative rounded-xl flex items-center justify-center shadow-lg border border-accent/30",
                  "bg-gradient-to-br from-accent to-accent/80 transition-all duration-500",
                  "group-hover:scale-110 group-hover:shadow-accent/40 group-hover:shadow-xl",
                  scrolled ? "w-10 h-10" : "w-12 h-12"
                )}>
                  <span className="text-accent-foreground font-black text-base leading-none tracking-tight">DR</span>
                </div>
              </div>

              <div className="hidden sm:block">
                <p className={cn(
                  "font-bold leading-tight transition-all duration-300",
                  "group-hover:text-accent",
                  scrolled ? "text-sm" : "text-base"
                )}>
                  Dr. Darshana <span className="text-accent">Reddy</span>
                </p>
                <p className={cn(
                  "opacity-70 transition-all duration-300 text-primary-foreground",
                  scrolled ? "text-[10px]" : "text-xs"
                )}>
                  FICP · MD · DNB · Internal Medicine & Diabetologist
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav ────────────────────────────────────────────── */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={hideUnderline}
            >
              {/* Gliding underline */}
              <div
                ref={underlineRef}
                className="absolute bottom-0 h-[2px] bg-accent rounded-full transition-all duration-300 opacity-0 pointer-events-none"
                style={{ left: 0, width: 0 }}
              />

              {navLinks.map((link, i) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "nav-link-item relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      "hover:text-accent hover:bg-white/8",
                      active
                        ? "text-accent bg-white/10"
                        : "text-primary-foreground/85"
                    )}
                    style={{ animationDelay: `${i * 60 + 100}ms` }}
                    onMouseEnter={(e) => moveUnderline(e.currentTarget)}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* CTA Button */}
              <Link
                to="/contact"
                className={cn(
                  "nav-link-item ml-3 flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm",
                  "bg-accent text-accent-foreground shadow-lg shadow-accent/20",
                  "hover:shadow-accent/40 hover:shadow-xl hover:scale-105 hover:-translate-y-0.5",
                  "transition-all duration-300 relative overflow-hidden group/btn"
                )}
                style={{ animationDelay: `${navLinks.length * 60 + 100}ms` }}
              >
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <Calendar className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Book Appointment</span>
              </Link>
            </nav>

            {/* ── Mobile Hamburger ───────────────────────────────────────── */}
            <button
              className={cn(
                "md:hidden p-2 rounded-xl transition-all duration-300",
                "hover:bg-white/10 active:scale-95",
                isOpen && "bg-white/10"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={22}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <X
                  size={22}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                  )}
                />
              </div>
            </button>
          </div>

          {/* ── Mobile Navigation ────────────────────────────────────────── */}
          <div className={cn(
            "md:hidden overflow-hidden transition-all duration-400 ease-in-out",
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="pb-5 pt-2 border-t border-white/10">
              <div className="draw-separator h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-4" />

              {navLinks.map((link, i) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "mobile-nav-enter flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium",
                      "transition-all duration-200 hover:bg-white/10 hover:text-accent",
                      active
                        ? "text-accent bg-white/10"
                        : "text-primary-foreground/85"
                    )}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                    {!active && <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />}
                    {link.label}
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "mobile-nav-enter mt-4 flex items-center justify-center gap-2",
                  "bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold text-sm",
                  "shadow-lg shadow-accent/20 hover:opacity-90 transition-all duration-200",
                  "relative overflow-hidden"
                )}
                style={{ animationDelay: `${navLinks.length * 50}ms` }}
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom gradient line ─────────────────────────────────────── */}
        <div className={cn(
          "h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )} />
      </header>
    </>
  );
};
