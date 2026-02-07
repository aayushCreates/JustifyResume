import axios from "axios";
import { ParsedResume, Project } from "../types/resume.types";

type GitHubRepoSummary = {
  name: string;
  description: string | null;
  fork: boolean;
  size: number;
  pushedAt: string;
  url: string;
};

type SkillVerdict = {
  skill: string;
  supportedRepos: string[];
  languageMatch: boolean;
  avgOwnership: number;
  avgCommits: number;
  verdict: "VERIFIED" | "PARTIAL" | "UNVERIFIED";
};

type AnalysedGithubRepo = {
  repoName: string;
  languages: string[];
  commitCount: number;
  commitSpanDays: number;
  ownershipPercentage: number;
  readmeSnippet: string;
};

export async function analyzeGithub(
  parsedResume: ParsedResume,
  gitUserName: string
) {
  const resumeProjects = parsedResume.projects ?? [];

  const { data: repos } = await axios.get(
    `${process.env.GITHUB_API_URL}/users/${gitUserName}/repos`,
    {
      params: { per_page: 100, sort: "updated" },
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const normalizedRepos: GitHubRepoSummary[] = repos.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    fork: repo.fork,
    size: repo.size,
    pushedAt: repo.pushed_at,
    url: repo.html_url,
  }));

  const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]/g, "");

  const resumeRepos = normalizedRepos.filter((repo) =>
    resumeProjects.some((p: Project) =>
      p.name ? normalize(repo.name).includes(normalize(p.name)) : false
    )
  );

  const recentRepos = normalizedRepos
    .filter((repo) => {
      const daysAgo =
        (Date.now() - new Date(repo.pushedAt).getTime()) /
        (1000 * 60 * 60 * 24);
      return !repo.fork && repo.size > 10 && daysAgo < 120;
    })
    .slice(0, 3);

  const repoMap = new Map<string, GitHubRepoSummary>();
  [...resumeRepos, ...recentRepos].forEach((repo) => {
    repoMap.set(repo.name, repo);
  });

  const selectedRepos = Array.from(repoMap.values()).slice(0, 5);

  return selectedRepos;
}

export async function deepAnalysisGitRepo(
  repo: GitHubRepoSummary,
  gitUserName: string
) {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const { data: languages } = await axios.get(
    `${process.env.GITHUB_API_URL}/repos/${gitUserName}/${repo.name}/languages`,
    { headers }
  );

  const { data: commits } = await axios.get(
    `${process.env.GITHUB_API_URL}/repos/${gitUserName}/${repo.name}/commits`,
    {
      headers,
      params: { per_page: 20 },
    }
  );

  const commitDates = commits.map((c: any) => new Date(c.commit.author.date));

  const firstCommit = commitDates[commitDates.length - 1];
  const lastCommit = commitDates[0];

  const { data: contributors } = await axios.get(
    `${process.env.GITHUB_API_URL}/repos/${gitUserName}/${repo.name}/contributors`,
    { headers }
  );

  const totalContributions = contributors.reduce(
    (sum: number, c: any) => sum + c.contributions,
    0
  );

  const userContribution =
    contributors.find((c: any) => c.login === gitUserName)?.contributions ?? 0;

  const ownershipPercentage =
    totalContributions > 0
      ? Math.round((userContribution / totalContributions) * 100)
      : 0;

  let readmeSnippet = "";

  try {
    const { data: readme } = await axios.get(
      `${process.env.GITHUB_API_URL}/repos/${gitUserName}/${repo.name}/readme`,
      { headers }
    );

    readmeSnippet = Buffer.from(readme.content, "base64")
      .toString("utf-8")
      .slice(0, 1500);
  } catch {
    console.log("readme.md not found for " + repo.name);
  }

  return {
    repoName: repo.name,
    languages: Object.keys(languages),
    commitCount: commits.length,
    commitSpanDays:
      firstCommit && lastCommit
        ? Math.ceil(
            (lastCommit.getTime() - firstCommit.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 0,
    ownershipPercentage,
    readmeSnippet,
  };
}

export async function verifyResume(
  deepedAnalysedRepos: AnalysedGithubRepo[],
  parsedResume: ParsedResume
) {
  const resumeSkills = parsedResume.skills ?? [];
  const skillResults: SkillVerdict[] = [];
  const redFlags: string[] = [];

  let verifiedCount = 0;

  for (const skill of resumeSkills) {
    const skillLower = skill.toLowerCase();

    const matchingRepos = deepedAnalysedRepos.filter((repo) =>
      repo.languages.some(
        (lang) =>
          lang.toLowerCase().includes(skillLower) ||
          skillLower.includes(lang.toLowerCase())
      )
    );

    if (matchingRepos.length === 0) {
      redFlags.push(`Skill '${skill}' claimed but no GitHub evidence found`);

      skillResults.push({
        skill,
        supportedRepos: [],
        languageMatch: false,
        avgOwnership: 0,
        avgCommits: 0,
        verdict: "UNVERIFIED",
      });

      continue;
    }

    const avgOwnership =
      matchingRepos.reduce((s, r) => s + r.ownershipPercentage, 0) /
      matchingRepos.length;

    const avgCommits =
      matchingRepos.reduce((s, r) => s + r.commitCount, 0) /
      matchingRepos.length;

    let verdict: SkillVerdict["verdict"] = "PARTIAL";

    if (avgCommits >= 10 && avgOwnership >= 60) {
      verdict = "VERIFIED";
      verifiedCount++;
    } else if (avgCommits < 5 || avgOwnership < 30) {
      verdict = "UNVERIFIED";
      redFlags.push(
        `Weak evidence for skill '${skill}' (low commits or ownership)`
      );
    }
    skillResults.push({
      skill,
      supportedRepos: matchingRepos.map((r) => r.repoName),
      languageMatch: true,
      avgOwnership: Math.round(avgOwnership),
      avgCommits: Math.round(avgCommits),
      verdict,
    });
  }

  const credibilityScore =
    resumeSkills.length === 0
      ? 0
      : Math.round((verifiedCount / resumeSkills.length) * 100);

  return {
    skills: skillResults,
    credibilityScore,
    redFlags,
  };
}
