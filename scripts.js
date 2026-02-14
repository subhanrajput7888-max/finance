// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const thankYouSection = document.getElementById('thankYouSection');
    const backToForm = document.getElementById('backToForm');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if(name && email && message) {
                // In a real implementation, you would send the form data to a server
                // For now, we'll just show the thank you message
                contactForm.style.display = 'none';
                thankYouSection.style.display = 'block';
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    if(backToForm) {
        backToForm.addEventListener('click', function() {
            thankYouSection.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.reset();
        });
    }

    // Calculator functions
    initializeCalculators();
});

function initializeCalculators() {
    // Personal Loan EMI Calculator
    if(document.getElementById('personalLoanForm')) {
        document.getElementById('personalLoanForm').addEventListener('submit', calculatePersonalLoanEMI);
    }

    // Mortgage Calculator
    if(document.getElementById('mortgageForm')) {
        document.getElementById('mortgageForm').addEventListener('submit', calculateMortgage);
    }

    // Home Loan Calculator
    if(document.getElementById('homeLoanForm')) {
        document.getElementById('homeLoanForm').addEventListener('submit', calculateHomeLoan);
    }

    // Auto Loan Calculator
    if(document.getElementById('autoLoanForm')) {
        document.getElementById('autoLoanForm').addEventListener('submit', calculateAutoLoan);
    }

    // Student Loan Calculator
    if(document.getElementById('studentLoanForm')) {
        document.getElementById('studentLoanForm').addEventListener('submit', calculateStudentLoan);
    }

    // Loan Affordability Calculator
    if(document.getElementById('loanAffordabilityForm')) {
        document.getElementById('loanAffordabilityForm').addEventListener('submit', calculateLoanAffordability);
    }

    // Debt-to-Income Ratio Calculator
    if(document.getElementById('debtToIncomeForm')) {
        document.getElementById('debtToIncomeForm').addEventListener('submit', calculateDebtToIncomeRatio);
    }

    // Credit Card Interest Calculator
    if(document.getElementById('creditCardInterestForm')) {
        document.getElementById('creditCardInterestForm').addEventListener('submit', calculateCreditCardInterest);
    }

    // Life Insurance Calculator
    if(document.getElementById('lifeInsuranceForm')) {
        document.getElementById('lifeInsuranceForm').addEventListener('submit', calculateLifeInsurance);
    }

    // Term Insurance Calculator
    if(document.getElementById('termInsuranceForm')) {
        document.getElementById('termInsuranceForm').addEventListener('submit', calculateTermInsurance);
    }

    // Health Insurance Cost Estimator
    if(document.getElementById('healthInsuranceForm')) {
        document.getElementById('healthInsuranceForm').addEventListener('submit', calculateHealthInsuranceCost);
    }

    // Car Insurance Premium Calculator
    if(document.getElementById('carInsuranceForm')) {
        document.getElementById('carInsuranceForm').addEventListener('submit', calculateCarInsurancePremium);
    }

    // Home Insurance Calculator
    if(document.getElementById('homeInsuranceForm')) {
        document.getElementById('homeInsuranceForm').addEventListener('submit', calculateHomeInsurance);
    }

    // SIP Calculator
    if(document.getElementById('sipForm')) {
        document.getElementById('sipForm').addEventListener('submit', calculateSIP);
    }

    // Compound Interest Calculator
    if(document.getElementById('compoundInterestForm')) {
        document.getElementById('compoundInterestForm').addEventListener('submit', calculateCompoundInterest);
    }

    // Retirement Calculator
    if(document.getElementById('retirementForm')) {
        document.getElementById('retirementForm').addEventListener('submit', calculateRetirement);
    }

    // Investment Growth Calculator
    if(document.getElementById('investmentGrowthForm')) {
        document.getElementById('investmentGrowthForm').addEventListener('submit', calculateInvestmentGrowth);
    }

    // ROI Calculator
    if(document.getElementById('roiForm')) {
        document.getElementById('roiForm').addEventListener('submit', calculateROI);
    }

    // Income Tax Calculator
    if(document.getElementById('incomeTaxForm')) {
        document.getElementById('incomeTaxForm').addEventListener('submit', calculateIncomeTax);
    }

    // Salary Calculator
    if(document.getElementById('salaryForm')) {
        document.getElementById('salaryForm').addEventListener('submit', calculateSalary);
    }
}

