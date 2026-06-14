import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub, FiLock, FiArrowUpRight, FiArrowDownLeft, FiCreditCard, FiWifi } from 'react-icons/fi';
import { featuredProjects, projects } from '@data/projects';
import styles from './Work.module.scss';

// ─── Per-project visual config ────────────────────────────────────────────────
const VISUAL = {
  mehticpay: { accent: '#64ffda', status: '→ Live on Play Store'       },
  throve:    { accent: '#a78bfa', status: '⟡ In Active Development'    },
  yulii:     { accent: '#fbbf24', status: '→ Live on Both Stores'      },
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

// ─── Phone screen content per project ─────────────────────────────────────────
function MehticPayScreen() {
  return (
    <div className={styles.screen}>
      {/* Status bar */}
      <div className={styles.statusBar}>
        <span>9:41</span>
        <div className={styles.statusIcons}>
          <FiWifi size={10} />
          <span className={styles.battery} />
        </div>
      </div>
      {/* App header */}
      <div className={styles.appHeader}>
        <span className={styles.appGreeting}>Good morning 👋</span>
        <p className={styles.appTitle}>MehticPay</p>
      </div>
      {/* Balance card */}
      <div className={`${styles.balanceCard} ${styles.tealCard}`}>
        <span className={styles.balanceLabel}>Wallet Balance</span>
        <span className={styles.balanceAmount}>₦ 245,000<span>.00</span></span>
        <div className={styles.cardRow}>
          <div className={styles.quickAction}>
            <span className={styles.qIcon}><FiArrowUpRight size={11}/></span>
            <span>Send</span>
          </div>
          <div className={styles.quickAction}>
            <span className={styles.qIcon}><FiArrowDownLeft size={11}/></span>
            <span>Receive</span>
          </div>
          <div className={styles.quickAction}>
            <span className={styles.qIcon}><FiCreditCard size={11}/></span>
            <span>Pay Bills</span>
          </div>
        </div>
      </div>
      {/* Transactions */}
      <p className={styles.txLabel}>Recent</p>
      {[
        { name: 'Airtime Top-up',    amt: '- ₦2,000',  col: '#f87171' },
        { name: 'Transfer Received', amt: '+ ₦50,000', col: '#64ffda' },
        { name: 'Electricity Bill',  amt: '- ₦8,500',  col: '#f87171' },
      ].map((tx) => (
        <div key={tx.name} className={styles.txRow}>
          <span className={styles.txDot} />
          <span className={styles.txName}>{tx.name}</span>
          <span className={styles.txAmt} style={{ color: tx.col }}>{tx.amt}</span>
        </div>
      ))}
    </div>
  );
}

function ThroveScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.statusBar}>
        <span>9:41</span>
        <div className={styles.statusIcons}><FiWifi size={10}/><span className={styles.battery}/></div>
      </div>
      <div className={styles.appHeader}>
        <span className={styles.appGreeting}>Dashboard</span>
        <p className={styles.appTitle}>Throve</p>
      </div>
      {/* Stat cards */}
      <div className={styles.statRow}>
        {[
          { label: 'Items',     val: '1,284', col: '#a78bfa' },
          { label: 'Low Stock', val: '12',    col: '#fbbf24' },
        ].map((s) => (
          <div key={s.label} className={styles.statCard} style={{ '--sc': s.col }}>
            <span className={styles.statVal}>{s.val}</span>
            <span className={styles.statLbl}>{s.label}</span>
          </div>
        ))}
      </div>
      {/* Fraud alert */}
      <div className={`${styles.alertCard} ${styles.purpleCard}`}>
        <span className={styles.alertDot} />
        <div>
          <p className={styles.alertTitle}>Fraud Alert</p>
          <p className={styles.alertSub}>2 adjustments flagged · Score 87</p>
        </div>
      </div>
      {/* Activity */}
      <p className={styles.txLabel}>Activity</p>
      {[
        { name: 'Stock adjusted',    sub: 'Warehouse A' },
        { name: 'New tenant joined', sub: 'Acme Corp'   },
        { name: 'Low-stock digest',  sub: 'Email sent'  },
      ].map((a) => (
        <div key={a.name} className={styles.txRow}>
          <span className={styles.txDot} style={{ background: '#a78bfa' }} />
          <span className={styles.txName}>{a.name}</span>
          <span className={styles.txSub}>{a.sub}</span>
        </div>
      ))}
    </div>
  );
}

function YuliiScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.statusBar}>
        <span>9:41</span>
        <div className={styles.statusIcons}><FiWifi size={10}/><span className={styles.battery}/></div>
      </div>
      <div className={styles.appHeader}>
        <span className={styles.appGreeting}>Today's tasks ✦</span>
        <p className={styles.appTitle}>Yulii</p>
      </div>
      {/* Points badge */}
      <div className={`${styles.pointsBadge} ${styles.amberCard}`}>
        <span className={styles.pointsVal}>2,450</span>
        <span className={styles.pointsLbl}>points earned</span>
      </div>
      {/* Tasks */}
      <p className={styles.txLabel}>Tasks</p>
      {[
        { name: 'Design review',    pts: '+150', done: true  },
        { name: 'Ship v2.1 build',  pts: '+200', done: true  },
        { name: 'Write unit tests', pts: '+100', done: false },
        { name: 'Team standup',     pts: '+50',  done: false },
      ].map((t) => (
        <div key={t.name} className={`${styles.taskRow} ${t.done ? styles.taskDone : ''}`}>
          <span className={styles.taskCheck}>{t.done ? '✓' : ''}</span>
          <span className={styles.taskName}>{t.name}</span>
          <span className={styles.taskPts} style={{ color: '#fbbf24' }}>{t.pts}</span>
        </div>
      ))}
    </div>
  );
}

const SCREENS = { mehticpay: MehticPayScreen, throve: ThroveScreen, yulii: YuliiScreen };

// ─── Phone mockup wrapper ──────────────────────────────────────────────────────
function PhoneMockup({ projectId, accent }) {
  const Screen = SCREENS[projectId];
  return (
    <div className={styles.phoneWrap} aria-hidden="true">
      {/* Glow behind phone */}
      <div className={styles.phoneGlow} style={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${accent}28 0%, transparent 70%)` }} />
      <div className={styles.phone}>
        {/* Notch / dynamic island */}
        <div className={styles.island} />
        {/* Screen */}
        <div className={styles.screenWrap}>
          {Screen && <Screen />}
        </div>
        {/* Home indicator */}
        <div className={styles.homeBar} />
      </div>
    </div>
  );
}

// ─── Work section ─────────────────────────────────────────────────────────────
export default function Work() {
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });

  return (
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
          <h2 id="work-heading" className={styles.sectionHeading}>Selected Projects</h2>
        </motion.div>

        <div className={styles.featured}>
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} reversed={i % 2 !== 0} />
          ))}
        </div>

        <OtherProjects />
      </div>
    </section>
  );
}

// ─── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ project, index, reversed }) {
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
      {/* Content */}
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.cardNum}>0{index + 1}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.cardCompany}>{project.company}</span>
          <span className={styles.cardPeriod}>{project.period}</span>
        </div>

        <span className={styles.typeBadge}
          style={{ color: type.color, borderColor: type.color, background: `${type.color}18` }}>
          {type.label}
        </span>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardTagline}>{project.tagline}</p>
        <p className={styles.cardDesc}>{project.description}</p>

        <ul className={styles.highlights} aria-label="Key highlights">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className={styles.highlight}>
              <span className={styles.hDot} aria-hidden="true" />{h}
            </li>
          ))}
        </ul>

        <div className={styles.techStack}>
          {project.tech.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
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
            <span className={styles.privateNote}><FiLock size={12} /> Private codebase</span>
          )}
        </div>

        {/* Status pill below links */}
        <span className={styles.statusPill} style={{ color: visual.accent, borderColor: `${visual.accent}40` }}>
          {visual.status}
        </span>
      </div>

      {/* Phone mockup */}
      <div className={styles.cardVisual}>
        <PhoneMockup projectId={project.id} accent={visual.accent} />
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
    <motion.div ref={ref} className={styles.othersWrap} variants={FADE_UP} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
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
          {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={15} /></a>}
          {project.links.live   && <a href={project.links.live}   target="_blank" rel="noreferrer" aria-label="Live"><FiExternalLink size={15} /></a>}
        </div>
      </div>
      <h4 className={styles.smallTitle}>{project.title}</h4>
      <p className={styles.smallTagline}>{project.tagline}</p>
      <p className={styles.smallDesc}>{project.description.substring(0, 130)}…</p>
      <div className={styles.smallFooter}>
        <div className={styles.techStack}>
          {project.tech.slice(0, 4).map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
        </div>
        <span className={styles.typeBadge}
          style={{ color: type.color, borderColor: type.color, background: `${type.color}18` }}>
          {type.label}
        </span>
      </div>
    </div>
  );
}
