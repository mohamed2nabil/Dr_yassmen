import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const chapters = [
  { id: "visual-art", label: "الفن البصري", en: "Visual Art", color: "var(--chapter-art)" },
  { id: "interior-design", label: "التصميم الداخلي", en: "Interior Design", color: "var(--chapter-interior)" },
  { id: "education", label: "التعليم الفني", en: "Art Education", color: "var(--chapter-education)" },
  { id: "art-therapy", label: "العلاج بالفن", en: "Art Therapy", color: "var(--chapter-therapy)" },
];

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(249,246,241,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(28,24,18,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => scrollTo("hero")}
            style={{ fontFamily: "var(--font-display)" }}
            className="text-foreground tracking-wide"
          >
            <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>Dr. Yassmin Allam</span>
            <span className="hidden sm:inline text-muted-foreground mx-2" style={{ fontSize: "0.85rem" }}>·</span>
            <span className="hidden sm:inline text-muted-foreground" style={{ fontSize: "0.8rem", fontFamily: "var(--font-body)", fontWeight: 400 }}>د. ياسمين علام</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className="relative transition-all duration-200 group"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: activeSection === ch.id ? ch.color : "var(--muted-foreground)",
                }}
              >
                {ch.en}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px transition-all duration-200"
                  style={{
                    background: ch.color,
                    opacity: activeSection === ch.id ? 1 : 0,
                    transform: activeSection === ch.id ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="ml-4 px-5 py-2 transition-all duration-200 hover:opacity-80"
              style={{
                background: "var(--foreground)",
                color: "var(--primary-foreground)",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "2px",
              }}
            >
              Book a Session
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 pt-16"
          style={{ background: "var(--background)" }}
        >
          <div className="flex flex-col p-8 gap-6">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className="flex items-center gap-4 text-left"
              >
                <span className="w-1 h-10 rounded-full" style={{ background: ch.color }} />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--foreground)" }}>{ch.label}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{ch.en}</div>
                </div>
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-4 px-6 py-3 text-center"
              style={{
                background: "var(--foreground)",
                color: "var(--primary-foreground)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "2px",
              }}
            >
              Book a Session
            </button>
          </div>
        </div>
      )}
    </>
  );
}