// Personal Loan EMI Calculator
function calculatePersonalLoanEMI(e) {
    e.preventDefault();
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
    const months = parseInt(document.getElementById('months').value);

    if(principal && rate && months) {
        const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        document.getElementById('emiResult').innerHTML = `
            <div class="result-item">
                <span>Monthly EMI:</span>
                <span>$${emi.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Payment:</span>
                <span>$${totalPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>$${totalInterest.toFixed(2)}</span>
            </div>
        `;
    }
}

// Mortgage Calculator
function calculateMortgage(e) {
    e.preventDefault();
    const principal = parseFloat(document.getElementById('homePrice').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12 || 0;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12 || 0;

    const loanAmount = principal - downPayment;
    
    if(loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
        const monthlyPayment = loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm) / (Math.pow(1 + interestRate, loanTerm) - 1);
        const totalPayment = monthlyPayment * loanTerm;
        const totalInterest = totalPayment - loanAmount;

        document.getElementById('mortgageResult').innerHTML = `
            <div class="result-item">
                <span>Monthly Payment:</span>
                <span>$${monthlyPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Principal:</span>
                <span>$${loanAmount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>$${totalInterest.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Payment:</span>
                <span>$${totalPayment.toFixed(2)}</span>
            </div>
        `;
    }
}

// Home Loan Calculator
function calculateHomeLoan(e) {
    e.preventDefault();
    const principal = parseFloat(document.getElementById('homePrincipal').value);
    const rate = parseFloat(document.getElementById('homeRate').value) / 100 / 12;
    const months = parseInt(document.getElementById('homeMonths').value);

    if(principal && rate && months) {
        const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        document.getElementById('homeLoanResult').innerHTML = `
            <div class="result-item">
                <span>Monthly EMI:</span>
                <span>$${emi.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Payment:</span>
                <span>$${totalPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>$${totalInterest.toFixed(2)}</span>
            </div>
        `;
    }
}

// Auto Loan Calculator
function calculateAutoLoan(e) {
    e.preventDefault();
    const principal = parseFloat(document.getElementById('autoPrincipal').value);
    const rate = parseFloat(document.getElementById('autoRate').value) / 100 / 12;
    const months = parseInt(document.getElementById('autoMonths').value);

    if(principal && rate && months) {
        const monthlyPayment = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - principal;

        document.getElementById('autoLoanResult').innerHTML = `
            <div class="result-item">
                <span>Monthly Payment:</span>
                <span>$${monthlyPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Payment:</span>
                <span>$${totalPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>$${totalInterest.toFixed(2)}</span>
            </div>
        `;
    }
}

// Student Loan Calculator
function calculateStudentLoan(e) {
    e.preventDefault();
    const principal = parseFloat(document.getElementById('studentPrincipal').value);
    const rate = parseFloat(document.getElementById('studentRate').value) / 100 / 12;
    const months = parseInt(document.getElementById('studentMonths').value);

    if(principal && rate && months) {
        const monthlyPayment = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - principal;

        document.getElementById('studentLoanResult').innerHTML = `
            <div class="result-item">
                <span>Monthly Payment:</span>
                <span>$${monthlyPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Payment:</span>
                <span>$${totalPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>$${totalInterest.toFixed(2)}</span>
            </div>
        `;
    }
}

// Loan Affordability Calculator
function calculateLoanAffordability(e) {
    e.preventDefault();
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const monthlyDebt = parseFloat(document.getElementById('monthlyDebt').value) || 0;
    const interestRate = parseFloat(document.getElementById('affordabilityRate').value) / 100 / 12;
    const months = parseInt(document.getElementById('affordabilityMonths').value);

    if(monthlyIncome) {
        // Generally, debt payments shouldn't exceed 28% of gross monthly income
        const maxPayment = monthlyIncome * 0.28 - monthlyDebt;
        
        if(maxPayment > 0 && interestRate > 0 && months > 0) {
            const maxLoan = maxPayment * (Math.pow(1 + interestRate, months) - 1) / (interestRate * Math.pow(1 + interestRate, months));
            const totalPayment = maxPayment * months;
            const totalInterest = totalPayment - maxLoan;

            document.getElementById('affordabilityResult').innerHTML = `
                <div class="result-item">
                    <span>Maximum Monthly Payment:</span>
                    <span>$${maxPayment.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span>Maximum Loan Amount:</span>
                    <span>$${maxLoan.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span>Total Interest:</span>
                    <span>$${totalInterest.toFixed(2)}</span>
                </div>
            `;
        } else {
            document.getElementById('affordabilityResult').innerHTML = `
                <div class="result-item">
                    <span>Maximum Monthly Payment:</span>
                    <span>$${maxPayment.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span>Maximum Loan Amount:</span>
                    <span>$0.00</span>
                </div>
            `;
        }
    }
}

