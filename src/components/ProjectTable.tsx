import { Link } from "react-router-dom";
import type { Project } from "../types";
import { formatNumber } from "../lib/format";
import { LicenseBadge } from "./LicenseBadge";

type Props = {
  projects: Project[];
};

export function ProjectTable({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <p className="empty">Aucun projet ne correspond à ces filtres.</p>
    );
  }

  return (
    <div className="table-wrap">
      <table className="project-table">
        <thead>
          <tr>
            <th className="col-rank">#</th>
            <th className="col-name">Projet</th>
            <th className="col-cat">Catégorie</th>
            <th className="col-license">Licence</th>
            <th className="col-metric">Stars</th>
            <th className="col-metric">Downloads / sem.</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.slug}>
              <td className="col-rank">{index + 1}</td>
              <td className="col-name">
                <Link to={`/project/${project.slug}`} className="project-link">
                  <span className="project-link__name">{project.name}</span>
                  <span className="project-link__tagline">{project.tagline}</span>
                </Link>
              </td>
              <td className="col-cat">{project.category}</td>
              <td className="col-license">
                <LicenseBadge license={project.license} compact />
              </td>
              <td className="col-metric">{formatNumber(project.stars)}</td>
              <td className="col-metric">
                {project.weeklyDownloads != null
                  ? formatNumber(project.weeklyDownloads)
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
