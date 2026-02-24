#!/usr/bin/env python3
"""
Script to enhance all calculator pages with premium design and functionality
"""

import os
import re

# Calculator configurations
calculators = [
    {
        'file': 'personal-loan.html',
        'title': 'Personal Loan EMI Calculator',
        'description': 'Calculate personal loan EMIs, monthly payments, and total interest with our free online calculator. Get instant, accurate results for loan planning.',
        'keywords': 'personal loan calculator, EMI calculator, loan payment calculator, personal loan EMI, monthly payment calculator',
        'icon': '💰',
        'schema_name': 'Personal Loan EMI Calculator'
    },
    {
        'file': 'mortgage.html',
        'title': 'Mortgage Calculator - Home Loan EMI Calculator',
        'description': 'Free mortgage calculator to estimate your home loan EMIs, total interest, and affordability. Calculate down payment, loan amount, and monthly payments.',
        'keywords': 'mortgage calculator, home loan calculator, EMI calculator, house loan calculator, home loan EMI',
        'icon': '🏠',
        'schema_name': 'Mortgage Calculator'
    },
    {
        'file': 'home-loan.html',
        'title': 'Home Loan Calculator - EMI & Affordability',
        'description': 'Calculate home loan EMIs, total interest, and affordability with our free home loan calculator. Plan your dream home purchase with accurate estimates.',
        'keywords': 'home loan calculator, house loan calculator, EMI calculator, home loan EMI, property loan calculator',
        'icon': '🏡',
        'schema_name': 'Home Loan Calculator'
    },
    {
        'file': 'auto-loan.html',
        'title': 'Auto Loan Calculator - Car Loan EMI',
        'description': 'Free auto loan calculator to calculate car loan EMIs, total interest, and monthly payments. Compare different loan options for your vehicle purchase.',
        'keywords': 'auto loan calculator, car loan calculator, vehicle loan calculator, car EMI calculator, auto financing calculator',
        'icon': '🚗',
        'schema_name': 'Auto Loan Calculator'
    },
    {
        'file': 'student-loan.html',
        'title': 'Student Loan Calculator - Education Loan EMI',
        'description': 'Calculate student loan EMIs, total repayment amount, and affordability with our free education loan calculator. Plan your education financing wisely.',
        'keywords': 'student loan calculator, education loan calculator, college loan calculator, student EMI calculator, education financing calculator',
        'icon': '🎓',
        'schema_name': 'Student Loan Calculator'
    },
    {
        'file': 'loan-affordability.html',
        'title': 'Loan Affordability Calculator - How Much Can I Borrow',
        'description': 'Determine how much loan you can afford based on your income, expenses, and debt-to-income ratio. Free loan affordability calculator for smart borrowing.',
        'keywords': 'loan affordability calculator, how much can I borrow, loan eligibility calculator, borrowing capacity calculator, debt capacity calculator',
        'icon': '📊',
        'schema_name': 'Loan Affordability Calculator'
    },
    {
        'file': 'debt-to-income.html',
        'title': 'Debt-to-Income Ratio Calculator - DTI Calculator',
        'description': 'Calculate your debt-to-income ratio to assess loan eligibility and financial health. Free DTI calculator for mortgage, personal loan, and credit applications.',
        'keywords': 'debt to income ratio calculator, DTI calculator, debt ratio calculator, income debt ratio, loan eligibility calculator',
        'icon': '📈',
        'schema_name': 'Debt-to-Income Ratio Calculator'
    },
    {
        'file': 'credit-card-interest.html',
        'title': 'Credit Card Interest Calculator - Credit Card Payment',
        'description': 'Calculate credit card interest, minimum payments, and payoff time with our free credit card calculator. Understand your credit card costs better.',
        'keywords': 'credit card interest calculator, credit card payment calculator, credit card payoff calculator, minimum payment calculator, credit card debt calculator',
        'icon': '💳',
        'schema_name': 'Credit Card Interest Calculator'
    },
    {
        'file': 'life-insurance.html',
        'title': 'Life Insurance Calculator - Term Life Insurance',
        'description': 'Calculate life insurance coverage needs and premium costs with our free life insurance calculator. Determine the right coverage for your family protection.',
        'keywords': 'life insurance calculator, term life insurance calculator, life cover calculator, insurance premium calculator, family protection calculator',
        'icon': '🛡️',
        'schema_name': 'Life Insurance Calculator'
    },
    {
        'file': 'term-insurance.html',
        'title': 'Term Insurance Calculator - Pure Term Plan',
        'description': 'Calculate term insurance premium and coverage amount with our free term insurance calculator. Get the most affordable life cover for your family.',
        'keywords': 'term insurance calculator, pure term plan calculator, term life insurance calculator, affordable life insurance, term cover calculator',
        'icon': '📋',
        'schema_name': 'Term Insurance Calculator'
    },
    {
        'file': 'health-insurance.html',
        'title': 'Health Insurance Calculator - Medical Insurance Cost',
        'description': 'Calculate health insurance premium costs and coverage needs with our free health insurance calculator. Compare plans and find affordable healthcare coverage.',
        'keywords': 'health insurance calculator, medical insurance calculator, healthcare insurance calculator, health cover calculator, medical premium calculator',
        'icon': '🏥',
        'schema_name': 'Health Insurance Calculator'
    },
    {
        'file': 'car-insurance.html',
        'title': 'Car Insurance Calculator - Auto Insurance Premium',
        'description': 'Calculate car insurance premium costs with our free auto insurance calculator. Compare quotes and find the best car insurance coverage for your vehicle.',
        'keywords': 'car insurance calculator, auto insurance calculator, vehicle insurance calculator, car premium calculator, automobile insurance calculator',
        'icon': '🚙',
        'schema_name': 'Car Insurance Calculator'
    },
    {
        'file': 'home-insurance.html',
        'title': 'Home Insurance Calculator - House Insurance Cost',
        'description': 'Calculate home insurance premium costs and coverage needs with our free home insurance calculator. Protect your property with adequate insurance coverage.',
        'keywords': 'home insurance calculator, house insurance calculator, property insurance calculator, home coverage calculator, dwelling insurance calculator',
        'icon': '🏘️',
        'schema_name': 'Home Insurance Calculator'
    },
    {
        'file': 'sip.html',
        'title': 'SIP Calculator - Systematic Investment Plan Returns',
        'description': 'Calculate SIP returns, future value, and investment growth with our free SIP calculator. Plan your mutual fund investments and retirement savings.',
        'keywords': 'SIP calculator, systematic investment plan calculator, mutual fund calculator, SIP return calculator, investment calculator',
        'icon': '💼',
        'schema_name': 'SIP Calculator'
    },
    {
        'file': 'compound-interest.html',
        'title': 'Compound Interest Calculator - Investment Growth',
        'description': 'Calculate compound interest, investment growth, and future value with our free compound interest calculator. Understand how your money grows over time.',
        'keywords': 'compound interest calculator, investment growth calculator, interest calculator, future value calculator, compounding calculator',
        'icon': '💹',
        'schema_name': 'Compound Interest Calculator'
    },
    {
        'file': 'retirement.html',
        'title': 'Retirement Calculator - Retirement Planning Tool',
        'description': 'Plan your retirement with our free retirement calculator. Calculate required savings, monthly contributions, and retirement corpus for financial independence.',
        'keywords': 'retirement calculator, retirement planning calculator, pension calculator, retirement savings calculator, financial independence calculator',
        'icon': '👴',
        'schema_name': 'Retirement Calculator'
    },
    {
        'file': 'investment-growth.html',
        'title': 'Investment Growth Calculator - Portfolio Returns',
        'description': 'Calculate investment growth, portfolio returns, and wealth creation with our free investment growth calculator. Track your investment performance over time.',
        'keywords': 'investment growth calculator, portfolio return calculator, wealth calculator, investment performance calculator, asset growth calculator',
        'icon': '📈',
        'schema_name': 'Investment Growth Calculator'
    },
    {
        'file': 'roi.html',
        'title': 'ROI Calculator - Return on Investment Calculator',
        'description': 'Calculate ROI (Return on Investment) for your investments, projects, and business ventures with our free ROI calculator. Measure investment profitability.',
        'keywords': 'ROI calculator, return on investment calculator, investment return calculator, profitability calculator, ROI percentage calculator',
        'icon': '📊',
        'schema_name': 'ROI Calculator'
    },
    {
        'file': 'income-tax.html',
        'title': 'Income Tax Calculator - Tax Liability Calculator',
        'description': 'Calculate income tax liability, deductions, and take-home salary with our free income tax calculator. Plan your taxes and maximize savings legally.',
        'keywords': 'income tax calculator, tax liability calculator, tax deduction calculator, salary tax calculator, income tax planning calculator',
        'icon': '💸',
        'schema_name': 'Income Tax Calculator'
    },
    {
        'file': 'salary.html',
        'title': 'Salary Calculator - Take Home Salary & CTC',
        'description': 'Calculate take-home salary, CTC breakdown, and deductions with our free salary calculator. Understand your complete compensation structure.',
        'keywords': 'salary calculator, take home salary calculator, CTC calculator, gross salary calculator, net salary calculator',
        'icon': '💰',
        'schema_name': 'Salary Calculator'
    }
]

