import { LICENSES, type LicenseId } from "../data/licenses";

type Props = {
  license: LicenseId;
  compact?: boolean;
};

export function LicenseBadge({ license, compact }: Props) {
  const info = LICENSES[license];
  return (
    <span className={`license-badge${compact ? " license-badge--compact" : ""}`}>
      <span className="license-badge__dot" aria-hidden />
      {info.label}
      {!compact && <span className="license-badge__ok">OK commercial</span>}
    </span>
  );
}
