// Analytics utility for tracking events across the application
import { track } from '@vercel/analytics';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

// Analytics event types for type safety
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

// Track custom events
export const trackEvent = (event: AnalyticsEvent) => {
  // Vercel Analytics tracking
  track(event.action, {
    category: event.category,
    label: event.label,
    value: event.value,
    ...event.properties,
  });

  // Google Analytics tracking (if configured)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.properties,
    });
  }
};

// Page view tracking
export const trackPageView = (url: string, title: string) => {
  // Vercel Analytics (automatically tracks page views)
  
  // Google Analytics page view
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: title,
      page_location: url,
    });
  }
};

// Predefined event tracking functions for common actions
export const analytics = {
  // Lead Magnet Events
  leadMagnet: {
    viewed: (slug: string) =>
      trackEvent({
        action: 'lead_magnet_viewed',
        category: 'Lead Magnets',
        label: slug,
      }),
    
    downloaded: (slug: string) =>
      trackEvent({
        action: 'lead_magnet_downloaded',
        category: 'Lead Magnets',
        label: slug,
      }),
    
    copied: (slug: string) =>
      trackEvent({
        action: 'lead_magnet_copied',
        category: 'Lead Magnets',
        label: slug,
      }),
    
    sectionViewed: (slug: string, section: string) =>
      trackEvent({
        action: 'section_viewed',
        category: 'Lead Magnets',
        label: `${slug}_${section}`,
      }),
    
    toggleShowAll: (slug: string, showAll: boolean) =>
      trackEvent({
        action: 'toggle_show_all',
        category: 'Lead Magnets',
        label: slug,
        properties: { show_all: showAll },
      }),
    
    consultationClicked: (source: string) =>
      trackEvent({
        action: 'consultation_clicked',
        category: 'Conversions',
        label: source,
      }),
  },

  // Navigation Events
  navigation: {
    menuClicked: (menuItem: string) =>
      trackEvent({
        action: 'menu_clicked',
        category: 'Navigation',
        label: menuItem,
      }),
    
    ctaClicked: (ctaText: string, location: string) =>
      trackEvent({
        action: 'cta_clicked',
        category: 'Conversions',
        label: ctaText,
        properties: { location },
      }),
    
    linkClicked: (url: string, text: string) =>
      trackEvent({
        action: 'external_link_clicked',
        category: 'Navigation',
        label: text,
        properties: { url },
      }),
  },

  // User Engagement
  engagement: {
    timeOnPage: (duration: number, page: string) =>
      trackEvent({
        action: 'time_on_page',
        category: 'Engagement',
        label: page,
        value: Math.round(duration / 1000), // Convert to seconds
      }),
    
    scrollDepth: (percentage: number, page: string) =>
      trackEvent({
        action: 'scroll_depth',
        category: 'Engagement',
        label: page,
        value: percentage,
      }),
    
    formInteraction: (formName: string, action: 'started' | 'completed' | 'abandoned') =>
      trackEvent({
        action: `form_${action}`,
        category: 'Forms',
        label: formName,
      }),
  },

  // Business Events
  business: {
    calendlyOpened: (source: string) =>
      trackEvent({
        action: 'calendly_opened',
        category: 'Conversions',
        label: source,
      }),
    
    phoneClicked: () =>
      trackEvent({
        action: 'phone_clicked',
        category: 'Conversions',
        label: 'phone_number',
      }),
    
    emailClicked: () =>
      trackEvent({
        action: 'email_clicked',
        category: 'Conversions',
        label: 'email_address',
      }),
  },

  // Error Tracking
  errors: {
    pageError: (error: string, page: string) =>
      trackEvent({
        action: 'page_error',
        category: 'Errors',
        label: page,
        properties: { error },
      }),
    
    jsError: (error: string, stack?: string) =>
      trackEvent({
        action: 'js_error',
        category: 'Errors',
        label: error,
        properties: { stack },
      }),
  },
};

// Scroll depth tracking hook
export const useScrollTracking = (page: string) => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const trackingIntervals = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      trackingIntervals.forEach(interval => {
        if (scrollPercent >= interval && !tracked.has(interval)) {
          tracked.add(interval);
          analytics.engagement.scrollDepth(interval, page);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Time on page tracking
export const useTimeTracking = (page: string) => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  
  const trackTime = () => {
    const timeSpent = Date.now() - startTime;
    analytics.engagement.timeOnPage(timeSpent, page);
  };

  // Track on page unload
  window.addEventListener('beforeunload', trackTime);
  
  // Track every 30 seconds for long sessions
  const interval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      trackTime();
    }
  }, 30000);

  return () => {
    window.removeEventListener('beforeunload', trackTime);
    clearInterval(interval);
    trackTime(); // Final tracking
  };
};
