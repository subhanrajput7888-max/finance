// MoneyCalcPro - Tools Functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeAllTools();
});

function initializeAllTools() {
    // 1. EMI Calculator
    const emiBtn = document.getElementById('emiCalculate');
    if (emiBtn) {
        emiBtn.addEventListener('click', calculateEMIHandler);
    }

    // 2. Loan Calculator
    const loanBtn = document.getElementById('loanCalculate');
    if (loanBtn) {
        loanBtn.addEventListener('click', calculateLoanHandler);
    }

    // 3. Age Calculator
    const ageBtn = document.getElementById('ageCalculate');
    if (ageBtn) {
        ageBtn.addEventListener('click', calculateAgeHandler);
    }

    // 4. BMI Calculator
    const bmiBtn = document.getElementById('bmiCalculate');
    if (bmiBtn) {
        bmiBtn.addEventListener('click', calculateBMIHandler);
    }

    // 5. Percentage Calculator
    const percentBtn = document.getElementById('percentCalculate');
    if (percentBtn) {
        percentBtn.addEventListener('click', calculatePercentageHandler);
    }

    // 6. Currency Converter
    const currencyBtn = document.getElementById('currencyConvert');
    if (currencyBtn) {
        currencyBtn.addEventListener('click', convertCurrencyHandler);
    }

    // 7. Discount Calculator
    const discountBtn = document.getElementById('discountCalculate');
    if (discountBtn) {
        discountBtn.addEventListener('click', calculateDiscountHandler);
    }

    // 8. GST Calculator
    const gstBtn = document.getElementById('gstCalculate');
    if (gstBtn) {
        gstBtn.addEventListener('click', calculateGSTHandler);
    }

    // 9. Password Generator
    const passwordBtn = document.getElementById('generatePassword');
    if (passwordBtn) {
        passwordBtn.addEventListener('click', generatePasswordHandler);
    }

    // 10. Unit Converter
    const unitBtn = document.getElementById('unitConvert');
    if (unitBtn) {
        unitBtn.addEventListener('click', convertUnitHandler);
    }

    // 11. Time Calculator
    const timeBtn = document.getElementById('timeCalculate');
    if (timeBtn) {
        timeBtn.addEventListener('click', calculateTimeHandler);
    }

    // 12. Investment Calculator
    const investBtn = document.getElementById('investCalculate');
    if (investBtn) {
        investBtn.addEventListener('click', calculateInvestmentHandler);
    }

    // 13. Mortgage Calculator
    const mortgageBtn = document.getElementById('mortgageCalculate');
    if (mortgageBtn) {
        mortgageBtn.addEventListener('click', calculateMortgageHandler);
    }

    // 14. Profit/Loss Calculator
    const profitBtn = document.getElementById('profitCalculate');
    if (profitBtn) {
        profitBtn.addEventListener('click', calculateProfitLossHandler);
    }

    // 15. Random Number Generator
    const randomBtn = document.getElementById('generateRandom');
    if (randomBtn) {
        randomBtn.addEventListener('click', generateRandomHandler);
    }
}

// 1. EMI Calculator Handler
function calculateEMIHandler() {
    const principal = parseFloat(document.getElementById('emiPrincipal').value);
    const rate = parseFloat(document.getElementById('emiRate').value);
    const time = parseFloat(document.getElementById('emiTime').value);
    const resultDiv = document.getElementById('emiResult');

    if (!principal || !rate || !time) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const emi = calculateEMI(principal, rate, time);
    const totalPayment = (emi * time).toFixed(2);
    const totalInterest = (totalPayment - principal).toFixed(2);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">Monthly EMI: <strong>${formatCurrency(emi)}</strong></div>
        <div style="font-size: 0.9rem;">Total Payment: ${formatCurrency(totalPayment)}</div>
        <div style="font-size: 0.9rem;">Total Interest: ${formatCurrency(totalInterest)}</div>
    `;
}

// 2. Loan Calculator Handler
function calculateLoanHandler() {
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('loanRate').value);
    const tenure = parseFloat(document.getElementById('loanTenure').value);
    const resultDiv = document.getElementById('loanResult');

    if (!amount || !rate || !tenure) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const monthlyPayment = calculateEMI(amount, rate, tenure);
    const totalPayment = (monthlyPayment * tenure).toFixed(2);
    const totalInterest = (totalPayment - amount).toFixed(2);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">Monthly Payment: <strong>${formatCurrency(monthlyPayment)}</strong></div>
        <div style="font-size: 0.9rem;">Total Amount: ${formatCurrency(totalPayment)}</div>
        <div style="font-size: 0.9rem;">Total Interest: ${formatCurrency(totalInterest)}</div>
    `;
}

