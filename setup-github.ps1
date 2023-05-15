# PowerShell script to set up GitHub repository
$username = Read-Host "Enter your GitHub username"
$repoName = "Orangehrm_Playwright"
$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

Write-Host "Creating GitHub repository..."

$headers = @{
    "Authorization" = "token $tokenPlain"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = $repoName
    description = "OrangeHRM automation tests using Playwright and TypeScript"
    private = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "Repository created successfully: $($response.html_url)" -ForegroundColor Green
    
    git remote remove origin -ErrorAction SilentlyContinue
    git remote add origin "https://$tokenPlain@github.com/$username/$repoName.git"
    git branch -M main
    git push -u origin main
    
    Write-Host "`nRepository setup complete!" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

