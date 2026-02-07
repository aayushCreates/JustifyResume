import { ParsedResume } from "../types/resume.types";

export default function parseResumeText(
  rawText: string,
  github?: string,
  portfolio?: string,
  linkedin?: string
): ParsedResume {
  rawText = normalizeText(rawText);

  let result: ParsedResume = {};

  const email = rawText.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  )?.[0];

  const phone = rawText.match(/\+?\d[\d\s-]{8,}\d/)?.[0];

  const lines = rawText.split("\n").filter(Boolean);
  const name = lines.find((l) => !l.includes("@") && l.length < 40);

  const skillsBlock = extractSection(rawText, "Skills");

  const knownSkills = [
    "JavaScript",
    "TypeScript",
    "Node",
    "React",
    "Python",
    "Java",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "Next.js",
    "Docker",
  ];

  const skills = knownSkills.filter((skill) =>
    new RegExp(`\\b${skill}\\b`, "i").test(skillsBlock)
  );

  const experienceBlock = extractSection(rawText, "Experience");

  const experience = experienceBlock
    .split("\n")
    .filter((l) => l.length > 10)
    .map((line) => {
      return {
        company: extractCompany(line),
        role: extractRole(line),
        duration: extractDuration(line),
        description: line,
      };
    });

  const educationBlock = extractSection(rawText, "Education");

  const education = educationBlock
    .split("\n")
    .filter((l) => l.length > 10)
    .map((line) => {
      return {
        institution: line,
        course: extractCourse(line),
        branch: extractBranch(line),
        year: extractYear(line),
        cgpa: extractCGPA(line),
        percentage: extractPercentage(line),
      };
    });

  const projectsBlock = extractSection(rawText, "Projects");

  const projects = projectsBlock
    .split("\n")
    .filter((l) => l.length > 10)
    .map((line) => {
      const linkMatch = line.match(/https?:\/\/[^\s]+/);

      const techStack = knownSkills.filter((skill) =>
        new RegExp(`\\b${skill}\\b`, "i").test(line)
      );

      return {
        name: extractProjectName(line),
        description: line,
        techStack: techStack.length ? techStack : undefined,
        link: linkMatch?.[0],
      };
    });

  const links = {
    github,
    portfolio,
    linkedin,
  };

  result = {
    name: name,
    email: email,
    phone: phone,
    skills: skills,
    experience: experience as any,
    education: education as any,
    projects: projects as any,
    links: links,
  };

  return result;
}

export function normalizeText(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, "\n")
    .replace(/\t/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

export function extractSection(text: string, title: string) {
  const regex = new RegExp(
    `${title}[\\s\\S]*?(?=\\n[A-Z][A-Za-z ]{3,}|$)`,
    "i"
  );
  return text.match(regex)?.[0] || "";
}

function extractRole(line: string) {
  return line.split("-")[0]?.trim();
}

function extractCompany(line: string) {
  return line.split("-")[1]?.trim() || line;
}

function extractDuration(line: string) {
  return line.match(/\b(20\d{2}.*?(Present|\d{4}))\b/)?.[0];
}

function extractYear(line: string) {
  return line.match(/\b(19|20)\d{2}\b/)?.[0];
}

function extractCGPA(line: string) {
  return line.match(/\b\d\.\d{1,2}\b/)?.[0];
}

function extractPercentage(line: string) {
  return line.match(/\b\d{2}\.\d{1,2}%|\b\d{2}%/)?.[0];
}

function extractCourse(line: string) {
  return line.match(
    /B\.?Tech|M\.?Tech|B\.?E|M\.?E|BSc|MSc|Bachelor|Master/i
  )?.[0];
}

function extractBranch(line: string) {
  return line.match(
    /Computer Science|Information Technology|ECE|EEE|Mechanical|Civil/i
  )?.[0];
}

function extractProjectName(line: string) {
  return line.split(/[:-]/)[0]?.trim();
}
