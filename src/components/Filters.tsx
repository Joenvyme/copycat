export type SortKey = "score" | "stars" | "name";

type Props = {
  query: string;
  category: string;
  language: string;
  license: string;
  sort: SortKey;
  categories: string[];
  languages: string[];
  licenses: string[];
  onQuery: (v: string) => void;
  onCategory: (v: string) => void;
  onLanguage: (v: string) => void;
  onLicense: (v: string) => void;
  onSort: (v: SortKey) => void;
};

export function Filters({
  query,
  category,
  language,
  license,
  sort,
  categories,
  languages,
  licenses,
  onQuery,
  onCategory,
  onLanguage,
  onLicense,
  onSort,
}: Props) {
  return (
    <div className="filters" id="classement">
      <label className="filters__search">
        <span className="sr-only">Rechercher</span>
        <input
          type="search"
          placeholder="Rechercher une idée SaaS, un concurrent…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
      </label>

      <label>
        <span>Catégorie</span>
        <select value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="">Toutes</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Stack</span>
        <select value={language} onChange={(e) => onLanguage(e.target.value)}>
          <option value="">Toutes</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Licence</span>
        <select value={license} onChange={(e) => onLicense(e.target.value)}>
          <option value="">Toutes</option>
          {licenses.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Trier par</span>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          <option value="score">Score opportunité</option>
          <option value="stars">Stars</option>
          <option value="name">Nom</option>
        </select>
      </label>
    </div>
  );
}
