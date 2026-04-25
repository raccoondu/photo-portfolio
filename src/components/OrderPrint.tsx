"use client";

import { useState } from "react";
import type { Photo } from "@/data/photos";
import { defaultPrintOptions } from "@/data/photos";

interface OrderPrintProps {
  photo: Photo;
}

export default function OrderPrint({ photo }: OrderPrintProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const options = photo.printOptions || defaultPrintOptions;

  if (photo.printable === false) return null;

  const selected = options[selectedSize];

  // Build custom field string for size variants
  // Snipcart uses pipe-separated values for custom fields
  const sizeOptions = options.map((o) => `${o.name} ($${o.price})`).join("|");

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-4">
        Order Print
      </p>

      {/* Size selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {options.map((option, i) => (
          <button
            key={option.name}
            onClick={() => setSelectedSize(i)}
            className={`px-3 py-1.5 text-xs border transition-colors ${
              i === selectedSize
                ? "border-white text-white"
                : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>

      {/* Price */}
      <p className="text-white/80 text-sm mb-4">
        ${selected.price} USD
        <span className="text-white/40 text-xs ml-2">
          Archival giclée on matte paper
        </span>
      </p>

      {/* Snipcart add-to-cart button */}
      <button
        className="snipcart-add-item bg-white text-black text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-white/90 transition-colors"
        data-item-id={photo.id}
        data-item-price={selected.price}
        data-item-url={`/location/${photo.location}`}
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
  );
}
