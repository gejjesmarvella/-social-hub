/**
 * script.js — Gejje's Marvella Social Hub
 * Loads data/socials.json → renders all cards, QR code, share controls.
 * Works on GitHub Pages AND locally (file://) via the embedded fallback.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════════
   FALLBACK DATA
   Mirrors data/socials.json — used when fetch() fails (local file://).
   Keep in sync with your socials.json file!
   ═══════════════════════════════════════════════════════════════════ */
const FALLBACK_DATA = {
  clinicName: "Gejje's Marvella",
  tagline: "Plastic Surgery and Dermatology\nRestore Your Form, Function, Aesthesis & Nurture Your Skin",
  subtitle: "Connect with us online",
  logo: "assets/logo.png",
  meta: {
    title: "Gejje's Marvella — Official Social Hub",
    description: "Connect with Gejje's Marvella across all platforms.",
    canonicalUrl: "https://gejjesmarvella.github.io/-social-hub/",
    ogImage: "assets/og-image.png"
  },
  theme: {
    primary: "#1E6F5C",
    primaryLight: "#2A9D80",
    secondary: "#D4A843",
    bgLight: "#F5F1EC",
    bgDark: "#0D1612"
  },
  links: [
    { id: "instagram", title: "Instagram", icon: "fa-brands fa-instagram", url: "https://instagram.com/gejjesmarvella", description: "Photos, Reels & Stories", color: "#E1306C", gradient: "linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#F77737 100%)" },
    { id: "facebook", title: "Facebook", icon: "fa-brands fa-facebook", url: "https://facebook.com/gejjesmarvella", description: "Updates & Community", color: "#1877F2" },
    { id: "youtube", title: "YouTube", icon: "fa-brands fa-youtube", url: "https://youtube.com/@gejjesmarvella", description: "Procedures & Expert Tips", color: "#FF0000" },
    { id: "linkedin", title: "LinkedIn", icon: "fa-brands fa-linkedin", url: "https://linkedin.com/company/gejjesmarvella", description: "Professional Network", color: "#0A66C2" },
    { id: "twitter", title: "X (Twitter)", icon: "fa-brands fa-x-twitter", url: "https://x.com/gejjesmarvella", description: "News & Announcements", color: "#14171A" },
    { id: "threads", title: "Threads", icon: "fa-brands fa-threads", url: "https://threads.net/@gejjesmarvella", description: "Join the Conversation", color: "#101010" },
    { id: "whatsapp", title: "WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://wa.me/919916249637", description: "Chat with Our Team", color: "#25D366" },
    { id: "google-business", title: "Google Business", icon: "fa-brands fa-google", url: "https://g.page/gejjesmarvella", description: "Reviews & Business Info", color: "#4285F4" },
    { id: "google-maps", title: "Google Maps", icon: "fa-solid fa-map-location-dot", url: "https://maps.google.com/?q=Gejjes+Marvella+Bengaluru", description: "Find Our Clinic", color: "#EA4335" },
    { id: "website", title: "Official Website", icon: "fa-solid fa-globe", url: "https://gejjesmarvella.com", description: "Treatments, Doctors & Appointments", color: "#1E6F5C" },
    { id: "email", title: "Email Us", icon: "fa-solid fa-envelope", url: "mailto:amritahongalleo@gmail.com", description: "Send Us a Message", color: "#EA4335" },
    { id: "phone", title: "Call Us", icon: "fa-solid fa-phone", url: "tel:+919916249637", description: "Speak to Our Team", color: "#1E6F5C" }
  ],
  contacts: [
    { id: "call", title: "Call Now", icon: "fa-solid fa-phone", url: "tel:+919916249637", color: "#1E6F5C", primary: true },
    { id: "whatsapp-cta", title: "WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://wa.me/919916249637", color: "#25D366", primary: true },
    { id: "email-cta", title: "Email", icon: "fa-solid fa-envelope", url: "mailto:gejjesmarvella@gmail.com", color: "#EA4335", primary: false },
    { id: "directions-cta", title: "Directions", icon: "fa-solid fa-map-location-dot", url: "https://maps.google.com/?q=Gejjes+Marvella+Bengaluru", color: "#4285F4", primary: false },
    { id: "book", title: "Book Appointment", icon: "fa-solid fa-calendar-check", url: "tel:+919916249637", color: "#D4A843", primary: false }
  ]
};