// Debt-to-Income Ratio Calculator
function calculateDebtToIncomeRatio(e) {
    e.preventDefault();
    const monthlyIncome = parseFloat(document.getElementById('dtiMonthlyIncome').value);
    const monthlyDebt = parseFloat(document.getElementById('dtiMonthlyDebt').value);

    if(monthlyIncome && monthlyDebt) {
        const dtiRatio = (monthlyDebt / monthlyIncome) * 100;

        document.getElementById('dtiResult').innerHTML = `
            <div class="result-item">
                <span>Debt-to-Income Ratio:</span>
                <span>${dtiRatio.toFixed(2)}%</span>
            </div>
            <div class="result-item">
                <span>Status:</span>
                <span>${getDTIStatus(dtiRatio)}</span>
            </div>
        `;
    }
}

function getDTIStatus(ratio) {
    if(ratio <= 36) return 'Good';
    else if(ratio <= 43) return 'Acceptable';
    else return 'High Risk';
}

// Credit Card Interest Calculator
function calculateCreditCardInterest(e) {
    e.preventDefault();
    const balance = parseFloat(document.getElementById('ccBalance').value);
    const apr = parseFloat(document.getElementById('ccApr').value) / 100;
    const monthlyPayment = parseFloat(document.getElementById('ccPayment').value);

    if(balance && apr && monthlyPayment) {
        const monthlyRate = apr / 12;
        const months = Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate);
        const totalPaid = monthlyPayment * months;
        const totalInterest = totalPaid - balance;

        document.getElementById('ccResult').innerHTML = `
            <div class="result-item">
                <span>Months to Pay Off:</span>
                <span>${Math.ceil(months)}</span>
            </div>
            <div class="result-item">
                <span>Total Amount Paid:</span>
                <span>$${totalPaid.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>$${totalInterest.toFixed(2)}</span>
            </div>
        `;
    }
}

// Life Insurance Calculator
function calculateLifeInsurance(e) {
    e.preventDefault();
    const income = parseFloat(document.getElementById('annualIncome').value);
    const expenses = parseFloat(document.getElementById('annualExpenses').value);
    const dependents = parseInt(document.getElementById('dependents').value);
    const years = parseInt(document.getElementById('incomeYears').value);

    if(income && expenses && dependents && years) {
        // Simple calculation: annual income * number of years * dependents factor
        const coverage = (income * years) + (expenses * years);
        const adjustedCoverage = coverage * (1 + (dependents * 0.2)); // Factor for dependents

        document.getElementById('lifeInsuranceResult').innerHTML = `
            <div class="result-item">
                <span>Recommended Coverage:</span>
                <span>$${adjustedCoverage.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Based on ${years} years of income</span>
            </div>
        `;
    }
}

// Term Insurance Calculator
function calculateTermInsurance(e) {
    e.preventDefault();
    const age = parseInt(document.getElementById('insuredAge').value);
    const sumAssured = parseFloat(document.getElementById('sumAssured').value);
    const term = parseInt(document.getElementById('insuranceTerm').value);
    const gender = document.getElementById('gender').value;

    if(age && sumAssured && term) {
        // Simplified premium calculation based on age, sum assured, and term
        let baseRate = 0.001; // Base rate per $1000 of coverage
        
        // Adjust rate based on age (simplified)
        if(age >= 50) baseRate *= 1.5;
        else if(age >= 40) baseRate *= 1.2;
        else if(age >= 30) baseRate *= 1.1;
        
        // Adjust for gender (typically male rates are higher)
        if(gender === 'male') baseRate *= 1.1;
        
        // Adjust for term (longer terms may have slightly lower rates)
        if(term > 20) baseRate *= 0.9;
        else if(term > 10) baseRate *= 0.95;
        
        const premium = (sumAssured / 1000) * baseRate * term;

        document.getElementById('termInsuranceResult').innerHTML = `
            <div class="result-item">
                <span>Estimated Annual Premium:</span>
                <span>$${premium.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>For ${term}-year term policy</span>
            </div>
        `;
    }
}

