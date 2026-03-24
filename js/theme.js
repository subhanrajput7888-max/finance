/**
 * MoneyCalcPro - Theme Switcher
 * Dark/Light mode toggle with localStorage persistence
 */

(function() {
    'use strict';

    // Theme configuration
    const THEME_KEY = 'moneycalcpro-theme';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';

    /**
     * Get the current theme from localStorage or system preference
     * @returns {string} 'light' or 'dark'
     */
    function getTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) {
            return stored;
        }
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return THEME_DARK;
        }
        return THEME_LIGHT;
    }

    /**
     * Set the theme and update the DOM
     * @param {string} theme - 'light' or 'dark'
     */
    function setTheme(theme) {
        if (theme === THEME_DARK) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem(THEME_KEY, theme);
        updateThemeIcon(theme);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = getTheme();
        const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        setTheme(newTheme);
    }

    /**
     * Update the theme toggle icon
     * @param {string} theme - 'light' or 'dark'
     */
    function updateThemeIcon(theme) {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('i');
        if (!icon) return;

        if (theme === THEME_DARK) {
            icon.className = 'fas fa-sun';
            toggleBtn.setAttribute('aria-label', 'Switch to light mode');
            toggleBtn.setAttribute('title', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            toggleBtn.setAttribute('title', 'Switch to dark mode');
        }
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const theme = getTheme();
        setTheme(theme);

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(THEME_KEY)) {
                    setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Expose functions globally
    window.ThemeManager = {
        get: getTheme,
        set: setTheme,
        toggle: toggleTheme
    };
})();
