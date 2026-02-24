import os

# Directory containing blog files
blog_dir = r"c:\Users\Jajja Mobile\Desktop\finance\blog"

# Counter for changes made
changes_count = 0

# Process each HTML file in the blog directory
for filename in os.listdir(blog_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(blog_dir, filename)
        
        # Read the file content
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Track if any changes were made to this file
        original_content = content
        
        # Add Google Fonts import after the last meta tag before stylesheets
        if '<!-- Google Fonts -->' not in content:
            content = content.replace(
                '<link rel="stylesheet" href="../styles.css">',
                '''    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="../styles.css">'''
            )
        
        # Fix domain inconsistencies - replace moneycalcpro.com with moneycalcpro.site
        content = content.replace('https://moneycalcpro.com', 'https://moneycalcpro.site')
        
        # Write the file back if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Updated file: {filename}")
            changes_count += 1

print(f"\nCompleted! Updated {changes_count} blog files.")
print("All blog posts now have Google Fonts and correct domain references.")