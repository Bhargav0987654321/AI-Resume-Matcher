package com.resumematcher.model;

public class ResumeData {
    private String candidateName;
    private String skills;
    private String experience;
    private String education;
    private String rawText;

    public ResumeData() {
    }

    public ResumeData(String candidateName, String skills, String experience, String education, String rawText) {
        this.candidateName = candidateName;
        this.skills = skills;
        this.experience = experience;
        this.education = education;
        this.rawText = rawText;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getRawText() {
        return rawText;
    }

    public void setRawText(String rawText) {
        this.rawText = rawText;
    }
}