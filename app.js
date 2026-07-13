/* 
   AI Skill Navigator - Client-side Logic
   Implements PDF parsing, state orchestration, matching logic, and PDF generation.
*/

// Set up PDF.js Global Worker
const pdfjsLib = window.pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Predefined Skill Database
const SKILL_DATABASE = [
    "python",
    "java",
    "c++",
    "sql",
    "mysql",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "flask",
    "django",
    "html",
    "css",
    "javascript",
    "react",
    "nodejs",
    "mongodb",
    "power bi",
    "excel",
    "data analysis",
    "nlp",
    "computer vision",
    "docker",
    "aws",
    "git",
    "github"
];

// Predefined Job Roles and Required Skills
const JOB_ROLES = {
    "Data Analyst": [
        "python",
        "sql",
        "excel",
        "power bi"
    ],
    "Machine Learning Engineer": [
        "python",
        "machine learning",
        "tensorflow",
        "docker"
    ],
    "AI Engineer": [
        "python",
        "deep learning",
        "tensorflow",
        "pytorch"
    ],
    "Backend Developer": [
        "python",
        "flask",
        "django",
        "sql"
    ],
    "Data Scientist": [
        "python",
        "sql",
        "machine learning",
        "data analysis"
    ]
};

// Rich Learning Resources for Each Skill in the Database
const SKILL_RESOURCES = {
    "python": {
        concept: "Core Python syntax, data structures, OOP principles, and package management.",
        time: "3-4 weeks",
        links: [
            { name: "Python.org Tutorial", url: "https://docs.python.org/3/tutorial/" },
            { name: "Core Python - Kaggle", url: "https://www.kaggle.com/learn/python" }
        ]
    },
    "java": {
        concept: "Object-Oriented programming in Java, JVM architectures, multithreading, and collections.",
        time: "4-6 weeks",
        links: [
            { name: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/" },
            { name: "Java on Codecademy", url: "https://www.codecademy.com/learn/learn-java" }
        ]
    },
    "c++": {
        concept: "C++ syntax, memory management, pointers, and STL containers/algorithms.",
        time: "5-6 weeks",
        links: [
            { name: "LearnCPP.com", url: "https://www.learncpp.com/" },
            { name: "C++ reference", url: "https://en.cppreference.com/" }
        ]
    },
    "sql": {
        concept: "Relational database queries, JOINS, aggregation, subqueries, and window functions.",
        time: "2-3 weeks",
        links: [
            { name: "SQL Zoo Tutorials", url: "https://sqlzoo.net/" },
            { name: "Intro to SQL - Kaggle", url: "https://www.kaggle.com/learn/intro-to-sql" }
        ]
    },
    "mysql": {
        concept: "MySQL installation, design patterns, transaction management, indexing, and normalization.",
        time: "2-3 weeks",
        links: [
            { name: "MySQL Documentation", url: "https://dev.mysql.com/doc/" },
            { name: "MySQL Tutorial", url: "https://www.mysqltutorial.org/" }
        ]
    },
    "machine learning": {
        concept: "Regression, classification, clustering, evaluation metrics, and scikit-learn pipeline.",
        time: "6-8 weeks",
        links: [
            { name: "ML Specialization - Andrew Ng", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
            { name: "Intro to ML - Kaggle", url: "https://www.kaggle.com/learn/intro-to-machine-learning" }
        ]
    },
    "deep learning": {
        concept: "Artificial Neural Networks (ANNs), backpropagation, activation functions, CNNs, and RNNs.",
        time: "6-8 weeks",
        links: [
            { name: "Deep Learning Specialization", url: "https://www.deeplearning.ai/courses/deep-learning-specialization/" },
            { name: "Fast.ai Practical Course", url: "https://www.fast.ai/" }
        ]
    },
    "tensorflow": {
        concept: "TensorFlow tensors, Keras sequential/functional API, training loops, and Model saving/loading.",
        time: "4 weeks",
        links: [
            { name: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" },
            { name: "TensorFlow Certificate Study", url: "https://www.tensorflow.org/certificate" }
        ]
    },
    "pytorch": {
        concept: "PyTorch Tensors, Autograd, custom Module development, DataLoader API, and GPU training.",
        time: "4 weeks",
        links: [
            { name: "PyTorch Basics Tutorial", url: "https://pytorch.org/tutorials/beginner/basics/intro.html" },
            { name: "Deep Learning with PyTorch", url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html" }
        ]
    },
    "flask": {
        concept: "Micro-framework patterns, routing, request/response cycle, templates (Jinja), and API design.",
        time: "2-3 weeks",
        links: [
            { name: "Flask Documentation", url: "https://flask.palletsprojects.com/" },
            { name: "Flask Mega-Tutorial", url: "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world" }
        ]
    },
    "django": {
        concept: "MVT pattern, ORM database models, Django Admin console, authentication, and REST API framework.",
        time: "4-5 weeks",
        links: [
            { name: "Django Girls Tutorial", url: "https://tutorial.djangogirls.org/" },
            { name: "Official Django Tutorial", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/" }
        ]
    },
    "html": {
        concept: "Semantic tags, document structure, accessibility standards, and SEO tags.",
        time: "1 week",
        links: [
            { name: "MDN HTML basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
            { name: "HTML on w3schools", url: "https://www.w3schools.com/html/" }
        ]
    },
    "css": {
        concept: "Flexbox, Grid layouts, custom variables, responsive designs with media queries, and keyframe animations.",
        time: "2-3 weeks",
        links: [
            { name: "MDN CSS layout", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS" },
            { name: "CSS Tricks guides", url: "https://css-tricks.com/" }
        ]
    },
    "javascript": {
        concept: "ES6 syntax, DOM manipulation, promises, async/await operations, event loops, and API fetch calls.",
        time: "4-6 weeks",
        links: [
            { name: "Javascript.info tutorial", url: "https://javascript.info/" },
            { name: "MDN JavaScript guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
        ]
    },
    "react": {
        concept: "Component states, props, hooks (useState, useEffect, useContext), virtual DOM, and SPA routing.",
        time: "4-6 weeks",
        links: [
            { name: "React Dev Documentation", url: "https://react.dev/" },
            { name: "Scrimba Learn React", url: "https://scrimba.com/learn/learnreact" }
        ]
    },
    "nodejs": {
        concept: "Node environment setup, npm package management, Express routing, file operations, and server processes.",
        time: "4 weeks",
        links: [
            { name: "Node.js Learning Path", url: "https://nodejs.org/en/learn" },
            { name: "Express guides", url: "https://expressjs.com/" }
        ]
    },
    "mongodb": {
        concept: "NoSQL patterns, collections/documents, aggregation queries, and mongoose integration.",
        time: "2-3 weeks",
        links: [
            { name: "MongoDB University", url: "https://learn.mongodb.com/" },
            { name: "MongoDB Basics", url: "https://www.w3schools.com/mongodb/" }
        ]
    },
    "power bi": {
        concept: "Data connection pipelines, Dax modeling equations, custom visualizations, and cloud publishing.",
        time: "3 weeks",
        links: [
            { name: "Microsoft Power BI Path", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi" },
            { name: "Power BI Guide - Maven", url: "https://mavenanalytics.io/" }
        ]
    },
    "excel": {
        concept: "Formulas (VLOOKUP, INDEX/MATCH), pivot tables, data visualization tools, and basic macros.",
        time: "2 weeks",
        links: [
            { name: "Microsoft Excel Training", url: "https://support.microsoft.com/en-us/excel" },
            { name: "Chandoo Excel tutorials", url: "https://chandoo.org/" }
        ]
    },
    "data analysis": {
        concept: "Exploratory Data Analysis (EDA), cleaning nulls/duplicates, statistical metrics, and visualization plots.",
        time: "4-5 weeks",
        links: [
            { name: "EDA Guide - Kaggle", url: "https://www.kaggle.com/code/kashnitsky/topic-1-exploratory-data-analysis-with-pandas" },
            { name: "Data Analyst Roadmap", url: "https://roadmap.sh/data-analyst" }
        ]
    },
    "nlp": {
        concept: "Tokenization, stopwords, TF-IDF, Word Embeddings, Transformers, and Named Entity Recognition (NER).",
        time: "5-6 weeks",
        links: [
            { name: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course" },
            { name: "NLTK/Spacy Tutorials", url: "https://spacy.io/usage/spacy-101" }
        ]
    },
    "computer vision": {
        concept: "Image filtering, contour checks, OpenCV tools, CNN classifiers, object detection (YOLO), and transfer learning.",
        time: "5-6 weeks",
        links: [
            { name: "OpenCV Guides", url: "https://docs.opencv.org/master/" },
            { name: "YOLO v8 guides", url: "https://docs.ultralytics.com/" }
        ]
    },
    "docker": {
        concept: "Container structures, creating custom Dockerfiles, volume bindings, network bridges, and docker-compose.",
        time: "2-3 weeks",
        links: [
            { name: "Docker Getting Started", url: "https://www.docker.com/101-tutorial/" },
            { name: "Docker Roadmap", url: "https://roadmap.sh/docker" }
        ]
    },
    "aws": {
        concept: "IAM permissions, EC2 instances, S3 storage buckets, Lambda micro-functions, and database pipelines (RDS).",
        time: "4-6 weeks",
        links: [
            { name: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
            { name: "AWS Cloud Practitioner guide", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/" }
        ]
    },
    "git": {
        concept: "Local repository initialization, staging commits, branches, merges, and conflict resolutions.",
        time: "1 week",
        links: [
            { name: "Git Book", url: "https://git-scm.com/book/en/v2" },
            { name: "GitHub Git Handbook", url: "https://guides.github.com/introduction/git-handbook/" }
        ]
    },
    "github": {
        concept: "Remote repositories, fork/pull requests, code reviews, issues, and automated GitHub Actions workflows.",
        time: "1 week",
        links: [
            { name: "GitHub Skills", url: "https://skills.github.com/" },
            { name: "Git & GitHub - YouTube", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
        ]
    }
};

// Application State
let appState = {
    detectedSkills: [],
    targetRole: "",
    rawResumeText: "",
    theme: "dark"
};

// UI Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('pdf-file-input');
const fileNameDisplay = document.getElementById('file-name-display');
const rawTextInput = document.getElementById('raw-text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

const atsPercentageDisplay = document.getElementById('ats-percentage-display');
const atsRatingStatus = document.getElementById('ats-rating-status');
const progressCircle = document.querySelector('.progress-ring__circle');

const statSkillsCount = document.getElementById('stat-skills-count');
const statTargetRole = document.getElementById('stat-target-role');

const skillsContainer = document.getElementById('skills-container');
const newSkillInput = document.getElementById('new-skill-input');
const addSkillBtn = document.getElementById('add-skill-btn');
const skillsSuggestions = document.getElementById('skills-suggestions');
const skillsCountBadge = document.getElementById('skills-count-badge');

const rolesGrid = document.getElementById('roles-grid');

const jdTextInput = document.getElementById('jd-text-input');
const jdMatchRateValue = document.getElementById('jd-match-rate-value');
const jdMatchProgressBar = document.getElementById('jd-match-progress-bar');
const jdMatchedTags = document.getElementById('jd-matched-tags');
const jdMissingTags = document.getElementById('jd-missing-tags');

const roadmapTimeline = document.getElementById('roadmap-timeline');
const roadmapTargetRoleName = document.getElementById('roadmap-target-role-name');
const downloadReportBtn = document.getElementById('download-report-btn');

// Initialize SVG Progress Circle parameters
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Document Load Setup
document.addEventListener('DOMContentLoaded', () => {
    populateSkillSuggestions();
    setupEventListeners();
    updateUI();
});

// Setup input datalist options dynamically
function populateSkillSuggestions() {
    skillsSuggestions.innerHTML = "";
    SKILL_DATABASE.forEach(skill => {
        const option = document.createElement('option');
        option.value = skill;
        skillsSuggestions.appendChild(option);
    });
}

// Attach listeners to user action items
function setupEventListeners() {
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // File Drag and Drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    // Run analysis button
    analyzeBtn.addEventListener('click', runAnalysis);

    // Manual skill entry forms
    addSkillBtn.addEventListener('click', handleManualSkillAdd);
    newSkillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleManualSkillAdd();
        }
    });

    // Real-time job description change tracking
    jdTextInput.addEventListener('input', runJdAnalysis);

    // Save report PDF action
    downloadReportBtn.addEventListener('click', generatePDFReport);
}

// Toggle light/dark themes
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    const sunIcon = themeToggleBtn.querySelector('i');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        sunIcon.className = "fa-solid fa-moon";
        appState.theme = "light";
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        sunIcon.className = "fa-solid fa-sun";
        appState.theme = "dark";
    }
}

// Handle local PDF selection
function handleFileSelect(file) {
    if (file.type !== "application/pdf") {
        alert("Please upload a PDF file only.");
        return;
    }
    fileNameDisplay.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    fileNameDisplay.style.display = 'block';
    
    // Read PDF file text client-side
    const reader = new FileReader();
    reader.onload = async function() {
        try {
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Parsing PDF file...';
            
            const typedarray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            let extractedText = "";
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                extractedText += pageText + "\n";
            }
            
            appState.rawResumeText = extractedText;
            rawTextInput.value = extractedText;
            
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Run AI Analysis';
            
            // Auto run analysis
            runAnalysis();
        } catch (error) {
            console.error("PDF extraction error: ", error);
            alert("Error parsing PDF resume. You can copy and paste the text manually into the text box below.");
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Run AI Analysis';
        }
    };
    reader.readAsArrayBuffer(file);
}

// Core parsing matching function (Replicates original logic)
function runAnalysis() {
    let text = rawTextInput.value.trim();
    if (!text && appState.rawResumeText) {
        text = appState.rawResumeText;
    }
    
    if (!text) {
        alert("Please upload a PDF resume or paste resume text into the text area first.");
        return;
    }
    
    const textLower = text.toLowerCase();
    const matched = [];
    
    // Simple substring inclusion matching (matches notebook logic exactly)
    SKILL_DATABASE.forEach(skill => {
        if (textLower.includes(skill)) {
            matched.push(skill);
        }
    });
    
    appState.detectedSkills = matched;
    
    // Choose initial target role dynamically (highest match score)
    let bestScore = -1;
    let selectedRole = "";
    
    Object.keys(JOB_ROLES).forEach(role => {
        const required = JOB_ROLES[role];
        const intersect = matched.filter(s => required.includes(s));
        const score = (intersect.length / required.length) * 100;
        if (score > bestScore) {
            bestScore = score;
            selectedRole = role;
        }
    });
    
    appState.targetRole = selectedRole;
    
    updateUI();
    runJdAnalysis(); // Run JD match if there's any text in the box
}

// User manually types a skill
function handleManualSkillAdd() {
    const value = newSkillInput.value.trim().toLowerCase();
    if (!value) return;
    
    // Validate against database if necessary, or just add. 
    // We allow any of the 26 skills or custom ones. Let's add if it is not in list.
    if (!appState.detectedSkills.includes(value)) {
        appState.detectedSkills.push(value);
        newSkillInput.value = "";
        updateUI();
        runJdAnalysis();
    } else {
        alert("Skill is already present in your list.");
    }
}

// Deletes a skill tag
function removeSkill(skillName) {
    appState.detectedSkills = appState.detectedSkills.filter(s => s !== skillName);
    
    // Re-check target role if the deleted skill drops its score below another
    let bestScore = -1;
    let selectedRole = appState.targetRole;
    let hasMatchingTarget = false;
    
    Object.keys(JOB_ROLES).forEach(role => {
        const required = JOB_ROLES[role];
        const intersect = appState.detectedSkills.filter(s => required.includes(s));
        const score = (intersect.length / required.length) * 100;
        if (score > bestScore) {
            bestScore = score;
            if (role === appState.targetRole) {
                hasMatchingTarget = true;
            }
        }
    });
    
    // If our current target is no longer viable, select the new best matching role
    if (!hasMatchingTarget && Object.keys(JOB_ROLES).length > 0) {
        selectedRole = Object.keys(JOB_ROLES).reduce((a, b) => {
            const scoreA = appState.detectedSkills.filter(s => JOB_ROLES[a].includes(s)).length / JOB_ROLES[a].length;
            const scoreB = appState.detectedSkills.filter(s => JOB_ROLES[b].includes(s)).length / JOB_ROLES[b].length;
            return scoreA >= scoreB ? a : b;
        });
        appState.targetRole = selectedRole;
    }
    
    updateUI();
    runJdAnalysis();
}

// Selects target role manually from grid
function selectTargetRole(roleName) {
    appState.targetRole = roleName;
    updateUI();
}

// Update the overall UI based on state
function updateUI() {
    const totalSkillsCount = SKILL_DATABASE.length;
    const detectedCount = appState.detectedSkills.length;
    
    // Calculate ATS Score
    const atsScore = (detectedCount / totalSkillsCount) * 100;
    const roundedAts = atsScore.toFixed(1);
    
    // Update ATS Score Display (Circular Gauge)
    atsPercentageDisplay.textContent = `${Math.round(atsScore)}%`;
    setCirclePercentage(atsScore);
    
    // Rating Status Text
    let ratingStatus = "Upload Resume";
    let statusClass = "text-muted";
    
    if (detectedCount > 0) {
        if (atsScore >= 70) {
            ratingStatus = "Excellent Skill Set";
            statusClass = "text-success";
        } else if (atsScore >= 45) {
            ratingStatus = "Competent Skill Set";
            statusClass = "text-accent";
        } else {
            ratingStatus = "Requires Skill Upgrading";
            statusClass = "text-danger";
        }
    }
    atsRatingStatus.textContent = ratingStatus;
    atsRatingStatus.className = `ats-status ${statusClass}`;
    
    // Summary Banner Stats
    statSkillsCount.textContent = detectedCount;
    statTargetRole.textContent = appState.targetRole || "-";
    
    // Render Skill Tags
    skillsCountBadge.textContent = `${detectedCount} matched`;
    skillsContainer.innerHTML = "";
    
    if (detectedCount === 0) {
        skillsContainer.innerHTML = '<div class="no-skills-msg">No skills identified yet. Parse a resume or add skills below manually.</div>';
    } else {
        appState.detectedSkills.forEach(skill => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.innerHTML = `
                <span>${skill}</span>
                <span class="remove-btn" onclick="removeSkill('${skill}')"><i class="fa-solid fa-xmark"></i></span>
            `;
            skillsContainer.appendChild(tag);
        });
    }
    
    // Render Job Recommendation Cards
    renderJobRecommendations();
    
    // Renders the Roadmap Timeline
    renderRoadmapTimeline();
    
    // Enable/Disable PDF Export Button
    if (detectedCount > 0 && appState.targetRole) {
        downloadReportBtn.disabled = false;
    } else {
        downloadReportBtn.disabled = true;
    }
}

// Set SVG progress offset
function setCirclePercentage(percent) {
    const offset = circumference - (percent / 100 * circumference);
    progressCircle.style.strokeDashoffset = offset;
}

// Render Job Matches grid
function renderJobRecommendations() {
    rolesGrid.innerHTML = "";
    
    Object.keys(JOB_ROLES).forEach(role => {
        const required = JOB_ROLES[role];
        const matched = appState.detectedSkills.filter(s => required.includes(s));
        const score = (matched.length / required.length) * 100;
        
        const isTarget = (role === appState.targetRole);
        const cardClass = isTarget ? "role-card selected-target" : "role-card";
        
        const card = document.createElement('div');
        card.className = cardClass;
        card.onclick = () => selectTargetRole(role);
        
        card.innerHTML = `
            <div class="role-header">
                <h3>${role}</h3>
                <div class="role-match-score">
                    <span class="percentage">${Math.round(score)}%</span>
                    <div class="mini-bar-bg">
                        <div class="mini-bar-fill" style="width: ${score}%;"></div>
                    </div>
                </div>
            </div>
            <div class="role-skills-preview">
                <strong>Skills:</strong> ${required.join(', ')}
            </div>
            ${isTarget ? '<span class="target-badge"><i class="fa-solid fa-crosshairs"></i> Target Pathway</span>' : '<span class="select-target-hint">Click to Target</span>'}
        `;
        rolesGrid.appendChild(card);
    });
}

// Renders visual timeline roadmap
function renderRoadmapTimeline() {
    roadmapTimeline.innerHTML = "";
    
    if (!appState.targetRole) {
        roadmapTargetRoleName.textContent = "-";
        roadmapTimeline.innerHTML = '<div class="empty-text">Select a job role target to generate a custom roadmap.</div>';
        return;
    }
    
    roadmapTargetRoleName.textContent = appState.targetRole;
    
    const required = JOB_ROLES[appState.targetRole];
    const missing = required.filter(s => !appState.detectedSkills.includes(s));
    
    if (missing.length === 0) {
        roadmapTimeline.innerHTML = `
            <div class="roadmap-completed-card">
                <i class="fa-solid fa-circle-check"></i>
                <h4>Profile Ready!</h4>
                <p>You already possess all required skills for a <strong>${appState.targetRole}</strong> role. Check your score and target additional domains to grow further!</p>
            </div>
        `;
        return;
    }
    
    // Timeline steps for missing items
    missing.forEach((skill, index) => {
        const resource = SKILL_RESOURCES[skill] || {
            concept: "Master basic principles, framework usage, and complete hands-on tutorial projects.",
            time: "3-4 weeks",
            links: [{ name: "Google Search", url: `https://www.google.com/search?q=learn+${skill}` }]
        };
        
        const step = document.createElement('div');
        step.className = 'roadmap-step';
        
        let linkHTML = "";
        resource.links.forEach(lnk => {
            linkHTML += `<a href="${lnk.url}" target="_blank" class="resource-link"><i class="fa-solid fa-graduation-cap"></i> ${lnk.name}</a> `;
        });
        
        step.innerHTML = `
            <div class="roadmap-node"></div>
            <div class="roadmap-content">
                <div class="roadmap-step-header">
                    <h4>Month ${index + 1}: Learn ${skill.toUpperCase()}</h4>
                    <span class="roadmap-time"><i class="fa-regular fa-clock"></i> Est. ${resource.time}</span>
                </div>
                <div class="roadmap-step-body">
                    <p>${resource.concept}</p>
                    <div class="roadmap-resources-list">
                        ${linkHTML}
                    </div>
                </div>
            </div>
        `;
        roadmapTimeline.appendChild(step);
    });
}

// Job description comparison logic
function runJdAnalysis() {
    const jdText = jdTextInput.value.trim().toLowerCase();
    if (!jdText) {
        // Reset JD display
        jdMatchRateValue.textContent = "0%";
        jdMatchProgressBar.style.width = "0%";
        jdMatchedTags.innerHTML = '<span class="empty-text">None</span>';
        jdMissingTags.innerHTML = '<span class="empty-text">None</span>';
        return;
    }
    
    const jdSkills = [];
    SKILL_DATABASE.forEach(skill => {
        if (jdText.includes(skill)) {
            jdSkills.push(skill);
        }
    });
    
    if (jdSkills.length === 0) {
        jdMatchRateValue.textContent = "0% (No keywords matched)";
        jdMatchProgressBar.style.width = "0%";
        jdMatchedTags.innerHTML = '<span class="empty-text">None</span>';
        jdMissingTags.innerHTML = '<span class="empty-text">None found in JD</span>';
        return;
    }
    
    const matched = jdSkills.filter(s => appState.detectedSkills.includes(s));
    const missing = jdSkills.filter(s => !appState.detectedSkills.includes(s));
    const score = (matched.length / jdSkills.length) * 100;
    
    jdMatchRateValue.textContent = `${Math.round(score)}%`;
    jdMatchProgressBar.style.width = `${score}%`;
    
    // Render matched tags
    jdMatchedTags.innerHTML = "";
    if (matched.length === 0) {
        jdMatchedTags.innerHTML = '<span class="empty-text">None</span>';
    } else {
        matched.forEach(s => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag matched';
            tag.textContent = s;
            jdMatchedTags.appendChild(tag);
        });
    }
    
    // Render missing tags
    jdMissingTags.innerHTML = "";
    if (missing.length === 0) {
        jdMissingTags.innerHTML = '<span class="empty-text">None (Perfect Match!)</span>';
    } else {
        missing.forEach(s => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag missing';
            tag.textContent = s;
            jdMissingTags.appendChild(tag);
        });
    }
}

// Generate PDF report via jsPDF client-side (replaces python reportlab canvas)
function generatePDFReport() {
    if (appState.detectedSkills.length === 0 || !appState.targetRole) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const cyanColor = [0, 180, 216];
    const darkBlueColor = [15, 23, 42];
    
    // PAGE 1: Header banner
    doc.setFillColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
    doc.rect(0, 0, 210, 45, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.text("AI SKILL NAVIGATOR REPORT", 15, 20);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text("Career Diagnostics & Skill Analysis Roadmap", 15, 28);
    
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Generated: ${today}`, 155, 28);
    
    // Accent border
    doc.setFillColor(cyanColor[0], cyanColor[1], cyanColor[2]);
    doc.rect(0, 45, 210, 3, 'F');
    
    // SECTION 1: Executive Summary
    doc.setTextColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("1. Profile Summary", 15, 60);
    doc.line(15, 62, 195, 62);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    // Math logic for ATS rating
    const totalCount = SKILL_DATABASE.length;
    const detectedCount = appState.detectedSkills.length;
    const atsScore = (detectedCount / totalCount) * 100;
    
    doc.text(`Detected Skills:   ${detectedCount} / ${totalCount} database skills`, 20, 72);
    doc.text(`Target Career Pathway:   ${appState.targetRole}`, 20, 79);
    doc.text(`Resume ATS Score:   ${atsScore.toFixed(1)}%`, 20, 86);
    
    // Draw an ATS Score gauge box
    doc.setFillColor(240, 244, 248);
    doc.roundedRect(140, 68, 55, 22, 3, 3, 'F');
    doc.setTextColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`${Math.round(atsScore)}%`, 155, 80);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("ATS MATCH RATE", 155, 85);
    
    // SECTION 2: Detected Skills
    doc.setTextColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("2. Detected Technical Skills", 15, 102);
    doc.line(15, 104, 195, 104);
    
    // Renders the tags as a structured list
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    let xOffset = 20;
    let yOffset = 114;
    
    appState.detectedSkills.forEach((skill, index) => {
        if (index > 0 && index % 3 === 0) {
            yOffset += 8;
            xOffset = 20;
        }
        
        doc.setFillColor(230, 242, 255);
        doc.roundedRect(xOffset, yOffset - 4, 50, 6, 1, 1, 'F');
        doc.setTextColor(0, 80, 160);
        doc.setFont("Helvetica", "bold");
        doc.text(skill.toUpperCase(), xOffset + 4, yOffset);
        
        xOffset += 60;
    });
    
    // SECTION 3: Career Path Suitability
    yOffset += 18;
    doc.setTextColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("3. Career Pathway Match Rates", 15, yOffset);
    doc.line(15, yOffset + 2, 195, yOffset + 2);
    
    yOffset += 10;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    Object.keys(JOB_ROLES).forEach(role => {
        const required = JOB_ROLES[role];
        const intersect = appState.detectedSkills.filter(s => required.includes(s));
        const score = (intersect.length / required.length) * 100;
        
        doc.setFont("Helvetica", "bold");
        doc.setTextColor(40, 40, 40);
        doc.text(role, 20, yOffset);
        
        // Progress bar background
        doc.setFillColor(230, 230, 230);
        doc.rect(75, yOffset - 3, 80, 4, 'F');
        
        // Progress bar fill
        doc.setFillColor(cyanColor[0], cyanColor[1], cyanColor[2]);
        doc.rect(75, yOffset - 3, (score / 100) * 80, 4, 'F');
        
        doc.setFont("Helvetica", "bold");
        doc.setTextColor(0, 100, 200);
        doc.text(`${Math.round(score)}%`, 165, yOffset);
        
        yOffset += 8;
    });
    
    // Footer page 1
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Page 1 of 2  -  AI Skill Navigator Diagnostic", 15, 285);
    
    // PAGE 2: Learning Roadmap
    doc.addPage();
    
    // Page 2 header
    doc.setFillColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("PERSONALIZED ROADMAP", 15, 16);
    
    doc.setFillColor(cyanColor[0], cyanColor[1], cyanColor[2]);
    doc.rect(0, 25, 210, 2, 'F');
    
    doc.setTextColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Target Roadmap: ${appState.targetRole}`, 15, 42);
    doc.line(15, 44, 195, 44);
    
    const required = JOB_ROLES[appState.targetRole];
    const missing = required.filter(s => !appState.detectedSkills.includes(s));
    
    let roadY = 56;
    if (missing.length === 0) {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 150, 50);
        doc.text("PROFILE COMPLETED! You possess all required technical skills for this career target.", 20, roadY);
    } else {
        missing.forEach((skill, index) => {
            const resource = SKILL_RESOURCES[skill] || {
                concept: "Master basic principles, framework usage, and complete hands-on tutorial projects.",
                time: "3-4 weeks",
                links: [{ name: "Documentation", url: `https://www.google.com/search?q=learn+${skill}` }]
            };
            
            // Step container
            doc.setFillColor(248, 250, 252);
            doc.roundedRect(18, roadY - 4, 175, 28, 2, 2, 'F');
            doc.setDrawColor(220, 225, 230);
            doc.roundedRect(18, roadY - 4, 175, 28, 2, 2, 'S');
            
            // Month node
            doc.setFillColor(cyanColor[0], cyanColor[1], cyanColor[2]);
            doc.circle(28, roadY + 10, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`${index + 1}`, 26.5, roadY + 13.5);
            
            // Title & Time
            doc.setTextColor(darkBlueColor[0], darkBlueColor[1], darkBlueColor[2]);
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`Learn ${skill.toUpperCase()}`, 38, roadY + 2);
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 120);
            doc.text(`Duration: ${resource.time}`, 155, roadY + 2);
            
            // Details
            doc.setFont("Helvetica", "normal");
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(9.5);
            
            // Splitting long text lines
            const splitText = doc.splitTextToSize(resource.concept, 140);
            doc.text(splitText, 38, roadY + 10);
            
            // Resources
            doc.setFont("Helvetica", "bold");
            doc.setTextColor(0, 100, 200);
            let resourceStr = "Resources: ";
            resource.links.forEach(l => {
                resourceStr += `[${l.name}]   `;
            });
            doc.text(resourceStr, 38, roadY + 21);
            
            roadY += 36;
        });
    }
    
    // Page 2 footer
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Page 2 of 2  -  AI Skill Navigator Diagnostic", 15, 285);
    
    // Save document
    const formattedRoleName = appState.targetRole.replace(/\s+/g, '_');
    doc.save(`Career_Report_${formattedRoleName}.pdf`);
}