/* ═══════════════════════════════════════════════════════════════════
   DATA LOADING
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Fetch data/socials.json with a fallback to embedded FALLBACK_DATA.
 * @returns {Promise<object>} Parsed data object.
 */
async function loadData() {
  try {
    const response = await fetch('data/socials.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn('[SocialHub] fetch() failed — using embedded fallback data.', err.message);
    return FALLBACK_DATA;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   RENDERING — HERO
   ═══════════════════════════════════════════════════════════════════ */

/** Populate the hero section (logo, name, tagline). */
function renderHero(data) {
  // Clinic name
  const nameEl = document.getElementById('clinic-name');
  if (nameEl) nameEl.textContent = data.clinicName;

  // Tagline
  const taglineEl = document.getElementById('clinic-tagline');
  if (taglineEl) taglineEl.textContent = data.tagline;

  // Subtitle (the "Connect with us online" line)
  const subtitleEl = document.querySelector('#clinic-subtitle span');
  if (subtitleEl) subtitleEl.textContent = data.subtitle || 'Connect with us online';

  // Logo
  const logoEl = document.getElementById('clinic-logo');
  if (logoEl && data.logo) {
    logoEl.src = data.logo;
    logoEl.alt = `${data.clinicName} — ${data.tagline}`;
  }



  // Update page meta from JSON (nice if canonical URL is customised)
  if (data.meta) {
    if (data.meta.title) document.title = data.meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl && data.meta.description) descEl.setAttribute('content', data.meta.description);
  }

  // Footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════════════════════════
   RENDERING — SOCIAL LINK CARDS
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Build one social link card element.
 * @param {object} link  — item from data.links[]
 * @param {number} index — position for stagger delay
 * @returns {HTMLElement}
 */
function buildLinkCard(link, index) {
  const a = document.createElement('a');
  if (link.url) {
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  } else {
    a.href = '#';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(`We will be on ${link.title} soon! 🚀`);
    });
  }
  a.className = 'link-card';
  a.role = 'listitem';
  a.setAttribute('aria-label', `${link.title}${link.description ? ' — ' + link.description : ''} (opens in new tab)`);
  a.id = `link-${link.id}`;

  // Store glow color for hover
  a.style.setProperty('--card-accent', link.color || 'var(--clr-primary)');
  a.style.setProperty('--card-accent-alpha', hexToRgba(link.color || '#1E6F5C', 0.15));

  // Icon box
  const iconBox = document.createElement('div');
  iconBox.className = 'card-icon-box';
  iconBox.setAttribute('aria-hidden', 'true');

  // Load official colored SVG brand logo if available
  const svgMarkup = getBrandLogoSVG(link.id);
  if (svgMarkup) {
    iconBox.innerHTML = svgMarkup;
  } else {
    // Fallback to Font Awesome
    iconBox.style.background = link.gradient || link.color || 'var(--clr-primary)';
    iconBox.style.color = '#fff';
    const icon = document.createElement('i');
    icon.className = link.icon;
    iconBox.appendChild(icon);
  }

  // Content
  const content = document.createElement('div');
  content.className = 'card-content';

  const title = document.createElement('span');
  title.className = 'card-title';
  title.textContent = link.title;
  content.appendChild(title);

  if (link.description) {
    const desc = document.createElement('span');
    desc.className = 'card-desc';
    desc.textContent = link.description;
    content.appendChild(desc);
  }

  // Arrow
  const arrow = document.createElement('i');
  arrow.className = 'fa-solid fa-chevron-right card-arrow';
  arrow.setAttribute('aria-hidden', 'true');

  a.appendChild(iconBox);
  a.appendChild(content);
  a.appendChild(arrow);

  // Stagger entrance animation
  a.style.transitionDelay = `${index * 45}ms`;
  setTimeout(() => a.classList.add('visible'), 20 + index * 45);

  // Ripple on click
  a.addEventListener('click', (e) => createRipple(e, a));
  a.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') createRipple(e, a);
  });

  return a;
}

