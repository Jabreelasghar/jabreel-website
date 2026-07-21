"""Generate a published editorial PDF from the shared editorial catalogue."""

import argparse
import json
from datetime import date
from html import escape
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
SOURCE = ROOT / "src" / "data" / "editorials.json"
OUTPUT_DIR = ROOT / "public" / "downloads" / "insights"
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


def load_editorial(slug: str) -> dict:
    catalogue = json.loads(SOURCE.read_text(encoding="utf-8"))["editorials"]
    editorial = next((item for item in catalogue if item["slug"] == slug), None)
    if not editorial:
        raise SystemExit(f"Unknown editorial slug: {slug}")
    if editorial["status"] != "published":
        raise SystemExit(f"Editorial is not published: {slug}")

    required = ["title", "subtitle", "authorDisplayName", "citationAuthor", "publicationDate", "publicationYear", "displayDate", "description", "pdf", "canonicalUrl", "about", "paragraphs"]
    missing = [field for field in required if not editorial.get(field)]
    if missing:
        raise SystemExit(f"Published editorial is missing required fields: {', '.join(missing)}")
    return editorial


def sentence_case(title: str) -> str:
    result = title[0].upper() + title[1:].lower()
    return result.replace(" ai", " AI")


def citation_for(editorial: dict) -> str:
    published = date.fromisoformat(editorial["publicationDate"])
    return (
        f'{escape(editorial["citationAuthor"])} ({published.year}, {published.strftime("%B")} {published.day}). '
        f'<i>{escape(sentence_case(editorial["title"]))}</i> {escape(editorial["authorDisplayName"])}. '
        f'<link href="{escape(editorial["canonicalUrl"])}" color="#55705F">{escape(editorial["canonicalUrl"])}</link>'
    )


def build_pdf(slug: str) -> Path:
    register_fonts()
    editorial = load_editorial(slug)
    catalogue = json.loads(SOURCE.read_text(encoding="utf-8"))["editorials"]
    editorial_index = next(index for index, item in enumerate(catalogue) if item["slug"] == slug)
    neighbours = []
    if editorial_index > 0:
        neighbours.append(("Previous", catalogue[editorial_index - 1]))
    if editorial_index < len(catalogue) - 1:
        neighbours.append(("Next", catalogue[editorial_index + 1]))
    output = ROOT / "public" / editorial["pdf"].lstrip("/")
    output.parent.mkdir(parents=True, exist_ok=True)
    published_year = editorial["publicationYear"]
    reuse_notice = (
        f'© {published_year} {editorial["authorDisplayName"]}. This editorial may be shared or quoted with appropriate attribution. '
        "Substantial reproduction, adaptation, or commercial reuse requires permission."
    )
    series_position = f'Part {editorial["seriesNumber"]} of {editorial["seriesTotal"]} in the series {editorial["series"]}'

    doc = SimpleDocTemplate(
        str(output), pagesize=A4, rightMargin=27 * mm, leftMargin=27 * mm,
        topMargin=25 * mm, bottomMargin=22 * mm,
        title=editorial["title"], author=editorial["authorDisplayName"],
        subject=editorial["description"],
        keywords="generative AI, higher education, assessment, authorship, judgement, learning"
    )
    styles = getSampleStyleSheet()
    label = ParagraphStyle("Label", parent=styles["Normal"], fontName="EditorialSans", fontSize=8.5, leading=12, textColor=colors.HexColor("#55705F"), spaceAfter=7)
    title = ParagraphStyle("Title", parent=styles["Title"], fontName="EditorialSerifBold", fontSize=25, leading=31, textColor=colors.HexColor("#173D45"), alignment=TA_CENTER, spaceAfter=10)
    subtitle = ParagraphStyle("Subtitle", parent=styles["Normal"], fontName="EditorialSerif", fontSize=13, leading=19, textColor=colors.HexColor("#52605B"), alignment=TA_CENTER, spaceAfter=14)
    meta = ParagraphStyle("Meta", parent=styles["Normal"], fontName="EditorialSans", fontSize=9, leading=14, textColor=colors.HexColor("#52605B"), alignment=TA_CENTER, spaceAfter=16)
    body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="EditorialSerif", fontSize=10.5, leading=16.5, textColor=colors.HexColor("#222826"), spaceAfter=10)
    section_heading = ParagraphStyle("SectionHeading", parent=styles["Heading2"], fontName="EditorialSerifBold", fontSize=13, leading=18, textColor=colors.HexColor("#173D45"), spaceBefore=8, spaceAfter=6)
    note = ParagraphStyle("Note", parent=body, fontName="EditorialSans", fontSize=9, leading=14, textColor=colors.HexColor("#52605B"), spaceAfter=8)

    story = [
        Spacer(1, 8 * mm),
        Paragraph(f'{editorial.get("category", "Editorial").upper()} · {editorial["series"].upper()}', label),
        Paragraph(escape(editorial["title"]), title),
        Paragraph(escape(editorial["subtitle"]), subtitle),
        Paragraph(f'By {escape(editorial["authorDisplayName"])} · {escape(editorial["displayDate"])}', meta),
        Spacer(1, 2 * mm)
    ]
    story.extend(KeepTogether([Paragraph(escape(paragraph), body)]) for paragraph in editorial["paragraphs"])
    story.extend([
        Spacer(1, 5 * mm),
        Paragraph("About this editorial", section_heading),
        Paragraph(escape(editorial["about"]), note),
        Paragraph("Cite this editorial", section_heading),
        Paragraph(citation_for(editorial), note),
        Paragraph(escape(reuse_notice), note),
        Paragraph(escape(series_position), note),
    ])
    for label_text, neighbour in neighbours:
        story.extend([
            Paragraph(f'{label_text} editorial · {neighbour["status"].title()}', section_heading),
            Paragraph(escape(neighbour["title"]), note),
        ])
    story.append(Paragraph(f'<link href="{escape(editorial["canonicalUrl"])}" color="#55705F">Read the online edition</link>', note))
    doc.build(story, onFirstPage=add_page_furniture, onLaterPages=add_page_furniture)
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("slug", help="Published editorial slug from src/data/editorials.json")
    args = parser.parse_args()
    print(build_pdf(args.slug))
