# Add lazy loading to all blog article images
$blogPath = "c:\Users\subhan\OneDrive\Desktop\money calc pro\blog"

# Get all HTML files in blog folder
$htmlFiles = Get-ChildItem -Path $blogPath -Filter *.html

foreach ($file in $htmlFiles) {
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace images without lazy loading
    $content = $content -replace '<img src="https://images\.unsplash\.com/([^"]*?) alt="([^"]*?)" style=', '<img src="https://images.unsplash.com/$1 alt="$2" loading="lazy" decoding="async" style='
    
    # Write back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`n✅ All blog articles updated with lazy loading!"
