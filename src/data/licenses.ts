export type LicenseId =
  | "MIT"
  | "Apache-2.0"
  | "BSD-3-Clause"
  | "BSD-2-Clause"
  | "ISC"
  | "Unlicense"
  | "0BSD";

export type LicenseInfo = {
  id: LicenseId;
  label: string;
  summary: string;
  can: string[];
  note?: string;
};

export const LICENSES: Record<LicenseId, LicenseInfo> = {
  MIT: {
    id: "MIT",
    label: "MIT",
    summary:
      "Licence très permissive : tu peux utiliser, modifier, redistribuer et vendre le code, y compris en produit fermé.",
    can: [
      "Usage commercial et privé",
      "Modification et redistribution",
      "Sous-licence et vente de dérivés",
    ],
    note: "Conserve la notice de copyright et la licence.",
  },
  "Apache-2.0": {
    id: "Apache-2.0",
    label: "Apache 2.0",
    summary:
      "Permissive comme MIT, avec protection explicite sur les brevets. Idéale pour commercialiser sans ambiguïté.",
    can: [
      "Usage commercial et privé",
      "Modification et redistribution",
      "Licence de brevets des contributeurs",
    ],
    note: "Conserve les notices et indique les fichiers modifiés.",
  },
  "BSD-3-Clause": {
    id: "BSD-3-Clause",
    label: "BSD 3-Clause",
    summary:
      "Licence permissive classique : libre d’usage commercial, sans obligation de republier le code source.",
    can: [
      "Usage commercial et privé",
      "Modification et redistribution",
      "Intégration dans un produit propriétaire",
    ],
    note: "Conserve la notice ; n’utilise pas le nom des auteurs pour promouvoir sans permission.",
  },
  "BSD-2-Clause": {
    id: "BSD-2-Clause",
    label: "BSD 2-Clause",
    summary:
      "Version simplifiée de BSD : très libre pour recopier et commercialiser.",
    can: [
      "Usage commercial et privé",
      "Modification et redistribution",
      "Produit fermé autorisé",
    ],
    note: "Conserve la notice de copyright et la licence.",
  },
  ISC: {
    id: "ISC",
    label: "ISC",
    summary:
      "Équivalente fonctionnellement à MIT : courte, claire, et compatible avec un usage commercial.",
    can: [
      "Usage commercial et privé",
      "Modification et redistribution",
      "Vente de logiciels dérivés",
    ],
    note: "Conserve la notice de copyright et la licence.",
  },
  Unlicense: {
    id: "Unlicense",
    label: "Unlicense",
    summary:
      "Domaine public : aucune restriction d’usage, de copie ou de commercialisation.",
    can: [
      "Usage sans restriction",
      "Modification et redistribution",
      "Commercialisation sans attribution obligatoire",
    ],
  },
  "0BSD": {
    id: "0BSD",
    label: "0BSD",
    summary:
      "Licence BSD « zéro clause » : quasi domaine public, ultra permissive pour commercialiser.",
    can: [
      "Usage sans restriction",
      "Modification et redistribution",
      "Aucun crédit obligatoire",
    ],
  },
};
