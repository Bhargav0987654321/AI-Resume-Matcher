# 🚀 AI Resume Matcher - Quick Start Guide

## 5-Minute Setup

### Step 1: Start Backend (Terminal 1)

```bash
cd /home/claude
mvn clean install
mvn spring-boot:run
```

Wait for this message:
```
Started ResumeMatcherApplication in X.XXX seconds
```

✅ Backend running on http://localhost:8080

---

### Step 2: Start Frontend (Terminal 2)

```bash
cd /home/claude/frontend

# Option A: Python
python -m http.server 5500

# Option B: Node.js
npx http-server -p 5500
```

Wait for:
```
Serving HTTP on 0.0.0.0 port 5500
```

✅ Frontend running on http://localhost:5500

---

### Step 3: Open in Browser

Navigate to: **http://localhost:5500**

🎉 You're done! The application is ready to use.

---

## 📝 How to Use

### 1. Go to "Analyze" Page
Click "Analyze" in the navigation menu or "Start Analyzing" button

### 2. Upload Your Resume
- Click the upload area or drag & drop
- Supports PDF and DOCX formats
- Max 10MB file size

### 3. Paste Job Description
- Paste the complete job description
- Minimum 50 characters required
- Include full requirements

### 4. Click "Analyze Resume"
- Takes 2-5 seconds to complete
- Shows processing status
- Automatically redirects to results

### 5. View Results
- See match percentage
- Check matched skills
- Review missing skills
- Read recommendations
- Download PDF report

---

## 🧪 Test Data

### Sample Resume
```
Senior Java Developer

Skills: Java, Spring Boot, SQL, REST APIs, Docker, AWS, MongoDB, Git, Maven

Experience:
- 5+ years Java development
- Spring Boot microservices
- AWS cloud deployment
- Team leadership

Education: B.Sc Computer Science
```

### Sample Job Description
```
We are looking for a Senior Java Developer

Requirements:
- 5+ years Java experience
- Spring Boot framework
- REST API development
- Docker and Kubernetes
- AWS or Azure cloud
- SQL database design
- Git version control
- Team collaboration

Nice to have:
- Microservices architecture
- DevOps experience
- Jenkins CI/CD
- Machine learning basics
```

**Expected Match: ~75%**

---

## ✅ Verification Checklist

- [ ] Backend started successfully (Terminal 1)
- [ ] No errors in backend terminal
- [ ] Frontend started successfully (Terminal 2)
- [ ] Browser opens to http://localhost:5500
- [ ] Navigation menu visible
- [ ] "Analyze" page loads
- [ ] File upload area visible
- [ ] Can paste job description
- [ ] "Analyze Resume" button clickable
- [ ] Results page displays after analysis

---

## 🆘 Troubleshooting

### Backend Won't Start
```bash
# Check Java version (must be 17+)
java -version

# Check if port 8080 is in use
# Windows: netstat -ano | findstr :8080
# Mac/Linux: lsof -i :8080

# Change port if needed in application.properties
# Change server.port=8080 to server.port=8081
```

### Frontend Won't Load
```bash
# Clear browser cache: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
# Try different port if 5500 is in use
# python -m http.server 8000
```

### "Backend not reachable" Error
- Confirm backend is running: http://localhost:8080/api/health
- Check browser console (F12) for CORS errors
- Verify firewall isn't blocking port 8080

### Upload Fails
- Check file size (max 10MB)
- Verify file format (PDF or DOCX only)
- Check browser console (F12) for errors

---

## 📊 Application Overview

```
┌─────────────────────────────────────┐
│      AI Resume Matcher App           │
├─────────────────────────────────────┤
│  Frontend (HTML/CSS/JS)              │
│  ├─ index.html (Landing)             │
│  ├─ upload.html (Upload Form)        │
│  └─ result.html (Dashboard)          │
├─────────────────────────────────────┤
│  Backend (Spring Boot)               │
│  ├─ Resume Parser (PDF/DOCX)         │
│  ├─ Skill Extractor (100+ skills)    │
│  ├─ Job Matcher (Algorithm)          │
│  └─ PDF Report Generator             │
├─────────────────────────────────────┤
│  External Libraries                  │
│  ├─ Chart.js (Visualizations)        │
│  ├─ PDFBox (PDF Parsing)             │
│  └─ iTextPDF (Report Gen)            │
└─────────────────────────────────────┘
```

---

## 💡 Key Features

✅ **Smart Skill Detection** - 100+ technologies
✅ **Match Algorithm** - Accurate percentage-based matching
✅ **AI Recommendations** - Personalized improvement tips
✅ **Beautiful UI** - Modern dark theme with animations
✅ **PDF Reports** - Professional downloadable reports
✅ **Responsive Design** - Works on all devices
✅ **Fast Performance** - 2-5 second analysis

---

## 📚 Full Documentation

For detailed information, refer to **README.md** in the project root.

---

## 🎯 Next Steps

1. **Explore the UI** - Navigate through all pages
2. **Test with samples** - Try with test data provided
3. **Customize** - Modify skills list or algorithm
4. **Deploy** - Use Docker for production
5. **Extend** - Add more features as needed

---

## 🔧 Project Structure

```
/home/claude/
├── pom.xml (Maven config)
├── README.md (Full documentation)
├── QUICK_START.md (This file)
├── src/ (Backend Java code)
│   ├── controller/
│   ├── service/
│   ├── model/
│   └── util/
└── frontend/ (Frontend files)
    ├── index.html
    ├── upload.html
    ├── result.html
    ├── css/
    │   ├── style.css
    │   └── animations.css
    └── js/
        ├── upload.js
        ├── analysis.js
        └── charts.js
```

---

**Happy analyzing! 🚀**

For support, check README.md or visit: http://localhost:5500

Last Updated: March 2024
