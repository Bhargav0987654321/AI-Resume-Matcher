# 🚀 RUN THE APP RIGHT NOW - 5 EASY STEPS

## 📍 Project Location

All your files are here:
```
/mnt/user-data/outputs/
```

## 🎯 What You Need First

```bash
# Check Java (need Java 17+)
java -version

# Check Maven (need Maven 3.6+)
mvn -version
```

**Don't have them?** Follow INSTALLATION.md first, then come back here.

---

## ⚡ Run in 5 Steps

### Step 1: Open Terminal 1 (Backend)
```bash
cd /mnt/user-data/outputs
mvn spring-boot:run
```

✅ Wait for:
```
Started ResumeMatcherApplication in X.XXX seconds
```

**Leave this terminal OPEN** - don't close it!

---

### Step 2: Open Terminal 2 (Frontend)
```bash
cd /mnt/user-data/outputs/frontend
python -m http.server 5500
```

✅ You should see:
```
Serving HTTP on 0.0.0.0 port 5500
```

**Leave this terminal OPEN** - don't close it!

---

### Step 3: Open Browser
Go to:
```
http://localhost:5500
```

✅ You should see the **beautiful landing page** with "Resume Matcher" title

---

### Step 4: Upload Resume
1. Click **"Analyze"** in the menu (or "Start Analyzing" button)
2. Click the **upload area** or drag & drop a file
3. **Upload any PDF or DOCX** (or use the sample text below)

---

### Step 5: Paste Job Description & Analyze
1. Click in the **"Job description"** text area
2. **Paste any job description** (or use the sample below)
3. Click **"Analyze Resume"** button
4. **Wait 3-5 seconds** for results
5. See the beautiful **results dashboard** with charts!

---

## 📋 Test with Sample Data

### Sample Resume Text
Save as `resume.txt`:
```
Senior Java Developer

Skills:
Java, Spring Boot, SQL, REST APIs, Docker, AWS, MongoDB, Git, Maven, Jenkins, Kubernetes

Experience:
- 5+ years Java development
- Spring Boot microservices
- AWS EC2 and RDS
- Docker containerization
- CI/CD with Jenkins

Education:
B.Sc Computer Science
```

Then upload the .txt file (or copy-paste the content)

### Sample Job Description
```
Senior Backend Engineer - Hiring Now!

Requirements:
- 5+ years Java experience
- Spring Boot and microservices expertise
- REST API development
- Docker and Kubernetes knowledge
- AWS or Azure cloud experience
- SQL and database design
- Git version control
- Strong team collaboration

Nice to have:
- DevOps experience
- Jenkins CI/CD
- Machine learning basics
- Open source contributions
```

**Expected Result: ~75% match** ✅

---

## ✅ Troubleshooting

### Backend won't start?
```bash
# Check if port 8080 is available
# Windows:
netstat -ano | findstr :8080

# Mac/Linux:
lsof -i :8080

# If in use, change port in pom.xml or wait for process to end
```

### Frontend won't load?
```bash
# Clear browser cache: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
# Try a different port:
python -m http.server 8000
# Then go to http://localhost:8000
```

### "Backend not reachable" error?
- Make sure Terminal 1 is still running (backend)
- Check if it says "Started ResumeMatcherApplication"
- It should be on port 8080

### File upload fails?
- Check file size (max 10MB)
- Must be PDF or DOCX format
- Try with a different file

---

## 🎊 What Happens Next

1. **Upload succeeds** → Page shows "Analysis in progress..."
2. **Analysis completes** → Automatically redirects to results
3. **Results page shows:**
   - ✅ Match percentage (0-100%)
   - ✅ Matched skills list
   - ❌ Missing skills list
   - 💡 AI recommendations
   - 📊 Interactive charts

4. **Download PDF** → Click "Download PDF Report" button

---

## 📁 Important Folder Locations

```
/mnt/user-data/outputs/              ← Main project folder
├── pom.xml                           ← Maven configuration
├── src/                              ← Backend Java code
├── frontend/                         ← Frontend HTML/CSS/JS
├── _READ_ME_FIRST.txt               ← Start here
├── START_HERE.md                    ← Navigation guide
├── INSTALLATION.md                  ← Setup help
├── QUICK_START.md                   ← Full startup guide
├── README.md                        ← Complete docs
└── PROJECT_SUMMARY.md               ← Technical details
```

---

## 🔄 The 3 Terminals You'll Have

```
┌─────────────────────────────────────────────┐
│ Terminal 1: Backend                         │
│ $ cd /mnt/user-data/outputs                │
│ $ mvn spring-boot:run                      │
│ ✅ Keep running                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Terminal 2: Frontend                        │
│ $ cd /mnt/user-data/outputs/frontend       │
│ $ python -m http.server 5500               │
│ ✅ Keep running                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Browser: Open http://localhost:5500        │
│ ✅ The application!                        │
└─────────────────────────────────────────────┘
```

---

## ⏱️ Timeline

- **First build**: 2-3 minutes (downloading dependencies)
- **Starting backend**: 30 seconds
- **Starting frontend**: 5 seconds
- **Loading page**: < 2 seconds
- **Analysis**: 3-5 seconds per file

**Total time to first analysis: ~10 minutes**

---

## 🎯 Quick Command Cheat Sheet

```bash
# Start everything
cd /mnt/user-data/outputs

# Terminal 1 - Backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend && python -m http.server 5500

# Test backend is running
curl http://localhost:8080/api/health

# Kill a process (if needed)
# Windows: taskkill /PID <pid> /F
# Mac/Linux: kill -9 <pid>
```

---

## 🔗 URLs You'll Use

```
Frontend:  http://localhost:5500
Backend:   http://localhost:8080
API:       http://localhost:8080/api/matchResume
Health:    http://localhost:8080/api/health
```

---

## 📞 If Something Goes Wrong

1. **Read QUICK_START.md** - Common issues
2. **Read INSTALLATION.md** - Setup problems
3. **Check browser console** - F12 → Console tab
4. **Check terminal output** - Look for error messages

---

## 🎉 YOU'RE READY!

Follow the 5 steps above and you'll have the app running in minutes!

**Questions?** All answers are in the documentation files.

**Let's GO!** 🚀

---

**Next: Open another terminal and run `cd /mnt/user-data/outputs && mvn spring-boot:run`**
