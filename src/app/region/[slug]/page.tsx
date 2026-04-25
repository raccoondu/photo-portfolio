import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  regions,
  getRegion,
  getSubLocationsByRegion,
  getPhotosByLocation,
  getPhotosByRegion,
} from "@/data/photos";

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};
  return {
    title: `${region.name} — Roma Shoot Repeat`,
    description: `Photography from ${region.name}`,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const subs = getSubLocationsByRegion(slug);
  const totalPhotos = getPhotosByRegion(slug).length;

  return (
    <div>
      {/* Region header */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-2">
          Region
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] uppercase">
          {region.name}
        </h1>
        <p className="text-sm text-muted mt-3">
          {subs.length} locations &middot; {totalPhotos} photos
        </p>
      </section>

      {/* Sub-location cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {subs.map((sub) => {
            const photoCount = getPhotosByLocation(sub.slug).length;
            return (
              <Link
                key={sub.slug}
                href={`/location/${sub.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-4">
                  <Image
                    src={sub.coverPhoto}
                    alt={sub.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <h3 className="text-sm tracking-[0.15em] uppercase font-medium">
                  {sub.name}
                </h3>
                <p className="text-xs text-muted mt-1">
                  {sub.description} &middot; {photoCount} photos
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
