"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

const CONTACT_INFO = [
  { icon: "@", value: "seu@email.com", href: "mailto:seu@email.com" },
  { icon: "in", value: "/in/seuperfil", href: "https://linkedin.com/in/seuperfil" },
  { icon: "GH", value: "/seuperfil", href: "https://github.com/seuperfil" },
];

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setFormState("sent");
      form.reset();
    } catch {
      setFormState("error");
    }

    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <section id="contact" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.number}>— 04 —</span>
        <h2>CONTATO</h2>
        <p className={styles.sub}>VAMOS TRABALHAR JUNTOS</p>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {CONTACT_INFO.map((item) => (
            <a
              key={item.icon}
              href={item.href}
              className={styles.contactItem}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.value}
            >
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.value}</span>
            </a>
          ))}
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">NOME</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Seu Nome"
              required
              aria-required="true"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              aria-required="true"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">MENSAGEM</label>
            <textarea
              id="message"
              name="message"
              placeholder="Sua mensagem..."
              rows={4}
              required
              aria-required="true"
            />
          </div>
          <button
            type="submit"
            className={`${styles.btn} ${styles.primary}`}
            disabled={formState === "sending"}
            style={
              formState === "sent"
                ? { background: "#22c55e" }
                : formState === "error"
                ? { background: "#cc3333" }
                : undefined
            }
          >
            <span className={styles.btnBracket}>［</span>
            <span>
              {formState === "sending"
                ? "ENVIANDO..."
                : formState === "sent"
                ? "ENVIADO!"
                : formState === "error"
                ? "ERRO"
                : "ENVIAR"}
            </span>
            <span className={styles.btnBracket}>］</span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}
