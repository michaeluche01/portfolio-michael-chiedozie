import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub, FiLock } from 'react-icons/fi';
import { featuredProjects, projects } from '@data/projects';
import styles from './Work.module.scss';

// ─── Per-project visual config (UI-only) ─────────────────────────────────────
const VISUAL = {
  mehticpay: {
    from: 'rgba(100,255,218,0.10)',
    to:   'rgba(13,148,136,0.03)',
    accent: '#64ffda',
    status: '→ Live on Play Store',
  },
  throve: {
    from: 'rgba(167,139,250,0.10)',
    to:   'rgba(124,58,237,0.03)',
    accent: '#a78bfa',
    status: '⟡ In Active Development',
  },
  yulii: {
    from: 'rgba(251,191,36,0.10)',
    to:   'rgba(245,158,11,0.03)',
    accent: '#fbbf24',
    status: '→ Live on Both Stores',
  },
};

const TYPE = {
  production: { label: 'Live',       color: '#64ffda' },
  personal:   { label: 'Solo Build', color: '#a78bfa' },
  contract:   { label: 'Contract',   color: '#60a5fa' },
};

const FADE_UP = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Work section ─────────────────────────────────────────────────────────────
export default function Work() {
  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          variants={FADE_UP}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <span className={styles.sectionLabel}>02. work</span>
          <h2 id="work-heading" className={styles.sectionHeading}>
            Selected Projects
          </h2>
        </motion.div>

        {/* Featured cards */}
        <div className={styles.featured}>
          {featuredProjects.map((project, i) => (
            <FeaturedCard
              key={project.id}
              project={project}
              index={i}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>

        {/* Other projects */}
        <OtherProjects />

      </div>
    </section>
  );
}

// ─── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ project, index, reversed }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const visual = VISUAL[project.id] || VISUAL.mehticpay;
  const type   = TYPE[project.type]  || TYPE.production;

  return (
    <motion.article
      ref={ref}
      className={`${styles.card} ${reversed ? styles.cardReversed : ''}`}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* ── Content ── */}
      <div className={styles.cardContent}>

        <div className={styles.cardMeta}>
          <span className={styles.cardNum}>0{index + 1}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.cardCompany}>{project.company}</span>
          <span className={styles.cardPeriod}>{project.period}</span>
        </div>

        <span
          className={styles.typeBadge}
          style={{ color: type.color, borderColor: type.color, background: `${type.color}18` }}
        >
          {type.label}
        </span>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardTagline}>{project.tagline}</p>
        <p className={styles.cardDesc}>{project.description}</p>

        <ul className={styles.highlights} aria-label="Key highlights">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className={styles.highlight}>
              <span className={styles.hDot} aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className={styles.techStack}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>

        <div className={styles.cardLinks}>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
              <FiExternalLink size={13} /> View Live
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className={styles.btnGhost}>
              <FiGithub size={13} /> View Code
            </a>
          )}
          {!project.links.live && !project.links.github && (
            <span className={styles.privateNote}>
              <FiLock size={12} /> Private codebase
            </span>
          )}
        </div>

      </div>

      {/* ── Visual panel ── */}
      <div
        className={styles.cardVisual}
        style={{
          background: `linear-gradient(145deg, ${visual.from} 0%, ${visual.to} 100%)`,
          '--va': visual.accent,
        }}
        aria-hidden="true"
      >
        {/* macOS-style bar */}
        <div className={styles.visualBar}>
          <span /><span /><span />
        </div>

        <div className={styles.visualBody}>
          {/* Floating tech chips */}
          <div className={styles.chipGrid}>
            {project.tech.map((t, i) => (
              <span key={t} className={styles.chip} style={{ '--i': i }}>
                {t}
              </span>
            ))}
          </div>

          {/* Bottom: watermark name + status */}
          <div className={styles.visualFooter}>
            <span className={styles.watermark}>{project.title}</span>
            <span className={styles.visualStatus} style={{ color: visual.accent }}>
              {visual.status}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Other projects ────────────────────────────────────────────────────────────
function OtherProjects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const others = projects.filter((p) => !p.featured);

  if (!others.length) return null;

  return (
    <motion.div
      ref={ref}
      className={styles.othersWrap}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <h3 className={styles.othersLabel}>Other notable work</h3>
      <div className={styles.othersGrid}>
        {others.map((p) => <SmallCard key={p.id} project={p} />)}
      </div>
    </motion.div>
  );
}

function SmallCard({ project }) {
  const type = TYPE[project.type] || TYPE.production;

  return (
    <div className={styles.smallCard}>
      <div className={styles.smallTop}>
        <FiLock size={17} className={styles.smallIcon} />
        <div className={styles.smallLinks}>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub size={15} />
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" aria-label="Live">
              <FiExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      <h4 className={styles.smallTitle}>{project.title}</h4>
      <p className={styles.smallTagline}>{project.tagline}</p>
      <p className={styles.smallDesc}>{project.description.substring(0, 130)}…</p>

      <div className={styles.smallFooter}>
        <div className={styles.techStack}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>
        <span
          className={styles.typeBadge}
          style={{ color: type.color, borderColor: type.color, background: `${type.color}18` }}
        >
          {type.label}
        </span>
      </div>
    </div>
  );
}
