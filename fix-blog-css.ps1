# Fix blog-fixes.css link in all blog articles
$files = Get-ChildItem -Path "c:\Users\subhan\Desktop\money calc pro\blog\*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove the broken line with literal \n
    $content = $content -replace '<link rel="stylesheet" href="\.\./css/styles\.css">`n    <link rel="stylesheet" href="\.\./css/blog-fixes\.css">', '<link rel="stylesheet" href="../css/styles.css">'
    
    # Remove duplicate blog-fixes.css if exists
    $content = $content -replace '^\s*<link rel="stylesheet" href="\.\./css/blog-fixes\.css">\r?\n', ''
    
    # Add proper blog-fixes.css link after styles.css (only if not already present correctly)
    if ($content -match '<link rel="stylesheet" href="\.\./css/styles\.css">' -and $content -notmatch '<link rel="stylesheet" href="\.\./css/blog-fixes\.css">') {
        $content = $content -replace '<link rel="stylesheet" href="\.\./css/styles\.css">', "<link rel=`"stylesheet`" href=`"../css/styles.css`">`n    <link rel=`"stylesheet`" href=`"../css/blog-fixes.css`">"
    }
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "`nAll blog files fixed!"
