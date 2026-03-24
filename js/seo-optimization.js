/**
 * MoneyCalcPro - SEO & Performance Optimization
 * Lazy loading, image optimization, and performance enhancements
 */

(function() {
    'use strict';

    /**
     * Native Lazy Loading for Images
     * Uses browser's native loading="lazy" with fallback
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers without support
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px' });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Preload critical resources
     */
    function preloadCriticalResources() {
        // Preload main logo
        const logo = new Image();
        logo.src = 'https://i.ibb.co/hJxJMLP6/moneycalcpro-logo.png';
        
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'style';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(fontLink);
    }

    /**
     * Add DNS prefetch for external domains
     */
    function addDNSPrefetch() {
        const domains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com',
            'cdnjs.cloudflare.com',
            'images.unsplash.com'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });
    }

    /**
     * Optimize images with WebP format detection
     */
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        // Check WebP support
        const webpSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        
        if (webpSupported) {
            images.forEach(img => {
                const src = img.src;
                if (src.includes('unsplash.com') || src.includes('images.')) {
                    // Could convert to WebP if server-side support exists
                    console.log('WebP supported for:', src);
                }
            });
        }
    }

    /**
     * Reduce layout shift by reserving space
     */
    function preventLayoutShift() {
        // Reserve space for images
        document.querySelectorAll('img').forEach(img => {
            if (!img.style.aspectRatio) {
                img.style.aspectRatio = '16/9';
            }
        });
        
        // Reserve space for ads if any
        const adSlots = document.querySelectorAll('.ad-slot');
        adSlots.forEach(slot => {
            slot.style.minHeight = '250px';
        });
    }

    /**
     * Defer non-critical CSS
     */
    function deferNonCriticalCSS() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]:not([critical])');
        stylesheets.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
    }

    /**
     * Remove unused CSS (production optimization)
     */
    function cleanupUnusedCSS() {
        // This would be done at build time with tools like PurgeCSS
        console.log('CSS cleanup recommended for production');
    }

    /**
     * Add structured data for SEO
     */
    function addStructuredData() {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MoneyCalcPro",
            "url": "https://moneycalcpro.site/",
            "description": "Free online tools for everyone",
            "author": {
                "@type": "Person",
                "name": "Muhammad Subhan"
            }
        });
        document.head.appendChild(script);
    }

    /**
     * Initialize all optimizations
     */
    function initOptimizations() {
        addDNSPrefetch();
        preloadCriticalResources();
        initLazyLoading();
        preventLayoutShift();
        addStructuredData();
        
        // Run after page load
        window.addEventListener('load', () => {
            optimizeImages();
            deferNonCriticalCSS();
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOptimizations);
    } else {
        initOptimizations();
    }
})();
