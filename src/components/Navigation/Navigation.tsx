"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navigation.module.css";

const NAV_ITEMS = [
  { href: "#hero", index: "00", label: "INÍCIO" },
  { href: "#skills", index: "01", label: "PERSONAS" },
  { href: "#projects", index: "02", label: "PROJETOS" },
  { href: "#about", index: "03", label: "SOBRE" },
  { href: "#contact", index: "04", label: "CONTATO" },
];

export default function Navigation() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const initialized = useRef(false);

  const updateActive = useCallback(() => {
    const sy = window.scrollY + 100;
    const sections = document.querySelectorAll("section[id]");
    for (const s of sections) {
      const t = s.getBoundingClientRect().top + window.scrollY;
      const b = t + s.getBoundingClientRect().height;
      if (sy >= t && sy < b) {
        setActive(s.id);
        break;
      }
    }
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      updateActive();
    }
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const currentIndex = NAV_ITEMS.findIndex(
        (item) => item.href === `#${active}`
      );
      const nextIndex =
        e.key === "ArrowDown"
          ? (currentIndex + 1) % NAV_ITEMS.length
          : (currentIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
      const target = document.querySelector<HTMLAnchorElement>(
        `a[href="${NAV_ITEMS[nextIndex].href}"]`
      );
      target?.focus();
      target?.click();
    }
  };

  return (
    <nav
      className={`${styles.container} ${scrolled ? styles.scrolled : ""}`}
      role="navigation"
      aria-label="Navegação principal"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoCrown} aria-hidden="true">
            ✦
          </span>
          <span className={styles.logoText}>P4//PORTFOLIO</span>
        </div>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`${styles.link} ${
                  active === item.href.slice(1) ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                }}
                aria-current={
                  active === item.href.slice(1) ? "true" : undefined
                }
              >
                <span className={styles.navIndex}>{item.index}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.toggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${
                  active === item.href.slice(1) ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
