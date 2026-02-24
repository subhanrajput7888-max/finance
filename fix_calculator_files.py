import os
import re

# Directory containing calculator files
calculator_dir = r"c:\Users\Jajja Mobile\Desktop\finance\calculators"

# Counter for changes made
changes_count = 0

# Process each HTML file in the calculators directory
for filename in os.listdir(calculator_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(calculator_dir, filename)
        
        # Read the file content
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Track if any changes were made to this file
        original_content = content
        
        # Fix malformed logo URLs - replace .https://freeimage.host/i/q2lo3Au with ../images/logo.png
        content = re.sub(r'src="\.[^"]*freeimage\.host[^"]*"', 'src="../images/logo.png"', content)
        
        # Fix domain inconsistencies - replace moneycalcpro.com with moneycalcpro.site
        content = content.replace('https://moneycalcpro.com', 'https://moneycalcpro.site')
        
        # Write the file back if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Fixed file: {filename}")
            changes_count += 1

print(f"\nCompleted! Fixed {changes_count} calculator files.")
print("All malformed URLs and domain inconsistencies have been corrected.")