"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const STATS = [
  { label: "PROJETOS", target: 50 },
  { label: "CLIENTES", target: 30 },
  { label: "ANOS", target: 5 },
];

const TIMELINE = [
  { year: "2024", role: "TECH LEAD", company: "Empresa X" },
  { year: "2022", role: "SENIOR DEV", company: "Freelancer" },
  { year: "2020", role: "JUNIOR DEV", company: "Empresa Y" },
  { year: "2019", role: "INÍCIO", company: "Autodidata" },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let current = 0;
          const inc = Math.max(1, Math.ceil(target / 35));
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(current);
          }, 35);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={styles.statNumber}>
      {count}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.number}>— 03 —</span>
        <h2>SOBRE</h2>
        <p className={styles.sub}>QUEM SOU</p>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.badge}>✦ ARCANA: O MUNDO ✦</div>
          <p>
            Desenvolvedor full stack com{" "}
            <span className={styles.highlight}>5+ anos</span> de experiência
            criando aplicações web modernas. Minha jornada começou como
            autodidata e hoje lidero projetos que impactam milhares de usuários.
          </p>
          <p>
            Acredito que código é poesia e cada projeto é uma oportunidade de
            transformar o mundo digital. Especializado em React, Node.js e
            arquiteturas escaláveis.
          </p>
          <div className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <AnimatedCounter target={stat.target} />
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.timeline}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className={styles.timelineYear}>{item.year}</span>
              <div className={styles.timelineBox}>
                <span className={styles.timelineRole}>{item.role}</span>
                <span className={styles.timelineCompany}>{item.company}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
