# Add blog-text-fix.css to all blog articles
$files = Get-ChildItem -Path "c:\Users\subhan\Desktop\money calc pro\blog\*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Add blog-text-fix.css after blog-fixes.css if not already present
    if ($content -match '<link rel="stylesheet" href="\.\./css/blog-fixes\.css">' -and $content -notmatch '<link rel="stylesheet" href="\.\./css/blog-text-fix\.css">') {
        $content = $content -replace '<link rel="stylesheet" href="\.\./css/blog-fixes\.css">', "<link rel=`"stylesheet`" href=`"../css/blog-fixes.css`">`n    <link rel=`"stylesheet`" href=`"../css/blog-text-fix.css`">"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed text visibility: $($file.Name)"
    } elseif ($content -notmatch '<link rel="stylesheet" href="\.\./css/blog-text-fix\.css">') {
        # If blog-fixes.css is missing, add both after styles.css
        $content = $content -replace '<link rel="stylesheet" href="\.\./css/styles\.css">', "<link rel=`"stylesheet`" href=`"../css/styles.css`">`n    <link rel=`"stylesheet`" href=`"../css/blog-fixes.css`">`n    <link rel=`"stylesheet`" href=`"../css/blog-text-fix.css`">"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Added fixes: $($file.Name)"
    }
}

Write-Host "`nAll blog article text visibility issues fixed!"
