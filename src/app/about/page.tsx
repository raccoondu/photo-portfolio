import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Photo Portfolio",
  description: "About the photographer",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-xs tracking-[0.3em] uppercase text-muted mb-8">
        About
      </h1>
      <div className="space-y-6 text-base leading-relaxed text-foreground/80">
        <p>
          {/* Replace with your own bio */}
          I&apos;m a photographer drawn to the intersection of light, place, and
          moment. This portfolio is organized by the locations I&apos;ve
          visited — each place tells its own story through the images I
          captured there.
        </p>
        <p>
          All photographs are shot on location and minimally edited to preserve
          the natural atmosphere of each scene.
        </p>
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <h2 className="text-xs tracking-[0.3em] uppercase text-muted mb-4">
          Contact
        </h2>
        <p className="text-sm text-foreground/70">
          {/* Replace with your email */}
          hello@example.com
        </p>
      </div>
    </div>
  );
}
