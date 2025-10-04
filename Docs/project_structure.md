# Project Structure Documentation

## Root Directory Structure

```
lumenosis-landing/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main landing page (CRITICAL)
│   │   ├── layout.tsx                  # Global layout & SEO (CRITICAL)
│   │   ├── globals.css                 # Global styles (CRITICAL)
│   │   └── blog/
│   │       └── ai-automation-real-estate-guide/
│   │           └── page.tsx            # Blog post page
│   ├── components/
│   │   └── README.md                   # Component documentation
│   └── lib/
│       └── README.md                   # Utility functions
├── public/                             # Static assets (CRITICAL)
│   ├── images/
│   │   ├── logo.png                    # Main logo
│   │   ├── logo-footer.png             # Footer logo
│   │   └── Lumenosis AI transparent logo.png
│   ├── videos/
│   │   └── demos/                      # Demo videos for website
│   ├── documents/
│   │   └── README.md                   # Document assets
│   ├── robots.txt                      # SEO crawling rules
│   └── sitemap.xml                     # SEO sitemap
├── Docs/                               # Project documentation
│   ├── Implementation.md               # Main implementation plan
│   ├── UI_UX_doc.md                   # Design system documentation
│   ├── project_structure.md           # This file
│   └── Bug_tracking.md                # Error documentation (to be created)
├── legacy/                             # Reference materials (KEEP)
│   └── README.md                       # Legacy documentation
├── node_modules/                       # Dependencies (auto-generated)
├── .next/                             # Build output (auto-generated)
├── out/                               # Static export (auto-generated)
├── package.json                        # Dependencies & scripts (CRITICAL)
├── package-lock.json                   # Dependency lock file
├── next.config.js                      # Next.js configuration (CRITICAL)
├── tailwind.config.js                  # Tailwind CSS config (CRITICAL)
├── tsconfig.json                       # TypeScript config (CRITICAL)
├── postcss.config.js                   # PostCSS configuration
├── PROJECT-PRD.md                      # Project requirements (REFERENCE)
├── README.md                           # Main project documentation
└── index.html                          # Original HTML reference (KEEP)
```

## Detailed File Organization

### `/src/app/` - Next.js App Router Structure
**Purpose:** Core application pages and layouts
**Convention:** File-based routing system

#### Critical Files:
- `page.tsx` - Main landing page component
- `layout.tsx` - Global layout with SEO metadata
- `globals.css` - Tailwind CSS imports and global styles

#### Blog Structure:
- `blog/[slug]/page.tsx` - Dynamic blog post pages
- Each blog post in its own directory following Next.js conventions

### `/public/` - Static Assets
**Purpose:** Publicly accessible files served directly by Next.js
**Organization:** Categorized by asset type

#### Image Assets:
```
public/images/
├── logo.png                    # Primary brand logo
├── logo-footer.png             # Footer variant
├── logo-transparent.png        # Transparent background version
└── Lumenosis AI transparent logo.png  # Brand variant
```

#### Video Assets:
```
public/videos/
└── demos/
    ├── ai voice demo veed to capcut.mp4
    ├── Automating_real_estate_agent_inquiries_AI_DEMO_compressed.mp4
    ├── Qualify Real Estate Leads via SMS with GPT-4o, Twilio, and Google Sheets + Retell short demo.mp4
    └── Real Esate Video Automation Demo.mp4
```

#### SEO Assets:
- `robots.txt` - Search engine crawling instructions
- `sitemap.xml` - Site structure for search engines

### `/Docs/` - Project Documentation
**Purpose:** Comprehensive project documentation following workspace rules
**Organization:** Categorized by documentation type

#### Documentation Files:
- `Implementation.md` - Main task tracking and implementation plan
- `UI_UX_doc.md` - Design system and user experience guidelines
- `project_structure.md` - This file, explaining project organization
- `Bug_tracking.md` - Error documentation and resolution tracking (to be created)

### Configuration Files

#### Next.js Configuration (`next.config.js`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static export for Vercel
  trailingSlash: true,       // URL consistency
  images: {
    unoptimized: true        // For static export compatibility
  }
}
```

#### Tailwind Configuration (`tailwind.config.js`):
```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
}
```

## Module and Component Hierarchy

### Page Components Structure:
```
HomePage (page.tsx)
├── Navigation Component (inline)
├── Hero Section (inline)
├── Services Section (inline)
├── Industries Section (inline)
├── Results Section (inline)
├── About Section (inline)
├── Testimonials Section (inline)
├── FAQ Section (inline)
├── Pricing Section (inline)
├── Contact Section (inline)
├── Demo Section (inline)
└── Footer Component (inline)
```

### Future Component Organization:
When components become reusable, organize in `/src/components/`:
```
src/components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   └── Contact.tsx
└── layout/
    ├── Navigation.tsx
    ├── Footer.tsx
    └── SEO.tsx
```

## Asset Organization Guidelines

### Image Naming Convention:
- Use kebab-case: `logo-transparent.png`
- Include descriptive names: `ai-automation-demo.mp4`
- Maintain consistent format: `.png` for logos, `.jpg` for photos, `.mp4` for videos

### File Size Optimization:
- **Images:** Optimize for web (compress without quality loss)
- **Videos:** Compress for web streaming
- **Documents:** Keep PDFs under 5MB when possible

## Environment Configuration

### Development Environment:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Production Deployment:
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `out/`
- **Environment Variables:** Set in Vercel dashboard

## Build and Deployment Structure

### Build Process:
1. **Development:** `npm run dev` - Hot reload server
2. **Production Build:** `npm run build` - Optimized static export
3. **Deployment:** Automatic via Vercel on git push

### Output Structure (`/out/` directory):
```
out/
├── _next/
│   ├── static/
│   └── chunks/
├── index.html           # Generated landing page
├── blog/
│   └── ai-automation-real-estate-guide/
│       └── index.html
└── [asset files]
```

## Maintenance Guidelines

### Safe File Operations:
1. **Never delete while server running:**
   - `.next/` directory
   - `out/` directory
   - Any files in `src/app/`

2. **Safe to regenerate:**
   - `node_modules/` (run `npm install`)
   - `.next/` (run `npm run dev`)
   - `out/` (run `npm run build`)

3. **Critical files - NEVER delete:**
   - `src/app/page.tsx`
   - `src/app/layout.tsx`
   - `package.json`
   - Configuration files

### Documentation Updates:
- Update this file when structure changes
- Maintain Implementation.md with task progress
- Document errors in Bug_tracking.md
- Keep UI_UX_doc.md current with design changes

## Integration Points

### External Services:
- **Calendly:** Embedded booking widget
- **FormSubmit:** Contact form handling
- **n8n:** Webhook integrations
- **Vercel Analytics:** Performance tracking
- **Leadsy.ai:** Visitor tracking

### API Endpoints:
- Contact form: `https://formsubmit.co/ajax/martin@lumenosis.com`
- Lead capture: `https://ofunrein.app.n8n.cloud/webhook/36e9c5f7-bf7e-4dc6-bfe7-2824bad97be0`
- Calendly: `https://calendly.com/lumenosis/30min`

This structure ensures maintainability, scalability, and follows Next.js best practices while supporting the Arthur framework implementation.
