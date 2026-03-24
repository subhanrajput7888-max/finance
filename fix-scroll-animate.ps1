# Remove scroll-animate from all blog articles
$blogPath = "c:\Users\subhan\OneDrive\Desktop\money calc pro\blog"

Write-Host "Removing problematic scroll-animate classes from blog articles...`n"

$htmlFiles = Get-ChildItem -Path $blogPath -Filter *.html

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Pattern 1: Remove <div class="scroll-animate"> wrapper but keep content
    # This handles the opening tag
    $content = $content -replace '<div class="scroll-animate">\s*\r?\n\s*', ''
    
    # Remove corresponding closing </div>
    $content = $content -replace '\s*</div>\s*\r?\n\s*(</div>)', '$1'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "✓ Fixed: $($file.Name)"
}

Write-Host "`n✅ All blog articles fixed! Removed scroll-animate wrappers."
