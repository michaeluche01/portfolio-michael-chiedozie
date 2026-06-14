import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiCode, FiBriefcase, FiMail, FiGithub, FiLinkedin,
  FiDownload, FiHash, FiTerminal, FiZap,
} from 'react-icons/fi';
import { siteConfig } from '@data/config';
import styles from './CommandPalette.module.scss';

// ─── Commands ─────────────────────────────────────────────────────────────────
const COMMANDS = [
  // Navigate
  { id: 'nav-about',   group: 'Navigate', label: 'About Me',         Icon: FiUser,       action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-skills',  group: 'Navigate', label: 'Skills',           Icon: FiZap,        action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-work',    group: 'Navigate', label: 'Work & Projects',  Icon: FiBriefcase,  action: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-contact', group: 'Navigate', label: 'Contact',          Icon: FiMail,       action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  // Open
  { id: 'open-github', group: 'Open',     label: 'GitHub Profile',   Icon: FiGithub,     action: () => window.open(siteConfig.socials.github, '_blank', 'noreferrer') },
  { id: 'open-li',     group: 'Open',     label: 'LinkedIn Profile', Icon: FiLinkedin,   action: () => window.open(siteConfig.socials.linkedin, '_blank', 'noreferrer') },
  // Actions
  { id: 'dl-resume',   group: 'Actions',  label: 'Download Resume',  Icon: FiDownload,   action: () => window.open(siteConfig.resumeUrl, '_blank', 'noreferrer') },
  { id: 'copy-email',  group: 'Actions',  label: 'Copy Email',       Icon: FiHash,       action: () => navigator.clipboard?.writeText(siteConfig.email).catch(() => {}) },
  { id: 'view-source', group: 'Actions',  label: 'View Source Code', Icon: FiCode,       action: () => window.open(siteConfig.socials.github, '_blank', 'noreferrer') },
];

// ─── Overlay animation ────────────────────────────────────────────────────────
const overlayAnim = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

const panelAnim = {
  hidden:  { opacity: 0, scale: 0.96, y: -12 },
  visible: { opacity: 1, scale: 1,    y: 0,   transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, scale: 0.97, y: -8,  transition: { duration: 0.15 } },
};

// ─── CommandPalette ───────────────────────────────────────────────────────────
export default function CommandPalette() {
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState('');
  const [active,  setActive]  = useState(0);
  const [copied,  setCopied]  = useState(false);
  const inputRef  = useRef(null);
  const listRef   = useRef(null);

  // ── Open on ⌘K / Ctrl+K ────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Focus input when opened ─────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setCopied(false);
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // ── Filter commands ─────────────────────────────────────────────────────────
  const filtered = COMMANDS.filter((c) =>
    query === '' || c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.group.toLowerCase().includes(query.toLowerCase())
  );

  // Keep active index in bounds when filter changes
  useEffect(() => { setActive(0); }, [query]);

  // ── Keyboard navigation ─────────────────────────────────────────────────────
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === 'Enter' && filtered[active]) {
      e.preventDefault();
      runCommand(filtered[active]);
    }
  }, [filtered, active]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[active];
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const runCommand = (cmd) => {
    setOpen(false);
    if (cmd.id === 'copy-email') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    cmd.action();
  };

  // Group filtered results
  const groups = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  // Flat index tracker for keyboard nav
  let flatIdx = 0;

  return (
    <>
      {/* Trigger hint — bottom right */}
      <button
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        title="Open command palette (⌘K)"
      >
        <FiTerminal size={14} />
        <span className={styles.triggerLabel}>⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            variants={overlayAnim}
            initial="hidden" animate="visible" exit="exit"
            onClick={() => setOpen(false)}
            aria-modal="true"
            role="dialog"
            aria-label="Command palette"
          >
            <motion.div
              className={styles.panel}
              variants={panelAnim}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className={styles.searchRow}>
                <FiTerminal size={15} className={styles.searchIcon} aria-hidden="true" />
                <input
                  ref={inputRef}
                  className={styles.input}
                  placeholder="Type a command or search…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  aria-label="Command search"
                  autoComplete="off"
                  spellCheck="false"
                />
                <kbd className={styles.escKey} onClick={() => setOpen(false)}>esc</kbd>
              </div>

              {/* Results */}
              <div className={styles.results} role="listbox" ref={listRef} aria-label="Commands">
                {filtered.length === 0 ? (
                  <p className={styles.empty}>No commands found for &ldquo;{query}&rdquo;</p>
                ) : (
                  Object.entries(groups).map(([group, cmds]) => (
                    <div key={group} className={styles.group}>
                      <span className={styles.groupLabel}>{group}</span>
                      {cmds.map((cmd) => {
                        const idx = flatIdx++;
                        const isActive = idx === active;
                        return (
                          <button
                            key={cmd.id}
                            className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                            onClick={() => runCommand(cmd)}
                            onMouseEnter={() => setActive(idx)}
                            role="option"
                            aria-selected={isActive}
                          >
                            <span className={styles.itemIcon} aria-hidden="true">
                              <cmd.Icon size={15} />
                            </span>
                            <span className={styles.itemLabel}>
                              {cmd.id === 'copy-email' && copied ? 'Email copied! ✓' : cmd.label}
                            </span>
                            {cmd.id === 'copy-email' && <span className={styles.itemHint}>{siteConfig.email}</span>}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className={styles.footer}>
                <span><kbd>↑↓</kbd> navigate</span>
                <span><kbd>↵</kbd> select</span>
                <span><kbd>esc</kbd> close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
