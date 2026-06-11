import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSmartphone, FiServer, FiMonitor, FiTool } from 'react-icons/fi';
import { skillGroups, techTags } from '@data/skills';
import styles from './Skills.module.scss';

// ─── Per-group visual config ──────────────────────────────────────────────────
const GROUP_CONFIG = {
  mobile:   { color: '#64ffda', Icon: FiSmartphone },
  backend:  { color: '#a78bfa', Icon: FiServer     },
  frontend: { color: '#60a5fa', Icon: FiMonitor    },
  devops:   { color: '#fbbf24', Icon: FiTool       },
};

// ─── Animation ────────────────────────────────────────────────────────────────
const FADE_UP = {
  hidden:  { opacity: 0, y: 36 },
  visible: (delay) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── Skills ───────────────────────────────────────────────────────────────────
export default function Skills() {
  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const techRef    = useRef(null);
  const techInView = useInView(techRef,   { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
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
          <span className={styles.sectionLabel}>02. skills</span>
          <h2 id="skills-heading" className={styles.sectionHeading}>
            What I Work With
          </h2>
        </motion.div>

        {/* ── Primary tech stack row ─────────────────── */}
        <motion.div
          ref={techRef}
          className={styles.techRow}
          custom={0.1}
          variants={FADE_UP}
          initial="hidden"
          animate={techInView ? 'visible' : 'hidden'}
          aria-label="Primary technologies"
        >
          {techTags.map((tag) => (
            <span key={tag} className={styles.primaryTag}>{tag}</span>
          ))}
        </motion.div>

        {/* ── Skill cards grid ───────────────────────── */}
        <div className={styles.grid} role="list">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.id} group={group} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Skill card ───────────────────────────────────────────────────────────────
function SkillCard({ group, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const config = GROUP_CONFIG[group.id] || GROUP_CONFIG.mobile;
  const { Icon } = config;

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      style={{ '--card-accent': config.color }}
      role="listitem"
      custom={index * 0.1}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Card header */}
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon} aria-hidden="true">
          <Icon size={17} />
        </span>
        <h3 className={styles.cardTitle}>{group.label}</h3>
        <span className={styles.cardCount} aria-label={`${group.skills.length} skills`}>
          {group.skills.length}
        </span>
      </div>

      {/* Skill tags */}
      <ul className={styles.tags} role="list" aria-label={`${group.label} skills`}>
        {group.skills.map(({ name }) => (
          <li key={name} className={styles.tag}>{name}</li>
        ))}
      </ul>
    </motion.article>
  );
}
