import rawProjects from "../data/projects.json";
import type { Project } from "../types";

export const projects = rawProjects as Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function uniqueValues(key: "category" | "language" | "license"): string[] {
  return [...new Set(projects.map((p) => p[key]))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
}
