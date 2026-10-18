$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

function New-RoundedPath([float]$x, [float]$y, [float]$width, [float]$height, [float]$radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $radius * 2
  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $width - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $width - $diameter, $y + $height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function New-IconPng([int]$size) {
  $bitmap = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $scale = $size / 512.0
  $graphics.ScaleTransform($scale, $scale)

  $bgRectangle = New-Object System.Drawing.Rectangle(4, 4, 504, 504)
  $background = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $bgRectangle,
    [System.Drawing.Color]::FromArgb(15, 23, 42),
    [System.Drawing.Color]::FromArgb(2, 6, 23),
    [single]45
  )
  $outer = New-RoundedPath 4 4 504 504 112
  $graphics.FillPath($background, $outer)
  $graphics.DrawPath((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(30, 41, 59), 8)), $outer)

  $center = 256
  $outerRingPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(64, 16, 185, 129), 6)
  $outerRingPen.DashPattern = @(2.3, 1.7)
  $graphics.DrawEllipse($outerRingPen, 72, 72, 368, 368)
  $graphics.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(102, 16, 185, 129), 8)), 108, 108, 296, 296)

  $markBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(136, 148, 240, 216)),
    [System.Drawing.Color]::FromArgb(52, 211, 153),
    [System.Drawing.Color]::FromArgb(5, 150, 105),
    [single]45
  )
  $crossbar = New-RoundedPath 136 148 240 48 16
  $stem = New-RoundedPath 232 148 48 216 16
  $graphics.FillPath($markBrush, $crossbar)
  $graphics.FillPath($markBrush, $stem)

  $graphics.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(2, 6, 23))), 316, 316, 96, 96)
  $graphics.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(16, 185, 129), 6)), 316, 316, 96, 96)
  $graphics.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(16, 185, 129))), 328, 328, 72, 72)
  $checkPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(2, 6, 23), 8)
  $checkPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $checkPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $checkPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $graphics.DrawLines($checkPen, [System.Drawing.Point[]]@(
    (New-Object System.Drawing.Point(352, 364)),
    (New-Object System.Drawing.Point(361, 373)),
    (New-Object System.Drawing.Point(378, 355))
  ))

  $stream = New-Object System.IO.MemoryStream
  $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
  $pngBytes = $stream.ToArray()
  $graphics.Dispose()
  $bitmap.Dispose()
  $background.Dispose()
  $outer.Dispose()
  $outerRingPen.Dispose()
  $markBrush.Dispose()
  $crossbar.Dispose()
  $stem.Dispose()
  $checkPen.Dispose()
  $stream.Dispose()
  return ,$pngBytes
}

$sizes = @(16, 32, 48, 256)
$images = @()
foreach ($size in $sizes) {
  $images += ,(New-IconPng $size)
}

$iconPath = Join-Path $PSScriptRoot '..\public\icon.ico'
$iconPath = [System.IO.Path]::GetFullPath($iconPath)
$directorySize = 6 + 16 * $sizes.Count
$stream = [System.IO.File]::Create($iconPath)
$writer = New-Object System.IO.BinaryWriter($stream)
$writer.Write([uint16]0)
$writer.Write([uint16]1)
$writer.Write([uint16]$sizes.Count)
$offset = $directorySize

for ($index = 0; $index -lt $sizes.Count; $index++) {
  $dimension = if ($sizes[$index] -eq 256) { [byte]0 } else { [byte]$sizes[$index] }
  $writer.Write($dimension)
  $writer.Write($dimension)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([uint16]1)
  $writer.Write([uint16]32)
  $writer.Write([uint32]$images[$index].Length)
  $writer.Write([uint32]$offset)
  $offset += $images[$index].Length
}

foreach ($image in $images) {
  $writer.Write($image)
}

$writer.Dispose()
$stream.Dispose()
Write-Output "Created $iconPath"
