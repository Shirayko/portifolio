"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.fog} aria-hidden="true" />

      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badgeLine}>——</span>
          <span className={styles.badgeText}>INVESTIGATION TEAM</span>
          <span className={styles.badgeLine}>——</span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={styles.titleSub}>PORTADOR DA CHAMA</span>
          <span className={styles.titleMain}>DESENVOLVEDOR</span>
          <span className={`${styles.titleMain} ${styles.accent}`}>
            FULL STACK
          </span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transformo ideias em experiências digitais.
          <br />
          Especializado em React, Node.js e TypeScript.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={() => handleScroll("#projects")}
            aria-label="Explorar projetos"
          >
            <span className={styles.btnBracket}>［</span>
            <span>EXPLORAR PROJETOS</span>
            <span className={styles.btnBracket}>］</span>
          </button>
          <button
            className={`${styles.btn} ${styles.ghost}`}
            onClick={() => handleScroll("#contact")}
            aria-label="Ir para contato"
          >
            <span>［ CONTATO ］</span>
          </button>
        </motion.div>
      </div>

      <motion.div
        className={styles.status}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className={styles.statusBar}>
          <span className={styles.statusLabel}>SEU NOME</span>
          <span className={styles.statusDivider} aria-hidden="true">
            ✦
          </span>
          <span className={styles.statusLabel}>ARCANA: O MAGO</span>
          <span className={styles.statusDivider} aria-hidden="true">
            ✦
          </span>
          <span className={styles.statusLabel}>Lv. ★</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className={styles.scrollText}>▽ SCROLL ▽</span>
      </motion.div>
    </section>
  );
}
