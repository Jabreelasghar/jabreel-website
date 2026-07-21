"""Generate the static PDF edition from the editorial's shared JSON source."""

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "data" / "what-counts-as-learning-in-the-age-of-ai.json"
OUTPUT = ROOT / "public" / "downloads" / "insights" / "what-counts-as-learning-in-the-age-of-ai.pdf"
SITE_URL = "https://jabreelasghar-website.vercel.app"


def register_fonts() -> None:
    fonts = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("EditorialSerif", str(fonts / "georgia.ttf")))
    pdfmetrics.registerFont(TTFont("EditorialSerifBold", str(fonts / "georgiab.ttf")))
    pdfmetrics.registerFont(TTFont("EditorialSans", str(fonts / "arial.ttf")))


def add_page_furniture(canvas, doc) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setStrokeColor(colors.HexColor("#D7D3C8"))
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, height - 16 * mm, width - doc.rightMargin, height - 16 * mm)
    canvas.setFont("EditorialSans", 8)
    canvas.setFillColor(colors.HexColor("#52605B"))
    canvas.drawString(doc.leftMargin, height - 12.5 * mm, "DR JABREEL ASGHAR · INSIGHTS")
    canvas.drawRightString(width - doc.rightMargin, 12 * mm, f"{canvas.getPageNumber()}")
    canvas.drawString(doc.leftMargin, 12 * mm, SITE_URL)
    canvas.linkURL(SITE_URL, (doc.leftMargin, 9.5 * mm, doc.leftMargin + 62 * mm, 15 * mm), relative=0)
    canvas.restoreState()


def build_pdf() -> None:
    register_fonts()
    article = json.loads(SOURCE.read_text(encoding="utf-8"))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, rightMargin=27 * mm, leftMargin=27 * mm,
        topMargin=25 * mm, bottomMargin=22 * mm,
        title=article["title"], author=article["author"],
        subject=article["description"],
        keywords="generative AI, higher education, assessment, authorship, judgement, learning"
    )
    styles = getSampleStyleSheet()
    label = ParagraphStyle("Label", parent=styles["Normal"], fontName="EditorialSans", fontSize=8.5, leading=12, textColor=colors.HexColor("#55705F"), spaceAfter=7)
    title = ParagraphStyle("Title", parent=styles["Title"], fontName="EditorialSerifBold", fontSize=25, leading=31, textColor=colors.HexColor("#173D45"), alignment=TA_CENTER, spaceAfter=10)
    subtitle = ParagraphStyle("Subtitle", parent=styles["Normal"], fontName="EditorialSerif", fontSize=13, leading=19, textColor=colors.HexColor("#52605B"), alignment=TA_CENTER, spaceAfter=14)
    meta = ParagraphStyle("Meta", parent=styles["Normal"], fontName="EditorialSans", fontSize=9, leading=14, textColor=colors.HexColor("#52605B"), alignment=TA_CENTER, spaceAfter=16)
    body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="EditorialSerif", fontSize=10.5, leading=16.5, textColor=colors.HexColor("#222826"), spaceAfter=10)

    story = [
        Spacer(1, 8 * mm),
        Paragraph(f'{article["category"].upper()} · {article["series"].upper()}', label),
        Paragraph(article["title"], title),
        Paragraph(article["subtitle"], subtitle),
        Paragraph(f'Jabreel Asghar · {article["displayDate"]}', meta),
        Spacer(1, 2 * mm)
    ]
    story.extend(KeepTogether([Paragraph(paragraph, body)]) for paragraph in article["paragraphs"])
    story.extend([
        Spacer(1, 5 * mm),
        Paragraph(f'This is the first editorial in the ten-part series, <i>{article["series"]}</i>', body),
        Paragraph(f'<link href="{SITE_URL}/insights/what-counts-as-learning-in-the-age-of-ai" color="#55705F">Read the online edition</link>', body)
    ])
    doc.build(story, onFirstPage=add_page_furniture, onLaterPages=add_page_furniture)


if __name__ == "__main__":
    build_pdf()
