# Sync the site's Resume tab with the final resume (resume/Vinay_K_R_AI_Engineer_Resume_final.docx).
#   npm run export-resume   (or: powershell -ExecutionPolicy Bypass -File scripts\export-resume.ps1 [-Python <python>])
# Writes public/resumes/Vinay_K_R_AI_Engineer_Resume.{docx,pdf} and public/resumes/pages/page-N.webp.
# Needs Microsoft Word (for DOCX -> PDF) and `pip install pymupdf pillow`. On the Mac, export the PDF from
# Word/Pages manually and run only the Python step.
param([string]$Python = "python")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "resume\Vinay_K_R_AI_Engineer_Resume_final.docx"
$out = Join-Path $root "public\resumes"
$docx = Join-Path $out "Vinay_K_R_AI_Engineer_Resume.docx"
$pdf = Join-Path $out "Vinay_K_R_AI_Engineer_Resume.pdf"

Copy-Item $src $docx -Force
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open($docx, $false, $true)
    $doc.ExportAsFixedFormat([string]$pdf, 17)
    $doc.Close(0)
} finally {
    $word.Quit()
}

$py = @'
import sys, pathlib, pymupdf
from PIL import Image
pdf, outdir = sys.argv[1], pathlib.Path(sys.argv[2])
outdir.mkdir(exist_ok=True)
for old in outdir.glob("page-*.webp"):
    old.unlink()
doc = pymupdf.open(pdf)
for i, page in enumerate(doc, 1):
    pix = page.get_pixmap(dpi=180)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img.save(outdir / f"page-{i}.webp", "WEBP", quality=88, method=6)
    print(f"page-{i}.webp {pix.width}x{pix.height}")
print("pages:", doc.page_count)
'@
$py | & $Python - $pdf (Join-Path $out "pages")
