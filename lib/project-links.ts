import type { Project } from "./data";
import { personal } from "./data";

/** Normalize clone URLs / .git suffixes to a browser-friendly repo URL */
export function normalizeGithubRepoUrl(url: string | undefined): string | null {
  if (!url?.trim()) return null;

  let cleaned = url.trim().replace(/\.git\/?$/i, "");
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = `https://${cleaned}`;
  }

  try {
    const parsed = new URL(cleaned);
    if (parsed.hostname.replace(/^www\./, "") !== "github.com") {
      return null;
    }

    const [owner, repo, ...rest] = parsed.pathname
      .split("/")
      .filter(Boolean);

    if (!owner || !repo || rest.length > 0) {
      return null;
    }

    return `https://github.com/${owner}/${repo}`;
  } catch {
    return null;
  }
}

/** Project repo link — never invent paths from titles */
export function getProjectGithubHref(project: Project): string | null {
  return normalizeGithubRepoUrl(project.github);
}

/** Profile link for projects without a dedicated repo */
export function getProfileGithubHref(): string {
  return normalizeGithubRepoUrl(personal.github) ?? "https://github.com/VenujaHimath";
}
