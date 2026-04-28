package com.resumematcher.controller;

import com.resumematcher.model.MatchResult;
import com.resumematcher.service.JobMatcherService;
import com.resumematcher.service.ResumeParserService;
import com.resumematcher.util.ReportGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class ResumeController {

    @Autowired
    private ResumeParserService resumeParserService;

    @Autowired
    private JobMatcherService jobMatcherService;

    @Autowired
    private ReportGenerator reportGenerator;

    private MatchResult cachedResult = null;

    @PostMapping("/matchResume")
    public ResponseEntity<MatchResult> matchResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobDescription") String jobDescription) {
        try {
            // Extract text from resume
            String resumeText = resumeParserService.extractText(file);
            
            // Match resume with job description
            MatchResult result = jobMatcherService.matchResume(resumeText, jobDescription);
            
            // Cache the result for PDF generation
            cachedResult = result;
            
            System.out.println("Match Score: " + result.getMatchScore());
            System.out.println("Matched Skills: " + result.getMatchedSkills());
            System.out.println("Missing Skills: " + result.getMissingSkills());
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            MatchResult errorResult = new MatchResult();
            errorResult.setMatchScore(0);
            errorResult.setSuggestions(java.util.Arrays.asList("Error: " + e.getMessage()));
            return ResponseEntity.status(500).body(errorResult);
        }
    }

    @GetMapping("/analysisReport")
    public ResponseEntity<byte[]> generateReport(
            @RequestParam(value = "name", required = false, defaultValue = "candidate") String name,
            @RequestParam(value = "resumeText", required = false) String resumeText,
            @RequestParam(value = "jobDescription", required = false) String jobDescription) {
        try {
            if (cachedResult == null) {
                return ResponseEntity.badRequest().body(null);
            }
            
            byte[] pdfBytes = reportGenerator.generatePDFReport(cachedResult);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=analysis-report.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is running!");
    }
}
