import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
  children?: ReactNode;
};

export default function SectionHeading({
  title,
  subtitle,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${
          light ? "text-cream" : "text-forest"
        }`}
      >
        {title}
      </h2>
      <div className="section-divider mx-auto mb-4" />
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            light ? "text-cream/80" : "text-espresso/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
