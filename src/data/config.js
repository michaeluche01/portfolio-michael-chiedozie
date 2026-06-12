export const siteConfig = {
  name: 'Michael Uchechukwu',
  shortName: 'Michael',
  title: 'Mobile Engineer · Full-Stack Builder',
  tagline: 'I build mobile products that ship — and the backends that power them.',
  email: 'michaelcee2000@gmail.com',
  location: 'Abuja, Nigeria',
  available: true,

  socials: {
    github:   'https://github.com/michaeluche01',
    linkedin: 'https://linkedin.com/in/michaeluche',
    email:    'mailto:michaelcee2000@gmail.com',
  },

  nav: [
    { label: 'About',   href: '#about'   },
    { label: 'Skills',  href: '#skills'  },
    { label: 'Work',    href: '#work'    },
    { label: 'Contact', href: '#contact' },
  ],

  // import.meta.env.BASE_URL = '/portfolio-michael-chiedozie/' on GitHub Pages
  //                          = '/' on localhost
  // This makes the PDF resolve correctly on BOTH environments automatically.
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
};
