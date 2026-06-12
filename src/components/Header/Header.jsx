import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { siteConfig } from '@data/config';
// Import logo from src/assets — Vite handles the base path in all environments.
// Move your logo_white.png from public/ into src/assets/logo_white.png
import logoImg from '@assets/logo_white.png';
import styles from './Header.module.scss';

// ─── Mobile menu animation ────────────────────────────────────────────────────
const menuVariants = {
  hidden:  { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

const linkVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.08 + i * 0.065, duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen,      setMenuOpen]      = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', ...siteConfig.nav.map(({ href }) => href.replace('#', ''))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">

        <a href="#hero" className={styles.logo} aria-label="Michael Chiedozie — Home" onClick={closeMenu}>
          <img src={logoImg} alt="Michael Chiedozie Logo" className={styles.logoImage} />
        </a>

        <ul className={styles.navList} role="list">
          {siteConfig.nav.map(({ label, href }, i) => {
            const id = href.replace('#', '');
            return (
              <li key={label}>
                <a
                  href={href}
                  className={`${styles.navLink} ${activeSection === id ? styles.navLinkActive : ''}`}
                >
                  <span className={styles.navNum}>0{i + 1}.</span>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className={styles.actions}>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.resumeBtn}
            aria-label="Open resume PDF"
          >
            <FiDownload size={13} />
            Resume
          </a>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                  style={{ display: 'flex' }}><FiX size={22} /></motion.span>
              ) : (
                <motion.span key="open"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                  style={{ display: 'flex' }}><FiMenu size={22} /></motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            variants={menuVariants}
            initial="hidden" animate="visible" exit="hidden"
            aria-label="Mobile navigation"
          >
            <ul className={styles.mobileNavList} role="list">
              {siteConfig.nav.map(({ label, href }, i) => {
                const id = href.replace('#', '');
                return (
                  <motion.li key={label} variants={linkVariants} initial="hidden" animate="visible" custom={i}>
                    <a
                      href={href}
                      className={`${styles.mobileNavLink} ${activeSection === id ? styles.mobileNavLinkActive : ''}`}
                      onClick={closeMenu}
                    >
                      <span className={styles.mobileNavNum}>0{i + 1}.</span>
                      {label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              variants={linkVariants} initial="hidden" animate="visible"
              custom={siteConfig.nav.length} className={styles.mobileActions}
            >
              <a
                href={siteConfig.resumeUrl} target="_blank" rel="noreferrer"
                className={styles.mobileResumeBtn} onClick={closeMenu}
              >
                <FiDownload size={14} /> Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
