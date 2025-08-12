param(
  [switch]$Strict = $false,
  [switch]$FailOnLinkIssues = $false
)

$ErrorActionPreference = 'Stop'
$overallFailed = $false

function Set-Failed {
  param([string]$Message)
  Write-Error $Message
  $script:overallFailed = $true
}

Write-Host "==> Local Repo Validation" -ForegroundColor Cyan

# 0) Required directories
foreach ($dir in @('examples','templates','docs')) {
  if (-not (Test-Path $dir)) {
    if ($Strict) { Set-Failed "Missing required directory: $dir" } else { Write-Warning "Missing directory: $dir" }
  }
}

# 1) Ensure Node (for markdownlint, link check)
$nodeAvailable = $true
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Warning "Node.js not found. Install Node 18+ to run markdown and link checks. Skipping Node-based checks."
  $nodeAvailable = $false
}

# 2) Markdown Lint
if ($nodeAvailable) {
  if (-not (Get-Command markdownlint -ErrorAction SilentlyContinue)) {
    Write-Host "Installing markdownlint-cli..." -ForegroundColor DarkGray
    try { npm install -g markdownlint-cli | Out-Null } catch { Write-Warning "Failed to install markdownlint-cli. Skipping."; $nodeAvailable = $false }
  }
  if ($nodeAvailable -and (Get-Command markdownlint -ErrorAction SilentlyContinue)) {
    Write-Host "Running markdownlint..." -ForegroundColor Yellow
    if (Test-Path ".markdownlint.json") {
      markdownlint "**/*.md" --ignore node_modules --config .markdownlint.json
    } else {
      markdownlint "**/*.md" --ignore node_modules
    }
  }
}

# 3) Link check (per-file) using npx
if ($nodeAvailable) {
  $mlcConfig = ".github/markdown-link-check-config.json"
  $mdFiles = Get-ChildItem -Path . -Include *.md -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

  foreach ($f in $mdFiles) {
    Write-Host "Checking links in $($f.FullName)" -ForegroundColor Yellow
    $args = @('--yes','markdown-link-check','-p','-q')
    if (Test-Path $mlcConfig) { $args += @('-c', $mlcConfig) }
    $args += $f.FullName
    npx @args
    if ($LASTEXITCODE -ne 0) {
      $msg = "Link check issues in $($f.FullName)"
      if ($FailOnLinkIssues -or $Strict) { Set-Failed $msg } else { Write-Warning $msg }
    }
  }
}

# 4) Required files (use your repository's actual filenames)
$requiredFiles = @(
  'create-trd-md.md',
  'generate-test-strategy-md.md',
  'generate-test-tasks-md.md',
  'implement-test-task-md.md',
  'generate-test-report-md.md',
  'README.md',
  'quick-start-guide.md',
  'contributing-guide.md'
)
foreach ($f in $requiredFiles) {
  if (-not (Test-Path $f)) {
    if ($Strict) { Set-Failed "Missing required file: $f" } else { Write-Warning "Missing file: $f" }
  }
}

# 5) Validate workflow guidance file structure (warn by default)
$workflowGuides = @(
  'create-trd-md.md',
  'generate-test-strategy-md.md',
  'generate-test-tasks-md.md',
  'implement-test-task-md.md',
  'generate-test-report-md.md'
) | Where-Object { Test-Path $_ }

foreach ($wf in $workflowGuides) {
  Write-Host "Validating structure: $wf" -ForegroundColor Yellow
  $content = Get-Content $wf -Raw
  $missing = @()
  if ($content -notmatch 'You are a') { $missing += 'role definition ("You are a")' }
  if ($content -notmatch '(?i)usage instructions') { $missing += 'usage instructions section' }
  if ($missing.Count -gt 0) {
    $msg = "Missing in ${wf}: " + ($missing -join ', ')
    if ($Strict) { Set-Failed $msg } else { Write-Warning $msg }
  }
}

# 6) Examples completeness (warn only)
$exampleFiles = Get-ChildItem examples -Filter *.md -ErrorAction SilentlyContinue
foreach ($ef in $exampleFiles) {
  $text = Get-Content $ef.FullName -Raw
  if ($text -match '```javascript') {
    if ($text -notmatch 'import|require|describe|it|test') {
      Write-Warning "JavaScript examples in $($ef.Name) may be incomplete"
    }
  }
}

if ($overallFailed) {
  Write-Host "Validation completed with failures." -ForegroundColor Red
  exit 1
} else {
  Write-Host "Validation completed successfully (warnings may be present)." -ForegroundColor Green
}
