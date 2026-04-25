import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locations, getLocation, getPhotosByLocation } from "@/data/photos";
import PhotoGrid from "@/components/PhotoGrid";

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return {
    title: `${location.name} — Photo Portfolio`,
    description: location.description,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const photos = getPhotosByLocation(slug);

  return (
    <div>
      {/* Location hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <Image
          src={location.coverPhoto}
          alt={location.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 px-6 pb-12 max-w-7xl mx-auto w-full animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-2">
            {location.country}
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] uppercase text-white">
            {location.name}
          </h1>
          <p className="text-sm text-white/70 mt-3 max-w-md">
            {location.description}
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-8">
          {photos.length} photographs
        </p>
        <PhotoGrid photos={photos} />
      </section>
    </div>
  );
}
