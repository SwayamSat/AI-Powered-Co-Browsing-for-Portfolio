"""
Portfolio data router – serves structured JSON for every portfolio section.
Mounts under /portfolio prefix in main.py.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

# ───────────────────────────── data ─────────────────────────────

HERO = {
    "name": "Swayam Satpathy",
    "roles": ["AI Engineer", "ML Developer", "Generative AI Builder"],
    "tagline": "Building production-level AI systems with LLMs, automation pipelines, and intelligent analytics.",
    "email": "swayamsatpathy2003@gmail.com",
    "linkedin": "https://www.linkedin.com/in/swayam-satpathy-1b0219258/",
    "github": "https://github.com/SwayamSat",
    "resume": "https://drive.google.com/uc?export=download&id=16WIMbY1B09ChN1FMLS3KB9cg2oQZev8P",
    "profile_image": "/profile.jpg",
}

ABOUT = {
    "bio": (
        "Results-oriented Data Science and AI Engineer skilled in Machine Learning, "
        "Deep Learning, NLP, Computer Vision, and Generative AI. Passionate about building "
        "scalable AI systems that integrate LLMs, automation pipelines, and intelligent "
        "analytics to solve real-world problems."
    ),
    "stats": [
        {"label": "Projects Built", "value": 10, "suffix": "+"},
        {"label": "Avg Accuracy", "value": 92, "suffix": "%"},
        {"label": "Tech Stack Items", "value": 30, "suffix": "+"},
        {"label": "Internships", "value": 1, "suffix": ""},
    ],
    "highlights": [
        "Specialized in Generative AI & LLM application development",
        "Experience with end-to-end ML pipeline deployment",
        "Strong foundation in computer vision and NLP",
        "Hands-on with multi-agent orchestration frameworks",
    ],
}

EDUCATION = [
    {
        "title": "B.Tech in Computer Science & Engineering (Data Science)",
        "institution": "Gandhi Institute of Engineering and Technology University",
        "period": "2022 – 2026",
        "highlights": [
            "Major in Data Science with focus on AI/ML",
            "Coursework: Algorithms, DBMS, Computer Vision, NLP, Big Data Analytics",
        ],
    },
    {
        "title": "Senior Secondary (Science – CBSE)",
        "institution": "Kendriya Vidyalaya Berhampur",
        "period": "Graduated 2022",
        "highlights": [
            "Physics, Chemistry, Mathematics & Computer Science",
        ],
    },
]

EXPERIENCE = [
    {
        "role": "AI & Software Engineering Intern",
        "company": "Hindustan Aeronautics Limited (HAL)",
        "period": "Jun 2024 – Jul 2024",
        "location": "Bengaluru, India",
        "bullets": [
            "Developed full-stack Flask–MySQL gate-pass automation system",
            "Managed 200+ daily employee entries with automated workflows",
            "Built secure admin dashboard & real-time tracking APIs",
            "Reduced approval time by 40% through process automation",
        ],
        "metrics": [
            {"label": "Daily Entries Managed", "value": "200+"},
            {"label": "Reduced Approval Time", "value": "40%"},
            {"label": "Improved DB Efficiency", "value": "25%"},
        ],
        "tech": ["Python", "Flask", "MySQL", "REST APIs", "HTML/CSS"],
    }
]

PROJECTS = [
    {
        "id": "multi-agent-research",
        "title": "Multi-Agent Research Assistant",
        "tech": ["AutoGen", "CrewAI", "LangGraph", "FastAPI", "Next.js"],
        "metrics": ["5 specialized agents", "Real-time SSE streaming", "Citation-rich reports"],
        "summary": "Orchestrated multi-agent system for autonomous research with topic refinement, paper discovery, and synthesis.",
        "details": (
            "A full-stack AI research assistant orchestrating specialized agents (topic refinement, "
            "paper discovery, synthesis, report writing, gap analysis) using CrewAI + LangGraph, "
            "generating structured, citation-rich literature reports. Implemented real-time agent "
            "workflow streaming with FastAPI (SSE) and interactive Next.js frontend for seamless "
            "user experience and live progress tracking."
        ),
        "github": "https://github.com/SwayamSat/Multi-Agent-Research-Assistant-Using-AutoGen-And-CrewAi",
        "category": "Generative AI",
    },
    {
        "id": "phi3-finetune",
        "title": "Fine-Tuned Phi-3-Mini-3.8B with Personal Data",
        "tech": ["Python", "Unsloth", "LoRA", "LLM", "RAG", "Google Colab"],
        "metrics": ["3.8B parameters optimized", "Reduced hallucinations", "Custom domain adaptation"],
        "summary": "Fine-tuned compact LLM on custom dataset using Unsloth and LoRA for enhanced domain-specific understanding.",
        "details": (
            "Fine-tuned a compact 3.8B parameter Phi-3-Mini LLM on custom personal dataset using "
            "Unsloth and LoRA techniques, enhancing domain-specific language understanding and "
            "reducing hallucinations in RAG workflows. Implemented efficient data preprocessing, "
            "custom prompt-response pairs, and low-rank adaptation to improve instruction-following "
            "and performance on retrieval-augmented generation tasks."
        ),
        "github": "https://github.com/SwayamSat/Fine-Tuned-Phi-3-Mini-3.8B-with-personal_data-using-Unsloth",
        "category": "LLM / Fine-tuning",
    },
    {
        "id": "ai-wardrobe",
        "title": "Personal AI Wardrobe Stylist",
        "tech": ["Next.js", "Supabase", "Gemini Vision", "Deep Learning"],
        "metrics": ["92% detection consistency", "38% improved recommendations"],
        "summary": "Vision-enabled fashion intelligence system with LLM-driven outfit recommendation engine.",
        "details": (
            "A full-stack AI wardrobe application using Gemini Vision API for clothing detection "
            "and classification. Features personalized outfit recommendations powered by deep learning "
            "models, achieving 92% detection consistency and 38% improvement in recommendation relevance. "
            "Built with Next.js frontend, Supabase backend, and real-time image processing pipeline."
        ),
        "github": "https://github.com/SwayamSat/Personal-AI-Wardrobe-Stylist",
        "category": "Computer Vision",
    },
    {
        "id": "s2d-analytics",
        "title": "S2D – NL to Automated Analytics & ML",
        "tech": ["LLMs", "SQLAlchemy", "scikit-learn"],
        "metrics": ["8+ analytics tasks automated", "94% classification accuracy", "70% reduced query time"],
        "summary": "Natural Language → SQL → ML → Visualization pipeline for automated data analytics.",
        "details": (
            "An end-to-end natural language to analytics pipeline that converts plain English queries "
            "into SQL, performs ML analysis, and generates visualizations. Automates 8+ analytics tasks "
            "with 94% classification accuracy, reducing manual query time by 70%. Leverages LLMs for "
            "query understanding, SQLAlchemy for database operations, and scikit-learn for ML modeling."
        ),
        "github": "https://github.com/SwayamSat/SPEAK2DATA-Natural-Language-To-Automated-Analytics-Machine-Learning-System",
        "category": "NLP / Analytics",
    },
    {
        "id": "fingerfx",
        "title": "FingerFx",
        "tech": ["Python", "Computer Vision", "Real-Time Processing", "Gesture Interaction"],
        "metrics": ["Real-time filter application", "Natural gesture control", "Dynamic visual effects"],
        "summary": "Interactive gesture-controlled visual effects application with real-time image processing and dynamic filters.",
        "details": (
            "Developed an interactive gesture-controlled visual effects application that applies dynamic "
            "filters (e.g., Black & White, Sparkle, Glitch) in real time using intuitive thumb-index "
            "finger movements. Engineered responsive image manipulation pipelines with modular filter "
            "functions and real-time camera feed processing, enabling seamless visual transformations "
            "driven by natural hand gestures."
        ),
        "github": "https://github.com/SwayamSat/FingerFx",
        "category": "Computer Vision",
    },
    {
        "id": "drone-bird-classifier",
        "title": "Micro-Doppler Drone vs Bird Classification",
        "tech": ["TensorFlow", "CNN"],
        "metrics": ["92% accuracy", "27% reduced false positives"],
        "summary": "Radar micro-Doppler signature classification using deep convolutional neural networks.",
        "details": (
            "A deep learning system for classifying micro-Doppler radar signatures to distinguish "
            "drones from birds. Utilizes convolutional neural networks trained on radar spectrograms, "
            "achieving 92% classification accuracy and reducing false positives by 27%. Critical "
            "application for airspace security and surveillance systems."
        ),
        "github": "https://github.com/SwayamSat/Micro-dropper-based-taget-Classifier-Bird-vs-Drone",
        "category": "Deep Learning",
    },
]

SKILLS = [
    {
        "title": "Languages",
        "icon": "Code",
        "items": ["Python", "MySQL", "PostgreSQL"],
    },
    {
        "title": "Frameworks & Libraries",
        "icon": "Cpu",
        "items": ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Langchain"],
    },
    {
        "title": "Tools & Platforms",
        "icon": "Wrench",
        "items": ["VS Code", "Google Colab", "Git & GitHub", "Docker", "Streamlit Cloud", "Vector Databases"],
    },
    {
        "title": "Cloud & MLOps",
        "icon": "Cloud",
        "items": ["AWS (S3, EC2)", "Google Cloud AI Platform", "FastAPI", "Model Deployment Pipelines"],
    },
    {
        "title": "Domains",
        "icon": "Brain",
        "items": ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Generative AI", "Data Visualization", "LLMops", "RAG"],
    },
]

ACHIEVEMENTS = [
    {
        "title": "Smart India Hackathon 2024",
        "desc": "University Level Qualified, 90%+ accuracy",
        "icon": "Trophy",
        "year": "2024",
        "category": "Hackathon",
    },
    {
        "title": "HAL Internship Recognition",
        "desc": "Outstanding performance in AI & software engineering",
        "icon": "Award",
        "year": "2024",
        "category": "Recognition",
    },
    {
        "title": "Oracle OCI Data Science Professional",
        "desc": "Certified 2025",
        "icon": "BadgeCheck",
        "year": "2025",
        "category": "Certification",
    },
    {
        "title": "J.P. Morgan Software Engineering",
        "desc": "Forage Virtual Experience",
        "icon": "Star",
        "year": "2024",
        "category": "Virtual Experience",
    },
]

SERVICES = [
    {
        "title": "AI Model Development",
        "desc": "Custom ML/DL models tailored to your data and business needs.",
        "icon": "Brain",
        "details": "End-to-end model development including data preprocessing, feature engineering, model training, evaluation, and deployment.",
    },
    {
        "title": "LLM Application Development",
        "desc": "Build intelligent apps powered by large language models.",
        "icon": "MessageSquare",
        "details": "RAG pipelines, fine-tuning, prompt engineering, and production-ready LLM integrations using OpenAI, Gemini, and open-source models.",
    },
    {
        "title": "NLP & Computer Vision Systems",
        "desc": "Text understanding and image analysis solutions at scale.",
        "icon": "Eye",
        "details": "Sentiment analysis, entity extraction, object detection, image classification, and multimodal AI systems.",
    },
    {
        "title": "End-to-End ML Deployment",
        "desc": "From prototype to production with CI/CD and monitoring.",
        "icon": "Rocket",
        "details": "MLOps pipelines with Docker, cloud deployment (AWS/GCP), model monitoring, and automated retraining workflows.",
    },
    {
        "title": "Data Analytics Automation",
        "desc": "Automated pipelines turning raw data into actionable insights.",
        "icon": "BarChart3",
        "details": "ETL pipelines, dashboards, NL-to-SQL systems, and automated reporting with real-time data visualization.",
    },
    {
        "title": "Full-Stack AI Applications",
        "desc": "Complete AI-powered web applications with modern architecture.",
        "icon": "Layers",
        "details": "Next.js frontends, FastAPI backends, and AI integrations delivered as polished, production-ready web applications.",
    },
]

CONTACT = {
    "email": "swayamsatpathy2003@gmail.com",
    "linkedin": "https://www.linkedin.com/in/swayam-satpathy-1b0219258/",
    "github": "https://github.com/SwayamSat",
    "location": "India",
    "availability": "Open to full-time roles, internships, and freelance projects.",
    "response_time": "Typically responds within 24 hours.",
}

# ───────────────────────────── routes ─────────────────────────────

@router.get("/hero")
async def get_hero():
    """Hero section data — name, roles, tagline, and social links."""
    return HERO

@router.get("/about")
async def get_about():
    """About section — bio, stats, and highlights."""
    return ABOUT

@router.get("/education")
async def get_education():
    """Education history with institutions and degree highlights."""
    return EDUCATION

@router.get("/experience")
async def get_experience():
    """Work experience entries with metrics and tech stack."""
    return EXPERIENCE

@router.get("/projects")
async def get_projects():
    """All featured projects with full details."""
    return PROJECTS

@router.get("/projects/{project_id}")
async def get_project(project_id: str):
    """Single project by ID."""
    for p in PROJECTS:
        if p["id"] == project_id:
            return p
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found")

@router.get("/skills")
async def get_skills():
    """Tech stack categories with skill items."""
    return SKILLS

@router.get("/achievements")
async def get_achievements():
    """Certifications, awards, and recognitions."""
    return ACHIEVEMENTS

@router.get("/services")
async def get_services():
    """Services offered with detailed descriptions."""
    return SERVICES

@router.get("/contact")
async def get_contact():
    """Contact information and availability."""
    return CONTACT

@router.get("/all")
async def get_all():
    """All portfolio sections in a single response — useful for AI agents."""
    return {
        "hero": HERO,
        "about": ABOUT,
        "education": EDUCATION,
        "experience": EXPERIENCE,
        "projects": PROJECTS,
        "skills": SKILLS,
        "achievements": ACHIEVEMENTS,
        "services": SERVICES,
        "contact": CONTACT,
    }
