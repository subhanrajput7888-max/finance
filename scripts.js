// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add scroll animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.calculator-card, .blog-card, .feature, .calculator-item, .article-body > *, .sidebar-widget').forEach(el => {
        observer.observe(el);
    });

    // Mobile menu toggle - updated to match HTML class names
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.mobile-nav-overlay');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.getAttribute('aria-hidden') === 'false') {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.setAttribute('aria-hidden', 'true');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
            console.log('Form submitted');
        });
    });

    // Input field animations
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// Calculator functionality
function calculateEMI() {
    // Get input values
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const months = parseInt(document.getElementById('months').value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(months) || principal <= 0 || rate <= 0 || months <= 0) {
        document.getElementById('emiResult').innerHTML = '<p style="color: red;">Please enter valid positive numbers in all fields.</p>';
        return;
    }
    
    // Calculate monthly interest rate
    const monthlyRate = rate / 100 / 12;
    
    // Calculate EMI using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    
    // Calculate total payment and interest
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    
    // Display results
    document.getElementById('emiResult').innerHTML = `<div class="results-grid"><div class="result-item"><h4>Monthly Payment</h4><p class="result-value">$${emi.toFixed(2)}</p></div><div class="result-item"><h4>Total Payment</h4><p class="result-value">$${totalPayment.toFixed(2)}</p></div><div class="result-item"><h4>Total Interest</h4><p class="result-value">$${totalInterest.toFixed(2)}</p></div><div class="result-item"><h4>Principal Amount</h4><p class="result-value">$${principal.toFixed(2)}</p></div></div><div class="amortization-info"><p>You will pay <strong>$${totalInterest.toFixed(2)}</strong> in interest over the life of the loan.</p><p>That's <strong>${((totalInterest/principal)*100).toFixed(2)}%</strong> of the original loan amount.</p></div>`;
}

function calculateMortgage() {
    // Get input values
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPaymentPercent').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    
    if (isNaN(homePrice) || isNaN(downPaymentPercent) || isNaN(loanTerm) || isNaN(interestRate) || 
        homePrice <= 0 || downPaymentPercent < 0 || loanTerm <= 0 || interestRate < 0) {
        document.getElementById('mortgageResult').innerHTML = '<p style="color: red;">Please enter valid numbers in all fields.</p>';
        return;
    }
    
    // Calculate loan amount
    const downPaymentAmount = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPaymentAmount;
    
    // Calculate monthly interest rate and total months
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    
    // Calculate monthly payment using mortgage formula
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    // Calculate total payment and interest
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    
    // Display results
    document.getElementById('mortgageResult').innerHTML = `<div class="results-grid"><div class="result-item"><h4>Monthly Payment</h4><p class="result-value">$${monthlyPayment.toFixed(2)}</p></div><div class="result-item"><h4>Down Payment</h4><p class="result-value">$${downPaymentAmount.toFixed(2)}</p></div><div class="result-item"><h4>Loan Amount</h4><p class="result-value">$${loanAmount.toFixed(2)}</p></div><div class="result-item"><h4>Total Interest</h4><p class="result-value">$${totalInterest.toFixed(2)}</p></div></div><div class="amortization-info"><p>You will pay <strong>$${totalInterest.toFixed(2)}</strong> in interest over the life of the loan.</p><p>That's <strong>${((totalInterest/(homePrice))*100).toFixed(2)}%</strong> of the home price.</p></div>`;
}

function calculateCompoundInterest() {
    // Get input values
    const principal = parseFloat(document.getElementById('principal').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value);
    const timesCompounded = parseInt(document.getElementById('timesCompounded').value);
    const years = parseInt(document.getElementById('years').value);
    
    if (isNaN(principal) || isNaN(annualRate) || isNaN(timesCompounded) || isNaN(years) || 
        principal <= 0 || annualRate < 0 || timesCompounded <= 0 || years <= 0) {
        document.getElementById('compoundResult').innerHTML = '<p style="color: red;">Please enter valid numbers in all fields.</p>';
        return;
    }
    
    // Calculate compound interest: A = P(1 + r/n)^(nt)
    const rate = annualRate / 100;
    const amount = principal * Math.pow(1 + rate/timesCompounded, timesCompounded * years);
    const interest = amount - principal;
    
    // Calculate APY
    const APY = (Math.pow(1 + rate/timesCompounded, timesCompounded) - 1) * 100;
    
    // Display results
    document.getElementById('compoundResult').innerHTML = `<div class="results-grid"><div class="result-item"><h4>Final Amount</h4><p class="result-value">$${amount.toFixed(2)}</p></div><div class="result-item"><h4>Total Interest</h4><p class="result-value">$${interest.toFixed(2)}</p></div><div class="result-item"><h4>Starting Principal</h4><p class="result-value">$${principal.toFixed(2)}</p></div><div class="result-item"><h4>APY</h4><p class="result-value">${APY.toFixed(2)}%</p></div></div><div class="amortization-info"><p>Your investment will grow by <strong>${((interest/principal)*100).toFixed(2)}%</strong> over ${years} years.</p><p>That's <strong>$${(interest/years).toFixed(2)}</strong> in interest per year on average.</p></div>`;
}

// Attach calculator functions to forms
const personalLoanForm = document.getElementById('personalLoanForm');
if (personalLoanForm) {
    personalLoanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateEMI();
    });
}

const mortgageForm = document.getElementById('mortgageForm');
if (mortgageForm) {
    mortgageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateMortgage();
    });
}

const compoundInterestForm = document.getElementById('compoundInterestForm');
if (compoundInterestForm) {
    compoundInterestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateCompoundInterest();
    });
}

