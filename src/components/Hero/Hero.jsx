import { motion, useReducedMotion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { siteConfig } from '@data/config';
import styles from './Hero.module.scss';

// ─── Animation variants ──────────────────────────────────────────────────────

const STAGGER = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  },
  item: {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
};

const TERMINAL_ANIM = {
  hidden:  { opacity: 0, x: 44, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 } },
};

const STATS_ANIM = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 1.05 } },
};

// ─── Static data ─────────────────────────────────────────────────────────────

const STATS = [
  { value: '10K+', label: 'Active Users'       },
  { value: '3',    label: 'Apps Live'           },
  { value: '4+',   label: 'Years in Production' },
];

const SOCIALS = [
  { Icon: FiGithub,   href: siteConfig.socials.github,   label: 'GitHub'   },
  { Icon: FiLinkedin, href: siteConfig.socials.linkedin,  label: 'LinkedIn' },
  { Icon: FiMail,     href: siteConfig.socials.email,     label: 'Email'    },
];

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  const reduced = useReducedMotion();
  const noAnim  = reduced ? false : undefined;

  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">

      {/* Background layers */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.glowA}   />
        <div className={styles.glowB}   />
        <div className={styles.dotGrid} />
      </div>

      {/* Main two-column grid */}
      <div className={styles.inner}>

        {/* ── Left: text content ───────────────────────────────────── */}
        <motion.div
          className={styles.content}
          variants={STAGGER.container}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          {/* Availability badge */}
          <motion.div className={styles.badge} variants={STAGGER.item}>
            <span className={styles.pulse} aria-hidden="true" />
            Available for opportunities
          </motion.div>

          {/* Name block */}
          <motion.div className={styles.nameBlock} variants={STAGGER.item}>
            <span className={styles.greeting}>hi, I&apos;m</span>
            <h1 className={styles.name} aria-label="Michael Chiedozie">
              <NameChars str="Michael"    cls={styles.firstName} reduced={reduced} delay={0.3} />
              <NameChars str="Chiedozie" cls={styles.lastName}  reduced={reduced} delay={0.52} />
            </h1>
          </motion.div>

          {/* Role */}
          <motion.p className={styles.role} variants={STAGGER.item}>
            Mobile Engineer
            <span className={styles.roleSep} aria-hidden="true"> · </span>
            Full-Stack Builder
          </motion.p>

          {/* Description */}
          <motion.p className={styles.desc} variants={STAGGER.item}>
            I design and ship Flutter applications — and build the backend systems
            that power them. Delivered fintech products to{' '}
            <strong>10,000+ active users</strong> and currently architecting{' '}
            <strong>Throve</strong>, a multi-tenant SaaS platform, as a Founding engineer.
          </motion.p>

          {/* CTAs */}
          <motion.div className={styles.ctas} variants={STAGGER.item}>
            <a href="#work"    className={`btn btn--primary  ${styles.ctaBtn}`}>View my work</a>
            <a href="#contact" className={`btn btn--ghost    ${styles.ctaBtn}`}>Get in touch</a>
          </motion.div>

          {/* Social links */}
          <motion.div className={styles.socials} variants={STAGGER.item}>
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: terminal card ──────────────────────────────────── */}
        <motion.div
          className={styles.terminal}
          variants={TERMINAL_ANIM}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          aria-hidden="true"
        >
          <div className={styles.termBar}>
            <span className={styles.termDot} data-color="red"   />
            <span className={styles.termDot} data-color="yellow"/>
            <span className={styles.termDot} data-color="green" />
            <code className={styles.termFile}>michael.config.js</code>
          </div>
          <div className={styles.termBody}>
            <pre className={styles.termPre}>
              <TL><TK>const </TK><TV>michael</TV>{' = {'}</TL>
              <TL i><TKy>role    </TKy><TP>: </TP><TS>"Mobile Engineer"</TS><TP>,</TP></TL>
              <TL i><TKy>primary </TKy><TP>: </TP><TS>['Flutter', 'React']</TS><TP>,</TP></TL>
              <TL i><TKy>backend </TKy><TP>: </TP><TS>['Python', 'FastAPI']</TS><TP>,</TP></TL>
              <TL i><TKy>shipped </TKy><TP>: </TP><TS>"10K+ active users"</TS><TP>,</TP></TL>
              <TL i><TKy>building</TKy><TP>: </TP><TS>"Throve SaaS"</TS><TP>,</TP></TL>
              <TL i><TKy>location</TKy><TP>: </TP><TS>"Abuja, NG"</TS><TP>,</TP></TL>
              <TL i><TKy>open    </TKy><TP>: </TP><TB>true</TB><TP>,</TP></TL>
              <TL>{'}'}<TCur /></TL>
            </pre>
          </div>
        </motion.div>

      </div>

      {/* Stats bar */}
      <motion.div
        className={styles.stats}
        variants={STATS_ANIM}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        {STATS.map(({ value, label }) => (
          <div key={label} className={styles.stat}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

    </section>
  );
}

// ─── NameChars: per-character staggered entrance ─────────────────────────────

function NameChars({ str, cls, reduced, delay }) {
  if (reduced) return <span className={cls}>{str}</span>;
  return (
    <span className={cls}>
      {str.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.038 }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Terminal syntax tokens ───────────────────────────────────────────────────

const TL  = ({ children, i }) => <div className={`${styles.tl}${i ? ` ${styles.tli}` : ''}`}>{children}</div>;
const TK  = ({ children })   => <span className={styles.tk}>{children}</span>;   // keyword
const TV  = ({ children })   => <span className={styles.tv}>{children}</span>;   // identifier
const TKy = ({ children })   => <span className={styles.tky}>{children}</span>;  // object key
const TS  = ({ children })   => <span className={styles.ts}>{children}</span>;   // string
const TB  = ({ children })   => <span className={styles.tb}>{children}</span>;   // boolean
const TP  = ({ children })   => <span className={styles.tp}>{children}</span>;   // punctuation
const TCur = ()              => <span className={styles.tcur} />;                 // blinking cursor
