package com.resumematcher.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.stream.Collectors;

@Service
public class ResumeParserService {

    public String extractTextFromPDF(MultipartFile file) throws IOException {
        try {
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();
            return text;
        } catch (Exception e) {
            throw new IOException("Failed to parse PDF: " + e.getMessage(), e);
        }
    }

    public String extractTextFromDOCX(MultipartFile file) throws IOException {
        try (InputStream is = file.getInputStream();
             XWPFDocument document = new XWPFDocument(is)) {
            return document.getParagraphs().stream()
                    .map(XWPFParagraph::getText)
                    .collect(Collectors.joining("\n"));
        } catch (Exception e) {
            throw new IOException("Failed to parse DOCX: " + e.getMessage(), e);
        }
    }

    public String extractText(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IOException("Invalid file");
        }

        if (filename.toLowerCase().endsWith(".pdf")) {
            return extractTextFromPDF(file);
        } else if (filename.toLowerCase().endsWith(".docx") || filename.toLowerCase().endsWith(".doc")) {
            return extractTextFromDOCX(file);
        } else {
            throw new IOException("Unsupported file format. Please upload PDF or DOCX.");
        }
    }
}