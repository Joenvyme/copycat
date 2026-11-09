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
      <p className="empty">Aucune base SaaS ne correspond à ces filtres.</p>
    );
  }

  return (
    <div className="table-wrap">
      <table className="project-table">
        <thead>
          <tr>
            <th className="col-rank">#</th>
            <th className="col-name">Base OSS</th>
            <th className="col-niche">Niche SaaS</th>
            <th className="col-license">Licence</th>
            <th className="col-metric">Score</th>
            <th className="col-price">Prix indicatif</th>
            <th className="col-metric">Stars</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.slug}>
              <td className="col-rank">{index + 1}</td>
              <td className="col-name">
                <Link to={`/project/${project.slug}`} className="project-link">
                  <span className="project-link__name">{project.name}</span>
                  <span className="project-link__tagline">
                    Remplace {project.replaces}
                  </span>
                </Link>
              </td>
              <td className="col-niche">
                <span className="niche">{project.niche}</span>
              </td>
              <td className="col-license">
                <LicenseBadge license={project.license} compact />
              </td>
              <td className="col-metric col-score">
                {project.opportunityScore.toFixed(1)}
              </td>
              <td className="col-price">{project.pricingHint}</td>
              <td className="col-metric">{formatNumber(project.stars)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
