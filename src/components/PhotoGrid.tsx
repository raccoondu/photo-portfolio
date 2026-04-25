"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/data/photos";
import Lightbox from "./Lightbox";

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1);
  };

  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === photos.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 stagger-children">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="mb-4 break-inside-avoid cursor-pointer group relative"
            onClick={() => openLightbox(index)}
          >
            <div className="overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            {/* Hover overlay with title */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end">
              <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-sm font-medium">{photo.alt}</p>
                {photo.description && (
                  <p className="text-white/70 text-xs mt-1 line-clamp-2">
                    {photo.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        photo={lightboxIndex !== null ? photos[lightboxIndex] : null}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
}