/** Render all social link cards into #links-grid. */
function renderLinks(data) {
  const grid = document.getElementById('links-grid');
  if (!grid || !Array.isArray(data.links)) return;

  data.links.forEach((link, i) => {
    grid.appendChild(buildLinkCard(link, i));
  });
}

/* ═══════════════════════════════════════════════════════════════════
   RENDERING — CONTACT BUTTONS
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Build one contact button element.
 * @param {object} contact — item from data.contacts[]
 * @param {number} index   — position for stagger delay
 * @returns {HTMLElement}
 */
function buildContactBtn(contact, index) {
  const a = document.createElement('a');
  a.href = contact.url;
  a.className = 'contact-btn' + (contact.primary ? ' primary' : '');
  a.role = 'listitem';
  a.id = `contact-${contact.id}`;
  a.setAttribute('aria-label', contact.title);

  // Determine if it opens in new tab (not tel:, mailto:)
  if (!contact.url.startsWith('tel:') && !contact.url.startsWith('mailto:')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  // Set CSS variables for Apple Liquid Glass custom border/glow colors
  a.style.setProperty('--btn-accent', contact.color);
  a.style.setProperty('--btn-accent-glow', hexToRgba(contact.color, 0.45));

  const icon = document.createElement('i');
  icon.className = contact.icon;
  icon.setAttribute('aria-hidden', 'true');

  const label = document.createElement('span');
  label.textContent = contact.title;

  a.appendChild(icon);
  a.appendChild(label);

  // Ripple
  a.addEventListener('click', (e) => createRipple(e, a));

  // Stagger
  const delay = 20 + index * 60;
  a.style.transitionDelay = `${delay}ms`;
  setTimeout(() => a.classList.add('visible'), delay);

  return a;
}

/** Render all contact buttons into #contacts-strip. */
function renderContacts(data) {
  const strip = document.getElementById('contacts-strip');
  if (!strip || !Array.isArray(data.contacts)) return;

  data.contacts.forEach((contact, i) => {
    strip.appendChild(buildContactBtn(contact, i));
  });
}

/* ═══════════════════════════════════════════════════════════════════
   QR CODE
   ═══════════════════════════════════════════════════════════════════ */

/** Generate and display the QR code for the hub URL. */
function renderQRCode(url) {
  const container = document.getElementById('qr-code');
  if (!container) return;

  container.innerHTML = ''; // clear any previous

  // Display the URL below the QR
  const urlDisplay = document.getElementById('qr-url-display');
  if (urlDisplay) urlDisplay.textContent = url;

  // Use qrcodejs if available, otherwise show image from free API
  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(container, {
        text: url,
        width: 220,
        height: 220,
        colorDark: '#1E6F5C',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
    } catch (e) {
      console.warn('[QR] qrcodejs failed, falling back to API image.', e);
      renderQRFallback(container, url);
    }
  } else {
    renderQRFallback(container, url);
  }
}

/** Fallback: load QR as <img> from a free public API. */
function renderQRFallback(container, url) {
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&color=1E6F5C&ecc=H`;
  img.alt = 'QR Code';
  img.width = 220;
  img.height = 220;
  img.setAttribute('crossorigin', 'anonymous');
  container.appendChild(img);
}

/* ── QR Download ─────────────────────────────────────────────────── */

/** Download the QR code as a PNG file. */
function downloadQR() {
  // Try canvas first (qrcodejs renders to canvas)
  const canvas = document.querySelector('#qr-code canvas');
  if (canvas) {
    try {
      const link = document.createElement('a');
      link.download = 'gejjes-marvella-qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('QR code downloaded!');
      return;
    } catch (e) {
      console.warn('[QR] Canvas export failed, trying img fallback.', e);
    }
  }

  // Fallback: download the img src
  const img = document.querySelector('#qr-code img');
  if (img) {
    const link = document.createElement('a');
    link.download = 'gejjes-marvella-qr-code.png';
    link.href = img.src;
    link.target = '_blank';
    link.click();
    showToast('QR code downloaded!');
    return;
  }

  showToast('QR code not ready yet.');
}

/* ── Share / Copy ────────────────────────────────────────────────── */

/**
 * Display custom social share options.
 * @param {string} url
 * @param {string} title
 */
function shareHub(url, title) {
  const shareOpts = document.getElementById('custom-share-options');
  if (!shareOpts) {
    copyToClipboard(url);
    return;
  }

  if (shareOpts.style.display === 'none' || shareOpts.style.display === '') {
    shareOpts.style.display = 'block';

    const encTitle = encodeURIComponent(title || "Gejje's Marvella — Social Hub");
    const liveLink = "https://gejjesmarvella.github.io/-social-hub/";
    const encUrl = encodeURIComponent(liveLink);
    const encText = encodeURIComponent("Connect with Gejje's Marvella Dermatology & Plastic Surgery Clinic!");

    document.getElementById('share-wa').href = `https://wa.me/?text=${encText}%20${encUrl}`;
    document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`;
    document.getElementById('share-tw').href = `https://twitter.com/intent/tweet?url=${encUrl}&text=${encText}`;
    document.getElementById('share-li').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`;
    document.getElementById('share-email').href = `mailto:?subject=${encTitle}&body=${encText}%20${encUrl}`;
  } else {
    shareOpts.style.display = 'none';
  }
}

/** Copy text to clipboard with toast feedback. */
async function copyToClipboard() {
  const liveLink = "https://gejjesmarvella.github.io/-social-hub/";
  try {
    await navigator.clipboard.writeText(liveLink);
    showToast('Link copied to clipboard! 🎉');
  } catch (err) {
    // Fallback for browsers without clipboard API
    const ta = document.createElement('textarea');
    ta.value = liveLink;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('Link copied!');
  }
}

/* ═══════════════════════════════════════════════════════════════════
   RIPPLE EFFECT
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Get the official SVG brand logo markup.
 * @param {string} id - Brand ID.
 * @returns {string|null} SVG markup string or null.
 */
function getBrandLogoSVG(id) {
  const logos = {
    instagram: `<svg viewBox="0 0 24 24" width="24" height="24"><defs><radialGradient id="ig-grad" cx="30%" cy="107%" r="130%"><stop offset="0%" stop-color="#fdf497"/><stop offset="5%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)"/><rect x="5.3" y="5.3" width="13.4" height="13.4" rx="3.6" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="#fff"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#FF0000"><path d="M23.498 6.163c-.272-1.022-1.074-1.826-2.099-2.099C19.544 3.5 12 3.5 12 3.5s-7.544 0-9.4.564c-1.025.273-1.827 1.077-2.1 2.099C0 8.028 0 12 0 12s0 3.972.5 5.837c.272 1.022 1.074 1.826 2.099 2.099C5.456 20.5 12 20.5 12 20.5s7.544 0 9.4-.564c1.025-.273 1.827-1.077 2.1-2.099.5-1.865.5-5.837.5-5.837s0-3.972-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.764v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    threads: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16.53 11.23c-.15-2.02-1.63-3.67-3.7-3.67-2.3 0-3.9 1.83-3.9 4.31 0 2.44 1.58 4.29 3.86 4.29 1.2 0 2.22-.52 2.8-1.42l1.6 1.03c-.93 1.34-2.5 2.22-4.4 2.22-3.4 0-5.86-2.58-5.86-6.12S9.4 5.75 12.83 5.75c2.94 0 4.96 1.85 5.25 4.54h-1.55zm-3.7 2.47c1.38 0 2.37-.95 2.45-2.47H10.4c.1 1.44 1.05 2.47 2.43 2.47z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.455 4.882 1.456 5.176 0 9.387-4.207 9.39-9.385.002-2.507-.975-4.865-2.754-6.643C16.386 2.804 14.032 1.827 11.53 1.827c-5.183 0-9.397 4.212-9.399 9.391 0 1.77.472 3.498 1.368 5.01L2.49 20.875l4.157-1.721zm10.964-6.13c-.304-.153-1.8-.886-2.077-.988-.278-.102-.48-.153-.68.153-.2.306-.777.988-.953 1.193-.177.205-.353.23-.657.078-1.023-.515-1.802-.937-2.52-1.764-.473-.51-.109-.502.309-1.332.06-.12.03-.226-.015-.316-.045-.09-.4-.967-.548-1.327-.144-.347-.29-.299-.4-.305l-.341-.005c-.12 0-.316.045-.481.225-.165.18-.631.616-.631 1.503 0 .887.646 1.744.736 1.865.09.12 1.272 1.942 3.081 2.723 1.093.473 1.815.659 2.457.761.643.102 1.229.073 1.692-.007.514-.078 1.8-.736 2.057-1.448.257-.712.257-1.322.18-1.448-.077-.126-.278-.228-.582-.38z"/></svg>`,
    'google-business': `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`,
    'google-maps': `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335"/><path d="M12 2c3.87 0 7 3.13 7 7 0 2.25-1.5 5-3.5 7.5L12 20.5l-3.5-4c-2-2.5-3.5-5.25-3.5-7.5 0-3.87 3.13-7 7-7z" fill="#4285F4" opacity="0.1"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#229ED9"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.58.15-.15 2.72-2.5 2.77-2.72.01-.03.01-.14-.05-.2-.06-.06-.15-.04-.22-.02-.09.02-1.61 1.02-4.54 3c-.43.3-.82.44-1.17.43-.39-.01-1.15-.22-1.71-.4-.69-.23-1.24-.35-1.19-.74.03-.2.3-.41.82-.62 3.2-1.39 5.34-2.31 6.42-2.76 3.06-1.27 3.69-1.49 4.11-1.5.09 0 .3.02.43.13.11.09.14.22.15.31.01.07.02.22.01.29z"/></svg>`,
    pinterest: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#E60023"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.437.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.907 2.167-2.907 1.02 0 1.513.769 1.513 1.689 0 1.029-.656 2.568-.994 3.995-.28 1.19.599 2.161 1.776 2.161 2.133 0 3.77-2.249 3.77-5.499 0-2.873-2.064-4.882-5.007-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.1.119.112.224.083.345l-.333 1.36c-.053.22-.172.269-.399.163-1.495-.694-2.43-2.872-2.43-4.62 0-3.763 2.737-7.22 7.881-7.22 4.137 0 7.35 2.948 7.35 6.886 0 4.112-2.591 7.42-6.19 7.42-1.207 0-2.344-.627-2.731-1.366l-.747 2.846c-.27 1.029-1.002 2.32-1.493 3.12 1.12.347 2.308.537 3.541.537 6.62 0 11.987-5.367 11.987-11.987C24 5.367 18.63 0 12.017 0z"/></svg>`,
    website: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#1E6F5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    email: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#EA4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    phone: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#1E6F5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    'custom-link': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#D4A843" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
  };
  return logos[id] || null;
}

