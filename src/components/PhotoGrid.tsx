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

  // Split photos into columns for masonry layout
  const columns = [[], [], []] as Photo[][];
  photos.forEach((photo, i) => {
    columns[i % 3].push(photo);
  });

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 stagger-children">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="mb-4 break-inside-avoid img-hover-zoom cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
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
