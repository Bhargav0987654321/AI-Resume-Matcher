# 🔧 Installation & Environment Setup Guide

## System Requirements

### Minimum Requirements
- **OS**: Windows 10/11, macOS 10.14+, Linux (any distribution)
- **RAM**: 4GB (8GB recommended)
- **Disk Space**: 2GB free
- **Internet**: Required for first-time Maven build

### Required Software

#### 1. Java Development Kit (JDK) 17+

**Check if Java is installed:**
```bash
java -version
javac -version
```

**Install Java:**

**Windows:**
1. Download from: https://www.oracle.com/java/technologies/downloads/#java17
2. Run the installer
3. Follow the setup wizard
4. Restart your computer

**macOS:**
```bash
# Using Homebrew
brew install openjdk@17

# Add to PATH if needed
export JAVA_HOME=/usr/local/opt/openjdk@17
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

**Linux (Fedora/RHEL):**
```bash
sudo dnf install java-17-openjdk-devel
```

#### 2. Maven 3.6.0+

**Check if Maven is installed:**
```bash
mvn -version
```

**Install Maven:**

**Windows:**
1. Download from: https://maven.apache.org/download.cgi
2. Extract to `C:\Program Files\Maven`
3. Add `C:\Program Files\Maven\bin` to System PATH
4. Restart Command Prompt
5. Verify: `mvn -version`

**macOS:**
```bash
# Using Homebrew
brew install maven

# Verify
mvn -version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install maven
mvn -version
```

#### 3. Git (Optional but recommended)

**Check if installed:**
```bash
git --version
```

**Install from:** https://git-scm.com/downloads

#### 4. Text Editor or IDE

**Recommended Options:**
- Visual Studio Code (Free)
- IntelliJ IDEA Community (Free)
- Eclipse IDE (Free)
- Sublime Text (Paid)

---

## Environment Setup

### Windows Setup

#### Step 1: Set JAVA_HOME Variable
1. Open **System Properties** → **Advanced** tab
2. Click **Environment Variables**
3. Click **New** (System variables)
4. Variable name: `JAVA_HOME`
5. Variable value: `C:\Program Files\Java\jdk-17.x.x`
6. Click **OK** and restart

#### Step 2: Update PATH
1. In Environment Variables
2. Select **Path** and click **Edit**
3. Click **New**
4. Add: `C:\Program Files\Maven\bin`
5. Click **OK** and restart

#### Step 3: Verify Installation
```bash
echo %JAVA_HOME%
java -version
mvn -version
```

### macOS Setup

Add to `~/.zshrc` or `~/.bash_profile`:
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export MAVEN_HOME=/usr/local/opt/maven
export PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH
```

Then run:
```bash
source ~/.zshrc
java -version
mvn -version
```

### Linux Setup

Add to `~/.bashrc`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

Then run:
```bash
source ~/.bashrc
java -version
mvn -version
```

---

## Project Setup

### 1. Prepare Project Directory

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "C:\Projects\resume-matcher"
cd C:\Projects\resume-matcher
```

**macOS/Linux:**
```bash
mkdir -p ~/Projects/resume-matcher
cd ~/Projects/resume-matcher
```

### 2. Copy Project Files

Copy all files from `/mnt/user-data/outputs/` to your project directory:
- `pom.xml`
- `QUICK_START.md`
- `README.md`
- `PROJECT_SUMMARY.md`
- `frontend/` directory
- `src/` directory

### 3. Build Backend

```bash
# Navigate to project root (where pom.xml is)
cd resume-matcher

# Clean and install
mvn clean install

# Expected output:
# BUILD SUCCESS
```

**Troubleshooting:**
```bash
# If build fails, try:
mvn clean
mvn compile
mvn package

# For verbose output:
mvn clean install -X

# Skip tests (if needed):
mvn clean install -DskipTests
```

---

## Running the Application

### Method 1: From Command Line (Recommended)

**Terminal 1 - Backend:**
```bash
cd /path/to/project
mvn spring-boot:run
```

Wait for:
```
2024-03-15 ... Started ResumeMatcherApplication in X.XXX seconds
```

**Terminal 2 - Frontend:**
```bash
cd /path/to/project/frontend

# Option A: Python (Python 3+)
python -m http.server 5500

# Option B: Node.js
npx http-server -p 5500

# Option C: Using npm http-server
npm install -g http-server
http-server -p 5500
```

### Method 2: Using IDE

**IntelliJ IDEA:**
1. Open project folder
2. Wait for indexing
3. Right-click `ResumeMatcherApplication.java`
4. Select **Run**
5. Open browser to http://localhost:8080

**Visual Studio Code:**
1. Install Extension Pack for Java
2. Open project
3. Press F5 to debug
4. Or use Terminal → Run Task

---

## Port Configuration

### Change Backend Port
Edit `src/main/resources/application.properties`:
```properties
server.port=8081
```

### Change Frontend Port
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000
```

