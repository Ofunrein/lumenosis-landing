'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function HomepageWidget() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if we're on homepage
    const isHomepage = pathname === '/' || pathname === ''
    console.log('HomepageWidget route change:', { 
      pathname, 
      isHomepage,
      shouldLoad: isHomepage 
    })
    
    // If we were showing the widget but now we're not on homepage, clean up
    if (!isHomepage && shouldLoad) {
      console.log('Cleaning up widget on route change')
      // Remove any existing widgets
      const widgets = document.querySelectorAll('[id*="omakase"], [class*="omakase"], [data-omakase]')
      widgets.forEach(widget => {
        widget.remove()
      })
      
      // Remove any chat widgets
      const chatWidgets = document.querySelectorAll('[class*="chat"], [class*="widget"]')
      chatWidgets.forEach(widget => {
        if (widget.textContent && widget.textContent.toLowerCase().includes('powered by')) {
          widget.remove()
        }
      })
      
      // Clean up global widget object
      if ((window as any).OmakaseAIWidget) {
        delete (window as any).OmakaseAIWidget
      }
    }
    
    setShouldLoad(isHomepage)
  }, [pathname, shouldLoad])

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      console.log('HomepageWidget unmounting - cleaning up')
      // Remove any existing widgets
      const widgets = document.querySelectorAll('[id*="omakase"], [class*="omakase"], [data-omakase]')
      widgets.forEach(widget => {
        widget.remove()
      })
      
      // Remove any chat widgets
      const chatWidgets = document.querySelectorAll('[class*="chat"], [class*="widget"]')
      chatWidgets.forEach(widget => {
        if (widget.textContent && widget.textContent.toLowerCase().includes('powered by')) {
          widget.remove()
        }
      })
      
      // Clean up global widget object
      if (typeof window !== 'undefined' && (window as any).OmakaseAIWidget) {
        delete (window as any).OmakaseAIWidget
      }
    }
  }, [])

  if (!shouldLoad) {
    return null
  }

  return (
    <Script id="omakase-ai-widget-homepage-only" strategy="afterInteractive">
      {`
        console.log('Loading OmakaseAI Widget - Homepage Component');
        
        // Override OmakaseAI rendering functions before widget loads
        window.OmakaseAI_BrandingRemover = {
          originalCreateElement: document.createElement,
          originalAppendChild: Element.prototype.appendChild,
          originalInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML'),
          originalTextContent: Object.getOwnPropertyDescriptor(Node.prototype, 'textContent')
        };
        
        // Intercept element creation and content setting
        document.createElement = function(tagName) {
          const element = window.OmakaseAI_BrandingRemover.originalCreateElement.call(this, tagName);
          
          // Override innerHTML setter for this element
          Object.defineProperty(element, 'innerHTML', {
            set: function(value) {
              if (typeof value === 'string') {
                // Replace branding with Lumenosis branding
                value = value.replace(/powered\\s+by\\s+omakase\\.ai/gi, 'Powered by <a href="https://lumenosis.com" target="_blank" style="color: inherit; text-decoration: none;">Lumenosis</a>')
                             .replace(/powered\\s+by\\s+omakase/gi, 'Powered by <a href="https://lumenosis.com" target="_blank" style="color: inherit; text-decoration: none;">Lumenosis</a>')
                             .replace(/omakase\\.ai/gi, '<a href="https://lumenosis.com" target="_blank" style="color: inherit; text-decoration: none;">Lumenosis</a>')
                             .replace(/^powered\\s+by$/gi, 'Powered by <a href="https://lumenosis.com" target="_blank" style="color: inherit; text-decoration: none;">Lumenosis</a>');
              }
              window.OmakaseAI_BrandingRemover.originalInnerHTML.set.call(this, value);
            },
            get: function() {
              return window.OmakaseAI_BrandingRemover.originalInnerHTML.get.call(this);
            }
          });
          
          // Override textContent setter for this element  
          Object.defineProperty(element, 'textContent', {
            set: function(value) {
              if (typeof value === 'string') {
                // Replace branding text with Lumenosis branding
                value = value.replace(/powered\\s+by\\s+omakase\\.ai/gi, 'Powered by Lumenosis')
                             .replace(/powered\\s+by\\s+omakase/gi, 'Powered by Lumenosis')
                             .replace(/omakase\\.ai/gi, 'Lumenosis')
                             .replace(/^powered\\s+by$/gi, 'Powered by Lumenosis');
              }
              window.OmakaseAI_BrandingRemover.originalTextContent.set.call(this, value);
            },
            get: function() {
              return window.OmakaseAI_BrandingRemover.originalTextContent.get.call(this);
            }
          });
          
          return element;
        };
        
        // Load the OmakaseAI widget
        (function(w,d,s,o,f,js,fjs){
          w['OmakaseAIWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
          js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
          js.id=o;js.src=f;js.async=1;
          if(fjs){fjs.parentNode.insertBefore(js,fjs);}
          else{d.head.appendChild(js);}
        }(window,document,'script','OmakaseAI','https://cdn.omakase.ai/loader.min.js?apiKey=oma_live_fgP2ClXWQ7uI8bgxC5Xa7zVYF1KL-PmPiUVbeDpRNCJkmm_YB5zBYPxvWwMJVXJw&hideBranding=true&_=1757774157491'));
        
        // Additional cleanup after widget loads
        setTimeout(() => {
          // Scan and replace existing branding elements
          function cleanBranding() {
            document.querySelectorAll('*').forEach(el => {
              // Only target elements that are likely to be in the footer/bottom area
              const rect = el.getBoundingClientRect();
              const isBottomArea = rect.bottom > window.innerHeight * 0.7; // Bottom 30% of screen
              
              if (el.textContent && el.children.length === 0) {
                const text = el.textContent.trim();
                
                // More specific targeting for bottom branding
                if ((text.toLowerCase().includes('powered by omakase') || 
                    text === 'Powered by Omakase.ai' ||
                    text === 'Powered by' ||
                    text.toLowerCase() === 'omakase.ai') && isBottomArea) {
                  
                  // Create clickable Lumenosis branding
                  el.innerHTML = '<a href="https://lumenosis.com" target="_blank" style="color: inherit; text-decoration: none; cursor: pointer;">Powered by Lumenosis</a>';
                  
                  // Add click event listener for the link
                  const link = el.querySelector('a');
                  if (link) {
                    link.addEventListener('click', function(e) {
                      e.preventDefault();
                      window.open('https://lumenosis.com', '_blank');
                    });
                  }
                }
              }
              
              // Specifically target chat widget footer areas
              const chatContainers = document.querySelectorAll('[class*="chat"], [class*="widget"], [id*="omakase"]');
              chatContainers.forEach(container => {
                const footerElements = container.querySelectorAll('*');
                footerElements.forEach(el => {
                  const text = el.textContent?.trim() || '';
                  if ((text === 'Powered by' || text.includes('Omakase')) && 
                      el.children.length === 0) {
                    el.innerHTML = '<a href="https://lumenosis.com" target="_blank" style="color: inherit; text-decoration: none; cursor: pointer;">Powered by Lumenosis</a>';
                  }
                });
              });
            });
          }
          
          cleanBranding();
          setInterval(cleanBranding, 1000); // Check more frequently
        }, 2000); // Start earlier
      `}
    </Script>
  )
}
