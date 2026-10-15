/**
 * A value NGEN hasn't supplied yet. Pass the real value and it renders
 * as is; pass null and it renders a dashed "TODO" in the surrounding type,
 * so a placeholder can never pass for real data.
 */
export default function Todo({ value, className = "" }) {
  if (value !== null && value !== undefined) return value;
  return (
    <span className={`todo ${className}`} title="Placeholder: real data to come">
      TODO
    </span>
  );
}
