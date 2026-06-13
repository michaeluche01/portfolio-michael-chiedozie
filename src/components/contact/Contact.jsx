import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { siteConfig } from '@data/config';
import styles from './Contact.module.scss';

// ─── Animation ────────────────────────────────────────────────────────────────
const FADE_UP = {
  hidden:  { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

// ─── Contact links ────────────────────────────────────────────────────────────
const LINKS = [
  {
    Icon: FiMail,
    label: 'Email',
    value: 'michaelcee2000@gmail.com',
    href: 'mailto:michaelcee2000@gmail.com',
  },
  {
    Icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/michaeluche',
    href: 'https://linkedin.com/in/michaeluche',
  },
  {
    Icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/michaeluche01',
    href: 'https://github.com/michaeluche01',
  },
  {
    Icon: FiMapPin,
    label: 'Location',
    value: 'Abuja, Nigeria',
    href: null,
  },
];

// ─── Form state machine ───────────────────────────────────────────────────────
// idle → sending → success | error
const INITIAL = { name: '', email: '', message: '' };

// ─── Contact ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const headerRef  = useRef(null);
  const headerView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const contentRef = useRef(null);
  const contentView = useInView(contentRef, { once: true, margin: '0px 0px -60px 0px' });

  const [fields,  setFields]  = useState(INITIAL);
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error
  const [touched, setTouched] = useState({});

  const errors = {
    name:    !fields.name.trim()                     ? 'Name is required'            : '',
    email:   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ? 'Valid email is required' : '',
    message: fields.message.trim().length < 10       ? 'Message must be 10+ characters' : '',
  };
  const isValid = !errors.name && !errors.email && !errors.message;

  const handleChange = (e) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields touched so errors show
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setStatus('sending');
    try {
      // Using Formspree — replace YOUR_FORM_ID with your actual Formspree form ID.
      // Sign up free at https://formspree.io → New Form → copy the ID.
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    fields.name,
          email:   fields.email,
          message: fields.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFields(INITIAL);
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>

        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          custom={0}
          variants={FADE_UP}
          initial="hidden"
          animate={headerView ? 'visible' : 'hidden'}
        >
          <span className={styles.sectionLabel}>04. contact</span>
          <h2 id="contact-heading" className={styles.sectionHeading}>
            Get In Touch
          </h2>
          <p className={styles.intro}>
            I&apos;m currently open to new opportunities — senior mobile and full-stack
            roles, interesting freelance projects, or just a conversation about what
            you&apos;re building. My inbox is always open.
          </p>
        </motion.div>

        {/* ── Two-column grid ─────────────────────────── */}
        <div ref={contentRef} className={styles.grid}>

          {/* ── Left: contact links ─────────────────── */}
          <motion.div
            className={styles.linksCol}
            custom={0}
            variants={FADE_UP}
            initial="hidden"
            animate={contentView ? 'visible' : 'hidden'}
          >
            <ul className={styles.linkList} aria-label="Contact options">
              {LINKS.map(({ Icon, label, value, href }, i) => (
                <motion.li
                  key={label}
                  className={styles.linkItem}
                  custom={i * 0.08}
                  variants={FADE_UP}
                  initial="hidden"
                  animate={contentView ? 'visible' : 'hidden'}
                >
                  <span className={styles.linkIcon} aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <div className={styles.linkBody}>
                    <span className={styles.linkLabel}>{label}</span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noreferrer"
                        className={styles.linkValue}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className={styles.linkValue}>{value}</span>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Availability callout */}
            <div className={styles.availCard}>
              <span className={styles.availDot} aria-hidden="true" />
              <div>
                <p className={styles.availTitle}>Available for work</p>
                <p className={styles.availSub}>
                  Open to remote roles, relocation, and contract projects
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: contact form ──────────────────── */}
          <motion.div
            className={styles.formCol}
            custom={0.12}
            variants={FADE_UP}
            initial="hidden"
            animate={contentView ? 'visible' : 'hidden'}
          >
            {status === 'success' ? (
              <div className={styles.successState} role="status">
                <span className={styles.successIcon} aria-hidden="true">✓</span>
                <p className={styles.successTitle}>Message sent!</p>
                <p className={styles.successSub}>
                  Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                aria-label="Contact form"
              >
                {/* Name */}
                <div className={`${styles.field} ${showError('name') ? styles.fieldError : ''}`}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                    placeholder="Your name"
                    aria-describedby={showError('name') ? 'name-error' : undefined}
                    aria-invalid={!!showError('name')}
                  />
                  {showError('name') && (
                    <span id="name-error" className={styles.errorMsg} role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className={`${styles.field} ${showError('email') ? styles.fieldError : ''}`}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                    placeholder="you@example.com"
                    aria-describedby={showError('email') ? 'email-error' : undefined}
                    aria-invalid={!!showError('email')}
                  />
                  {showError('email') && (
                    <span id="email-error" className={styles.errorMsg} role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className={`${styles.field} ${showError('message') ? styles.fieldError : ''}`}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={fields.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell me about the role or project..."
                    aria-describedby={showError('message') ? 'message-error' : undefined}
                    aria-invalid={!!showError('message')}
                  />
                  {showError('message') && (
                    <span id="message-error" className={styles.errorMsg} role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div className={styles.errorBanner} role="alert">
                    Something went wrong. Try emailing me directly at{' '}
                    <a href="mailto:michaelcee2000@gmail.com">michaelcee2000@gmail.com</a>
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
} 
