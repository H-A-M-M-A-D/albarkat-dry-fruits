type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
};

/** Shared eyebrow + H1 + intro block used by informational pages (Our Story, FAQ, Shipping, etc.). */
export function PageHeader({ eyebrow, title, intro, className }: PageHeaderProps) {
  return (
    <div className={`max-w-2xl${className ? ` ${className}` : ""}`}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
