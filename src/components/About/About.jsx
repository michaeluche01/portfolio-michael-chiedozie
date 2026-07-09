import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMapPin, FiBook, FiGlobe, FiBriefcase } from 'react-icons/fi';
// Import from src/assets — Vite automatically handles base path in all environments
import profileImg from '@assets/profile.jpg';
import styles from './About.module.scss';

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXPERIENCE = [
   {
    role: 'Full-Stack Developer & Technical SEO Specialist',
    company: 'Codelab Projects',
    period: 'Jun 2026 – Present',
    note: 'Build and maintain client web apps and WordPress sites, integrate APIs, and drive technical SEO audits and performance monitoring.',
    accent: '#f87171',
  },
  {
    role: 'Flutter Mobile Engineer',
    company: 'Mehtic Technology',
    period: 'Jan 2024 – Jan 2025',
    note: 'Delivered MehticPay (10K+ users) and Bank Mobile — full cycle from architecture to store release.',
    accent: '#64ffda',
  },
  {
    role: 'React Native Engineer',
    company: 'SpecsPay · Contract',
    period: 'Late 2024',
    note: 'Built fintech wallet, transaction, and payment flows using TypeScript, Expo Router, and Redux.',
    accent: '#60a5fa',
  },
  {
    role: 'Software Engineer / IT Support',
    company: 'Adaptive Computer Solutions',
    period: '2021 – Present',
    note: 'Built Yulii (live on both stores), contributed to a SaaS payroll platform and POS system.',
    accent: '#a78bfa',
  },
  {
    role: 'Frontend Developer',
    company: 'Reverton.Net Limited',
    period: 'Jan 2022 – Mar 2023',
    note: 'Built responsive client web apps with HTML5, CSS3, JavaScript, and PHP, integrated with backend APIs.',
    accent: '#fbbf24',
  },
];

const FACTS = [
  { Icon: FiMapPin,     text: 'Abuja, Nigeria' },
  { Icon: FiBook,       text: 'B.Sc. Computer Science — Ajayi Crowther University (2:1)' },
  { Icon: FiGlobe,      text: 'English (Professional)  ·  Igbo (Native)' },
  { Icon: FiBriefcase,  text: 'Open to senior mobile & full-stack roles' },
];

const FADE_UP = {
  hidden:  { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const bioRef       = useRef(null);
  const bioInView    = useInView(bioRef,    { once: true, margin: '0px 0px -60px 0px' });
  const photoRef     = useRef(null);
  const photoInView  = useInView(photoRef,  { once: true, margin: '0px 0px -60px 0px' });
  const xpRef        = useRef(null);
  const xpInView     = useInView(xpRef,     { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          custom={0}
          variants={FADE_UP}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <span className={styles.sectionLabel}>01. about</span>
          <h2 id="about-heading" className={styles.sectionHeading}>About Me</h2>
        </motion.div>

        {/* ── Bio + Photo ─────────────────────────────── */}
        <div className={styles.grid}>

          {/* Bio */}
          <motion.div
            ref={bioRef}
            className={styles.bioCol}
            custom={0}
            variants={FADE_UP}
            initial="hidden"
            animate={bioInView ? 'visible' : 'hidden'}
          >
            <div className={styles.bio}>
              <p>
                I&apos;m a mobile-first software engineer based in Abuja, Nigeria. Flutter
                is my primary tool — I design, build, and ship cross-platform applications
                for iOS and Android, and build the backend systems that power them. Over
                four years across mobile, backend, and web I&apos;ve learned that shipping
                great software means owning the whole picture, not just the parts assigned
                to you.
              </p>
              <p>
                At Mehtic Technology I led delivery of <strong>MehticPay</strong> — a
                fintech e-wallet now serving over <strong>10,000 active users</strong> on
                both stores. I owned the full cycle: architecture, state management, payment
                API integrations, performance profiling with Flutter DevTools, and App Store
                / Play Store releases. That experience gave me a clear understanding of what
                it takes to keep production software healthy long after the initial launch.
              </p>
              <p>
                I&apos;m currently building <strong>Throve</strong> solo — a multi-tenant
                SaaS inventory platform with a FastAPI backend, Flutter mobile client, and
                React admin dashboard. Every architectural decision is mine to make and live
                with, which is the fastest way to grow as an engineer. I&apos;m open to
                senior mobile and full-stack roles where I can keep shipping things that
                reach real users.
              </p>
            </div>

            <ul className={styles.facts} aria-label="Quick facts">
              {FACTS.map(({ Icon, text }) => (
                <li key={text} className={styles.fact}>
                  <span className={styles.factIcon} aria-hidden="true"><Icon size={14} /></span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Photo + education */}
          <motion.div
            ref={photoRef}
            className={styles.photoCol}
            custom={0.18}
            variants={FADE_UP}
            initial="hidden"
            animate={photoInView ? 'visible' : 'hidden'}
            aria-hidden="true"
          >
            <div className={styles.photoFrame}>
              <img
                src={profileImg}
                alt="Michael Chiedozie"
                className={styles.photo}
                loading="eager"
                decoding="async"
              />
              <div className={styles.photoVignette} />
            </div>

            <div className={styles.eduCard}>
              <span className={styles.eduLabel}>Education</span>
              <p className={styles.eduDegree}>B.Sc. Computer Science</p>
              <p className={styles.eduMeta}>Ajayi Crowther University · 2020 – 2024</p>
              <p className={styles.eduGrade}>Second Class Upper Division</p>
            </div>
          </motion.div>
        </div>

        {/* ── Experience ──────────────────────────────── */}
        <div ref={xpRef} className={styles.xpWrap}>
          <motion.h3
            className={styles.xpLabel}
            custom={0}
            variants={FADE_UP}
            initial="hidden"
            animate={xpInView ? 'visible' : 'hidden'}
          >
            Experience
          </motion.h3>

          <div className={styles.xpGrid}>
            {EXPERIENCE.map((item, i) => (
              <motion.article
                key={item.company}
                className={styles.xpCard}
                style={{ '--xp-accent': item.accent }}
                custom={i * 0.09}
                variants={FADE_UP}
                initial="hidden"
                animate={xpInView ? 'visible' : 'hidden'}
              >
                <p className={styles.xpRole}>{item.role}</p>
                <p className={styles.xpCompany}>{item.company}</p>
                <p className={styles.xpPeriod}>{item.period}</p>
                <p className={styles.xpNote}>{item.note}</p>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
