"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/data/photos";
import { defaultPrintOptions } from "@/data/photos";

interface PrintsGridProps {
  photos: Photo[];
}

export default function PrintsGrid({ photos }: PrintsGridProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>(
    {}
  );

  const getSize = (photoId: string) => selectedSizes[photoId] ?? 0;

  const setSize = (photoId: string, index: number) => {
    setSelectedSizes((prev) => ({ ...prev, [photoId]: index }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 stagger-children">
      {photos.map((photo) => {
        const options = photo.printOptions || defaultPrintOptions;
        const sizeIndex = getSize(photo.id);
        const selected = options[sizeIndex];
        const sizeOptions = options
          .map((o) => `${o.name} ($${o.price})`)
          .join("|");

        return (
          <div key={photo.id}>
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gray-50">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Info */}
            <h3 className="text-sm font-medium">{photo.alt}</h3>
            {photo.description && (
              <p className="text-xs text-muted mt-1 line-clamp-2">
                {photo.description}
              </p>
            )}

            {/* Size selector */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {options.map((option, i) => (
                <button
                  key={option.name}
                  onClick={() => setSize(photo.id, i)}
                  className={`px-2 py-1 text-[10px] border transition-colors ${
                    i === sizeIndex
                      ? "border-foreground text-foreground"
                      : "border-border text-muted hover:border-foreground/40"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>

            {/* Price + add to cart */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm">${selected.price}</span>
              <button
                className="snipcart-add-item bg-foreground text-background text-[10px] tracking-[0.15em] uppercase px-4 py-2 hover:opacity-80 transition-opacity"
                data-item-id={photo.id}
                data-item-price={selected.price}
                data-item-url="/prints"
                data-item-name={photo.alt}
                data-item-description={`Print — ${selected.name}`}
                data-item-image={photo.src}
                data-item-custom1-name="Size"
                data-item-custom1-options={sizeOptions}
                data-item-custom1-value={`${selected.name} ($${selected.price})`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
