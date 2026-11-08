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
  const [sort, setSort] = useState<SortKey>("stars");

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
      const hay = `${p.name} ${p.tagline} ${p.description} ${p.topics.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });

    list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "fr");
      if (sort === "downloads") {
        return (b.weeklyDownloads ?? 0) - (a.weeklyDownloads ?? 0);
      }
      return b.stars - a.stars;
    });

    return list;
  }, [query, category, language, license, sort]);

  return (
    <>
      <header className="hero">
        <div className="hero__bg" aria-hidden>
          <div className="hero__grid" />
          <div className="hero__glow" />
          <pre className="hero__code">{`mit.copy()\napache.sell()\nbsd.ship()`}</pre>
        </div>
        <nav className="nav">
          <Link to="/" className="nav__brand">
            Copycat
          </Link>
          <button type="button" className="nav__link nav__link--btn" onClick={scrollToRanking}>
            Classement
          </button>
        </nav>
        <div className="hero__content">
          <p className="hero__brand">Copycat</p>
          <h1 className="hero__title">
            Les open source les plus utilisés, libres à commercialiser.
          </h1>
          <p className="hero__lead">
            Un annuaire des projets sous licences permissives — MIT, Apache,
            BSD, ISC — prêts à être recopiés, forkés et vendus.
          </p>
          <button type="button" className="cta" onClick={scrollToRanking}>
            Voir le classement
          </button>
        </div>
      </header>

      <main className="main">
        <div className="main__meta">
          <p className="banner">
            Données curatées · nov. 2026 · {projects.length} projets · licences
            permissives uniquement
          </p>
          <p className="result-count">
            {filtered.length} projet{filtered.length > 1 ? "s" : ""}
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
          Copycat n’est pas un conseil juridique. Vérifie toujours la licence
          du dépôt avant usage commercial.
        </p>
      </footer>
    </>
  );
}