// Health Insurance Cost Estimator
function calculateHealthInsuranceCost(e) {
    e.preventDefault();
    const age = parseInt(document.getElementById('healthAge').value);
    const income = parseFloat(document.getElementById('healthIncome').value);
    const tobacco = document.getElementById('tobacco').value;
    const region = document.getElementById('region').value;

    if(age && income) {
        let basePremium = 300; // Base monthly premium
        
        // Adjust for age
        if(age >= 50) basePremium *= 1.8;
        else if(age >= 40) basePremium *= 1.5;
        else if(age >= 30) basePremium *= 1.2;
        
        // Adjust for tobacco use
        if(tobacco === 'yes') basePremium *= 1.5;
        
        // Adjust for region (simplified)
        if(region === 'high-cost') basePremium *= 1.3;
        else if(region === 'low-cost') basePremium *= 0.8;
        
        const annualCost = basePremium * 12;
        const outOfPocketMax = basePremium * 3; // Simplified estimate

        document.getElementById('healthInsuranceResult').innerHTML = `
            <div class="result-item">
                <span>Monthly Premium:</span>
                <span>$${basePremium.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Annual Premium:</span>
                <span>$${annualCost.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Estimated Out-of-Pocket Max:</span>
                <span>$${outOfPocketMax.toFixed(2)}</span>
            </div>
        `;
    }
}

// Car Insurance Premium Calculator
function calculateCarInsurancePremium(e) {
    e.preventDefault();
    const age = parseInt(document.getElementById('driverAge').value);
    const vehicleValue = parseFloat(document.getElementById('vehicleValue').value);
    const vehicleAge = parseInt(document.getElementById('vehicleAge').value);
    const coverage = document.getElementById('coverageType').value;

    if(age && vehicleValue && vehicleAge) {
        let basePremium = 1000; // Base annual premium
        
        // Adjust for driver age
        if(age < 25) basePremium *= 1.8;
        else if(age < 30) basePremium *= 1.3;
        else if(age > 70) basePremium *= 1.1;
        
        // Adjust for vehicle value
        basePremium += (vehicleValue * 0.005); // 0.5% of vehicle value
        
        // Adjust for vehicle age
        if(vehicleAge > 10) basePremium *= 0.9;
        else if(vehicleAge > 5) basePremium *= 0.95;
        
        // Adjust for coverage type
        if(coverage === 'comprehensive') basePremium *= 1.5;
        else if(coverage === 'collision') basePremium *= 1.2;
        
        const monthlyPremium = basePremium / 12;

        document.getElementById('carInsuranceResult').innerHTML = `
            <div class="result-item">
                <span>Annual Premium:</span>
                <span>$${basePremium.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Monthly Premium:</span>
                <span>$${monthlyPremium.toFixed(2)}</span>
            </div>
        `;
    }
}

// Home Insurance Calculator
function calculateHomeInsurance(e) {
    e.preventDefault();
    const homeValue = parseFloat(document.getElementById('homeValue').value);
    const constructionYear = parseInt(document.getElementById('constructionYear').value);
    const locationRisk = document.getElementById('locationRisk').value;
    const coverageType = document.getElementById('homeCoverage').value;

    if(homeValue) {
        let basePremium = 1200; // Base annual premium
        
        // Adjust for home value
        basePremium += (homeValue * 0.001); // 0.1% of home value
        
        // Adjust for construction year
        const currentYear = new Date().getFullYear();
        const age = currentYear - constructionYear;
        if(age > 30) basePremium *= 1.3;
        else if(age > 20) basePremium *= 1.1;
        
        // Adjust for location risk
        if(locationRisk === 'high') basePremium *= 1.5;
        else if(locationRisk === 'medium') basePremium *= 1.2;
        
        // Adjust for coverage type
        if(coverageType === 'premium') basePremium *= 1.3;
        else if(coverageType === 'basic') basePremium *= 0.8;
        
        const monthlyPremium = basePremium / 12;

        document.getElementById('homeInsuranceResult').innerHTML = `
            <div class="result-item">
                <span>Annual Premium:</span>
                <span>$${basePremium.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Monthly Premium:</span>
                <span>$${monthlyPremium.toFixed(2)}</span>
            </div>
        `;
    }
}

