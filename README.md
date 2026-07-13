# AI Skill Navigator

**Author(s):** Palak Khonde  
**Affiliation:** St. Vincent Pallotti College of Engineering and Technology, Nagpur  
**Date:** June 2026  

---

## 🚀 Live Interactive Web App
We have converted the original python-based Jupyter Notebook model into a **premium, responsive Career Intelligence Dashboard** that runs entirely client-side in the browser. 

You can deploy this repository directly on **Vercel** with a single click, and it requires zero configuration!

### ✨ Key Features of the Web App
1. **Local PDF Resume Parser**: Drag-and-drop your resume PDF to extract text and match skills client-side (no data ever leaves your device).
2. **Dynamic ATS Score Calculator**: Real-time calculation based on the database of 26 technical skill domains.
3. **Interactive Skill Manager**: Add or remove skills dynamically to see how they impact your career matches in real time.
4. **Job Matching & Recommendations**: Automatic match scoring for 5 core paths:
   * Data Analyst
   * Machine Learning Engineer
   * AI Engineer
   * Backend Developer
   * Data Scientist
5. **Real-time Job Description (JD) Matcher**: Paste a job description to calculate compatibility and identify matching vs. missing skills instantly.
6. **Milestone Learning Roadmap**: Generates a month-by-month learning timeline for any selected target role, complete with estimated durations and high-quality learning resources.
7. **Professional PDF Career Report**: Generates and downloads a multi-page PDF report matching the dashboard's analysis.

---

## 🛠️ Technology Stack
* **Frontend**: Semantic HTML5, Vanilla CSS3 (custom CSS custom properties, responsive grids, glassmorphism design), and Vanilla JavaScript (ES6+).
* **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/) via CDN.
* **PDF Report Generation**: [jsPDF](https://github.com/parallax/jsPDF) via CDN.
* **Original Codebase**: Jupyter Notebook (`AI_Skill_Navigator.ipynb`) utilizing `PyPDF2`, `Pandas`, and `ReportLab` is preserved in the repository for reference.

---

## 📂 Project Structure
```
├── index.html                  # Main Web Dashboard UI
├── style.css                   # Custom stylesheets & animations
├── app.js                      # PDF parsing & recommendation logic
├── AI_Skill_Navigator.ipynb    # Original Jupyter Notebook implementation
└── README.md                   # Project documentation
```

---

## 💻 How to Run Locally
Since the application runs 100% client-side, you can run it locally without installing any dependencies:
1. Clone this repository.
2. Double-click the `index.html` file to open it in any modern browser (Chrome, Safari, Edge, Firefox).
3. Alternatively, run a lightweight local server:
   ```bash
   # Using Python
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## ☁️ How to Deploy on Vercel
Vercel offers native out-of-the-box hosting for static sites:
1. Commit all files in this repository and push them to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
3. Click **Add New...** -> **Project**.
4. Import your `Project-2` repository.
5. Vercel will auto-detect it as a static project. Click **Deploy**.
6. Your live web application will be ready in under 30 seconds!

---

## 📑 Project Abstract & Methodology
### Abstract
The AI Skill Navigator is an intelligent career guidance system designed to help students and job seekers analyze their resumes, identify existing skills, discover skill gaps, and receive personalized career recommendations. The system uses Natural Language Processing (NLP) techniques to extract skills from resumes and match them with industry-relevant job roles.

The methodology involves resume parsing, skill extraction, job-role matching, ATS score calculation, and learning roadmap generation. The system provides users with recommendations for suitable career paths and highlights missing skills required for their target roles. Results demonstrate effective resume analysis and personalized career guidance. This solution helps users make informed decisions about their professional development and improve their employability.

### Introduction
With the rapid growth of technology and increasing competition in the job market, identifying the right career path and required skills has become challenging for students and professionals. Many candidates struggle to understand how their existing skills align with industry requirements. The objective of this project is to develop an AI-powered career guidance system that automates resume analysis and provides personalized recommendations.

### Predefined Job Roles & Skill Database
The system evaluates candidates across a database of **26 technical skills** and matches them with **5 career pathways**:
* **Data Analyst**: `python`, `sql`, `excel`, `power bi`
* **Machine Learning Engineer**: `python`, `machine learning`, `tensorflow`, `docker`
* **AI Engineer**: `python`, `deep learning`, `tensorflow`, `pytorch`
* **Backend Developer**: `python`, `flask`, `django`, `sql`
* **Data Scientist**: `python`, `sql`, `machine learning`, `data analysis`

---

## ⚠️ Limitations
* Accuracy depends on the quality and format of the uploaded resume.
* Skill extraction is keyword-based; advanced semantic understanding (e.g., matching "Deep Learning" to "Neural Networks" implicitly) is a candidate for future LLM integration.
