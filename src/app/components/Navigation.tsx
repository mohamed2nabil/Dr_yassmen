"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const chapters = [
  {
    id: "visual-art",
    label: "الفن البصري",
    en: "Visual Art",
    color: "var(--chapter-art)",
  },
  {
    id: "interior-design",
    label: "التصميم الداخلي",
    en: "Interior Design",
    color: "var(--chapter-interior)",
  },
  {
    id: "education",
    label: "التعليم الفني",
    en: "Art Education",
    color: "var(--chapter-education)",
  },
  {
    id: "art-therapy",
    label: "العلاج بالفن",
    en: "Art Therapy",
    color: "var(--chapter-therapy)",
  },
];

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 w-full">
          {/* Brand / Logo – left */}
          <button
            onClick={() => scrollTo("hero")}
            style={{ fontFamily: "var(--font-display)" }}
            className="text-foreground tracking-wide text-left"
          >
            <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              Dr. Yassmin Allam
            </span>
            <span
              className="hidden sm:inline text-muted-foreground mx-2"
              style={{ fontSize: "0.85rem" }}
            >
              ·
            </span>
            <span
              className="hidden sm:inline text-muted-foreground"
              style={{ fontSize: "0.8rem", fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              د. ياسمين علام
            </span>
          </button>

          {/* Desktop navigation – shown on lg+ */}
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
              className="ml-4 px-5 py-2 transition-all duration-200 hover:opacity-80 text-sm"
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

          {/* Mobile hamburger – right aligned */}
          <button
            className="lg:hidden ml-auto text-foreground z-50 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer (Sidebar) */}
      <div
        className={`fixed inset-y-0 right-0 w-64 h-full shadow-2xl transition-transform duration-300 transform lg:hidden z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "var(--background)", borderLeft: "1px solid var(--border)" }}
      >
        <div className="flex flex-col p-8 pt-20 gap-6">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className="flex items-center gap-4 text-left w-full hover:opacity-80 transition-opacity"
            >
              <span
                className="w-1.5 h-10 rounded-full shrink-0"
                style={{ background: ch.color }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    color: "var(--foreground)",
                  }}
                >
                  {ch.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--muted-foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {ch.en}
                </div>
              </div>
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-4 px-6 py-3 text-center transition-all duration-200 hover:opacity-90"
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
    </>
  );
}