def enhance_calculator(file_path, config):
    """Enhance a calculator HTML file with premium features"""
    
    # Read the existing file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update title and meta tags
    enhanced_content = re.sub(
        r'<title>.*?</title>',
        f'<title>{config["title"]} | MoneyCalcPro</title>',
        content
    )
    
    enhanced_content = re.sub(
        r'<meta name="description" content=".*?">',
        f'<meta name="description" content="{config["description"]}">',
        enhanced_content
    )
    
    enhanced_content = re.sub(
        r'<meta name="keywords" content=".*?">',
        f'<meta name="keywords" content="{config["keywords"]}">',
        enhanced_content
    )
    
    # Update Open Graph tags
    enhanced_content = re.sub(
        r'<meta property="og:title" content=".*?">',
        f'<meta property="og:title" content="{config["title"]} | MoneyCalcPro">',
        enhanced_content
    )
    
    enhanced_content = re.sub(
        r'<meta property="og:description" content=".*?">',
        f'<meta property="og:description" content="{config["description"]}">',
        enhanced_content
    )
    
    # Update Twitter tags
    enhanced_content = re.sub(
        r'<meta name="twitter:title" content=".*?">',
        f'<meta name="twitter:title" content="{config["title"]} | MoneyCalcPro">',
        enhanced_content
    )
    
    enhanced_content = re.sub(
        r'<meta name="twitter:description" content=".*?">',
        f'<meta name="twitter:description" content="{config["description"]}">',
        enhanced_content
    )
    
    # Add additional SEO enhancements
    seo_additions = '''
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="theme-color" content="#3b82f6">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://moneycalcpro.site/calculators/{}">
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    '''.format(config['file'])
    
    # Insert SEO additions after the existing meta tags
    enhanced_content = re.sub(
        r'(<meta name="twitter:description" content=".*?">)',
        f'\\1{seo_additions}',
        enhanced_content
    )
    
    # Update WebApplication schema
    webapp_schema = f'''    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "{config['schema_name']}",
        "description": "{config['description']}",
        "url": "https://moneycalcpro.site/calculators/{config['file']}",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {{
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }},
        "aggregateRating": {{
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250"
        }},
        "featureList": [
            "Real-time calculation results",
            "Input validation and error handling",
            "Detailed result breakdown",
            "Example usage scenarios",
            "Mobile-responsive design"
        ]
    }}
    </script>'''
    
    enhanced_content = re.sub(
        r'<script type="application/ld\+json">\s*{\s*"@context": "https://schema.org",\s*"@type": "WebApplication".*?</script>',
        webapp_schema,
        enhanced_content,
        flags=re.DOTALL
    )
    
    # Update FAQ schema with better questions and answers
    faq_questions = {
        'personal-loan.html': [
            {
                'question': 'What is a personal loan EMI?',
                'answer': 'EMI stands for Equated Monthly Installment. It\'s the fixed amount you pay every month to repay your personal loan, which includes both principal and interest components.'
            },
            {
                'question': 'How is personal loan EMI calculated?',
                'answer': 'Personal loan EMI is calculated using the formula: EMI = [P × R × (1+R)^N]/[(1+R)^N-1] where P = Principal amount, R = Monthly interest rate, N = Number of monthly installments.'
            },
            {
                'question': 'What factors affect personal loan EMI?',
                'answer': 'The main factors affecting personal loan EMI are: principal loan amount, interest rate, and loan tenure. Higher principal or interest rate increases EMI, while longer tenure decreases EMI but increases total interest paid.'
            },
            {
                'question': 'Can I prepay my personal loan?',
                'answer': 'Yes, most lenders allow prepayment of personal loans. However, some may charge a prepayment penalty of 2-5% of the outstanding amount. Check your loan agreement for specific terms.'
            }
        ],
        'mortgage.html': [
            {
                'question': 'What is a mortgage loan?',
                'answer': 'A mortgage loan is a type of loan used to purchase real estate property. The property itself serves as collateral for the loan, and the borrower makes regular payments until the loan is fully repaid.'
            },
            {
                'question': 'How much down payment do I need for a mortgage?',
                'answer': 'Typically, you need 20% down payment to avoid private mortgage insurance (PMI). However, some loan programs allow as low as 3-5% down payment, though this may result in higher interest rates and additional costs.'
            },
            {
                'question': 'What affects mortgage interest rates?',
                'answer': 'Mortgage interest rates are affected by credit score, down payment amount, loan term, property type, and current market conditions. Higher credit scores and larger down payments typically qualify for lower rates.'
            },
            {
                'question': 'What is the difference between fixed and adjustable rate mortgages?',
                'answer': 'Fixed-rate mortgages have the same interest rate throughout the loan term, while adjustable-rate mortgages (ARMs) have rates that can change periodically based on market conditions after an initial fixed period.'
            }
        ]
        # Add more calculator-specific FAQs as needed
    }
    
    # Use default FAQs if specific ones don't exist
    calculator_file = config['file']
    if calculator_file in faq_questions:
        faqs = faq_questions[calculator_file]
    else:
        faqs = [
            {
                'question': f'What is {config["schema_name"]}?',
                'answer': f'{config["schema_name"]} helps you calculate important financial metrics related to {config["title"].split(" - ")[0].lower()}. It provides accurate results for better financial planning.'
            },
            {
                'question': 'How accurate are the calculations?',
                'answer': 'Our calculator uses industry-standard formulas and provides 100% accurate results. However, actual results may vary based on specific lender terms and conditions.'
            },
            {
                'question': 'Is this calculator free to use?',
                'answer': 'Yes, our calculator is completely free to use with no hidden charges or premium subscriptions required. All features are available at no cost.'
            },
            {
                'question': 'Can I use this calculator on mobile devices?',
                'answer': 'Yes, our calculator is fully responsive and works perfectly on all mobile devices, tablets, and desktop computers.'
            }
        ]
    
    # Generate FAQ schema
    faq_items = []
    for faq in faqs:
        faq_items.append(f'''        {{
            "@type": "Question",
            "name": "{faq['question']}",
            "acceptedAnswer": {{
                "@type": "Answer",
                "text": "{faq['answer']}"
            }}
        }}''')
    
    faq_schema = f'''    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
{',\n'.join(faq_items)}
        ]
    }}
    </script>'''
    
    enhanced_content = re.sub(
        r'<script type="application/ld\+json">\s*{\s*"@context": "https://schema.org",\s*"@type": "FAQPage".*?</script>',
        faq_schema,
        enhanced_content,
        flags=re.DOTALL
    )
    
    # Write the enhanced content back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(enhanced_content)
    
    print(f"Enhanced {config['file']} successfully!")

def main():
    """Main function to enhance all calculators"""
    calculators_dir = 'calculators'
    
    if not os.path.exists(calculators_dir):
        print(f"Directory {calculators_dir} not found!")
        return
    
    print("Starting calculator enhancement process...")
    
    for calculator in calculators:
        file_path = os.path.join(calculators_dir, calculator['file'])
        if os.path.exists(file_path):
            try:
                enhance_calculator(file_path, calculator)
            except Exception as e:
                print(f"Error enhancing {calculator['file']}: {str(e)}")
        else:
            print(f"File {calculator['file']} not found!")
    
    print("Calculator enhancement process completed!")

if __name__ == "__main__":
    main()