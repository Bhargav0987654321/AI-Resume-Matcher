package com.resumematcher.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.resumematcher.model.MatchResult;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobMatcherService {

    @Autowired
    private SkillExtractorService skillExtractorService;

    public MatchResult matchResume(String resumeText, String jobDescription) {
        // Extract skills from both resume and job description
        List<String> resumeSkills = skillExtractorService.extractSkills(resumeText);
        List<String> jobSkills = skillExtractorService.extractSkills(jobDescription);

        // Find matched and missing skills
        List<String> matchedSkills = resumeSkills.stream()
                .filter(jobSkills::contains)
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        List<String> missingSkills = jobSkills.stream()
                .filter(skill -> !resumeSkills.contains(skill))
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        // Calculate match score
        int matchScore = calculateMatchScore(matchedSkills, jobSkills);

        // Generate suggestions
        List<String> suggestions = generateSuggestions(matchedSkills, missingSkills, resumeText, jobDescription);

        // Create result
        MatchResult result = new MatchResult();
        result.setMatchScore(matchScore);
        result.setMatchedSkills(matchedSkills);
        result.setMissingSkills(missingSkills);
        result.setSuggestions(suggestions);
        result.setMatchPercentage((double) matchScore);
        result.setResumeText(resumeText);
        result.setJobDescription(jobDescription);

        return result;
    }

    private int calculateMatchScore(List<String> matchedSkills, List<String> requiredSkills) {
        if (requiredSkills.isEmpty()) {
            return 0;
        }

        // Calculate percentage: (matched skills / required skills) * 100
        double percentage = (double) matchedSkills.size() / requiredSkills.size() * 100;
        
        // Additional scoring factors
        int score = Math.min((int) percentage, 100);
        
        // Boost if there's a good number of matched skills
        if (matchedSkills.size() >= 10) {
            score = Math.min(score + 5, 100);
        }

        // Penalize if too many skills are missing
        if (requiredSkills.size() - matchedSkills.size() > 15) {
            score = Math.max(score - 10, 0);
        }

        return score;
    }

    private List<String> generateSuggestions(List<String> matchedSkills, 
                                            List<String> missingSkills,
                                            String resumeText,
                                            String jobDescription) {
        List<String> suggestions = new ArrayList<>();

        // Suggestion 1: Focus on missing skills
        if (!missingSkills.isEmpty()) {
            int topMissing = Math.min(3, missingSkills.size());
            String missing = String.join(", ", missingSkills.subList(0, topMissing));
            suggestions.add("Learn and highlight: " + missing);
        }

        // Suggestion 2: Strengthen matched skills
        if (!matchedSkills.isEmpty()) {
            suggestions.add("Demonstrate expertise in your " + matchedSkills.size() + " matched skills with concrete project examples");
        }

        // Suggestion 3: Resume content suggestions
        if (!resumeText.toLowerCase().contains("project") && !resumeText.toLowerCase().contains("github")) {
            suggestions.add("Add a 'Projects' section showcasing real-world applications");
        }

        if (!resumeText.toLowerCase().contains("achievement") && 
            !resumeText.toLowerCase().contains("impact") &&
            !resumeText.toLowerCase().contains("improved")) {
            suggestions.add("Quantify your achievements (e.g., '30% improvement', 'served 1M+ users')");
        }

        // Suggestion 4: Tailor resume language
        if (matchedSkills.size() > 0) {
            suggestions.add("Use job description keywords in your resume to improve ATS compatibility");
        }

        // Suggestion 5: Professional development
        if (missingSkills.size() > 5) {
            suggestions.add("Consider certifications or courses in trending skills within the industry");
        } else if (missingSkills.size() > 0) {
            suggestions.add("Target " + Math.min(2, missingSkills.size()) + " high-impact skills to significantly improve your match");
        }

        // Suggestion 6: Check match percentage
        int requiredSkills = !matchedSkills.isEmpty() || !missingSkills.isEmpty() ? 
                            matchedSkills.size() + missingSkills.size() : 1;
        int matchPercentage = (matchedSkills.size() * 100) / requiredSkills;
        
        if (matchPercentage >= 80) {
            suggestions.add("Excellent match! Customize your cover letter to highlight your top 5 matched skills");
        } else if (matchPercentage >= 60) {
            suggestions.add("Good match with room for improvement. Focus on the missing skills before applying");
        } else {
            suggestions.add("Consider upskilling or looking for roles with more aligned requirements");
        }

        return suggestions;
    }
}
