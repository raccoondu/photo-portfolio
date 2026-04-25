"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import type { Photo } from "@/data/photos";

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!photo) return;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, handleKeyDown]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 lightbox-overlay flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-w-[90vw] max-h-[90vh] object-contain"
          sizes="90vw"
          priority
        />
        <p className="absolute bottom-0 left-0 right-0 text-center text-white/60 text-sm py-4">
          {photo.alt}
        </p>
      </div>
    </div>
  );
}
