Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$demoPath = Join-Path $root 'demos\dessert-platter\qlove_dessert_platter_FINAL_v2_ZOOM.html'
$outputDir = Join-Path $root 'assets\optimized\dessert-platter'
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Add-Type -AssemblyName System.Drawing

function Save-OptimizedJpeg([string]$dataUri, [string]$outputPath, [int]$maxDimension) {
  $base64 = $dataUri.Substring($dataUri.IndexOf(',') + 1)
  $bytes = [Convert]::FromBase64String($base64)
  $input = [System.IO.MemoryStream]::new($bytes)
  $image = [System.Drawing.Image]::FromStream($input)
  $scale = [Math]::Min(1, $maxDimension / [Math]::Max($image.Width, $image.Height))
  $width = [Math]::Max(1, [Math]::Round($image.Width * $scale))
  $height = [Math]::Max(1, [Math]::Round($image.Height * $scale))
  $bitmap = [System.Drawing.Bitmap]::new($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.DrawImage($image, 0, 0, $width, $height)
  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [int64]78)
  $bitmap.Save($outputPath, $encoder, $parameters)
  $parameters.Dispose(); $graphics.Dispose(); $bitmap.Dispose(); $image.Dispose(); $input.Dispose()
  return @{ Width = $width; Height = $height }
}

$html = [System.IO.File]::ReadAllText($demoPath)
$backgroundMatch = [regex]::Match($html, 'background-image:url\("(?<uri>data:image/[^;]+;base64,[^"]+)"\)')
$dielineMatch = [regex]::Match($html, 'const dielineSrc = "(?<uri>data:image/jpeg;base64,[^"]+)";')
if (!$backgroundMatch.Success -or !$dielineMatch.Success) { throw 'Dessert Platter data images were not found.' }

$backgroundInfo = Save-OptimizedJpeg $backgroundMatch.Groups['uri'].Value (Join-Path $outputDir 'scene-bg.jpg') 1600
$dielineInfo = Save-OptimizedJpeg $dielineMatch.Groups['uri'].Value (Join-Path $outputDir 'dieline.jpg') 1600

$html = $html.Replace($backgroundMatch.Groups[0].Value, 'background-image:url("/assets/optimized/dessert-platter/scene-bg.jpg?v=20261011-perf1")')
$html = $html.Replace($dielineMatch.Groups[0].Value, 'const dielineSrc = "/assets/optimized/dessert-platter/dieline.jpg?v=20261011-perf1";')
[System.IO.File]::WriteAllText($demoPath, $html, [System.Text.UTF8Encoding]::new($false))

Write-Output "Dessert Platter assets written: scene $($backgroundInfo.Width)x$($backgroundInfo.Height), dieline $($dielineInfo.Width)x$($dielineInfo.Height)"
