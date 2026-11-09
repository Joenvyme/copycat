import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Filters, type SortKey } from "../components/Filters";
import { ProjectTable } from "../components/ProjectTable";
import { projects, uniqueValues } from "../lib/projects";

function scrollToRanking() {
  document.getElementById("classement")?.scrollIntoView({ behavior: "smooth" });
}

export function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [license, setLicense] = useState("");
  const [sort, setSort] = useState<SortKey>("score");

  const categories = useMemo(() => uniqueValues("category"), []);
  const languages = useMemo(() => uniqueValues("language"), []);
  const licenses = useMemo(() => uniqueValues("license"), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (category && p.category !== category) return false;
      if (language && p.language !== language) return false;
      if (license && p.license !== license) return false;
      if (!q) return true;
      const hay = [
        p.name,
        p.tagline,
        p.description,
        p.saasIdea,
        p.replaces,
        p.niche,
        p.topics.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "fr");
      if (sort === "stars") return b.stars - a.stars;
      return b.opportunityScore - a.opportunityScore;
    });

    return list;
  }, [query, category, language, license, sort]);

  return (
    <>
      <header className="hero">
        <div className="hero__bg" aria-hidden>
          <div className="hero__grid" />
          <div className="hero__glow" />
          <pre className="hero__code">{`fork.umami()\nhost.chatwoot()\nsell.saas()`}</pre>
        </div>
        <nav className="nav">
          <Link to="/" className="nav__brand">
            Copycat
          </Link>
          <button
            type="button"
            className="nav__link nav__link--btn"
            onClick={scrollToRanking}
          >
            Idées SaaS
          </button>
        </nav>
        <div className="hero__content">
          <p className="hero__brand">Copycat</p>
          <h1 className="hero__title">
            Forke un open source, vends un SaaS.
          </h1>
          <p className="hero__lead">
            Des bases OSS permissives déjà utilisées — avec la niche, le
            concurrent à remplacer, et un prix indicatif pour commercialiser.
          </p>
          <button type="button" className="cta" onClick={scrollToRanking}>
            Voir les opportunités
          </button>
        </div>
      </header>

      <main className="main">
        <div className="main__meta">
          <p className="banner">
            Données curatées · nov. 2026 · {projects.length} bases SaaS ·
            licences permissives uniquement
          </p>
          <p className="result-count">
            {filtered.length} opportunité{filtered.length > 1 ? "s" : ""}
          </p>
        </div>

        <Filters
          query={query}
          category={category}
          language={language}
          license={license}
          sort={sort}
          categories={categories}
          languages={languages}
          licenses={licenses}
          onQuery={setQuery}
          onCategory={setCategory}
          onLanguage={setLanguage}
          onLicense={setLicense}
          onSort={setSort}
        />

        <ProjectTable projects={filtered} />
      </main>

      <footer className="footer">
        <p>
          Copycat n’est pas un conseil juridique ni financier. Vérifie la
          licence du dépôt et valide la demande avant de lancer.
        </p>
      </footer>
    </>
  );
}
