import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { siteConfig } from '@data/config';
import styles from './Footer.module.scss';

const SOCIALS = [
  { Icon: FiGithub,   href: siteConfig.socials.github,   label: 'GitHub'   },
  { Icon: FiLinkedin, href: siteConfig.socials.linkedin,  label: 'LinkedIn' },
  { Icon: FiMail,     href: siteConfig.socials.email,     label: 'Email'    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>

        {/* Tagline */}
        <p className={styles.tagline}>
          Designed &amp; built by{' '}
          <a href="#hero" className={styles.nameLink}>Michael Chiedozie</a>
        </p>

        {/* Social icons */}
        <ul className={styles.socials} aria-label="Social links">
          {SOCIALS.map(({ Icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className={styles.copy}>
          &copy; {year} Michael Uchechukwu Chiedozie. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
