# LUMENOSIS AI - PROJECT REQUIREMENTS DOCUMENT (PRD)

## 🎯 **PROJECT OVERVIEW**
**Project Name:** Lumenosis AI Landing Page  
**Purpose:** SEO-optimized landing page for AI automation services targeting real estate and home services  
**Current Status:** Live website with Next.js 14, fully SEO optimized  
**Deployment:** Vercel (connected and configured)

---

## 🏗️ **CURRENT ARCHITECTURE**

### **Core Structure**
```
src/app/
├── page.tsx (main landing page - SEO optimized)
├── blog/ai-automation-real-estate-guide/page.tsx (blog content)
└── layout.tsx (global metadata, SEO, structured data)
```

### **Routes (DO NOT DELETE)**
- `/` - Main landing page (priority 1.0)
- `/blog/ai-automation-real-estate-guide` - Blog post (priority 0.9)

### **Assets (DO NOT DELETE)**
- `public/` - All logos, images, videos, documents
- `legacy/` - Reference HTML files (keep for reference)
- `index.html` - Original HTML file (keep for reference)

---

## 🚫 **CRITICAL - NEVER DELETE**

### **Essential Files & Directories**
- `src/app/page.tsx` - Main landing page
- `src/app/layout.tsx` - Global layout and SEO
- `src/app/blog/` - Blog content
- `public/` - All website assets
- `legacy/` - Reference materials
- `index.html` - Original HTML reference
- `package.json` - Dependencies
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - CSS framework
- `tsconfig.json` - TypeScript config

### **Build & Development Files**
- `node_modules/` - Dependencies (regenerated with npm install)
- `.next/` - Build output (regenerated with npm run dev)
- `out/` - Static export (regenerated with npm run build)

---

## ✅ **SAFE TO REMOVE (When Appropriate)**

### **Documentation Files**
- `README.md` files in subdirectories
- Old guide documents
- Temporary files
- Backup files

### **Build Outputs (Only When Server Not Running)**
- `.next/` directory (only when npm run dev is NOT running)
- `out/` directory (only when npm run build is NOT running)

---

## 🔧 **DEVELOPMENT GUIDELINES**

### **Before Making Changes**
1. **Check running processes** - Ensure no dev servers are running
2. **Verify file dependencies** - Check what other files reference the target
3. **Backup important changes** - Save work before major deletions
4. **Test after changes** - Always verify the site still works

### **Safe Cleanup Process**
1. Stop all dev servers: `pkill -f "next dev"`
2. Remove unnecessary files/directories
3. Start fresh dev server: `npm run dev`
4. Test all routes work
5. Build to verify: `npm run build`

### **Never Delete While Server Running**
- `.next/` directory
- `out/` directory
- Any files in `src/app/`
- Any files in `public/`

---

## 📱 **SEO REQUIREMENTS**

### **Current SEO Implementation**
- Meta tags and Open Graph optimization
- Structured data (JSON-LD) for search engines
- XML sitemap (`public/sitemap.xml`)
- Robots.txt (`public/robots.txt`)
- Mobile-first responsive design
- Fast loading (static export)

### **SEO Maintenance**
- Keep sitemap updated when routes change
- Maintain meta descriptions and titles
- Ensure all images have alt tags
- Keep structured data current

---

## 🎨 **DESIGN REQUIREMENTS**

### **Current Design System**
- Dark theme (gray-900 background)
- Gradient text effects
- Card-based layout
- Mobile-first responsive
- Tailwind CSS framework

### **Brand Elements**
- Lumenosis AI logo (transparent and regular versions)
- Indigo/purple gradient color scheme
- Professional, tech-focused aesthetic
- Clean, modern typography

---

## 🚀 **DEPLOYMENT & HOSTING**

### **Vercel Configuration**
- Project ID: `prj_Cz0hylQwwLtd7Nz2GLgmhX2t1OYO`
- Connected via `.vercel/project.json`
- Static export for optimal performance
- Automatic deployments on git push

### **Build Process**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server (if needed)

---

## 📋 **FUTURE FEATURES (DO NOT IMPLEMENT YET)**

### **Lead Magnet Strategy**
- Dynamic routes for personalized lead magnets
- Form handling and email integration
- Analytics tracking per lead source
- Resource delivery system

### **Implementation Notes**
- Wait for user direction before implementing
- Maintain current SEO optimization
- Keep structure simple and focused
- Test thoroughly before deployment

---

## ⚠️ **TROUBLESHOOTING**

### **Common Issues**
1. **"Cannot find module" errors** - Usually means .next directory was deleted while server running
2. **Build failures** - Check for syntax errors in TSX files
3. **Missing assets** - Verify public/ directory contents
4. **SEO issues** - Check meta tags and structured data

### **Recovery Steps**
1. Stop all dev servers
2. Delete .next and out directories
3. Run `npm run dev` to regenerate
4. Test all routes
5. Build to verify

---

## 📝 **CHANGE LOG**

### **Recent Changes (2024-08-24)**
- ✅ Removed broken dashboard link (small dot button)
- ✅ Cleaned up unnecessary documentation files
- ✅ Removed unused API routes
- ✅ Simplified project structure
- ✅ Maintained all essential assets and SEO

### **Next Steps**
- Await user direction for lead magnet implementation
- Maintain current SEO optimization
- Keep structure clean and focused

---

## 🎯 **SUCCESS METRICS**

### **Current Status**
- ✅ Website loads without errors
- ✅ All routes accessible
- ✅ SEO fully optimized
- ✅ Mobile responsive
- ✅ Fast loading times
- ✅ Clean, maintainable code

### **Maintenance Goals**
- Keep website functional at all times
- Maintain SEO optimization
- Preserve all essential assets
- Follow development guidelines
- Document all changes

---

**Last Updated:** 2024-08-24  
**Document Version:** 1.0  
**Status:** ACTIVE - REFERENCE DOCUMENT
