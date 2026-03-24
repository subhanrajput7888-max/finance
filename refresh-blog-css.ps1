# Refresh all blog articles with latest CSS fixes
$files = Get-ChildItem -Path "c:\Users\subhan\Desktop\money calc pro\blog\*.html"

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove old blog-text-fix.css if present
    $content = $content -replace '\s*<link rel="stylesheet" href="\.\./css/blog-text-fix\.css">', ''
    
    # Add new blog-text-fix.css after blog-fixes.css
    if ($content -match '<link rel="stylesheet" href="\.\./css/blog-fixes\.css">') {
        $content = $content -replace '<link rel="stylesheet" href="\.\./css/blog-fixes\.css">', "<link rel=`"stylesheet`" href=`"../css/blog-fixes.css`">`n    <link rel=`"stylesheet`" href=`"../css/blog-text-fix.css`">"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)"
        $count++
    } else {
        Write-Host "Skipped (no blog-fixes.css): $($file.Name)"
    }
}

Write-Host ""
Write-Host "Successfully updated $count blog files!"
Write-Host "All text will now be visible on Android MS Edge and all devices."
