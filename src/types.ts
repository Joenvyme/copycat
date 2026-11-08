import type { LicenseId } from "./data/licenses";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  license: LicenseId;
  category: string;
  language: string;
  topics: string[];
  stars: number;
  weeklyDownloads?: number;
  dependents?: number;
  repoUrl: string;
  homepage?: string;
  npmUrl?: string;
  commercialOk: true;
};