// Add CSS for the animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .btn.clicked {
        transform: scale(0.95);
        transition: transform 0.1s ease;
    }
    
    .form-group.focused label {
        color: #4CAF50;
        transform: translateY(-20px) scale(0.9);
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Calculator Results */
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    
    .result-item {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
    }
    
    .result-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #3b82f6;
        margin: 5px 0 0 0;
    }
    
    .amortization-info {
        margin-top: 20px;
        padding: 15px;
        background: #eff6ff;
        border-radius: 8px;
        border-left: 4px solid #3b82f6;
    }
`;
document.head.appendChild(style);

// Performance Optimizations
    
    // Debounced resize handler
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttled scroll handler for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Optimized scroll to top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, 100));
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Intersection Observer for lazy loading animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate when in view
        document.querySelectorAll('.calculator-card, .feature-card, .blog-card, .stat-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Optimize calculator opening with better error handling
    function openCalculator(calculatorName) {
        try {
            // Preload modal content
            const modal = document.getElementById('calculatorModal');
            const iframe = document.querySelector('.calculator-iframe');
            
            if (modal && iframe) {
                modal.style.display = 'block';
                document.body.classList.add('modal-open');
                
                // Set iframe src with timeout to prevent blocking
                setTimeout(() => {
                    iframe.src = `calculators/${calculatorName}.html`;
                }, 50);
                
                // Focus trap for accessibility
                const firstFocusableElement = modal.querySelector('button');
                if (firstFocusableElement) {
                    firstFocusableElement.focus();
                }
            }
        } catch (error) {
            console.error('Error opening calculator:', error);
        }
    }
    
    // Optimized calculator close
    function closeCalculator() {
        const modal = document.getElementById('calculatorModal');
        const iframe = document.querySelector('.calculator-iframe');
        
        if (modal) {
            modal.style.display = 'none';
        }
        
        if (iframe) {
            iframe.src = '';
        }
        
        document.body.classList.remove('modal-open');
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCalculator();
        }
    });
    
    // Optimized DOM ready function
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    
    // Run optimizations when DOM is ready
    domReady(() => {
        // Add performance metrics
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                }, 0);
            });
        }
        
        // Ensure proper initialization of homepage elements
        initializeHomepage();
    });
    
    function initializeHomepage() {
        // Make sure all sections are visible
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.style.display === 'none' || getComputedStyle(section).display === 'none') {
                section.style.display = 'block';
            }
        });
        
        // Ensure main content is visible
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
        }
    }

// Calculator modal functionality
const calculatorMap = {
    'personal-loan': 'calculators/personal-loan.html',
    'mortgage': 'calculators/mortgage.html',
    'home-loan': 'calculators/home-loan.html',
    'auto-loan': 'calculators/auto-loan.html',
    'student-loan': 'calculators/student-loan.html',
    'loan-affordability': 'calculators/loan-affordability.html',
    'debt-to-income': 'calculators/debt-to-income.html',
    'credit-card-interest': 'calculators/credit-card-interest.html',
    'life-insurance': 'calculators/life-insurance.html',
    'term-insurance': 'calculators/term-insurance.html',
    'health-insurance': 'calculators/health-insurance.html',
    'car-insurance': 'calculators/car-insurance.html',
    'home-insurance': 'calculators/home-insurance.html',
    'sip': 'calculators/sip.html',
    'compound-interest': 'calculators/compound-interest.html',
    'retirement': 'calculators/retirement.html',
    'investment-growth': 'calculators/investment-growth.html',
    'roi': 'calculators/roi.html',
    'income-tax': 'calculators/income-tax.html',
    'salary': 'calculators/salary.html'
};

const titleMap = {
    'personal-loan': 'Personal Loan EMI Calculator',
    'mortgage': 'Mortgage Calculator',
    'home-loan': 'Home Loan Calculator',
    'auto-loan': 'Auto Loan Calculator',
    'student-loan': 'Student Loan Calculator',
    'loan-affordability': 'Loan Affordability Calculator',
    'debt-to-income': 'Debt-to-Income Ratio Calculator',
    'credit-card-interest': 'Credit Card Interest Calculator',
    'life-insurance': 'Life Insurance Calculator',
    'term-insurance': 'Term Insurance Calculator',
    'health-insurance': 'Health Insurance Cost Estimator',
    'car-insurance': 'Car Insurance Premium Calculator',
    'home-insurance': 'Home Insurance Calculator',
    'sip': 'SIP Calculator',
    'compound-interest': 'Compound Interest Calculator',
    'retirement': 'Retirement Calculator',
    'investment-growth': 'Investment Growth Calculator',
    'roi': 'ROI Calculator',
    'income-tax': 'Income Tax Calculator',
    'salary': 'Salary Calculator'
};

// Modal elements
const modal = document.getElementById('calculatorModal');
const modalTitle = document.getElementById('modalCalculatorTitle');
const calculatorFrame = document.getElementById('calculatorFrame');
const closeButtons = document.querySelectorAll('[data-close-modal]');

// Ensure the modal is initially hidden properly
if (modal) {
    modal.setAttribute('aria-hidden', 'true');
}

// Open calculator modal
if (modal && modalTitle && calculatorFrame) {
    const calculatorCards = document.querySelectorAll('.calculator-card[data-calculator]');
    calculatorCards.forEach(card => {
        const openBtn = card.querySelector('.open-calculator-btn');
        if(openBtn) {
            openBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const calculatorName = card.getAttribute('data-calculator');
                if (calculatorMap[calculatorName]) {
                    modalTitle.textContent = titleMap[calculatorName];
                    calculatorFrame.src = calculatorMap[calculatorName];
                    modal.style.display = 'flex';
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                    document.body.classList.add('modal-open');
                }
            });
        }
    });
    
    // Close modal functions
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
        if (calculatorFrame) {
            calculatorFrame.src = '';
        }
    }
    
    // Close event listeners
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });
}
