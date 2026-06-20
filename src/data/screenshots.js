// ─────────────────────────────────────────────────────────────────────────────
// PROJECT SCREENSHOTS
// ─────────────────────────────────────────────────────────────────────────────
// 1. Drop your images into src/assets/screenshots/
// 2. Import them below
// 3. Add them to the correct project array with a caption + technical note
//
// Each entry shape:
// {
//   img:       <imported image>,
//   caption:   'Short screen name — shown in the modal header',
//   technical: 'What this screen demonstrates technically — be specific',
// }
//
// Leave an array empty [] if you have no screenshots yet for that project.
// The "View Screenshots" hover overlay only appears when the array has items.
// ─────────────────────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────────────────────
// Example:
// import mehticpayHome    from '@assets/screenshots/mehticpay_home.jpg';
// import mehticpayWallet  from '@assets/screenshots/mehticpay_wallet.jpg';
// import throveDashboard  from '@assets/screenshots/throve_dashboard.jpg';

import mehticpayHome from '@assets/screenshots/mehticpayHome.png'
import mehticpayProfile from '@assets/screenshots/mehticpayProfile.png'


// ── Screenshot data ───────────────────────────────────────────────────────────
export const projectScreenshots = {

  mehticpay: [
    {
      img: mehticpayHome,
      caption: 'Home — Wallet Overview',
      technical:
        'Real-time balance updates driven by Firebase Realtime Database streams. ' +
        'Biometric auth gates access with encrypted local token storage, and Riverpod ' +
        'manages state across the full session lifecycle with clean architecture ' +
        'separation between presentation, domain, and data layers.',
    },
    {
      img: mehticpayProfile,
      caption: 'Profile Overview',
      technical:
        'Profile screen containing account information & contact information ' +
        'User profile image is adjusted via the profile screen ' ,
    },
  ],

  throve: [
    // {
    //   img: throveDashboard,
    //   caption: 'Inventory Dashboard',
    //   technical:
    //     'Multi-tenant dashboard where every query is automatically scoped to the ' +
    //     'requesting tenant at the SQLAlchemy ORM layer — cross-tenant data leakage ' +
    //     'is structurally impossible. Stats cards pull live aggregates and the ' +
    //     '"operations stable" indicator reflects the fraud engine finding no anomalies.',
    // },
  ],

  yulii: [
    // {
    //   img: yuliiHome,
    //   caption: 'Task Board',
    //   technical:
    //     'Real-time task collaboration with PostgreSQL-backed REST APIs. ' +
    //     'Custom reward engine tracks points per completed task and syncs ' +
    //     'across iOS and Android sessions in real time via WebSocket.',
    // },
  ],

};
