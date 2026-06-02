import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiFastapi,
  SiTailwindcss,
  SiPostman,
  SiExpo,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  FaJava,
  FaBrain,
  FaDatabase,
  FaChartLine,
  FaNetworkWired,
  FaUsers,
  FaProjectDiagram,
  FaPalette,
  FaPen,
} from "react-icons/fa";
import { TbApi } from "react-icons/tb";

export type SkillIconConfig = {
  icon: IconType;
  color: string;
};

export const SKILL_ICONS: Record<string, SkillIconConfig> = {
  Java: { icon: FaJava, color: "#E76F00" },
  Python: { icon: SiPython, color: "#3776AB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express.js": { icon: SiExpress, color: "#FFFFFF" },
  Express: { icon: SiExpress, color: "#FFFFFF" },
  "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
  "Scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
  XGBoost: { icon: FaChartLine, color: "#1ABC9C" },
  SHAP: { icon: FaBrain, color: "#3B82F6" },
  "Neural Networks": { icon: FaNetworkWired, color: "#7F77DD" },
  Pandas: { icon: SiPandas, color: "#150458" },
  NumPy: { icon: SiNumpy, color: "#013243" },
  "Predictive Modelling": { icon: FaChartLine, color: "#1D9E75" },
  "Predictive Analytics": { icon: FaChartLine, color: "#1D9E75" },
  "Data Analytics": { icon: FaChartLine, color: "#EF9F27" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  SQL: { icon: FaDatabase, color: "#4479A1" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  "VS Code": { icon: VscCode, color: "#007ACC" },
  "IntelliJ IDEA": { icon: FaJava, color: "#FE315D" },
  Expo: { icon: SiExpo, color: "#FFFFFF" },
  "REST APIs": { icon: TbApi, color: "#7F77DD" },
  "Project Management": { icon: FaProjectDiagram, color: "#7F77DD" },
  "Team Leadership": { icon: FaUsers, color: "#1D9E75" },
  "UX Design": { icon: FaPalette, color: "#EF9F27" },
  "Content Strategy": { icon: FaPen, color: "#F0EFE8" },
};

export function getSkillIcon(name: string): SkillIconConfig {
  return (
    SKILL_ICONS[name] ?? {
      icon: FaDatabase,
      color: "#7F77DD",
    }
  );
}
