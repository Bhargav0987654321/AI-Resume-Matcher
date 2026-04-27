package com.resumematcher.model;

import java.util.List;

public class MatchResult {
    private int matchScore;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> suggestions;
    private String resumeText;
    private String jobDescription;
    private String candidateName;
    private double matchPercentage;

    public MatchResult() {
    }

    public MatchResult(int matchScore, List<String> matchedSkills, List<String> missingSkills,
                       List<String> suggestions, String resumeText, String jobDescription,
                       String candidateName, double matchPercentage) {
        this.matchScore = matchScore;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.suggestions = suggestions;
        this.resumeText = resumeText;
        this.jobDescription = jobDescription;
        this.candidateName = candidateName;
        this.matchPercentage = matchPercentage;
    }

    public int getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(int matchScore) {
        this.matchScore = matchScore;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public String getResumeText() {
        return resumeText;
    }

    public void setResumeText(String resumeText) {
        this.resumeText = resumeText;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public double getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(double matchPercentage) {
        this.matchPercentage = matchPercentage;
    }
}