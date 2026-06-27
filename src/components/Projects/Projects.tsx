"use client";

import { motion } from "framer-motion";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    index: "01",
    name: "MARKETPLACE PRO",
    desc: "Plataforma completa de e-commerce com pagamentos integrados e dashboard em tempo real.",
    tags: ["REACT", "NODE.JS", "STRIPE"],
  },
  {
    index: "02",
    name: "FLOWTASKS",
    desc: "Gerenciador de tarefas com kanban, colaboração em tempo real e notificações push.",
    tags: ["NEXT.JS", "MONGODB", "SOCKET.IO"],
  },
  {
    index: "03",
    name: "CONNECTHUB",
    desc: "App social com feed, stories, chat em tempo real e algoritmos de recomendação.",
    tags: ["RN", "FIREBASE", "AI"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.number}>— 02 —</span>
        <h2>PROJETOS</h2>
        <p className={styles.sub}>TRABALHOS RECENTES</p>
      </motion.div>

      <motion.div
        className={styles.list}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {PROJECTS.map((project) => (
          <motion.article
            key={project.index}
            className={styles.card}
            variants={cardVariants}
            whileHover={{
              borderColor: "rgba(245, 230, 66, 0.2)",
              boxShadow: "0 0 30px rgba(0,0,0,0.4)",
            }}
          >
            <div className={styles.index}>{project.index}</div>
            <div className={styles.info}>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className={styles.name}>{project.name}</h3>
              <p className={styles.desc}>{project.desc}</p>
              <div className={styles.links}>
                <a
                  href="#"
                  className={styles.link}
                  onClick={(e) => e.preventDefault()}
                  aria-label={`Live demo do ${project.name}`}
                >
                  ［ LIVE ］
                </a>
                <a
                  href="#"
                  className={styles.link}
                  onClick={(e) => e.preventDefault()}
                  aria-label={`GitHub do ${project.name}`}
                >
                  ［ GITHUB ］
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
