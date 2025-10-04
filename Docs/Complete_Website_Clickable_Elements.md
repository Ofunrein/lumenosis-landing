# Complete Website Clickable Elements Mapping

## 🎯 **ALL CLICKABLE ELEMENTS IDENTIFIED**

### **MAIN HOMEPAGE (`/`)**

#### **Navigation & Header**
- Logo → `#top` (internal anchor)
- Services → `#services` (internal anchor)
- Results → `#results` (internal anchor) 
- About → `#about` (internal anchor)
- Contact → `#contact` (internal anchor)
- Free Workflows → `/lead-magnet` (page)
- Book a Call → `https://calendly.com/lumenosis/30min` (external)
- Mobile menu (all same links)

#### **Hero Section**
- Book Free Strategy Call → `https://calendly.com/lumenosis/30min` (external CTA)
- See Live Demo → `#demos` (internal anchor)
- Response Time Metric → Interactive hover element
- More Showings Metric → Interactive hover element  
- 24/7 AI Working Metric → Interactive hover element

#### **Problem/Solution Comparison**
- Interactive cards with hover effects (non-clickable but interactive)

#### **Services Section (`#services`)**
- Multiple service CTAs linking to Calendly
- Service cards with hover interactions

#### **Results Section (`#results`)**
- Statistics cards with hover effects
- Book Your Free Strategy Session → `https://calendly.com/lumenosis/30min` (external)

#### **Contact Section (`#contact`)**
- Calendly embedded widget → `https://calendly.com/lumenosis/30min`
- Can't see booking form? → `https://calendly.com/lumenosis/30min` (backup link)
- Can't find a time? → `#question-section` (internal scroll)
- Contact form → `https://formspree.io/f/xdkowrek` (external form handler)
- Email link → `mailto:martin@lumenosis.com`
- Phone link → `tel:+15125712595`

#### **Demo Section (`#demos`)**
**4 Video Demonstrations:**
1. **Real Estate Video Automation**
   - Video controls (play, pause, etc.)
   - Download video link (fallback)
   - CTA buttons

2. **AI Email Assistant** 
   - Video controls
   - Download video link
   - CTA buttons

3. **AI Voice Assistant**
   - Video controls  
   - Download video link
   - CTA buttons

4. **SMS Lead Qualification**
   - Video controls
   - Download video link
   - CTA buttons

#### **FAQ Section**
- Expandable FAQ items (JavaScript interactions)
- Each FAQ can be clicked to expand/collapse

#### **Pricing Section (`#pricing`)**
- Service package interactions
- Pricing CTAs to Calendly

---

### **LEAD MAGNET PAGES**

#### **Lead Magnet Index (`/lead-magnet`)**
- Header logo → `/` (back to homepage)
- Schedule Free Setup Call → `https://calendly.com/lumenosis/30min`
- Need it done for you? → Scroll to `#done-for-you-section`
- **6 Workflow Cards (ALL CLICKABLE):**
  1. Real Estate Lead Automation → `/lead-magnet/real-estate-automation`
  2. 2000+ Free N8N Workflows → `/lead-magnet/n8n-workflow-collection`
  3. N8N AI Agent Builder → `/lead-magnet/n8n-ai-agent-builder`
  4. AI Real Estate Video Automation → `/lead-magnet/ai-real-estate-video-automation`
  5. Apollo Cold Email Automation → `/lead-magnet/apollo-cold-email-automation`
  6. AI Hidden Real Estate Listings → `/lead-magnet/ai-hidden-real-estate-listings`

- **Need Help? Schedule Free Call** → `https://calendly.com/lumenosis/30min` (on each card)
- **Done-For-You Section CTAs:**
  - Book Free Revenue Strategy Call → `https://calendly.com/lumenosis/30min`
  - View Client Success Stories → `/` (back to homepage)

#### **Individual Workflow Guide Pages (`/lead-magnet/[slug]`)**
**Each page contains:**
- Back to All Workflows → `/lead-magnet`
- Cross-navigation between workflow guides
- **Download Buttons:**
  - Download JSON files from `/downloads/[filename].json`
  - External links to Google Drive demos
  - View Demo Video links
- **External Tool Links:**
  - Make.com → `https://make.com`
  - N8N → `https://n8n.io`
  - Apollo.io → `https://apollo.io`
  - Runway → `https://runway.com`
  - ElevenLabs → `https://elevenlabs.io`
  - OpenAI → `https://openai.com`
  - And many more...
- **Section Navigation:**
  - Overview, Getting Started, Setup steps, etc.
  - Show All/Sections toggle
- **Help CTAs:**
  - Get Help → `https://calendly.com/lumenosis/30min`
  - Schedule Consultation → `https://calendly.com/lumenosis/30min`

---

### **DOWNLOAD FILES (PUBLIC DIRECTORY)**
#### **Available Downloads:**
- `/downloads/RealEstateLeadGenAutomation.json`
- `/downloads/yt vid real estate vid gen.blueprint.json`
- `/downloads/Cold_Email_Live_Build.json`
- `/downloads/N8N Workflow Builder.json`

#### **Demo Videos:**
- `/videos/demos/Real Esate Video Automation Demo.mp4`
- `/videos/demos/Automating_real_estate_agent_inquiries_AI_DEMO_compressed.mp4`
- `/videos/demos/Qualify Real Estate Leads via SMS with GPT-4o, Twilio, and Google Sheets + Retell short demo.mp4`
- `/videos/demos/ai voice demo veed to capcut.mp4`

---

### **EXTERNAL INTEGRATIONS & LINKS**
#### **Main External Services:**
- **Calendly:** `https://calendly.com/lumenosis/30min` (MOST IMPORTANT CTA)
- **FormSpree:** Contact form submission
- **Google Drive:** Demo video hosting
- **Multiple SaaS Tools:** Direct links from workflow guides

#### **Analytics Tracking:**
- All downloads tracked with `analytics.leadMagnet.downloaded(slug)`
- All CTA clicks tracked
- Section views tracked
- Scroll and time tracking implemented

---

### **INTERACTIVE ELEMENTS (NON-LINKS)**
#### **JavaScript Interactions:**
- Mobile menu toggle
- FAQ accordion expand/collapse
- Video controls on all demo videos
- Smooth scrolling navigation
- Hover effects on cards and buttons
- Show All/Sections toggle on workflow guides
- Copy to clipboard functionality
- Form validation and submission

#### **Visual Interactions:**
- Card hover animations
- Button hover effects
- Gradient animations
- Loading states
- Scroll-triggered animations (AOS)

---

## 🎯 **RICH SNIPPETS STRATEGY**

All these elements need to be represented in structured data for maximum Google rich snippet potential:

### **Organization Departments:**
- Services → All service-related CTAs and sections
- About → Company information and team
- Contact → All contact methods and forms
- Demos → Video demonstrations and interactive content
- Free Resources → Lead magnets and downloads
- Support → Help and consultation links

### **WebPage Schemas for Each Section:**
- Main sections with proper `@id` anchors
- Video object schemas for all demos
- Download object schemas for all files
- FAQ schema for interactive questions
- Service schemas for different automation types

### **BreadcrumbList Expansion:**
- Main navigation paths
- Workflow guide navigation paths
- Cross-page navigation patterns

This comprehensive mapping ensures NO clickable element is missed in our rich snippets implementation!
