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
        <h1>Opportunité introuvable</h1>
        <Link to="/" className="cta cta--ghost">
          Retour aux idées
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
          Idées SaaS
        </Link>
      </nav>

      <article className="detail__body">
        <p className="detail__eyebrow">
          {project.category} · score {project.opportunityScore.toFixed(1)}
        </p>
        <h1 className="detail__title">{project.name}</h1>
        <p className="detail__tagline">{project.tagline}</p>

        <div className="detail__badges">
          <LicenseBadge license={project.license} />
          <span className="pill">{project.language}</span>
          <span className="pill pill--accent">{project.niche}</span>
        </div>

        <section className="idea-panel">
          <h2>Idée SaaS</h2>
          <p>{project.saasIdea}</p>
          <dl className="idea-grid">
            <div>
              <dt>Remplace</dt>
              <dd>{project.replaces}</dd>
            </div>
            <div>
              <dt>Prix indicatif</dt>
              <dd>{project.pricingHint}</dd>
            </div>
            <div>
              <dt>Monétisation</dt>
              <dd>{project.monetization}</dd>
            </div>
            <div>
              <dt>Signal de demande</dt>
              <dd>{project.demandSignal}</dd>
            </div>
          </dl>
        </section>

        <p className="detail__desc">{project.description}</p>

        <dl className="metrics">
          <div>
            <dt>Score opportunité</dt>
            <dd>{project.opportunityScore.toFixed(1)}</dd>
          </div>
          <div>
            <dt>Stars GitHub</dt>
            <dd>{formatNumber(project.stars)}</dd>
          </div>
          <div>
            <dt>Niche</dt>
            <dd className="metrics__text">{project.niche}</dd>
          </div>
        </dl>

        <section className="license-panel">
          <h2>Licence {license.label} — OK commercial</h2>
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
        </div>
      </article>
    </div>
  );
}