/**
 * Create a ripple element at the pointer's position within the target.
 * @param {Event}       event  — click/keyboard event
 * @param {HTMLElement} target — element to attach ripple to
 */
function createRipple(event, target) {
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (event.clientX ? event.clientX - rect.left : rect.width / 2) - size / 2;
  const y = (event.clientY ? event.clientY - rect.top : rect.height / 2) - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `
    width:  ${size}px;
    height: ${size}px;
    left:   ${x}px;
    top:    ${y}px;
  `;

  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

/* ═══════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════════════════ */

let toastTimer = null;

/**
 * Show a temporary toast message at the bottom of the screen.
 * @param {string} message
 * @param {number} [duration=2500]
 */
function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');

  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ═══════════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Convert a hex color string to rgba().
 * @param {string} hex   — e.g. "#1E6F5C"
 * @param {number} alpha — 0–1
 * @returns {string}
 */
function hexToRgba(hex, alpha) {
  if (!hex || !hex.startsWith('#')) return `rgba(30,111,92,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ═══════════════════════════════════════════════════════════════════
   INITIALISATION
   ═══════════════════════════════════════════════════════════════════ */

/** Wire up all event listeners and kick off render. */
async function init() {


  /* ── Load data ─────────────────────────────────────────────────── */
  let data;
  try {
    data = await loadData();
  } catch (e) {
    data = FALLBACK_DATA;
  }

  /* ── Render all sections ───────────────────────────────────────── */
  renderHero(data);
  renderLinks(data);
  renderContacts(data);

  /* ── QR Code & Share URL ───────────────────────────────────────── */
  // Use the canonical URL from socials.json so that the QR and share links always point to the live GitHub site, even when testing locally.
  const hubUrl = (data.meta && data.meta.canonicalUrl) ? data.meta.canonicalUrl : window.location.href;

  renderQRCode(hubUrl);

  /* ── QR action buttons ─────────────────────────────────────────── */
  const shareBtn = document.getElementById('share-btn');
  const downloadBtn = document.getElementById('download-qr-btn');
  const copyBtn = document.getElementById('copy-link-btn');

  if (shareBtn) {
    shareBtn.addEventListener('click', () =>
      shareHub(hubUrl, data.meta && data.meta.title)
    );
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadQR);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyToClipboard(hubUrl));
  }

  /* ── Maps Branch Selector ──────────────────────────────────────── */
  const mapsModal = document.getElementById('maps-modal');
  const mapsModalCancel = document.getElementById('maps-modal-cancel');

  function openMapsModal(e) {
    e.preventDefault();
    if (mapsModal) mapsModal.style.display = 'flex';
  }

  function closeMapsModal() {
    if (mapsModal) mapsModal.style.display = 'none';
  }

  if (mapsModalCancel) mapsModalCancel.addEventListener('click', closeMapsModal);

  const mapLink1 = document.getElementById('link-google-maps');
  if (mapLink1) mapLink1.addEventListener('click', openMapsModal);

  const mapLink2 = document.getElementById('contact-directions-cta');
  if (mapLink2) mapLink2.addEventListener('click', openMapsModal);

  /* ── Call Branch Selector ──────────────────────────────────────── */
  const callModal = document.getElementById('call-modal');
  const callModalCancel = document.getElementById('call-modal-cancel');

  function openCallModal(e) {
    e.preventDefault();
    if (callModal) callModal.style.display = 'flex';
  }

  function closeCallModal() {
    if (callModal) callModal.style.display = 'none';
  }

  if (callModalCancel) callModalCancel.addEventListener('click', closeCallModal);

  const callLink = document.getElementById('link-phone');
  if (callLink) callLink.addEventListener('click', openCallModal);

  const callContact = document.getElementById('contact-call');
  if (callContact) callContact.addEventListener('click', openCallModal);

  const bookContact = document.getElementById('contact-book');
  if (bookContact) bookContact.addEventListener('click', openCallModal);

  /* ── Google Business Selector ────────────────────────────────────── */
  const businessModal = document.getElementById('business-modal');
  const businessModalCancel = document.getElementById('business-modal-cancel');

  function openBusinessModal(e) {
    e.preventDefault();
    if (businessModal) businessModal.style.display = 'flex';
  }

  function closeBusinessModal() {
    if (businessModal) businessModal.style.display = 'none';
  }

  if (businessModalCancel) businessModalCancel.addEventListener('click', closeBusinessModal);

  const businessLink = document.getElementById('link-google-business');
  if (businessLink) businessLink.addEventListener('click', openBusinessModal);

  /* ── Show app, hide skeleton ───────────────────────────────────── */
  const skeleton = document.getElementById('loading-skeleton');
  const app = document.getElementById('app');

  if (skeleton) {
    skeleton.style.opacity = '0';
    skeleton.style.transition = 'opacity 0.3s ease';
    setTimeout(() => skeleton.remove(), 350);
  }

  if (app) {
    app.removeAttribute('hidden');
    app.style.opacity = '0';
    app.style.transition = 'opacity 0.35s ease';
    // Trigger reflow
    void app.offsetWidth;
    app.style.opacity = '1';
  }

  /* ── Footer year ───────────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* Start when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
