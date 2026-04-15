// MoneyCalcPro - Main JavaScript

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Smooth Scroll for Anchor Links
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

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Form Validation Helper
function validateForm(formData) {
    for (let key in formData) {
        if (!formData[key] || formData[key].trim() === '') {
            return false;
        }
    }
    return true;
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Copy to Clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Copied to clipboard!');
        } catch (err) {
            showNotification('Failed to copy', 'error');
        }
        textArea.remove();
    }
}

// Format Currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format Number with Commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate Age
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Calculate BMI
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

// Get BMI Category
function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

// EMI Calculation
function calculateEMI(principal, rate, time) {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / 
                (Math.pow(1 + monthlyRate, time) - 1);
    return emi.toFixed(2);
}

// Percentage Calculation
function calculatePercentage(value, total) {
    return ((value / total) * 100).toFixed(2);
}

// Discount Calculation
function calculateDiscount(originalPrice, discountPercent) {
    const discountAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - discountAmount;
    return { discountAmount: discountAmount.toFixed(2), finalPrice: finalPrice.toFixed(2) };
}

// GST Calculation
function calculateGST(amount, gstPercent, isInclusive = false) {
    let gstAmount, totalAmount;
    
    if (isInclusive) {
        gstAmount = (amount * gstPercent) / (100 + gstPercent);
        totalAmount = amount;
    } else {
        gstAmount = (amount * gstPercent) / 100;
        totalAmount = amount + gstAmount;
    }
    
    return { gstAmount: gstAmount.toFixed(2), totalAmount: totalAmount.toFixed(2) };
}

// Password Generator
function generatePassword(length = 12, options = {}) {
    const {
        uppercase = true,
        lowercase = true,
        numbers = true,
        symbols = true
    } = options;
    
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
}

// Random Number Generator
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Profit/Loss Calculation
function calculateProfitLoss(costPrice, sellingPrice) {
    const difference = sellingPrice - costPrice;
    const percentage = ((difference / costPrice) * 100).toFixed(2);
    
    if (difference > 0) {
        return { type: 'Profit', amount: difference.toFixed(2), percentage };
    } else if (difference < 0) {
        return { type: 'Loss', amount: Math.abs(difference).toFixed(2), percentage };
    }
    return { type: 'No Profit/Loss', amount: '0.00', percentage: '0.00' };
}

// Investment Calculator
function calculateInvestment(principal, rate, time, compoundFrequency = 12) {
    const r = rate / 100;
    const n = compoundFrequency;
    const t = time;
    
    const amount = principal * Math.pow(1 + r / n, n * t);
    const interest = amount - principal;
    
    return {
        totalAmount: amount.toFixed(2),
        interestEarned: interest.toFixed(2)
    };
}

// Time Addition
function addTime(hours1, minutes1, hours2, minutes2) {
    const totalMinutes = (hours1 * 60 + minutes1) + (hours2 * 60 + minutes2);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}

// Unit Conversion
const conversionRates = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274
    },
    temperature: {
        celsius: 'special',
        fahrenheit: 'special',
        kelvin: 'special'
    }
};

function convertUnit(value, fromUnit, toUnit, category) {
    if (category === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }
    
    const baseValue = value / conversionRates[category][fromUnit];
    return (baseValue * conversionRates[category][toUnit]).toFixed(4);
}

function convertTemperature(value, from, to) {
    if (from === to) return value;
    
    let celsius;
    // Convert to Celsius first
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
    else if (from === 'kelvin') celsius = value - 273.15;
    
    // Convert from Celsius to target
    if (to === 'celsius') return celsius;
    if (to === 'fahrenheit') return (celsius * 9/5) + 32;
    if (to === 'kelvin') return celsius + 273.15;
}

// Currency Conversion (Static rates)
const currencyRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    INR: 74.5,
    PKR: 175.5,
    JPY: 110.0,
    AUD: 1.35,
    CAD: 1.25,
    CHF: 0.92,
    CNY: 6.45
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    const amountInUSD = amount / currencyRates[fromCurrency];
    return (amountInUSD * currencyRates[toCurrency]).toFixed(2);
}

// Mortgage Calculator
function calculateMortgage(homePrice, downPayment, rate, time) {
    const principal = homePrice - downPayment;
    const monthlyRate = rate / 12 / 100;
    const numberOfPayments = time * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: (monthlyPayment * numberOfPayments).toFixed(2),
        totalInterest: ((monthlyPayment * numberOfPayments) - principal).toFixed(2)
    };
}

console.log('MoneyCalcPro - Main JavaScript loaded');
