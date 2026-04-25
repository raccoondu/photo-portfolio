import Image from "next/image";
import Link from "next/link";
import { locations, getPhotosByLocation } from "@/data/photos";

export default function Home() {
  return (
    <div>
      {/* Hero section — full-bleed first location cover */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={locations[0]?.coverPhoto || "/photos/hero.jpg"}
          alt="Featured photograph"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.15em] uppercase mb-4">
            Portfolio
          </h1>
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/80">
            Photography by Location
          </p>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* Location grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-xs tracking-[0.3em] uppercase text-muted mb-12">
          Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {locations.map((loc) => {
            const photoCount = getPhotosByLocation(loc.slug).length;
            return (
              <Link
                key={loc.slug}
                href={`/location/${loc.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-4 img-hover-zoom">
                  <Image
                    src={loc.coverPhoto}
                    alt={loc.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <h3 className="text-sm tracking-[0.15em] uppercase font-medium">
                  {loc.name}
                </h3>
                <p className="text-xs text-muted mt-1">
                  {loc.country} &middot; {photoCount} photos
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
