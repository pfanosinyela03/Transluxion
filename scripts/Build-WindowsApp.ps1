$ErrorActionPreference = 'Stop'

$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$iconBuilder = Join-Path $PSScriptRoot 'Build-WindowsIcon.ps1'
$iconPath = Join-Path $projectRoot 'public\icon.ico'
$sourcePath = Join-Path $PSScriptRoot 'TransluxionDesktop.cs'
$outputDirectory = Join-Path $projectRoot 'public\downloads'
$outputPath = Join-Path $outputDirectory 'Transluxion.exe'
$compilerPath = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'

if (-not (Test-Path -LiteralPath $compilerPath)) {
  $compilerPath = Join-Path $env:WINDIR 'Microsoft.NET\Framework\v4.0.30319\csc.exe'
}
if (-not (Test-Path -LiteralPath $compilerPath)) {
  throw 'The .NET Framework C# compiler was not found. Build this Windows app on a Windows machine with the .NET Framework developer tools installed.'
}

& $iconBuilder
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
  throw 'Failed to generate the Windows application icon.'
}

New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
& $compilerPath /nologo /target:winexe "/out:$outputPath" "/win32icon:$iconPath" /reference:System.Windows.Forms.dll /reference:System.Drawing.dll $sourcePath
if ($LASTEXITCODE -ne 0) {
  throw "Windows app compilation failed with exit code $LASTEXITCODE."
}

Write-Output "Built $outputPath"