---

## Troubleshooting Installation

### Issue: "Java command not found"
```bash
# Windows: Check JAVA_HOME
echo %JAVA_HOME%

# macOS/Linux: Check JAVA_HOME
echo $JAVA_HOME

# If not set, follow environment setup above
```

### Issue: "Maven command not found"
```bash
# Windows: Check Maven PATH
where mvn

# macOS/Linux: Check Maven PATH
which mvn

# If not found, add to PATH (see setup above)
```

### Issue: "Port already in use"
```bash
# Windows: Find process on port 8080
netstat -ano | findstr :8080

# macOS/Linux: Find process on port 8080
lsof -i :8080

# Kill process and try again
# Or change port (see Port Configuration above)
```

### Issue: "Build failures"
```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Rebuild
mvn clean install

# Or use offline mode if cached
mvn install -o
```

### Issue: "CORS errors in browser"
```bash
# Ensure backend is running on http://localhost:8080
# Check frontend URL matches allowed origins in ResumeMatcherApplication.java
# Clear browser cache (Ctrl+Shift+Delete)
```

---

## Verification Checklist

After setup, verify everything works:

```bash
# 1. Check Java
java -version
# Should output: Java 17+

# 2. Check Maven
mvn -version
# Should output: Maven 3.6+

# 3. Build project
mvn clean install -DskipTests
# Should end with: BUILD SUCCESS

# 4. Check backend
curl http://localhost:8080/api/health
# Should output: "Backend is running!"

# 5. Check frontend
# Open http://localhost:5500 in browser
# Should see landing page
```

---

## Development Tools Recommendation

### IDEs
| IDE | Download | Best For |
|-----|----------|----------|
| VS Code | https://code.visualstudio.com/ | Lightweight, quick |
| IntelliJ | https://www.jetbrains.com/idea/ | Full-featured Java |
| Eclipse | https://www.eclipse.org/ | Enterprise development |

### Extensions (VS Code)
```
Extension Pack for Java
Spring Boot Extension Pack
REST Client
Live Server
```

### Browser DevTools
- **Chrome DevTools** (F12): Recommended
- **Firefox DevTools** (F12): Great alternative
- **Safari DevTools** (Cmd+Option+I): For macOS testing

---

## Build Profiles

### Development Profile
```bash
mvn clean install -P development
# Enables debug logging, hot reload
```

### Production Profile
```bash
mvn clean package -P production
# Minimizes size, optimizes for performance
```

---

## Docker Setup (Optional)

### Install Docker
Download from: https://www.docker.com/products/docker-desktop

### Build Docker Image
```bash
# Build JAR first
mvn clean package

# Create Dockerfile (provided in documentation)
# Build image
docker build -t resume-matcher:1.0 .

# Run container
docker run -p 8080:8080 resume-matcher:1.0
```

---

## Frequently Asked Questions

**Q: Can I use Java 11 instead of 17?**
A: Officially 17+, but may work with 11. Update pom.xml `<java.version>` if needed.

**Q: Do I need Node.js?**
A: No, only for `npm http-server`. Python is sufficient.

**Q: Can I run on different ports?**
A: Yes, update application.properties and frontend port.

**Q: How do I deploy to production?**
A: See README.md Deployment section or use Docker.

**Q: Where are files stored?**
A: All files are in-memory. Nothing persists to disk.

**Q: Can I customize the skill list?**
A: Yes, edit `SKILL_KEYWORDS` in SkillExtractorService.java

---

## Next Steps

1. ✅ Complete installation
2. ✅ Verify all components running
3. 📖 Read README.md for full documentation
4. 🚀 Run application with sample data
5. 🎨 Explore and customize
6. 📦 Deploy when ready

---

## Support Resources

- **Official Documentation**: See README.md
- **Quick Start**: See QUICK_START.md
- **Project Overview**: See PROJECT_SUMMARY.md
- **Java Docs**: https://docs.oracle.com/en/java/
- **Maven Guide**: https://maven.apache.org/guides/
- **Spring Boot**: https://spring.io/projects/spring-boot

---

## Environment Variables (Advanced)

Optional environment variables for production:

```bash
# Backend
export APP_PORT=8080
export LOG_LEVEL=INFO
export MAX_FILE_SIZE=10MB

# Frontend
export API_BASE_URL=http://localhost:8080/api
export FRONTEND_PORT=5500
```

---

## Version Information

```
Java: 17 LTS or higher
Maven: 3.6.0 or higher
Spring Boot: 3.1.5
Node.js: Optional (for npm)
Python: 3.6+ (for http.server)
```

---

**Ready to develop? Start with QUICK_START.md!**

For detailed project information, see PROJECT_SUMMARY.md

---

Last Updated: March 2024
