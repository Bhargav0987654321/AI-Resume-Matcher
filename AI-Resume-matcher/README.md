# AI Resume Matcher - Complete Full-Stack Application

A modern, AI-powered web application that analyzes resumes and compares them with job descriptions to provide intelligent matching insights and recommendations.

## 🎯 Features

- **Resume Upload**: Support for PDF and DOCX formats
- **Job Description Input**: Paste complete job descriptions for analysis
- **AI-Powered Matching**: Intelligent skill extraction and comparison
- **Match Score**: Detailed percentage-based matching algorithm
- **Skill Analysis**: Identifies matched and missing skills
- **Smart Recommendations**: AI-generated suggestions for improvement
- **Visual Dashboard**: Interactive charts and visualizations
- **PDF Reports**: Professional downloadable analysis reports
- **Responsive Design**: Works seamlessly on desktop and mobile

## 📋 Technology Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Build Tool**: Maven
- **Libraries**:
  - Apache PDFBox 3.0.0 (PDF parsing)
  - Apache POI 5.2.3 (DOCX parsing)
  - iTextPDF 7.2.5 (PDF report generation)
  - OpenNLP 2.3.0 (NLP processing)
  - Lombok (Code generation)

### Frontend
- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with animations
- **Charts**: Chart.js 4.4.0
- **Animations**: GSAP 3.12.5
- **Fonts**: Google Fonts (Inter)

## 🚀 Quick Start

### Prerequisites
- Java Development Kit (JDK) 17 or higher
- Maven 3.6.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code, IntelliJ IDEA)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd /home/claude
```

2. **Install dependencies and build**
```bash
mvn clean install
```

3. **Run the Spring Boot application**
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

You should see:
```
Started ResumeMatcherApplication in X.XXX seconds
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd /home/claude/frontend
```

2. **Serve the frontend** (choose one method)

**Option A: Using Python's built-in server**
```bash
python -m http.server 5500
```

**Option B: Using Node.js http-server**
```bash
npx http-server -p 5500
```

**Option C: Using Live Server extension in VS Code**
- Install "Live Server" extension
- Right-click on `index.html` → Open with Live Server

3. **Open in browser**
Navigate to: `http://localhost:5500` or `http://127.0.0.1:5500`

## 📁 Project Structure

```
AI-Resume-Matcher/
├── pom.xml                                    # Maven configuration
├── src/
│   ├── main/
│   │   ├── java/com/resumematcher/
│   │   │   ├── ResumeMatcherApplication.java  # Main Spring Boot class
│   │   │   ├── controller/
│   │   │   │   └── ResumeController.java      # REST API endpoints
│   │   │   ├── service/
│   │   │   │   ├── ResumeParserService.java   # PDF/DOCX parsing
│   │   │   │   ├── SkillExtractorService.java # Skill extraction
│   │   │   │   └── JobMatcherService.java     # Matching logic
│   │   │   ├── model/
│   │   │   │   ├── ResumeData.java            # Resume data model
│   │   │   │   └── MatchResult.java           # Match result model
│   │   │   └── util/
│   │   │       └── ReportGenerator.java       # PDF report generation
│   │   └── resources/
│   │       └── application.properties         # Configuration
│   └── test/
└── frontend/
    ├── index.html                             # Landing page
    ├── upload.html                            # Resume upload page
    ├── result.html                            # Results dashboard
    ├── css/
    │   ├── style.css                          # Main styles
    │   └── animations.css                     # Animations
    └── js/
        ├── upload.js                          # Upload logic
        ├── analysis.js                        # Results display
        └── charts.js                          # Chart rendering
```

## 🔌 API Endpoints

### POST /api/matchResume
Uploads resume and compares with job description.

**Request:**
```
Content-Type: multipart/form-data

Parameters:
- file: MultipartFile (PDF or DOCX)
- jobDescription: String (plaintext)
```

**Response:**
```json
{
  "matchScore": 78,
  "matchedSkills": ["Java", "Spring Boot", "SQL"],
  "missingSkills": ["Docker", "Kubernetes"],
  "suggestions": ["Learn Docker...", "Add projects..."],
  "matchPercentage": 78.0,
  "resumeText": "...",
  "jobDescription": "...",
  "candidateName": null
}
```

### GET /api/analysisReport
Generates and downloads PDF report.

**Response:**
- PDF file with analysis report

### GET /api/health
Health check endpoint.

**Response:**
```json
"Backend is running!"
```

## 🎨 Features Explained

### 1. Resume Parsing
- Extracts text from PDF files using Apache PDFBox
- Extracts text from DOCX files using Apache POI
- Supports documents up to 10MB
- Handles various resume formats