// 3. Age Calculator Handler
function calculateAgeHandler() {
    const birthDate = document.getElementById('ageDob').value;
    const resultDiv = document.getElementById('ageResult');

    if (!birthDate) {
        showNotification('Please select your date of birth', 'error');
        return;
    }

    const age = calculateAge(birthDate);
    const birth = new Date(birthDate);
    const today = new Date();
    
    // Calculate months and days
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        months += 12;
    }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">Your Age: <strong>${age} years, ${months} months, ${days} days</strong></div>
        <div style="font-size: 0.9rem;">Total Days Lived: ${formatNumber(totalDays)} days</div>
        <div style="font-size: 0.9rem;">Next Birthday: ${getNextBirthday(birthDate)}</div>
    `;
}

function getNextBirthday(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    return `${daysUntil} days away`;
}

// 4. BMI Calculator Handler
function calculateBMIHandler() {
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const height = parseFloat(document.getElementById('bmiHeight').value);
    const resultDiv = document.getElementById('bmiResult');

    if (!weight || !height) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(parseFloat(bmi));

    let healthTip = '';
    if (category === 'Underweight') {
        healthTip = 'Consider consulting a nutritionist for a healthy weight gain plan.';
    } else if (category === 'Normal weight') {
        healthTip = 'Great job! Maintain your healthy lifestyle.';
    } else if (category === 'Overweight') {
        healthTip = 'Consider regular exercise and a balanced diet.';
    } else {
        healthTip = 'Please consult a healthcare professional for guidance.';
    }

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">Your BMI: <strong>${bmi}</strong></div>
        <div style="font-size: 1rem;">Category: ${category}</div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem;">${healthTip}</div>
    `;
}

// 5. Percentage Calculator Handler
function calculatePercentageHandler() {
    const value = parseFloat(document.getElementById('percentValue').value);
    const total = parseFloat(document.getElementById('percentTotal').value);
    const resultDiv = document.getElementById('percentResult');

    if (!value || !total) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const percentage = calculatePercentage(value, total);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div><strong>${value}</strong> is <strong>${percentage}%</strong> of <strong>${total}</strong></div>
    `;
}

// 6. Currency Converter Handler
function convertCurrencyHandler() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const from = document.getElementById('currencyFrom').value;
    const to = document.getElementById('currencyTo').value;
    const resultDiv = document.getElementById('currencyResult');

    if (!amount) {
        showNotification('Please enter an amount', 'error');
        return;
    }

    const converted = convertCurrency(amount, from, to);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div><strong>${amount} ${from}</strong> = <strong>${converted} ${to}</strong></div>
        <div style="font-size: 0.85rem; margin-top: 0.5rem;">* Rates are approximate and for reference only</div>
    `;
}

// 7. Discount Calculator Handler
function calculateDiscountHandler() {
    const price = parseFloat(document.getElementById('discountPrice').value);
    const discount = parseFloat(document.getElementById('discountPercent').value);
    const resultDiv = document.getElementById('discountResult');

    if (!price || !discount) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const result = calculateDiscount(price, discount);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">Final Price: <strong>${formatCurrency(result.finalPrice)}</strong></div>
        <div style="font-size: 0.9rem;">You Save: ${formatCurrency(result.discountAmount)}</div>
    `;
}

// 8. GST Calculator Handler
function calculateGSTHandler() {
    const amount = parseFloat(document.getElementById('gstAmount').value);
    const gstPercent = parseFloat(document.getElementById('gstPercent').value);
    const isInclusive = document.getElementById('gstInclusive').checked;
    const resultDiv = document.getElementById('gstResult');

    if (!amount || !gstPercent) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const result = calculateGST(amount, gstPercent, isInclusive);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">GST Amount: <strong>${formatCurrency(result.gstAmount)}</strong></div>
        <div style="font-size: 0.9rem;">Total Amount: ${formatCurrency(result.totalAmount)}</div>
    `;
}

// 9. Password Generator Handler
function generatePasswordHandler() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const uppercase = document.getElementById('passUppercase').checked;
    const lowercase = document.getElementById('passLowercase').checked;
    const numbers = document.getElementById('passNumbers').checked;
    const symbols = document.getElementById('passSymbols').checked;
    const resultDiv = document.getElementById('passwordResult');

    const password = generatePassword(length, { uppercase, lowercase, numbers, symbols });

    // Create copy button safely to prevent XSS
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-secondary';
    copyBtn.style.cssText = 'padding: 0.5rem 1rem; font-size: 0.9rem; margin-top: 1rem;';
    copyBtn.textContent = 'Copy Password';
    copyBtn.addEventListener('click', () => copyToClipboard(password));

    resultDiv.innerHTML = `
        <div style="margin-bottom: 1rem; word-break: break-all; font-family: monospace; font-size: 1.2rem;">
            <strong>${password}</strong>
        </div>
    `;
    resultDiv.appendChild(copyBtn);
}

