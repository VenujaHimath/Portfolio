interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "domain" | "featured";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default:
      "border-surface-border bg-surface-elevated/80 text-text-muted text-xs",
    domain:
      "border-accent-secondary/40 bg-accent-secondary/10 text-accent-secondary text-xs",
    featured:
      "border-accent-highlight/50 bg-accent-highlight/15 text-accent-highlight text-xs font-medium",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono tracking-wide ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
