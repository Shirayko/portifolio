"use client";

import { motion } from "framer-motion";
import styles from "./Skills.module.css";

const SKILLS = [
  {
    rank: "Ⅰ",
    arcana: "O MAGO",
    name: "FRONTEND",
    stats: [
      { tag: "REACT", level: 5 },
      { tag: "TYPESCRIPT", level: 5 },
      { tag: "NEXT.JS", level: 4 },
      { tag: "TAILWIND", level: 5 },
    ],
  },
  {
    rank: "Ⅳ",
    arcana: "O IMPERADOR",
    name: "BACKEND",
    stats: [
      { tag: "NODE.JS", level: 5 },
      { tag: "PYTHON", level: 4 },
      { tag: "POSTGRES", level: 5 },
      { tag: "MONGODB", level: 3 },
    ],
  },
  {
    rank: "Ⅱ",
    arcana: "A SACERDOTISA",
    name: "DESIGN",
    stats: [
      { tag: "FIGMA", level: 5 },
      { tag: "UI/UX", level: 4 },
      { tag: "PROTOTIP.", level: 5 },
    ],
  },
  {
    rank: "Ⅴ",
    arcana: "O HIEROFANTE",
    name: "DEVOPS",
    stats: [
      { tag: "DOCKER", level: 4 },
      { tag: "AWS", level: 3 },
      { tag: "CI/CD", level: 4 },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.number}>— 01 —</span>
        <h2>PERSONAS</h2>
        <p className={styles.sub}>HABILIDADES E TECNOLOGIAS</p>
      </motion.div>

      <motion.div
        className={styles.list}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {SKILLS.map((skill) => (
          <motion.div
            key={skill.arcana}
            className={styles.card}
            variants={cardVariants}
            whileHover={{
              borderColor: "rgba(245, 230, 66, 0.25)",
              boxShadow: "0 0 30px rgba(0,0,0,0.4)",
            }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.rank}>{skill.rank}</span>
              <span className={styles.arcana}>{skill.arcana}</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.skillName}>{skill.name}</div>
              <div className={styles.stats}>
                {skill.stats.map((stat) => (
                  <div key={stat.tag} className={styles.stat}>
                    <span className={styles.statTag}>{stat.tag}</span>
                    <span className={styles.dots}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={i < stat.level ? "" : styles.off}
                        />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
