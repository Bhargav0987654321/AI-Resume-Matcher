package com.resumematcher.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class SkillExtractorService {

    // Comprehensive skill dictionary
    private static final Set<String> SKILL_KEYWORDS = new HashSet<>(Arrays.asList(
            // Programming Languages
            "java", "python", "javascript", "typescript", "c++", "c#", "go", "rust", "kotlin",
            "php", "ruby", "swift", "objective-c", "scala", "r", "matlab", "perl", "groovy",
            "coffeescript", "clojure", "haskell", "erlang", "elixir", "f#", "bash", "shell",
            
            // Web Frameworks & Libraries
            "spring", "spring boot", "spring mvc", "spring data", "spring cloud",
            "react", "vue", "angular", "node.js", "nodejs", "express", "fastapi", "flask",
            "django", "asp.net", "mvc", "laravel", "symfony", "rails", "gin", "echo",
            "hibernate", "jpa", "mybatis", "sequelize", "sqlalchemy", "entity framework",
            
            // Databases
            "sql", "mysql", "postgresql", "oracle", "mongodb", "redis", "elasticsearch",
            "cassandra", "dynamodb", "firestore", "sqlite", "mariadb", "neo4j", "memcached",
            "couchdb", "influxdb", "etcd", "solr", "h2", "hsqldb",
            
            // Cloud & DevOps
            "aws", "azure", "google cloud", "gcp", "docker", "kubernetes", "k8s",
            "jenkins", "gitlab", "github", "bitbucket", "terraform", "ansible", "vagrant",
            "chef", "puppet", "prometheus", "grafana", "elk", "newrelic", "datadog",
            "heroku", "netlify", "vercel", "cloudflare", "nginx", "apache",
            
            // Tools & Technologies
            "git", "maven", "gradle", "npm", "yarn", "pip", "docker-compose", "openstack",
            "kafka", "rabbitmq", "activemq", "jmeter", "selenium", "junit", "testng",
            "postman", "insomnia", "graphql", "rest", "soap", "websocket",
            
            // Big Data & Analytics
            "spark", "hadoop", "hive", "pig", "impala", "presto", "flink", "storm",
            "sqoop", "flume", "airflow", "dbt", "snowflake", "redshift", "bigquery",
            "tableau", "power bi", "looker", "qlikview", "splunk",
            
            // Machine Learning & AI
            "tensorflow", "keras", "pytorch", "scikit-learn", "sklearn", "xgboost",
            "lightgbm", "catboost", "nltk", "spacy", "opencv", "pandas", "numpy",
            "matplotlib", "seaborn", "plotly", "jupyter", "colab", "mlflow", "wandb",
            "machine learning", "deep learning", "nlp", "computer vision", "cv",
            
            // Mobile Development
            "android", "ios", "react native", "flutter", "xamarin", "ionic", "nativescript",
            
            // Other Technologies
            "html", "html5", "css", "css3", "sass", "scss", "less", "bootstrap",
            "webpack", "babel", "jest", "mocha", "chai", "cypress", "puppeteer",
            "linux", "unix", "windows", "macos", "aws s3", "aws ec2", "aws rds",
            "microservices", "monolith", "soap", "rpc", "message queue", "pub/sub",
            "agile", "scrum", "kanban", "waterfall", "devops", "cicd", "ci/cd",
            "svn", "perforce", "jira", "confluence", "slack", "teams",
            
            // Security
            "oauth", "jwt", "ssl", "tls", "https", "encryption", "authentication",
            "authorization", "cors", "csrf", "xss", "sql injection", "security",
            "penetration testing", "vulnerability assessment", "infosec",
            
            // Soft Skills (optional but useful)
            "communication", "teamwork", "leadership", "problem solving", "critical thinking",
            "project management", "time management", "attention to detail"
    ));

    public List<String> extractSkills(String text) {
        if (text == null || text.isEmpty()) {
            return new ArrayList<>();
        }

        String lowerText = text.toLowerCase();
        
        Set<String> foundSkills = new HashSet<>();
        
        // Extract skills by keyword matching
        for (String skill : SKILL_KEYWORDS) {
            if (lowerText.contains(skill)) {
                foundSkills.add(skill);
            }
        }

        // Extract common patterns (e.g., "v1.0" versions, "C++" variations)
        Pattern versionPattern = Pattern.compile("\\b(java|python|nodejs|node.js|go|rust|ruby|php|swift)\\s*\\d+");
        var matcher = versionPattern.matcher(lowerText);
        while (matcher.find()) {
            foundSkills.add(matcher.group(1));
        }

        return foundSkills.stream()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<String> extractKeywords(String text) {
        if (text == null || text.isEmpty()) {
            return new ArrayList<>();
        }

        String lowerText = text.toLowerCase();
        
        // Extract keywords that appear in tech context
        Set<String> keywords = new HashSet<>();
        
        for (String skill : SKILL_KEYWORDS) {
            if (lowerText.contains(skill)) {
                keywords.add(skill);
            }
        }

        return keywords.stream()
                .sorted()
                .collect(Collectors.toList());
    }
}
