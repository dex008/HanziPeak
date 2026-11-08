param(
  [string]$Res = (Join-Path $PSScriptRoot '..\android\app\src\main\res'),
  [string]$AppName = 'HanziPeak'
)

Add-Type -AssemblyName System.Drawing

$red    = [System.Drawing.Color]::FromArgb(184, 67, 47)
$paper  = [System.Drawing.Color]::FromArgb(247, 242, 231)
$cream  = [System.Drawing.Color]::FromArgb(255, 246, 234)
$ink    = [System.Drawing.Color]::FromArgb(30, 27, 22)
$muted  = [System.Drawing.Color]::FromArgb(114, 106, 91)

$zhFamily = New-Object System.Drawing.FontFamily('Microsoft YaHei')
$latinFamily = New-Object System.Drawing.FontFamily('Segoe UI')
# U+5B57 (字). Kept as a codepoint so the script survives ANSI/UTF-8 BOM issues.
$zi = [string][char]0x5B57

function New-Bitmap([int]$w, [int]$h, [System.Drawing.Color]$bg) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear($bg)
  return @{ Bitmap = $bmp; Graphics = $g }
}

function Get-RoundedPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

function Draw-Glyph($g, [string]$text, $family, [float]$size, [System.Drawing.Color]$color, [float]$cx, [float]$cy) {
  $font = New-Object System.Drawing.Font($family, $size, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush($color)
  $measured = $g.MeasureString($text, $font)
  $x = [float]($cx - $measured.Width / 2)
  $y = [float]($cy - $measured.Height / 2)
  if ($x -lt 0) { $x = 0 }
  if ($y -lt 0) { $y = 0 }
  $g.DrawString($text, $font, $brush, $x, $y)
  $font.Dispose(); $brush.Dispose()
}

function Draw-Seal($g, [float]$cx, [float]$cy, [float]$size) {
  $path = Get-RoundedPath ($cx - $size / 2) ($cy - $size / 2) $size $size ($size * 0.24)
  $brush = New-Object System.Drawing.SolidBrush($red)
  $g.FillPath($brush, $path)
  Draw-Glyph $g $zi $zhFamily ($size * 0.62) $cream $cx ($cy + $size * 0.02)
  $brush.Dispose(); $path.Dispose()
}

function Save-Png($bmp, [string]$path) {
  $dir = Split-Path -Parent $path
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

$iconSizes = @{ 'mdpi' = 48; 'hdpi' = 72; 'xhdpi' = 96; 'xxhdpi' = 144; 'xxxhdpi' = 192 }
$fgSizes   = @{ 'mdpi' = 108; 'hdpi' = 162; 'xhdpi' = 216; 'xxhdpi' = 324; 'xxxhdpi' = 432 }

foreach ($d in $iconSizes.Keys) {
  $s = $iconSizes[$d]

  # legacy square icon
  $c = New-Bitmap $s $s $red
  Draw-Glyph $c.Graphics $zi $zhFamily ($s * 0.62) $cream ($s / 2) ($s / 2 + $s * 0.02)
  Save-Png $c.Bitmap (Join-Path $Res "mipmap-$d\ic_launcher.png")
  $c.Graphics.Dispose()

  # legacy round icon
  $c = New-Bitmap $s $s $red
  $c.Graphics.Clear([System.Drawing.Color]::Transparent)
  $brush = New-Object System.Drawing.SolidBrush($red)
  $c.Graphics.FillEllipse($brush, 0, 0, $s, $s)
  Draw-Glyph $c.Graphics $zi $zhFamily ($s * 0.58) $cream ($s / 2) ($s / 2 + $s * 0.02)
  Save-Png $c.Bitmap (Join-Path $Res "mipmap-$d\ic_launcher_round.png")
  $brush.Dispose(); $c.Graphics.Dispose()

  # adaptive foreground (transparent, white glyph inside safe zone)
  $f = $fgSizes[$d]
  $c = New-Bitmap $f $f ([System.Drawing.Color]::Transparent)
  Draw-Glyph $c.Graphics $zi $zhFamily ($f * 0.40) $cream ($f / 2) ($f / 2 + $f * 0.012)
  Save-Png $c.Bitmap (Join-Path $Res "mipmap-$d\ic_launcher_foreground.png")
  $c.Graphics.Dispose()
}

# splash screens
$portSizes = @{ 'mdpi' = @(320, 480); 'hdpi' = @(480, 800); 'xhdpi' = @(720, 1280); 'xxhdpi' = @(960, 1600); 'xxxhdpi' = @(1280, 1920) }
foreach ($d in $portSizes.Keys) {
  foreach ($orient in @('port', 'land')) {
    $w = $portSizes[$d][0]; $h = $portSizes[$d][1]
    if ($orient -eq 'land') { $w = $portSizes[$d][1]; $h = $portSizes[$d][0] }
    $c = New-Bitmap $w $h $paper
    $seal = [Math]::Min($w, $h) * 0.20
    Draw-Seal $c.Graphics ($w / 2) ($h * 0.40) $seal
    $titleSize = [Math]::Min($w, $h) * 0.055
    Draw-Glyph $c.Graphics $AppName $latinFamily $titleSize $ink ($w / 2) ($h * 0.40 + $seal * 0.95)
    $subSize = [Math]::Min($w, $h) * 0.026
    Draw-Glyph $c.Graphics 'HSK 1 course  |  free' $latinFamily $subSize $muted ($w / 2) ($h * 0.40 + $seal * 0.95 + $titleSize * 1.2)
    Save-Png $c.Bitmap (Join-Path $Res "drawable-$orient-$d\splash.png")
    $c.Graphics.Dispose()
  }
}

$c = New-Bitmap 480 320 $paper
Draw-Seal $c.Graphics 240 120 54
Draw-Glyph $c.Graphics $AppName $latinFamily 22 $ink 240 186
Save-Png $c.Bitmap (Join-Path $Res 'drawable\splash.png')
$c.Graphics.Dispose()

Write-Host "Branding assets generated in $Res"
