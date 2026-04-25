import type { Metadata } from "next";
import { photos, defaultPrintOptions } from "@/data/photos";
import PrintsGrid from "@/components/PrintsGrid";

export const metadata: Metadata = {
  title: "Order Prints — Roam Shoot Repeat",
  description: "Fine art prints from around the world",
};

export default function PrintsPage() {
  const printablePhotos = photos.filter((p) => p.printable !== false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16">
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.1em] uppercase">
          Prints
        </h1>
        <p className="text-sm text-muted mt-4 max-w-lg leading-relaxed">
          Each photograph is printed on archival-quality giclée paper with a
          matte finish. Prints ship flat, unframed, and ready to be displayed
          however you choose.
        </p>
        <div className="flex flex-wrap gap-6 mt-6 text-xs text-muted">
          {defaultPrintOptions.map((opt) => (
            <span key={opt.name}>
              {opt.name} — ${opt.price}
            </span>
          ))}
        </div>
      </div>

      <PrintsGrid photos={printablePhotos} />
    </div>
  );
}
