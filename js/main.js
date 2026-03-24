/**
 * MoneyCalcPro - Main JavaScript
 * Shared functionality across all pages
 * Optimized for performance and BFCache compatibility
 */

(function() {
    'use strict';

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.nav-mobile');
        const overlay = document.querySelector('.nav-mobile-overlay');

        if (!menuBtn || !mobileNav) return;

        function toggleMenu() {
            menuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        }

        function closeMenu() {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', toggleMenu);
        if (overlay) overlay.addEventListener('click', closeMenu);

        // Close menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    /**
     * Header Scroll Effect
     */
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 50;

        function handleScroll() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > scrollThreshold) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Scroll Animation for .scroll-animate elements
     * Makes content visible when scrolled into view
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate');
        
        if (!animatedElements.length) return;

        // Use IntersectionObserver for performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => observer.observe(el));
        } else {
            // Fallback - show all immediately
            animatedElements.forEach(el => el.classList.add('visible'));
        }
    }

    /**
     * Scroll Animations using Intersection Observer
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate');
        if (animatedElements.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    }

    /**
     * Advanced Lazy Loading Images with IntersectionObserver
     */
    function initLazyLoading() {
        // Lazy load images with data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load image
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        
                        // Add loaded class for styling
                        img.classList.add('loaded');
                        
                        // Stop observing
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }

        // Lazy load iframes
        const lazyIframes = document.querySelectorAll('iframe[data-src]');
        if ('IntersectionObserver' in window && lazyIframes.length > 0) {
            const iframeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const iframe = entry.target;
                        iframe.src = iframe.dataset.src;
                        iframe.removeAttribute('data-src');
                        iframeObserver.unobserve(iframe);
                    }
                });
            }, {
                rootMargin: '100px 0px'
            });

            lazyIframes.forEach(iframe => iframeObserver.observe(iframe));
        }
    }

    /**
     * Toast Notification System
     */
    window.Toast = {
        show: function(message, type = 'info', duration = 3000) {
            // Remove existing toasts
            const existingToast = document.querySelector('.toast');
            if (existingToast) {
                existingToast.remove();
            }

            // Create toast element
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <div class="toast-content">
                    <span class="toast-message">${message}</span>
                </div>
            `;

            document.body.appendChild(toast);

            // Auto remove
            setTimeout(() => {
                toast.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        success: function(message, duration) {
            this.show(message, 'success', duration);
        },

        error: function(message, duration) {
            this.show(message, 'error', duration);
        }
    };

    /**
     * Copy to Clipboard Utility
     */
    window.copyToClipboard = function(text, successMessage = 'Copied to clipboard!') {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                Toast.success(successMessage);
            }).catch(() => {
                fallbackCopy(text, successMessage);
            });
        } else {
            fallbackCopy(text, successMessage);
        }
    };

    function fallbackCopy(text, successMessage) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            Toast.success(successMessage);
        } catch (err) {
            Toast.error('Failed to copy to clipboard');
        }

        document.body.removeChild(textArea);
    }

    /**
     * Format File Size
     */
    window.formatFileSize = function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    /**
     * Debounce Function
     */
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    /**
     * Throttle Function
     */
    window.throttle = function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    /**
     * Initialize All Components
     */
    function init() {
        initMobileMenu();
        initHeaderScroll();
        initSmoothScroll();
        initScrollAnimations();
        initLazyLoading();
    }

    // Add js-enabled class to body for progressive enhancement
    document.documentElement.classList.add('js-enabled');

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