// SIP Calculator
function calculateSIP(e) {
    e.preventDefault();
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const annualReturn = parseFloat(document.getElementById('annualReturn').value) / 100;
    const years = parseInt(document.getElementById('investmentYears').value);

    if(monthlyInvestment && annualReturn && years) {
        const monthlyReturn = annualReturn / 12;
        const months = years * 12;
        
        // Future value of SIP calculation
        const futureValue = monthlyInvestment * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn * (1 + monthlyReturn);
        const totalInvested = monthlyInvestment * months;
        const wealthGained = futureValue - totalInvested;

        document.getElementById('sipResult').innerHTML = `
            <div class="result-item">
                <span>Total Invested:</span>
                <span>$${totalInvested.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Future Value:</span>
                <span>$${futureValue.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Wealth Gained:</span>
                <span>$${wealthGained.toFixed(2)}</span>
            </div>
        `;
    }
}

// Compound Interest Calculator
function calculateCompoundInterest(e) {
    e.preventDefault();
    const principal = parseFloat(document.getElementById('ciPrincipal').value);
    const annualRate = parseFloat(document.getElementById('ciRate').value) / 100;
    const years = parseInt(document.getElementById('ciYears').value);
    const compoundingFrequency = parseInt(document.getElementById('ciFrequency').value);

    if(principal && annualRate && years && compoundingFrequency) {
        const amount = principal * Math.pow((1 + (annualRate / compoundingFrequency)), (compoundingFrequency * years));
        const interest = amount - principal;

        document.getElementById('compoundInterestResult').innerHTML = `
            <div class="result-item">
                <span>Principal Amount:</span>
                <span>$${principal.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Final Amount:</span>
                <span>$${amount.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>$${interest.toFixed(2)}</span>
            </div>
        `;
    }
}