// 10. Unit Converter Handler
function convertUnitHandler() {
    const value = parseFloat(document.getElementById('unitValue').value);
    const from = document.getElementById('unitFrom').value;
    const to = document.getElementById('unitTo').value;
    const category = document.getElementById('unitCategory').value;
    const resultDiv = document.getElementById('unitResult');

    if (!value) {
        showNotification('Please enter a value', 'error');
        return;
    }

    const converted = convertUnit(value, from, to, category);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div><strong>${value} ${from}</strong> = <strong>${converted} ${to}</strong></div>
    `;
}

// 11. Time Calculator Handler
function calculateTimeHandler() {
    const hours1 = parseInt(document.getElementById('timeHours1').value) || 0;
    const minutes1 = parseInt(document.getElementById('timeMinutes1').value) || 0;
    const hours2 = parseInt(document.getElementById('timeHours2').value) || 0;
    const minutes2 = parseInt(document.getElementById('timeMinutes2').value) || 0;
    const resultDiv = document.getElementById('timeResult');

    const result = addTime(hours1, minutes1, hours2, minutes2);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div><strong>Total Time: ${result.hours} hours and ${result.minutes} minutes</strong></div>
    `;
}

// 12. Investment Calculator Handler
function calculateInvestmentHandler() {
    const principal = parseFloat(document.getElementById('investPrincipal').value);
    const rate = parseFloat(document.getElementById('investRate').value);
    const time = parseFloat(document.getElementById('investTime').value);
    const resultDiv = document.getElementById('investResult');

    if (!principal || !rate || !time) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const result = calculateInvestment(principal, rate, time);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">Total Amount: <strong>${formatCurrency(result.totalAmount)}</strong></div>
        <div style="font-size: 0.9rem;">Interest Earned: ${formatCurrency(result.interestEarned)}</div>
    `;
}

// 13. Mortgage Calculator Handler
function calculateMortgageHandler() {
    const homePrice = parseFloat(document.getElementById('mortgagePrice').value);
    const downPayment = parseFloat(document.getElementById('mortgageDown').value);
    const rate = parseFloat(document.getElementById('mortgageRate').value);
    const time = parseFloat(document.getElementById('mortgageTime').value);
    const resultDiv = document.getElementById('mortgageResult');

    if (!homePrice || !rate || !time) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const result = calculateMortgage(homePrice, downPayment || 0, rate, time);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem;">Monthly Payment: <strong>${formatCurrency(result.monthlyPayment)}</strong></div>
        <div style="font-size: 0.9rem;">Total Payment: ${formatCurrency(result.totalPayment)}</div>
        <div style="font-size: 0.9rem;">Total Interest: ${formatCurrency(result.totalInterest)}</div>
    `;
}

// 14. Profit/Loss Calculator Handler
function calculateProfitLossHandler() {
    const costPrice = parseFloat(document.getElementById('profitCost').value);
    const sellingPrice = parseFloat(document.getElementById('profitSelling').value);
    const resultDiv = document.getElementById('profitResult');

    if (!costPrice || !sellingPrice) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const result = calculateProfitLoss(costPrice, sellingPrice);

    const color = result.type === 'Profit' ? '#10b981' : result.type === 'Loss' ? '#ef4444' : '#f59e0b';

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 0.5rem; color: ${color};">
            <strong>${result.type}: ${formatCurrency(result.amount)}</strong>
        </div>
        <div style="font-size: 0.9rem;">Percentage: ${result.percentage}%</div>
    `;
}

// 15. Random Number Generator Handler
function generateRandomHandler() {
    const min = parseInt(document.getElementById('randomMin').value);
    const max = parseInt(document.getElementById('randomMax').value);
    const resultDiv = document.getElementById('randomResult');

    if (min === '' || max === '') {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (min >= max) {
        showNotification('Minimum must be less than maximum', 'error');
        return;
    }

    const randomNumber = generateRandomNumber(min, max);

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="font-size: 2rem; font-weight: bold;"><strong>${randomNumber}</strong></div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem;">Range: ${min} to ${max}</div>
    `;
}

console.log('MoneyCalcPro - Tools JavaScript loaded');
