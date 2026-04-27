package com.resumematcher.util;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.resumematcher.model.MatchResult;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class ReportGenerator {

    public byte[] generatePDFReport(MatchResult matchResult) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.setMargins(20, 20, 20, 20);

        Paragraph title = new Paragraph("Resume Match Analysis Report")
                .setFontSize(28)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER)
                .setFontColor(ColorConstants.BLACK);
        document.add(title);

        Paragraph date = new Paragraph(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMMM yyyy, HH:mm")))
                .setFontSize(10)
                .setTextAlignment(TextAlignment.CENTER)
                .setFontColor(ColorConstants.DARK_GRAY);
        document.add(date);

        document.add(new Paragraph("\n"));

        Paragraph scoreTitle = new Paragraph("Match Score")
                .setFontSize(16)
                .setBold();
        document.add(scoreTitle);

        Table scoreTable = new Table(2);
        scoreTable.setWidth(200);
        Cell scoreLabel = new Cell().add(new Paragraph("Overall Match:"))
                .setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(230, 230, 230));
        Cell scoreValue = new Cell().add(new Paragraph(matchResult.getMatchScore() + "%"))
                .setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(200, 255, 200))
                .setTextAlignment(TextAlignment.CENTER)
                .setBold();
        scoreTable.addCell(scoreLabel);
        scoreTable.addCell(scoreValue);
        document.add(scoreTable);

        document.add(new Paragraph("\n"));

        Paragraph matchedTitle = new Paragraph("Matched Skills (" + matchResult.getMatchedSkills().size() + ")")
                .setFontSize(14)
                .setBold();
        document.add(matchedTitle);

        if (matchResult.getMatchedSkills() != null && !matchResult.getMatchedSkills().isEmpty()) {
            Table matchedTable = new Table(2);
            int count = 0;
            for (String skill : matchResult.getMatchedSkills()) {
                if (count % 2 == 0) {
                    matchedTable.addCell(new Cell().add(new Paragraph("✓ " + skill))
                            .setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(220, 255, 220)));
                } else {
                    matchedTable.addCell(new Cell().add(new Paragraph("✓ " + skill))
                            .setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(240, 255, 240)));
                }
                count++;
            }
            document.add(matchedTable);
        } else {
            document.add(new Paragraph("No matched skills found."));
        }

        document.add(new Paragraph("\n"));

        Paragraph missingTitle = new Paragraph("Missing Skills (" + matchResult.getMissingSkills().size() + ")")
                .setFontSize(14)
                .setBold();
        document.add(missingTitle);

        if (matchResult.getMissingSkills() != null && !matchResult.getMissingSkills().isEmpty()) {
            Table missingTable = new Table(2);
            int count = 0;
            for (String skill : matchResult.getMissingSkills()) {
                if (count % 2 == 0) {
                    missingTable.addCell(new Cell().add(new Paragraph("✗ " + skill))
                            .setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(255, 220, 220)));
                } else {
                    missingTable.addCell(new Cell().add(new Paragraph("✗ " + skill))
                            .setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(255, 240, 240)));
                }
                count++;
            }
            document.add(missingTable);
        } else {
            document.add(new Paragraph("No missing skills. Perfect match!"));
        }

        document.add(new Paragraph("\n"));

        Paragraph suggestionsTitle = new Paragraph("Recommendations")
                .setFontSize(14)
                .setBold();
        document.add(suggestionsTitle);

        if (matchResult.getSuggestions() != null && !matchResult.getSuggestions().isEmpty()) {
            for (int i = 0; i < matchResult.getSuggestions().size(); i++) {
                Paragraph suggestion = new Paragraph((i + 1) + ". " + matchResult.getSuggestions().get(i))
                        .setMarginLeft(20)
                        .setMarginBottom(8);
                document.add(suggestion);
            }
        }

        document.add(new Paragraph("\n"));

        Paragraph footer = new Paragraph("Generated by AI Resume Matcher | www.resumematcher.io")
                .setFontSize(8)
                .setTextAlignment(TextAlignment.CENTER)
                .setFontColor(ColorConstants.DARK_GRAY);
        document.add(footer);

        document.close();
        return baos.toByteArray();
    }
}
