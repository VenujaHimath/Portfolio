export const personal = {
  name: "R.A. Venuja Himath Ranasinghe",
  shortName: "Venuja Ranasinghe",
  initials: "VR",
  photo: "/profile.png",
  role: "Data Science Undergraduate",
  taglines: [
    "Data Scientist.",
    "ML Engineer.",
    "Builder.",
    "Chess Champion.",
  ],
  location: "Maharagama, Sri Lanka",
  email: "venuja.ranasingh1977@gmail.com",
  github: "https://github.com/VenujaHimath",
  linkedin: "https://www.linkedin.com/in/venuja-ranasinghe-358b71367",
  bio: "Data Science undergrad at SLIIT obsessed with building real-world AI systems. I think in patterns — on the chessboard and in the data. Currently shipping MoodFit, a mental wellness AI app. I turn messy datasets into decisions.",
  cvPath: "/cv.pdf",
  cvFileName: "Venuja_Ranasinghe_CV.pdf",
};

export const stats = [
  { label: "Projects Built", value: 5, suffix: "" },
  { label: "ML Domains", value: 3, suffix: "", detail: "Healthcare, Finance, Wellness" },
  { label: "National Chess Champion", value: 1, suffix: "" },
];

export type ProjectDomain = "ML/AI" | "Full-Stack";

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  domain: ProjectDomain;
  featured?: boolean;
  showcase?: boolean;
  showcaseTitle?: string;
  showcaseDescription?: string;
  image?: string;
  externalUrl?: string;
  status?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "moodfit",
    title: "MoodFit – Mental Wellness AI",
    showcaseTitle: "MoodFit – AI-Powered Fitness Planner",
    period: "Apr 2026 – Present",
    status: "In Progress",
    description:
      "Data-driven mood tracking app with XGBoost behavioral insights and real-time recommendations via FastAPI",
    showcaseDescription:
      "A mobile wellness app that recommends workouts based on mood, stress, and energy levels — powered by an ML model with confidence-scored strength training suggestions and real-time behavioral insights.",
    tags: ["Python", "XGBoost", "FastAPI", "React Native", "Scikit-learn"],
    domain: "ML/AI",
    featured: true,
    showcase: true,
    image: "/projects/moodfit.png",
    github: "https://github.com/VenujaHimath/MoodFit",
  },
  {
    id: "loan-risk",
    title: "Loan Risk Assessment System",
    showcaseTitle: "AI-Driven Microfinance Staff Management System",
    period: "Jan 2026 – May 2026",
    description:
      "ML system to predict loan default risk using Random Forest + XGBoost. Integrated SHAP for explainability and a recommendation engine for loan terms.",
    showcaseDescription:
      "A secure staff web portal for managing applicants, loan applications, credit risk assessment, intelligent recommendations, repayments, and reporting workflows — with ML-driven default risk prediction and SHAP explainability.",
    tags: [
      "React",
      "Spring Boot",
      "MongoDB",
      "FastAPI",
      "Python",
      "XGBoost",
      "SHAP",
      "JWT",
      "REST API",
    ],
    domain: "ML/AI",
    featured: true,
    showcase: true,
    image: "/projects/loan-risk.png",
    github: "https://github.com/PabodaFdo/AI-Driven-Microfinance_Bank",
  },
  {
    id: "fittrack",
    title: "FitTrack – Full Stack Fitness Platform",
    showcaseTitle: "Fitness Tracker Mobile App",
    period: "Mar 2026 – May 2026",
    description:
      "Comprehensive fitness tracking app with 30+ screens, real-time dashboards, workout/meal planning, and streak tracking.",
    showcaseDescription:
      "A mobile fitness platform with profile management, progress tracking, fitness attributes, goal management, workout and meal templates, challenge management, and a trainer client dashboard.",
    tags: ["React Native", "Node.js", "Express", "MongoDB"],
    domain: "Full-Stack",
    featured: true,
    showcase: true,
    image: "/projects/fittrack.png",
    github: "https://github.com/IT24103815/Fitness_Tracker_Mobile_App",
  },
  {
    id: "stroke-risk",
    title: "Stroke Risk Prediction System",
    period: "Jun 2025 – Nov 2025",
    description:
      "Predictive model for identifying high-risk stroke patients using Random Forest with multi-metric evaluation (Precision, Recall, F1).",
    showcaseDescription:
      "A machine learning system that analyzes health records and environmental factors to predict stroke risk levels for individuals — outputting high-risk and low-risk categories to support early intervention and personalized health planning.",
    tags: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
    domain: "ML/AI",
    featured: true,
    image: "/projects/stroke-risk.png",
  },
  {
    id: "vehicle-rental",
    title: "Vehicle Rental Management System",
    period: "Jan 2025 – May 2025",
    description:
      "Scalable web-based enterprise solution with Spring Boot backend, RESTful APIs, and optimized MySQL schema.",
    tags: ["Java", "Spring Boot", "MySQL", "Hibernate/JPA"],
    domain: "Full-Stack",
    github: "https://github.com/Sheneshi2004/Car-Service",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React Native",
      "Node.js",
      "Spring Boot",
      "FastAPI",
      "Express.js",
      "REST APIs",
    ],
  },
  {
    title: "AI & Data Science",
    skills: [
      "Scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "SHAP",
      "Neural Networks",
      "Predictive Modelling",
      "Data Analytics",
    ],
  },
  {
    title: "Databases & Tools",
    skills: [
      "MongoDB",
      "MySQL",
      "Git",
      "GitHub",
      "Tailwind CSS",
      "Postman",
      "VS Code",
      "Expo",
    ],
  },
  {
    title: "Leadership",
    skills: [
      "Project Management",
      "Team Leadership",
      "UX Design",
      "Content Strategy",
    ],
  },
];

export const education = [
  {
    institution: "SLIIT",
    degree: "BSc (Hons) Data Science",
    period: "2024 – Present",
    notes: [
      "Actively involved in AI/ML projects exploring neural networks and data analytics",
    ],
  },
  {
    institution: "G.C.E. Advanced Level",
    degree: "Physical Science Stream",
    period: "",
    notes: [
      "Combined Mathematics (C)",
      "ICT (B)",
      "Physics (S)",
    ],
  },
];

export const achievements = [
  {
    title: "Champion",
    detail: "Colombo Zonal, National Youth Blitz Chess Championship (2019)",
  },
  {
    title: "1st Runner-Up",
    detail: "Colombo Zonal, National Youth Blitz Chess Championship (2014)",
  },
  {
    title: "9th Place",
    detail: "Sri Lanka Novices Chess Championship",
  },
  {
    title: "School Chess Team Captain",
    detail: "Led strategy and team coordination",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export const projectFilters = ["All", "ML/AI", "Full-Stack"] as const;
export type ProjectFilter = (typeof projectFilters)[number];