// Retirement Calculator
function calculateRetirement(e) {
    e.preventDefault();
    const currentAge = parseInt(document.getElementById('currentAge').value);
    const retirementAge = parseInt(document.getElementById('retirementAge').value);
    const currentSavings = parseFloat(document.getElementById('currentSavings').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const annualReturn = parseFloat(document.getElementById('retirementReturn').value) / 100;

    if(currentAge && retirementAge && annualReturn) {
        const yearsToRetirement = retirementAge - currentAge;
        const monthsToRetirement = yearsToRetirement * 12;
        
        let futureValue = currentSavings;
        
        if(monthlyContribution > 0) {
            const monthlyRate = annualReturn / 12;
            if(monthlyRate > 0) {
                futureValue = currentSavings * Math.pow(1 + monthlyRate, monthsToRetirement) + 
                             monthlyContribution * (Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate;
            } else {
                futureValue = currentSavings + (monthlyContribution * monthsToRetirement);
            }
        }

        document.getElementById('retirementResult').innerHTML = `
            <div class="result-item">
                <span>Years Until Retirement:</span>
                <span>${yearsToRetirement}</span>
            </div>
            <div class="result-item">
                <span>Estimated Savings at Retirement:</span>
                <span>$${futureValue.toFixed(2)}</span>
            </div>
        `;
    }
}

// Investment Growth Calculator
function calculateInvestmentGrowth(e) {
    e.preventDefault();
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const annualReturn = parseFloat(document.getElementById('invGrowthRate').value) / 100;
    const years = parseInt(document.getElementById('invGrowthYears').value);
    const monthlyContribution = parseFloat(document.getElementById('invGrowthMonthly').value) || 0;

    if(initialInvestment && annualReturn && years) {
        const monthlyRate = annualReturn / 12;
        const months = years * 12;
        
        let futureValue = initialInvestment;
        
        if(monthlyContribution > 0) {
            if(monthlyRate > 0) {
                futureValue = initialInvestment * Math.pow(1 + monthlyRate, months) + 
                             monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
            } else {
                futureValue = initialInvestment + (monthlyContribution * months);
            }
        } else {
            futureValue = initialInvestment * Math.pow(1 + annualReturn, years);
        }
        
        const totalContributions = initialInvestment + (monthlyContribution * months);
        const growth = futureValue - totalContributions;

        document.getElementById('investmentGrowthResult').innerHTML = `
            <div class="result-item">
                <span>Initial Investment:</span>
                <span>$${initialInvestment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Contributions:</span>
                <span>$${totalContributions.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Future Value:</span>
                <span>$${futureValue.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Growth:</span>
                <span>$${growth.toFixed(2)}</span>
            </div>
        `;
    }
}

// ROI Calculator
function calculateROI(e) {
    e.preventDefault();
    const initialInvestment = parseFloat(document.getElementById('initialInv').value);
    const finalValue = parseFloat(document.getElementById('finalValue').value);

    if(initialInvestment && finalValue) {
        const roi = ((finalValue - initialInvestment) / initialInvestment) * 100;
        const profit = finalValue - initialInvestment;

        document.getElementById('roiResult').innerHTML = `
            <div class="result-item">
                <span>Return on Investment (ROI):</span>
                <span>${roi.toFixed(2)}%</span>
            </div>
            <div class="result-item">
                <span>Profit/Loss:</span>
                <span>$${profit.toFixed(2)}</span>
            </div>
        `;
    }
}

// Income Tax Calculator
function calculateIncomeTax(e) {
    e.preventDefault();
    const income = parseFloat(document.getElementById('taxableIncome').value);
    const filingStatus = document.getElementById('filingStatus').value;

    if(income) {
        let tax = 0;
        
        // Simplified US tax brackets (2023)
        if(filingStatus === 'single') {
            if(income > 578125) tax = 174238.25 + (income - 578125) * 0.37;
            else if(income > 231250) tax = 52832 + (income - 231250) * 0.35;
            else if(income > 182100) tax = 37104 + (income - 182100) * 0.32;
            else if(income > 95375) tax = 16290 + (income - 95375) * 0.24;
            else if(income > 44725) tax = 4664 + (income - 44725) * 0.22;
            else if(income > 11000) tax = 0 + (income - 11000) * 0.12;
            else tax = income * 0.10;
        } else if(filingStatus === 'married-joint') {
            if(income > 693750) tax = 186601.50 + (income - 693750) * 0.37;
            else if(income > 462500) tax = 105664 + (income - 462500) * 0.35;
            else if(income > 364200) tax = 74208 + (income - 364200) * 0.32;
            else if(income > 190750) tax = 32580 + (income - 190750) * 0.24;
            else if(income > 89450) tax = 9328 + (income - 89450) * 0.22;
            else if(income > 22000) tax = 0 + (income - 22000) * 0.12;
            else tax = income * 0.10;
        } else if(filingStatus === 'head-of-household') {
            if(income > 578100) tax = 174482.50 + (income - 578100) * 0.37;
            else if(income > 231250) tax = 52850 + (income - 231250) * 0.35;
            else if(income > 182100) tax = 37104 + (income - 182100) * 0.32;
            else if(income > 95350) tax = 16290 + (income - 95350) * 0.24;
            else if(income > 54200) tax = 6220 + (income - 54200) * 0.22;
            else if(income > 15700) tax = 0 + (income - 15700) * 0.12;
            else tax = income * 0.10;
        }
        
        const effectiveTaxRate = (tax / income) * 100;

        document.getElementById('taxResult').innerHTML = `
            <div class="result-item">
                <span>Tax Liability:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Effective Tax Rate:</span>
                <span>${effectiveTaxRate.toFixed(2)}%</span>
            </div>
            <div class="result-item">
                <span>After-Tax Income:</span>
                <span>$${(income - tax).toFixed(2)}</span>
            </div>
        `;
    }
}

// Salary Calculator
function calculateSalary(e) {
    e.preventDefault();
    const annualSalary = parseFloat(document.getElementById('annualSalary').value);
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const stateTaxRate = 0.05; // Simplified average state tax

    if(annualSalary) {
        const grossIncome = annualSalary + bonus;
        const socialSecurity = annualSalary * socialSecurityRate;
        const medicare = grossIncome * medicareRate;
        const stateTax = annualSalary * stateTaxRate;
        
        // Assuming federal tax rate of 12% for simplicity
        const federalTax = annualSalary * 0.12;
        
        const totalDeductions = socialSecurity + medicare + stateTax + federalTax;
        const netIncome = grossIncome - totalDeductions;
        const monthlyNet = netIncome / 12;

        document.getElementById('salaryResult').innerHTML = `
            <div class="result-item">
                <span>Gross Annual Income:</span>
                <span>$${grossIncome.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Social Security (6.2%):</span>
                <span>$${socialSecurity.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Medicare (1.45%):</span>
                <span>$${medicare.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Federal Tax (12%):</span>
                <span>$${federalTax.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>State Tax (5%):</span>
                <span>$${stateTax.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Total Deductions:</span>
                <span>$${totalDeductions.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Net Annual Income:</span>
                <span>$${netIncome.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span>Net Monthly Income:</span>
                <span>$${monthlyNet.toFixed(2)}</span>
            </div>
        `;
    }
}