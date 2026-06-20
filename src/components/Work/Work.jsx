import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink, FiGithub, FiLock,
  FiX, FiChevronLeft, FiChevronRight, FiArrowLeft, FiCamera,
} from 'react-icons/fi';
import { featuredProjects, projects } from '@data/projects';
import { projectScreenshots } from '@data/screenshots';
import styles from './Work.module.scss';

// ─── Per-project visual config ────────────────────────────────────────────────
const VISUAL = {
  mehticpay: {
    from: 'rgba(100,255,218,0.10)', to: 'rgba(13,148,136,0.03)',
    accent: '#64ffda', status: '→ Live on Play Store',
  },
  throve: {
    from: 'rgba(167,139,250,0.10)', to: 'rgba(124,58,237,0.03)',
    accent: '#a78bfa', status: '⟡ In Active Development',
  },
  yulii: {
    from: 'rgba(251,191,36,0.10)', to: 'rgba(245,158,11,0.03)',
    accent: '#fbbf24', status: '→ Live on Both Stores',
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
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const [modalProject, setModalProject] = useState(null);

  return (
    <>
      <section id="work" className={styles.section} aria-labelledby="work-heading">
        <div className={styles.container}>

          <motion.div
            ref={headerRef}
            className={styles.header}
            variants={FADE_UP}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
          >
            <span className={styles.sectionLabel}>03. work</span>
            <h2 id="work-heading" className={styles.sectionHeading}>
              Selected Projects
            </h2>
          </motion.div>

          <div className={styles.featured}>
            {featuredProjects.map((project, i) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={i}
                reversed={i % 2 !== 0}
                hasScreenshots={(projectScreenshots[project.id]?.length ?? 0) > 0}
                onViewScreenshots={() => setModalProject(project.id)}
              />
            ))}
          </div>

          <OtherProjects />

        </div>
      </section>

      {/* Screenshot modal — rendered outside section so it overlays everything */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            projectId={modalProject}
            project={featuredProjects.find((p) => p.id === modalProject)}
            screenshots={projectScreenshots[modalProject] ?? []}
            onClose={() => setModalProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ project, index, reversed, hasScreenshots, onViewScreenshots }) {
  const ref    = useRef(null);
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
        {/* macOS bar */}
        <div className={styles.visualBar}>
          <span /><span /><span />
        </div>

        <div className={styles.visualBody}>
          <div className={styles.chipGrid}>
            {project.tech.map((t) => (
              <span key={t} className={styles.chip}>{t}</span>
            ))}
          </div>
          <div className={styles.visualFooter}>
            <span className={styles.watermark}>{project.title}</span>
            <span className={styles.visualStatus} style={{ color: visual.accent }}>
              {visual.status}
            </span>
          </div>
        </div>

        {/* Hover overlay — only shown when screenshots exist */}
        {hasScreenshots && (
          <button
            className={styles.screenshotOverlay}
            onClick={onViewScreenshots}
            aria-label={`View ${project.title} screenshots`}
          >
            <span className={styles.screenshotCta}>
              <FiCamera size={18} />
              <span>View Screenshots</span>
            </span>
          </button>
        )}
      </div>
    </motion.article>
  );
}

// ─── Project modal ─────────────────────────────────────────────────────────────
function ProjectModal({ projectId, project, screenshots, onClose }) {
  const [current,  setCurrent]  = useState(0);
  const [showHint, setShowHint] = useState(false);
  const total = screenshots.length;

  const navigate = useCallback((dir) => {
    setShowHint(false);
    setCurrent((c) => Math.max(0, Math.min(c + dir, total - 1)));
  }, [total]);

  const prev = useCallback(() => navigate(-1), [navigate]);
  const next = useCallback(() => navigate(+1), [navigate]);

  // Keyboard nav + body scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  // Reset on open; show next-hint after 1.2s if multiple screenshots
  useEffect(() => {
    setCurrent(0);
    setShowHint(false);
    if (screenshots.length > 1) {
      const t = setTimeout(() => setShowHint(true), 1200);
      return () => clearTimeout(t);
    }
  }, [projectId, screenshots.length]);

  if (!screenshots.length) return null;

  const visual = VISUAL[projectId] || VISUAL.mehticpay;
  const shot   = screenshots[current];

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{    opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshots`}
    >
      <motion.div
        className={styles.modalPanel}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal header ── */}
        <div className={styles.modalHeader}>
          <button className={styles.backBtn} onClick={onClose} aria-label="Back to portfolio">
            <FiArrowLeft size={15} />
            Back to portfolio
          </button>

          <div className={styles.modalMeta}>
            <span className={styles.modalProjectName}>{project.title}</span>
            {total > 1 && (
              <span className={styles.modalCount}>{current + 1} / {total}</span>
            )}
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        {/* ── Main body ── */}
        <div className={styles.modalBody}>

          {/* ── Left: phone mockup ── */}
          <div className={styles.screenshotWrap}>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.phoneFrame}
                initial={{ opacity: 0, x: 20  }}
                animate={{ opacity: 1, x: 0   }}
                exit={{    opacity: 0, x: -20  }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.phoneDynamicIsland} />
                <div className={styles.phoneScreen}>
                  <img
                    src={shot.img}
                    alt={`${project.title} — ${shot.caption}`}
                    className={styles.screenshotImg}
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className={styles.phoneHomeBar} />
              </motion.div>
            </AnimatePresence>

            {/* Dot pagination */}
            {total > 1 && (
              <div className={styles.dots} role="tablist" aria-label="Screenshot navigation">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                    style={i === current ? { background: visual.accent } : {}}
                    onClick={() => { setShowHint(false); setCurrent(i); }}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Screenshot ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Next-screenshot hint — appears after 1.2s, hides on interact */}
            <AnimatePresence>
              {showHint && current < total - 1 && (
                <motion.button
                  className={styles.nextHint}
                  initial={{ opacity: 0, y: 8  }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{    opacity: 0, y: 8  }}
                  transition={{ duration: 0.3 }}
                  onClick={next}
                  aria-label="Next screenshot"
                >
                  Next screen
                  <FiChevronRight size={13} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: explanation ── */}
          <div className={styles.explanationPanel}>
            <div className={styles.accentLine} style={{ background: visual.accent }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, y: -8  }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className={styles.captionLabel}>
                  {String(current + 1).padStart(2, '0')} — {shot.caption}
                </p>
                <p className={styles.technicalText}>{shot.technical}</p>
              </motion.div>
            </AnimatePresence>

            <div className={styles.modalTechStack}>
              {project.tech.map((t) => (
                <span key={t} className={styles.modalTechTag}>{t}</span>
              ))}
            </div>

            <div className={styles.modalLinks}>
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className={styles.modalBtnPrimary}>
                  <FiExternalLink size={13} /> View Live
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className={styles.modalBtnGhost}>
                  <FiGithub size={13} /> View Code
                </a>
              )}
            </div>

            <p className={styles.keyboardHint}>
              <kbd>←</kbd><kbd>→</kbd> navigate · <kbd>esc</kbd> close
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
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