### 2. Skill Extraction
- Comprehensive skill dictionary with 100+ technologies
- Categories: Programming Languages, Frameworks, Databases, Cloud, Tools, ML/AI
- Keyword matching with intelligent detection
- Supports skill variations (e.g., "JavaScript", "JS")

### 3. Job Matching Algorithm
- Compares resume skills with job requirements
- Calculates match percentage based on skill overlap
- Identifies skill gaps
- Provides AI-powered recommendations

### 4. Smart Recommendations
- Personalized suggestions based on analysis
- Actionable improvement strategies
- ATS compatibility tips
- Career development guidance

### 5. Visualizations
- Match score gauge chart
- Skill radar chart (matched vs missing)
- Skill distribution analysis
- Interactive dashboard

### 6. PDF Report Generation
- Professional formatting
- Match score summary
- Detailed skill analysis
- Recommendations and next steps
- High-quality printable document

## 🧪 Testing the Application

### Sample Resume Text
```
Senior Java Developer with 5+ years of experience

Technical Skills:
- Java, Spring Boot, SQL, REST APIs
- Docker, Kubernetes, AWS EC2
- MySQL, MongoDB, Redis
- Git, Maven, Jenkins

Experience:
- Developed microservices using Spring Boot
- Deployed applications on AWS
- Managed CI/CD pipelines with Jenkins
```

### Sample Job Description
```
Senior Backend Engineer

Requirements:
- 5+ years Java development
- Spring Boot and microservices
- Docker and Kubernetes
- AWS or Azure cloud
- Strong SQL and database design
- REST API development
- Team collaboration and leadership

Nice to have:
- Machine Learning experience
- DevOps knowledge
- Open source contributions
```

Expected Result: ~75% match with 8-10 matched skills

## 🐛 Troubleshooting

### Backend Issues

**Problem: "Port 8080 already in use"**
```bash
# Change port in application.properties
server.port=8081
```

**Problem: "Cannot find mvn command"**
- Ensure Maven is installed and in PATH
- On Windows, add Maven bin folder to System PATH
- On Mac/Linux, install via: `brew install maven` or `apt-get install maven`

**Problem: "Java version mismatch"**
- Verify Java version: `java -version`
- Must be Java 17 or higher
- Update `pom.xml` if needed

### Frontend Issues

**Problem: "Backend not reachable" error**
- Ensure Spring Boot is running on port 8080
- Check browser console for CORS errors
- Verify firewall settings

**Problem: "File upload fails"**
- Check file size (max 10MB)
- Verify file format (PDF or DOCX)
- Check browser console for errors

**Problem: "Charts not displaying"**
- Clear browser cache (Ctrl+Shift+Delete)
- Check JavaScript console for errors
- Ensure Chart.js CDN is accessible

## 📊 Performance Notes

- Average analysis time: 2-5 seconds
- Maximum resume size: 10MB
- Maximum job description: 5000 characters
- Browser compatibility: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🔒 Security Considerations

- File uploads are temporarily stored in memory
- No data is persisted to database
- CORS is configured for localhost development
- File size limits prevent memory issues
- Input validation for file types and sizes

For production deployment, consider:
- Implement database for result storage
- Add user authentication
- Enhance file upload validation
- Implement rate limiting
- Use HTTPS for all communications
- Add request/response encryption

## 🚀 Production Deployment

### Docker Deployment

1. **Create Dockerfile**
```dockerfile
FROM openjdk:17-slim
COPY target/ai-resume-matcher-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080
```

2. **Build and run**
```bash
mvn clean package
docker build -t resume-matcher .
docker run -p 8080:8080 resume-matcher
```

### Cloud Deployment (AWS/Azure/GCP)
- Deploy JAR to App Engine, Cloud Run, or App Service
- Use managed databases if needed
- Configure environment variables for production
- Set up proper logging and monitoring

## 📈 Future Enhancements

- [ ] User authentication and profiles
- [ ] Resume history and tracking
- [ ] Multiple resume comparison
- [ ] Interview preparation tips
- [ ] Salary range estimation
- [ ] Job market insights
- [ ] LinkedIn integration
- [ ] Mobile app version
- [ ] Advanced NLP with ML models
- [ ] Real-time collaboration features

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📧 Support

For issues, questions, or suggestions:
- Check the troubleshooting section
- Review API documentation
- Check browser console for errors
- Verify backend is running properly

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Apache PDFBox Guide](https://pdfbox.apache.org/)
- [iTextPDF Tutorial](https://itextpdf.com/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Built with ❤️ for job seekers everywhere.**
