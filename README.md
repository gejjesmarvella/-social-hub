# Gejje's Marvella — Official Social Hub

> A premium, mobile-first static social link page for **Gejje's Marvella Dermatology & Plastic Surgery Clinic**.  
> Deployable on **GitHub Pages** with zero backend, zero build tools, zero dependencies beyond CDN links.

---

## 🔗 Live Site

```
https://gejjesmarvella.github.io/social-hub/
```

---

## 📁 Project Structure

```
Social hub/
├── index.html          ← Page shell (SEO meta, structure)
├── style.css           ← Full design system (light/dark mode, animations)
├── script.js           ← Loads JSON → renders all cards & QR code
├── assets/
│   ├── logo.png        ← Clinic logo (replace with updated version anytime)
│   ├── logo-transparent.png  ← Logo without background
│   └── og-image.png    ← Open Graph / social share banner (1200×630)
├── data/
│   └── socials.json    ← ⭐ ALL editable content lives here
└── README.md
```

---

## 🚀 Deploy on GitHub Pages

### Step 1 — Create a GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `social-hub` (or any name you prefer)
3. Set it to **Public**
4. Do NOT initialise with README (you already have one)

### Step 2 — Upload your files
**Option A — GitHub web interface (easiest)**
1. Open your repository on GitHub
2. Click **Add file → Upload files**
3. Drag and drop all files maintaining the folder structure:
   - `index.html`, `style.css`, `script.js`, `README.md`
   - `assets/` folder (with logo.png, og-image.png)
   - `data/` folder (with socials.json)
4. Click **Commit changes**

**Option B — Git command line**
```bash
git init
git add .
git commit -m "Initial Social Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/social-hub.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository → **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select `Deploy from a branch`
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/social-hub/
```
(Takes ~2 minutes for the first deployment)

---

## ✏️ How to Edit Content

### Update social media links / add new platforms

Open **`data/socials.json`** — everything is here.

To add a new platform, add an object to the `links` array:
```json
{
  "id": "snapchat",
  "title": "Snapchat",
  "icon": "fa-brands fa-snapchat",
  "url": "https://snapchat.com/add/gejjesmarvella",
  "description": "Behind the Scenes",
  "color": "#FFFC00"
}
```

To **remove** a platform, delete its object from the array.  
**No HTML changes needed — ever.**

### Replace the logo

1. Replace `assets/logo.png` with your new logo file
2. Keep the filename `logo.png` (or update `"logo"` in `socials.json`)
3. Recommended size: **512×512px** or larger, PNG format

### Change your real phone number & URLs

Search for `9XXXXXXXXX` in `socials.json` and replace with your real number.  
Update all `"url"` values with your actual social media profile URLs.

---

## 🎨 How to Change Colors

Open **`data/socials.json`** and edit the `theme` object:
```json
"theme": {
  "primary":      "#1E6F5C",   ← Main green (buttons, accents)
  "primaryLight": "#2A9D80",   ← Lighter shade for hover
  "secondary":    "#D4A843",   ← Gold accent
  "bgLight":      "#F5F1EC",   ← Light mode background
  "bgDark":       "#0D1612"    ← Dark mode background
}
```

For deeper CSS changes, edit **`style.css`** → look for the `:root { }` block at the top.

---

## 📱 Update the QR Code URL

1. Open `data/socials.json`
2. Update `meta.canonicalUrl` to your real GitHub Pages URL:
```json
"meta": {
  "canonicalUrl": "https://YOUR_USERNAME.github.io/social-hub/"
}
```
3. The QR code is **generated in the browser** from this URL — it updates automatically.  
4. After updating, click **"Download QR"** on the page to get the new PNG.

---

## 🔍 SEO Configuration

All SEO fields are in `data/socials.json` under `meta`:
```json
"meta": {
  "title":        "Page title shown in browser tabs and search results",
  "description":  "Shown in Google search snippets",
  "canonicalUrl": "Your full live URL",
  "ogImage":      "assets/og-image.png"
}
```

The `index.html` also contains a **JSON-LD Organization schema** block — update the URLs there to match your live domain.

---

## 🌙 Dark Mode

Dark mode works automatically:
- Detects the visitor's OS preference
- Manual toggle button (top-right corner of the page)
- Preference is remembered via `localStorage`

---

## ♿ Accessibility

- Full keyboard navigation
- ARIA labels on all interactive elements
- Visible focus rings
- Screen reader support (`role`, `aria-label`, `aria-live`)
- Reduced-motion support for vestibular disorders

---

## ⚡ Performance Tips

- All images use `loading="lazy"` (except the hero logo which is `eager`)
- Font Awesome and Google Fonts are loaded from fast CDNs
- No JavaScript frameworks — pure vanilla JS (~8KB)
- CSS is ~12KB — no utility framework bloat
- Lighthouse score target: **95+**

---

## 🩺 Clinic Information

**Gejje's Marvella**  
Dermatology & Plastic Surgery Clinic, Bengaluru, Karnataka

**Doctors**
- Dr. Somashekar Gejje — Plastic, Reconstructive & Aesthetic Surgeon  
- Dr. Amrita A. Hongal — Clinical & Aesthetic Dermatologist

---

## 📄 License

Private — All rights reserved © Gejje's Marvella
