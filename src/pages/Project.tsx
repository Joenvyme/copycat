import { Link, useParams } from "react-router-dom";
import { LicenseBadge } from "../components/LicenseBadge";
import { LICENSES } from "../data/licenses";
import { formatNumber } from "../lib/format";
import { getProjectBySlug } from "../lib/projects";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="detail detail--missing">
        <nav className="nav nav--plain">
          <Link to="/" className="nav__brand">
            Copycat
          </Link>
        </nav>
        <h1>Projet introuvable</h1>
        <Link to="/" className="cta cta--ghost">
          Retour au classement
        </Link>
      </div>
    );
  }

  const license = LICENSES[project.license];

  return (
    <div className="detail">
      <nav className="nav nav--plain">
        <Link to="/" className="nav__brand">
          Copycat
        </Link>
        <Link to="/" className="nav__link">
          Classement
        </Link>
      </nav>

      <article className="detail__body">
        <p className="detail__eyebrow">{project.category}</p>
        <h1 className="detail__title">{project.name}</h1>
        <p className="detail__tagline">{project.tagline}</p>

        <div className="detail__badges">
          <LicenseBadge license={project.license} />
          <span className="pill">{project.language}</span>
        </div>

        <p className="detail__desc">{project.description}</p>

        <dl className="metrics">
          <div>
            <dt>Stars GitHub</dt>
            <dd>{formatNumber(project.stars)}</dd>
          </div>
          <div>
            <dt>Downloads / sem.</dt>
            <dd>
              {project.weeklyDownloads != null
                ? formatNumber(project.weeklyDownloads)
                : "—"}
            </dd>
          </div>
          <div>
            <dt>Dependents</dt>
            <dd>
              {project.dependents != null
                ? formatNumber(project.dependents)
                : "—"}
            </dd>
          </div>
        </dl>

        <section className="license-panel">
          <h2>Licence {license.label}</h2>
          <p>{license.summary}</p>
          <ul>
            {license.can.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {license.note && <p className="license-panel__note">{license.note}</p>}
        </section>

        <ul className="topics">
          {project.topics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="detail__actions">
          <a
            className="cta"
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Voir le dépôt
          </a>
          {project.homepage && (
            <a
              className="cta cta--ghost"
              href={project.homepage}
              target="_blank"
              rel="noreferrer"
            >
              Site officiel
            </a>
          )}
          {project.npmUrl && (
            <a
              className="cta cta--ghost"
              href={project.npmUrl}
              target="_blank"
              rel="noreferrer"
            >
              npm
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
