import Image from "next/image";
import Link from "next/link";
import { regions, getSubLocationsByRegion, getPhotosByRegion } from "@/data/photos";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={getSubLocationsByRegion(regions[0].slug)[0]?.coverPhoto || "/photos/hero.jpg"}
          alt="Featured photograph"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-7xl font-light tracking-[0.2em] uppercase mb-4">
            Roma Shoot Repeat
          </h1>
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/80">
            Photography by Location
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* Regions */}
      {regions.map((region) => {
        const subs = getSubLocationsByRegion(region.slug);
        const photoCount = getPhotosByRegion(region.slug).length;
        return (
          <section key={region.slug} className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex items-baseline justify-between mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase">
                  {region.name}
                </h2>
                <p className="text-xs text-muted mt-2">
                  {subs.length} locations &middot; {photoCount} photos
                </p>
              </div>
              <Link
                href={`/region/${region.slug}`}
                className="text-xs tracking-[0.15em] uppercase text-muted hover:text-foreground transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {subs.map((sub) => (
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
                  <p className="text-xs text-muted mt-1">{sub.description}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
